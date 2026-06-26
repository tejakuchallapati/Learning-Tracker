const { resendApiKey } = require('./emailConfig');

const parseResendError = (body, status) => {
    try {
        const data = JSON.parse(body);
        const msg = data.message || data.error || '';
        if (status === 403 && msg.includes('only send testing emails')) {
            return 'This email cannot receive login codes yet. Use the email tied to your Resend account, or verify a domain at resend.com/domains.';
        }
        if (msg) return msg;
    } catch {
        // not JSON
    }
    return body || `Resend API error ${status}`;
};

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
        throw new Error(parseResendError(body, response.status));
    }
};

module.exports = sendEmail;
