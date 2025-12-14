import { useState, useCallback, useRef } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export interface AltTextContext {
  workspaceName: string;
  cityName: string;
  areaName?: string;
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

export interface BulkAltTextResponse {
  success: boolean;
  workspace: {
    id: number;
    name: string;
    city: string;
    area?: string;
  };
  altTextVariations: Array<GeneratedAltText & { imageIndex: number }>;
}

/**
 * Hook for AI-powered alt text generation for workspace images
 */
export function useAltTextGenerator() {
  const [cachedAltTexts, setCachedAltTexts] = useState<Map<string, GeneratedAltText>>(new Map());
  const activeRequests = useRef<Map<string, Promise<{ altText: GeneratedAltText | string }>>>(new Map());

  // Generate single alt text with deduplication
  const generateAltTextMutation = useMutation({
    mutationFn: async (context: AltTextContext): Promise<{ altText: GeneratedAltText | string }> => {
      const cacheKey = `${context.workspaceName}-${context.cityName}-${context.imageIndex || 0}`;
      
      // Check if there's already an active request for this key
      const existingRequest = activeRequests.current.get(cacheKey);
      if (existingRequest) {
        console.log('Reusing existing request for:', cacheKey);
        return existingRequest;
      }

      // Create new request
      const requestPromise = apiRequest('/api/ai/generate-alt-text', {
        method: 'POST',
        body: JSON.stringify(context),
      }).finally(() => {
        // Clean up after request completes
        activeRequests.current.delete(cacheKey);
      });

      // Store the request promise to prevent duplicates
      activeRequests.current.set(cacheKey, requestPromise);
      
      return requestPromise;
    },
    onSuccess: (data, variables) => {
      // Cache the result for future use
      const cacheKey = `${variables.workspaceName}-${variables.cityName}-${variables.imageIndex || 0}`;
      if (typeof data.altText === 'object') {
        setCachedAltTexts(prev => new Map(prev.set(cacheKey, data.altText as GeneratedAltText)));
      }
    },
    onError: (error, variables) => {
      console.error('Alt text generation failed:', error);
      // Don't cache errors, just let them fail gracefully
    }
  });

  // Generate bulk alt text for workspace
  const generateBulkAltTextMutation = useMutation({
    mutationFn: async (workspaceId: number): Promise<BulkAltTextResponse> => {
      return apiRequest(`/api/ai/generate-bulk-alt-text/${workspaceId}`, {
        method: 'POST',
      });
    },
    onSuccess: (data) => {
      // Cache all generated alt texts
      data.altTextVariations.forEach((variation) => {
        const cacheKey = `${data.workspace.name}-${data.workspace.city}-${variation.imageIndex}`;
        setCachedAltTexts(prev => new Map(prev.set(cacheKey, variation)));
      });
    },
  });

  // Get cached alt text
  const getCachedAltText = useCallback((
    workspaceName: string, 
    cityName: string, 
    imageIndex: number = 0
  ): GeneratedAltText | null => {
    const cacheKey = `${workspaceName}-${cityName}-${imageIndex}`;
    return cachedAltTexts.get(cacheKey) || null;
  }, [cachedAltTexts]);

  // Generate SEO-formatted alt text (primary format)
  const generateSEOAltText = useCallback((workspaceName: string, cityName: string): string => {
    return `Virtual Office in ${cityName}, Virtual Office in ${workspaceName}`;
  }, []);

  // Generate contextual alt text with fallback
  const generateContextualAltText = useCallback(async (
    context: AltTextContext
  ): Promise<string> => {
    try {
      // Check cache first
      const cached = getCachedAltText(
        context.workspaceName, 
        context.cityName, 
        context.imageIndex || 0
      );
      
      if (cached) {
        return cached.primary;
      }

      // Generate new alt text
      const result = await generateAltTextMutation.mutateAsync(context);
      
      if (typeof result.altText === 'string') {
        return result.altText;
      } else {
        return result.altText.primary;
      }
    } catch (error) {
      console.warn('Alt text generation failed, using fallback:', error instanceof Error ? error.message : String(error));
      
      // Don't throw errors - silently fall back to SEO format
      return generateSEOAltText(context.workspaceName, context.cityName);
    }
  }, [getCachedAltText, generateAltTextMutation, generateSEOAltText]);

  return {
    // Mutations
    generateAltText: generateAltTextMutation.mutateAsync,
    generateBulkAltText: generateBulkAltTextMutation.mutateAsync,
    
    // State
    isGenerating: generateAltTextMutation.isPending || generateBulkAltTextMutation.isPending,
    error: generateAltTextMutation.error || generateBulkAltTextMutation.error,
    
    // Utilities
    getCachedAltText,
    generateSEOAltText,
    generateContextualAltText,
    
    // Cache management
    clearCache: () => setCachedAltTexts(new Map()),
    cacheSize: cachedAltTexts.size,
  };
}

/**
 * Hook for automatically generating alt text for workspace images
 */
export function useWorkspaceImageAltText(
  workspaceName: string,
  cityName: string,
  areaName?: string,
  features?: string[],
  amenities?: string[]
) {
  const { generateSEOAltText, generateContextualAltText } = useAltTextGenerator();

  // Generate alt text for specific image index
  const getAltTextForImage = useCallback(async (
    imageIndex: number = 0,
    totalImages: number = 1,
    imageDescription?: string
  ): Promise<string> => {
    const context: AltTextContext = {
      workspaceName,
      cityName,
      areaName,
      imageIndex: imageIndex + 1, // Convert to 1-based index
      totalImages,
      workspaceFeatures: features,
      workspaceAmenities: amenities,
      imageDescription,
    };

    return generateContextualAltText(context);
  }, [workspaceName, cityName, areaName, features, amenities, generateContextualAltText]);

  // Get basic SEO alt text (immediate, no async)
  const getBasicAltText = useCallback(() => {
    return generateSEOAltText(workspaceName, cityName);
  }, [workspaceName, cityName, generateSEOAltText]);

  return {
    getAltTextForImage,
    getBasicAltText,
  };
}