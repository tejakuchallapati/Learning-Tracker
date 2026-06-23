/**
 * Render Cron / cron-job.org: run every minute to wake API and send due reminders.
 * Requires CRON_SECRET and API_URL (optional) in environment.
 */
require('dotenv').config();

const apiUrl =
    process.env.API_URL ||
    'https://learning-tracker-api-hqzm.onrender.com/api/cron/reminders';
const secret = process.env.CRON_SECRET;

if (!secret) {
    console.error('CRON_SECRET is not set — cannot ping reminder endpoint.');
    process.exit(1);
}

const run = async () => {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${secret}`,
            'Content-Type': 'application/json',
        },
    });

    const body = await response.text();
    if (!response.ok) {
        console.error(`Reminder ping failed (${response.status}):`, body);
        process.exit(1);
    }

    console.log('Reminder ping OK:', body);
};

run().catch((err) => {
    console.error('Reminder ping error:', err.message);
    process.exit(1);
});
