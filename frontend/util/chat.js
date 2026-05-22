import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: req.body.message }],
            model: "gpt-4",
        });

        res.status(200).json(completion);
    } catch (error) {
        console.error('Chat API Error:', error);
        res.status(500).json({ error: 'Error processing your request' });
    }
}