import { Helmet } from 'react-helmet-async';
import type { locations } from '@shared/schema';

// Define location type from schema
type Location = typeof locations.$inferSelect;

interface VirtualOfficeStructuredDataProps {
  location: Location;
  baseUrl?: string;
}

/**
 * VirtualOfficeStructuredData component for adding location-specific schema.org markup
 * This enhances SEO for "Virtual Office" keyword searches for specific locations
 */
export default function VirtualOfficeStructuredData({ 
  location, 
  baseUrl = 'https://simplysetup.co' 
}: VirtualOfficeStructuredDataProps) {
  
  // Create the service schema for virtual office services
  const createServiceSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${baseUrl}/${location.slug}#virtualoffice`,
      'name': `Virtual Office in ${location.name}`,
      'description': `Professional virtual office services in ${location.name} with prestigious business address, mail handling, and meeting rooms. Establish your business presence without the cost of a physical office.`,
      'provider': {
        '@type': 'Organization',
        'name': 'SimplySetup',
        '@id': `${baseUrl}#organization`
      },
      'areaServed': {
        '@type': 'City',
        'name': location.name,
        'sameAs': `https://en.wikipedia.org/wiki/${encodeURIComponent(location.name)}`
      },
      'serviceType': 'Virtual Office Services',
      'offers': {
        '@type': 'Offer',
        'price': '2999',
        'priceCurrency': 'INR',
        'validFrom': '2023-01-01',
        'availability': 'https://schema.org/InStock',
        'priceValidUntil': '2025-12-31'
      },
      'url': `${baseUrl}/${location.slug}`
    };
  };
  
  // Create FAQ schema for virtual office services
  const createFaqSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': `What is a virtual office in ${location.name}?`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': `A virtual office in ${location.name} provides businesses with a prestigious address, mail handling, phone services, and meeting rooms without the need for physical office space. It's ideal for startups, remote teams, and businesses looking to establish a presence in ${location.name} without the overhead costs.`
          }
        },
        {
          '@type': 'Question',
          'name': `How much does a virtual office in ${location.name} cost?`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': `Virtual office prices in ${location.name} start from ₹2,999 per month, depending on the services included and location. Our packages include a business address, mail handling, and optional access to meeting rooms and office facilities.`
          }
        },
        {
          '@type': 'Question',
          'name': `What are the benefits of a virtual office in ${location.name}?`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': `A virtual office in ${location.name} offers numerous benefits including a prestigious business address, professional mail handling, access to meeting spaces when needed, cost savings on office rental, flexibility for remote work, and establishing a local business presence in ${location.name}.`
          }
        },
        {
          '@type': 'Question',
          'name': `Can I use a virtual office address in ${location.name} for company registration?`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': `Yes, our virtual office addresses in ${location.name} can be used for company registration, GST registration, and as your official business address on all company documents and marketing materials, providing a professional image for your business.`
          }
        }
      ]
    };
  };
  
  // Create breadcrumb schema for location pages
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
          'name': 'Virtual Offices',
          'item': `${baseUrl}/virtual-offices`
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': `Virtual Office in ${location.name}`,
          'item': `${baseUrl}/${location.slug}`
        }
      ]
    };
  };
  
  // Create local business schema for location-specific business
  const createLocalBusinessSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${baseUrl}/${location.slug}#localbusiness`,
      'name': `SimplySetup Virtual Office - ${location.name}`,
      'description': `Professional virtual office solutions in ${location.name} with prestigious address, mail handling, and meeting room facilities.`,
      'url': `${baseUrl}/${location.slug}`,
      'telephone': location.phoneNumber,
      'email': location.email,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': location.mainAddress.split(',')[0],
        'addressLocality': location.name,
        'addressRegion': location.mainAddress.split(',').slice(-2)[0].trim(),
        'postalCode': location.mainAddress.split(',').slice(-1)[0].trim().split(' ')[1],
        'addressCountry': 'IN'
      },
      'image': location.heroImage || `${baseUrl}/office-image.jpg`,
      'priceRange': '₹₹',
      'openingHoursSpecification': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
        ],
        'opens': '09:00',
        'closes': '18:00'
      }
    };
  };
  
  return (
    <Helmet>
      {/* Service Schema */}
      <script type="application/ld+json">
        {JSON.stringify(createServiceSchema())}
      </script>
      
      {/* FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify(createFaqSchema())}
      </script>
      
      {/* Breadcrumb Schema */}
      <script type="application/ld+json">
        {JSON.stringify(createBreadcrumbSchema())}
      </script>
      
      {/* Local Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify(createLocalBusinessSchema())}
      </script>
    </Helmet>
  );
}