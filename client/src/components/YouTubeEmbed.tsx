import React from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
}

// Function to extract YouTube video ID from various URL formats
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  
  // If it's already just an ID (11 characters, alphanumeric)
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }
  
  // YouTube URL patterns
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|m\.youtube\.com\/watch\?v=|youtube\.com\/watch\?.*&v=)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/live\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return null;
}

export default function YouTubeEmbed({ videoId, title = "YouTube video", className = "" }: YouTubeEmbedProps) {
  if (!videoId) return null;
  
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  
  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
        <iframe
          src={embedUrl}
          title={title}
          className="absolute top-0 left-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}

// Component for admin form input with YouTube URL validation
interface YouTubeInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}

export function YouTubeInput({ value, onChange, placeholder = "YouTube URL or Video ID", className = "", error }: YouTubeInputProps) {
  const [localValue, setLocalValue] = React.useState(value);
  const [previewId, setPreviewId] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    setLocalValue(value);
    if (value) {
      const id = extractYouTubeVideoId(value);
      setPreviewId(id);
    } else {
      setPreviewId(null);
    }
  }, [value]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    
    if (newValue) {
      const id = extractYouTubeVideoId(newValue);
      setPreviewId(id);
      onChange(id || newValue); // Store the ID if valid, otherwise store the raw value
    } else {
      setPreviewId(null);
      onChange('');
    }
  };
  
  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        {localValue && !previewId && (
          <p className="mt-1 text-sm text-amber-600">
            Invalid YouTube URL. Please enter a valid YouTube video URL or video ID.
          </p>
        )}
        {previewId && (
          <p className="mt-1 text-sm text-green-600">
            ✓ Valid YouTube video ID: {previewId}
          </p>
        )}
      </div>
      
      {previewId && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Preview:</h4>
          <YouTubeEmbed videoId={previewId} className="max-w-md" />
        </div>
      )}
    </div>
  );
}