const bodyParser = require('body-parser');
const { Webhook } = require('svix');
const httpError = require('./httpError');

const SIGNING_SECRET = process.env.SIGNING_SECRET;

if (!SIGNING_SECRET) {
    console.error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env');
    process.exit(1); // Stop the app if the secret is missing
}

// Middleware to parse raw JSON body
const rawBodyParser = bodyParser.raw({ type: 'application/json' });

// Middleware to verify webhook
const verifyWebhook = (req, res, next) => {
    const wh = new Webhook(SIGNING_SECRET);

    const headers = req.headers;
    const payload = req.body;

    const svix_id = headers['svix-id'];
    const svix_timestamp = headers['svix-timestamp'];
    const svix_signature = headers['svix-signature'];

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return next(new httpError('Error: Missing Svix headers', 400));
    }

    try {
        const evt = wh.verify(payload, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        });

        req.webhookEvent = evt; // Attach verified event to request
        next();
    } catch (err) {
        console.error('Error: Could not verify webhook:', err.message);
        return next(new httpError(`Error: ${err.message}`, 400));
    }
};

module.exports = { rawBodyParser, verifyWebhook };
