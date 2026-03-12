const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        technology: {
            type: String,
            required: [true, 'Please add a technology to learn'],
        },
        category: {
            type: String,
            enum: ['Frontend', 'Backend', 'Full Stack', 'Other'],
            default: 'Other'
        },
        subTasks: [
            {
                title: String,
                completed: { type: Boolean, default: false }
            }
        ],
        durationDays: {
            type: Number,
            required: [true, 'Please add the duration in days'],
        },
        dailyTargetHours: {
            type: Number,
            required: [true, 'Please add daily target hours'],
        },
        startDate: {
            type: Date,
            default: Date.now,
        },
        endDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const LearningGoal = mongoose.model('LearningGoal', goalSchema);
module.exports = LearningGoal;
