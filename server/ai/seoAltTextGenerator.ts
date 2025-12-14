import { openai } from '../services/openai';
import { Workspace, Location, Area } from '@shared/schema';

export interface AltTextContext {
  workspaceName: string;
  cityName: string;
  areaName?: string;
  workspaceType?: string;
  imageIndex?: number;
  totalImages?: number;
  workspaceFeatures?: string[];
  workspaceAmenities?: string[];
  imageDescription?: string;
}

export interface GeneratedAltText {
  primary: string;
  secondary: string;
  descriptive: string;
  seoOptimized: string;
}

/**
 * AI-SEO Engine for generating dynamic alt text for workspace images
 * Format: "Virtual Office in CityName, Virtual Office in WorkSpaceName"
 */
export class SEOAltTextGenerator {
  private failureCount = 0;
  private lastFailureTime = 0;
  private readonly maxFailures = 10; // Circuit breaker threshold
  private readonly failureResetTime = 5 * 60 * 1000; // 5 minutes
  
  /**
   * Check if circuit breaker is open (too many recent failures)
   */
  private isCircuitOpen(): boolean {
    if (this.failureCount >= this.maxFailures) {
      const timeSinceLastFailure = Date.now() - this.lastFailureTime;
      if (timeSinceLastFailure > this.failureResetTime) {
        // Reset circuit breaker
        this.failureCount = 0;
        return false;
      }
      return true;
    }
    return false;
  }

  /**
   * Record a failure for circuit breaker
   */
  private recordFailure(): void {
    this.failureCount++;
    this.lastFailureTime = Date.now();
  }

  /**
   * Record a success for circuit breaker
   */
  private recordSuccess(): void {
    this.failureCount = Math.max(0, this.failureCount - 1);
  }
  
  /**
   * Generate SEO-optimized alt text for workspace images with retry logic
   */
  async generateAltText(context: AltTextContext, retryCount = 0): Promise<GeneratedAltText> {
    const maxRetries = 3;
    
    // Check circuit breaker
    if (this.isCircuitOpen()) {
      console.log('Circuit breaker is open, using fallback alt text generation');
      return this.generateFallbackAltText(context);
    }
    
    try {
      const systemPrompt = `You are an SEO specialist expert in creating highly optimized image alt text for virtual office and workspace websites.
Your task is to generate multiple variations of alt text that:
1. Follow SEO best practices (50-125 characters optimal)
2. Include relevant keywords naturally
3. Are descriptive and accessible
4. Help with local SEO
5. Follow the primary format: "Virtual Office in [CityName], Virtual Office in [WorkSpaceName]"

Always provide JSON responses with exactly these fields: primary, secondary, descriptive, seoOptimized`;

      const userPrompt = `Generate alt text variations for a workspace image with these details:
- Workspace Name: ${context.workspaceName}
- City: ${context.cityName}
- Area: ${context.areaName || 'Not specified'}
- Image Position: ${context.imageIndex ? `${context.imageIndex} of ${context.totalImages}` : 'Main image'}
- Features: ${context.workspaceFeatures?.join(', ') || 'Professional workspace'}
- Amenities: ${context.workspaceAmenities?.join(', ') || 'Modern facilities'}

Primary format must be: "Virtual Office in ${context.cityName}, Virtual Office in ${context.workspaceName}"

Generate 4 variations:
1. primary: Exact format requested above
2. secondary: Alternative SEO-focused variation
3. descriptive: More detailed description including features
4. seoOptimized: Perfect balance of SEO keywords and readability

Respond in JSON format only.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
        max_tokens: 800
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error("No content received from OpenAI");
      }

      // Clean the content before parsing to handle any formatting issues
      const cleanContent = content.trim();
      if (!cleanContent.startsWith('{') || !cleanContent.endsWith('}')) {
        throw new Error("Invalid JSON format received from OpenAI");
      }

      let generated: GeneratedAltText;
      try {
        generated = JSON.parse(cleanContent) as GeneratedAltText;
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Content received:', content);
        throw new Error(`Failed to parse AI response: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
      }
      
      // Validate the response has required fields
      if (!generated.primary || !generated.secondary || !generated.descriptive || !generated.seoOptimized) {
        throw new Error("Invalid response format from AI");
      }

      // Record success
      this.recordSuccess();
      return generated;
      
    } catch (error) {
      console.error(`Error generating AI alt text (attempt ${retryCount + 1}):`, error);
      
      // Record failure
      this.recordFailure();
      
      // Check if it's a rate limit error - use fallback immediately
      const isRateLimitError = (error && typeof error === 'object' && 
        ('status' in error && error.status === 429)) ||
        (error instanceof Error && error.message.includes('rate limit'));
      
      if (isRateLimitError) {
        console.log('Rate limit detected, using fallback alt text generation immediately');
        return this.generateFallbackAltText(context);
      }
      
      // Retry logic for other API failures (not rate limits)
      if (retryCount < maxRetries && 
          (error instanceof Error && 
           (error.message.includes('timeout') || 
            error.message.includes('network') ||
            error.message.includes('503') ||
            error.message.includes('502')))) {
        
        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
        console.log(`Retrying after ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.generateAltText(context, retryCount + 1);
      }
      
      // Fallback to rule-based generation
      return this.generateFallbackAltText(context);
    }
  }

  /**
   * Generate multiple alt text options for workspace images
   */
  async generateBulkAltText(
    workspace: Workspace, 
    location: Location, 
    area?: Area
  ): Promise<Array<GeneratedAltText & { imageIndex: number }>> {
    const context: AltTextContext = {
      workspaceName: workspace.name,
      cityName: location.name,
      areaName: area?.name,
      workspaceFeatures: workspace.features || [],
      workspaceAmenities: workspace.amenities || [],
      totalImages: workspace.images?.length || 1
    };

    const results: Array<GeneratedAltText & { imageIndex: number }> = [];

    // Generate alt text for each image
    const imageCount = workspace.images?.length || 1;
    for (let i = 0; i < imageCount; i++) {
      const imageContext = {
        ...context,
        imageIndex: i + 1
      };

      try {
        const altText = await this.generateAltText(imageContext);
        results.push({ ...altText, imageIndex: i });
      } catch (error) {
        console.error(`Error generating alt text for image ${i}:`, error);
        
        // Add fallback for this image
        const fallback = this.generateFallbackAltText(imageContext);
        results.push({ ...fallback, imageIndex: i });
      }
    }

    return results;
  }

  /**
   * Rule-based fallback alt text generation
   */
  private generateFallbackAltText(context: AltTextContext): GeneratedAltText {
    const { workspaceName, cityName, areaName, imageIndex, totalImages } = context;
    
    const primary = `Virtual Office in ${cityName}, Virtual Office in ${workspaceName}`;
    
    const secondary = areaName 
      ? `${workspaceName} Virtual Office Space in ${areaName}, ${cityName}`
      : `${workspaceName} Virtual Office Space in ${cityName}`;
    
    const descriptive = imageIndex 
      ? `Professional virtual office workspace at ${workspaceName} in ${areaName || cityName} - Image ${imageIndex} of ${totalImages}`
      : `Professional virtual office workspace at ${workspaceName} in ${areaName || cityName}`;
    
    const seoOptimized = areaName
      ? `Virtual Office ${workspaceName} ${areaName} ${cityName} - Professional Business Address`
      : `Virtual Office ${workspaceName} ${cityName} - Professional Business Address`;

    return {
      primary,
      secondary,
      descriptive,
      seoOptimized
    };
  }

  /**
   * Generate contextual alt text based on image content analysis
   */
  async generateContextualAltText(
    context: AltTextContext,
    imageDescription?: string
  ): Promise<string> {
    if (!imageDescription) {
      return this.generateFallbackAltText(context).primary;
    }

    // Check circuit breaker for contextual generation too
    if (this.isCircuitOpen()) {
      console.log('Circuit breaker is open, using fallback for contextual alt text');
      return this.generateFallbackAltText(context).primary;
    }

    try {
      const systemPrompt = `Create SEO-optimized alt text for workspace images. 
Format: "Virtual Office in [CityName], Virtual Office in [WorkSpaceName]"
Keep it under 125 characters and naturally incorporate the image content.`;

      const userPrompt = `Create alt text for:
Workspace: ${context.workspaceName}
Location: ${context.cityName}
Image shows: ${imageDescription}
Required format: "Virtual Office in ${context.cityName}, Virtual Office in ${context.workspaceName}"`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.2,
        max_tokens: 150
      });

      const altText = response.choices[0].message.content?.trim();
      
      if (altText && altText.length <= 125 && altText.length > 0) {
        this.recordSuccess();
        return altText;
      }
      
      return this.generateFallbackAltText(context).primary;
    } catch (error) {
      console.error('Error generating contextual alt text:', error);
      this.recordFailure();
      return this.generateFallbackAltText(context).primary;
    }
  }
}

// Export singleton instance
export const seoAltTextGenerator = new SEOAltTextGenerator();

// Convenience function for generating workspace alt text
export async function generateWorkspaceAltText(context: AltTextContext): Promise<GeneratedAltText> {
  return seoAltTextGenerator.generateAltText(context);
}