import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  MapPin, 
  Building2, 
  Users, 
  Award, 
  Phone, 
  Mail,
  CheckCircle,
  Star,
  ArrowRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import singaporeHeroImage from "@assets/ChatGPT Image Jul 20, 2025, 02_25_01 AM_1752958720782.png";

export default function SingaporeHome() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Helmet>
        <title>Virtual Office Singapore | Premium Business Address from S$99/month | SimplySetup</title>
        <meta name="description" content="🏢 #1 Virtual Office Singapore provider. ACRA registered business addresses in CBD, Orchard Road & Marina Bay from S$99/month. Same-day setup, GST registration, mail forwarding, phone services. Trusted by 5000+ companies." />
        <meta name="keywords" content="virtual office singapore, business address singapore, ACRA registration, GST registration singapore, company registration singapore, virtual office CBD singapore, marina bay virtual office, orchard road business address, singapore company formation, registered office address singapore, mail forwarding singapore, virtual receptionist singapore, meeting rooms singapore" />
        
        {/* Enhanced SEO Meta Tags */}
        <link rel="canonical" href="https://simplysetup.com/sg" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="SimplySetup Singapore" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="en-SG" />
        <meta name="geo.region" content="SG" />
        <meta name="geo.country" content="Singapore" />
        <meta name="geo.placename" content="Singapore" />
        <meta name="ICBM" content="1.2966, 103.8558" />
        
        {/* Open Graph Enhanced */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Virtual Office Singapore | Premium Business Address from S$99/month" />
        <meta property="og:description" content="🏢 #1 Virtual Office Singapore provider. ACRA registered business addresses in CBD, Orchard Road & Marina Bay from S$99/month. Same-day setup, trusted by 5000+ companies." />
        <meta property="og:url" content="https://simplysetup.com/sg" />
        <meta property="og:site_name" content="SimplySetup Singapore" />
        <meta property="og:locale" content="en_SG" />
        <meta property="og:image" content={singaporeHeroImage} />
        <meta property="og:image:alt" content="Virtual Office Singapore - Professional Business Address Solutions" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@SimplySetupSG" />
        <meta name="twitter:title" content="Virtual Office Singapore | Premium Business Address from S$99/month" />
        <meta name="twitter:description" content="🏢 #1 Virtual Office Singapore provider. ACRA registered business addresses in CBD, Orchard Road & Marina Bay from S$99/month." />
        <meta name="twitter:image" content={singaporeHeroImage} />
        <meta name="twitter:image:alt" content="Virtual Office Singapore - Professional Business Address Solutions" />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="apple-mobile-web-app-title" content="SimplySetup SG" />
        <meta name="application-name" content="SimplySetup Singapore" />
        
        {/* Hreflang for International SEO */}
        <link rel="alternate" hrefLang="en-sg" href="https://simplysetup.com/sg" />
        <link rel="alternate" hrefLang="en" href="https://simplysetup.com" />
        
        {/* Enhanced Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://simplysetup.com/sg#organization",
                "name": "SimplySetup Singapore",
                "legalName": "SimplySetup Singapore Pte Ltd",
                "url": "https://simplysetup.com/sg",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://simplysetup.com/logo.png",
                  "width": 200,
                  "height": 60
                },
                "foundingDate": "2020",
                "description": "Singapore's leading virtual office provider offering premium business addresses, company registration, and business support services",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "1 Raffles Place, #20-61 One Raffles Place",
                  "addressLocality": "Singapore",
                  "postalCode": "048616",
                  "addressCountry": "SG",
                  "addressRegion": "Singapore"
                },
                "contactPoint": [
                  {
                    "@type": "ContactPoint",
                    "telephone": "+65-6123-4567",
                    "contactType": "customer service",
                    "availableLanguage": ["English", "Chinese", "Malay", "Tamil"],
                    "areaServed": "SG"
                  },
                  {
                    "@type": "ContactPoint",
                    "telephone": "+65-6123-4568",
                    "contactType": "sales",
                    "availableLanguage": ["English"],
                    "areaServed": "SG"
                  }
                ],
                "sameAs": [
                  "https://www.facebook.com/SimplySetupSG",
                  "https://www.linkedin.com/company/simplysetup-singapore",
                  "https://twitter.com/SimplySetupSG"
                ],
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "247",
                  "bestRating": "5",
                  "worstRating": "1"
                }
              },
              {
                "@type": "Service",
                "@id": "https://simplysetup.com/sg#service",
                "name": "Virtual Office Singapore",
                "serviceType": "Business Address Services",
                "description": "Premium virtual office services in Singapore including business address, mail handling, phone services, and meeting room access",
                "provider": {
                  "@id": "https://simplysetup.com/sg#organization"
                },
                "areaServed": {
                  "@type": "Country",
                  "name": "Singapore"
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Virtual Office Packages",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "name": "Basic Virtual Office",
                      "price": "99",
                      "priceCurrency": "SGD",
                      "description": "Business address and mail handling",
                      "availability": "https://schema.org/InStock"
                    },
                    {
                      "@type": "Offer", 
                      "name": "Premium Virtual Office",
                      "price": "199",
                      "priceCurrency": "SGD",
                      "description": "Business address, mail handling, and phone services",
                      "availability": "https://schema.org/InStock"
                    }
                  ]
                }
              },
              {
                "@type": "WebSite",
                "@id": "https://simplysetup.com/sg#website",
                "url": "https://simplysetup.com/sg",
                "name": "SimplySetup Singapore - Virtual Office Solutions",
                "description": "Singapore's premier virtual office provider",
                "publisher": {
                  "@id": "https://simplysetup.com/sg#organization"
                },
                "potentialAction": [
                  {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://simplysetup.com/sg/search?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }
                ]
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://simplysetup.com"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Singapore",
                    "item": "https://simplysetup.com/sg"
                  }
                ]
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is a virtual office in Singapore?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A virtual office in Singapore provides you with a prestigious business address without the need for physical office space. It includes services like mail handling, phone answering, and meeting room access when needed."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How much does a virtual office cost in Singapore?", 
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Virtual office packages in Singapore start from S$99 per month for basic services including business address and mail handling. Premium packages with additional services are available from S$199 per month."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I use a virtual office address for ACRA registration?",
                    "acceptedAnswer": {
                      "@type": "Answer", 
                      "text": "Yes, all our virtual office addresses are ACRA compliant and can be used for company registration in Singapore. We provide the necessary documentation for the registration process."
                    }
                  }
                ]
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                #1 Virtual Office Singapore
                <span className="text-blue-600 block">From S$99/month</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                ACRA registered business addresses in Singapore's prime locations - CBD, Marina Bay & Orchard Road. 
                Same-day setup, GST registration support, mail forwarding, and virtual receptionist services. 
                Trusted by 5000+ companies worldwide.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/sg/virtual-office">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    View Locations
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Us
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>ACRA Registered</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>GST Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Same Day Setup</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src={singaporeHeroImage}
                alt="Virtual Office Singapore - Professional Business Address"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600">Prime Locations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">99%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Singapore's Leading Virtual Office Provider - ACRA Compliant
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive virtual office solutions for company registration, GST registration, and business expansion in Singapore. 
              From CBD to Marina Bay - choose from 15+ prime locations with same-day setup.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Prime Business Addresses
              </h3>
              <p className="text-gray-600">
                Get a prestigious business address in Singapore's Central Business District, 
                perfect for company registration and building credibility.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Company Registration Support
              </h3>
              <p className="text-gray-600">
                Complete assistance with ACRA registration, GST registration, 
                and all necessary documentation for your Singapore business setup.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Mail Handling & Forwarding
              </h3>
              <p className="text-gray-600">
                Professional mail handling with secure storage, scanning, 
                and forwarding services to keep you connected globally.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Dedicated Phone Line
              </h3>
              <p className="text-gray-600">
                Local Singapore phone number with professional call answering 
                and message forwarding services.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Meeting Room Access
              </h3>
              <p className="text-gray-600">
                Access to professional meeting rooms and conference facilities 
                when you need to meet clients in person.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Compliance Support
              </h3>
              <p className="text-gray-600">
                Ongoing compliance support to ensure your business meets 
                all Singapore regulatory requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Locations Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Prime Virtual Office Locations - CBD, Marina Bay & Orchard Road
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ACRA registered business addresses in Singapore's most prestigious business districts. 
              Perfect for company registration, client meetings, and establishing corporate credibility.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Raffles Place",
                description: "Heart of Singapore's financial district",
                price: "From S$180/month",
                image: "https://images.unsplash.com/photo-1525438160292-a4a860951216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                name: "Orchard Road",
                description: "Premier shopping and business district",
                price: "From S$200/month", 
                image: "https://images.unsplash.com/photo-1555217851-6141535bd771?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                name: "Marina Bay",
                description: "Modern business hub with iconic views",
                price: "From S$250/month",
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ].map((location, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={location.image} 
                  alt={location.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{location.name}</h3>
                  <p className="text-gray-600 mb-4">{location.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-blue-600">{location.price}</span>
                    <Link href="/sg/virtual-office">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section for SEO */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions - Virtual Office Singapore
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Common questions about virtual office services, ACRA registration, and company setup in Singapore.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What is a virtual office in Singapore and how does it work?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                A virtual office in Singapore provides your business with a prestigious mailing address in prime locations like CBD, Marina Bay, or Orchard Road without the cost of physical office space. Our services include mail forwarding, virtual receptionist, meeting room access, and full ACRA compliance for company registration.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Can I use a virtual office address for ACRA company registration?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, all our virtual office addresses are ACRA compliant and approved for company registration in Singapore. We provide the necessary documentation and support for incorporating your private limited company, sole proprietorship, or branch office with ACRA.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What are the costs for virtual office services in Singapore?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our virtual office packages start from S$99/month for basic business address and mail handling services. Premium packages with phone services, meeting rooms, and additional support are available from S$199/month. All packages include same-day setup and ACRA compliance.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Do you provide GST registration support with virtual office services?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, we provide complete GST registration assistance as part of our virtual office services. Our team helps with GST application, compliance setup, and ongoing support to ensure your business meets all Singapore tax requirements from day one.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Which locations are available for virtual offices in Singapore?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We offer virtual office addresses in 15+ prime locations across Singapore including Raffles Place CBD, Marina Bay Financial District, Orchard Road, Tanjong Pagar, and other prestigious business areas. Each location is strategically chosen for maximum business credibility and accessibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Why 5000+ Companies Choose SimplySetup Singapore
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive virtual office solutions with unmatched support for international and local businesses.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Same-Day Virtual Office Setup</h3>
                  <p className="text-gray-600">Get your Singapore business address activated within hours, not days. Complete ACRA registration support with express processing.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Multi-Language Support</h3>
                  <p className="text-gray-600">Professional support in English, Mandarin, Malay, and Tamil. Perfect for diverse international businesses entering Singapore market.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Bank Account Opening Assistance</h3>
                  <p className="text-gray-600">Complete support for opening corporate bank accounts with major Singapore banks using your virtual office address.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Digital Mail Management</h3>
                  <p className="text-gray-600">Advanced mail scanning, digital storage, and instant forwarding worldwide. Access all your business mail from anywhere, anytime.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">4.9/5</div>
                <div className="text-gray-600 mb-6">Customer Rating (247+ Reviews)</div>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg text-left">
                    <p className="text-sm text-gray-600 italic mb-2">
                      "SimplySetup made our Singapore company registration incredibly smooth. Same-day virtual office setup and excellent ACRA support."
                    </p>
                    <div className="text-sm font-medium text-gray-900">- Tech Startup Founder</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-left">
                    <p className="text-sm text-gray-600 italic mb-2">
                      "Best virtual office provider in Singapore. Prime CBD address helped us secure major clients from day one."
                    </p>
                    <div className="text-sm font-medium text-gray-900">- E-commerce Business</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Virtual Office Singapore Pricing - Transparent & Affordable
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our flexible virtual office packages designed for startups, SMEs, and international businesses.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic Virtual Office</h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">S$99</div>
                <div className="text-gray-600">/month</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Prime business address</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Mail handling & forwarding</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">ACRA registration support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Basic business support</span>
                </li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
            </div>
            
            <div className="bg-blue-600 text-white p-8 rounded-xl shadow-xl relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">Most Popular</span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Premium Virtual Office</h3>
                <div className="text-4xl font-bold mb-2">S$199</div>
                <div className="text-blue-100">/month</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Everything in Basic +</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Dedicated phone line</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Virtual receptionist</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>4 hours meeting room/month</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>GST registration support</span>
                </li>
              </ul>
              <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">Get Started</Button>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise Virtual Office</h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">S$399</div>
                <div className="text-gray-600">/month</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Everything in Premium +</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">12 hours meeting room/month</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Priority support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Multiple address options</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Dedicated account manager</span>
                </li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Contact Sales</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Establish Your Business in Singapore?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get started today with our premium virtual office services and establish your business presence in Singapore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sg/virtual-office">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-50">
                Explore Locations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Phone className="mr-2 h-5 w-5" />
              +65 6123 4567
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}