import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface BlogSummary {
  summary: string;
  keyPoints: string[];
  readingTime: number;
}

export async function generateBlogSummary(content: string, title: string): Promise<BlogSummary> {
  try {
    // Remove HTML tags and calculate reading time
    const plainText = content.replace(/<[^>]*>/g, '');
    const wordCount = plainText.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert content summarizer specializing in business and startup articles. 
          Create concise, engaging summaries that capture the essence of the content. 
          Respond with JSON in this exact format: {
            "summary": "100-word summary",
            "keyPoints": ["point 1", "point 2", "point 3"]
          }`
        },
        {
          role: "user",
          content: `Summarize this blog post about "${title}" in exactly 100 words and extract 3-4 key points:

${plainText.substring(0, 3000)}`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 500
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    return {
      summary: result.summary || 'Summary not available',
      keyPoints: result.keyPoints || [],
      readingTime
    };
  } catch (error) {
    console.error('Error generating blog summary:', error);
    throw new Error('Failed to generate AI summary');
  }
}

export async function generateBlogExcerpt(content: string, title: string): Promise<string> {
  try {
    const plainText = content.replace(/<[^>]*>/g, '');
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Create a compelling 2-3 sentence excerpt for this blog post that will entice readers to click and read more. Focus on the main value proposition and keep it under 200 characters."
        },
        {
          role: "user",
          content: `Title: ${title}\n\nContent: ${plainText.substring(0, 1500)}`
        }
      ],
      temperature: 0.7,
      max_tokens: 100
    });

    return response.choices[0].message.content?.trim() || 
           plainText.substring(0, 150) + '...';
  } catch (error) {
    console.error('Error generating blog excerpt:', error);
    throw new Error('Failed to generate AI excerpt');
  }
}