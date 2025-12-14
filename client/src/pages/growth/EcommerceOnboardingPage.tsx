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
  Rocket,
  Shield, 
  Users, 
  Globe, 
  TrendingUp, 
  ArrowRight,
  Package,
  FileText,
  Clock,
  HelpCircle,
  Target,
  BarChart3,
  GraduationCap,
  Headphones,
  Settings,
  Search,
  ClipboardList,
  Store,
  BookOpen
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

export default function EcommerceOnboardingPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <HelpCircle className="w-6 h-6 text-red-500" />,
      problem: "Don't Know Where to Start",
      solution: "We guide you through every step from zero to your first sale"
    },
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Confused by Multiple Platforms",
      solution: "Expert advice on choosing the right marketplaces for your products"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Registration & Documentation Hassles",
      solution: "Complete documentation support and hassle-free registration process"
    },
    {
      icon: <Settings className="w-6 h-6 text-red-500" />,
      problem: "Lack of Technical Knowledge",
      solution: "Hands-on training and ongoing support for non-technical entrepreneurs"
    }
  ];

  const services = [
    {
      icon: <Search className="w-8 h-8 text-indigo-600" />,
      title: "Marketplace Selection Consulting",
      description: "Find the perfect platforms for your products and target audience",
      features: ["Product-market fit analysis", "Competition assessment", "Platform comparison & recommendations"]
    },
    {
      icon: <ClipboardList className="w-8 h-8 text-violet-600" />,
      title: "Seller Account Registration",
      description: "Complete documentation and verification for all major platforms",
      features: ["Amazon, Flipkart, Meesho registration", "Document preparation & submission", "Verification support"]
    },
    {
      icon: <Package className="w-8 h-8 text-purple-600" />,
      title: "Product Catalog Setup",
      description: "Create optimized product listings from scratch",
      features: ["Professional product titles", "SEO-optimized descriptions", "Category & attribute mapping"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "GST & Compliance Support",
      description: "Handle all tax registration and compliance requirements",
      features: ["GST registration assistance", "Tax compliance guidance", "Documentation for all platforms"]
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
      title: "Platform Training",
      description: "Hands-on training for daily operations and management",
      features: ["Order management training", "Inventory handling", "Dashboard navigation & reporting"]
    },
    {
      icon: <Headphones className="w-8 h-8 text-pink-600" />,
      title: "Launch Support",
      description: "First 30 days guidance and troubleshooting support",
      features: ["Dedicated account manager", "Issue resolution support", "Performance optimization tips"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Business Assessment",
      description: "We understand your products, target audience, and business goals",
      icon: <Search className="w-6 h-6 text-indigo-600" />
    },
    {
      step: "2", 
      title: "Platform Selection",
      description: "Choose the right marketplaces based on your product category and strategy",
      icon: <Store className="w-6 h-6 text-indigo-600" />
    },
    {
      step: "3",
      title: "Account Setup",
      description: "Complete registration, verification, and documentation for chosen platforms",
      icon: <ClipboardList className="w-6 h-6 text-indigo-600" />
    },
    {
      step: "4",
      title: "Go Live",
      description: "Launch your store with optimized listings and start selling",
      icon: <Rocket className="w-6 h-6 text-indigo-600" />
    }
  ];

  const successMetrics = [
    { value: "1000+", label: "Sellers Launched", description: "New businesses online" },
    { value: "15+", label: "Marketplaces", description: "Platform integrations" },
    { value: "7-Day", label: "Setup", description: "Quick turnaround" },
    { value: "100%", label: "Success Rate", description: "Guaranteed launch" }
  ];

  const faqs = [
    {
      question: "How long does it take to start selling online?",
      answer: "With our streamlined process, most sellers can go live within 7-10 days. This includes documentation, registration, verification, and initial product listing setup. Complex cases with additional verification requirements may take up to 2 weeks."
    },
    {
      question: "Which marketplace is best for beginners?",
      answer: "It depends on your product category and target customers. Amazon and Flipkart are great for wide reach, Meesho works well for affordable products, and niche platforms like Myntra or Ajio are better for fashion. We'll help you choose the best fit during our consultation."
    },
    {
      question: "Do I need GST to sell online?",
      answer: "Yes, GST registration is mandatory for selling on most major marketplaces in India. We provide complete GST registration assistance as part of our onboarding services. Some platforms allow selling below certain thresholds without GST, which we can advise on."
    },
    {
      question: "What products can I sell?",
      answer: "You can sell most legal products online, including electronics, fashion, home goods, groceries, beauty products, and more. Some categories like food, supplements, and medical devices require additional licenses. We'll guide you on category-specific requirements during assessment."
    },
    {
      question: "How much does it cost to start?",
      answer: "Starting costs vary by platform and product category. Basic requirements include GST registration (free), seller account (usually free to register), and initial inventory investment. Platform commissions typically range from 5-25% per sale. We'll provide a detailed cost breakdown during consultation."
    },
    {
      question: "Do you provide training?",
      answer: "Yes! Our onboarding package includes comprehensive hands-on training covering order management, inventory handling, customer service, payment reconciliation, and platform dashboard navigation. We also provide 30 days of post-launch support."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Ecommerce Onboarding Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Expert ecommerce onboarding services for new entrepreneurs. Complete setup on Amazon, Flipkart, Meesho, and 15+ marketplaces with training and support.",
    "areaServed": "India",
    "serviceType": "E-commerce Onboarding"
  };

  return (
    <>
      <SEO
        title="Ecommerce Onboarding Services | Start Selling Online | Simply Setup"
        description="Launch your online business with expert ecommerce onboarding. Get set up on Amazon, Flipkart, Meesho & 15+ marketplaces with complete training and support. Start selling in 7 days!"
        canonicalUrl="https://simplysetup.in/growth/ecommerce-onboarding"
      />

      <Navbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-indigo-50 via-white to-violet-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
                  <Rocket className="w-3 h-3 mr-1" /> Start Your Online Journey
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Launch Your Ecommerce Business with Expert{" "}
                  <span className="text-indigo-600">Onboarding</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Take your business online with confidence. We help new entrepreneurs launch on 
                  Amazon, Flipkart, Meesho, and 10+ marketplaces with complete setup and training included.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700" data-testid="button-get-started">
                        Start Your Journey
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Start Your Ecommerce Journey</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center">
                        <Users className="w-5 h-5 text-indigo-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">1000+ Entrepreneurs Launched</p>
                    <p className="text-xs text-gray-500">Join successful online sellers</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-8 border">
                  <div className="grid grid-cols-2 gap-6">
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="text-center p-4 bg-indigo-50 rounded-xl">
                        <p className="text-3xl font-bold text-indigo-600">{metric.value}</p>
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
              <div className="w-20 h-1 bg-indigo-600 mx-auto my-3 rounded-sm"></div>
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
                New to Ecommerce? We Understand Your Challenges
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common hurdles faced by first-time online sellers that we help overcome every day
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {painPoints.map((point, index) => (
                <Card key={index} className="border-2 hover:border-indigo-200 transition-colors">
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
                <h3 className="text-3xl font-bold text-gray-900">Get Started Today</h3>
                <p className="text-gray-600 text-lg">
                  Take the first step towards your online business. Our experts will guide you through the entire process.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free initial consultation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Personalized marketplace recommendations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Complete setup & training included</span>
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
                Complete Ecommerce Onboarding Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to launch your online business successfully
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

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Your Journey to Online Success
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our simple 4-step process to get you selling online
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="absolute top-8 left-1/2 w-full h-0.5 bg-indigo-200 -z-10 hidden md:block" 
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
                Everything you need to know about starting your online business
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
        <section className="py-16 bg-indigo-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Online Business?
            </h2>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join 1000+ entrepreneurs who have successfully launched their ecommerce journey with us
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-indigo-50" data-testid="button-cta-start-journey">
                  Start Your Journey Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Start Your Ecommerce Journey</DialogTitle>
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
                Speak with Our Ecommerce Experts
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our dedicated team is ready to help you start selling online
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
