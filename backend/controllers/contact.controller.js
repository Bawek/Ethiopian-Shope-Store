const { sendContactEmail } = require('../services/emailService');
const { z } = require('zod');

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string()
        .regex(/^[+]?[0-9\s\-]{10,15}$/, "Please enter a valid phone number")
        .optional(),
    message: z.string().min(10, "Message must be at least 10 characters")
});

exports.submitContactForm = async (req, res) => {
    try {
        // Validate input
        const validatedData = contactSchema.parse(req.body);

        // Send emails
        await sendContactEmail(validatedData);

        res.status(200).json({
            success: true,
            message: 'Message sent successfully'
        });
    } catch (error) {
        console.error('Contact form error:', error);

        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: error.errors
            });
        }

        res.status(500).json({
            success: false,
            message: error.message || 'Failed to send message'
        });
    }
};