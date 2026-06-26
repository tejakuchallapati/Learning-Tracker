const brevoApiKey = () => process.env.BREVO_API_KEY?.trim() || '';
const resendApiKey = () => process.env.RESEND_API_KEY?.trim() || '';

/** True when Brevo or Resend API key is configured. */
const isEmailConfigured = () => Boolean(brevoApiKey() || resendApiKey());

const getEmailProvider = () => {
    if (brevoApiKey()) return 'brevo';
    if (resendApiKey()) return 'resend';
    return 'none';
};

/** Parse `Name <email@example.com>` or plain email for Brevo sender. */
const parseSender = () => {
    const raw = process.env.EMAIL_FROM?.trim() || '';
    const bracketed = raw.match(/^(.+?)\s*<([^>]+)>$/);
    if (bracketed) {
        return { name: bracketed[1].trim(), email: bracketed[2].trim().toLowerCase() };
    }
    if (raw.includes('@')) {
        return {
            name: process.env.BREVO_SENDER_NAME?.trim() || 'Learning Tracker',
            email: raw.toLowerCase(),
        };
    }
    const email = process.env.BREVO_SENDER_EMAIL?.trim().toLowerCase() || '';
    return {
        name: process.env.BREVO_SENDER_NAME?.trim() || 'Learning Tracker',
        email,
    };
};

module.exports = {
    isEmailConfigured,
    getEmailProvider,
    brevoApiKey,
    resendApiKey,
    parseSender,
};
