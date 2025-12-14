import { useState, useEffect, useRef } from 'react';
import { useWorkspaceImageAltText } from '@/hooks/useAltTextGenerator';

interface SEOOptimizedImageProps {
  src: string;
  alt?: string;
  workspaceName?: string;
  cityName?: string;
  areaName?: string;
  imageIndex?: number;
  totalImages?: number;
  workspaceFeatures?: string[];
  workspaceAmenities?: string[];
  imageDescription?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'auto' | 'sync';
  sizes?: string;
  onClick?: () => void;
  autoGenerateAltText?: boolean;
}

/**
 * SEO-optimized image component with AI-powered alt text generation
 * Automatically generates workspace-specific alt text in the format:
 * "Virtual Office in CityName, Virtual Office in WorkSpaceName"
 */
export default function SEOOptimizedImage({
  src,
  alt,
  workspaceName,
  cityName,
  areaName,
  imageIndex = 0,
  totalImages = 1,
  workspaceFeatures,
  workspaceAmenities,
  imageDescription,
  className = '',
  width,
  height,
  priority = false,
  fallbackSrc = 'https://placehold.co/600x400?text=Image+Not+Available',
  loading = 'lazy',
  decoding = 'async',
  sizes,
  onClick,
  autoGenerateAltText = true,
}: SEOOptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [generatedAltText, setGeneratedAltText] = useState<string>(alt || '');
  const [isGeneratingAlt, setIsGeneratingAlt] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const { getAltTextForImage, getBasicAltText } = useWorkspaceImageAltText(
    workspaceName || '',
    cityName || '',
    areaName,
    workspaceFeatures,
    workspaceAmenities
  );

  // Reset states when src changes
  useEffect(() => {
    setImgSrc(src);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  // Generate alt text when workspace data is available
  useEffect(() => {
    const generateAltText = async () => {
      // If alt text is provided explicitly, use it
      if (alt) {
        setGeneratedAltText(alt);
        return;
      }

      // If workspace data is not available, skip auto-generation
      if (!autoGenerateAltText || !workspaceName || !cityName) {
        return;
      }

      try {
        setIsGeneratingAlt(true);
        
        // Try to generate contextual alt text
        const contextualAlt = await getAltTextForImage(
          imageIndex,
          totalImages,
          imageDescription
        );
        
        setGeneratedAltText(contextualAlt);
      } catch (error) {
        console.error('Error generating alt text:', error);
        
        // Fallback to basic SEO format
        const basicAlt = getBasicAltText();
        setGeneratedAltText(basicAlt);
      } finally {
        setIsGeneratingAlt(false);
      }
    };

    generateAltText();
  }, [
    alt,
    autoGenerateAltText,
    workspaceName,
    cityName,
    imageIndex,
    totalImages,
    imageDescription
    // Removed getAltTextForImage and getBasicAltText from dependencies to prevent infinite loop
  ]);

  // Handle image errors
  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  // Handle image loading complete
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Get the final alt text to use
  const finalAltText = generatedAltText || alt || 'Workspace image';

  return (
    <div 
      className={`relative overflow-hidden ${!isLoaded ? 'loading-skeleton' : ''} ${className}`} 
      style={{ 
        contentVisibility: 'auto', 
        containIntrinsicSize: width && height ? `${width}px ${height}px` : 'auto 200px' 
      }}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="loading-skeleton w-8 h-8 rounded-full"></div>
        </div>
      )}
      
      {/* Alt text generation indicator */}
      {isGeneratingAlt && autoGenerateAltText && (
        <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-md opacity-75">
          Generating SEO alt text...
        </div>
      )}
      
      <img
        ref={imgRef}
        src={imgSrc}
        alt={finalAltText}
        title={finalAltText}
        width={width}
        height={height}
        className={`w-full h-full object-cover transition-opacity duration-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading={priority ? 'eager' : loading}
        decoding={decoding}
        sizes={sizes}
        onError={handleError}
        onLoad={handleLoad}
        onClick={onClick}
        style={{ contain: 'layout style paint' }}
      />
    </div>
  );
}

/**
 * Wrapper component for workspace images with automatic SEO alt text
 */
export function WorkspaceImage({
  src,
  workspace,
  location,
  area,
  imageIndex = 0,
  ...props
}: Omit<SEOOptimizedImageProps, 'workspaceName' | 'cityName' | 'areaName'> & {
  workspace?: { name: string; features?: string[]; amenities?: string[] };
  location?: { name: string };
  area?: { name: string };
}) {
  return (
    <SEOOptimizedImage
      src={src}
      workspaceName={workspace?.name}
      cityName={location?.name}
      areaName={area?.name}
      workspaceFeatures={workspace?.features}
      workspaceAmenities={workspace?.amenities}
      imageIndex={imageIndex}
      autoGenerateAltText={true}
      {...props}
    />
  );
}