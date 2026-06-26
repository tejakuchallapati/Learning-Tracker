const mongoose = require('mongoose');

const otpSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            index: true,
            lowercase: true,
            trim: true,
        },
        codeHash: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
            index: { expires: 0 },
        },
        attempts: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Otp', otpSchema);
