import { getChatResponse } from "../../lib/GeminiAIModel";
export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Only POST allowed" });
    }

    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        const result = await getChatResponse(prompt);
        res.status(200).json({ result });
    } catch (err) {
        console.error("Error generating questions:", err);
        res.status(500).json({ error: "Failed to generate response" });
    }
}
