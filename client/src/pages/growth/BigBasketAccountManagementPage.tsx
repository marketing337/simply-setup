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
  Calendar,
  Thermometer,
  AlertTriangle
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

export default function BigBasketAccountManagementPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Calendar className="w-6 h-6 text-red-500" />,
      problem: "Perishable Inventory Challenges",
      solution: "Smart expiry tracking and FIFO management to minimize wastage and maximize freshness"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-red-500" />,
      problem: "Inaccurate Demand Forecasting",
      solution: "AI-driven demand prediction to optimize stock levels and prevent stockouts"
    },
    {
      icon: <IndianRupee className="w-6 h-6 text-red-500" />,
      problem: "Competitive Pricing Pressure",
      solution: "Dynamic pricing strategies to stay competitive while maintaining healthy margins"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Complex Operations Management",
      solution: "End-to-end account management so you can focus on sourcing and quality"
    }
  ];

  const services = [
    {
      icon: <Package className="w-8 h-8 text-green-600" />,
      title: "Catalog Management",
      description: "Optimize your grocery product listings for maximum visibility and sales",
      features: ["Product title & description optimization", "Category mapping & attributes", "Image quality enhancement"]
    },
    {
      icon: <Calendar className="w-8 h-8 text-lime-600" />,
      title: "Expiry & Freshness Tracking",
      description: "Never lose products to expiry with our smart tracking system",
      features: ["Batch-wise expiry monitoring", "FIFO inventory management", "Expiry alert notifications"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-emerald-600" />,
      title: "Inventory Optimization",
      description: "Right stock, right time - eliminate stockouts and overstocking",
      features: ["Demand forecasting", "Reorder point alerts", "Seasonal planning support"]
    },
    {
      icon: <IndianRupee className="w-8 h-8 text-green-700" />,
      title: "Pricing Strategy",
      description: "Stay competitive while protecting your margins",
      features: ["Competitor price monitoring", "Dynamic pricing recommendations", "Promotional campaign planning"]
    },
    {
      icon: <Shield className="w-8 h-8 text-teal-600" />,
      title: "Account Health Management",
      description: "Keep your seller account in top condition",
      features: ["Policy compliance monitoring", "Performance metrics tracking", "Issue resolution support"]
    },
    {
      icon: <Headphones className="w-8 h-8 text-green-500" />,
      title: "Customer Service Excellence",
      description: "Build trust with excellent customer ratings",
      features: ["Review management", "Customer query handling", "Delivery issue resolution"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Account Audit",
      description: "Comprehensive analysis of your BigBasket seller account and product portfolio",
      icon: <Search className="w-6 h-6 text-green-600" />
    },
    {
      step: "2", 
      title: "Strategy Development",
      description: "Custom growth plan for your grocery/FMCG products based on category trends",
      icon: <FileText className="w-6 h-6 text-green-600" />
    },
    {
      step: "3",
      title: "Implementation",
      description: "Execute optimization across catalog, inventory, pricing, and operations",
      icon: <Settings className="w-6 h-6 text-green-600" />
    },
    {
      step: "4",
      title: "Monitor & Scale",
      description: "Continuous optimization with daily monitoring and weekly performance reports",
      icon: <TrendingUp className="w-6 h-6 text-green-600" />
    }
  ];

  const successMetrics = [
    { value: "250%", label: "Average Sales Increase", description: "Within first 6 months" },
    { value: "35%", label: "Reduced Wastage", description: "Through expiry management" },
    { value: "300+", label: "FMCG Brands Managed", description: "Across India" },
    { value: "99%", label: "Stock Accuracy", description: "Inventory optimization" }
  ];

  const faqs = [
    {
      question: "How do you help manage perishable inventory on BigBasket?",
      answer: "We implement comprehensive expiry tracking with batch-wise monitoring, FIFO inventory management, and automated alerts for products nearing expiry. This helps minimize wastage and ensures customers always receive fresh products."
    },
    {
      question: "Can you help with BigBasket seller registration?",
      answer: "Yes! We assist with complete BigBasket seller onboarding including documentation, FSSAI license verification, GST registration, and initial catalog setup to ensure you start selling quickly."
    },
    {
      question: "How do you handle demand forecasting for grocery products?",
      answer: "We use historical sales data, seasonal trends, and festival calendars to predict demand accurately. This helps optimize inventory levels, reduce stockouts during peak periods, and minimize excess inventory."
    },
    {
      question: "What categories do you specialize in on BigBasket?",
      answer: "We manage sellers across all BigBasket categories including staples, fresh fruits & vegetables, dairy, beverages, packaged foods, personal care, household items, and baby care products."
    },
    {
      question: "How do you ensure competitive pricing without hurting margins?",
      answer: "We monitor competitor prices daily, analyze market trends, and recommend optimal pricing strategies. We focus on value positioning, bundle offers, and promotional timing to maintain healthy margins while staying competitive."
    },
    {
      question: "What reports do you provide for BigBasket sellers?",
      answer: "We provide comprehensive reports including sales analytics, inventory health, expiry tracking, category performance, customer feedback analysis, and competitive positioning on a weekly or daily basis depending on your plan."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "BigBasket Account Management Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional BigBasket seller account management services including catalog optimization, expiry tracking, inventory management, and pricing strategy for grocery and FMCG sellers.",
    "areaServed": "India",
    "serviceType": "E-commerce Account Management"
  };

  return (
    <>
      <SEO
        title="BigBasket Account Management Services | Grow Your BigBasket Business | Simply Setup"
        description="Expert BigBasket seller account management services in India. Boost sales with catalog optimization, expiry tracking, inventory management, and dedicated support. Get a free audit today!"
        canonicalUrl="https://simplysetup.in/growth/bigbasket-account-management"
      />

      <Navbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-50 via-white to-lime-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  <ShoppingCart className="w-3 h-3 mr-1" /> BigBasket Growth Partner
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Scale Your BigBasket Business with Expert{" "}
                  <span className="text-green-600">Account Management</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  From catalog optimization to expiry management, we handle everything so you can focus on 
                  sourcing quality products. Trusted by 300+ grocery and FMCG sellers across India.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-green-600 hover:bg-green-700" data-testid="button-get-free-audit">
                        Get Free Account Audit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free BigBasket Account Audit</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-green-100 border-2 border-white flex items-center justify-center">
                        <Users className="w-5 h-5 text-green-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">300+ FMCG Sellers Trust Us</p>
                    <p className="text-xs text-gray-500">Average 4.8★ rating from clients</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-8 border">
                  <div className="grid grid-cols-2 gap-6">
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="text-center p-4 bg-green-50 rounded-xl">
                        <p className="text-3xl font-bold text-green-600">{metric.value}</p>
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
              <div className="w-20 h-1 bg-green-600 mx-auto my-3 rounded-sm"></div>
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
                Struggling with Your BigBasket Business?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common challenges faced by grocery and FMCG sellers that we solve every day
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {painPoints.map((point, index) => (
                <Card key={index} className="border-2 hover:border-green-200 transition-colors">
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
                  Let our team of grocery marketplace specialists solve your challenges and accelerate your growth.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free account audit worth ₹5,000</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Personalized growth strategy</span>
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
                Complete BigBasket Account Management Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                End-to-end solutions to grow your grocery business on BigBasket
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
        <section className="py-16 bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Specialized BigBasket Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Deep expertise in key areas to maximize your grocery and FMCG success
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/growth/bigbasket-account-management/express-listing">
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-green-300" data-testid="card-bigbasket-express-listing">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-7 h-7 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Express Listing</h3>
                    <p className="text-sm text-gray-600">Fast-track product listings with optimized titles, descriptions, and category mapping</p>
                    <div className="mt-4 flex items-center justify-center text-green-600 font-medium text-sm">
                      Learn More <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/bigbasket-account-management/inventory-forecasting">
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-lime-300" data-testid="card-bigbasket-inventory-forecasting">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-7 h-7 text-lime-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Inventory Forecasting</h3>
                    <p className="text-sm text-gray-600">AI-driven demand prediction and FIFO management for perishable goods</p>
                    <div className="mt-4 flex items-center justify-center text-lime-600 font-medium text-sm">
                      Learn More <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/bigbasket-account-management/hyperlocal-promotions">
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-emerald-300" data-testid="card-bigbasket-hyperlocal-promotions">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-7 h-7 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Hyperlocal Promotions</h3>
                    <p className="text-sm text-gray-600">Location-based campaigns and flash deals to boost local visibility</p>
                    <div className="mt-4 flex items-center justify-center text-emerald-600 font-medium text-sm">
                      Learn More <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/bigbasket-account-management/sla-monitoring">
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-teal-300" data-testid="card-bigbasket-sla-monitoring">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-7 h-7 text-teal-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">SLA Monitoring</h3>
                    <p className="text-sm text-gray-600">Real-time performance tracking and compliance to maintain seller ratings</p>
                    <div className="mt-4 flex items-center justify-center text-teal-600 font-medium text-sm">
                      Learn More <ArrowRight className="w-4 h-4 ml-1" />
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
                How We Grow Your BigBasket Business
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our proven 4-step process for grocery marketplace success
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="absolute top-8 left-1/2 w-full h-0.5 bg-green-200 -z-10 hidden md:block" 
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
                Everything you need to know about our BigBasket management services
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
        <section className="py-16 bg-green-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Scale Your BigBasket Business?
            </h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Get a free account audit and discover untapped opportunities to grow your grocery sales
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-green-50" data-testid="button-cta-free-audit">
                  Get Your Free Audit Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Free BigBasket Account Audit</DialogTitle>
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
                Speak with Our Grocery Marketplace Experts
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our dedicated team is ready to help you succeed on BigBasket
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
