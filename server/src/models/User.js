const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            trim: true,
            lowercase: true,
        },
        reminderEmail: {
            type: String,
            trim: true,
            lowercase: true,
        },
        bio: {
            type: String,
            default: 'Full Stack Developer | Continuous Learner',
        },
        specialization: {
            type: String,
            default: 'Software Engineering',
        },
        role: {
            type: String,
            default: 'Learner Pro',
        },
        emailNotification: {
            type: Boolean,
            default: true,
        },
        streakAlertNotification: {
            type: Boolean,
            default: true,
        },
        reminderTime: {
            type: String,
        },
        reminderAmPm: {
            type: String,
        },
        lastReminderSent: {
            type: Date,
        },
        lastReminderDateKey: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.getReminderEmail = function getReminderEmail() {
    return this.reminderEmail?.trim() || this.email?.trim() || '';
};

const User = mongoose.model('User', userSchema);
module.exports = User;
