const cron = require('node-cron');
const DailyGoal = require('../models/DailyGoal');
const User = require('../models/User');
const sendEmail = require('./emailService');
const {
    DEFAULT_TIMEZONE,
    getLocalNow,
    isReminderDue,
    wasReminderSentToday,
    hasReminderTime,
    to24HourParts,
} = require('./reminderSchedule');

const pad = (n) => String(n).padStart(2, '0');

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

const getIncompleteReminderGoals = async (userId) =>
    DailyGoal.find({
        userId,
        completed: false,
        emailReminders: true,
    });

// Main function to check and send reminders
const checkAndSendReminders = async () => {
    const localNow = getLocalNow();

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn('Email reminders skipped: EMAIL_USER or EMAIL_PASS not configured.');
        return { sent: 0, skipped: 0, reason: 'email_not_configured' };
    }

    let sent = 0;
    let skipped = 0;

    try {
        const userIds = await DailyGoal.distinct('userId', {
            completed: false,
            emailReminders: true,
        });

        if (userIds.length === 0) {
            return { sent: 0, skipped: 0, reason: 'no_eligible_goals' };
        }

        const users = await User.find({ _id: { $in: userIds } });

        for (const user of users) {
            if (!hasReminderTime(user)) {
                skipped += 1;
                continue;
            }

            if (wasReminderSentToday(user, localNow)) {
                skipped += 1;
                continue;
            }

            if (!isReminderDue(user, localNow)) {
                skipped += 1;
                continue;
            }

            const incompleteGoals = await getIncompleteReminderGoals(user._id);

            if (incompleteGoals.length === 0) {
                skipped += 1;
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

            const timeParts = to24HourParts(user.reminderTime, user.reminderAmPm);
            if (!timeParts) {
                skipped += 1;
                continue;
            }
            const { hour, minute } = timeParts;

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
                sent += 1;
            } catch (err) {
                console.error(`Failed to send email to ${user.email}:`, err.message);
            }
        }
    } catch (err) {
        console.error('Error running checkAndSendReminders:', err);
        return { sent, skipped, error: err.message };
    }

    return { sent, skipped };
};

// Check every minute so reminders go out within ~1 min of the chosen time
cron.schedule('* * * * *', async () => {
    await checkAndSendReminders();
});

module.exports = {
    cron,
    checkAndSendReminders,
    DEFAULT_TIMEZONE,
};
