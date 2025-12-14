import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocation } from "@/hooks/useLocation";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Building2, 
  Users, 
  Globe, 
  Target, 
  Briefcase, 
  FileText,
  ShoppingCart,
  Zap,
  Heart,
  Construction,
  Truck,
  Utensils,
  Factory,
  Leaf,
  Stethoscope,
  Hotel,
  Code,
  UserCheck,
  Calendar,
  Receipt,
  CreditCard,
  Building,
  CheckSquare,
  ArrowRight,
  Filter,
  Sparkles,
  Shield
} from "lucide-react";

export default function PurposesPage() {
  const { currentLocation } = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // All purposes categorized
  const purposeCategories = [
    {
      id: "registrations",
      name: "Registrations & Compliance",
      icon: <FileText className="w-5 h-5" />,
      description: "Legal and regulatory requirements"
    },
    {
      id: "business-types",
      name: "Business Types",
      icon: <Building2 className="w-5 h-5" />,
      description: "Virtual offices for different business structures"
    }
  ];

  const allPurposes = [
    // Registration & Compliance Purposes
    {
      id: "gst-registration",
      title: "GST Registration",
      description: "Get your GSTIN certificate with professional business address and complete GST compliance support.",
      icon: <Receipt className="w-8 h-8 text-green-600" />,
      badge: "GST Filing",
      badgeColor: "bg-green-100 text-green-800",
      features: ["GSTIN Certificate", "Pre-verified Address", "Compliance Support"],
      link: "/purpose/virtual-office-for-gst-registration",
      category: "registrations",
      gradient: "from-green-600 to-emerald-600"
    },
    {
      id: "company-registration",
      title: "Company Registration",
      description: "Register your private limited company, OPC, or LLP with professional registered office address and complete ROC filing support.",
      icon: <Building className="w-8 h-8 text-blue-600" />,
      badge: "Registration",
      badgeColor: "bg-blue-100 text-blue-800",
      features: ["ROC Filing Support", "MCA Compliance", "Fast-track Registration"],
      link: "/purpose/virtual-office-for-company-registration",
      category: "registrations",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      id: "bank-account",
      title: "Bank Account Formation",
      description: "Open current accounts with major banks using verified business addresses. Complete KYC support and banking documentation.",
      icon: <CreditCard className="w-8 h-8 text-purple-600" />,
      badge: "Banking",
      badgeColor: "bg-purple-100 text-purple-800",
      features: ["Current Account Opening", "KYC Support", "Banking Documentation"],
      link: "/purpose/virtual-office-for-bank-account-formation",
      category: "registrations",
      gradient: "from-purple-600 to-violet-600"
    },
    {
      id: "google-maps-registration",
      title: "Google Maps Registration",
      description: "Setup and verify your Google Maps business listing for enhanced local SEO with professional business address verification.",
      icon: <Search className="w-8 h-8 text-red-600" />,
      badge: "Maps SEO",
      badgeColor: "bg-red-100 text-red-800",
      features: ["Google Maps Verification", "Local SEO", "Business Listing"],
      link: "/purpose/virtual-office-for-google-my-business-registration",
      category: "registrations",
      gradient: "from-red-600 to-pink-600"
    },
    {
      id: "msme-registration",
      title: "MSME Registration",
      description: "Register your micro, small, or medium enterprise with professional business address for government benefits and subsidies.",
      icon: <Building2 className="w-8 h-8 text-orange-600" />,
      badge: "MSME",
      badgeColor: "bg-orange-100 text-orange-800",
      features: ["MSME Certificate", "Government Benefits", "Subsidy Access"],
      link: "/purpose/virtual-office-for-msme-registration",
      category: "registrations",
      gradient: "from-orange-600 to-red-600"
    },
    {
      id: "trade-license",
      title: "Trade License",
      description: "Obtain trade license with professional business address for retail, wholesale, and commercial business operations.",
      icon: <Briefcase className="w-8 h-8 text-indigo-600" />,
      badge: "Trade",
      badgeColor: "bg-indigo-100 text-indigo-800",
      features: ["Trade License", "Commercial Operations", "Local Authority Registration"],
      link: "/purpose/virtual-office-for-trade-license",
      category: "registrations",
      gradient: "from-indigo-600 to-purple-600"
    },
    // Business Types
    {
      id: "partnership",
      title: "Partnership Firm",
      description: "Start your partnership firm with professional business address and partnership deed registration support.",
      icon: <Users className="w-8 h-8 text-purple-600" />,
      badge: "Partnership",
      badgeColor: "bg-purple-100 text-purple-800",
      features: ["Partnership Deed", "Partner Registration", "Firm Registration"],
      link: "/purpose/virtual-office-for-partnership",
      category: "business-types",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      id: "opc-registration",
      title: "One Person Company",
      description: "Register your One Person Company with professional address and enjoy limited liability benefits as a solo entrepreneur.",
      icon: <UserCheck className="w-8 h-8 text-green-600" />,
      badge: "OPC",
      badgeColor: "bg-green-100 text-green-800",
      features: ["Solo Entrepreneur", "Limited Liability", "Nominee Director"],
      link: "/purpose/virtual-office-for-opc",
      category: "business-types",
      gradient: "from-green-600 to-emerald-600"
    },
    {
      id: "llp-registration",
      title: "Limited Liability Partnership",
      description: "Register your Limited Liability Partnership with professional registered office address and complete LLP compliance.",
      icon: <Users className="w-8 h-8 text-teal-600" />,
      badge: "LLP",
      badgeColor: "bg-teal-100 text-teal-800",
      features: ["LLP Registration", "Partner Documentation", "MCA Compliance"],
      link: "/purpose/virtual-office-for-llp-registration",
      category: "business-types",
      gradient: "from-teal-600 to-cyan-600"
    },
    {
      id: "private-limited",
      title: "Private Limited Company",
      description: "Establish your private limited company with professional registered office address and complete incorporation services.",
      icon: <Building className="w-8 h-8 text-blue-600" />,
      badge: "Pvt Ltd",
      badgeColor: "bg-blue-100 text-blue-800",
      features: ["Company Incorporation", "Share Capital Management", "Director Appointments"],
      link: "/purpose/virtual-office-for-private-limited",
      category: "business-types",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      id: "section8-company",
      title: "Section 8 Company",
      description: "Register your non-profit Section 8 company with professional address for charitable, educational, or social welfare activities.",
      icon: <Heart className="w-8 h-8 text-red-600" />,
      badge: "Section 8",
      badgeColor: "bg-red-100 text-red-800",
      features: ["Non-profit Registration", "Charitable Activities", "Tax Exemptions"],
      link: "/purpose/virtual-office-for-section8",
      category: "business-types",
      gradient: "from-red-600 to-rose-600"
    },
    {
      id: "trust-registration",
      title: "Trust Registration",
      description: "Register your trust with professional address for charitable, religious, or educational purposes with tax benefits.",
      icon: <Shield className="w-8 h-8 text-amber-600" />,
      badge: "Trust",
      badgeColor: "bg-amber-100 text-amber-800",
      features: ["Trust Deed", "Tax Benefits", "Charitable Registration"],
      link: "/purpose/virtual-office-for-trust",
      category: "business-types",
      gradient: "from-amber-600 to-orange-600"
    },
    {
      id: "public-limited",
      title: "Public Limited Company",
      description: "Establish your public limited company with professional registered office for public shareholding and stock exchange listing.",
      icon: <Globe className="w-8 h-8 text-indigo-600" />,
      badge: "Public Ltd",
      badgeColor: "bg-indigo-100 text-indigo-800",
      features: ["Public Shareholding", "Stock Exchange Listing", "IPO Ready"],
      link: "/purpose/virtual-office-for-public-limited",
      category: "business-types",
      gradient: "from-indigo-600 to-blue-600"
    },
    {
      id: "producer-company",
      title: "Producer Company",
      description: "Register your producer company for agricultural, dairy, or cooperative activities with professional business address.",
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      badge: "Producer",
      badgeColor: "bg-green-100 text-green-800",
      features: ["Agricultural Activities", "Cooperative Benefits", "Producer Registration"],
      link: "/purpose/virtual-office-for-producer-company",
      category: "business-types",
      gradient: "from-green-600 to-teal-600"
    },
    {
      id: "indian-subsidiary",
      title: "Indian Subsidiary",
      description: "Establish your foreign company's Indian subsidiary with professional registered office and FEMA compliance.",
      icon: <Building2 className="w-8 h-8 text-blue-600" />,
      badge: "Subsidiary",
      badgeColor: "bg-blue-100 text-blue-800",
      features: ["Foreign Investment", "FEMA Compliance", "Subsidiary Setup"],
      link: "/purpose/virtual-office-for-indian-subsidiary",
      category: "business-types",
      gradient: "from-blue-600 to-cyan-600"
    }
  ];

  // Filter purposes based on search and category
  const filteredPurposes = allPurposes.filter(purpose => {
    const matchesSearch = purpose.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         purpose.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || purpose.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Generate structured data for AI SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://simplysetup.com/purposes",
        "url": "https://simplysetup.com/purposes",
        "name": "Virtual Office for Business Registration & Compliance - Professional Address Solutions",
        "description": "Complete guide to virtual office solutions for 15 business registration types including GST registration, company incorporation, and compliance services",
        "inLanguage": "en-IN",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://simplysetup.com",
          "name": "SimplySetup",
          "url": "https://simplysetup.com"
        },
        "breadcrumb": {
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
              "name": "Business Registration Purposes",
              "item": "https://simplysetup.com/purposes"
            }
          ]
        }
      },
      {
        "@type": "Dataset",
        "name": "Business Registration Virtual Office Solutions",
        "description": "Comprehensive database of 15 virtual office solutions for different business registration and compliance needs in India",
        "provider": {
          "@type": "Organization",
          "name": "SimplySetup",
          "url": "https://simplysetup.com"
        },
        "distribution": {
          "@type": "DataDownload",
          "contentUrl": "https://simplysetup.com/purposes",
          "encodingFormat": "text/html"
        },
        "keywords": "virtual office, business registration, GST registration, company incorporation, compliance, professional address"
      },
      {
        "@type": "ItemList",
        "name": "Business Registration Types",
        "description": "15 types of business registration and compliance services available with virtual office solutions",
        "numberOfItems": 15,
        "itemListElement": allPurposes.map((purpose, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": purpose.title,
          "description": purpose.description,
          "url": `https://simplysetup.com${purpose.link}`
        }))
      },
      {
        "@type": "Service",
        "name": "Virtual Office Business Registration Services",
        "description": "Professional virtual office addresses and compliance support for all business registration needs in India",
        "provider": {
          "@type": "Organization",
          "name": "SimplySetup",
          "url": "https://simplysetup.com"
        },
        "serviceType": "Business Registration Support",
        "areaServed": {
          "@type": "Country",
          "name": "India"
        },
        "offers": {
          "@type": "Offer",
          "price": "499",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "validFrom": "2025-01-01"
        }
      }
    ]
  };

  return (
    <>
      <SEO 
        title="Virtual Office for Business Registration & Compliance - Professional Address Solutions | SimplySetup"
        description="Complete guide to virtual office solutions for 15 business registration types: GST registration, company incorporation, bank account opening, MSME registration, trade license, partnership firm, OPC, LLP, private limited company, Section 8, trust registration, public limited, producer company, Indian subsidiary. Professional business addresses with compliance support starting ₹499/month."
        canonicalUrl="/purposes"
      />
      
      {/* AI-Optimized Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        {/* Hero Section - AI Optimized */}
        <header className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16 relative overflow-hidden" role="banner">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight hero-heading">
                Virtual Office for
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  Business Registration
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto leading-relaxed">
                Professional business address solutions for all your registration and compliance needs in India. 
                From GST registration to company incorporation, we provide verified addresses for 15 business registration types 
                starting at ₹499/month with complete compliance support.
              </p>
              
              {/* AI-Friendly Key Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">15+</div>
                  <div className="text-sm text-blue-100">Registration Types</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">₹499</div>
                  <div className="text-sm text-blue-100">Starting Price/Month</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">48 Hours</div>
                  <div className="text-sm text-blue-100">Setup Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">24/7</div>
                  <div className="text-sm text-blue-100">Support</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Search and Filter Section */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search purposes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 py-3 text-lg"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("all")}
                  className="flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  All Purposes
                </Button>
                {purposeCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    {category.icon}
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>



        {/* Purposes Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedCategory === "all" 
                  ? `All Virtual Office Purposes (${filteredPurposes.length})`
                  : `${purposeCategories.find(c => c.id === selectedCategory)?.name} (${filteredPurposes.length})`
                }
              </h2>
              {searchQuery && (
                <p className="text-gray-600">
                  Showing results for "{searchQuery}"
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPurposes.map((purpose) => (
                <Card key={purpose.id} className="group hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-300 overflow-hidden bg-white hover:bg-gray-50/50">
                  <div className={`h-1 bg-gradient-to-r ${purpose.gradient}`}></div>
                  
                  <CardHeader className="pb-3 pt-6 px-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2.5 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors duration-300 shadow-sm">
                        {purpose.icon}
                      </div>
                      <Badge className={`${purpose.badgeColor} font-medium text-xs px-2.5 py-1`}>
                        {purpose.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                      {purpose.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="px-6 pb-6 space-y-4">
                    <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">
                      {purpose.description}
                    </p>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 text-sm border-b border-gray-100 pb-1">Key Features:</h4>
                      <ul className="space-y-2">
                        {purpose.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600">
                            <CheckSquare className="w-3.5 h-3.5 text-green-500 mr-2.5 flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2">
                      <Link href={purpose.link}>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-all duration-300 group-hover:shadow-md">
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPurposes.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No purposes found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* AI-Optimized Overview Section */}
        <section className="py-16 bg-white" itemScope itemType="https://schema.org/Article">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6" itemProp="headline">
                Complete Virtual Office Solutions for Business Registration in India
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8" itemProp="description">
                SimplySetup provides professional virtual office addresses for all business registration and compliance needs across India. 
                Our verified business addresses support GST registration, company incorporation, bank account opening, and 13 other registration types 
                with complete documentation and compliance assistance.
              </p>
              
              {/* AI-Friendly What We Offer Section */}
              <div className="bg-blue-50 rounded-2xl p-8 mb-12 text-left max-w-5xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">What SimplySetup Virtual Office Includes</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Registration & Compliance Support:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Pre-verified business addresses in prime locations</li>
                      <li>• GST registration with GSTIN certificate</li>
                      <li>• Company incorporation support (ROC filing)</li>
                      <li>• Bank account opening assistance</li>
                      <li>• MSME registration for government benefits</li>
                      <li>• Trade license and local authority approvals</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Business Entity Formation:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Partnership firm registration</li>
                      <li>• One Person Company (OPC) setup</li>
                      <li>• Limited Liability Partnership (LLP)</li>
                      <li>• Private Limited Company incorporation</li>
                      <li>• Section 8 (Non-profit) company registration</li>
                      <li>• Trust registration and Public Limited setup</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI-Optimized FAQ Section */}
        <section className="py-16 bg-gray-50" itemScope itemType="https://schema.org/FAQPage">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions About Virtual Office Registration
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get answers to common questions about using virtual offices for business registration in India
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <div itemScope itemType="https://schema.org/Question" className="bg-white rounded-lg p-6 shadow-sm">
                <h3 itemProp="name" className="text-lg font-semibold text-gray-900 mb-3">
                  What is a virtual office and how does it help with business registration?
                </h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p itemProp="text" className="text-gray-700 leading-relaxed">
                    A virtual office provides a professional business address without the need for physical office space. 
                    It's legally accepted for GST registration, company incorporation, bank account opening, and other business registrations in India. 
                    Virtual offices include mail handling, call forwarding, and meeting room access when needed, making them ideal for startups, 
                    freelancers, and small businesses looking to establish a professional presence cost-effectively.
                  </p>
                </div>
              </div>

              <div itemScope itemType="https://schema.org/Question" className="bg-white rounded-lg p-6 shadow-sm">
                <h3 itemProp="name" className="text-lg font-semibold text-gray-900 mb-3">
                  Which business registration types can use virtual office addresses?
                </h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p itemProp="text" className="text-gray-700 leading-relaxed">
                    Virtual offices support 15 registration types: GST Registration, Company Registration, Bank Account Formation, 
                    Google Maps Registration, MSME Registration, Trade License, Partnership Firm, One Person Company (OPC), 
                    Limited Liability Partnership (LLP), Private Limited Company, Section 8 Company, Trust Registration, 
                    Public Limited Company, Producer Company, and Indian Subsidiary. All these registrations are legally compliant 
                    and accepted by government authorities when using verified virtual office addresses.
                  </p>
                </div>
              </div>

              <div itemScope itemType="https://schema.org/Question" className="bg-white rounded-lg p-6 shadow-sm">
                <h3 itemProp="name" className="text-lg font-semibold text-gray-900 mb-3">
                  How much does a virtual office cost for business registration?
                </h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p itemProp="text" className="text-gray-700 leading-relaxed">
                    Virtual office services start at ₹499 per month and include a professional business address, 
                    mail handling, GST registration support, and compliance assistance. Pricing varies based on location, 
                    additional services like call forwarding, meeting room access, and the specific registration requirements. 
                    This is significantly more cost-effective than renting physical office space, which can cost ₹10,000-50,000+ monthly.
                  </p>
                </div>
              </div>

              <div itemScope itemType="https://schema.org/Question" className="bg-white rounded-lg p-6 shadow-sm">
                <h3 itemProp="name" className="text-lg font-semibold text-gray-900 mb-3">
                  What documents are required for virtual office business registration?
                </h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p itemProp="text" className="text-gray-700 leading-relaxed">
                    Required documents vary by registration type but typically include: Aadhaar Card, PAN Card, passport-size photographs, 
                    bank statements, utility bills for address proof, and specific forms for each registration (GST REG-01, SPICe+ for companies, etc.). 
                    For company registration, you'll need director details, MOA/AOA, and DIN/DSC. Our team provides a complete checklist 
                    and assists with document preparation to ensure smooth registration process.
                  </p>
                </div>
              </div>

              <div itemScope itemType="https://schema.org/Question" className="bg-white rounded-lg p-6 shadow-sm">
                <h3 itemProp="name" className="text-lg font-semibold text-gray-900 mb-3">
                  How long does business registration take with a virtual office?
                </h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p itemProp="text" className="text-gray-700 leading-relaxed">
                    Virtual office setup takes 24-48 hours, while business registration timelines vary: GST registration (3-7 days), 
                    Private Limited Company (10-15 days), LLP (15-20 days), Partnership Firm (7-10 days), OPC (10-15 days), 
                    and bank account opening (5-10 days after business registration). Using a pre-verified virtual office address 
                    eliminates address verification delays, making the entire process 30-40% faster than traditional registration methods.
                  </p>
                </div>
              </div>

              <div itemScope itemType="https://schema.org/Question" className="bg-white rounded-lg p-6 shadow-sm">
                <h3 itemProp="name" className="text-lg font-semibold text-gray-900 mb-3">
                  Are virtual offices legally accepted for all business registrations in India?
                </h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p itemProp="text" className="text-gray-700 leading-relaxed">
                    Yes, virtual offices are legally accepted by Indian authorities including MCA (Ministry of Corporate Affairs), 
                    GST Department, RBI, and local municipal corporations for business registration. However, the address must be 
                    genuine, verifiable, and comply with respective registration requirements. SimplySetup provides only verified, 
                    compliant virtual office addresses that meet all legal standards for business registration, ensuring your 
                    applications are approved without issues.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI-Optimized Benefits Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose SimplySetup for Virtual Office Registration?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive support for all your business registration and compliance needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Complete Compliance</h3>
                <p className="text-gray-700">
                  All virtual office addresses are pre-verified and compliant with MCA, GST, and banking regulations. 
                  Get approved faster with zero compliance issues.
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Prime Locations</h3>
                <p className="text-gray-700">
                  Professional business addresses in premium commercial areas across major Indian cities. 
                  Enhance your business credibility and market presence.
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Support</h3>
                <p className="text-gray-700">
                  Dedicated registration experts guide you through every step. From documentation to final approval, 
                  get 24/7 support throughout your registration journey.
                </p>
              </div>
            </div>
          </div>
        </section>



        <Footer location={currentLocation} />
      </div>
    </>
  );
}