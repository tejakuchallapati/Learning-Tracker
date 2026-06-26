/** True when Resend API or Gmail SMTP credentials are configured. */
const isEmailConfigured = () =>
    Boolean(
        process.env.RESEND_API_KEY ||
            (process.env.EMAIL_USER && process.env.EMAIL_PASS)
    );

module.exports = { isEmailConfigured };
