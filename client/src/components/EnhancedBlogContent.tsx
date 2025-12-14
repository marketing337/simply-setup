import { useMemo } from 'react';
import LinkifiedContent from './LinkifiedContent';

interface EnhancedBlogContentProps {
  content: string;
  className?: string;
}

export default function EnhancedBlogContent({ content, className = '' }: EnhancedBlogContentProps) {
  const enhancedContent = useMemo(() => {
    // Let LinkifiedContent handle the link processing - just do content enhancement here
    let processedContent = content;

    // Handle WYSIWYG editor artifacts - remove unwanted pre tags with ql-syntax class
    const preRegex = /<pre[^>]*class="ql-syntax"[^>]*>([\s\S]*?)<\/pre>/g;
    processedContent = processedContent.replace(
      preRegex,
      (match, innerContent) => {
        // Decode HTML entities and return clean content
        let decoded = innerContent
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&');
        
        // If this looks like a full HTML document, extract just the body content
        const bodyMatch = decoded.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        if (bodyMatch) {
          return bodyMatch[1];
        }
        
        return decoded;
      }
    );

    // Remove other ReactQuill artifacts
    processedContent = processedContent.replace(/class="ql-[^"]*"/g, '');
    processedContent = processedContent.replace(/spellcheck="false"/g, '');
    
    // If content still looks like a full HTML document, extract body content
    const fullDocBodyMatch = processedContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (fullDocBodyMatch) {
      processedContent = fullDocBodyMatch[1];
    }
    
    // Remove any remaining head/html/doctype tags that might be floating around
    processedContent = processedContent.replace(/<!DOCTYPE[^>]*>/gi, '');
    processedContent = processedContent.replace(/<\/?html[^>]*>/gi, '');
    processedContent = processedContent.replace(/<head[\s\S]*?<\/head>/gi, '');
    processedContent = processedContent.replace(/<\/?body[^>]*>/gi, '');

    // Add IDs to headings for anchor links
    processedContent = processedContent.replace(
      /<h([1-6])([^>]*)>(.*?)<\/h[1-6]>/gi,
      (match, level, attributes, text) => {
        const cleanText = text.replace(/<[^>]*>/g, '');
        const id = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        return `<h${level}${attributes} id="${id}" class="scroll-mt-20">${text}</h${level}>`;
      }
    );

    // Enhance paragraphs with better spacing
    processedContent = processedContent.replace(
      /<p([^>]*)>/gi,
      '<p$1 class="mb-4 leading-relaxed">'
    );

    // Enhance lists with better styling
    processedContent = processedContent.replace(
      /<ul([^>]*)>/gi,
      '<ul$1 class="mb-6 space-y-2 list-disc list-inside">'
    );

    processedContent = processedContent.replace(
      /<ol([^>]*)>/gi,
      '<ol$1 class="mb-6 space-y-2 list-decimal list-inside">'
    );

    processedContent = processedContent.replace(
      /<li([^>]*)>/gi,
      '<li$1 class="pl-2">'
    );

    // Enhance blockquotes
    processedContent = processedContent.replace(
      /<blockquote([^>]*)>/gi,
      '<blockquote$1 class="border-l-4 border-blue-500 pl-6 py-4 my-6 bg-blue-50 italic text-gray-700">'
    );

    // Enhance code blocks
    processedContent = processedContent.replace(
      /<pre([^>]*)>/gi,
      '<pre$1 class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6">'
    );

    processedContent = processedContent.replace(
      /<code([^>]*)>/gi,
      '<code$1 class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">'
    );

    // Enhance images with responsive classes
    processedContent = processedContent.replace(
      /<img([^>]*)>/gi,
      '<img$1 class="max-w-full h-auto rounded-lg shadow-md my-6 mx-auto">'
    );

    // Add emphasis to strong text
    processedContent = processedContent.replace(
      /<strong([^>]*)>/gi,
      '<strong$1 class="font-bold text-gray-900">'
    );

    // Style emphasis text
    processedContent = processedContent.replace(
      /<em([^>]*)>/gi,
      '<em$1 class="italic text-gray-700">'
    );

    // Enhance tables
    processedContent = processedContent.replace(
      /<table([^>]*)>/gi,
      '<div class="overflow-x-auto my-6"><table$1 class="min-w-full border border-gray-300 rounded-lg">'
    );

    processedContent = processedContent.replace(
      /<\/table>/gi,
      '</table></div>'
    );

    processedContent = processedContent.replace(
      /<th([^>]*)>/gi,
      '<th$1 class="bg-gray-100 border-b border-gray-300 px-4 py-2 text-left font-semibold">'
    );

    processedContent = processedContent.replace(
      /<td([^>]*)>/gi,
      '<td$1 class="border-b border-gray-200 px-4 py-2">'
    );

    return processedContent;
  }, [content]);

  return (
    <div className={`prose prose-lg max-w-none enhanced-blog-content ${className}`}>
      <div className="space-y-0">
        <LinkifiedContent content={enhancedContent} className="" />
      </div>
      
      <style>{`
        /* Override dark backgrounds from WYSIWYG editor */
        .enhanced-blog-content pre.ql-syntax,
        .enhanced-blog-content pre[class*="ql-"],
        .enhanced-blog-content .ql-syntax {
          background: transparent !important;
          color: inherit !important;
          padding: 0 !important;
          margin: 0 !important;
          border: none !important;
          font-family: inherit !important;
          font-size: inherit !important;
          white-space: normal !important;
        }
        
        /* Ensure WYSIWYG content displays as normal text */
        .enhanced-blog-content [class*="ql-"] {
          background: transparent !important;
          color: inherit !important;
        }
        
        /* Mobile-first responsive typography for SEO and readability */
        .enhanced-blog-content h1 {
          font-size: 1.25rem;
          font-weight: 700;
          color: rgb(17 24 39);
          margin-bottom: 0.75rem;
          margin-top: 1.25rem;
          line-height: 1.3;
        }
        
        .enhanced-blog-content h2 {
          font-size: 1.125rem;
          font-weight: 700;
          color: rgb(17 24 39);
          margin-bottom: 0.625rem;
          margin-top: 1.25rem;
          line-height: 1.3;
        }
        
        .enhanced-blog-content h3 {
          font-size: 1rem;
          font-weight: 600;
          color: rgb(17 24 39);
          margin-bottom: 0.5rem;
          margin-top: 1rem;
          line-height: 1.3;
        }
        
        .enhanced-blog-content h4 {
          font-size: 0.9375rem;
          font-weight: 600;
          color: rgb(17 24 39);
          margin-bottom: 0.5rem;
          margin-top: 1rem;
          line-height: 1.3;
        }
        
        .enhanced-blog-content h5 {
          font-size: 0.875rem;
          font-weight: 600;
          color: rgb(17 24 39);
          margin-bottom: 0.5rem;
          margin-top: 1rem;
          line-height: 1.3;
        }
        
        .enhanced-blog-content h6 {
          font-size: 0.8125rem;
          font-weight: 600;
          color: rgb(17 24 39);
          margin-bottom: 0.5rem;
          margin-top: 1rem;
          line-height: 1.3;
        }

        /* Desktop scaling for headings */
        @media (min-width: 640px) {
          .enhanced-blog-content h1 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            margin-top: 1.5rem;
          }
          .enhanced-blog-content h2 {
            font-size: 1.375rem;
            margin-bottom: 0.875rem;
            margin-top: 1.5rem;
          }
          .enhanced-blog-content h3 {
            font-size: 1.125rem;
            margin-bottom: 0.75rem;
            margin-top: 1.25rem;
          }
          .enhanced-blog-content h4 {
            font-size: 1rem;
          }
          .enhanced-blog-content h5 {
            font-size: 0.95rem;
          }
          .enhanced-blog-content h6 {
            font-size: 0.875rem;
          }
        }
        
        /* Mobile-optimized paragraph and content styling */
        .enhanced-blog-content p {
          font-size: 0.9375rem;
          line-height: 1.6;
          margin-bottom: 1rem;
          color: rgb(55 65 81);
        }
        
        @media (min-width: 640px) {
          .enhanced-blog-content p {
            font-size: 1rem;
            line-height: 1.7;
            margin-bottom: 1.25rem;
          }
        }
        
        /* Optimized list styling for mobile */
        .enhanced-blog-content ul, 
        .enhanced-blog-content ol {
          margin-bottom: 1rem;
          padding-left: 1.25rem;
        }
        
        .enhanced-blog-content li {
          margin-bottom: 0.375rem;
          font-size: 0.9375rem;
          line-height: 1.5;
        }
        
        @media (min-width: 640px) {
          .enhanced-blog-content ul, 
          .enhanced-blog-content ol {
            margin-bottom: 1.5rem;
            padding-left: 1.5rem;
          }
          
          .enhanced-blog-content li {
            margin-bottom: 0.5rem;
            font-size: 1rem;
            line-height: 1.6;
          }
        }
        
        /* Enhanced blockquote for mobile */
        .enhanced-blog-content blockquote {
          border-left: 3px solid rgb(59 130 246);
          margin: 1rem 0;
          padding: 0.75rem 1rem;
          background-color: rgb(239 246 255);
          font-style: italic;
          color: rgb(55 65 81);
          border-radius: 0 0.375rem 0.375rem 0;
        }
        
        @media (min-width: 640px) {
          .enhanced-blog-content blockquote {
            border-left-width: 4px;
            margin: 1.5rem 0;
            padding: 1rem 1.5rem;
          }
        }
        
        /* Code blocks optimization */
        .enhanced-blog-content pre {
          overflow-x: auto;
          font-size: 0.8125rem;
          line-height: 1.4;
          margin: 1rem 0;
          padding: 0.75rem;
          border-radius: 0.375rem;
          background-color: rgb(17 24 39);
          color: rgb(229 231 235);
        }
        
        .enhanced-blog-content code {
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 0.8125rem;
          background-color: rgb(243 244 246);
          padding: 0.125rem 0.25rem;
          border-radius: 0.1875rem;
          color: rgb(220 38 127);
        }
        
        @media (min-width: 640px) {
          .enhanced-blog-content pre {
            font-size: 0.875rem;
            margin: 1.5rem 0;
            padding: 1rem;
          }
          
          .enhanced-blog-content code {
            font-size: 0.875rem;
            padding: 0.1875rem 0.375rem;
          }
        }
        
        /* Mobile-specific table enhancements */
        .enhanced-blog-content table {
          font-size: 0.8125rem;
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }
        
        .enhanced-blog-content th,
        .enhanced-blog-content td {
          padding: 0.5rem;
          text-align: left;
          border-bottom: 1px solid rgb(229 231 235);
          word-wrap: break-word;
          hyphens: auto;
        }
        
        .enhanced-blog-content th {
          background-color: rgb(249 250 251);
          font-weight: 600;
          color: rgb(17 24 39);
        }
        
        @media (min-width: 640px) {
          .enhanced-blog-content table {
            font-size: 0.875rem;
          }
          
          .enhanced-blog-content th,
          .enhanced-blog-content td {
            padding: 0.75rem;
          }
        }
        
        /* Enhanced image responsiveness */
        .enhanced-blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          margin: 1rem auto;
          display: block;
        }
        
        /* Mobile touch targets and accessibility */
        .enhanced-blog-content a {
          min-height: 44px;
          display: inline-block;
          padding: 0.125rem 0;
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 2px;
          transition: all 0.2s ease;
        }
        
        .enhanced-blog-content a:hover {
          text-decoration-thickness: 2px;
        }
        
        .enhanced-blog-content a:focus {
          outline: 2px solid rgb(59 130 246);
          outline-offset: 2px;
          border-radius: 2px;
        }
        
        /* Reading experience optimizations */
        .enhanced-blog-content {
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
          -webkit-hyphens: auto;
          -ms-hyphens: auto;
        }
        
        /* Emphasis and strong text */
        .enhanced-blog-content strong {
          font-weight: 600;
          color: rgb(17 24 39);
        }
        
        .enhanced-blog-content em {
          font-style: italic;
          color: rgb(75 85 99);
        }
        
        /* Performance enhancements */
        .enhanced-blog-content * {
          box-sizing: border-box;
        }
        
        .enhanced-blog-content img {
          image-rendering: optimizeQuality;
          image-rendering: -webkit-optimize-contrast;
        }
        
        /* Smooth scrolling for anchor links */
        html {
          scroll-behavior: smooth;
        }
        
        /* Mobile-specific improvements */
        @media (max-width: 639px) {
          .enhanced-blog-content {
            font-size: 16px; /* Prevent zoom on iOS */
          }
          
          .enhanced-blog-content table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
          }
          
          .enhanced-blog-content pre {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}