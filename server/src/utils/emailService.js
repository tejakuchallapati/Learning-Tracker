const {
    brevoApiKey,
    resendApiKey,
    parseSender,
} = require('./emailConfig');

const parseApiError = (body, status, provider) => {
    try {
        const data = JSON.parse(body);
        const msg = data.message || data.error || '';
        if (provider === 'resend' && status === 403 && msg.includes('only send testing emails')) {
            return 'This email cannot receive messages yet. Verify a domain on Resend or switch to Brevo.';
        }
        if (msg) return msg;
    } catch {
        // not JSON
    }
    return body || `${provider} API error ${status}`;
};

const sendViaBrevo = async ({ email, subject, message }) => {
    const apiKey = brevoApiKey();
    const sender = parseSender();
    if (!sender.email) {
        throw new Error(
            'EMAIL_FROM must include your verified Brevo sender, e.g. Learning Tracker <teja26kt@gmail.com>'
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
        throw new Error(parseApiError(body, response.status, 'brevo'));
    }
};

const sendViaResend = async ({ email, subject, message }) => {
    const apiKey = resendApiKey();
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
        throw new Error(parseApiError(body, response.status, 'resend'));
    }
};

const sendEmail = async (options) => {
    if (brevoApiKey()) {
        return sendViaBrevo(options);
    }
    if (resendApiKey()) {
        return sendViaResend(options);
    }
    throw new Error(
        'BREVO_API_KEY is not set. Add it in Render → Environment (Brevo → SMTP & API → API keys).'
    );
};

module.exports = sendEmail;
