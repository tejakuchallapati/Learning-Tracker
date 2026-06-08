const mongoose = require('mongoose');

const dailyGoalCompletionSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        goalId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'DailyGoal',
        },
        date: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

dailyGoalCompletionSchema.index({ userId: 1, goalId: 1, date: 1 }, { unique: true });
dailyGoalCompletionSchema.index({ userId: 1, date: 1 });

const DailyGoalCompletion = mongoose.model('DailyGoalCompletion', dailyGoalCompletionSchema);
module.exports = DailyGoalCompletion;
