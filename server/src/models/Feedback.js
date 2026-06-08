const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        userName: {
            type: String,
            default: '',
        },
        userEmail: {
            type: String,
            default: '',
        },
        category: {
            type: String,
            enum: ['bug', 'ui', 'feature', 'other'],
            default: 'bug',
        },
        message: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2000,
        },
        page: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            enum: ['open', 'reviewed', 'resolved'],
            default: 'open',
        },
    },
    {
        timestamps: true,
    }
);

feedbackSchema.index({ userId: 1, createdAt: -1 });
feedbackSchema.index({ status: 1, createdAt: -1 });

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
