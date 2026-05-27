const cron = require('node-cron');
const DailyGoal = require('../models/DailyGoal');
const User = require('../models/User');
const sendEmail = require('./emailService');

// Schedule a daily job at 00:00 (midnight) to reset daily goals
cron.schedule('0 0 * * *', async () => {
    console.log('Running midnight daily goal reset...');
    try {
        const result = await DailyGoal.updateMany({}, { completed: false });
        console.log(`Reset ${result.modifiedCount} goals to incomplete.`);
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

            // Determine if we should send.
            // We send if the current time is past the preferred time,
            // OR if this is a startup check/catch-up and the current hour is past 8:00 AM local time.
            const isPastPreferredTime = (currentHour > prefHour) || (currentHour === prefHour && currentMin >= prefMin);
            const isCatchUpWindow = (currentHour >= 8); // Send as catch-up if it's daytime (8 AM onwards)

            if (!isPastPreferredTime && !isCatchUpWindow) {
                // Too early in the day, wait for the preferred time
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

            const goalListText = incompleteGoals.map(g => {
                let streakText = "";
                if (g.streak > 0) {
                    streakText = ` (Current Streak: ${g.streak} 🔥)`;
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
