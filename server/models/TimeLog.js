const mongoose = require('mongoose');

const timeLogSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        goalId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'LearningGoal',
        },
        hours: {
            type: Number,
            required: [true, 'Please add hours spent'],
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const TimeLog = mongoose.model('TimeLog', timeLogSchema);
module.exports = TimeLog;
