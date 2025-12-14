import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocation } from "@/hooks/useLocation";
import SEO from "@/components/SEO";
import SalesPersonCards from "@/components/SalesPersonCards";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  CheckCircle, 
  ShoppingCart,
  Shield, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Building, 
  Globe, 
  Zap, 
  TrendingUp, 
  Star,
  ArrowRight,
  Package,
  FileText,
  Clock,
  Award,
  Target,
  CheckSquare,
  MessageCircle,
  BarChart3,
  IndianRupee,
  Headphones,
  Settings,
  Search,
  Image,
  Languages,
  Truck,
  BookOpen,
  Scale
} from "lucide-react";

function ZohoFormEmbed() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(555);
  
  const currentPageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const baseFormUrl = 'https://forms.zohopublic.in/accounts50/form/GetExpertGuidance/formperma/p1ZKedKKTlGZv59ekQxqKD9oohD7ve1to9wdGvac3PM';
  const formUrl = `${baseFormUrl}?Website=${encodeURIComponent(currentPageUrl)}&zf_rszfm=1`;
  
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const evntData = event.data;
      if (evntData && typeof evntData === 'string') {
        const zf_ifrm_data = evntData.split("|");
        if (zf_ifrm_data.length === 2 || zf_ifrm_data.length === 3) {
          const zf_ifrm_ht_nw = parseInt(zf_ifrm_data[1], 10) + 15;
          setIframeHeight(zf_ifrm_ht_nw);
          if (zf_ifrm_data.length === 3 && iframeRef.current) {
            iframeRef.current.scrollIntoView();
          }
        }
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);
  
  return (
    <div className="w-full flex justify-center">
      <iframe
        ref={iframeRef}
        src={formUrl}
        style={{ border: 'none', height: `${iframeHeight}px`, width: '100%', transition: 'all 0.5s ease' }}
        aria-label="Get Expert Guidance"
        data-testid="iframe-zoho-form"
      />
    </div>
  );
}

export default function AmazonJapanAccountManagementPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Languages className="w-6 h-6 text-red-500" />,
      problem: "Language Barriers",
      solution: "Native Japanese listing translation and localization by experienced linguists"
    },
    {
      icon: <BookOpen className="w-6 h-6 text-red-500" />,
      problem: "Cultural Differences",
      solution: "Expert understanding of Japanese consumer preferences and buying behavior"
    },
    {
      icon: <Scale className="w-6 h-6 text-red-500" />,
      problem: "Compliance Complexity",
      solution: "Navigate Japanese import regulations, PSE marks, and product certifications"
    },
    {
      icon: <Truck className="w-6 h-6 text-red-500" />,
      problem: "International Shipping",
      solution: "FBA Japan setup with optimized shipping from India to Japanese warehouses"
    }
  ];

  const services = [
    {
      icon: <Languages className="w-8 h-8 text-orange-600" />,
      title: "Japanese Localization",
      description: "Professional translation and cultural adaptation for the Japanese market",
      features: ["Native Japanese product listings", "Culturally adapted content", "Japanese keyword optimization"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: "Japan PPC Management",
      description: "Amazon Japan advertising campaigns optimized for local search patterns",
      features: ["Japanese keyword campaigns", "Sponsored Products & Brands", "Japan-specific bid strategies"]
    },
    {
      icon: <Image className="w-8 h-8 text-purple-600" />,
      title: "A+ Content for Japan",
      description: "Enhanced brand content designed for Japanese consumers",
      features: ["Japan-style A+ Content", "Cultural imagery adaptation", "Japanese Brand Store design"]
    },
    {
      icon: <Scale className="w-8 h-8 text-green-600" />,
      title: "Compliance & Certifications",
      description: "Navigate Japanese regulations and product certifications",
      features: ["PSE mark guidance", "JIS compliance support", "Import regulation assistance"]
    },
    {
      icon: <Truck className="w-8 h-8 text-indigo-600" />,
      title: "FBA Japan Setup",
      description: "Seamless fulfillment setup from India to Japanese customers",
      features: ["International shipping setup", "FBA inventory management", "Customs documentation support"]
    },
    {
      icon: <Headphones className="w-8 h-8 text-pink-600" />,
      title: "Japanese Customer Service",
      description: "Native Japanese support to maintain excellent seller ratings",
      features: ["Japanese customer queries", "Review management in Japanese", "Cultural communication handling"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Market Research",
      description: "Analyze Japanese market demand, competition, and opportunities for your products",
      icon: <Search className="w-6 h-6 text-orange-600" />
    },
    {
      step: "2", 
      title: "Account & Compliance Setup",
      description: "Register Amazon Japan account and ensure all compliance requirements are met",
      icon: <FileText className="w-6 h-6 text-orange-600" />
    },
    {
      step: "3",
      title: "Localization & Launch",
      description: "Translate listings, set up FBA Japan, and launch your products",
      icon: <Settings className="w-6 h-6 text-orange-600" />
    },
    {
      step: "4",
      title: "Optimize & Scale",
      description: "Continuous optimization of ads, listings, and customer service for growth",
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />
    }
  ];

  const successMetrics = [
    { value: "200%", label: "Average Sales Growth", description: "In Japan market first year" },
    { value: "50+", label: "Indian Brands", description: "Successfully launched in Japan" },
    { value: "98%", label: "Compliance Rate", description: "Products pass Japanese standards" },
    { value: "24/7", label: "Bilingual Support", description: "English & Japanese coverage" }
  ];

  const faqs = [
    {
      question: "Can I sell on Amazon Japan from India?",
      answer: "Yes! Indian sellers can absolutely sell on Amazon Japan (amazon.co.jp). You'll need to register for an Amazon Japan seller account, ensure your products meet Japanese compliance standards, and set up international shipping or use FBA Japan for fulfillment."
    },
    {
      question: "What are the key compliance requirements for selling in Japan?",
      answer: "Key requirements include PSE marks for electrical products, food safety certifications for consumables, JIS standards compliance where applicable, and proper Japanese labeling. We help you navigate all these requirements for your specific product categories."
    },
    {
      question: "How do you handle Japanese language translations?",
      answer: "We use native Japanese linguists who understand both the language and cultural nuances. Our translations go beyond literal meaning to ensure your product listings resonate with Japanese consumers and include proper keywords for Amazon Japan search."
    },
    {
      question: "What is FBA Japan and how does it work for Indian sellers?",
      answer: "FBA Japan (Fulfillment by Amazon Japan) stores your products in Japanese warehouses and handles shipping to customers. We help you ship products from India to Japanese FBA centers, manage inventory levels, and ensure smooth customs clearance."
    },
    {
      question: "How long does it take to start selling on Amazon Japan?",
      answer: "Typically 4-8 weeks from account registration to first sale. This includes account setup, compliance verification, product translation, FBA shipment preparation, and listing optimization. Complex products requiring certifications may take longer."
    },
    {
      question: "What kind of products sell well on Amazon Japan?",
      answer: "Japanese consumers appreciate quality products including handicrafts, textiles, spices, ayurvedic products, ethnic wear, home decor, and electronics accessories. We analyze your product portfolio and recommend which items have the highest potential in the Japanese market."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Amazon Japan Account Management Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Amazon Japan seller account management services for Indian sellers. Includes Japanese localization, FBA Japan setup, compliance guidance, and PPC management for amazon.co.jp.",
    "areaServed": ["India", "Japan"],
    "serviceType": "International E-commerce Account Management"
  };

  return (
    <>
      <SEO
        title="Amazon Japan Account Management Services | Sell on Amazon.co.jp from India | Simply Setup"
        description="Expert Amazon Japan account management for Indian sellers. Professional Japanese localization, FBA Japan setup, compliance guidance, and PPC management. Start selling on amazon.co.jp today!"
        canonicalUrl="https://simplysetup.in/growth/amazon-japan-account-management"
      />

      <Navbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-orange-50 via-white to-yellow-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  <Globe className="w-3 h-3 mr-1" /> Amazon Japan Growth Partner
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Expand to Amazon Japan with Expert{" "}
                  <span className="text-orange-600">Account Management</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  From Japanese localization to FBA setup, we handle everything so you can tap into 
                  Japan's $150B+ e-commerce market. Trusted by 50+ Indian sellers to launch successfully on Amazon.co.jp.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-orange-600 hover:bg-orange-700" data-testid="button-get-free-audit">
                        Get Free Japan Market Analysis
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free Amazon Japan Market Analysis</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center">
                        <Users className="w-5 h-5 text-orange-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">50+ Indian Brands in Japan</p>
                    <p className="text-xs text-gray-500">Successfully selling on Amazon.co.jp</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-8 border">
                  <div className="grid grid-cols-2 gap-6">
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="text-center p-4 bg-orange-50 rounded-xl">
                        <p className="text-3xl font-bold text-orange-600">{metric.value}</p>
                        <p className="text-sm font-medium text-gray-900 mt-1">{metric.label}</p>
                        <p className="text-xs text-gray-500">{metric.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Provider Badges */}
        <section className="bg-gray-50 py-6 md:py-8">
          <div className="max-w-xs sm:max-w-lg md:max-w-xl mx-auto px-4">
            <div className="flex justify-center">
              <a 
                href="https://sellercentral.amazon.in/gspn/provider-details/Taxes/edc4f8ac-e14d-4e43-af61-399cabbbacf7?ref_=sc_gspn_talst_tadt-edc4f8ac&localeSelection=en_US&sellFrom=IN&sellIn=IN"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center bg-white p-5 md:p-6 rounded-xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                data-testid="link-amazon-sp"
              >
                <img 
                  src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/seller_service_provider_2acd6823-000f-444a-85f9-5ba66426bbe5.png?v=1705946594" 
                  alt="Amazon Service Provider" 
                  className="w-full max-w-[220px] md:max-w-[280px] h-auto object-contain"
                />
              </a>
            </div>
          </div>
        </section>

        {/* Trusted Clients Section */}
        <section className="w-full bg-white py-8 border-t border-b border-gray-200 overflow-hidden">
          <div className="max-w-6xl mx-auto px-5">
            <div className="text-center mb-5">
              <h2 className="text-2xl text-gray-900 font-bold mb-1 leading-tight">
                Trusted by Leading Brands
              </h2>
              <div className="w-20 h-1 bg-orange-600 mx-auto my-3 rounded-sm"></div>
              <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
                We have successfully served over 10,000 businesses
              </p>
            </div>

            <div className="relative max-w-6xl mx-auto overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-linear"
                style={{
                  animation: "scroll-logos 20s linear infinite",
                  width: "calc(200% + 96px)",
                }}
              >
                {/* First set of logos */}
                <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                  <img className="max-w-full max-h-12 object-contain" src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/Airtel-logo.png?v=1744191898" alt="AIRTEL" />
                </div>
                <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                  <img className="max-w-full max-h-12 object-contain" src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/godrej-logo-191FB61A1F-seeklogo.com.png?v=1723541004" alt="GODREJ" />
                </div>
                <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                  <img className="max-w-full max-h-12 object-contain" src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/TATA_1mg_Logo.png?v=1749482060" alt="TATA1MG" />
                </div>
                <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                  <img className="max-w-full max-h-12 object-contain" src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/MANKIND.NS_BIG-e2edbe6b.png?v=1740139347" alt="MANKIND" />
                </div>
                <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                  <img className="max-w-full max-h-12 object-contain" src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/haldirams-logo_1.png?v=1723630841" alt="HALDIRAM" />
                </div>
                <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                  <img className="max-w-full max-h-12 object-contain" src="https://thegstco.com/cdn/shop/files/Milton_Logo_x38.png?v=1719050580" alt="MILTON" />
                </div>
                <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                  <img className="max-w-full max-h-12 object-contain" src="https://thegstco.com/cdn/shop/files/mamaearth-logo_x38.png?v=1706364685" alt="MAMAEARTH" />
                </div>
                <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                  <img className="max-w-full max-h-12 object-contain" src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/cocoblu-logo.png?v=1723009856" alt="COCOBLU" />
                </div>

                {/* Duplicate set for seamless loop */}
                <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                  <img className="max-w-full max-h-12 object-contain" src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/Airtel-logo.png?v=1744191898" alt="AIRTEL" />
                </div>
                <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                  <img className="max-w-full max-h-12 object-contain" src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/godrej-logo-191FB61A1F-seeklogo.com.png?v=1723541004" alt="GODREJ" />
                </div>
                <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                  <img className="max-w-full max-h-12 object-contain" src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/TATA_1mg_Logo.png?v=1749482060" alt="TATA1MG" />
                </div>
                <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                  <img className="max-w-full max-h-12 object-contain" src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/MANKIND.NS_BIG-e2edbe6b.png?v=1740139347" alt="MANKIND" />
                </div>
                <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                  <img className="max-w-full max-h-12 object-contain" src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/haldirams-logo_1.png?v=1723630841" alt="HALDIRAM" />
                </div>
                <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                  <img className="max-w-full max-h-12 object-contain" src="https://thegstco.com/cdn/shop/files/Milton_Logo_x38.png?v=1719050580" alt="MILTON" />
                </div>
                <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                  <img className="max-w-full max-h-12 object-contain" src="https://thegstco.com/cdn/shop/files/mamaearth-logo_x38.png?v=1706364685" alt="MAMAEARTH" />
                </div>
                <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                  <img className="max-w-full max-h-12 object-contain" src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/cocoblu-logo.png?v=1723009856" alt="COCOBLU" />
                </div>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes scroll-logos {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </section>

        {/* Pain Points Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Challenges of Selling on Amazon Japan from India
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common barriers faced by Indian sellers entering the Japanese market - and how we solve them
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {painPoints.map((point, index) => (
                <Card key={index} className="border-2 hover:border-orange-200 transition-colors">
                  <CardContent className="p-6">
                    <div className="mb-4">{point.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{point.problem}</h3>
                    <p className="text-sm text-gray-600">{point.solution}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section after Pain Points */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">Start Selling in Japan Today</h3>
                <p className="text-gray-600 text-lg">
                  Let our team of Japan market specialists help you tap into one of the world's largest e-commerce markets.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free Japan market analysis for your products</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Compliance requirement assessment</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">No commitment required</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <ZohoFormEmbed />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Complete Amazon Japan Management Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                End-to-end solutions to launch and grow your business on Amazon.co.jp
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-2">{service.icon}</div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Specialized Services Section */}
        <section className="py-16 bg-red-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Specialized Services for Amazon Japan
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Deep-dive into our specialized offerings designed for the Japanese marketplace
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/growth/amazon-japan-account-management/market-entry">
                <Card className="bg-white hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full border-2 hover:border-red-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-7 h-7 text-red-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Market Entry</h3>
                    <p className="text-sm text-gray-600">Strategic entry into Japan with compliance and cultural guidance</p>
                    <div className="mt-4 text-red-600 text-sm font-medium flex items-center justify-center gap-1">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/amazon-japan-account-management/localized-content">
                <Card className="bg-white hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full border-2 hover:border-red-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Languages className="w-7 h-7 text-red-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Localized Content</h3>
                    <p className="text-sm text-gray-600">Native Japanese translations and culturally adapted listings</p>
                    <div className="mt-4 text-red-600 text-sm font-medium flex items-center justify-center gap-1">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/amazon-japan-account-management/cross-border-logistics">
                <Card className="bg-white hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full border-2 hover:border-red-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Truck className="w-7 h-7 text-red-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Cross-border Logistics</h3>
                    <p className="text-sm text-gray-600">FBA Japan setup, shipping, and inventory management</p>
                    <div className="mt-4 text-red-600 text-sm font-medium flex items-center justify-center gap-1">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/amazon-japan-account-management/regional-ads">
                <Card className="bg-white hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full border-2 hover:border-red-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-7 h-7 text-red-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Regional Ads</h3>
                    <p className="text-sm text-gray-600">Japanese keyword campaigns and local advertising strategies</p>
                    <div className="mt-4 text-red-600 text-sm font-medium flex items-center justify-center gap-1">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How We Launch Your Brand in Japan
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our proven 4-step process for successful Japan market entry
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="absolute top-8 left-1/2 w-full h-0.5 bg-orange-200 -z-10 hidden md:block" 
                       style={{ display: index === processSteps.length - 1 ? 'none' : undefined }} />
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about selling on Amazon Japan from India
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="bg-gray-50 rounded-lg px-6">
                    <AccordionTrigger className="text-left font-medium hover:no-underline" data-testid={`faq-trigger-${index}`}>
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-orange-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Expand to Amazon Japan?
            </h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Get a free market analysis and discover how your products can succeed in Japan's thriving e-commerce market
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50" data-testid="button-cta-free-audit">
                  Get Your Free Japan Market Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Free Amazon Japan Market Analysis</DialogTitle>
                </DialogHeader>
                <ZohoFormEmbed />
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* Sales Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Speak with Our Japan Market Experts
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our dedicated team is ready to help you succeed on Amazon Japan
              </p>
            </div>
            <SalesPersonCards locationId={currentLocation?.id || 1} />
          </div>
        </section>
      </main>

      <Footer location={currentLocation} />
    </>
  );
}
