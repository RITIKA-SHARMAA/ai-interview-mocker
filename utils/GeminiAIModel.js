// // GeminiModel.js
// import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
//
// const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
//
// const genAI = new GoogleGenerativeAI(apiKey);
//
// const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
// });
//
// const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
// };
//
// const safetySettings = [
//     {
//         category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//         category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//         category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//         category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
// ];
//
// export default async function handler(req, res) {
//     if (req.method !== "POST") {
//         return res.status(405).json({ error: "Only POST requests are allowed" });
//     }
//
//     const { prompt } = req.body;
//
//     try {
//         const chat = await model.startChat({
//             generationConfig,
//             safetySettings,
//             history: [], // Optional: can add initial context here
//         });
//
//         const result = await chat.sendMessage(prompt);
//         const responseText = await result.response.text();
//
//         res.status(200).json({ result: responseText });
//     } catch (error) {
//         console.error("Gemini API Error:", error);
//         res.status(500).json({ error: "Failed to generate interview questions" });
//     }
// }
//
//
// //apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,