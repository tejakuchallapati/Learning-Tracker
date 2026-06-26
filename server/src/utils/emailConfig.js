const resendApiKey = () => process.env.RESEND_API_KEY?.trim() || '';

/** True when Resend API key is configured. */
const isEmailConfigured = () => Boolean(resendApiKey());

const getEmailProvider = () => (resendApiKey() ? 'resend' : 'none');

module.exports = { isEmailConfigured, getEmailProvider, resendApiKey };
