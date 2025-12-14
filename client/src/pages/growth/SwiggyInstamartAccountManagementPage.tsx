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
  Timer,
  Boxes,
  LineChart
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

export default function SwiggyInstamartAccountManagementPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Timer className="w-6 h-6 text-red-500" />,
      problem: "Slow Order Fulfillment",
      solution: "Optimized inventory placement and real-time stock updates for faster delivery"
    },
    {
      icon: <Boxes className="w-6 h-6 text-red-500" />,
      problem: "Stockout Issues",
      solution: "AI-powered demand forecasting to maintain optimal inventory levels"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-red-500" />,
      problem: "Low Visibility & Sales",
      solution: "Strategic catalog optimization and promotional campaigns to boost orders"
    },
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Pricing Challenges",
      solution: "Dynamic pricing strategies to stay competitive while maintaining margins"
    }
  ];

  const services = [
    {
      icon: <Package className="w-8 h-8 text-orange-600" />,
      title: "Catalog Management",
      description: "Comprehensive product catalog optimization for quick commerce success",
      features: ["SKU setup & management", "Product title & description optimization", "Category mapping & tagging"]
    },
    {
      icon: <Boxes className="w-8 h-8 text-red-500" />,
      title: "Inventory Optimization",
      description: "Keep your dark store shelves stocked with the right products",
      features: ["Real-time stock monitoring", "Multi-location inventory sync", "Automated reorder alerts"]
    },
    {
      icon: <LineChart className="w-8 h-8 text-purple-600" />,
      title: "Demand Forecasting",
      description: "Predict demand patterns to prevent stockouts and overstocking",
      features: ["AI-powered demand prediction", "Seasonal trend analysis", "Hyperlocal demand insights"]
    },
    {
      icon: <IndianRupee className="w-8 h-8 text-green-600" />,
      title: "Pricing Strategy",
      description: "Competitive pricing that maximizes both sales and margins",
      features: ["Dynamic price optimization", "Competitor price tracking", "Promotional pricing management"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
      title: "Growth & Marketing",
      description: "Boost visibility and orders with strategic promotions",
      features: ["Banner & spotlight placements", "Discount campaign management", "Category visibility optimization"]
    },
    {
      icon: <Headphones className="w-8 h-8 text-pink-600" />,
      title: "Account Health & Support",
      description: "Maintain excellent seller ratings and platform compliance",
      features: ["Quality score management", "Delivery SLA monitoring", "Issue resolution support"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Account Analysis",
      description: "Deep dive into your current Instamart performance, catalog health, and growth opportunities",
      icon: <Search className="w-6 h-6 text-orange-600" />
    },
    {
      step: "2", 
      title: "Strategy Blueprint",
      description: "Custom quick commerce strategy covering inventory, pricing, and visibility optimization",
      icon: <FileText className="w-6 h-6 text-orange-600" />
    },
    {
      step: "3",
      title: "Implementation",
      description: "Execute catalog improvements, inventory optimization, and promotional campaigns",
      icon: <Settings className="w-6 h-6 text-orange-600" />
    },
    {
      step: "4",
      title: "Scale & Monitor",
      description: "Continuous optimization with daily monitoring and performance reporting",
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />
    }
  ];

  const successMetrics = [
    { value: "250%", label: "Order Growth", description: "Average increase in 4 months" },
    { value: "35%", label: "Lower Stockouts", description: "Better inventory management" },
    { value: "200+", label: "Brands Managed", description: "Across quick commerce" },
    { value: "15min", label: "Avg Response Time", description: "For critical issues" }
  ];

  const faqs = [
    {
      question: "How quickly can I see results on Swiggy Instamart?",
      answer: "Quick commerce moves fast! Most sellers see noticeable improvements within 2-4 weeks. Catalog optimizations and visibility improvements can show results within days, while inventory and demand optimization typically take 4-6 weeks to fully stabilize."
    },
    {
      question: "Do you help with Swiggy Instamart seller registration?",
      answer: "Yes, we provide complete onboarding support including seller registration, documentation, GST verification, dark store mapping, and initial catalog setup to get you selling on Instamart quickly."
    },
    {
      question: "How do you handle inventory management across multiple dark stores?",
      answer: "We implement centralized inventory management with real-time sync across all your dark store locations. Our system tracks stock levels, automates reorder points, and ensures optimal product availability based on hyperlocal demand patterns."
    },
    {
      question: "Can you help with promotional campaigns on Instamart?",
      answer: "Absolutely! We manage end-to-end promotional campaigns including discount strategies, banner placements, spotlight features, and category-specific promotions to maximize your visibility and order volume."
    },
    {
      question: "What metrics do you track for quick commerce success?",
      answer: "We track key quick commerce KPIs including order fill rate, stockout percentage, delivery SLA compliance, average order value, visibility score, search rankings, promotional ROI, and overall GMV growth."
    },
    {
      question: "How do you handle demand fluctuations and seasonal spikes?",
      answer: "Our AI-powered demand forecasting analyzes historical data, seasonal patterns, weather impacts, and local events to predict demand spikes. We help you prepare inventory in advance and adjust pricing strategies during peak periods."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Swiggy Instamart Account Management Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Swiggy Instamart seller account management services including catalog optimization, inventory management, demand forecasting, and growth strategies for quick commerce success.",
    "areaServed": "India",
    "serviceType": "Quick Commerce Account Management"
  };

  return (
    <>
      <SEO
        title="Swiggy Instamart Account Management Services | Grow Your Instamart Business | Simply Setup"
        description="Expert Swiggy Instamart seller account management services in India. Boost sales with catalog optimization, inventory management, demand forecasting, and dedicated account support. Get a free audit today!"
        canonicalUrl="https://simplysetup.in/growth/swiggy-instamart-account-management"
      />

      <Navbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-orange-50 via-white to-red-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  <Zap className="w-3 h-3 mr-1" /> Swiggy Instamart Growth Partner
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Scale Your Swiggy Instamart Business with Expert{" "}
                  <span className="text-orange-600">Account Management</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  From catalog optimization to demand forecasting, we handle everything so you can focus on 
                  growing your quick commerce business. Trusted by 200+ brands to maximize their Instamart potential.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-orange-600 hover:bg-orange-700" data-testid="button-get-free-audit">
                        Get Free Account Audit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free Swiggy Instamart Account Audit</DialogTitle>
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
                    <p className="text-sm font-semibold text-gray-900">200+ Brands Trust Us</p>
                    <p className="text-xs text-gray-500">Average 4.9★ rating from clients</p>
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
                Struggling with Your Instamart Business?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common challenges faced by quick commerce sellers that we solve every day
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
                <h3 className="text-3xl font-bold text-gray-900">Get Expert Help Today</h3>
                <p className="text-gray-600 text-lg">
                  Let our team of quick commerce specialists solve your challenges and accelerate your growth.
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
                Complete Swiggy Instamart Account Management Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                End-to-end solutions to grow your quick commerce business
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
        <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Specialized Services for Swiggy Instamart Sellers
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Deep-dive into our specialized quick commerce solutions designed specifically for Instamart success
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/growth/swiggy-instamart-account-management/express-listing">
                <Card className="bg-white hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-orange-400 h-full" data-testid="card-express-listing">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                      <Zap className="w-7 h-7 text-orange-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">Express Listing</h3>
                    <p className="text-sm text-gray-600">Fast-track your products to go live on Instamart with optimized listings</p>
                    <div className="mt-4 flex items-center justify-center text-orange-600 text-sm font-medium">
                      Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/swiggy-instamart-account-management/inventory-forecasting">
                <Card className="bg-white hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-orange-400 h-full" data-testid="card-inventory-forecasting">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                      <LineChart className="w-7 h-7 text-orange-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">Inventory Forecasting</h3>
                    <p className="text-sm text-gray-600">AI-powered demand prediction to optimize stock levels across dark stores</p>
                    <div className="mt-4 flex items-center justify-center text-orange-600 text-sm font-medium">
                      Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/swiggy-instamart-account-management/hyperlocal-promotions">
                <Card className="bg-white hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-orange-400 h-full" data-testid="card-hyperlocal-promotions">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                      <Target className="w-7 h-7 text-orange-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">Hyperlocal Promotions</h3>
                    <p className="text-sm text-gray-600">Location-based promotional strategies to boost visibility and sales</p>
                    <div className="mt-4 flex items-center justify-center text-orange-600 text-sm font-medium">
                      Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/swiggy-instamart-account-management/sla-monitoring">
                <Card className="bg-white hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-orange-400 h-full" data-testid="card-sla-monitoring">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                      <Clock className="w-7 h-7 text-orange-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">SLA Monitoring</h3>
                    <p className="text-sm text-gray-600">Real-time tracking and alerts to maintain delivery SLA compliance</p>
                    <div className="mt-4 flex items-center justify-center text-orange-600 text-sm font-medium">
                      Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
                How We Grow Your Instamart Business
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our proven 4-step process for quick commerce success
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
                Everything you need to know about our Swiggy Instamart management services
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
              Ready to Scale Your Instamart Business?
            </h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Get a free account audit and discover untapped opportunities to grow your orders
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50" data-testid="button-cta-free-audit">
                  Get Your Free Audit Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Free Swiggy Instamart Account Audit</DialogTitle>
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
                Speak with Our Quick Commerce Experts
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our dedicated team is ready to help you succeed on Swiggy Instamart
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
