const asyncHandler = require('express-async-handler');
const LearningGoal = require('../models/LearningGoal');

// @desc    Create a new goal
// @route   POST /api/goals/create
// @access  Private
const createGoal = asyncHandler(async (req, res) => {
    const { technology, durationDays, dailyTargetHours, startDate, endDate } = req.body;

    if (!technology || !durationDays || !dailyTargetHours || !endDate) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    const goal = await LearningGoal.create({
        userId: req.user.id,
        technology,
        durationDays,
        dailyTargetHours,
        startDate: startDate || Date.now(),
        endDate,
    });

    res.status(201).json(goal);
});

// @desc    Get user goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await LearningGoal.find({ userId: req.user.id }).sort('-createdAt');
    res.status(200).json(goals);
});

// @desc    Update a goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await LearningGoal.findById(req.params.id);

    if (!goal) {
        res.status(404);
        throw new Error('Goal not found');
    }

    // Make sure the logged in user matches the goal user
    if (goal.userId.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedGoal = await LearningGoal.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedGoal);
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await LearningGoal.findById(req.params.id);

    if (!goal) {
        res.status(404);
        throw new Error('Goal not found');
    }

    // Make sure the logged in user matches the goal user
    if (goal.userId.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await goal.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    createGoal,
    getGoals,
    updateGoal,
    deleteGoal,
};
