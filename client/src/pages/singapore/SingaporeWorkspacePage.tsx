import { useRoute } from "wouter";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Building2, 
  Phone, 
  Mail,
  CheckCircle,
  Star,
  ArrowRight,
  Wifi,
  Coffee,
  Car,
  Users,
  Clock,
  Shield,
  CreditCard,
  FileText,
  Globe,
  Headphones
} from "lucide-react";
import Navbar from "@/components/Navbar";

const singaporeWorkspaceData = {
  "raffles-place": {
    id: 1,
    name: "Raffles Place Virtual Office",
    slug: "raffles-place",
    address: "1 Raffles Place, One Raffles Place, #20-61, Singapore 048616",
    district: "Central Business District",
    nearestMRT: "Raffles Place MRT (2 min walk)",
    price: "180",
    currency: "SGD",
    description: "Premium virtual office space in Singapore's most prestigious financial district. Located in the iconic One Raffles Place, this address provides instant credibility for your business. Perfect for international businesses looking to establish a strong presence in Southeast Asia's financial hub.",
    longDescription: "Our Raffles Place virtual office offers an unparalleled business address in the heart of Singapore's Central Business District. The building houses major financial institutions, multinational corporations, and government agencies, making it the perfect location for businesses seeking to establish credibility and prestige in the Asian market.",
    image: "https://images.unsplash.com/photo-1525438160292-a4a860951216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1525438160292-a4a860951216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    amenities: [
      "Premium Business Address",
      "Professional Mail Handling",
      "Dedicated Phone Answering",
      "Meeting Room Access",
      "24/7 Building Access",
      "High-Speed Internet",
      "Reception Services",
      "Administrative Support"
    ],
    features: [
      "ACRA Registered Address",
      "GST Registration Ready", 
      "Banking Support",
      "Compliance Assistance",
      "Prime CBD Location",
      "MRT Connected",
      "Government Proximity",
      "International Standards"
    ],
    pricingTiers: [
      {
        name: "Essential",
        price: "180",
        description: "Perfect for new businesses and startups",
        features: [
          "Premium business address",
          "Mail handling & forwarding",
          "Business registration support",
          "ACRA compliance documents",
          "Basic phone answering (20 calls/month)"
        ]
      },
      {
        name: "Professional", 
        price: "280",
        description: "Ideal for growing businesses",
        features: [
          "Everything in Essential",
          "Dedicated phone line",
          "Professional call answering (50 calls/month)",
          "2 hours meeting room access/month",
          "Mail scanning & digital delivery",
          "Company secretarial support"
        ]
      },
      {
        name: "Executive",
        price: "380", 
        description: "Complete solution for established businesses",
        features: [
          "Everything in Professional",
          "Unlimited call answering",
          "8 hours meeting room access/month",
          "Personal assistant support",
          "Priority mail handling", 
          "Dedicated account manager",
          "24/7 concierge services"
        ]
      }
    ],
    rating: 4.9,
    reviews: 127,
    businessHours: "24/7 Access Available",
    contactPerson: "Sarah Lim",
    contactPhone: "+65 6123 4567",
    contactEmail: "singapore@simplysetup.com"
  }
};

export default function SingaporeWorkspacePage() {
  const [, params] = useRoute("/sg/virtual-office/:slug");
  const slug = params?.slug || "raffles-place";
  
  const workspace = singaporeWorkspaceData[slug as keyof typeof singaporeWorkspaceData] || singaporeWorkspaceData["raffles-place"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Helmet>
        <title>Virtual Office at {workspace.name} - Virtual Office Singapore | SimplySetup</title>
        <meta name="description" content={`${workspace.description} Starting from S$${workspace.price}/month with premium amenities and business support.`} />
        <meta name="keywords" content={`virtual office ${workspace.district.toLowerCase()}, business address ${workspace.district.toLowerCase()}, ${workspace.name.toLowerCase()}, singapore virtual office`} />
        <link rel="canonical" href={`https://simplysetup.com/sg/virtual-office/${workspace.slug}`} />
        
        <meta property="og:title" content={`Virtual Office at ${workspace.name} - Premium Virtual Office Singapore`} />
        <meta property="og:description" content={workspace.description} />
        <meta property="og:url" content={`https://simplysetup.com/sg/virtual-office/${workspace.slug}`} />
        <meta property="og:image" content={workspace.image} />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "OfficeSpace",
            "name": `Virtual Office at ${workspace.name}`,
            "description": workspace.description,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": workspace.address,
              "addressLocality": "Singapore",
              "addressCountry": "SG"
            },
            "priceRange": `S$${workspace.pricingTiers[0].price} - S$${workspace.pricingTiers[2].price}`,
            "amenityFeature": workspace.amenities.map(amenity => ({
              "@type": "LocationFeatureSpecification",
              "name": amenity
            })),
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": workspace.rating,
              "reviewCount": workspace.reviews
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm">
            <div className="flex items-center space-x-2 text-gray-500">
              <a href="/sg" className="hover:text-blue-600">Singapore</a>
              <span>/</span>
              <a href="/sg/virtual-office" className="hover:text-blue-600">Virtual Office</a>
              <span>/</span>
              <span className="text-gray-900">{workspace.district}</span>
            </div>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-600 text-white">
                  {workspace.district}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{workspace.rating}</span>
                  <span className="text-gray-500">({workspace.reviews} reviews)</span>
                </div>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Virtual Office at {workspace.name}
              </h1>
              
              <div className="flex items-start gap-2 mb-6">
                <MapPin className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-600">{workspace.address}</p>
                  <p className="text-sm text-blue-600 font-medium">{workspace.nearestMRT}</p>
                </div>
              </div>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {workspace.longDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Phone className="mr-2 h-5 w-5" />
                  Book Consultation
                </Button>
                <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  <Mail className="mr-2 h-5 w-5" />
                  Get Quote
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span>{workspace.businessHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Same Day Setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>ACRA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-green-600" />
                  <span>GST Ready</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <img
                src={workspace.image}
                alt={workspace.name}
                className="rounded-2xl shadow-xl w-full"
              />
              
              {/* Quick Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Starting Price:</span>
                    <span className="font-semibold text-blue-600">S${workspace.price}/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Setup Time:</span>
                    <span className="font-medium">Same Day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contact Person:</span>
                    <span className="font-medium">{workspace.contactPerson}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{workspace.contactPhone}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Choose Your Perfect Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Flexible pricing options to suit businesses of all sizes. All plans include our core virtual office services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {workspace.pricingTiers.map((tier, index) => (
              <Card key={index} className={`relative ${index === 1 ? 'border-blue-600 shadow-xl scale-105' : ''}`}>
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription className="text-sm">{tier.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-blue-600">S${tier.price}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${index === 1 ? 'bg-blue-600 hover:bg-blue-700' : 'variant-outline'}`}
                    variant={index === 1 ? 'default' : 'outline'}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Amenities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Premium Amenities Included
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {workspace.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Key Business Features
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {workspace.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <Star className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our {workspace.name}
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: `Can I use the ${workspace.name} address for company registration?`,
                answer: `Yes, our ${workspace.name} address is fully compliant with ACRA requirements and can be used for company registration, GST registration, and all official business purposes in Singapore.`
              },
              {
                question: "What documents do I receive with the virtual office?",
                answer: "You'll receive a comprehensive package including a signed letter of consent from the building owner, tenancy agreement, utility bills, and all necessary documentation required for ACRA and GST registration."
              },
              {
                question: "How quickly can I start using the service?",
                answer: "We offer same-day setup for most packages. Once you complete the registration process and provide the required documents, your virtual office service can be activated within 24 hours."
              },
              {
                question: "Do you provide mail forwarding services?",
                answer: "Yes, we offer comprehensive mail handling services including collection, scanning, and forwarding to your preferred address anywhere in the world. Digital mail scanning is available for immediate access to your correspondence."
              },
              {
                question: "Can I upgrade or downgrade my plan later?",
                answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle, and we'll help you transition smoothly between plans."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Get Started with {workspace.name}?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of successful businesses who have chosen our premium virtual office services in Singapore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-50">
              <Phone className="mr-2 h-5 w-5" />
              {workspace.contactPhone}
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Mail className="mr-2 h-5 w-5" />
              {workspace.contactEmail}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}