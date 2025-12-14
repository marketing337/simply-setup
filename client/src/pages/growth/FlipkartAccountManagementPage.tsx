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
  Image
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

export default function FlipkartAccountManagementPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Poor Catalog Visibility",
      solution: "Expert catalog optimization and product content enhancement for better search rankings"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-red-500" />,
      problem: "Low Conversion Rates",
      solution: "Strategic pricing, promotions, and listing optimization to maximize sales"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      problem: "Seller Quality Issues",
      solution: "Proactive monitoring of seller metrics and quick resolution of policy concerns"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Complex Operations",
      solution: "End-to-end account management including inventory, shipping, and returns handling"
    }
  ];

  const services = [
    {
      icon: <Package className="w-8 h-8 text-blue-600" />,
      title: "Catalog Optimization",
      description: "Create compelling product listings that drive visibility and conversions",
      features: ["SEO-optimized product titles", "High-quality image guidelines", "Detailed specifications & descriptions"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-yellow-600" />,
      title: "Flipkart Ads Management",
      description: "Maximize ROI with expertly managed advertising campaigns",
      features: ["Product Listing Ads (PLA)", "Brand Ads campaigns", "Performance tracking & optimization"]
    },
    {
      icon: <Image className="w-8 h-8 text-purple-600" />,
      title: "Flipkart Brand Store",
      description: "Premium brand storefront to showcase your product range",
      features: ["Custom brand store design", "Category page optimization", "Rich media content creation"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Seller Score Management",
      description: "Maintain excellent seller metrics and ratings",
      features: ["Order defect rate monitoring", "Cancellation rate optimization", "Shipping SLA compliance"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
      title: "Inventory & Pricing Strategy",
      description: "Optimize stock levels and competitive pricing",
      features: ["Smart fulfillment planning", "Dynamic pricing strategies", "Stock forecasting & alerts"]
    },
    {
      icon: <Headphones className="w-8 h-8 text-pink-600" />,
      title: "Customer Support Management",
      description: "Maintain excellent customer satisfaction scores",
      features: ["Review & rating management", "Query response optimization", "Returns handling support"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Account Analysis",
      description: "Comprehensive review of your Flipkart seller account performance and growth opportunities",
      icon: <Search className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "Strategy Planning",
      description: "Custom growth roadmap tailored to your products, category, and business objectives",
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "Execution",
      description: "Implement optimization strategies across catalog, advertising, and operations",
      icon: <Settings className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "Scale & Optimize",
      description: "Continuous improvement with regular performance reports and strategy adjustments",
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />
    }
  ];

  const successMetrics = [
    { value: "250%", label: "Average Sales Growth", description: "Within first 6 months" },
    { value: "40%", label: "Lower Ad Spend", description: "Improved ROAS" },
    { value: "400+", label: "Sellers Managed", description: "Across India" },
    { value: "24/7", label: "Account Monitoring", description: "Real-time support" }
  ];

  const faqs = [
    {
      question: "How long does it take to see results from Flipkart account management?",
      answer: "Most sellers see measurable improvements within 30-45 days. Initial catalog optimizations show quick results, while advertising and organic ranking improvements typically take 2-3 months to fully materialize."
    },
    {
      question: "Do you support Flipkart Assured and Smart Fulfillment sellers?",
      answer: "Yes, we manage both Flipkart Assured and Smart Fulfillment sellers. Our strategies are customized based on your fulfillment model to maximize visibility badges and customer trust."
    },
    {
      question: "Can you help with new Flipkart seller registration?",
      answer: "Absolutely! We assist with new seller onboarding, including documentation, GST verification, bank account setup, and initial catalog creation to ensure a smooth start on Flipkart."
    },
    {
      question: "Do you help with Flipkart Big Billion Days and sale events?",
      answer: "Yes, we provide comprehensive support for all Flipkart sale events including Big Billion Days, Big Saving Days, and category-specific sales. We help with inventory planning, pricing strategies, and ad campaign optimization for maximum sale event performance."
    },
    {
      question: "How do you handle Flipkart policy changes and updates?",
      answer: "Our team stays updated with all Flipkart seller policy changes and proactively adjusts strategies to maintain compliance. We notify clients immediately about any changes that may affect their account or listings."
    },
    {
      question: "What reports and analytics do you provide?",
      answer: "We provide detailed reports including sales performance, advertising metrics, catalog health scores, competitor analysis, inventory status, and seller score insights on a weekly or monthly basis depending on your plan."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Flipkart Account Management Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Flipkart seller account management services including catalog optimization, advertising management, brand store setup, and seller score management.",
    "areaServed": "India",
    "serviceType": "E-commerce Account Management"
  };

  return (
    <>
      <SEO
        title="Flipkart Account Management Services | Grow Your Flipkart Business | Simply Setup"
        description="Expert Flipkart seller account management services in India. Boost sales with catalog optimization, ads management, brand store setup, and dedicated account support. Get a free audit today!"
        canonicalUrl="https://simplysetup.in/growth/flipkart-account-management"
      />

      <Navbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                  <ShoppingCart className="w-3 h-3 mr-1" /> Flipkart Growth Partner
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Scale Your Flipkart Business with Expert{" "}
                  <span className="text-blue-600">Account Management</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  From catalog optimization to advertising campaigns, we handle everything so you can focus on 
                  growing your product portfolio. Trusted by 400+ Indian sellers to maximize their Flipkart potential.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700" data-testid="button-get-free-audit">
                        Get Free Account Audit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free Flipkart Account Audit</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">400+ Sellers Trust Us</p>
                    <p className="text-xs text-gray-500">Average 4.9★ rating from clients</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-8 border">
                  <div className="grid grid-cols-2 gap-6">
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="text-center p-4 bg-blue-50 rounded-xl">
                        <p className="text-3xl font-bold text-blue-600">{metric.value}</p>
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
          <div className="max-w-xs sm:max-w-lg md:max-w-2xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
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
              <a 
                href="https://seller.flipkart.com/index.html#dashboard/partner-services/service-partner-details?query=%257B%2522categoryId%2522%3A%25227%2522%2C%2522location%2522%3A412207%2C%2522partnerCategoryId%2522%3A%25228123%2522%2C%2522partnerId%2522%3A%2522PTNc58c1173c26f4a248fcd11e9e8cf025d%2522%2C%2522campaignId%2522%3A%2522%2522%2C%2522categoryName%2522%3A%2522Taxation%2522%2C%2522pageCTASource%2522%3A%2522%2520Partner%2520card%2522%2C%2522pageCTAValue%2522%3A%2522%2522%257D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center bg-white p-5 md:p-6 rounded-xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                data-testid="link-flipkart-sp"
              >
                <img 
                  src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/seller_service_provider_1.png?v=1717265468" 
                  alt="Flipkart Service Provider" 
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
              <div className="w-20 h-1 bg-blue-600 mx-auto my-3 rounded-sm"></div>
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
                Struggling with Your Flipkart Business?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common challenges faced by Flipkart sellers that we solve every day
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {painPoints.map((point, index) => (
                <Card key={index} className="border-2 hover:border-blue-200 transition-colors">
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
                  Let our team of Flipkart specialists solve your challenges and accelerate your growth.
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
                Complete Flipkart Account Management Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                End-to-end solutions to grow your Flipkart business
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
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Explore Our Specialized Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Deep-dive into specific areas of Flipkart account management
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Product Listing & Optimization", href: "/growth/flipkart-account-management/product-listing", icon: <Package className="w-8 h-8" />, desc: "SEO-optimized titles, images, and descriptions" },
                { title: "Ads & Promotions", href: "/growth/flipkart-account-management/ads-promotions", icon: <BarChart3 className="w-8 h-8" />, desc: "PLA campaigns and promotional strategies" },
                { title: "Fulfillment Services", href: "/growth/flipkart-account-management/fulfillment", icon: <Package className="w-8 h-8" />, desc: "Smart fulfillment and logistics management" },
                { title: "Performance Analytics", href: "/growth/flipkart-account-management/performance-analytics", icon: <TrendingUp className="w-8 h-8" />, desc: "Data-driven insights and reporting" }
              ].map((service, index) => (
                <Link key={index} href={service.href}>
                  <Card className="h-full hover:shadow-lg transition-all cursor-pointer border-2 hover:border-blue-300 group">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 group-hover:bg-blue-200 transition-colors">
                        {service.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                      <p className="text-sm text-gray-600">{service.desc}</p>
                      <div className="mt-4 flex items-center justify-center text-blue-600 font-medium">
                        Learn More <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How We Grow Your Flipkart Business
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our proven 4-step process for Flipkart success
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="absolute top-8 left-1/2 w-full h-0.5 bg-blue-200 -z-10 hidden md:block" 
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
                Everything you need to know about our Flipkart management services
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
        <section className="py-16 bg-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Scale Your Flipkart Business?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Get a free account audit and discover untapped opportunities to grow your sales
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50" data-testid="button-cta-free-audit">
                  Get Your Free Audit Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Free Flipkart Account Audit</DialogTitle>
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
                Speak with Our Flipkart Experts
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our dedicated team is ready to help you succeed on Flipkart
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
