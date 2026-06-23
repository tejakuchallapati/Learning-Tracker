/**
 * Clear today's reminder lock so the next cron run can retry sending.
 * Usage: node scripts/resetReminderSlot.js [email]
 */
require('dotenv').config();
const connectDB = require('../src/config/db');
const User = require('../src/models/User');
const mongoose = require('mongoose');

const email = process.argv[2] || 'teja26kt@gmail.com';

const run = async () => {
    await connectDB();
    const result = await User.updateOne(
        { email },
        { $unset: { lastReminderSent: '', lastReminderDateKey: '' } }
    );
    console.log(`Reset reminder slot for ${email}:`, result);
    await mongoose.disconnect();
};

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
