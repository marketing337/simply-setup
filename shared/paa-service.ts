import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface PAAQuestion {
  question: string;
  answer: string;
}

export interface PAAResponse {
  questions: PAAQuestion[];
  cityName: string;
}

export async function generatePAAQuestions(cityName: string): Promise<PAAResponse> {
  try {
    const prompt = `Generate 5 common "People Also Ask" questions and detailed answers about virtual offices in ${cityName}, India. Focus on practical business concerns like GST registration, legal compliance, company registration, costs, and local business benefits.

Format your response as JSON with this structure:
{
  "questions": [
    {
      "question": "Question text here",
      "answer": "Detailed answer here (2-3 sentences)"
    }
  ]
}

Make the questions specific to ${cityName} where relevant, and ensure answers are informative and helpful for businesses considering virtual office services.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert on virtual office services in India. Provide accurate, helpful information about virtual offices, GST registration, and business compliance."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 1500,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      questions: result.questions || [],
      cityName
    };
  } catch (error) {
    console.error("Failed to generate PAA questions:", error);
    throw new Error("Failed to generate PAA content: " + (error as Error).message);
  }
}