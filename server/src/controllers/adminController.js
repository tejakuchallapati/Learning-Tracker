const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Feedback = require('../models/Feedback');
const LearningGoal = require('../models/LearningGoal');

const VALID_STATUSES = ['open', 'reviewed', 'resolved'];

// @desc    Admin overview stats
// @route   GET /api/admin/overview
// @access  Admin
const getOverview = asyncHandler(async (req, res) => {
    const [usersCount, openIssues, totalIssues, totalGoals] = await Promise.all([
        User.countDocuments(),
        Feedback.countDocuments({ status: 'open' }),
        Feedback.countDocuments(),
        LearningGoal.countDocuments(),
    ]);

    const recentIssues = await Feedback.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('userName userEmail category message page status createdAt');

    res.json({
        usersCount,
        openIssues,
        totalIssues,
        totalGoals,
        recentIssues,
    });
});

// @desc    List all users
// @route   GET /api/admin/users
// @access  Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
        .select('name email reminderEmail createdAt')
        .sort({ createdAt: -1 });

    res.json(users);
});

// @desc    List all issue reports
// @route   GET /api/admin/feedback
// @access  Admin
const getFeedback = asyncHandler(async (req, res) => {
    const { status } = req.query;
    const filter = status && VALID_STATUSES.includes(status) ? { status } : {};

    const reports = await Feedback.find(filter).sort({ createdAt: -1 });
    res.json(reports);
});

// @desc    Update issue report status
// @route   PATCH /api/admin/feedback/:id
// @access  Admin
const updateFeedbackStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;

    if (!VALID_STATUSES.includes(status)) {
        res.status(400);
        throw new Error('Invalid status');
    }

    const report = await Feedback.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
    );

    if (!report) {
        res.status(404);
        throw new Error('Report not found');
    }

    res.json(report);
});

module.exports = {
    getOverview,
    getUsers,
    getFeedback,
    updateFeedbackStatus,
};
