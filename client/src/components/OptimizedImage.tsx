import { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'auto' | 'sync';
  sizes?: string;
  onClick?: () => void;
}

/**
 * OptimizedImage component with lazy loading, proper alt text, and fallback handling
 * Improves Core Web Vitals scores for SEO by optimizing LCP (Largest Contentful Paint)
 */
export default function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  fallbackSrc = 'https://placehold.co/600x400?text=Image+Not+Available',
  loading = 'lazy',
  decoding = 'async',
  sizes,
  onClick,
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Reset the image source if the src prop changes
  useEffect(() => {
    setImgSrc(src);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);
  
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

  return (
    <div className={`relative overflow-hidden ${!isLoaded ? 'loading-skeleton' : ''} ${className}`} style={{ contentVisibility: 'auto', containIntrinsicSize: width && height ? `${width}px ${height}px` : 'auto 200px' }}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="loading-skeleton w-8 h-8 rounded-full"></div>
        </div>
      )}
      
      <img
        ref={imgRef}
        src={imgSrc}
        alt={alt}
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