import { useMemo } from 'react';

interface LinkifiedContentProps {
  content: string;
  className?: string;
}

// URL detection regex
const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

// Domain extraction
const extractDomain = (url: string): string => {
  try {
    return new URL(url).hostname;
  } catch {
    const match = url.match(/^https?:\/\/(?:www\.)?([^\/]+)/);
    return match ? match[1] : url;
  }
};

// Check if domain should be nofollowed
const shouldAddNoFollow = (domain: string): boolean => {
  const nofollowDomains = [
    'facebook.com',
    'twitter.com', 
    'x.com',
    'instagram.com',
    'linkedin.com',
    'youtube.com',
    'tiktok.com',
    'pinterest.com'
  ];
  
  return nofollowDomains.some(nofollowDomain => 
    domain.includes(nofollowDomain)
  );
};

// Check if it's an internal link
const isInternalLink = (domain: string): boolean => {
  const currentDomain = window.location.hostname;
  return domain === currentDomain || 
         domain === `www.${currentDomain}` ||
         domain.includes('aaddress.in');
};

// Convert URLs to clickable links with proper SEO attributes
const linkifyText = (text: string): string => {
  return text.replace(URL_REGEX, (url) => {
    const domain = extractDomain(url);
    const isInternal = isInternalLink(domain);
    const shouldNoFollow = shouldAddNoFollow(domain);
    
    // Build link attributes
    const attributes: string[] = [];
    
    // Add target="_blank" for external links
    if (!isInternal) {
      attributes.push('target="_blank"');
      attributes.push('rel="noopener noreferrer"');
    }
    
    // Add nofollow for certain domains
    if (shouldNoFollow) {
      const existingRel = attributes.find(attr => attr.startsWith('rel='));
      if (existingRel) {
        const relIndex = attributes.indexOf(existingRel);
        attributes[relIndex] = existingRel.replace('"', ' nofollow"');
      } else {
        attributes.push('rel="nofollow"');
      }
    }

    // Style links appropriately
    const linkClasses = isInternal 
      ? 'text-blue-600 hover:text-blue-800 underline decoration-blue-600/30 hover:decoration-blue-800/50 transition-colors'
      : 'text-green-600 hover:text-green-800 underline decoration-green-600/30 hover:decoration-green-800/50 transition-colors';

    const attributeString = attributes.length > 0 ? ` ${attributes.join(' ')}` : '';
    
    return `<a href="${url}" class="${linkClasses}"${attributeString}>${url}</a>`;
  });
};

// Decode HTML entities
const decodeHtmlEntities = (text: string): string => {
  const entities: { [key: string]: string } = {
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&#x27;': "'",
    '&#x2F;': '/',
    '&#x60;': '`',
    '&#x3D;': '=',
    '&nbsp;': ' '
  };
  
  return text.replace(/&[#\w]+;/g, (entity) => entities[entity] || entity);
};

// Fix malformed HTML links in content
const fixMalformedLinks = (text: string): string => {
  // First decode any HTML entities
  let fixedText = decodeHtmlEntities(text);
  
  // Debug: Let's see what we're working with
  console.log('Before fixing malformed links:', fixedText.substring(0, 1000));
  
  // Fix the double quote issue first - this is the root cause
  // Convert href=""URL"" to href="URL"
  fixedText = fixedText
    .replace(/href=""([^"]*?)""/gi, 'href="$1"')
    .replace(/rel=""([^"]*?)""/gi, 'rel="$1"')
    .replace(/target=""([^"]*?)""/gi, 'target="$1"')
    .replace(/style=""([^"]*?)""/gi, 'style="$1"')
    .replace(/class=""([^"]*?)""/gi, 'class="$1"');

  console.log('After fixing double quotes:', fixedText.substring(0, 1000));

  // Now we have clean anchor tags, so don't apply linkifyText to them again
  // Just ensure proper styling
  fixedText = fixedText.replace(
    /<a([^>]*?)href="([^"]*?)"([^>]*?)>([^<]*?)<\/a>/gi,
    (match, beforeHref, url, afterHref, linkText) => {
      const domain = extractDomain(url);
      const isInternal = isInternalLink(domain);
      
      const linkClasses = isInternal 
        ? 'text-blue-600 hover:text-blue-800 underline decoration-blue-600/30 hover:decoration-blue-800/50 transition-colors'
        : 'text-green-600 hover:text-green-800 underline decoration-green-600/30 hover:decoration-green-800/50 transition-colors';
      
      // Build attributes
      let attributes = [`href="${url}"`];
      
      // Add class
      attributes.push(`class="${linkClasses}"`);
      
      // Add target and rel for external links
      if (!isInternal) {
        attributes.push('target="_blank"');
        attributes.push('rel="noopener noreferrer"');
      }
      
      return `<a ${attributes.join(' ')}>${linkText}</a>`;
    }
  );

  console.log('After complete fix:', fixedText.substring(0, 1000));
  return fixedText;
};

export default function LinkifiedContent({ content, className = '' }: LinkifiedContentProps) {
  const linkifiedContent = useMemo(() => {
    // First fix any malformed HTML links
    let processedContent = fixMalformedLinks(content);
    
    // Debug: Log the processed content to see what's happening
    console.log('Original content sample:', content.substring(0, 500));
    console.log('Processed content sample:', processedContent.substring(0, 500));
    
    // Only linkify plain URLs if there aren't already anchor tags present
    // This prevents creating nested anchor tags
    if (!processedContent.includes('<a href=')) {
      processedContent = linkifyText(processedContent);
    } else {
      console.log('Skipping linkifyText because anchor tags already exist');
    }
    
    // Final debug to see the exact HTML being rendered
    console.log('Final HTML to render:', processedContent.substring(0, 1000));
    
    return processedContent;
  }, [content]);

  // Debug: Check if linkifiedContent is being escaped somehow
  console.log('About to render HTML:', typeof linkifiedContent, linkifiedContent.includes('<a href'));

  return (
    <div 
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: linkifiedContent }}
    />
  );
}