/**
 * Send a test email via Brevo.
 * Usage: node scripts/testEmail.js you@example.com
 */
require('dotenv').config();
const sendEmail = require('../src/utils/emailService');
const { isEmailConfigured, getEmailProvider } = require('../src/utils/emailConfig');

const to = process.argv[2];

const run = async () => {
    if (!to) {
        console.error('Usage: node scripts/testEmail.js you@example.com');
        process.exit(1);
    }
    if (!isEmailConfigured()) {
        console.error('BREVO_API_KEY must be set in server/.env');
        process.exit(1);
    }
    console.log(`Provider: ${getEmailProvider()}`);
    console.log(`Sending test email to ${to}...`);
    await sendEmail({
        email: to,
        subject: 'Learning Tracker - Test Email',
        message: 'If you received this, email is configured correctly.',
    });
    console.log('Test email sent successfully.');
};

run().catch((err) => {
    console.error('Test email failed:', err.message);
    process.exit(1);
});
