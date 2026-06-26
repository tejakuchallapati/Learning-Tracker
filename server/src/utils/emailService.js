const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error('EMAIL_USER and EMAIL_PASS must be set in server/.env');
    }

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        connectionTimeout: 15000,
        greetingTimeout: 15000,
        socketTimeout: 20000,
    });

    // Define the email options
    const mailOptions = {
        from: `Learning Tracker <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
