const crypto = require('crypto');
const Otp = require('../models/Otp');
const { maskPhone } = require('./phoneUtils');

const OTP_TTL_MS = 10 * 60 * 1000;
const MAX_VERIFY_ATTEMPTS = 5;

const hashCode = (code) => crypto.createHash('sha256').update(String(code)).digest('hex');

const generateCode = () => String(crypto.randomInt(100000, 999999));

const sendSms = async (phone, message) => {
    const authKey = process.env.MSG91_AUTH_KEY?.trim();
    const mock = process.env.OTP_MOCK === 'true' || !authKey;

    if (mock) {
        console.log(`[OTP SMS → ${maskPhone(phone)}] ${message}`);
        return;
    }

    const mobile = phone.replace(/\D/g, '').replace(/^91/, '');
    const sender = process.env.MSG91_SENDER_ID?.trim() || 'LTTRCK';
    const url = new URL('https://control.msg91.com/api/v5/flow/');
    // Fallback: MSG91 legacy HTTP API
    const legacyUrl =
        `https://api.msg91.com/api/sendhttp.php?authkey=${encodeURIComponent(authKey)}` +
        `&mobiles=${encodeURIComponent(mobile)}` +
        `&message=${encodeURIComponent(message)}` +
        `&sender=${encodeURIComponent(sender)}` +
        `&route=4&country=91`;

    const response = await fetch(legacyUrl);
    const body = await response.text();
    if (!response.ok || body.toLowerCase().includes('error')) {
        console.error('MSG91 SMS failed:', body);
        throw new Error('Could not send OTP SMS. Try again in a moment.');
    }
};

const createAndSendOtp = async (phone) => {
    const code = generateCode();
    const expiresAt = new Date(Date.now() + OTP_TTL_MS);

    await Otp.deleteMany({ phone });
    await Otp.create({
        phone,
        codeHash: hashCode(code),
        expiresAt,
    });

    await sendSms(phone, `Your Learning Tracker login code is ${code}. Valid for 10 minutes.`);

    return { expiresInSeconds: OTP_TTL_MS / 1000 };
};

const verifyOtp = async (phone, code) => {
    const record = await Otp.findOne({ phone }).sort({ createdAt: -1 });
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
