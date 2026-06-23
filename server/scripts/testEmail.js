/**
 * Send a test email using server/.env EMAIL_USER / EMAIL_PASS.
 * Usage: node scripts/testEmail.js [to@email.com]
 */
require('dotenv').config();
const sendEmail = require('../src/utils/emailService');

const to = process.argv[2] || process.env.EMAIL_USER;

const run = async () => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('EMAIL_USER and EMAIL_PASS must be set in server/.env');
        process.exit(1);
    }
    console.log(`Sending test email from ${process.env.EMAIL_USER} to ${to}...`);
    await sendEmail({
        email: to,
        subject: 'Learning Tracker - Test Email',
        message: 'If you received this, email reminders are configured correctly.',
    });
    console.log('Test email sent successfully.');
};

run().catch((err) => {
    console.error('Test email failed:', err.message);
    process.exit(1);
});
