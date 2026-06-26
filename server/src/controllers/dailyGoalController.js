const asyncHandler = require('express-async-handler');
const DailyGoal = require('../models/DailyGoal');
const DailyGoalCompletion = require('../models/DailyGoalCompletion');
const User = require('../models/User'); // Explicitly require to avoid MissingSchemaError on refs
const sendEmail = require('../utils/emailService');
const { getLocalDateKey, getLocalNow } = require('../utils/reminderSchedule');

const ACTIVITY_WEEKS = 12;

const todayDateKey = () => getLocalNow().dateKey;

const dateFromKey = (dateKey) => {
    const [y, m, d] = dateKey.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
};

const logGoalCompletion = async (userId, goalId, dateKey = todayDateKey()) => {
    await DailyGoalCompletion.findOneAndUpdate(
        { userId, goalId, date: dateKey },
        {},
        { upsert: true, new: true }
    );
};

const removeGoalCompletion = async (userId, goalId, dateKey = todayDateKey()) => {
    await DailyGoalCompletion.deleteOne({ userId, goalId, date: dateKey });
};

const backfillRecentCompletions = async (userId) => {
    const goals = await DailyGoal.find({ userId, lastCompletedDate: { $exists: true, $ne: null } });
    for (const goal of goals) {
        const dateKey = getLocalDateKey(goal.lastCompletedDate);
        await DailyGoalCompletion.findOneAndUpdate(
            { userId, goalId: goal._id, date: dateKey },
            {},
            { upsert: true }
        );
    }
};

const syncTodayCompletions = async (userId) => {
    const todayKey = todayDateKey();
    const goals = await DailyGoal.find({ userId });

    for (const goal of goals) {
        const completedToday =
            goal.completed &&
            (!goal.lastCompletedDate || getLocalDateKey(goal.lastCompletedDate) === todayKey);

        if (completedToday) {
            if (!goal.lastCompletedDate) {
                goal.lastCompletedDate = dateFromKey(todayKey);
                await goal.save();
            }
            await logGoalCompletion(userId, goal._id, todayKey);
        } else {
            await DailyGoalCompletion.deleteOne({ userId, goalId: goal._id, date: todayKey });
        }
    }
};

const buildCountByDate = async (userId, startKey, todayKey) => {
    const rows = await DailyGoalCompletion.find({
        userId,
        date: { $gte: startKey, $lte: todayKey },
    }).select('date');

    const countByDate = {};
    for (const row of rows) {
        countByDate[row.date] = (countByDate[row.date] || 0) + 1;
    }
    return countByDate;
};

// @desc    Create a new daily goal
// @route   POST /api/daily-goals/create
// @access  Private
const createDailyGoal = asyncHandler(async (req, res) => {
    const { title, emailReminders } = req.body;

    if (!title) {
        res.status(400);
        throw new Error('Please provide a goal title');
    }

    const goal = await DailyGoal.create({
        userId: req.user.id,
        title,
        emailReminders: emailReminders !== false,
    });

    res.status(201).json(goal);
});

// @desc    Get user daily goals
// @route   GET /api/daily-goals
// @access  Private
const getDailyGoals = asyncHandler(async (req, res) => {
    const todayKey = todayDateKey();
    const [y, m, d] = todayKey.split('-').map(Number);
    const yesterdayDate = new Date(Date.UTC(y, m - 1, d - 1, 12, 0, 0));
    const yesterdayKey = getLocalDateKey(yesterdayDate);

    const goals = await DailyGoal.find({ userId: req.user.id });

    for (let goal of goals) {
        let updated = false;

        if (goal.completed && goal.lastCompletedDate) {
            const compKey = getLocalDateKey(goal.lastCompletedDate);
            if (compKey < todayKey) {
                goal.completed = false;
                updated = true;
            }
        }

        if (goal.lastCompletedDate) {
            const compKey = getLocalDateKey(goal.lastCompletedDate);
            if (compKey < yesterdayKey && compKey < todayKey) {
                if (goal.streak > 0) {
                    goal.streak = 0;
                    updated = true;
                }
            }
        } else if (goal.streak > 0) {
            goal.streak = 0;
            updated = true;
        }

        if (updated) {
            await goal.save();
        }
    }

    const sortedGoals = await DailyGoal.find({ userId: req.user.id })
        .sort({ completed: 1, createdAt: -1 });

    res.status(200).json(sortedGoals);
});

// @desc    Update a daily goal
// @route   PUT /api/daily-goals/:id
// @access  Private
const updateDailyGoal = asyncHandler(async (req, res) => {
    const goal = await DailyGoal.findById(req.params.id);

    if (!goal) {
        res.status(404);
        throw new Error('Daily Goal not found');
    }

    // Make sure the logged in user matches the goal user
    if (goal.userId.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    // Handle streak logic if completed status is being updated
    if (req.body.completed !== undefined && req.body.completed !== goal.completed) {
        if (req.body.completed) {
            // Goal is being marked as completed
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (goal.lastCompletedDate) {
                const lastDate = new Date(goal.lastCompletedDate);
                lastDate.setHours(0, 0, 0, 0);

                const yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate() - 1);

                if (lastDate.getTime() === yesterday.getTime()) {
                    // Completed yesterday, increment streak
                    req.body.streak = (goal.streak || 0) + 1;
                } else if (lastDate.getTime() === today.getTime()) {
                    // Already completed today, keep current streak
                    req.body.streak = goal.streak;
                } else {
                    // Gap in completion, reset streak to 1
                    req.body.streak = 1;
                }
            } else {
                // First time completion
                req.body.streak = 1;
            }
            req.body.lastCompletedDate = dateFromKey(todayDateKey());
        } else {
            // Goal is being unmarked (rare but possible)
            // We could decrement streak if it was incremented today, but for simplicity
            // let's just keep the streak as is or handle it based on requirements.
            // Usually, unmarking doesn't reset the streak unless it's a new day and was never marked.
        }
    }

    const updatedGoal = await DailyGoal.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (req.body.emailReminders === true && !goal.emailReminders) {
        await User.findByIdAndUpdate(req.user.id, {
            $unset: { lastReminderSent: '', lastReminderDateKey: '' },
        });
    }

    if (req.body.completed === true && goal.completed === false) {
        await logGoalCompletion(req.user.id, goal._id);
    } else if (req.body.completed === false && goal.completed === true) {
        await removeGoalCompletion(req.user.id, goal._id);
    }

    if (req.body.completed === true && goal.completed === false && updatedGoal.emailReminders) {
        const reminderEmail = req.user.getReminderEmail?.() || req.user.reminderEmail?.trim() || req.user.email?.trim();
        if (reminderEmail) {
            try {
                await sendEmail({
                    email: reminderEmail,
                    subject: `Goal Completed: ${updatedGoal.title} 🚀`,
                    message: `Great job, ${req.user.name}!\n\nYou've successfully completed your daily goal: "${updatedGoal.title}".\n\n🔥 CURRENT STREAK: ${updatedGoal.streak} DAYS 🔥\n\nKeep up the amazing momentum and finish the week strong!\n\nBest,\nThe Learning Tracker Team`,
                });
                console.log(`Completion email sent to ${reminderEmail} for goal: ${updatedGoal.title}`);
            } catch (error) {
                console.error('Error sending goal completion email:', error.message);
            }
        }
    }

    res.status(200).json(updatedGoal);
});

// @desc    Delete a daily goal
// @route   DELETE /api/daily-goals/:id
// @access  Private
const deleteDailyGoal = asyncHandler(async (req, res) => {
    const goal = await DailyGoal.findById(req.params.id);

    if (!goal) {
        res.status(404);
        throw new Error('Daily Goal not found');
    }

    // Make sure the logged in user matches the goal user
    if (goal.userId.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await DailyGoalCompletion.deleteMany({ goalId: goal._id });
    await goal.deleteOne();

    res.status(200).json({ id: req.params.id });
});

// @desc    Get daily goal completion activity for consistency graph
// @route   GET /api/daily-goals/activity
// @access  Private
const getDailyGoalActivity = asyncHandler(async (req, res) => {
    await syncTodayCompletions(req.user.id);

    const totalGoals = await DailyGoal.countDocuments({ userId: req.user.id });
    const totalDays = ACTIVITY_WEEKS * 7;
    const todayKey = todayDateKey();
    const [ty, tm, td] = todayKey.split('-').map(Number);
    const today = new Date(ty, tm - 1, td);

    const start = new Date(today);
    start.setDate(start.getDate() - (totalDays - 1));

    const startKey = getLocalDateKey(start);
    const countByDate = await buildCountByDate(req.user.id, startKey, todayKey);

    const days = [];
    for (let i = 0; i < totalDays; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        const dateKey = getLocalDateKey(d);
        const count = countByDate[dateKey] || 0;
        const isToday = dateKey === todayKey;
        const allCompleted = isToday && totalGoals > 0 && count >= totalGoals;

        days.push({
            date: dateKey,
            count,
            dayOfWeek: d.getDay(),
            isToday,
            allCompleted,
        });
    }

    const totalCompletions = days.reduce((sum, day) => sum + day.count, 0);
    const activeDays = days.filter((day) => day.count > 0).length;
    const todayDay = days.find((day) => day.isToday);
    const allCompletedToday = Boolean(todayDay?.allCompleted);

    res.status(200).json({
        weeks: ACTIVITY_WEEKS,
        days,
        totalCompletions,
        activeDays,
        totalGoals,
        todayKey,
        allCompletedToday,
    });
});

module.exports = {
    createDailyGoal,
    getDailyGoals,
    updateDailyGoal,
    deleteDailyGoal,
    getDailyGoalActivity,
};
