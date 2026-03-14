const mongoose = require('mongoose');

const dailyGoalSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: [true, 'Please add a daily goal/task title'],
        },
        completed: {
            type: Boolean,
            default: false,
        },
        emailReminders: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const DailyGoal = mongoose.model('DailyGoal', dailyGoalSchema);
module.exports = DailyGoal;
