const asyncHandler = require('express-async-handler');
const Progress = require('../models/Progress');
const LearningGoal = require('../models/LearningGoal');
const { calculateProgress } = require('../utils/progressCalculator');

// @desc    Mark day as complete
// @route   POST /api/progress/mark-complete
// @access  Private
const markComplete = asyncHandler(async (req, res) => {
    const { goalId } = req.body;

    if (!goalId) {
        res.status(400);
        throw new Error('Please provide goalId');
    }

    // Ensure goal exists and belongs to user
    const goal = await LearningGoal.findById(goalId);
    if (!goal || goal.userId.toString() !== req.user.id) {
        res.status(404);
        throw new Error('Goal not found or unauthorized');
    }

    // Find or create progress
    let progress = await Progress.findOne({ goalId });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!progress) {
        progress = await Progress.create({
            goalId,
            completedDays: 1,
            lastCompletedDate: today
        });
    } else {
        // Check if already marked complete today
        const lastDate = new Date(progress.lastCompletedDate);
        lastDate.setHours(0, 0, 0, 0);

        if (lastDate.getTime() === today.getTime()) {
            res.status(400);
            throw new Error('Already marked complete for today');
        }

        progress.completedDays += 1;
        progress.lastCompletedDate = today;
        await progress.save();
    }

    res.status(200).json(progress);
});

// @desc    Get progress details for a goal
// @route   GET /api/progress/:goalId
// @access  Private
const getProgress = asyncHandler(async (req, res) => {
    const goalId = req.params.goalId;

    const goal = await LearningGoal.findById(goalId);
    if (!goal || goal.userId.toString() !== req.user.id) {
        res.status(404);
        throw new Error('Goal not found or unauthorized');
    }

    const progress = await Progress.findOne({ goalId });

    let completedDays = 0;
    let lastCompletedDate = null;

    if (progress) {
        completedDays = progress.completedDays;
        lastCompletedDate = progress.lastCompletedDate;
    }

    const completionPercent = calculateProgress(completedDays, goal.startDate, goal.endDate);

    // days remaining
    const end = new Date(goal.endDate);
    const now = new Date();
    const remainingTime = end - now;
    const daysRemaining = remainingTime > 0 ? Math.ceil(remainingTime / (1000 * 60 * 60 * 24)) : 0;

    res.status(200).json({
        goalId,
        completedDays,
        completionPercent,
        daysRemaining,
        lastCompletedDate
    });
});

module.exports = {
    markComplete,
    getProgress
};
