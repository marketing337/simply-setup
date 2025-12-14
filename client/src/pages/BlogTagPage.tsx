import { useParams, Link } from "wouter";
import { useBlogPostsByTag } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ArrowLeft, Calendar, User, Tag as TagIcon, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { blogPosts } from "@shared/schema";
import BlogLayout from "@/components/layouts/BlogLayout";
import SEO from "@/components/SEO";
import OptimizedImage from "@/components/OptimizedImage";

// Define blog post type from schema
type BlogPost = typeof blogPosts.$inferSelect & {
  authorUsername?: string;
};

function BlogTagPage() {
  const params = useParams<{ tag: string }>();
  const tag = params?.tag;
  
  const { data: posts, isLoading, error } = useBlogPostsByTag(tag);

  if (isLoading) {
    return (
      <BlogLayout>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            <div className="space-y-4">
              <Skeleton className="h-12 w-64" />
              <Skeleton className="h-6 w-96" />
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </BlogLayout>
    );
  }

  if (error || !tag) {
    return (
      <BlogLayout>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tag not found</h1>
          <p className="text-gray-600 mb-8">The requested tag does not exist or has no published posts.</p>
          <Button asChild>
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </BlogLayout>
    );
  }

  // Convert URL-encoded tag back to display format
  const displayTag = decodeURIComponent(tag).replace(/-/g, ' ');
  const capitalizedTag = displayTag.charAt(0).toUpperCase() + displayTag.slice(1);

  return (
    <BlogLayout>
      <SEO
        title={`${capitalizedTag} Articles - SimplySetup Blog`}
        description={`Explore articles about ${displayTag}. Get expert insights on virtual offices, business setup, and workspace solutions.`}
        ogType="website"
      />

      {/* Structured Data for Tag Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": `${capitalizedTag} Articles - SimplySetup Blog`,
            "description": `Expert articles about ${displayTag} on virtual offices and business setup`,
            "url": typeof window !== 'undefined' ? window.location.href : '',
            "publisher": {
              "@type": "Organization",
              "name": "SimplySetup",
              "logo": {
                "@type": "ImageObject",
                "url": typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : '/logo.png'
              }
            },
            "blogPost": posts?.slice(0, 10).map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "url": typeof window !== 'undefined' ? `${window.location.origin}/blog/${post.slug}` : `/blog/${post.slug}`,
              "datePublished": post.publishedAt,
              "author": {
                "@type": "Person",
                "name": (post as any).authorUsername || "SimplySetup Team"
              },
              "description": post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 160),
              "image": post.featuredImage || `${typeof window !== 'undefined' ? window.location.origin : ''}/default-blog-image.jpg`,
              "keywords": displayTag
            })) || []
          })
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/blog" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <TagIcon className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-gray-900">
              {capitalizedTag}
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 mb-4">
            Expert articles and insights about {displayTag}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>{posts?.length || 0} article{posts?.length !== 1 ? 's' : ''}</span>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <TagIcon className="h-3 w-3" />
              {displayTag}
            </Badge>
          </div>
        </div>

        {/* Blog Posts Grid */}
        {posts && posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  {post.featuredImage && (
                    <div className="aspect-video overflow-hidden">
                      <OptimizedImage
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map((tagName, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tagName}
                            </Badge>
                          ))}
                          {post.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{post.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 120) + '...'}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{(post as any).authorUsername || 'SimplySetup Team'}</span>
                      </div>
                      
                      {post.publishedAt && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <time dateTime={post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined}>
                            {format(new Date(post.publishedAt), 'MMM dd, yyyy')}
                          </time>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <TagIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-8">
              There are no published articles with the tag "{displayTag}" yet.
            </p>
            <Button asChild>
              <Link href="/blog">Browse All Articles</Link>
            </Button>
          </div>
        )}

        {/* Related Tags */}
        {posts && posts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Topics</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(posts.flatMap(post => post.tags || []))).filter(t => t !== tag).slice(0, 10).map((relatedTag, index) => (
                <Link
                  key={index}
                  href={`/blog/tags/${encodeURIComponent(relatedTag.toLowerCase().replace(/\s+/g, '-'))}`}
                >
                  <Badge variant="outline" className="hover:bg-primary hover:text-white transition-colors">
                    {relatedTag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </BlogLayout>
  );
}

export default BlogTagPage;