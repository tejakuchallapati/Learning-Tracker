const resendApiKey = () => process.env.RESEND_API_KEY?.trim() || '';
const gmailUser = () => process.env.EMAIL_USER?.trim() || '';
const gmailPass = () => process.env.EMAIL_PASS?.trim() || '';

/** True when Resend API or Gmail SMTP credentials are configured. */
const isEmailConfigured = () =>
    Boolean(resendApiKey() || (gmailUser() && gmailPass()));

const getEmailProvider = () => {
    if (resendApiKey()) return 'resend';
    if (gmailUser() && gmailPass()) return 'gmail';
    return 'none';
};

module.exports = { isEmailConfigured, getEmailProvider, resendApiKey, gmailUser, gmailPass };
