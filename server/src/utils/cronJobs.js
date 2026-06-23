const cron = require('node-cron');
const DailyGoal = require('../models/DailyGoal');
const User = require('../models/User');
const sendEmail = require('./emailService');
const {
    DEFAULT_TIMEZONE,
    getLocalNow,
    getLocalDateKey,
    isReminderDue,
    wasReminderSentToday,
    hasReminderTime,
    to24HourParts,
} = require('./reminderSchedule');

const pad = (n) => String(n).padStart(2, '0');

/** Reset goals completed on a previous local calendar day (IST by default). */
const resetStaleCompletedGoals = async (localNow = getLocalNow()) => {
    const todayKey = localNow.dateKey;
    const completedGoals = await DailyGoal.find({
        completed: true,
        lastCompletedDate: { $exists: true, $ne: null },
    });

    let resetCount = 0;
    for (const goal of completedGoals) {
        const completedKey = getLocalDateKey(goal.lastCompletedDate, localNow.timezone);
        if (completedKey < todayKey) {
            goal.completed = false;
            await goal.save();
            resetCount += 1;
        }
    }

    if (resetCount > 0) {
        console.log(
            `Reset ${resetCount} daily goals for new local day (${todayKey}, ${localNow.timezone})`
        );
    }

    return resetCount;
};

// Midnight reset in server TZ — backup; primary reset runs each reminder check in user TZ
cron.schedule('0 0 * * *', async () => {
    console.log('Running midnight daily goal reset (backup)...');
    try {
        await resetStaleCompletedGoals();
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

const checkAndSendReminders = async () => {
    const localNow = getLocalNow();

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn('Email reminders skipped: EMAIL_USER or EMAIL_PASS not configured.');
        return { sent: 0, skipped: 0, reason: 'email_not_configured' };
    }

    await resetStaleCompletedGoals(localNow);

    let sent = 0;
    let skipped = 0;
    let eligibleUsers = 0;
    const skipReasons = {
        no_reminder_time: 0,
        already_sent: 0,
        not_due_yet: 0,
        no_incomplete_goals: 0,
        email_disabled: 0,
    };

    try {
        const userIds = await DailyGoal.distinct('userId', {
            completed: false,
            emailReminders: true,
        });

        eligibleUsers = userIds.length;

        if (userIds.length === 0) {
            return { sent: 0, skipped: 0, reason: 'no_eligible_goals', timezone: localNow.timezone };
        }

        const users = await User.find({ _id: { $in: userIds } });

        for (const user of users) {
            if (user.emailNotification === false) {
                skipped += 1;
                skipReasons.email_disabled += 1;
                continue;
            }

            if (!hasReminderTime(user)) {
                skipped += 1;
                skipReasons.no_reminder_time += 1;
                continue;
            }

            if (wasReminderSentToday(user, localNow)) {
                skipped += 1;
                skipReasons.already_sent += 1;
                continue;
            }

            if (!isReminderDue(user, localNow)) {
                skipped += 1;
                skipReasons.not_due_yet += 1;
                continue;
            }

            const incompleteGoals = await getIncompleteReminderGoals(user._id);

            if (incompleteGoals.length === 0) {
                skipped += 1;
                skipReasons.no_incomplete_goals += 1;
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
                skipReasons.no_reminder_time += 1;
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
        return { sent, skipped, skipReasons, error: err.message, timezone: localNow.timezone };
    }

    if (sent === 0 && eligibleUsers > 0) {
        console.log('Reminder check: no emails sent.', { skipped, skipReasons, timezone: localNow.timezone });
    }

    return { sent, skipped, skipReasons, timezone: localNow.timezone };
};

// Local dev fallback — production should use Render Cron pinging /api/cron/reminders
const useInternalScheduler =
    process.env.NODE_ENV !== 'production' || process.env.USE_INTERNAL_CRON === 'true';

if (useInternalScheduler) {
    cron.schedule('* * * * *', async () => {
        await checkAndSendReminders();
    });
}

module.exports = {
    cron,
    checkAndSendReminders,
    resetStaleCompletedGoals,
    DEFAULT_TIMEZONE,
};
