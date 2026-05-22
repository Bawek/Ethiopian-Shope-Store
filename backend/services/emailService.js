const transporter = require('../config/email.config');

exports.sendContactEmail = async ({ name, email, phone, message }) => {
    try {
        // Validate admin email
        if (!process.env.ADMIN_EMAIL.includes('@')) {
            throw new Error('Invalid admin email configuration');
        }

        // Send to admin
        await transporter.sendMail({
            from: `"${process.env.EMAIL_SENDER_NAME}" <${process.env.EMAIL_SERVER_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `New Contact: ${name}`,
            html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
            text: `New contact from ${name} (${email})\n\nMessage: ${message}`
        });

        // Send confirmation to user
        await transporter.sendMail({
            from: `"${process.env.EMAIL_SENDER_NAME}" <${process.env.EMAIL_SERVER_USER}>`,
            to: email,
            subject: 'Thank you for contacting us',
            html: `
        <h2>Thank you, ${name}!</h2>
        <p>We've received your message and will respond soon.</p>
        <p><em>Your message:</em></p>
        <blockquote>${message.replace(/\n/g, '<br>')}</blockquote>
      `
        });

        return { success: true };
    } catch (error) {
        console.error('Email send error:', error);
        throw error;
    }
};
exports.sendEmail = async ( to, subject, html ) => {
    console.log('Sending email to:', to, 'with subject:', subject);
    try {
        // Validate admin email
        if (!process.env.ADMIN_EMAIL.includes('@')) {
            throw new Error('Invalid admin email configuration');
        }
 
        // Send to admin
        await transporter.sendMail({
            from: '"EEP E-commerce" <eepecomerce@gmail.com>',
            to,
            subject,
            html
        });
        return { success: true };
    } catch (error) {
        console.error('Email send error:', error);
        throw error;
    }
};