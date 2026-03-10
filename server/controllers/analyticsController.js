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

    // 1. Total study hours & Weekly study hours
    const curr = new Date();
    const first = curr.getDate() - curr.getDay();
    const startOfWeek = new Date(curr.setDate(first));
    startOfWeek.setHours(0, 0, 0, 0);

    const timeLogs = await TimeLog.find({ userId });
    let totalHours = 0;
    let weeklyHours = 0;

    timeLogs.forEach(log => {
        totalHours += log.hours;
        if (new Date(log.date) >= startOfWeek) {
            weeklyHours += log.hours;
        }
    });

    // 2. Active goals
    const goals = await LearningGoal.find({ userId });
    const activeGoalsCount = goals.length; // Assuming all returned are active or you can filter by status if added

    // 3. Completion percentages and smart progress analysis
    let goalProgressList = [];

    for (let goal of goals) {
        const progress = await Progress.findOne({ goalId: goal._id });
        const completedDays = progress ? progress.completedDays : 0;

        const currentProgressPercent = calculateProgress(completedDays, goal.startDate, goal.endDate);

        // Expected progress based on days passed
        const now = new Date();
        const start = new Date(goal.startDate);
        const end = new Date(goal.endDate);

        const totalGoalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const passedDays = Math.ceil((now - start) / (1000 * 60 * 60 * 24));

        let expectedPercent = Math.round((passedDays / totalGoalDays) * 100);
        if (expectedPercent < 0) expectedPercent = 0;
        if (expectedPercent > 100) expectedPercent = 100;

        let suggestion = "You are on track! Keep it up.";
        if (currentProgressPercent < expectedPercent) {
            suggestion = `Study extra hours this week to catch up to the expected ${expectedPercent}%.`;
        }

        goalProgressList.push({
            goalId: goal._id,
            technology: goal.technology,
            currentProgress: currentProgressPercent,
            expectedProgress: expectedPercent,
            suggestion
        });
    }

    // 4. Consistency metrics (basic example, count unique days studied)
    const uniqueStudyDays = new Set(timeLogs.map(log => new Date(log.date).toDateString())).size;

    res.status(200).json({
        totalStudyHours: totalHours,
        weeklyStudyHours: weeklyHours,
        activeGoals: activeGoalsCount,
        consistencyMetrics: {
            uniqueStudyDays
        },
        goalsAnalysis: goalProgressList
    });
});

module.exports = {
    getDashboardData
};
