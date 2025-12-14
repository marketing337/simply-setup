import { useState, useMemo, useEffect } from 'react';
import { List, ChevronRight } from 'lucide-react';

interface TableOfContentsProps {
  content: string;
  className?: string;
}

interface Heading {
  level: number;
  text: string;
  id: string;
}

export default function DesktopTableOfContents({ content, className = '' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  // Extract headings from content
  const headings = useMemo(() => {
    const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi;
    const extractedHeadings: Heading[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = parseInt(match[1]);
      const text = match[2].replace(/<[^>]*>/g, '').trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      
      if (text && level >= 1 && level <= 4) {
        extractedHeadings.push({ level, text, id });
      }
    }

    return extractedHeadings;
  }, [content]);

  // Track scroll position and update active heading
  useEffect(() => {
    const observerOptions = {
      rootMargin: '-80px 0px -80% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
    }
  };

  if (headings.length < 3) {
    return null;
  }

  return (
    <div className={`desktop-toc bg-white border border-gray-200 rounded-xl shadow-sm p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
        <List className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900 text-lg">
          Table of Contents
        </h3>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {headings.length}
        </span>
      </div>
      
      <nav className="space-y-1" aria-label="Table of contents">
        <div className="max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {headings.map((heading, index) => (
            <button
              key={index}
              onClick={() => scrollToHeading(heading.id)}
              className={`group flex items-center w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all duration-200 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                activeId === heading.id
                  ? 'bg-blue-100 text-blue-900 border-l-4 border-blue-500'
                  : heading.level === 1
                  ? 'font-semibold text-gray-900'
                  : heading.level === 2
                  ? 'font-medium text-gray-800'
                  : 'text-gray-700'
              }`}
              style={{
                paddingLeft: `${Math.max(heading.level - 1, 0) * 16 + 12}px`
              }}
            >
              <ChevronRight 
                className={`h-3 w-3 mr-2 transition-transform ${
                  activeId === heading.id ? 'rotate-90 text-blue-600' : 'text-gray-400 group-hover:text-blue-500'
                }`} 
              />
              <span className="truncate">{heading.text}</span>
            </button>
          ))}
        </div>
      </nav>
      
      <div className="mt-4 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Click any section to jump there
        </p>
      </div>
      
      <style>{`        
        @media (max-width: 1023px) {
          .desktop-toc {
            display: none;
          }
        }
        
        /* Custom scrollbar for WebKit browsers */
        .desktop-toc .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .desktop-toc .scrollbar-thin::-webkit-scrollbar-track {
          background: rgb(243 244 246);
          border-radius: 3px;
        }
        
        .desktop-toc .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgb(209 213 219);
          border-radius: 3px;
        }
        
        .desktop-toc .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgb(156 163 175);
        }
        
        .desktop-toc button:hover .truncate {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}