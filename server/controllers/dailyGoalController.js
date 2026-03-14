const asyncHandler = require('express-async-handler');
const DailyGoal = require('../models/DailyGoal');

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
        emailReminders: emailReminders || false,
    });

    res.status(201).json(goal);
});

// @desc    Get user daily goals
// @route   GET /api/daily-goals
// @access  Private
const getDailyGoals = asyncHandler(async (req, res) => {
    // Get goals created today or incomplete goals from previous days?
    // Let's just return all of the user's daily goals, maybe sorted by incomplete first and then by date.
    const goals = await DailyGoal.find({ userId: req.user.id })
        .sort({ completed: 1, createdAt: -1 });
    
    res.status(200).json(goals);
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

    const updatedGoal = await DailyGoal.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

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

    await goal.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    createDailyGoal,
    getDailyGoals,
    updateDailyGoal,
    deleteDailyGoal,
};
