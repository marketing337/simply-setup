import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface SalutationResponse {
  vernacularSalutation: string;
  language: string;
  englishTranslation: string;
}

export async function getVernacularSalutation(cityName: string): Promise<SalutationResponse | null> {
  try {
    const prompt = `
      I need the most appropriate vernacular greeting for the city of ${cityName} in India.
      
      Please provide:
      1. The greeting in the native script (e.g., नमस्ते, வணக்கம், etc.)
      2. The name of the language
      3. The English translation of the greeting
      
      Please respond with JSON. Format your response as valid JSON with the following structure:
      {
        "vernacularSalutation": "greeting in native script",
        "language": "name of language",
        "englishTranslation": "translation in English"
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("Empty response from OpenAI");
    }

    return JSON.parse(content) as SalutationResponse;
  } catch (error) {
    console.error("Error generating vernacular salutation:", error);
    return null;
  }
}