require('dotenv').config();
const nodemailer = require('nodemailer');

const requiredVars = ['EMAIL_SERVER_USER', 'EMAIL_SERVER_PASSWORD', 'ADMIN_EMAIL'];
const isEmailConfigured = requiredVars.every(varName => !!process.env[varName]);

let transporter = null;

if (isEmailConfigured) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false // Only for development
        }
    });

    transporter.verify((error) => {
        if (error) {
            console.error('SMTP Connection Error:', error);
        } else {
            console.log('Server is ready to send emails');
        }
    });
} else {
    console.warn('Email configuration is incomplete. Email functionality will be disabled.');
}

module.exports = { transporter, isEmailConfigured };