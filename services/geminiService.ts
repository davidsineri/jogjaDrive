
import { GoogleGenAI } from "@google/genai";
import { CARS } from "../constants";

const API_KEY = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_INSTRUCTION = `
You are JogjaDrive Assistant, a friendly local car rental expert in Yogyakarta, Indonesia.
Your goal is to help users find the perfect rental car based on their travel plans in Jogja.

Guidelines:
1. Provide recommendations using our specific fleet: ${JSON.stringify(CARS.map(c => ({ name: c.name, category: c.category, passengers: c.passengers, price: c.pricePerDay })))}.
2. Suggest specific Jogja destinations like Borobudur, Prambanan, Malioboro, or Merapi Lava Tour based on their needs.
3. Be helpful, professional, and use a bit of local warmth (Indonesian/English is fine).
4. If they have a large group (8+), suggest the Toyota Hiace.
5. For narrow Jogja streets near Malioboro, suggest a City Car like Honda Brio.
6. For rugged terrain like Gunung Kidul or Merapi, suggest an SUV.
`;

export async function getAiRecommendation(userMessage: string, history: { role: 'user' | 'model', text: string }[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf, asisten kami sedang beristirahat. Silakan pilih armada langsung di bawah ya!";
  }
}
