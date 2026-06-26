const crypto = require('crypto');
const Otp = require('../models/Otp');
const sendEmail = require('./emailService');
const { resendApiKey } = require('./emailConfig');
const { maskEmail } = require('./emailUtils');

const OTP_TTL_MS = 10 * 60 * 1000;
const MAX_VERIFY_ATTEMPTS = 5;

const hashCode = (code) => crypto.createHash('sha256').update(String(code)).digest('hex');

const generateCode = () => String(crypto.randomInt(100000, 999999));

const sendOtpEmail = async (email, code) => {
    const mock = process.env.OTP_MOCK === 'true' || !resendApiKey();

    if (mock) {
        console.log(`[OTP email → ${maskEmail(email)}] Your code is ${code} (valid 10 min)`);
        return;
    }

    await sendEmail({
        email,
        subject: 'Your Learning Tracker login code',
        message: `Your login code is ${code}.\n\nIt expires in 10 minutes. If you didn't request this, you can ignore this email.\n\n— Learning Tracker`,
    });
};

const createAndSendOtp = async (email) => {
    const code = generateCode();
    const expiresAt = new Date(Date.now() + OTP_TTL_MS);

    await Otp.deleteMany({ email });
    await Otp.create({
        email,
        codeHash: hashCode(code),
        expiresAt,
    });

    await sendOtpEmail(email, code);

    return { expiresInSeconds: OTP_TTL_MS / 1000 };
};

const verifyOtp = async (email, code) => {
    const record = await Otp.findOne({ email }).sort({ createdAt: -1 });
    if (!record) {
        throw new Error('OTP expired or not found. Please request a new code.');
    }

    if (record.expiresAt.getTime() < Date.now()) {
        await Otp.deleteOne({ _id: record._id });
        throw new Error('OTP has expired. Please request a new code.');
    }

    if (record.attempts >= MAX_VERIFY_ATTEMPTS) {
        await Otp.deleteOne({ _id: record._id });
        throw new Error('Too many wrong attempts. Please request a new code.');
    }

    if (hashCode(code) !== record.codeHash) {
        record.attempts += 1;
        await record.save();
        throw new Error('Invalid OTP. Please try again.');
    }

    await Otp.deleteOne({ _id: record._id });
    return true;
};

module.exports = { createAndSendOtp, verifyOtp };
