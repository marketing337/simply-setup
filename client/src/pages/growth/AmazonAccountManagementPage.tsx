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

export default function AmazonAccountManagementPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Low Product Visibility",
      solution: "Expert SEO optimization and A+ content to boost your product rankings"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-red-500" />,
      problem: "Poor Sales Performance",
      solution: "Data-driven advertising and pricing strategies to maximize conversions"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      problem: "Account Health Issues",
      solution: "Proactive monitoring and quick resolution of policy violations"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Time-Consuming Operations",
      solution: "End-to-end account management so you can focus on sourcing and growth"
    }
  ];

  const services = [
    {
      icon: <Package className="w-8 h-8 text-orange-600" />,
      title: "Product Listing Optimization",
      description: "Create compelling product listings that convert browsers into buyers",
      features: ["Keyword-rich titles & bullets", "High-converting product descriptions", "Backend search term optimization"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: "Amazon PPC Management",
      description: "Maximize ROI with expertly managed advertising campaigns",
      features: ["Sponsored Products campaigns", "Sponsored Brands ads", "Campaign optimization & reporting"]
    },
    {
      icon: <Image className="w-8 h-8 text-purple-600" />,
      title: "A+ Content & Brand Store",
      description: "Premium brand content to differentiate from competitors",
      features: ["Enhanced Brand Content (A+)", "Amazon Brand Store design", "Lifestyle & infographic images"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Account Health Management",
      description: "Keep your account safe and in good standing",
      features: ["Policy compliance monitoring", "Performance metrics tracking", "Issue resolution support"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
      title: "Inventory & Pricing Strategy",
      description: "Optimize stock levels and pricing for maximum profit",
      features: ["FBA inventory planning", "Dynamic pricing strategies", "Stock forecasting & alerts"]
    },
    {
      icon: <Headphones className="w-8 h-8 text-pink-600" />,
      title: "Customer Service Management",
      description: "Maintain excellent seller ratings with responsive support",
      features: ["Review management", "Customer query handling", "Feedback optimization"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Account Audit",
      description: "Comprehensive analysis of your current Amazon account performance and opportunities",
      icon: <Search className="w-6 h-6 text-orange-600" />
    },
    {
      step: "2", 
      title: "Strategy Development",
      description: "Custom growth plan tailored to your products, competition, and business goals",
      icon: <FileText className="w-6 h-6 text-orange-600" />
    },
    {
      step: "3",
      title: "Implementation",
      description: "Execute optimization strategies across listings, advertising, and operations",
      icon: <Settings className="w-6 h-6 text-orange-600" />
    },
    {
      step: "4",
      title: "Monitor & Scale",
      description: "Continuous optimization with weekly reports and strategy refinements",
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />
    }
  ];

  const successMetrics = [
    { value: "300%", label: "Average Sales Increase", description: "Within first 6 months" },
    { value: "45%", label: "Lower ACoS", description: "Advertising cost reduction" },
    { value: "500+", label: "Brands Managed", description: "Across India" },
    { value: "24/7", label: "Account Monitoring", description: "Real-time alerts" }
  ];

  const faqs = [
    {
      question: "How long does it take to see results from Amazon account management?",
      answer: "Most sellers see measurable improvements within 30-60 days. Initial optimizations like listing improvements show results quickly, while advertising and ranking improvements typically take 2-3 months to fully materialize."
    },
    {
      question: "Do you work with both FBA and FBM sellers?",
      answer: "Yes, we manage both Fulfillment by Amazon (FBA) and Fulfillment by Merchant (FBM) accounts. Our strategies are customized based on your fulfillment model and business requirements."
    },
    {
      question: "Can you help with Amazon seller account registration?",
      answer: "Absolutely! We assist with new seller account registration, including documentation, GST verification, brand registry, and initial account setup to ensure you start on the right foot."
    },
    {
      question: "What marketplaces do you support?",
      answer: "We primarily focus on Amazon India (amazon.in), but also support Amazon USA, UK, UAE, and other international marketplaces for sellers looking to expand globally."
    },
    {
      question: "How do you handle Amazon policy changes and updates?",
      answer: "Our team stays updated with all Amazon policy changes and proactively adjusts strategies to maintain compliance. We notify clients immediately about any changes that may affect their account."
    },
    {
      question: "What reports and analytics do you provide?",
      answer: "We provide comprehensive reports including sales performance, advertising metrics, organic ranking trends, competitor analysis, inventory health, and account performance insights on a weekly or monthly basis depending on your plan."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Amazon Account Management Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Amazon seller account management services including listing optimization, PPC advertising, A+ content, and account health management.",
    "areaServed": "India",
    "serviceType": "E-commerce Account Management"
  };

  return (
    <>
      <SEO
        title="Amazon Account Management Services | Grow Your Amazon Business | Simply Setup"
        description="Expert Amazon seller account management services in India. Boost sales with listing optimization, PPC management, A+ content, and dedicated account support. Get a free audit today!"
        canonicalUrl="https://simplysetup.in/growth/amazon-account-management"
      />

      <Navbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-orange-50 via-white to-yellow-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  <ShoppingCart className="w-3 h-3 mr-1" /> Amazon Growth Partner
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Scale Your Amazon Business with Expert{" "}
                  <span className="text-orange-600">Account Management</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  From listing optimization to PPC campaigns, we handle everything so you can focus on 
                  growing your product line. Trusted by 500+ Indian sellers to maximize their Amazon potential.
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
                        <DialogTitle>Get Your Free Amazon Account Audit</DialogTitle>
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
                    <p className="text-sm font-semibold text-gray-900">500+ Sellers Trust Us</p>
                    <p className="text-xs text-gray-500">Average 4.8★ rating from clients</p>
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
                Struggling with Your Amazon Business?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common challenges faced by Amazon sellers that we solve every day
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
                  Let our team of Amazon specialists solve your challenges and accelerate your growth.
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
                Complete Amazon Account Management Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                End-to-end solutions to grow your Amazon business
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
        <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Explore Our Specialized Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Deep-dive into specific areas of Amazon account management
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Product Listing & Optimization", href: "/growth/amazon-account-management/product-listing", icon: <Package className="w-8 h-8" />, desc: "Keyword-rich titles, images, and descriptions" },
                { title: "A+ Content Design", href: "/growth/amazon-account-management/a-plus-listing", icon: <Image className="w-8 h-8" />, desc: "Premium brand content and enhanced visuals" },
                { title: "PPC Ads Campaign", href: "/growth/amazon-account-management/ppc-ads", icon: <BarChart3 className="w-8 h-8" />, desc: "Sponsored ads and ROI optimization" },
                { title: "FBA Onboarding", href: "/growth/amazon-account-management/fba-onboarding", icon: <Package className="w-8 h-8" />, desc: "Fulfillment setup and inventory management" }
              ].map((service, index) => (
                <Link key={index} href={service.href}>
                  <Card className="h-full hover:shadow-lg transition-all cursor-pointer border-2 hover:border-orange-300 group">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 group-hover:bg-orange-200 transition-colors">
                        {service.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{service.title}</h3>
                      <p className="text-sm text-gray-600">{service.desc}</p>
                      <div className="mt-4 flex items-center justify-center text-orange-600 font-medium">
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
                How We Grow Your Amazon Business
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our proven 4-step process for Amazon success
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
                Everything you need to know about our Amazon management services
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
              Ready to Scale Your Amazon Business?
            </h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Get a free account audit and discover untapped opportunities to grow your sales
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
                  <DialogTitle>Get Your Free Amazon Account Audit</DialogTitle>
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
                Speak with Our Amazon Experts
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our dedicated team is ready to help you succeed on Amazon
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
