const asyncHandler = require('express-async-handler');
const LearningGoal = require('../models/LearningGoal');
const Progress = require('../models/Progress');
const TimeLog = require('../models/TimeLog');
const { calculateProgress } = require('../utils/progressCalculator');

// @desc    Get combined analytics dashboard data
// @route   GET /api/analytics/dashboard
// @access  Private
const getDashboardData = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const [goals, timeLogs] = await Promise.all([
        LearningGoal.find({ userId }).select('technology startDate endDate').lean(),
        TimeLog.find({ userId }).select('hours date').lean(),
    ]);

    const goalIds = goals.map((g) => g._id);
    const progressList = goalIds.length
        ? await Progress.find({ goalId: { $in: goalIds } }).select('goalId completedDays').lean()
        : [];

    const progressByGoalId = new Map(
        progressList.map((p) => [p.goalId.toString(), p.completedDays ?? 0])
    );

    let totalHours = 0;
    let weeklyHours = 0;
    const uniqueStudyDays = new Set();

    for (const log of timeLogs) {
        totalHours += log.hours;
        const logDate = new Date(log.date);
        if (logDate >= startOfWeek) weeklyHours += log.hours;
        uniqueStudyDays.add(logDate.toDateString());
    }

    const goalProgressList = goals.map((goal) => {
        const completedDays = progressByGoalId.get(goal._id.toString()) ?? 0;
        const currentProgressPercent = calculateProgress(
            completedDays,
            goal.startDate,
            goal.endDate
        );

        const start = new Date(goal.startDate);
        const end = new Date(goal.endDate);
        const totalGoalDays = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
        const passedDays = Math.ceil((now - start) / (1000 * 60 * 60 * 24));

        let expectedPercent = Math.round((passedDays / totalGoalDays) * 100);
        expectedPercent = Math.min(100, Math.max(0, expectedPercent));

        let suggestion = 'You are on track! Keep it up.';
        if (currentProgressPercent < expectedPercent) {
            suggestion = `Study extra hours this week to catch up to the expected ${expectedPercent}%.`;
        }

        return {
            goalId: goal._id,
            technology: goal.technology,
            currentProgress: currentProgressPercent,
            expectedProgress: expectedPercent,
            suggestion,
        };
    });

    const completionRate =
        goalProgressList.length > 0
            ? Math.round(
                  goalProgressList.reduce((sum, g) => sum + g.currentProgress, 0) /
                      goalProgressList.length
              )
            : 0;

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weeklyActivity = [];
    for (let i = 6; i >= 0; i -= 1) {
        const dayStart = new Date(now);
        dayStart.setDate(now.getDate() - i);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(dayStart);
        dayEnd.setDate(dayStart.getDate() + 1);

        const hours = timeLogs
            .filter((log) => {
                const logDate = new Date(log.date);
                return logDate >= dayStart && logDate < dayEnd;
            })
            .reduce((sum, log) => sum + log.hours, 0);

        weeklyActivity.push({
            name: dayNames[dayStart.getDay()],
            hours: Math.round(hours * 10) / 10,
        });
    }

    res.status(200).json({
        totalStudyHours: Math.round(totalHours * 10) / 10,
        weeklyStudyHours: Math.round(weeklyHours * 10) / 10,
        activeGoals: goals.length,
        completionRate,
        consistencyMetrics: { uniqueStudyDays: uniqueStudyDays.size },
        goalsAnalysis: goalProgressList,
        weeklyActivity,
    });
});

module.exports = {
    getDashboardData
};
