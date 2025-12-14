import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'wouter';

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface MobileBreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function MobileBreadcrumbs({ items, className = '' }: MobileBreadcrumbsProps) {
  return (
    <nav 
      aria-label="Breadcrumb navigation" 
      className={`mb-4 ${className}`}
      role="navigation"
    >
      <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-600">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="mx-1 h-3 w-3 text-gray-400 flex-shrink-0" />
            )}
            {item.current ? (
              <span 
                className="font-medium text-gray-900 line-clamp-1"
                aria-current="page"
              >
                {index === 0 && <Home className="inline h-3 w-3 mr-1" />}
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href}
                className="hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded px-1 py-0.5 line-clamp-1"
              >
                {index === 0 && <Home className="inline h-3 w-3 mr-1" />}
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
      
      {/* JSON-LD Schema for breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": items.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.label,
              "item": typeof window !== 'undefined' ? new URL(item.href, window.location.origin).href : item.href
            }))
          })
        }}
      />
      
      <style>{`
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          word-break: break-word;
          max-width: 200px;
        }
        
        @media (min-width: 640px) {
          .line-clamp-1 {
            max-width: 300px;
          }
        }
      `}</style>
    </nav>
  );
}