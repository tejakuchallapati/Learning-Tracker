const asyncHandler = require('express-async-handler');
const TimeLog = require('../models/TimeLog');
const LearningGoal = require('../models/LearningGoal');

// @desc    Log study time
// @route   POST /api/time/log
// @access  Private
const logTime = asyncHandler(async (req, res) => {
    const { goalId, hours, date } = req.body;

    if (!goalId || !hours) {
        res.status(400);
        throw new Error('Please provide goalId and hours');
    }

    // Ensure goal exist and belongs to user
    const goal = await LearningGoal.findById(goalId);
    if (!goal || goal.userId.toString() !== req.user.id) {
        res.status(404);
        throw new Error('Goal not found or unauthorized');
    }

    const timeLog = await TimeLog.create({
        userId: req.user.id,
        goalId,
        hours,
        date: date ? new Date(date) : Date.now()
    });

    res.status(201).json(timeLog);
});

// @desc    Get study time stats
// @route   GET /api/time/stats
// @access  Private
const getTimeStats = asyncHandler(async (req, res) => {
    // We can aggregate time stats. E.g., total learning hours, weekly learning time.
    const userId = req.user._id;

    // Calculate start of this week
    const curr = new Date();
    const first = curr.getDate() - curr.getDay();
    const startOfWeek = new Date(curr.setDate(first));
    startOfWeek.setHours(0, 0, 0, 0);

    const logs = await TimeLog.find({ userId });

    let totalHours = 0;
    let weeklyHours = 0;

    logs.forEach(log => {
        totalHours += log.hours;
        if (new Date(log.date) >= startOfWeek) {
            weeklyHours += log.hours;
        }
    });

    res.status(200).json({
        totalHours,
        weeklyHours
    });
});

module.exports = {
    logTime,
    getTimeStats
};
