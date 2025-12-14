import { useEffect } from 'react';

interface BlogSEOEnhancementsProps {
  posts?: Array<{
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    featuredImage?: string;
    publishedAt: string;
    authorUsername?: string;
  }>;
  currentPost?: {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    featuredImage?: string;
    publishedAt: string;
    authorUsername?: string;
  };
}

export default function BlogSEOEnhancements({ posts, currentPost }: BlogSEOEnhancementsProps) {
  useEffect(() => {
    // Add mobile-specific meta tags
    const addMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Mobile optimization meta tags
    addMetaTag('format-detection', 'telephone=no');
    addMetaTag('mobile-web-app-capable', 'yes');
    addMetaTag('apple-mobile-web-app-capable', 'yes');
    addMetaTag('apple-mobile-web-app-status-bar-style', 'default');
    addMetaTag('theme-color', '#ffffff');
    
    // Performance and SEO meta tags
    addMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    addMetaTag('googlebot', 'index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1');
    
    return () => {
      // Cleanup function if needed
    };
  }, []);

  // Generate blog listing schema
  const generateBlogListingSchema = () => {
    if (!posts || posts.length === 0) return null;

    return {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "SimplySetup Blog",
      "description": "Expert insights, guides, and resources on virtual offices, business setup, and workspace solutions across India",
      "url": typeof window !== 'undefined' ? `${window.location.origin}/blog` : '/blog',
      "publisher": {
        "@type": "Organization",
        "name": "SimplySetup",
        "url": typeof window !== 'undefined' ? window.location.origin : '/',
        "logo": {
          "@type": "ImageObject",
          "url": typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : '/logo.png'
        }
      },
      "blogPost": posts.slice(0, 10).map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "url": typeof window !== 'undefined' ? `${window.location.origin}/blog/${post.slug}` : `/blog/${post.slug}`,
        "datePublished": post.publishedAt,
        "author": {
          "@type": "Person",
          "name": post.authorUsername || "SimplySetup Team"
        },
        "publisher": {
          "@type": "Organization",
          "name": "SimplySetup"
        },
        "description": post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 160),
        "image": post.featuredImage || `${typeof window !== 'undefined' ? window.location.origin : ''}/default-blog-image.jpg`
      }))
    };
  };

  // Generate article schema for individual posts
  const generateArticleSchema = () => {
    if (!currentPost) return null;

    const wordCount = currentPost.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed

    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": currentPost.title,
      "description": currentPost.excerpt || currentPost.content.replace(/<[^>]*>/g, '').substring(0, 160),
      "image": currentPost.featuredImage || `${typeof window !== 'undefined' ? window.location.origin : ''}/default-blog-image.jpg`,
      "datePublished": currentPost.publishedAt,
      "dateModified": currentPost.publishedAt,
      "author": {
        "@type": "Person",
        "name": currentPost.authorUsername || "SimplySetup Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "SimplySetup",
        "logo": {
          "@type": "ImageObject",
          "url": typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : '/logo.png'
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": typeof window !== 'undefined' ? window.location.href : ''
      },
      "wordCount": wordCount,
      "timeRequired": `PT${readingTime}M`,
      "articleSection": "Business Setup",
      "keywords": "virtual office, business setup, startup, compliance, workspace solutions, India"
    };
  };

  const blogSchema = posts ? generateBlogListingSchema() : null;
  const articleSchema = currentPost ? generateArticleSchema() : null;

  return (
    <>
      {/* Blog listing schema */}
      {blogSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogSchema)
          }}
        />
      )}

      {/* Article schema */}
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema)
          }}
        />
      )}

      {/* Organization schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "SimplySetup",
            "url": typeof window !== 'undefined' ? window.location.origin : '/',
            "logo": typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : '/logo.png',
            "description": "Virtual office and business setup solutions across India",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IN"
            },
            "sameAs": [
              "https://www.linkedin.com/company/simplysetup",
              "https://twitter.com/simplysetup"
            ]
          })
        }}
      />

      {/* Website schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "SimplySetup",
            "url": typeof window !== 'undefined' ? window.location.origin : '/',
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": typeof window !== 'undefined' ? `${window.location.origin}/blog?search={search_term_string}` : '/blog?search={search_term_string}'
              },
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
    </>
  );
}