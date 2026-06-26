const nodemailer = require('nodemailer');
const dns = require('dns');

const lookupIpv4 = (hostname, _options, callback) => {
    dns.lookup(hostname, { family: 4 }, callback);
};

const sendViaResend = async ({ email, subject, message }) => {
    const from = process.env.EMAIL_FROM || `Learning Tracker <onboarding@resend.dev>`;
    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
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
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error('EMAIL_USER and EMAIL_PASS must be set in server/.env');
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        family: 4,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        connectionTimeout: 15000,
        greetingTimeout: 15000,
        socketTimeout: 20000,
        lookup: lookupIpv4,
    });

    await transporter.sendMail({
        from: `Learning Tracker <${process.env.EMAIL_USER}>`,
        to: email,
        subject,
        text: message,
    });
};

const sendEmail = async (options) => {
    if (process.env.RESEND_API_KEY) {
        return sendViaResend(options);
    }
    return sendViaGmail(options);
};

module.exports = sendEmail;
