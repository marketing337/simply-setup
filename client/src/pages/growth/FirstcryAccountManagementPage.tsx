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
  Baby,
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
  Heart
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

export default function FirstcryAccountManagementPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      problem: "Product Safety Compliance",
      solution: "Expert guidance on BIS certifications, age-appropriate labeling, and safety standards for baby products"
    },
    {
      icon: <Calendar className="w-6 h-6 text-red-500" />,
      problem: "Seasonal Demand Fluctuations",
      solution: "Strategic inventory planning for festivals, back-to-school, and seasonal peaks"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-red-500" />,
      problem: "Keeping Up with Parenting Trends",
      solution: "Market research and trending product recommendations to stay ahead of competitors"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Time-Consuming Operations",
      solution: "End-to-end account management so you can focus on product development and sourcing"
    }
  ];

  const services = [
    {
      icon: <Package className="w-8 h-8 text-rose-600" />,
      title: "Catalog Optimization",
      description: "Create parent-friendly product listings that drive conversions",
      features: ["Age-appropriate keyword optimization", "Benefit-focused descriptions for parents", "Size & safety information clarity"]
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Safety Certification Support",
      description: "Navigate complex baby product compliance requirements",
      features: ["BIS certification guidance", "Product safety documentation", "Age-grading compliance support"]
    },
    {
      icon: <Calendar className="w-8 h-8 text-purple-600" />,
      title: "Seasonal Campaign Management",
      description: "Maximize sales during key shopping periods",
      features: ["Festival season promotions", "Back-to-school campaigns", "New parent targeting strategies"]
    },
    {
      icon: <Image className="w-8 h-8 text-green-600" />,
      title: "Brand Store Development",
      description: "Build trust with parents through professional brand presence",
      features: ["Custom Firstcry brand store", "Lifestyle imagery for products", "Parent testimonial integration"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-indigo-600" />,
      title: "Advertising & Promotions",
      description: "Targeted campaigns to reach new and expecting parents",
      features: ["Sponsored product ads", "Flash deal management", "Mom-focused targeting"]
    },
    {
      icon: <Headphones className="w-8 h-8 text-pink-600" />,
      title: "Customer Experience Management",
      description: "Build lasting relationships with parent customers",
      features: ["Review management", "Query resolution", "Return handling optimization"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Account Audit",
      description: "Comprehensive analysis of your Firstcry account performance, product catalog, and growth opportunities",
      icon: <Search className="w-6 h-6 text-rose-600" />
    },
    {
      step: "2", 
      title: "Strategy Development",
      description: "Custom growth plan for baby & kids products, considering seasonality and parent buying behavior",
      icon: <FileText className="w-6 h-6 text-rose-600" />
    },
    {
      step: "3",
      title: "Implementation",
      description: "Execute catalog optimization, safety compliance, and promotional strategies",
      icon: <Settings className="w-6 h-6 text-rose-600" />
    },
    {
      step: "4",
      title: "Monitor & Scale",
      description: "Continuous optimization with weekly reports and seasonal strategy adjustments",
      icon: <TrendingUp className="w-6 h-6 text-rose-600" />
    }
  ];

  const successMetrics = [
    { value: "250%", label: "Average Sales Increase", description: "Within first 6 months" },
    { value: "40%", label: "Better Visibility", description: "In category rankings" },
    { value: "300+", label: "Baby Brands Managed", description: "Across India" },
    { value: "98%", label: "Compliance Rate", description: "Safety standards met" }
  ];

  const faqs = [
    {
      question: "What makes selling on Firstcry different from other marketplaces?",
      answer: "Firstcry specializes in baby and kids products, requiring sellers to meet strict safety standards, provide detailed age-appropriate information, and understand parent buying psychology. Our team has deep expertise in this niche to help you succeed."
    },
    {
      question: "How do you help with baby product safety compliance?",
      answer: "We guide you through BIS certification requirements, proper age-grading labels, safety warnings, and documentation needed for baby products. We ensure your listings meet all Firstcry guidelines to avoid rejections or account issues."
    },
    {
      question: "Can you help me start selling on Firstcry?",
      answer: "Absolutely! We assist with new seller registration, documentation, catalog setup, and initial product launches to ensure you start with a strong foundation and proper compliance."
    },
    {
      question: "How do you handle seasonal peaks like Diwali or back-to-school?",
      answer: "We create advance inventory plans, promotional calendars, and targeted campaigns for key shopping seasons. Our proactive approach ensures you're well-stocked and visible during peak demand periods."
    },
    {
      question: "What categories on Firstcry do you specialize in?",
      answer: "We manage accounts across all Firstcry categories including baby care, feeding, diapers, toys, kids clothing, school supplies, nursery furniture, and maternity products. Our team understands the unique requirements of each category."
    },
    {
      question: "How do you help build trust with parent customers?",
      answer: "We focus on detailed product descriptions, clear safety information, high-quality images, prompt customer service, and proactive review management. Parents need extra assurance when buying for their children, and we help you deliver that trust."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Firstcry Account Management Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Firstcry seller account management services including catalog optimization, safety compliance support, seasonal campaigns, and dedicated account support for baby & kids product sellers.",
    "areaServed": "India",
    "serviceType": "E-commerce Account Management"
  };

  return (
    <>
      <SEO
        title="Firstcry Account Management Services | Grow Your Firstcry Business | Simply Setup"
        description="Expert Firstcry seller account management services in India. Boost sales with catalog optimization, safety compliance support, seasonal campaigns, and dedicated account support for baby & kids products. Get a free audit today!"
        canonicalUrl="https://simplysetup.in/growth/firstcry-account-management"
      />

      <Navbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-rose-50 via-white to-pink-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100">
                  <Baby className="w-3 h-3 mr-1" /> Firstcry Growth Partner
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Scale Your Firstcry Business with Expert{" "}
                  <span className="text-rose-600">Account Management</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  From catalog optimization to safety compliance, we handle everything so you can focus on 
                  growing your baby & kids product line. Trusted by 300+ Indian sellers on Firstcry.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-rose-600 hover:bg-rose-700" data-testid="button-get-free-audit">
                        Get Free Account Audit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free Firstcry Account Audit</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-rose-100 border-2 border-white flex items-center justify-center">
                        <Users className="w-5 h-5 text-rose-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">300+ Sellers Trust Us</p>
                    <p className="text-xs text-gray-500">Average 4.9★ rating from clients</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-8 border">
                  <div className="grid grid-cols-2 gap-6">
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="text-center p-4 bg-rose-50 rounded-xl">
                        <p className="text-3xl font-bold text-rose-600">{metric.value}</p>
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
              <div className="w-20 h-1 bg-rose-600 mx-auto my-3 rounded-sm"></div>
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
                Struggling with Your Firstcry Business?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common challenges faced by baby & kids product sellers that we solve every day
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {painPoints.map((point, index) => (
                <Card key={index} className="border-2 hover:border-rose-200 transition-colors">
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
                  Let our team of Firstcry specialists solve your challenges and accelerate your baby & kids product sales.
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
                Comprehensive Firstcry Account Management Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to succeed on India's largest baby & kids marketplace
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-2">{service.icon}</div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-rose-500" />
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
        <section className="py-16 bg-gradient-to-br from-orange-50 via-rose-50 to-pink-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Specialized Firstcry Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Deep expertise in key areas to maximize your baby & kids product success
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/growth/firstcry-account-management/compliance">
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-rose-300" data-testid="card-firstcry-compliance">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-7 h-7 text-rose-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Compliance Services</h3>
                    <p className="text-sm text-gray-600">BIS certifications, safety standards, and age-appropriate labeling for baby products</p>
                    <div className="mt-4 flex items-center justify-center text-rose-600 font-medium text-sm">
                      Learn More <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/firstcry-account-management/catalog">
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-orange-300" data-testid="card-firstcry-catalog">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-7 h-7 text-orange-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Catalog Management</h3>
                    <p className="text-sm text-gray-600">Parent-friendly listings with age-appropriate keywords and benefit-focused descriptions</p>
                    <div className="mt-4 flex items-center justify-center text-orange-600 font-medium text-sm">
                      Learn More <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/firstcry-account-management/promotions">
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-pink-300" data-testid="card-firstcry-promotions">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-7 h-7 text-pink-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Promotions & Ads</h3>
                    <p className="text-sm text-gray-600">Targeted campaigns for festivals, back-to-school, and new parent segments</p>
                    <div className="mt-4 flex items-center justify-center text-pink-600 font-medium text-sm">
                      Learn More <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/growth/firstcry-account-management/inventory">
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-amber-300" data-testid="card-firstcry-inventory">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-7 h-7 text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Inventory Management</h3>
                    <p className="text-sm text-gray-600">Seasonal demand planning and stock optimization for baby products</p>
                    <div className="mt-4 flex items-center justify-center text-amber-600 font-medium text-sm">
                      Learn More <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-rose-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Proven Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A systematic approach to growing your Firstcry business
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl p-6 shadow-sm h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-xl">
                        {step.step}
                      </div>
                      {step.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-rose-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600">
                  Everything you need to know about our Firstcry account management services
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                    <AccordionTrigger className="text-left font-medium py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-rose-600 to-pink-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Grow Your Firstcry Business?
            </h2>
            <p className="text-rose-100 mb-8 max-w-2xl mx-auto">
              Join 300+ successful baby & kids product sellers who trust us with their Firstcry accounts
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-rose-600 hover:bg-rose-50" data-testid="button-cta-get-started">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Free Firstcry Account Audit</DialogTitle>
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
                Meet Our Firstcry Experts
              </h2>
              <p className="text-gray-600">
                Get personalized support from our dedicated account managers
              </p>
            </div>
            <SalesPersonCards locationId={currentLocation?.id || 1} />
          </div>
        </section>
      </main>

      <Footer location={currentLocation} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
