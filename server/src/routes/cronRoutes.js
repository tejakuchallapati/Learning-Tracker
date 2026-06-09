const express = require('express');
const { checkAndSendReminders } = require('../utils/cronJobs');

const router = express.Router();

const authorizeCron = (req, res, next) => {
    const secret = process.env.CRON_SECRET;
    if (!secret) {
        return res.status(503).json({ message: 'CRON_SECRET is not configured on the server.' });
    }

    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : req.query.secret;

    if (token !== secret) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
};

// Ping from Render Cron / cron-job.org every minute so reminders run on hosted API
router.post('/reminders', authorizeCron, async (req, res) => {
    const result = await checkAndSendReminders();
    res.json({ ok: true, ...result });
});

router.get('/reminders', authorizeCron, async (req, res) => {
    const result = await checkAndSendReminders();
    res.json({ ok: true, ...result });
});

module.exports = router;
