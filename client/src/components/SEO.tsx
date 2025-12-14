import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Location, Area, BlogPost } from '@shared/schema';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  location?: Location | null;
  area?: Area | null;
  blogPost?: BlogPost | null;
  isHomePage?: boolean;
  pageType?: 'usecase' | 'purpose' | 'city' | 'area' | 'blog' | 'service' | 'default';
  industry?: string;
  service?: string;
}

/**
 * SEO component for dynamic metadata management
 * Applied to each page for optimized search engine visibility
 */
export default function SEO({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage,
  location,
  area,
  blogPost,
  isHomePage = false,
  pageType = 'default',
  industry,
  service,
}: SEOProps) {
  
  // Generate SEO-optimized title
  const generateTitle = (): string => {
    if (title) return `${title} | SimplySetup`;
    
    if (isHomePage) return 'Virtual Office India | Professional Business Address & GST Registration | SimplySetup';
    
    if (blogPost) return `${blogPost.title} | SimplySetup Virtual Office Blog`;
    
    // Enhanced title generation for use case pages
    if (pageType === 'usecase' && industry) {
      const industryTitleMap: { [key: string]: string } = {
        'tech-startups': 'Virtual Office for Tech Startups | Business Address & GST Registration | SimplySetup',
        'consultants': 'Virtual Office for Consultants | Professional Business Address | SimplySetup',
        'freelancers': 'Virtual Office for Freelancers | Professional Address & Mail Handling | SimplySetup',
        'ecommerce': 'Virtual Office for E-commerce | Marketplace Registration & Returns Address | SimplySetup',
        'events': 'Virtual Office for Event Management | Professional Business Setup | SimplySetup',
        'renewable-energy': 'Virtual Office for Renewable Energy Companies | Green Business Address | SimplySetup',
        'healthcare': 'Virtual Office for Healthcare Providers | Medical Practice Address | SimplySetup',
        'hospitality': 'Virtual Office for Hospitality & Tourism | Business Registration | SimplySetup',
        'construction': 'Virtual Office for Construction Companies | Contractor Business Address | SimplySetup',
        'import-export': 'Virtual Office for Import Export Business | Trade License Address | SimplySetup',
        'food-beverage': 'Virtual Office for Food & Beverage Industry | FSSAI Registration | SimplySetup',
        'manufacturing': 'Virtual Office for Manufacturing Companies | Industrial Business Address | SimplySetup',
      };
      return industryTitleMap[industry] || `Virtual Office for ${industry.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} | SimplySetup`;
    }
    
    // Enhanced title generation for purpose pages
    if (pageType === 'purpose' && service) {
      const serviceTitleMap: { [key: string]: string } = {
        'company-registration': 'Virtual Office for Company Registration | ROC Filing & MCA Compliance | SimplySetup',
        'gst-registration': 'Virtual Office for GST Registration | GSTIN Certificate & Address Proof | SimplySetup',
        'bank-account-formation': 'Virtual Office for Bank Account Opening | Corporate Banking Address | SimplySetup',
        'msme-registration': 'Virtual Office for MSME Registration | Udyam Certificate & Benefits | SimplySetup',
        'llp-registration': 'Virtual Office for LLP Registration | Partnership Business Address | SimplySetup',
        'google-my-business-registration': 'Virtual Office for Google My Business | Local SEO & Verification | SimplySetup',
      };
      return serviceTitleMap[service] || `Virtual Office for ${service.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} | SimplySetup`;
    }
    
    if (area && location) {
      return `Virtual Office in ${area.name}, ${location.name} | GST Registration Address | SimplySetup`;
    }
    
    if (location) {
      return `Virtual Office in ${location.name} | Professional Business Address | SimplySetup`;
    }
    
    return 'Virtual Office India | GST Registration Virtual Address | SimplySetup';
  };
  
  // Generate SEO-optimized description
  const generateDescription = (): string => {
    if (description) return description;
    
    if (isHomePage) {
      return 'Premium Virtual Office spaces across India for startups, entrepreneurs, and established businesses. Our virtual office solutions include business address services for GST registration, mail handling, and professional reception with no hidden costs. Boost your company presence without the overhead of a physical office space.';
    }
    
    if (blogPost) {
      return blogPost.excerpt || `Read our expert insights about ${blogPost.title}. Comprehensive guidance on virtual offices, business address solutions, and professional GST registration support across major cities in India.`;
    }
    
    // Enhanced descriptions for use case pages
    if (pageType === 'usecase' && industry) {
      const industryDescriptionMap: { [key: string]: string } = {
        'tech-startups': 'Specialized virtual office solutions for tech startups and IT companies. Professional business address, GST registration support, mail handling, and compliance assistance to help scale your technology business across India.',
        'consultants': 'Professional virtual office services for consultants and advisory firms. Establish credibility with premium business addresses, professional mail management, and meeting room access in prime locations.',
        'freelancers': 'Affordable virtual office solutions for freelancers and independent professionals. Get a professional business address, mail forwarding, and GST registration support to enhance your professional image.',
        'ecommerce': 'Comprehensive virtual office services for e-commerce businesses. Marketplace registration support, returns address management, GST compliance, and professional business presence for online retailers.',
        'events': 'Virtual office solutions tailored for event management companies. Professional business address, vendor coordination support, and compliance assistance for successful event planning businesses.',
        'renewable-energy': 'Specialized virtual office services for renewable energy and green technology companies. Support for government registrations, compliance documentation, and professional business presence.',
        'healthcare': 'Professional virtual office solutions for healthcare providers and medical practices. Compliant business addresses, patient communication support, and regulatory compliance assistance.',
        'hospitality': 'Virtual office services for hospitality and tourism businesses. Professional addresses, booking management support, and tourism license compliance for hotels, restaurants, and travel agencies.',
        'construction': 'Virtual office solutions for construction companies and contractors. Professional business addresses, compliance support for construction licenses, and project coordination assistance.',
        'import-export': 'Comprehensive virtual office services for import-export businesses. Trade license support, customs documentation assistance, and professional business addresses for international trade.',
        'food-beverage': 'Specialized virtual office solutions for food and beverage companies. FSSAI registration support, compliance assistance, and professional addresses for restaurants and food businesses.',
        'manufacturing': 'Virtual office services for manufacturing companies. Industrial license support, quality certification assistance, and professional business addresses for manufacturing operations.',
      };
      return industryDescriptionMap[industry] || `Professional virtual office solutions for ${industry.replace('-', ' ')} businesses. Get business address, GST registration support, and compliance assistance to grow your business.`;
    }
    
    // Enhanced descriptions for purpose pages
    if (pageType === 'purpose' && service) {
      const serviceDescriptionMap: { [key: string]: string } = {
        'company-registration': 'Complete virtual office solution for company registration. Professional registered office address, ROC filing support, MCA compliance assistance, and all documentation required for private limited company, OPC, and LLP registration.',
        'gst-registration': 'Specialized virtual office services for GST registration. Get GSTIN certificate with professional business address, address proof documentation, and complete GST compliance support across all states in India.',
        'bank-account-formation': 'Professional virtual office address for corporate bank account opening. RBI-compliant business addresses, documentation support, and assistance with major banks for current account formation.',
        'msme-registration': 'Virtual office solutions for MSME registration and Udyam certification. Professional business address, government scheme access, and complete support for micro, small, and medium enterprises.',
        'llp-registration': 'Comprehensive virtual office services for LLP registration. Professional business address, partnership agreement support, and complete legal documentation for Limited Liability Partnership formation.',
        'google-my-business-registration': 'Virtual office address for Google My Business verification. Local SEO optimization, business listing verification, and professional address for enhanced online visibility and local search rankings.',
      };
      return serviceDescriptionMap[service] || `Professional virtual office services for ${service.replace('-', ' ')}. Complete business address solution with documentation support and compliance assistance.`;
    }
    
    if (area && location) {
      return `Looking for a Virtual Office in ${area.name}, ${location.name}? SimplySetup provides premium business addresses, mail handling, reception services, and complete GST registration support - all at affordable prices with flexible plans for businesses of all sizes.`;
    }
    
    if (location) {
      return `Need a Virtual Office in ${location.name}? SimplySetup offers prestigious business addresses, comprehensive mail handling, and full GST registration assistance at competitive rates in prime ${location.name} locations. Perfect for entrepreneurs, startups, and established businesses.`;
    }
    
    return 'SimplySetup delivers premium Virtual Office solutions throughout India. Get a prestigious business address, professional mail handling and dedicated reception services for your company at competitive prices. Ideal for GST registration and establishing credible business presence.';
  };
  
  // Generate keywords based on content
  const generateKeywords = (): string => {
    // Primary focus on virtual office keyword
    const baseKeywords = [
      'virtual office', 
      'virtual office india', 
      'virtual office services', 
      'virtual office address', 
      'virtual office for gst registration', 
      'business address services', 
      'professional office address'
    ];
    
    if (isHomePage) {
      return [
        // Primary exact match keywords
        'virtual office',
        'virtual office india',
        'virtual office services',
        'virtual office address',
        'virtual office solutions',
        
        // Long-tail keywords
        'virtual office for gst registration',
        'virtual office for startups',
        'virtual office for entrepreneurs',
        'virtual office with mail handling',
        'affordable virtual office spaces',
        'premium virtual office solutions',
        'best virtual office in india',
        'virtual office benefits for small business',
        'virtual office cost in india',
        'what is a virtual office',
        'how virtual office works'
      ].join(', ');
    }
    
    if (blogPost && blogPost.tags) {
      return [
        ...baseKeywords, 
        ...blogPost.tags, 
        'virtual office benefits',
        'virtual office advantages',
        'virtual office for business growth',
        'virtual office expert advice',
        'virtual office vs physical office'
      ].join(', ');
    }
    
    if (area && location) {
      return [
        ...baseKeywords,
        // Geo-specific keywords
        `virtual office ${location.name}`,
        `virtual office in ${location.name}`,
        `virtual office ${area.name}`,
        `virtual office in ${area.name}`,
        `virtual office ${area.name} ${location.name}`,
        `best virtual office in ${location.name}`,
        
        // Longer-tail location + feature combinations
        `virtual office for gst registration in ${location.name}`,
        `virtual office address in ${area.name}`,
        `affordable virtual office in ${location.name}`,
        `premium virtual office in ${area.name}, ${location.name}`
      ].join(', ');
    }
    
    if (location) {
      // Geo-specific keywords emphasizing "virtual office" first
      const locationSpecificKeywords = [
        `virtual office ${location.name}`,
        `virtual office in ${location.name}`,
        `best virtual office in ${location.name}`,
        `premium virtual office ${location.name}`,
        `affordable virtual office ${location.name}`,
        `virtual office services in ${location.name}`,
        `virtual office for business in ${location.name}`,
        `virtual office for startups in ${location.name}`,
        `virtual office for gst registration in ${location.name}`,
        `virtual office address for business in ${location.name}`
      ];
      
      return [...baseKeywords, ...locationSpecificKeywords].join(', ');
    }
    
    return baseKeywords.join(', ');
  };
  
  // Generate structured data (JSON-LD)
  const generateStructuredData = () => {
    // Check if we're on a standard legal/info page by title
    const isPrivacyPolicy = title?.includes('Privacy Policy');
    const isTermsOfService = title?.includes('Terms of Service');
    const isSitemap = title?.includes('Sitemap');
    
    if (isPrivacyPolicy || isTermsOfService) {
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': generateTitle(),
        'description': generateDescription(),
        'url': getCurrentUrl(),
        'mainEntity': {
          '@type': isPrivacyPolicy ? 'PrivacyPolicy' : 'TermsOfService',
          'name': generateTitle(),
          'text': `View our ${isPrivacyPolicy ? 'Privacy Policy' : 'Terms of Service'} page for detailed information.`,
          'publisher': {
            '@type': 'Organization',
            'name': 'SimplySetup'
          }
        },
        'datePublished': '2025-05-01T00:00:00+05:30',
        'dateModified': new Date().toISOString(),
        'publisher': {
          '@type': 'Organization',
          'name': 'SimplySetup',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://simplysetup.co/logo.png'
          }
        }
      };
    }
    
    if (isSitemap) {
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': 'Sitemap | SimplySetup',
        'description': 'Navigate through all pages and resources on the SimplySetup website with our comprehensive sitemap.',
        'url': getCurrentUrl(),
        'publisher': {
          '@type': 'Organization',
          'name': 'SimplySetup',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://simplysetup.co/logo.png'
          }
        }
      };
    }

    if (isHomePage) {
      // Enhanced structured data for homepage with FAQs about virtual offices
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'SimplySetup - Virtual Office Solutions in India',
        'url': 'https://simplysetup.com',
        'logo': 'https://simplysetup.com/logo.png',
        'description': generateDescription(),
        'address': {
          '@type': 'PostalAddress',
          'addressCountry': 'IN',
          'streetAddress': 'Office No 1 S No 50/15/1 Samarth Sankul, Narhe',
          'addressLocality': 'Pune',
          'postalCode': '411041'
        },
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+91-123-456-7890',
          'contactType': 'customer service',
          'availableLanguage': ['English', 'Hindi']
        },
        'sameAs': [
          'https://www.facebook.com/simplysetup.co',
          'https://www.linkedin.com/company/simplysetup',
          'https://twitter.com/simplysetupco',
          'https://www.instagram.com/simplysetup.co',
          'https://www.youtube.com/channel/simplysetup'
        ],
        'makesOffer': [
          {
            '@type': 'Offer',
            'name': 'Virtual Office Solutions',
            'description': 'Complete virtual office packages with premium business addresses, mail handling, and reception services'
          },
          {
            '@type': 'Offer',
            'name': 'Virtual Office for GST Registration',
            'description': 'Professional virtual office address services for GST registration across major cities in India'
          },
          {
            '@type': 'Offer',
            'name': 'Business Address Services',
            'description': 'Premium business address solutions for startups, entrepreneurs and established businesses'
          },
          {
            '@type': 'Offer',
            'name': 'Mail Handling Services',
            'description': 'Professional mail receipt, scanning and forwarding for all your business correspondence'
          }
        ],
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What is a virtual office?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'A virtual office provides businesses with a physical address and office-related services without the overhead of a long lease and administrative staff. With a virtual office, employees can work from anywhere while having access to services such as a professional mailing address, reception services, and meeting rooms when needed.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Can I use a virtual office address for GST registration?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes, you can use a virtual office address for GST registration in India. Our virtual office packages include all the necessary documentation and verification required by the GST authorities. We provide proof of address and necessary supporting documents to ensure your GST registration process is smooth and compliant.'
            }
          },
          {
            '@type': 'Question',
            'name': 'What are the benefits of a virtual office?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Virtual offices provide numerous benefits including: 1) Cost savings on rent, utilities, and office equipment, 2) Professional business address in a prestigious location, 3) Mail handling and forwarding services, 4) Reception services for call answering, 5) Access to meeting rooms when needed, 6) Increased flexibility for remote working, 7) Enhanced business credibility, and 8) Easy scaling without changing business address.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How much does a virtual office cost in India?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Virtual office pricing varies based on location and services included, but typically ranges from ₹1,000 to ₹5,000 per month. Premium locations in cities like Mumbai, Delhi, and Bangalore may cost more, while tier-2 cities offer more affordable options. SimplySetup provides transparent pricing with no hidden costs and flexible plans to suit businesses of all sizes.'
            }
          }
        ]
      };
    }
    
    if (blogPost) {
      return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': blogPost.title,
        'description': blogPost.excerpt,
        'image': blogPost.featuredImage || '',
        'datePublished': blogPost.publishedAt || new Date().toISOString(),
        'dateModified': blogPost.updatedAt || new Date().toISOString(),
        'author': {
          '@type': 'Person',
          'name': `Author ID: ${blogPost.authorId}`
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'SimplySetup - Virtual Office for GST Registration',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://simplysetup.co/logo.png'
          }
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': canonicalUrl || `https://simplysetup.co/blog/${blogPost.slug}`
        },
        'keywords': generateKeywords()
      };
    }
    
    if (location) {
      return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': `SimplySetup Virtual Office in ${location.name}${area ? ` - ${area.name}` : ''}`,
        'description': generateDescription(),
        'url': canonicalUrl || `https://simplysetup.co/${location.slug}${area ? `/${area.slug}` : ''}`,
        'telephone': location.phoneNumber || '+91-123-456-7890',
        'email': location.email || 'info@simplysetup.co',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': location.name,
          'addressRegion': area ? area.name : '',
          'addressCountry': 'IN',
          'streetAddress': area ? area.address : location.mainAddress
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 0,
          'longitude': 0
        },
        'openingHoursSpecification': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': [
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
          ],
          'opens': '09:00',
          'closes': '18:00'
        },
        'priceRange': '₹₹',
        'image': location.heroImage || '',
        'serviceType': ['Virtual Office', 'Business Address', 'Mail Handling', 'Reception Services'],
        'makesOffer': [
          {
            '@type': 'Offer',
            'name': `Virtual Office in ${location.name}`,
            'description': `Premium virtual office solutions in ${location.name} at prestigious business addresses`
          },
          {
            '@type': 'Offer',
            'name': `Business Address in ${location.name}`,
            'description': `Professional business address services in ${location.name} for company registration, mail handling, and business correspondence`
          },
          {
            '@type': 'Offer',
            'name': `Virtual Office for GST Registration in ${location.name}`,
            'description': `Virtual office address for GST registration in ${location.name} with complete documentation support`
          },
          {
            '@type': 'Offer',
            'name': `Mail Handling Services in ${location.name}`,
            'description': `Professional mail receipt, scanning, and forwarding services in ${location.name}`
          }
        ],
        'keywords': generateKeywords(),
        'mainEntity': [
          {
            '@type': 'Question',
            'name': `How much does a virtual office cost in ${location.name}?`,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Virtual office prices in ${location.name} typically range from ₹1,500 to ₹4,500 per month depending on the location and services included. SimplySetup offers flexible plans with transparent pricing and no hidden costs to meet the needs of businesses of all sizes.`
            }
          },
          {
            '@type': 'Question',
            'name': `What services are included in a virtual office in ${location.name}?`,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Our virtual offices in ${location.name} include a prestigious business address, professional mail handling and forwarding, dedicated phone answering services, access to meeting rooms when needed, and complete GST registration support. All services are customizable to meet your specific business requirements.`
            }
          },
          {
            '@type': 'Question',
            'name': `Can I use your virtual office address in ${location.name} for my company registration?`,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Yes, our virtual office addresses in ${location.name} can be used for company registration, GST registration, and other official business purposes. We provide all the necessary documentation to support your registration process and ensure compliance with local regulations.`
            }
          }
        ]
      };
    }
    
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'SimplySetup - Virtual Office for GST Registration in India',
      'url': 'https://simplysetup.com',
      'description': generateDescription(),
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://simplysetup.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      },
      'keywords': generateKeywords()
    };
  };

  // Get the current URL for canonical URL and OG URL
  const getCurrentUrl = (): string => {
    if (canonicalUrl) return canonicalUrl;
    
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    
    if (blogPost) {
      return `https://simplysetup.co/blog/${blogPost.slug}`;
    }
    
    if (area && location) {
      return `https://simplysetup.co/${location.slug}/${area.slug}`;
    }
    
    if (location) {
      return `https://simplysetup.co/${location.slug}`;
    }
    
    return 'https://simplysetup.co';
  };
  
  // Get Open Graph image URL
  const getOgImage = (): string => {
    if (ogImage) return ogImage;
    
    if (blogPost && blogPost.featuredImage) {
      return blogPost.featuredImage;
    }
    
    if (location && location.heroImage) {
      return location.heroImage;
    }
    
    // Default OG image
    return 'https://simplysetup.co/og-image.jpg';
  };
  
  // Set page title via document.title for immediate effect
  useEffect(() => {
    document.title = generateTitle();
  }, [title, location, area, blogPost, isHomePage]);
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{generateTitle()}</title>
      <meta name="description" content={generateDescription()} />
      <meta name="keywords" content={generateKeywords()} />
      <meta name="author" content="SimplySetup" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={getCurrentUrl()} />
      
      {/* Google Site Verification - Only on Home Page */}
      {isHomePage && (
        <meta name="google-site-verification" content="fn5XPEKsHg3b9gDvNzYHNv95udKM9JQyCI-Mhh5JASI" />
      )}

      {/* Responsive Design Meta */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={generateTitle()} />
      <meta property="og:description" content={generateDescription()} />
      <meta property="og:image" content={getOgImage()} />
      <meta property="og:url" content={getCurrentUrl()} />
      <meta property="og:site_name" content="SimplySetup" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@simplysetupco" />
      <meta name="twitter:title" content={generateTitle()} />
      <meta name="twitter:description" content={generateDescription()} />
      <meta name="twitter:image" content={getOgImage()} />
      
      {/* Apple Touch Icons */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Additional SEO meta tags */}
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />
      <meta http-equiv="x-ua-compatible" content="IE=edge,chrome=1" />
      <meta name="MobileOptimized" content="width" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      
      {/* Social sharing image dimensions for better appearance */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData())}
      </script>
    </Helmet>
  );
}