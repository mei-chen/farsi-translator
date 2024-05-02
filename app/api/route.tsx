import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

// Define a type for the request body
interface TranslateRequest {
    text: string;
    targetLanguage: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { text, targetLanguage } = req.body as TranslateRequest;

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        try {
            const response = await openai.chat.completions.create({
                messages: [{ role: "user", content: "Say this is a test" }],
                model: "gpt-3.5-turbo",
            });

            res.status(200).json({ translatedText: response.choices});
        } catch (error) {
            res.status(500).json({ error: 'Failed to translate text' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
