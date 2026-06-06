const cron = require('node-cron');
const DailyGoal = require('../models/DailyGoal');
const User = require('../models/User');
const sendEmail = require('./emailService');
const {
    DEFAULT_TIMEZONE,
    getLocalNow,
    isReminderDue,
    wasReminderSentToday,
    to24HourParts,
} = require('./reminderSchedule');

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
    const localNow = getLocalNow();

    try {
        const users = await User.find({ emailNotification: true });

        for (const user of users) {
            if (wasReminderSentToday(user, localNow)) {
                continue;
            }

            if (!isReminderDue(user, localNow)) {
                continue;
            }

            const incompleteGoals = await DailyGoal.find({
                userId: user._id,
                completed: false,
                emailReminders: true,
            });

            if (incompleteGoals.length === 0) {
                continue;
            }

            const includeStreak = user.streakAlertNotification !== false;
            const goalListText = incompleteGoals.map((g) => {
                let streakText = '';
                if (includeStreak && g.streak > 0) {
                    streakText = ` (Current Streak: ${g.streak})`;
                }
                return `- ${g.title}${streakText}`;
            }).join('\n');

            const message = `Hello ${user.name},\n\nYou have some pending daily goals in Learning Tracker to complete today:\n\n${goalListText}\n\nKeep up the great work and mark them complete when done!\n\nBest,\nThe Learning Tracker Team`;

            const { hour, minute } = to24HourParts(user.reminderTime, user.reminderAmPm);

            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Learning Tracker - Daily Reminder: Pending Goals',
                    message,
                });
                console.log(
                    `Reminder email sent to ${user.email} (scheduled ${pad(hour)}:${pad(minute)}, tz ${localNow.timezone}, local ${pad(localNow.hour)}:${pad(localNow.minute)})`
                );

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

const pad = (n) => String(n).padStart(2, '0');

// Check every minute so reminders go out within ~1 min of the chosen time
cron.schedule('* * * * *', async () => {
    await checkAndSendReminders();
});

module.exports = {
    cron,
    checkAndSendReminders,
    DEFAULT_TIMEZONE,
};
