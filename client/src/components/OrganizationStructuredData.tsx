import { Helmet } from 'react-helmet-async';

interface OrganizationStructuredDataProps {
  baseUrl?: string;
}

/**
 * Organization structured data component for establishing entity information in search results
 * This enhances SEO and brand recognition across search engines
 */
export default function OrganizationStructuredData({ baseUrl = 'https://simplysetup.co' }: OrganizationStructuredDataProps) {
  // Create the organization schema
  const createOrganizationSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      'name': 'SimplySetup',
      'url': baseUrl,
      'logo': `${baseUrl}/logo.png`,
      'sameAs': [
        'https://www.facebook.com/simplysetup',
        'https://www.twitter.com/simplysetup',
        'https://www.linkedin.com/company/simplysetup',
        'https://www.instagram.com/simplysetup'
      ],
      'description': 'SimplySetup provides premium virtual office solutions across India, offering prestigious business addresses, mail handling, and professional services to help businesses establish a credible presence without the overhead of physical office space.',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Office No 1 S No 50/15/1 Samarth Sankul, Narhe',
        'addressLocality': 'Pune',
        'postalCode': '411041',
        'addressRegion': 'Maharashtra',
        'addressCountry': 'IN'
      },
      'contactPoint': [
        {
          '@type': 'ContactPoint',
          'telephone': '+91-20-4123-5678',
          'contactType': 'customer service',
          'email': 'hello@simplysetup.co',
          'availableLanguage': ['English', 'Hindi']
        }
      ]
    };
  };
  
  // Create the website schema
  const createWebsiteSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${baseUrl}#website`,
      'url': baseUrl,
      'name': 'SimplySetup - Virtual Office Solutions',
      'description': 'Premium virtual office solutions across India for businesses, startups, and entrepreneurs.',
      'publisher': {
        '@id': `${baseUrl}#organization`
      },
      'potentialAction': {
        '@type': 'SearchAction',
        'target': `${baseUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    };
  };
  
  // Create a LocalBusiness schema to enhance local search presence
  const createLocalBusinessSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${baseUrl}#localbusiness`,
      'name': 'SimplySetup Virtual Office Solutions',
      'description': 'Premium virtual office solutions with prestigious addresses, mail handling services, and professional support for businesses of all sizes.',
      'url': baseUrl,
      'telephone': '+91-20-4123-5678',
      'email': 'hello@simplysetup.co',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Office No 1 S No 50/15/1 Samarth Sankul, Narhe',
        'addressLocality': 'Pune',
        'postalCode': '411041',
        'addressRegion': 'Maharashtra',
        'addressCountry': 'IN'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 18.4594, // Approximate coordinates for Pune
        'longitude': 73.8567
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
      'sameAs': [
        'https://www.facebook.com/simplysetup',
        'https://www.twitter.com/simplysetup',
        'https://www.linkedin.com/company/simplysetup'
      ],
      'image': `${baseUrl}/office-image.jpg`,
      'currenciesAccepted': 'INR',
      'paymentAccepted': 'Cash, Credit Card, UPI, Bank Transfer',
      'hasMap': 'https://goo.gl/maps/pune'
    };
  };
  
  return (
    <Helmet>
      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(createOrganizationSchema())}
      </script>
      
      {/* Website Schema */}
      <script type="application/ld+json">
        {JSON.stringify(createWebsiteSchema())}
      </script>
      
      {/* Local Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify(createLocalBusinessSchema())}
      </script>
    </Helmet>
  );
}