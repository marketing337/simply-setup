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
  Plane,
  Receipt
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

export default function AmazonUAEAccountManagementPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Languages className="w-6 h-6 text-red-500" />,
      problem: "Arabic Localization Challenges",
      solution: "Expert Arabic translation and cultural adaptation for Middle East buyers"
    },
    {
      icon: <Plane className="w-6 h-6 text-red-500" />,
      problem: "Complex International Shipping",
      solution: "Streamlined FBA UAE setup and cross-border logistics management"
    },
    {
      icon: <Receipt className="w-6 h-6 text-red-500" />,
      problem: "UAE VAT Compliance",
      solution: "Complete VAT registration and filing support for Amazon.ae sellers"
    },
    {
      icon: <Globe className="w-6 h-6 text-red-500" />,
      problem: "Understanding UAE Consumer Preferences",
      solution: "Market research and product positioning for Middle Eastern customers"
    }
  ];

  const services = [
    {
      icon: <Languages className="w-8 h-8 text-orange-600" />,
      title: "Arabic Localization",
      description: "Professional Arabic content that resonates with UAE and GCC buyers",
      features: ["Native Arabic translations", "Cultural adaptation of listings", "Arabic keyword optimization"]
    },
    {
      icon: <Package className="w-8 h-8 text-blue-600" />,
      title: "FBA UAE Setup & Management",
      description: "Complete Fulfillment by Amazon setup for the UAE marketplace",
      features: ["FBA enrollment assistance", "Inventory shipment planning", "UAE warehouse optimization"]
    },
    {
      icon: <Receipt className="w-8 h-8 text-green-600" />,
      title: "UAE VAT Compliance",
      description: "End-to-end VAT registration and compliance for Amazon.ae",
      features: ["UAE VAT registration", "VAT return filing", "Tax documentation support"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
      title: "Amazon.ae PPC Management",
      description: "Targeted advertising campaigns for the UAE market",
      features: ["Arabic & English campaigns", "Regional targeting optimization", "ROAS-focused strategies"]
    },
    {
      icon: <Image className="w-8 h-8 text-indigo-600" />,
      title: "Middle East Brand Content",
      description: "A+ content and brand stores optimized for UAE customers",
      features: ["Bilingual A+ content", "UAE-focused brand store", "Regional lifestyle imagery"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-pink-600" />,
      title: "UAE Market Strategy",
      description: "Pricing and positioning strategies for the Middle East market",
      features: ["Competitive pricing analysis", "Currency & margin optimization", "Seasonal strategy (Ramadan, Eid)"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "UAE Market Assessment",
      description: "Evaluate your products' potential in the UAE/GCC market and competition analysis",
      icon: <Search className="w-6 h-6 text-orange-600" />
    },
    {
      step: "2", 
      title: "Account & VAT Setup",
      description: "Complete Amazon.ae seller registration, VAT enrollment, and FBA configuration",
      icon: <FileText className="w-6 h-6 text-orange-600" />
    },
    {
      step: "3",
      title: "Localization & Launch",
      description: "Arabic translations, optimized listings, and strategic product launch in UAE",
      icon: <Settings className="w-6 h-6 text-orange-600" />
    },
    {
      step: "4",
      title: "Growth & Expansion",
      description: "Scale across UAE, Saudi Arabia, and other GCC markets with data-driven strategies",
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />
    }
  ];

  const successMetrics = [
    { value: "250%", label: "Average Sales Growth", description: "First year in UAE" },
    { value: "40%", label: "Lower Advertising Cost", description: "Optimized campaigns" },
    { value: "200+", label: "Indian Brands", description: "Launched in UAE" },
    { value: "100%", label: "VAT Compliant", description: "Filing accuracy" }
  ];

  const faqs = [
    {
      question: "Can Indian sellers sell on Amazon UAE (Amazon.ae)?",
      answer: "Yes, Indian sellers can register and sell on Amazon.ae. You'll need valid GST registration, international bank account or payment service, and products suitable for the UAE market. We assist with complete account setup and market entry."
    },
    {
      question: "Do I need UAE VAT registration to sell on Amazon.ae?",
      answer: "Yes, if you store inventory in UAE (FBA) or exceed the VAT threshold, you need UAE VAT registration. We handle the complete VAT registration process and ongoing compliance, including quarterly returns."
    },
    {
      question: "How does FBA work for Amazon UAE from India?",
      answer: "You can ship your products to Amazon's UAE fulfillment centers. Amazon then handles storage, packing, and delivery to customers across UAE and other GCC countries. We help with shipment planning, customs documentation, and inventory management."
    },
    {
      question: "Is Arabic translation mandatory for Amazon.ae listings?",
      answer: "While not mandatory, Arabic listings significantly improve visibility and conversions in the UAE market. We provide professional Arabic translations that are culturally adapted for Middle Eastern buyers."
    },
    {
      question: "What products sell well on Amazon UAE?",
      answer: "Popular categories include electronics, fashion, beauty products, home goods, and Indian ethnic products. We conduct detailed market research to identify opportunities for your specific products in the UAE market."
    },
    {
      question: "How long does it take to start selling on Amazon.ae from India?",
      answer: "Account setup typically takes 2-4 weeks. With FBA, you can start selling within 4-6 weeks including shipping time. We expedite the process with proper documentation and compliance handling."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Amazon UAE Account Management Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Amazon UAE (Amazon.ae) account management services for Indian sellers. Arabic localization, VAT compliance, FBA setup, and growth strategies for the Middle East market.",
    "areaServed": ["India", "UAE", "Middle East"],
    "serviceType": "International E-commerce Account Management"
  };

  return (
    <>
      <SEO
        title="Amazon UAE Account Management Services | Sell on Amazon.ae from India | Simply Setup"
        description="Expert Amazon UAE account management for Indian sellers. We handle Arabic localization, VAT compliance, FBA setup, and PPC campaigns to grow your business on Amazon.ae. Get a free consultation!"
        canonicalUrl="https://simplysetup.in/growth/amazon-uae-account-management"
      />

      <Navbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-orange-50 via-white to-yellow-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  <Globe className="w-3 h-3 mr-1" /> Amazon UAE Growth Partner
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Expand to Amazon UAE with Expert{" "}
                  <span className="text-orange-600">Account Management</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Take your business global! From Arabic localization to VAT compliance, we handle everything 
                  to launch and grow your brand on Amazon.ae. Trusted by 200+ Indian sellers to succeed in the Middle East.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-orange-600 hover:bg-orange-700" data-testid="button-get-free-consultation">
                        Get Free UAE Market Consultation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free Amazon UAE Consultation</DialogTitle>
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
                    <p className="text-sm font-semibold text-gray-900">200+ Indian Sellers in UAE</p>
                    <p className="text-xs text-gray-500">Successfully selling on Amazon.ae</p>
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
                Challenges of Selling on Amazon UAE from India
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common obstacles Indian sellers face when expanding to the Middle East market
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
                <h3 className="text-3xl font-bold text-gray-900">Start Selling in UAE Today</h3>
                <p className="text-gray-600 text-lg">
                  Let our UAE market experts guide you through the complete process of launching on Amazon.ae.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free UAE market assessment</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Complete VAT & compliance guidance</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">No upfront commitment required</span>
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
                Complete Amazon UAE Account Management Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                End-to-end solutions to launch and grow your business on Amazon.ae
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
        <section className="py-16 bg-amber-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Specialized Services for Amazon UAE
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Deep-dive into our specialized offerings designed for the Middle East marketplace
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/growth/amazon-uae-account-management/market-entry">
                <Card className="bg-white hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full border-2 hover:border-amber-400">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-7 h-7 text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Market Entry</h3>
                    <p className="text-sm text-gray-600">Strategic entry into UAE/GCC with VAT and compliance support</p>
                    <div className="mt-4 text-amber-600 text-sm font-medium flex items-center justify-center gap-1">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/amazon-uae-account-management/localized-content">
                <Card className="bg-white hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full border-2 hover:border-amber-400">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Languages className="w-7 h-7 text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Localized Content</h3>
                    <p className="text-sm text-gray-600">Arabic translations and culturally adapted product listings</p>
                    <div className="mt-4 text-amber-600 text-sm font-medium flex items-center justify-center gap-1">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/amazon-uae-account-management/cross-border-logistics">
                <Card className="bg-white hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full border-2 hover:border-amber-400">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plane className="w-7 h-7 text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Cross-border Logistics</h3>
                    <p className="text-sm text-gray-600">FBA UAE setup, international shipping, and fulfillment</p>
                    <div className="mt-4 text-amber-600 text-sm font-medium flex items-center justify-center gap-1">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/amazon-uae-account-management/regional-ads">
                <Card className="bg-white hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full border-2 hover:border-amber-400">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-7 h-7 text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Regional Ads</h3>
                    <p className="text-sm text-gray-600">Arabic & English PPC campaigns for UAE and GCC markets</p>
                    <div className="mt-4 text-amber-600 text-sm font-medium flex items-center justify-center gap-1">
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
                How We Launch Your UAE Business
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our proven 4-step process for Amazon UAE market entry
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
                Everything you need to know about selling on Amazon UAE from India
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
              Ready to Expand to the UAE Market?
            </h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Get a free consultation and discover how to successfully launch your products on Amazon.ae
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50" data-testid="button-cta-free-consultation">
                  Get Your Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Free Amazon UAE Consultation</DialogTitle>
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
                Speak with Our UAE Market Experts
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our dedicated team is ready to help you succeed on Amazon UAE
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
