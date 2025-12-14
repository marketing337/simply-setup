import { useBlogPostBySlug } from "@/lib/api";
import { useParams, Link } from "wouter";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import type { blogPosts } from "@shared/schema";
import BlogLayout from "@/components/layouts/BlogLayout";
import SEO from "@/components/SEO";
import OptimizedImage from "@/components/OptimizedImage";
import BlogStructuredData from "@/components/BlogStructuredData";
import BlogSEOEnhancements from "@/components/BlogSEOEnhancements";
import EnhancedBlogContent from "@/components/EnhancedBlogContent";
import BlogAISummary from "@/components/BlogAISummary";
import MobileTableOfContents from "@/components/MobileTableOfContents";
import MobileBreadcrumbs from "@/components/MobileBreadcrumbs";
import MobileReadingProgress from "@/components/MobileReadingProgress";
import DesktopTableOfContents from "@/components/DesktopTableOfContents";
import { processWysiwygContent } from "@/utils/contentProcessor";
import DesktopReadingProgress from "@/components/DesktopReadingProgress";
import AuthorCard from "@/components/AuthorCard";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { useQuery } from "@tanstack/react-query";
import type { Author } from "@shared/schema";

// Define blog post type from schema
type BlogPost = typeof blogPosts.$inferSelect;

// Extended type to include the author username
interface BlogPostWithAuthor extends BlogPost {
  authorUsername?: string;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useBlogPostBySlug(slug) as { 
    data: BlogPostWithAuthor | undefined;
    isLoading: boolean;
    error: Error | null;
  };
  const { user } = useAuth();
  
  // Fetch author information if authorId exists
  const { data: author } = useQuery<Author>({
    queryKey: [`/api/authors/${post?.authorId}`],
    enabled: !!post?.authorId,
  });
  
  // Process content for better Table of Contents extraction
  const processedContent = useMemo(() => {
    if (!post?.content) return '';
    return processWysiwygContent(post.content);
  }, [post?.content]);
  
  // Format the date
  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return "";
    return format(new Date(dateString), "MMMM d, yyyy");
  };
  
  // Handle loading state
  if (isLoading) {
    return (
      <BlogLayout>
        <div className="container mx-auto py-4 px-3 sm:py-8 sm:px-4 max-w-4xl">
          <div className="mb-4 sm:mb-6">
            <Button variant="ghost" className="group -ml-2 sm:ml-0" asChild>
              <Link href="/blog" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span className="text-sm sm:text-base">Back to all articles</span>
              </Link>
            </Button>
          </div>
          
          <div className="space-y-6">
            <Skeleton className="h-10 w-3/4" />
            
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
            </div>
            
            <Skeleton className="h-64 w-full" />
            
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          </div>
        </div>
      </BlogLayout>
    );
  }
  
  // Handle error or not found
  if (error || !post) {
    return (
      <BlogLayout>
        <div className="container mx-auto py-16 px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">
            The article you're looking for doesn't exist or isn't published yet.
          </p>
          <Button asChild>
            <Link href="/blog">Browse All Articles</Link>
          </Button>
        </div>
      </BlogLayout>
    );
  }
  
  return (
    <BlogLayout>
      <SEO 
        blogPost={post}
        ogType="article"
        ogImage={post.featuredImage || undefined}
      />
      {/* Mobile reading progress indicator */}
      <MobileReadingProgress className="md:hidden reading-progress" />
      {/* Add structured data for rich snippets */}
      <BlogStructuredData post={post} />
      <div className="container mx-auto py-2 px-3 sm:py-8 sm:px-4">
        {/* Mobile-optimized breadcrumbs */}
        <MobileBreadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post.title, href: `/blog/${post.slug}`, current: true }
          ]}
          className="mb-3 sm:mb-4"
        />
        
        <div className="mb-3 sm:mb-6">
          <Button variant="ghost" className="group -ml-2 sm:ml-0 p-1 sm:p-2" asChild>
            <Link href="/blog" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="mr-1 sm:mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm">Back to articles</span>
            </Link>
          </Button>
        </div>
        
        {/* Desktop Layout with Sidebar */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Main Content */}
          <article className="lg:col-span-8 xl:col-span-9 max-w-4xl lg:max-w-none">
            <header className="mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight text-gray-900">{post.title}</h1>
              
              {/* Enhanced metadata display for desktop */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-4">
                <time className="font-medium" dateTime={post.publishedAt ? (typeof post.publishedAt === 'string' ? post.publishedAt : post.publishedAt.toISOString()) : undefined}>
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'Recently published'}
                </time>
                {(author?.name || post.authorUsername) && (
                  <>
                    <span>•</span>
                    <span>By {author?.name || post.authorUsername}</span>
                  </>
                )}
                <span>•</span>
                <span>{Math.ceil(post.content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200)} min read</span>
              </div>
              
              {/* Tags display for desktop */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Virtual Office
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Business Setup
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Startup Guide
                </span>
              </div>
            </header>
            
          {/* Enhanced Excerpt - Mobile Optimized */}
          <div className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
            {post.excerpt}
          </div>
            
          {/* Featured Media Section */}
          {(post.featuredImage || post.youtubeVideoId) && (
            <figure className="mb-6 sm:mb-8">
              {post.youtubeVideoId ? (
                <div className="w-full rounded-lg shadow-lg overflow-hidden">
                  <YouTubeEmbed 
                    videoId={post.youtubeVideoId} 
                    title={`Video: ${post.title}`}
                    className="w-full"
                  />
                </div>
              ) : post.featuredImage && (
                <div className="aspect-video w-full overflow-hidden rounded-lg shadow-lg bg-gray-100">
                  <OptimizedImage 
                    src={post.featuredImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                    priority={true}
                    fallbackSrc="https://placehold.co/1200x630?text=Featured+Image+Not+Available"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              )}
              <figcaption className="text-center text-xs sm:text-sm text-gray-600 mt-2 px-2">
                {post.title}
              </figcaption>
            </figure>
          )}
          
          {/* Edit button for admins */}
          {user && (
            <div className="mb-6">
              <Button size="sm" asChild variant="outline">
                <Link href={`/admin?tab=blog&post=${post.id}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit Post
                </Link>
              </Button>
            </div>
          )}
          
          {/* AI Summary Section */}
          <div className="mb-6 sm:mb-8">
            <BlogAISummary slug={post.slug} />
          </div>

          {/* Mobile Table of Contents */}
          <MobileTableOfContents content={processedContent} className="md:hidden" />

          {/* Enhanced Content with Better Structure and Readability */}
          <div className="mb-8 sm:mb-12">
            <EnhancedBlogContent content={post.content} />
          </div>
          
          {/* Author Card - Show if author exists */}
          {author && (
            <div className="mb-8 sm:mb-12">
              <AuthorCard author={author} />
            </div>
          )}
          
          {/* Related Articles Section - Mobile Optimized */}
          <aside className="mt-8 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-200">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center sm:text-left">Continue Your Journey</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2 text-base sm:text-lg">Explore More Articles</h4>
                <p className="text-blue-700 mb-4 text-sm sm:text-base leading-relaxed">Discover insights on virtual offices, business compliance, and startup strategies.</p>
                <Button asChild variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100 w-full sm:w-auto">
                  <Link href="/blog">Browse All Articles</Link>
                </Button>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-6 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2 text-base sm:text-lg">Get Professional Help</h4>
                <p className="text-green-700 mb-4 text-sm sm:text-base leading-relaxed">Ready to set up your virtual office? Our experts are here to guide you.</p>
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
                  <Link href="/contact">Contact Our Experts</Link>
                </Button>
              </div>
            </div>
          </aside>
          </article>
          
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 space-y-6 max-h-[calc(100vh-120px)] overflow-hidden">
              <DesktopTableOfContents content={processedContent} />
              <DesktopReadingProgress content={processedContent} />
            </div>
          </aside>
        </div>
      </div>
    </BlogLayout>
  );
}