const asyncHandler = require('express-async-handler');
const Feedback = require('../models/Feedback');
const sendEmail = require('../utils/emailService');
const { isEmailConfigured } = require('../utils/emailConfig');

const VALID_CATEGORIES = ['bug', 'ui', 'feature', 'other'];

const CATEGORY_LABELS = {
    bug: 'Something is broken',
    ui: 'Hard to use / confusing',
    feature: 'Missing feature',
    other: 'Other',
};

const notifyAdminOfReport = async (report) => {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    if (!adminEmail || !isEmailConfigured()) {
        console.log('[feedback] New issue report (email not configured):', {
            id: report._id,
            from: report.userEmail,
            category: report.category,
            page: report.page,
        });
        return;
    }

    const body = [
        'New issue report — Learning Tracker',
        '',
        `From: ${report.userName || 'Unknown'} <${report.userEmail || 'no email'}>`,
        `Category: ${CATEGORY_LABELS[report.category] || report.category}`,
        `Page: ${report.page || '(not specified)'}`,
        `Report ID: ${report._id}`,
        '',
        'Message:',
        report.message,
    ].join('\n');

    try {
        await sendEmail({
            email: adminEmail,
            subject: `[Learning Tracker] Issue report — ${CATEGORY_LABELS[report.category] || report.category}`,
            message: body,
        });
    } catch (err) {
        console.error('[feedback] Failed to email admin:', err.message);
    }
};

// @desc    Submit user feedback / issue report
// @route   POST /api/feedback
// @access  Private
const submitFeedback = asyncHandler(async (req, res) => {
    const { category, message, page } = req.body;

    if (!message || !String(message).trim()) {
        res.status(400);
        throw new Error('Please describe the issue you are facing');
    }

    const trimmed = String(message).trim();
    if (trimmed.length < 10) {
        res.status(400);
        throw new Error('Please provide a bit more detail (at least 10 characters)');
    }

    const safeCategory = VALID_CATEGORIES.includes(category) ? category : 'other';

    const report = await Feedback.create({
        userId: req.user.id,
        userName: req.user.name || '',
        userEmail: req.user.email || '',
        category: safeCategory,
        message: trimmed,
        page: page ? String(page).slice(0, 500) : '',
    });

    await notifyAdminOfReport(report);

    res.status(201).json({
        _id: report._id,
        message: 'Thanks — we received your report and will look into it.',
    });
});

module.exports = {
    submitFeedback,
};
