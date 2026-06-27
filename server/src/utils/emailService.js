const { brevoApiKey, parseSender } = require('./emailConfig');

const parseBrevoError = (body, status) => {
    try {
        const data = JSON.parse(body);
        const msg = String(data.message || data.error || '').toLowerCase();
        if (msg.includes('key not found') || status === 401) {
            return 'Email service misconfigured: invalid Brevo API key. In Render, set BREVO_API_KEY to a new key from Brevo → SMTP & API → API keys (starts with xkeysib-).';
        }
        if (data.message) return data.message;
    } catch {
        // not JSON
    }
    return body || `Brevo API error ${status}`;
};

const sendEmail = async ({ email, subject, message }) => {
    const apiKey = brevoApiKey();
    if (!apiKey) {
        throw new Error(
            'BREVO_API_KEY is not set. Add it in Render → Environment (Brevo → SMTP & API → API keys).'
        );
    }

    const sender = parseSender();
    if (!sender.email) {
        throw new Error(
            'EMAIL_FROM must include your verified Brevo sender, e.g. Learning Tracker <you@gmail.com>'
        );
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'api-key': apiKey,
            accept: 'application/json',
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            sender: { name: sender.name, email: sender.email },
            to: [{ email }],
            subject,
            textContent: message,
        }),
    });

    if (!response.ok) {
        const body = await response.text();
        throw new Error(parseBrevoError(body, response.status));
    }
};

module.exports = sendEmail;
