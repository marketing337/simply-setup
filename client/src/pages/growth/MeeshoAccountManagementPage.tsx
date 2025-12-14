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
  Share2,
  Tags,
  Rocket,
  BookOpen,
  UserCheck,
  Truck
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

export default function MeeshoAccountManagementPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Poor Catalog Visibility",
      solution: "Strategic catalog optimization to improve search rankings and reach more resellers"
    },
    {
      icon: <Tags className="w-6 h-6 text-red-500" />,
      problem: "Pricing Challenges for Mass Market",
      solution: "Competitive pricing strategies optimized for Meesho's value-conscious customer base"
    },
    {
      icon: <Share2 className="w-6 h-6 text-red-500" />,
      problem: "Limited Reseller Network Reach",
      solution: "Strategies to maximize product sharing and expand your reseller network"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Order & Return Management",
      solution: "Streamlined operations to reduce returns and improve delivery performance"
    }
  ];

  const services = [
    {
      icon: <Package className="w-8 h-8 text-pink-600" />,
      title: "Catalog Management",
      description: "Create optimized product catalogs that attract resellers and convert to sales",
      features: ["Product title & description optimization", "Category & attribute mapping", "Image quality enhancement"]
    },
    {
      icon: <Tags className="w-8 h-8 text-fuchsia-600" />,
      title: "Pricing Strategy",
      description: "Competitive pricing for mass-market appeal while maintaining healthy margins",
      features: ["Market price analysis", "Margin optimization", "Promotional pricing planning"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
      title: "Inventory Management",
      description: "Optimal stock levels to meet demand without overstocking",
      features: ["Demand forecasting", "Stock replenishment alerts", "Warehouse optimization"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Account Health & Compliance",
      description: "Keep your account in good standing with proactive monitoring",
      features: ["Quality score improvement", "Policy compliance", "Performance tracking"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
      title: "Order Management",
      description: "Efficient order processing to maximize fulfillment rates",
      features: ["Order tracking & dispatch", "Return reduction strategies", "Delivery performance optimization"]
    },
    {
      icon: <Headphones className="w-8 h-8 text-pink-600" />,
      title: "Reseller Engagement",
      description: "Strategies to increase product visibility and reseller adoption",
      features: ["Catalog shareability optimization", "Trend-based product selection", "Customer feedback management"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Account Analysis",
      description: "In-depth review of your Meesho account, catalog performance, and growth opportunities",
      icon: <Search className="w-6 h-6 text-pink-600" />
    },
    {
      step: "2", 
      title: "Strategy Planning",
      description: "Custom growth roadmap for catalog optimization, pricing, and reseller reach",
      icon: <FileText className="w-6 h-6 text-pink-600" />
    },
    {
      step: "3",
      title: "Catalog Optimization",
      description: "Implement improvements across listings, images, pricing, and categories",
      icon: <Settings className="w-6 h-6 text-pink-600" />
    },
    {
      step: "4",
      title: "Scale & Monitor",
      description: "Continuous optimization with regular reporting and strategy adjustments",
      icon: <TrendingUp className="w-6 h-6 text-pink-600" />
    }
  ];

  const successMetrics = [
    { value: "250%", label: "Average Sales Growth", description: "Within first 6 months" },
    { value: "40%", label: "Return Rate Reduction", description: "Through quality optimization" },
    { value: "300+", label: "Meesho Sellers Managed", description: "Across India" },
    { value: "5L+", label: "Products Optimized", description: "Catalog listings enhanced" }
  ];

  const faqs = [
    {
      question: "How long does it take to see results on Meesho?",
      answer: "Most sellers notice improved visibility within 2-3 weeks after catalog optimization. Sales growth typically becomes significant within 45-60 days as your products gain traction with the reseller network."
    },
    {
      question: "Can you help with new Meesho seller registration?",
      answer: "Yes! We assist with complete Meesho supplier registration including GST verification, bank account setup, product catalog creation, and initial listing optimization to ensure a strong start."
    },
    {
      question: "How do you help reduce returns on Meesho?",
      answer: "We focus on accurate product descriptions, proper size guides, quality images, and realistic customer expectations. This significantly reduces return rates which improves your supplier rating and profitability."
    },
    {
      question: "What categories do you specialize in on Meesho?",
      answer: "We have expertise across all major Meesho categories including fashion, home & kitchen, beauty, electronics accessories, and more. Our strategies are tailored to each category's unique requirements."
    },
    {
      question: "How do you optimize pricing for Meesho's mass market?",
      answer: "We analyze competitor pricing, calculate optimal margins, and factor in Meesho's commission structure. Our goal is to find the sweet spot where your products are competitive for resellers while maintaining profitability."
    },
    {
      question: "What reports do you provide for Meesho sellers?",
      answer: "We provide comprehensive reports including sales trends, catalog performance, return analysis, inventory status, quality score tracking, and actionable recommendations on a weekly or bi-weekly basis."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Meesho Account Management Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Meesho supplier account management services including catalog optimization, pricing strategy, inventory management, and order management for social commerce success.",
    "areaServed": "India",
    "serviceType": "Social Commerce Account Management"
  };

  return (
    <>
      <SEO
        title="Meesho Account Management Services | Grow Your Meesho Business | Simply Setup"
        description="Expert Meesho supplier account management services in India. Boost sales with catalog optimization, pricing strategy, inventory management, and dedicated support. Get a free consultation today!"
        canonicalUrl="https://simplysetup.in/growth/meesho-account-management"
      />

      <Navbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-pink-50 via-white to-fuchsia-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-100">
                  <ShoppingCart className="w-3 h-3 mr-1" /> Meesho Growth Partner
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Scale Your Meesho Business with Expert{" "}
                  <span className="text-pink-600">Account Management</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  From catalog optimization to reseller reach, we handle everything so you can focus on 
                  sourcing great products. Trusted by 300+ Indian suppliers to maximize their Meesho potential.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-pink-600 hover:bg-pink-700" data-testid="button-get-free-consultation">
                        Get Free Consultation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free Meesho Account Consultation</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-pink-100 border-2 border-white flex items-center justify-center">
                        <Users className="w-5 h-5 text-pink-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">300+ Suppliers Trust Us</p>
                    <p className="text-xs text-gray-500">Average 4.7★ rating from clients</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-8 border">
                  <div className="grid grid-cols-2 gap-6">
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="text-center p-4 bg-pink-50 rounded-xl">
                        <p className="text-3xl font-bold text-pink-600">{metric.value}</p>
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
              <div className="w-20 h-1 bg-pink-600 mx-auto my-3 rounded-sm"></div>
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
                Struggling with Your Meesho Business?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common challenges faced by Meesho suppliers that we solve every day
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {painPoints.map((point, index) => (
                <Card key={index} className="border-2 hover:border-pink-200 transition-colors">
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
                  Let our team of Meesho specialists solve your challenges and accelerate your growth.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free catalog audit worth ₹5,000</span>
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
                Complete Meesho Account Management Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                End-to-end solutions to grow your Meesho business
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
        <section className="py-16 bg-gradient-to-br from-pink-50 via-white to-fuchsia-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Specialized Meesho Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Deep-dive into our specialized services designed specifically for Meesho suppliers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/growth/meesho-account-management/seller-launch">
                <Card className="bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-pink-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Rocket className="w-8 h-8 text-pink-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Seller Launch</h3>
                    <p className="text-sm text-gray-600 mb-4">Complete Meesho seller onboarding and account setup with expert guidance</p>
                    <span className="text-pink-600 text-sm font-medium flex items-center justify-center gap-1">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/meesho-account-management/catalog-strategy">
                <Card className="bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-pink-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-fuchsia-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-fuchsia-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Catalog Strategy</h3>
                    <p className="text-sm text-gray-600 mb-4">Optimized product catalogs that attract resellers and drive more sales</p>
                    <span className="text-fuchsia-600 text-sm font-medium flex items-center justify-center gap-1">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/meesho-account-management/reseller-growth">
                <Card className="bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-pink-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <UserCheck className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Reseller Growth</h3>
                    <p className="text-sm text-gray-600 mb-4">Expand your reseller network and increase product shareability</p>
                    <span className="text-purple-600 text-sm font-medium flex items-center justify-center gap-1">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/meesho-account-management/logistics">
                <Card className="bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-pink-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Truck className="w-8 h-8 text-pink-700" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Logistics</h3>
                    <p className="text-sm text-gray-600 mb-4">Streamlined shipping, delivery optimization, and return management</p>
                    <span className="text-pink-700 text-sm font-medium flex items-center justify-center gap-1">
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
                How We Grow Your Meesho Business
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our proven 4-step process for Meesho success
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="absolute top-8 left-1/2 w-full h-0.5 bg-pink-200 -z-10 hidden md:block" 
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
                Everything you need to know about our Meesho management services
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
        <section className="py-16 bg-pink-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Scale Your Meesho Business?
            </h2>
            <p className="text-pink-100 mb-8 max-w-2xl mx-auto">
              Get a free consultation and discover untapped opportunities to grow your sales
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-pink-600 hover:bg-pink-50" data-testid="button-cta-free-consultation">
                  Get Your Free Consultation Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Free Meesho Account Consultation</DialogTitle>
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
                Speak with Our Meesho Experts
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our dedicated team is ready to help you succeed on Meesho
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
