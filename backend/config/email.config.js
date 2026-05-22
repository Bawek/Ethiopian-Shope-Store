require('dotenv').config();
const nodemailer = require('nodemailer');

// Validate required environment variables
const requiredVars = ['EMAIL_SERVER_USER', 'EMAIL_SERVER_PASSWORD', 'ADMIN_EMAIL'];
for (const varName of requiredVars) {
    if (!process.env[varName]) {
        throw new Error(`Missing required environment variable: ${varName}`);
    }
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false // Only for development
    }
});

// Verify connection
transporter.verify((error) => {
    if (error) {
        console.error('SMTP Connection Error:', error);
    } else {
        console.log('Server is ready to send emails');
    }
});

module.exports = transporter;