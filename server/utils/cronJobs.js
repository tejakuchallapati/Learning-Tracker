const cron = require('node-cron');
const DailyGoal = require('../models/DailyGoal');
const User = require('../models/User');
const sendEmail = require('./emailService');

// Reset only goals completed on a previous calendar day (not all users at once blindly)
cron.schedule('0 0 * * *', async () => {
    console.log('Running midnight daily goal reset...');
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const result = await DailyGoal.updateMany(
            { completed: true, lastCompletedDate: { $lt: today } },
            { completed: false }
        );
        console.log(`Reset ${result.modifiedCount} goals for a new day.`);
    } catch (err) {
        console.error('Error resetting daily goals at midnight:', err);
    }
});

// Main function to check and send reminders
const checkAndSendReminders = async () => {
    console.log('Running daily goal reminder check...');

    try {
        // Find all users who have emailNotification enabled
        const users = await User.find({ emailNotification: true });

        const now = new Date();
        const todayStr = now.toDateString(); // e.g. "Wed May 27 2026"
        const currentHour = now.getHours();
        const currentMin = now.getMinutes();

        for (const user of users) {
            // 1. Check if reminder was already sent today
            if (user.lastReminderSent && new Date(user.lastReminderSent).toDateString() === todayStr) {
                continue;
            }

            // 2. Parse preference time (default to 20:00 if not set)
            const reminderTimeStr = user.reminderTime || '20:00';
            const [prefHour, prefMin] = reminderTimeStr.split(':').map(Number);

            const isPastPreferredTime =
                currentHour > prefHour ||
                (currentHour === prefHour && currentMin >= prefMin);

            if (!isPastPreferredTime) {
                continue;
            }

            // 3. Find all incomplete goals for this user where emailReminders is true
            const incompleteGoals = await DailyGoal.find({
                userId: user._id,
                completed: false,
                emailReminders: true
            });

            if (incompleteGoals.length === 0) {
                continue;
            }

            const includeStreak = user.streakAlertNotification !== false;
            const goalListText = incompleteGoals.map(g => {
                let streakText = '';
                if (includeStreak && g.streak > 0) {
                    streakText = ` (Current Streak: ${g.streak})`;
                }
                return `- ${g.title}${streakText}`;
            }).join('\n');

            const message = `Hello ${user.name},\n\nYou have some pending daily goals in Learning Tracker to complete today:\n\n${goalListText}\n\nKeep up the great work and mark them complete when done!\n\nBest,\nThe Learning Tracker Team`;

            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Learning Tracker - Daily Reminder: Pending Goals',
                    message,
                });
                console.log(`Reminder email sent to ${user.email}`);

                // Update lastReminderSent timestamp
                user.lastReminderSent = new Date();
                await user.save();
            } catch (err) {
                console.error(`Failed to send email to ${user.email}:`, err.message);
            }
        }
    } catch (err) {
        console.error('Error running checkAndSendReminders:', err);
    }
};

// Schedule check every 30 minutes
cron.schedule('*/30 * * * *', async () => {
    await checkAndSendReminders();
});

module.exports = {
    cron,
    checkAndSendReminders
};
