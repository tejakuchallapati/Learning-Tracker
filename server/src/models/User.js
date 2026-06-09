const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
        },
        password: {
            type: String,
            required: false, // Optional for Google OAuth users
        },
        googleId: {
            type: String,
            required: false,
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
        pushNotification: {
            type: Boolean,
            default: false,
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
    },
    {
        timestamps: true,
    }
);

// Encrypt password before saving (skip for Google-only accounts with no password)
userSchema.pre('save', async function () {
    if (!this.isModified('password') || !this.password) {
        if (!this.password) {
            this.password = undefined;
        }
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    if (!this.password || !enteredPassword) {
        return false;
    }
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.usesGoogleAuth = function () {
    return Boolean(this.googleId);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
