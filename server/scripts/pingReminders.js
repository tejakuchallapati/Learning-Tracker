/**
 * Ping Render cron endpoint with timeout + one retry.
 * Requires CRON_SECRET and API_URL (optional) in environment.
 */
require('dotenv').config();

const apiUrl =
    process.env.API_URL ||
    'https://learning-tracker-ko02.onrender.com/api/cron/reminders';
const secret = process.env.CRON_SECRET;
const TIMEOUT_MS = 55000;

if (!secret) {
    console.error('CRON_SECRET is not set — cannot ping reminder endpoint.');
    process.exit(1);
}

const ping = async () => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${secret}`,
                'Content-Type': 'application/json',
            },
            signal: controller.signal,
        });

        const body = await response.text();
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${body}`);
        }

        console.log('Reminder ping OK:', body);
        return true;
    } finally {
        clearTimeout(timer);
    }
};

const run = async () => {
    try {
        await ping();
    } catch (firstErr) {
        console.warn('Reminder ping failed, retrying once:', firstErr.message);
        await new Promise((r) => setTimeout(r, 3000));
        try {
            await ping();
        } catch (retryErr) {
            console.error('Reminder ping failed after retry:', retryErr.message);
            process.exit(1);
        }
    }
};

run().catch((err) => {
    console.error('Reminder ping error:', err.message);
    process.exit(1);
});
