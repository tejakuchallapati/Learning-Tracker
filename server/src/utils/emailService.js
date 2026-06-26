const { resendApiKey } = require('./emailConfig');

const sendEmail = async ({ email, subject, message }) => {
    const apiKey = resendApiKey();
    if (!apiKey) {
        throw new Error(
            'RESEND_API_KEY is not set. Add it in Render → Environment (or server/.env for local dev).'
        );
    }

    const from = process.env.EMAIL_FROM?.trim() || 'Learning Tracker <onboarding@resend.dev>';
    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from,
            to: [email],
            subject,
            text: message,
        }),
    });

    if (!response.ok) {
        const body = await response.text();
        throw new Error(body || `Resend API error ${response.status}`);
    }
};

module.exports = sendEmail;
