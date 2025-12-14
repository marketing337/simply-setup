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
  Sparkles,
  Palette,
  Tag,
  UserPlus,
  Layout,
  Megaphone,
  RotateCcw
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

export default function AjioAccountManagementPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Palette className="w-6 h-6 text-red-500" />,
      problem: "Poor Catalog Quality",
      solution: "Professional product photography guidelines and catalog enhancement for fashion appeal"
    },
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Weak Brand Positioning",
      solution: "Strategic brand storytelling and premium positioning on Ajio's fashion platform"
    },
    {
      icon: <Tag className="w-6 h-6 text-red-500" />,
      problem: "Uncompetitive Pricing",
      solution: "Dynamic pricing strategies aligned with Ajio's fashion-forward customer expectations"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Time-Consuming Operations",
      solution: "End-to-end account management so you can focus on design and sourcing"
    }
  ];

  const services = [
    {
      icon: <Image className="w-8 h-8 text-teal-600" />,
      title: "Catalog Optimization",
      description: "Create stunning product catalogs that showcase your fashion products beautifully",
      features: ["Fashion-focused product descriptions", "Size guide optimization", "Trend-aligned keywords"]
    },
    {
      icon: <Sparkles className="w-8 h-8 text-cyan-600" />,
      title: "Brand Storytelling",
      description: "Build a compelling brand narrative that resonates with Ajio's fashion-conscious audience",
      features: ["Brand page design", "Collection storytelling", "Lifestyle imagery curation"]
    },
    {
      icon: <Tag className="w-8 h-8 text-purple-600" />,
      title: "Pricing Strategy",
      description: "Optimize pricing to balance competitiveness with profitability",
      features: ["Competitive analysis", "Seasonal pricing tactics", "Sale event optimization"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Account Health Management",
      description: "Keep your seller account in excellent standing",
      features: ["Policy compliance monitoring", "Performance metrics tracking", "Issue resolution support"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
      title: "Inventory Management",
      description: "Optimize stock levels for fashion's seasonal demands",
      features: ["Trend-based forecasting", "Size-wise inventory planning", "Return rate optimization"]
    },
    {
      icon: <Headphones className="w-8 h-8 text-pink-600" />,
      title: "Customer Engagement",
      description: "Build lasting relationships with fashion-savvy customers",
      features: ["Review management", "Customer query handling", "Repeat purchase strategies"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Account Audit",
      description: "Comprehensive analysis of your Ajio catalog, brand presence, and growth opportunities",
      icon: <Search className="w-6 h-6 text-teal-600" />
    },
    {
      step: "2", 
      title: "Strategy Development",
      description: "Custom growth plan tailored to your fashion brand, target audience, and competition",
      icon: <FileText className="w-6 h-6 text-teal-600" />
    },
    {
      step: "3",
      title: "Implementation",
      description: "Execute catalog enhancements, pricing strategies, and brand positioning",
      icon: <Settings className="w-6 h-6 text-teal-600" />
    },
    {
      step: "4",
      title: "Monitor & Scale",
      description: "Continuous optimization with weekly reports and seasonal strategy updates",
      icon: <TrendingUp className="w-6 h-6 text-teal-600" />
    }
  ];

  const successMetrics = [
    { value: "250%", label: "Average Sales Growth", description: "Within first 6 months" },
    { value: "40%", label: "Improved Visibility", description: "In search rankings" },
    { value: "300+", label: "Fashion Brands Managed", description: "Across India" },
    { value: "24/7", label: "Account Monitoring", description: "Real-time alerts" }
  ];

  const faqs = [
    {
      question: "How long does it take to see results from Ajio account management?",
      answer: "Most fashion sellers see measurable improvements within 30-60 days. Catalog optimizations and brand positioning show results quickly, while organic visibility and sales growth typically take 2-3 months to fully materialize."
    },
    {
      question: "Do you help with Ajio seller registration?",
      answer: "Yes, we assist with new seller account registration on Ajio, including documentation, brand verification, and initial catalog setup to ensure you launch successfully on India's leading fashion marketplace."
    },
    {
      question: "Can you help improve my catalog quality on Ajio?",
      answer: "Absolutely! Catalog quality is crucial for fashion sales. We help with product photography guidelines, compelling descriptions, size guides, trend-aligned keywords, and lifestyle imagery to showcase your products beautifully."
    },
    {
      question: "How do you handle Ajio's seasonal sales and promotions?",
      answer: "We plan and optimize for all major Ajio sales including Big Bold Sale, End of Season Sale, and festival promotions. Our team ensures your inventory, pricing, and visibility are optimized for maximum sales during peak periods."
    },
    {
      question: "What categories do you specialize in on Ajio?",
      answer: "We manage sellers across all Ajio categories including women's fashion, men's fashion, kids' wear, footwear, accessories, and beauty products. Our strategies are customized based on your specific category and target audience."
    },
    {
      question: "What reports and analytics do you provide?",
      answer: "We provide comprehensive reports including sales performance, catalog health, search visibility, competitor analysis, return rate insights, and customer feedback trends on a weekly or monthly basis depending on your plan."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Ajio Account Management Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Ajio seller account management services including catalog optimization, brand positioning, pricing strategy, and account health management for fashion sellers.",
    "areaServed": "India",
    "serviceType": "E-commerce Account Management"
  };

  return (
    <>
      <SEO
        title="Ajio Account Management Services | Grow Your Ajio Business | Simply Setup"
        description="Expert Ajio seller account management services in India. Boost sales with catalog optimization, brand storytelling, pricing strategy, and dedicated account support. Get a free audit today!"
        canonicalUrl="https://simplysetup.in/growth/ajio-account-management"
      />

      <Navbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100">
                  <ShoppingCart className="w-3 h-3 mr-1" /> Ajio Growth Partner
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Scale Your Ajio Business with Expert{" "}
                  <span className="text-teal-600">Account Management</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  From catalog optimization to brand positioning, we handle everything so you can focus on 
                  creating fashion. Trusted by 300+ Indian fashion sellers to maximize their Ajio potential.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-teal-600 hover:bg-teal-700" data-testid="button-get-free-audit">
                        Get Free Account Audit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free Ajio Account Audit</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-teal-100 border-2 border-white flex items-center justify-center">
                        <Users className="w-5 h-5 text-teal-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">300+ Fashion Sellers Trust Us</p>
                    <p className="text-xs text-gray-500">Average 4.8★ rating from clients</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-8 border">
                  <div className="grid grid-cols-2 gap-6">
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="text-center p-4 bg-teal-50 rounded-xl">
                        <p className="text-3xl font-bold text-teal-600">{metric.value}</p>
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

        {/* Trusted Clients Section */}
        <section className="w-full bg-white py-8 border-t border-b border-gray-200 overflow-hidden">
          <div className="max-w-6xl mx-auto px-5">
            <div className="text-center mb-5">
              <h2 className="text-2xl text-gray-900 font-bold mb-1 leading-tight">
                Trusted by Leading Brands
              </h2>
              <div className="w-20 h-1 bg-teal-600 mx-auto my-3 rounded-sm"></div>
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
                Struggling with Your Ajio Fashion Business?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common challenges faced by Ajio fashion sellers that we solve every day
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {painPoints.map((point, index) => (
                <Card key={index} className="border-2 hover:border-teal-200 transition-colors">
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
                <h3 className="text-3xl font-bold text-gray-900">Get Expert Help Today</h3>
                <p className="text-gray-600 text-lg">
                  Let our team of Ajio fashion specialists solve your challenges and accelerate your growth.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free account audit worth ₹5,000</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Personalized fashion growth strategy</span>
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
                Complete Ajio Account Management Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                End-to-end solutions to grow your fashion business on Ajio
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
        <section className="py-16 bg-gradient-to-br from-teal-50 via-white to-cyan-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Specialized Ajio Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Deep-dive into our specialized services designed specifically for Ajio sellers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/growth/ajio-account-management/brand-onboarding">
                <Card className="bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-teal-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <UserPlus className="w-8 h-8 text-teal-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Brand Onboarding</h3>
                    <p className="text-sm text-gray-600 mb-4">Complete brand setup and registration on Ajio with expert guidance</p>
                    <span className="text-teal-600 text-sm font-medium flex items-center justify-center gap-1">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/ajio-account-management/visual-merchandising">
                <Card className="bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-teal-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Layout className="w-8 h-8 text-cyan-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Visual Merchandising</h3>
                    <p className="text-sm text-gray-600 mb-4">Stunning product displays and catalog optimization for higher conversions</p>
                    <span className="text-cyan-600 text-sm font-medium flex items-center justify-center gap-1">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/ajio-account-management/campaigns">
                <Card className="bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-teal-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Megaphone className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Campaigns</h3>
                    <p className="text-sm text-gray-600 mb-4">Strategic ad campaigns and promotional activities for maximum visibility</p>
                    <span className="text-purple-600 text-sm font-medium flex items-center justify-center gap-1">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/ajio-account-management/returns-management">
                <Card className="bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-teal-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <RotateCcw className="w-8 h-8 text-teal-700" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Returns Management</h3>
                    <p className="text-sm text-gray-600 mb-4">Reduce return rates and optimize your reverse logistics efficiently</p>
                    <span className="text-teal-700 text-sm font-medium flex items-center justify-center gap-1">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
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
                How We Grow Your Ajio Business
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our proven 4-step process for Ajio success
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="absolute top-8 left-1/2 w-full h-0.5 bg-teal-200 -z-10 hidden md:block" 
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
                Everything you need to know about our Ajio management services
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
        <section className="py-16 bg-teal-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Scale Your Ajio Fashion Business?
            </h2>
            <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
              Get a free account audit and discover untapped opportunities to grow your fashion sales
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-teal-600 hover:bg-teal-50" data-testid="button-cta-free-audit">
                  Get Your Free Audit Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Free Ajio Account Audit</DialogTitle>
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
                Speak with Our Ajio Experts
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our dedicated team is ready to help you succeed on Ajio
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
