import { Helmet } from 'react-helmet-async';
import type { blogPosts } from '@shared/schema';

// Define the type using the table schema
type BlogPost = typeof blogPosts.$inferSelect;

// Extended type to include the author username
interface BlogPostWithAuthor extends BlogPost {
  authorUsername?: string;
}

interface BlogStructuredDataProps {
  post: BlogPostWithAuthor;
  baseUrl?: string;
}

/**
 * BlogStructuredData component for adding schema.org markup to blog posts
 * This enhances SEO and enables rich snippets in search results
 */
export default function BlogStructuredData({ post, baseUrl = 'https://simplysetup.co' }: BlogStructuredDataProps) {
  // Generate the article schema for the blog post
  const createArticleSchema = () => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${baseUrl}/blog/${post.slug}#blogposting`,
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': `${baseUrl}/blog/${post.slug}`
      },
      'headline': post.title,
      'description': post.excerpt || post.title,
      'keywords': post.tags?.join(', ') || '',
      'image': post.featuredImage 
        ? [post.featuredImage] 
        : [`${baseUrl}/default-blog-image.jpg`],
      'author': {
        '@type': 'Person',
        'name': post.authorUsername || `Author ID: ${post.authorId}`
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'SimplySetup',
        'logo': {
          '@type': 'ImageObject',
          'url': `${baseUrl}/logo.png`,
          'width': '560',
          'height': '60'
        }
      },
      'datePublished': post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date().toISOString(),
      'dateModified': post.updatedAt ? new Date(post.updatedAt).toISOString() : new Date().toISOString()
    };

    return schema;
  };

  // Generate breadcrumb schema for better navigation in search results
  const createBreadcrumbSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': baseUrl
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Blog',
          'item': `${baseUrl}/blog`
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': post.title,
          'item': `${baseUrl}/blog/${post.slug}`
        }
      ]
    };
  };

  return (
    <Helmet>
      {/* Blog Article Schema */}
      <script type="application/ld+json">
        {JSON.stringify(createArticleSchema())}
      </script>

      {/* Breadcrumb Schema */}
      <script type="application/ld+json">
        {JSON.stringify(createBreadcrumbSchema())}
      </script>
    </Helmet>
  );
}