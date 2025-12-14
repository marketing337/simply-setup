import { Location, Office } from "@shared/schema";
import { Helmet } from "react-helmet-async";

interface StructuredDataProps {
  type: "LocalBusiness" | "Article" | "Organization" | "WebSite";
  location?: Location;
  offices?: Office[];
  article?: {
    headline: string;
    datePublished: string;
    dateModified: string;
    author: string;
    image?: string;
    description?: string;
  };
  isHomePage?: boolean;
}

/**
 * Component to add structured data (JSON-LD) to pages
 * Enhances SEO by providing explicit clues about the page content to search engines
 */
export default function StructuredData({ 
  type, 
  location, 
  offices, 
  article,
  isHomePage 
}: StructuredDataProps) {
  // Website schema always included
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Simply Setup - Virtual Office for GST Registration in India",
    "url": "https://simplysetup.com/",
    "description": "Get a virtual office address for GST registration in India. Our virtual office services provide a legitimate business address, mail handling, and reception services at affordable prices.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://simplysetup.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "keywords": "virtual office for gst registration, virtual office address for gst registration, gst registration, business address, virtual office"
  };

  // Organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Simply Setup - Virtual Office for GST Registration",
    "url": "https://simplysetup.com",
    "logo": "https://simplysetup.com/logo.png",
    "description": "Professional virtual office address services for GST registration across India. Get a prestigious business address for your business at affordable prices.",
    "sameAs": [
      "https://www.facebook.com/simplysetupoffices",
      "https://twitter.com/simplysetup",
      "https://www.linkedin.com/company/simplysetup"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-80-4123-4567",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"]
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "name": "Virtual Office Address for GST Registration",
        "description": "Professional virtual office address services for GST registration across India"
      },
      {
        "@type": "Offer",
        "name": "Business Address Services",
        "description": "Virtual office solutions with prestigious business address for company registration"
      }
    ]
  };

  // Local business schema
  const generateLocalBusinessSchema = () => {
    if (!location) return null;
    
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": `Simply Setup - Virtual Office for GST Registration in ${location.name}`,
      "description": `Need a virtual office for GST registration in ${location.name}? SimplySetup provides dedicated business address services, mail handling, and GST registration assistance at the best rates in ${location.name}.`,
      "image": location.heroImage,
      "url": `https://simplysetup.com/${location.slug}`,
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": location.mainAddress.split(',')[0],
        "addressLocality": location.name,
        "addressRegion": location.mainAddress.split(', ')[1]?.split(' ')[0] || "",
        "postalCode": location.mainAddress.match(/\d{6}/) ? location.mainAddress.match(/\d{6}/)?.[0] : "",
        "addressCountry": "IN"
      },
      "telephone": location.phoneNumber,
      "email": location.email,
      "openingHours": "Mo-Fr 09:00-18:00",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "0", // Would be populated with actual coordinates in production
        "longitude": "0"
      },
      "keywords": `virtual office for gst registration ${location.name}, virtual office in ${location.name} for gst registration, virtual office for gst registration in ${location.name}, business address ${location.name}`,
      "makesOffer": [
        {
          "@type": "Offer",
          "name": `Virtual Office for GST Registration in ${location.name}`,
          "description": `Professional virtual office address for GST registration in ${location.name}`
        },
        {
          "@type": "Offer",
          "name": `Business Address Services in ${location.name}`,
          "description": `Get a prestigious business address in ${location.name} for your company registration and mail handling needs`
        }
      ]
    };
    
    // Add multiple locations if offices data is available
    if (offices && offices.length > 0) {
      return {
        ...baseSchema,
        "department": offices.map(office => ({
          "@type": "LocalBusiness",
          "name": `${office.name} - Virtual Office for GST Registration`,
          "description": `Premium virtual office for GST registration in ${location.name} at ${office.name} location`,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": office.address.split(',')[0],
            "addressLocality": location.name,
            "addressRegion": office.address.split(', ')[1]?.split(' ')[0] || "",
            "postalCode": office.address.match(/\d{6}/) ? office.address.match(/\d{6}/)?.[0] : "",
            "addressCountry": "IN"
          },
          "telephone": location.phoneNumber,
          "makesOffer": {
            "@type": "Offer",
            "name": `Virtual Office for GST Registration at ${office.name}`,
            "description": `Professional virtual office address for GST registration at ${office.name} in ${location.name}`
          }
        }))
      };
    }
    
    return baseSchema;
  };

  // Article schema for blog posts
  const generateArticleSchema = () => {
    if (!article) return null;
    
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": article.headline,
      "image": article.image || "",
      "datePublished": article.datePublished,
      "dateModified": article.dateModified,
      "author": {
        "@type": "Person",
        "name": article.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Simply Setup - Virtual Office for GST Registration",
        "logo": {
          "@type": "ImageObject",
          "url": "https://simplysetup.com/logo.png"
        }
      },
      "description": article.description || "Learn about virtual office solutions for GST registration in India. Get expert tips and insights on using a virtual office address for your business registration.",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://simplysetup.com/blog/" // Would be updated with actual URL in production
      },
      "keywords": "virtual office for gst registration, virtual office address for gst registration, gst registration, business address, virtual office, can virtual office be used for gst registration"
    };
  };

  // Select the appropriate schema based on the type
  const getSchemaByType = () => {
    switch (type) {
      case "LocalBusiness":
        return generateLocalBusinessSchema();
      case "Article":
        return generateArticleSchema();
      case "Organization":
        return organizationSchema;
      case "WebSite":
        return websiteSchema;
      default:
        return null;
    }
  };

  const schema = getSchemaByType();
  
  // Always include website schema on homepage
  const schemas = isHomePage 
    ? [websiteSchema, organizationSchema] 
    : schema ? [schema] : [];

  return (
    <Helmet>
      {schemas.map((schemaObj, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schemaObj)}
        </script>
      ))}
    </Helmet>
  );
}