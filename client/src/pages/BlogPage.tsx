import { usePublishedBlogPosts } from "@/lib/api";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { BlogPost } from "@shared/schema";
import BlogLayout from "@/components/layouts/BlogLayout";
import SEO from "@/components/SEO";
import BlogSEOEnhancements from "@/components/BlogSEOEnhancements";

// Extended type to include the author username
interface BlogPostWithAuthor extends BlogPost {
  authorUsername?: string;
}

export default function BlogPage() {
  const { data: posts, isLoading } = usePublishedBlogPosts() as {
    data: BlogPostWithAuthor[] | undefined;
    isLoading: boolean;
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Extract all unique tags from blog posts
  const allTags = useMemo(() => {
    if (!posts) return [];
    
    const tags = new Set<string>();
    posts.forEach(post => {
      if (post.tags && post.tags.length > 0) {
        post.tags.forEach(tag => tags.add(tag));
      }
    });
    
    return Array.from(tags).sort();
  }, [posts]);
  
  // Filter posts by search term and selected tags
  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    
    return posts.filter(post => {
      // Search term filter
      const searchMatch = !searchTerm || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Tags filter
      const tagsMatch = selectedTags.length === 0 || 
        (post.tags && selectedTags.every(tag => post.tags.includes(tag)));
      
      return searchMatch && tagsMatch;
    });
  }, [posts, searchTerm, selectedTags]);
  
  // Toggle a tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
  };
  
  const content = (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="container mx-auto py-6 px-4 sm:py-10 sm:px-6 lg:px-8">
        {/* Enhanced header with improved mobile design */}
        <header className="mb-8 sm:mb-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight text-gray-900 tracking-tight">
              SimplySetup Blog
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed px-2 mb-6">
              Expert insights, guides, and resources on virtual offices, business setup, and workspace solutions across India. 
              Stay updated with the latest trends in business compliance and startup strategies.
            </p>
            
            {/* Enhanced engagement metrics */}
            {posts && posts.length > 0 && (
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-sm text-gray-500 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200/50 shadow-sm mx-auto w-fit">
                <span className="flex items-center gap-2 font-medium">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{posts.length} articles</span>
                </span>
                <div className="w-px h-4 bg-gray-300" />
                <span className="flex items-center gap-2 font-medium">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Updated weekly</span>
                </span>
                <div className="w-px h-4 bg-gray-300" />
                <span className="flex items-center gap-2 font-medium">
                  <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Expert verified</span>
                </span>
              </div>
            )}
          </div>
        </header>
      
        {/* Enhanced search and filter section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-200/50 shadow-lg mb-8">
          <div className="space-y-4">
            {/* Search input with improved mobile design */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search articles, topics, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-12 h-12 sm:h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl bg-white/70 backdrop-blur-sm"
                aria-label="Search blog articles"
              />
              {searchTerm && (
                <button 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Enhanced tag filters */}
            {allTags.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">Filter by topics:</label>
                  {selectedTags.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearFilters}
                      className="text-xs h-auto py-1 px-2 text-gray-500 hover:text-gray-700"
                    >
                      Clear all ({selectedTags.length})
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <Badge 
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className={`cursor-pointer text-xs px-3 py-1.5 h-auto whitespace-nowrap transition-all duration-200 font-medium ${
                        selectedTags.includes(tag) 
                          ? "bg-blue-600 text-white border-blue-600 shadow-md hover:bg-blue-700" 
                          : "bg-white/70 text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Active filters display */}
            {(searchTerm || selectedTags.length > 0) && (
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-200">
                <span className="text-xs font-medium text-gray-500">Active filters:</span>
                {searchTerm && (
                  <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800 border-yellow-300">
                    Search: "{searchTerm}"
                  </Badge>
                )}
                {selectedTags.map(tag => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="text-xs bg-blue-100 text-blue-800 border-blue-300 cursor-pointer hover:bg-blue-200"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag} ✕
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      
        {/* Enhanced content area with improved loading states */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <Skeleton className="w-full h-48 rounded-none" />
                <div className="p-5 space-y-3">
                  <Skeleton className="w-16 h-5 rounded-full" />
                  <Skeleton className="w-full h-6 rounded" />
                  <Skeleton className="w-3/4 h-6 rounded" />
                  <Skeleton className="w-full h-20 rounded" />
                  <Skeleton className="w-24 h-4 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12 sm:py-16 px-4">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">No articles found</h3>
              <p className="text-gray-500 mb-6 text-base leading-relaxed">
                {searchTerm || selectedTags.length > 0 
                  ? "Try adjusting your search terms or removing some filters to find more articles."
                  : "We're working on creating amazing content for you. Check back soon for expert insights and guides!"}
              </p>
              {(searchTerm || selectedTags.length > 0) && (
                <Button 
                  onClick={clearFilters} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium"
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div>
            {/* Results summary */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredPosts.length} of {posts?.length || 0} articles
                {(searchTerm || selectedTags.length > 0) ? " (filtered)" : ""}
              </p>
              <div className="hidden sm:block text-xs text-gray-500">
                {Math.ceil((filteredPosts.reduce((acc, post) => {
                  const words = (post.content || post.excerpt).split(/\s+/).length;
                  return acc + Math.ceil(words / 200);
                }, 0)))} min total reading time
              </div>
            </div>

            {/* Enhanced blog grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* Enhanced pagination/load more section */}
            {filteredPosts.length >= 9 && (
              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                  More articles coming soon
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
  
  return (
    <BlogLayout>
      <SEO 
        title="Blog | Virtual Office Insights & Resources" 
        description="Expert insights, guides, and resources about virtual offices, GST registration, and business setup solutions across India. Stay updated with the latest trends."
        ogType="website"
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "SimplySetup Blog",
          "description": "Expert insights, guides, and resources on virtual offices, business setup, and workspace solutions across India",
          "url": `${window.location.origin}/blog`,
          "publisher": {
            "@type": "Organization",
            "name": "SimplySetup",
            "url": window.location.origin
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${window.location.origin}/blog`
          },
          ...(posts && posts.length > 0 && {
            "blogPost": posts.slice(0, 5).map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "url": `${window.location.origin}/blog/${post.slug}`,
              "datePublished": post.publishedAt,
              "author": {
                "@type": "Person",
                "name": post.authorUsername || "SimplySetup Team"
              }
            }))
          })
        })}
      </script>
      {content}
    </BlogLayout>
  );
}