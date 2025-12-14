import OpenAI from "openai";
import { Workspace } from "@shared/schema";

// Initialize the OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Export the OpenAI client instance
export { openai };

// Function to generate chat completions with GPT-4o
export async function generateChatCompletion(
  prompt: string,
  systemPrompt: string = "You are a helpful assistant.",
  maxTokens: number = 1000
) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: maxTokens,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating chat completion:", error);
    throw new Error("Failed to generate response from OpenAI");
  }
}

// Function to generate workspace recommendations based on user input
export async function generateWorkspaceRecommendation(
  businessType: string,
  teamSize: string,
  requirements: string,
  locationName: string
) {
  const systemPrompt = `You are a workspace recommendation specialist with expertise in office space solutions. 
Your task is to provide detailed, helpful, and personalized workspace recommendations based on the user's business needs.
Focus on being practical, informative, and relevant to the user's location and requirements.`;

  const prompt = `I need a workspace recommendation for my business with the following details:
- Business Type: ${businessType}
- Team Size: ${teamSize}
- Location: ${locationName}
- Special Requirements: ${requirements || "None specified"}

Please provide a detailed recommendation with:
1. The type of workspace that would suit my business (coworking, private office, virtual office, etc.)
2. Specific features that would benefit my business type
3. Considerations based on my team size
4. How the location (${locationName}) might influence the recommendation
5. Any additional suggestions based on my special requirements

Format your response in a conversational, helpful way without using markdown headers.`;

  return generateChatCompletion(prompt, systemPrompt, 1200);
}

// Function to answer questions about workspaces
export async function answerWorkspaceQuestion(question: string) {
  const systemPrompt = `You are a knowledgeable workspace consultant with expertise in virtual offices, coworking spaces, and office solutions.
Your answers should be helpful, accurate, and focused on workspace-related topics.
Provide detailed explanations and practical information that users would find valuable.
If a question is outside your expertise about workspaces, politely explain that you specialize in workspace-related topics.`;

  return generateChatCompletion(question, systemPrompt, 1000);
}

// Function to generate smart workspace recommendations based on user preferences and available workspaces
export async function generateSmartRecommendations(
  workspaces: Workspace[],
  userPreferences: {
    businessType?: string;
    teamSize?: string;
    locationName?: string;
    budget?: string;
    amenities?: string[];
  } = {}
) {
  try {
    // If no workspaces are provided, return empty recommendations
    if (!workspaces || workspaces.length === 0) {
      return [];
    }

    const { businessType, teamSize, locationName, budget, amenities } = userPreferences;

    // Create a system prompt for the recommendation engine
    const systemPrompt = `You are an AI workspace recommendation engine with expertise in matching businesses with ideal office spaces.
Your task is to analyze a set of available workspaces and provide personalized recommendations based on user preferences.
For each recommendation, explain why it's a good fit based on the available data and user preferences.
Your recommendations should be data-driven, insightful, and helpful for users looking for the perfect workspace.`;

    // Create a prompt with workspace details and user preferences
    const workspaceData = workspaces.map(workspace => ({
      id: workspace.id,
      name: workspace.name,
      slug: workspace.slug,
      description: workspace.description,
      monthlyPrice: workspace.monthlyPrice,
      amenities: workspace.amenities || [],
      features: workspace.features || [],
      location: workspace.locationId, // We'll use the location ID since we don't have the name here
      area: workspace.areaId // We'll use the area ID since we don't have the name here
    }));

    const prompt = `I need personalized workspace recommendations from the following available workspaces:
${JSON.stringify(workspaceData, null, 2)}

Here are my preferences (if specified):
${businessType ? `- Business Type: ${businessType}` : ''}
${teamSize ? `- Team Size: ${teamSize}` : ''}
${locationName ? `- Preferred Location: ${locationName}` : ''}
${budget ? `- Budget: ${budget}` : ''}
${amenities && amenities.length > 0 ? `- Desired Amenities: ${amenities.join(', ')}` : ''}

Please provide recommendations in JSON format with the following structure:
[
  {
    "workspaceId": number,
    "reason": "A concise explanation of why this workspace is recommended based on the user's preferences",
    "matchScore": number // A score from 0-100 indicating how well this workspace matches the user's preferences
  }
]

Limit your response to the top 5 recommendations with the highest match scores.
Only include workspaceId, reason, and matchScore fields.
Return a valid JSON array that can be parsed directly.`;

    // Call OpenAI to get the recommendations
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 2000,
    });

    const responseContent = response.choices[0].message.content;
    if (!responseContent) {
      throw new Error("No recommendation content received from the API");
    }

    // Parse the JSON response
    const recommendationsData = JSON.parse(responseContent);
    
    // Map the recommendations to include the full workspace data
    const recommendations = recommendationsData.recommendations || recommendationsData;
    
    if (!Array.isArray(recommendations)) {
      throw new Error("Invalid recommendation format received from the API");
    }
    
    // Map the recommendations to include the full workspace data
    return recommendations.map(rec => {
      const workspace = workspaces.find(w => w.id === rec.workspaceId);
      return {
        ...rec,
        workspace: workspace,
      };
    });
  } catch (error) {
    console.error("Error generating smart recommendations:", error);
    throw new Error("Failed to generate workspace recommendations");
  }
}