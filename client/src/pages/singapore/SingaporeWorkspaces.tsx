import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
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
  Users
} from "lucide-react";
import Navbar from "@/components/Navbar";

const singaporeLocations = [
  {
    id: 1,
    name: "Raffles Place Virtual Office",
    slug: "raffles-place",
    address: "1 Raffles Place, One Raffles Place, #20-61, Singapore 048616",
    district: "Central Business District",
    price: "180",
    currency: "SGD",
    description: "Premium virtual office space in Singapore's most prestigious financial district. Perfect for international businesses looking to establish credibility in Southeast Asia.",
    image: "https://images.unsplash.com/photo-1525438160292-a4a860951216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Premium Business Address", "Mail Handling", "Phone Answering", "Meeting Rooms", "24/7 Access"],
    features: ["ACRA Registered", "GST Ready", "Banking Support", "Compliance Assistance"],
    rating: 4.9,
    reviews: 127
  },
  {
    id: 2,
    name: "Orchard Road Business Center",
    slug: "orchard-road",
    address: "391 Orchard Road, Ngee Ann City Tower A, #22-06, Singapore 238872",
    district: "Orchard",
    price: "200",
    currency: "SGD", 
    description: "Strategic location in Singapore's premier shopping and business district. Ideal for retail, consulting, and service businesses targeting local and tourist markets.",
    image: "https://images.unsplash.com/photo-1555217851-6141535bd771?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Prestigious Address", "Reception Services", "Mail Forwarding", "Conference Facilities", "Business Lounge"],
    features: ["Prime Location", "MRT Connected", "Retail Access", "Tourist Footfall"],
    rating: 4.8,
    reviews: 98
  },
  {
    id: 3,
    name: "Marina Bay Financial Centre",
    slug: "marina-bay",
    address: "10 Marina Boulevard, Marina Bay Financial Centre, #12-01, Singapore 018983",
    district: "Marina Bay",
    price: "250",
    currency: "SGD",
    description: "Ultra-modern virtual office in Marina Bay Financial Centre with stunning city views. Perfect for fintech, banking, and international corporations.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Luxury Business Address", "Dedicated Phone Line", "Professional Reception", "Video Conferencing", "City Views"],
    features: ["Grade A Building", "FinTech Hub", "Government Proximity", "International Standards"],
    rating: 4.9,
    reviews: 156
  },
  {
    id: 4,
    name: "Tanjong Pagar Business Hub", 
    slug: "tanjong-pagar",
    address: "120 Robinson Road, SIF Building, #15-01, Singapore 068913",
    district: "Tanjong Pagar",
    price: "170",
    currency: "SGD",
    description: "Professional virtual office space in the heart of Tanjong Pagar business district. Excellent for startups and SMEs looking for cost-effective solutions.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Professional Address", "Mail Services", "Call Handling", "Meeting Facilities", "Admin Support"],
    features: ["Cost Effective", "Startup Friendly", "MRT Access", "Business Support"],
    rating: 4.7,
    reviews: 89
  },
  {
    id: 5,
    name: "Jurong East Corporate Centre",
    slug: "jurong-east", 
    address: "2 Jurong East Street 21, IMM Building, #08-01, Singapore 609601",
    district: "Jurong East",
    price: "150",
    currency: "SGD",
    description: "Strategic location in Singapore's western business hub. Perfect for manufacturing, logistics, and companies targeting the western corridor.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Business Address", "Mail Handling", "Reception Services", "Meeting Rooms", "Parking"],
    features: ["Industrial Access", "Logistics Hub", "Cost Savings", "Growth Potential"],
    rating: 4.6,
    reviews: 67
  },
  {
    id: 6,
    name: "Bugis Business District",
    slug: "bugis",
    address: "200 Victoria Street, Bugis Junction Tower, #11-01, Singapore 188021", 
    district: "Bugis",
    price: "175",
    currency: "SGD",
    description: "Vibrant location in Singapore's cultural and business district. Ideal for creative agencies, consulting firms, and businesses targeting diverse markets.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Central Address", "Mail Services", "Phone Services", "Meeting Spaces", "Cultural Access"],
    features: ["Cultural District", "Transport Hub", "Diverse Community", "Historic Area"],
    rating: 4.7,
    reviews: 78
  }
];

export default function SingaporeWorkspaces() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Helmet>
        <title>Virtual Office Locations in Singapore - Premium Business Addresses | SimplySetup</title>
        <meta name="description" content="Explore premium virtual office locations across Singapore including Raffles Place, Orchard Road, Marina Bay, and more. Get your Singapore business address today." />
        <meta name="keywords" content="virtual office singapore locations, business address singapore, singapore office rental, virtual office raffles place, virtual office orchard road" />
        <link rel="canonical" href="https://simplysetup.com/sg/virtual-office" />
        
        <meta property="og:title" content="Virtual Office Locations in Singapore - Premium Business Addresses" />
        <meta property="og:description" content="Choose from premium virtual office locations across Singapore's key business districts. Professional addresses starting from S$150/month." />
        <meta property="og:url" content="https://simplysetup.com/sg/virtual-office" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Virtual Office Locations in <span className="text-blue-600">Singapore</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Choose from our premium virtual office locations across Singapore's key business districts. 
              All locations include professional business addresses, mail handling, and company registration support.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-sm py-2 px-4">
                <CheckCircle className="w-4 h-4 mr-2" />
                ACRA Registered Addresses
              </Badge>
              <Badge variant="secondary" className="text-sm py-2 px-4">
                <CheckCircle className="w-4 h-4 mr-2" />
                Same Day Setup
              </Badge>
              <Badge variant="secondary" className="text-sm py-2 px-4">
                <CheckCircle className="w-4 h-4 mr-2" />
                GST Registration Ready
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {singaporeLocations.map((location) => (
              <Card key={location.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={location.image} 
                    alt={location.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600 text-white">
                      {location.district}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white rounded-lg px-2 py-1 flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{location.rating}</span>
                      <span className="text-xs text-gray-500">({location.reviews})</span>
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{location.name}</CardTitle>
                  <CardDescription className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 text-gray-500 flex-shrink-0" />
                    <span className="text-sm">{location.address}</span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {location.description}
                  </p>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {location.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Amenities:</h4>
                    <div className="grid grid-cols-1 gap-1">
                      {location.amenities.slice(0, 3).map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">
                        S${location.price}
                      </span>
                      <span className="text-gray-500 text-sm">/month</span>
                    </div>
                    <Link href={`/sg/virtual-office/${location.slug}`}>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Singapore Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Singapore for Your Virtual Office?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Singapore offers unparalleled advantages for businesses looking to establish a presence in Southeast Asia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Business-Friendly Environment</h3>
              <p className="text-gray-600 text-sm">
                World Bank ranks Singapore #2 globally for ease of doing business
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Strategic Location</h3>
              <p className="text-gray-600 text-sm">
                Gateway to Southeast Asia's 650 million consumer market
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tax Advantages</h3>
              <p className="text-gray-600 text-sm">
                Corporate tax rate as low as 17% with various incentive schemes
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Skilled Workforce</h3>
              <p className="text-gray-600 text-sm">
                Highly educated, multilingual talent pool in a stable environment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Start Your Singapore Business Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Choose your preferred location and get started with your Singapore virtual office today. 
            Our team will guide you through the entire setup process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-50">
              <Phone className="mr-2 h-5 w-5" />
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Mail className="mr-2 h-5 w-5" />
              Get Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}