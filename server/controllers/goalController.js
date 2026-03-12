const asyncHandler = require('express-async-handler');
const LearningGoal = require('../models/LearningGoal');

// @desc    Create a new goal
// @route   POST /api/goals/create
// @access  Private
const createGoal = asyncHandler(async (req, res) => {
    const { technology, durationDays, dailyTargetHours, startDate, endDate, category, subTasks } = req.body;

    if (!technology || !durationDays || !dailyTargetHours || !endDate) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    const goal = await LearningGoal.create({
        userId: req.user.id,
        technology,
        category,
        subTasks: subTasks || [],
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

// @desc    Get pre-defined goal templates
// @route   GET /api/goals/templates
// @access  Private
const getGoalTemplates = asyncHandler(async (req, res) => {
    const templates = [
        {
            category: 'Frontend',
            technology: 'Frontend Web Development',
            durationDays: 90,
            dailyTargetHours: 2,
            subTasks: [
                { title: 'HTML5 & Semantic HTML', completed: false },
                { title: 'CSS3 & Flexbox/Grid', completed: false },
                { title: 'JavaScript (ES6+)', completed: false },
                { title: 'React Fundamentals', completed: false },
                { title: 'State Management (Redux/Context API)', completed: false },
            ]
        },
        {
            category: 'Backend',
            technology: 'Backend Development (Node.js)',
            durationDays: 60,
            dailyTargetHours: 2,
            subTasks: [
                { title: 'Node.js Basics', completed: false },
                { title: 'Express.js Framework', completed: false },
                { title: 'RESTful APIs', completed: false },
                { title: 'MongoDB & Mongoose', completed: false },
                { title: 'Authentication (JWT)', completed: false },
            ]
        },
        {
            category: 'Full Stack',
            technology: 'MERN Full Stack',
            durationDays: 120,
            dailyTargetHours: 3,
            subTasks: [
                { title: 'Frontend Basics (HTML/CSS/JS)', completed: false },
                { title: 'React JS', completed: false },
                { title: 'Node & Express Server', completed: false },
                { title: 'Database (MongoDB)', completed: false },
                { title: 'Connecting Frontend to Backend', completed: false },
                { title: 'Deployment (Render/Vercel)', completed: false },
            ]
        }
    ];
    res.status(200).json(templates);
});

module.exports = {
    createGoal,
    getGoals,
    updateGoal,
    deleteGoal,
    getGoalTemplates,
};
