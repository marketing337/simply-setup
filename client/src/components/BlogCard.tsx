import { BlogPost } from "@shared/schema";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import OptimizedImage from "@/components/OptimizedImage";

// Extended type to include the author username
interface BlogPostWithAuthor extends BlogPost {
  authorUsername?: string;
}

interface BlogCardProps {
  post: BlogPostWithAuthor;
  className?: string;
}

export default function BlogCard({ post, className = "" }: BlogCardProps) {
  // Format the date for better readability
  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Yesterday";
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    
    return format(date, "MMM d, yyyy");
  };

  // Calculate estimated reading time
  const getReadingTime = (content: string, excerpt: string) => {
    const text = content || excerpt || "";
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return readingTime < 1 ? 1 : readingTime;
  };

  const readingTime = getReadingTime(post.content || "", post.excerpt);

  return (
    <article 
      className={`group overflow-hidden h-full flex flex-col bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}
      itemScope 
      itemType="https://schema.org/BlogPosting"
    >
      {post.featuredImage && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <OptimizedImage 
            src={post.featuredImage} 
            alt={`Cover image for ${post.title}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            fallbackSrc='https://placehold.co/600x400?text=Image+Not+Available'
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {post.tags && post.tags.length > 0 && (
            <div className="absolute top-3 left-3 flex gap-1">
              <Badge 
                variant="secondary" 
                className="bg-white/90 text-gray-800 text-xs px-2 py-1 h-auto font-medium shadow-sm backdrop-blur-sm"
              >
                {post.tags[0]}
              </Badge>
            </div>
          )}
        </div>
      )}
      
      <div className="flex flex-col flex-grow p-4 sm:p-5">
        {/* Tags for posts without featured images */}
        {!post.featuredImage && post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {post.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs px-2 py-1 h-auto font-medium">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-1 h-auto">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Article metadata */}
        <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
          {post.publishedAt && (
            <time 
              dateTime={typeof post.publishedAt === 'string' ? post.publishedAt : post.publishedAt.toISOString()}
              itemProp="datePublished"
              className="flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {formatDate(post.publishedAt)}
            </time>
          )}
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {readingTime} min read
          </span>
          {post.authorUsername && (
            <span className="flex items-center gap-1" itemProp="author">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              {post.authorUsername}
            </span>
          )}
        </div>

        {/* Article title */}
        <Link href={`/blog/${post.slug}`} className="block mb-3">
          <h2 
            className="font-bold text-gray-900 line-clamp-2 hover:text-primary transition-colors duration-200 text-lg sm:text-xl leading-tight group-hover:text-primary"
            itemProp="headline"
          >
            {post.title}
          </h2>
        </Link>

        {/* Article excerpt */}
        <div className="flex-grow mb-4">
          <p 
            className="text-sm sm:text-base text-gray-600 line-clamp-3 leading-relaxed"
            itemProp="description"
          >
            {post.excerpt}
          </p>
        </div>

        {/* Read more button */}
        <Link href={`/blog/${post.slug}`} className="inline-block">
          <div className="flex items-center justify-between w-full text-primary hover:text-primary/80 font-medium cursor-pointer group/button transition-all duration-200">
            <span className="text-sm font-semibold">Continue Reading</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/button:translate-x-1" />
          </div>
        </Link>
      </div>
    </article>
  );
}