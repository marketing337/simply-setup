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
  DollarSign,
  Truck,
  FileCheck,
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

export default function AmazonUSAAccountManagementPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Globe className="w-6 h-6 text-red-500" />,
      problem: "International Shipping Complexity",
      solution: "End-to-end FBA prep and international logistics management for seamless US delivery"
    },
    {
      icon: <Scale className="w-6 h-6 text-red-500" />,
      problem: "US Tax & Compliance Issues",
      solution: "Complete US tax filing, sales tax nexus management, and FDA/regulatory compliance"
    },
    {
      icon: <DollarSign className="w-6 h-6 text-red-500" />,
      problem: "Currency & Payment Challenges",
      solution: "Optimized USD pricing strategies and multi-currency payment reconciliation"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      problem: "Brand Protection in US Market",
      solution: "Amazon Brand Registry USA setup, trademark protection, and IP enforcement"
    }
  ];

  const services = [
    {
      icon: <Package className="w-8 h-8 text-orange-600" />,
      title: "US Listing Optimization",
      description: "Create localized product listings that resonate with American buyers",
      features: ["US market keyword research", "Culturally adapted content", "US English copywriting"]
    },
    {
      icon: <Truck className="w-8 h-8 text-blue-600" />,
      title: "FBA Prep & Logistics",
      description: "Seamless inventory management from India to US Amazon warehouses",
      features: ["International shipping coordination", "FBA prep center management", "Inventory forecasting for US"]
    },
    {
      icon: <FileCheck className="w-8 h-8 text-purple-600" />,
      title: "US Tax Compliance",
      description: "Navigate complex US tax requirements with expert guidance",
      features: ["Sales tax nexus management", "State tax registration", "Annual tax filing support"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Brand Registry USA",
      description: "Protect your brand in the world's largest e-commerce market",
      features: ["US trademark assistance", "Brand Registry enrollment", "IP violation monitoring"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-indigo-600" />,
      title: "US PPC & Advertising",
      description: "Drive visibility with campaigns optimized for American consumers",
      features: ["Sponsored Products USA", "Display advertising", "Amazon DSP campaigns"]
    },
    {
      icon: <Headphones className="w-8 h-8 text-pink-600" />,
      title: "US Customer Support",
      description: "Provide excellent service across time zones",
      features: ["US timezone coverage", "English support specialists", "Returns management USA"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "US Market Assessment",
      description: "Analyze your products for US market potential, competition, and regulatory requirements",
      icon: <Search className="w-6 h-6 text-orange-600" />
    },
    {
      step: "2", 
      title: "Account & Compliance Setup",
      description: "Register your Amazon.com seller account with proper tax IDs and legal documentation",
      icon: <FileText className="w-6 h-6 text-orange-600" />
    },
    {
      step: "3",
      title: "Product Launch",
      description: "Optimize listings, set up FBA, and launch your products in the US marketplace",
      icon: <Settings className="w-6 h-6 text-orange-600" />
    },
    {
      step: "4",
      title: "Scale & Expand",
      description: "Grow sales with advertising, expand product catalog, and dominate your niche",
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />
    }
  ];

  const successMetrics = [
    { value: "₹50L+", label: "Monthly US Sales", description: "Generated for clients" },
    { value: "200+", label: "Indian Brands", description: "Selling on Amazon USA" },
    { value: "35%", label: "Profit Margins", description: "Average for US market" },
    { value: "100%", label: "Tax Compliant", description: "Zero penalty record" }
  ];

  const faqs = [
    {
      question: "How can an Indian seller start selling on Amazon USA?",
      answer: "Indian sellers can register on Amazon.com using their Indian business documents including PAN, GST registration, and bank account details. You'll need to provide identity verification, set up international payment methods, and may need US tax IDs for certain categories. We handle the entire registration and setup process for you."
    },
    {
      question: "Do I need a US company or presence to sell on Amazon USA?",
      answer: "No, you don't need a US company to sell on Amazon.com. Indian sellers can register directly using their Indian business entity. However, having a US EIN (Employer Identification Number) is recommended for tax purposes, and we help you obtain this as part of our setup service."
    },
    {
      question: "How does international shipping work for FBA?",
      answer: "We coordinate the entire process: products are shipped from your Indian manufacturer/warehouse to an FBA prep center in the US, where they're inspected, labeled, and sent to Amazon's US fulfillment centers. We manage customs clearance, import duties, and all logistics documentation."
    },
    {
      question: "What are the tax obligations for Indian sellers on Amazon USA?",
      answer: "Indian sellers may have US tax obligations including sales tax collection in states where you have nexus, potential income tax withholding under the India-US tax treaty, and ITIN/EIN registration. We provide complete tax compliance support including registration, filing, and ongoing management."
    },
    {
      question: "How long does it take to start selling on Amazon USA from India?",
      answer: "With our expedited process, you can be selling on Amazon.com within 4-6 weeks. This includes account registration (1-2 weeks), product listing optimization (1 week), FBA shipping setup (2-3 weeks), and launch preparation. The timeline varies based on product category and regulatory requirements."
    },
    {
      question: "What categories work best for Indian sellers on Amazon USA?",
      answer: "Indian sellers typically excel in categories like home décor, textiles & fabrics, jewelry & accessories, organic/ayurvedic products, spices & food items, handicrafts, leather goods, and ethnic wear. We help you identify the best products from your catalog for the US market."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Amazon USA Account Management Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Expert Amazon.com seller account management for Indian sellers. Complete support for international selling including FBA logistics, US tax compliance, brand registry, and marketplace optimization.",
    "areaServed": ["India", "United States"],
    "serviceType": "International E-commerce Account Management"
  };

  return (
    <>
      <SEO
        title="Amazon USA Account Management Services | Sell on Amazon.com from India | Simply Setup"
        description="Expand to Amazon USA with expert account management. Complete support for Indian sellers including FBA prep, international logistics, US tax compliance, and brand registry. Start selling on Amazon.com today!"
        canonicalUrl="https://simplysetup.in/growth/amazon-usa-account-management"
      />

      <Navbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-orange-50 via-white to-yellow-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  <Globe className="w-3 h-3 mr-1" /> Amazon USA Growth Partner
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Expand to Amazon USA with Expert{" "}
                  <span className="text-orange-600">Account Management</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Break into the world's largest e-commerce market. From FBA logistics to US tax compliance, 
                  we handle everything so Indian sellers can thrive on Amazon.com.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-orange-600 hover:bg-orange-700" data-testid="button-get-free-audit">
                        Get Free US Market Assessment
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free Amazon USA Market Assessment</DialogTitle>
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
                    <p className="text-sm font-semibold text-gray-900">200+ Indian Brands on Amazon USA</p>
                    <p className="text-xs text-gray-500">Successfully selling across the US</p>
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
          <div className="max-w-xs sm:max-w-lg md:max-w-md mx-auto px-4">
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
                Challenges of Selling on Amazon USA from India
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common hurdles faced by Indian sellers expanding to the US market that we solve every day
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
                <h3 className="text-3xl font-bold text-gray-900">Start Your US Expansion Today</h3>
                <p className="text-gray-600 text-lg">
                  Let our team of international selling specialists guide you to success on Amazon.com.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free US market assessment worth $200</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Product viability analysis for US market</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Complete compliance roadmap</span>
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
                Complete Amazon USA Account Management Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to successfully sell on Amazon.com from India
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
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Specialized Services for Amazon USA
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Deep-dive into our specialized offerings designed for the US marketplace
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/growth/amazon-usa-account-management/market-entry">
                <Card className="bg-white hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full border-2 hover:border-blue-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-7 h-7 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Market Entry</h3>
                    <p className="text-sm text-gray-600">Strategic entry into the US market with compliance and setup support</p>
                    <div className="mt-4 text-blue-600 text-sm font-medium flex items-center justify-center gap-1">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/amazon-usa-account-management/localized-content">
                <Card className="bg-white hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full border-2 hover:border-blue-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-7 h-7 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Localized Content</h3>
                    <p className="text-sm text-gray-600">US-optimized product listings and culturally adapted content</p>
                    <div className="mt-4 text-blue-600 text-sm font-medium flex items-center justify-center gap-1">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/amazon-usa-account-management/cross-border-logistics">
                <Card className="bg-white hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full border-2 hover:border-blue-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Truck className="w-7 h-7 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Cross-border Logistics</h3>
                    <p className="text-sm text-gray-600">FBA prep, international shipping, and inventory management</p>
                    <div className="mt-4 text-blue-600 text-sm font-medium flex items-center justify-center gap-1">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/amazon-usa-account-management/regional-ads">
                <Card className="bg-white hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full border-2 hover:border-blue-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-7 h-7 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Regional Ads</h3>
                    <p className="text-sm text-gray-600">PPC campaigns optimized for US consumers and market trends</p>
                    <div className="mt-4 text-blue-600 text-sm font-medium flex items-center justify-center gap-1">
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
                Your Journey to Amazon USA Success
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our proven 4-step process for international expansion
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
                Everything you need to know about selling on Amazon USA from India
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
              Ready to Expand to Amazon USA?
            </h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Get a free market assessment and discover your potential in the world's largest e-commerce market
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50" data-testid="button-cta-free-audit">
                  Get Your Free Assessment Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Free Amazon USA Market Assessment</DialogTitle>
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
                Speak with Our International Selling Experts
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our dedicated team is ready to help you succeed on Amazon USA
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
