import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface TableOfContentsProps {
  content: string;
  className?: string;
}

interface Heading {
  level: number;
  text: string;
  id: string;
}

export default function MobileTableOfContents({ content, className = '' }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Extract headings from content
  const headings = useMemo(() => {
    const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi;
    const extractedHeadings: Heading[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = parseInt(match[1]);
      const text = match[2].replace(/<[^>]*>/g, '').trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      
      if (text && level >= 2 && level <= 4) { // Only show H2, H3, H4 for mobile
        extractedHeadings.push({ level, text, id });
      }
    }

    return extractedHeadings;
  }, [content]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
      setIsOpen(false); // Close TOC after navigation
    }
  };

  if (headings.length < 3) {
    return null; // Don't show TOC for short articles
  }

  return (
    <div className={`mobile-toc bg-blue-50 border border-blue-200 rounded-lg mb-6 ${className}`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full justify-between p-4 h-auto text-left hover:bg-blue-100"
          >
            <div className="flex items-center gap-2">
              <List className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">
                Table of Contents ({headings.length} sections)
              </span>
            </div>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-blue-600" />
            ) : (
              <ChevronDown className="h-4 w-4 text-blue-600" />
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="px-4 pb-4">
          <div className="scrollable-content max-h-80 overflow-y-auto overscroll-contain scrollbar-container border-t border-blue-200 pt-2">
            <nav className="space-y-1 pr-2" aria-label="Table of contents">
              {headings.map((heading, index) => (
                <button
                  key={index}
                  onClick={() => scrollToHeading(heading.id)}
                  className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                    heading.level === 2 
                      ? 'font-medium text-blue-900' 
                      : heading.level === 3
                      ? 'text-blue-800 ml-4'
                      : 'text-blue-700 ml-8'
                  }`}
                  style={{
                    paddingLeft: `${(heading.level - 2) * 16 + 12}px`
                  }}
                >
                  {heading.text}
                </button>
              ))}
            </nav>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <style>{`
        .mobile-toc {
          position: sticky;
          top: 80px;
          z-index: 10;
        }
        
        @media (min-width: 768px) {
          .mobile-toc {
            display: none;
          }
        }
        
        .mobile-toc button:focus {
          outline: 2px solid rgb(59 130 246);
          outline-offset: 2px;
        }
        
        /* Custom scrollbar for WebKit browsers */
        .mobile-toc .scrollbar-container::-webkit-scrollbar {
          width: 6px;
        }
        
        .mobile-toc .scrollbar-container::-webkit-scrollbar-track {
          background: rgb(239 246 255);
          border-radius: 3px;
        }
        
        .mobile-toc .scrollbar-container::-webkit-scrollbar-thumb {
          background: rgb(147 197 253);
          border-radius: 3px;
        }
        
        .mobile-toc .scrollbar-container::-webkit-scrollbar-thumb:hover {
          background: rgb(96 165 250);
        }
        
        /* Fade indicators for scrollable content */
        .mobile-toc .scrollable-content {
          position: relative;
        }
        
        .mobile-toc .scrollable-content::before,
        .mobile-toc .scrollable-content::after {
          content: '';
          position: absolute;
          left: 0;
          right: 6px;
          height: 12px;
          pointer-events: none;
          z-index: 1;
          transition: opacity 0.3s ease;
        }
        
        .mobile-toc .scrollable-content::before {
          top: 0;
          background: linear-gradient(to bottom, rgb(239 246 255), transparent);
        }
        
        .mobile-toc .scrollable-content::after {
          bottom: 0;
          background: linear-gradient(to top, rgb(239 246 255), transparent);
        }
      `}</style>
    </div>
  );
}