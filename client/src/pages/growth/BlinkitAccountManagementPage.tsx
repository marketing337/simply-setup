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
  Zap,
  Shield, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Building, 
  Globe, 
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
  RefreshCw,
  AlertTriangle,
  Truck,
  Calendar
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

export default function BlinkitAccountManagementPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <RefreshCw className="w-6 h-6 text-red-500" />,
      problem: "Inventory Sync Issues",
      solution: "Real-time inventory management to prevent stock discrepancies across channels"
    },
    {
      icon: <Truck className="w-6 h-6 text-red-500" />,
      problem: "Fast Delivery Pressure",
      solution: "Optimized fulfillment strategies to meet 10-minute delivery requirements"
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      problem: "Frequent Stock-Outs",
      solution: "Demand forecasting and automated replenishment to maintain stock availability"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Peak Hour Management",
      solution: "Strategic inventory positioning for high-demand time slots"
    }
  ];

  const services = [
    {
      icon: <Package className="w-8 h-8 text-yellow-600" />,
      title: "Catalog Management",
      description: "Optimize your product catalog for quick commerce success",
      features: ["Product listing optimization", "SKU management & mapping", "Category placement strategy"]
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-blue-600" />,
      title: "Inventory Optimization",
      description: "Never miss a sale with smart inventory management",
      features: ["Real-time stock sync", "Multi-dark store management", "Automated reorder alerts"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
      title: "Demand Forecasting",
      description: "Predict demand patterns to stay ahead of competition",
      features: ["AI-powered demand prediction", "Seasonal trend analysis", "Peak hour planning"]
    },
    {
      icon: <IndianRupee className="w-8 h-8 text-green-600" />,
      title: "Pricing Strategy",
      description: "Competitive pricing that maximizes margins",
      features: ["Dynamic pricing optimization", "Competitor price monitoring", "Margin analysis & reporting"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
      title: "Visibility & Promotions",
      description: "Get discovered by more customers in your locality",
      features: ["Sponsored product campaigns", "Flash sale management", "Banner & visibility optimization"]
    },
    {
      icon: <Headphones className="w-8 h-8 text-pink-600" />,
      title: "Operations Support",
      description: "End-to-end operational excellence",
      features: ["Order fulfillment tracking", "Returns management", "Performance reporting"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Account Assessment",
      description: "Comprehensive review of your Blinkit store performance and inventory health",
      icon: <Search className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "2", 
      title: "Quick Commerce Strategy",
      description: "Custom growth plan focused on quick delivery metrics and local demand patterns",
      icon: <FileText className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "3",
      title: "Optimization Rollout",
      description: "Implement inventory sync, catalog updates, and visibility improvements",
      icon: <Settings className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "4",
      title: "Scale & Expand",
      description: "Continuous optimization with expansion to new dark stores and categories",
      icon: <TrendingUp className="w-6 h-6 text-yellow-600" />
    }
  ];

  const successMetrics = [
    { value: "250%", label: "Average Order Increase", description: "Within first 3 months" },
    { value: "95%", label: "Stock Availability", description: "Maintained consistently" },
    { value: "200+", label: "Brands Managed", description: "On Blinkit platform" },
    { value: "50+", label: "Cities Covered", description: "Pan-India presence" }
  ];

  const faqs = [
    {
      question: "How do you handle the 10-minute delivery requirement on Blinkit?",
      answer: "We optimize your inventory placement across dark stores based on demand patterns. Our real-time sync ensures stock is always available at the nearest fulfillment center, and we help you maintain buffer stock during peak hours to meet the quick delivery promise."
    },
    {
      question: "Can you help with stock-out prevention?",
      answer: "Absolutely! We use AI-powered demand forecasting to predict sales patterns and set up automated reorder points. Our system monitors stock levels 24/7 and alerts you before inventory runs low, significantly reducing stock-outs."
    },
    {
      question: "Do you manage multiple dark store locations?",
      answer: "Yes, we manage inventory across all your dark store locations. We optimize stock allocation based on locality-wise demand, ensuring each store has the right products in the right quantities."
    },
    {
      question: "How quickly can I see results on Blinkit?",
      answer: "Quick commerce moves fast! Most sellers see improved visibility within 2-3 weeks. Stock availability improvements are immediate once our inventory system is set up. Significant order volume increases typically happen within 4-6 weeks."
    },
    {
      question: "Can you help with Blinkit seller registration?",
      answer: "Yes, we assist with complete onboarding including documentation, GST verification, product catalog setup, and dark store mapping. We ensure your account is fully optimized from day one."
    },
    {
      question: "How do you handle peak hour demand spikes?",
      answer: "We analyze your historical data to identify peak demand windows (typically morning breakfast hours, lunch, evening snacks, and dinner time). We ensure adequate inventory positioning and help you run targeted promotions during these high-traffic periods."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Blinkit Account Management Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Blinkit seller account management services including catalog management, inventory optimization, demand forecasting, and quick commerce strategy.",
    "areaServed": "India",
    "serviceType": "Quick Commerce Account Management"
  };

  return (
    <>
      <SEO
        title="Blinkit Account Management Services | Grow Your Blinkit Business | Simply Setup"
        description="Expert Blinkit seller account management services in India. Boost sales with catalog optimization, inventory management, demand forecasting, and quick commerce strategy. Get a free consultation today!"
        canonicalUrl="https://simplysetup.in/growth/blinkit-account-management"
      />

      <Navbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-yellow-50 via-white to-amber-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                  <Zap className="w-3 h-3 mr-1" /> Blinkit Growth Partner
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Scale Your Blinkit Business with Expert{" "}
                  <span className="text-yellow-600">Account Management</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  From inventory optimization to demand forecasting, we handle everything so you can 
                  thrive in quick commerce. Trusted by 200+ Indian brands to maximize their Blinkit potential.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700" data-testid="button-get-free-consultation">
                        Get Free Consultation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free Blinkit Account Consultation</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-yellow-100 border-2 border-white flex items-center justify-center">
                        <Users className="w-5 h-5 text-yellow-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">200+ Brands Trust Us</p>
                    <p className="text-xs text-gray-500">Average 4.8★ rating from clients</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-8 border">
                  <div className="grid grid-cols-2 gap-6">
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="text-center p-4 bg-yellow-50 rounded-xl">
                        <p className="text-3xl font-bold text-yellow-600">{metric.value}</p>
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
              <div className="w-20 h-1 bg-yellow-600 mx-auto my-3 rounded-sm"></div>
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
                Struggling with Quick Commerce Challenges?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common challenges faced by Blinkit sellers that we solve every day
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {painPoints.map((point, index) => (
                <Card key={index} className="border-2 hover:border-yellow-200 transition-colors">
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
                    <span className="text-gray-700">Free account consultation worth ₹5,000</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Personalized quick commerce strategy</span>
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
                Complete Blinkit Account Management Services
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
        <section className="py-16 bg-gradient-to-br from-yellow-50 to-amber-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Specialized Services for Blinkit Sellers
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Deep-dive into our specialized quick commerce solutions designed specifically for Blinkit success
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/growth/blinkit-account-management/express-listing">
                <Card className="bg-white hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-yellow-400 h-full" data-testid="card-express-listing">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors">
                      <Zap className="w-7 h-7 text-yellow-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">Express Listing</h3>
                    <p className="text-sm text-gray-600">Fast-track your products to go live on Blinkit with optimized listings</p>
                    <div className="mt-4 flex items-center justify-center text-yellow-600 text-sm font-medium">
                      Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/blinkit-account-management/inventory-forecasting">
                <Card className="bg-white hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-yellow-400 h-full" data-testid="card-inventory-forecasting">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors">
                      <BarChart3 className="w-7 h-7 text-yellow-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">Inventory Forecasting</h3>
                    <p className="text-sm text-gray-600">AI-powered demand prediction to optimize stock levels across dark stores</p>
                    <div className="mt-4 flex items-center justify-center text-yellow-600 text-sm font-medium">
                      Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/blinkit-account-management/hyperlocal-promotions">
                <Card className="bg-white hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-yellow-400 h-full" data-testid="card-hyperlocal-promotions">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors">
                      <Target className="w-7 h-7 text-yellow-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">Hyperlocal Promotions</h3>
                    <p className="text-sm text-gray-600">Location-based promotional strategies to boost visibility and sales</p>
                    <div className="mt-4 flex items-center justify-center text-yellow-600 text-sm font-medium">
                      Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/blinkit-account-management/sla-monitoring">
                <Card className="bg-white hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-yellow-400 h-full" data-testid="card-sla-monitoring">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors">
                      <Clock className="w-7 h-7 text-yellow-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">SLA Monitoring</h3>
                    <p className="text-sm text-gray-600">Real-time tracking and alerts to maintain delivery SLA compliance</p>
                    <div className="mt-4 flex items-center justify-center text-yellow-600 text-sm font-medium">
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
                How We Grow Your Blinkit Business
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our proven 4-step process for quick commerce success
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="absolute top-8 left-1/2 w-full h-0.5 bg-yellow-200 -z-10 hidden md:block" 
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
                Everything you need to know about our Blinkit management services
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
        <section className="py-16 bg-yellow-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Scale Your Blinkit Business?
            </h2>
            <p className="text-yellow-100 mb-8 max-w-2xl mx-auto">
              Get a free consultation and discover untapped opportunities in quick commerce
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-yellow-600 hover:bg-yellow-50" data-testid="button-cta-free-consultation">
                  Get Your Free Consultation Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Free Blinkit Account Consultation</DialogTitle>
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
                Our dedicated team is ready to help you succeed on Blinkit
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
