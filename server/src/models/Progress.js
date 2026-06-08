const mongoose = require('mongoose');

const progressSchema = mongoose.Schema(
    {
        goalId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'LearningGoal',
        },
        completedDays: {
            type: Number,
            default: 0,
        },
        lastCompletedDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

progressSchema.index({ goalId: 1 });

const Progress = mongoose.model('Progress', progressSchema);
module.exports = Progress;
