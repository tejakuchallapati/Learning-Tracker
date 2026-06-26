const nodemailer = require('nodemailer');
const dns = require('dns');
const { resendApiKey, gmailUser, gmailPass } = require('./emailConfig');

const lookupIpv4 = (hostname, _options, callback) => {
    dns.lookup(hostname, { family: 4 }, callback);
};

const sendViaResend = async ({ email, subject, message }) => {
    const from = process.env.EMAIL_FROM?.trim() || 'Learning Tracker <onboarding@resend.dev>';
    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${resendApiKey()}`,
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

const sendViaGmail = async ({ email, subject, message }) => {
    const user = gmailUser();
    const pass = gmailPass();
    if (!user || !pass) {
        throw new Error('EMAIL_USER and EMAIL_PASS must be set in server/.env');
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        family: 4,
        auth: { user, pass },
        connectionTimeout: 15000,
        greetingTimeout: 15000,
        socketTimeout: 20000,
        lookup: lookupIpv4,
    });

    await transporter.sendMail({
        from: `Learning Tracker <${user}>`,
        to: email,
        subject,
        text: message,
    });
};

const sendEmail = async (options) => {
    if (resendApiKey()) {
        return sendViaResend(options);
    }

    if (process.env.NODE_ENV === 'production') {
        throw new Error(
            'RESEND_API_KEY is not set on this server. Add it in Render → Environment, remove EMAIL_USER/EMAIL_PASS, then Save rebuild and deploy.'
        );
    }

    return sendViaGmail(options);
};

module.exports = sendEmail;
