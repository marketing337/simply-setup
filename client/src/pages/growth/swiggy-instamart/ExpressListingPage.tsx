import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  CheckCircle, 
  Zap, 
  TrendingUp, 
  ArrowRight,
  Package,
  FileText,
  Clock,
  Target,
  BarChart3,
  Search,
  Edit3,
  List,
  Tag,
  Layers,
  Grid3X3,
  ShoppingBag
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

export default function SwiggyExpressListingPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Slow Onboarding Process",
      solution: "Express product listing with same-day activation on Instamart"
    },
    {
      icon: <Grid3X3 className="w-6 h-6 text-red-500" />,
      problem: "Wrong Category Mapping",
      solution: "Accurate category placement for maximum visibility in Instamart search"
    },
    {
      icon: <Layers className="w-6 h-6 text-red-500" />,
      problem: "SKU Priority Confusion",
      solution: "Strategic fast-moving SKU prioritization for quick commerce"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Incomplete Product Info",
      solution: "Comprehensive menu setup with all required Instamart attributes"
    }
  ];

  const services = [
    {
      icon: <Zap className="w-8 h-8 text-orange-600" />,
      title: "Express Product Onboarding",
      description: "Get your products live on Swiggy Instamart within 24-48 hours",
      features: ["Same-day activation", "Bulk upload support", "Quality compliance check"]
    },
    {
      icon: <Grid3X3 className="w-8 h-8 text-red-600" />,
      title: "Category Mapping",
      description: "Strategic placement in high-visibility Instamart categories",
      features: ["Category optimization", "Sub-category selection", "Browse path setup"]
    },
    {
      icon: <Tag className="w-8 h-8 text-orange-500" />,
      title: "SKU Prioritization",
      description: "Identify and prioritize your best-selling products for Instamart",
      features: ["Fast-mover analysis", "Demand forecasting", "Inventory allocation"]
    },
    {
      icon: <Edit3 className="w-8 h-8 text-green-600" />,
      title: "Menu Optimization",
      description: "Complete product menu setup for Instamart quick commerce",
      features: ["Title optimization", "Description writing", "Image guidelines"]
    },
    {
      icon: <Search className="w-8 h-8 text-blue-600" />,
      title: "Search Visibility",
      description: "Optimize listings for Swiggy Instamart's search algorithm",
      features: ["Keyword research", "Tag optimization", "Attribute filling"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
      title: "Performance Tracking",
      description: "Monitor and optimize Instamart listing performance",
      features: ["Visibility metrics", "Conversion tracking", "A/B testing"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Product Audit",
      description: "Analyze your catalog and identify priority SKUs for Swiggy Instamart",
      icon: <Search className="w-6 h-6 text-orange-600" />
    },
    {
      step: "2", 
      title: "Category Strategy",
      description: "Map products to optimal Instamart categories for maximum discoverability",
      icon: <Target className="w-6 h-6 text-orange-600" />
    },
    {
      step: "3",
      title: "Express Setup",
      description: "Fast-track listing creation with all required Instamart attributes",
      icon: <Zap className="w-6 h-6 text-orange-600" />
    },
    {
      step: "4",
      title: "Go Live & Optimize",
      description: "Launch on Instamart and continuously optimize for better performance",
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />
    }
  ];

  const successMetrics = [
    { value: "24hrs", label: "Avg. Listing Time", description: "Express activation" },
    { value: "95%", label: "Category Accuracy", description: "First-time right" },
    { value: "500+", label: "SKUs Listed", description: "Monthly average" },
    { value: "3x", label: "Faster Onboarding", description: "Than standard process" }
  ];

  const faqs = [
    {
      question: "How quickly can my products go live on Swiggy Instamart?",
      answer: "With our express listing service, most products go live within 24-48 hours. We handle all documentation, category mapping, and quality compliance requirements to ensure fast activation on Instamart."
    },
    {
      question: "What is category mapping and why is it important for Instamart?",
      answer: "Category mapping ensures your products appear in the right categories on Swiggy Instamart. Proper mapping increases visibility, helps customers find your products easily, and improves search rankings within the Instamart app."
    },
    {
      question: "How do you prioritize which SKUs to list first on Instamart?",
      answer: "We analyze your catalog based on demand patterns, margins, competition, and quick commerce suitability. Fast-moving consumer goods (FMCG), essentials, and impulse purchase items typically get priority for Instamart's quick commerce platform."
    },
    {
      question: "What documents are needed for Swiggy Instamart listing?",
      answer: "You'll need GST registration, product images meeting Instamart guidelines, FSSAI license (for food items), brand authorization letters, and complete product information including MRP, weight, and shelf life."
    },
    {
      question: "Can you help with bulk product uploads on Instamart?",
      answer: "Yes! We specialize in bulk catalog management for Swiggy Instamart. Whether you have 50 or 5000 SKUs, our team can efficiently process and list your entire catalog with proper categorization and optimization."
    },
    {
      question: "Do you provide ongoing menu management for Instamart?",
      answer: "Absolutely. We offer continuous catalog management including new product additions, seasonal updates, price changes, and performance optimization to keep your Swiggy Instamart presence competitive."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Swiggy Instamart Express Listing & Menu Setup Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Swiggy Instamart express listing services including quick product onboarding, category mapping, and fast-moving SKU prioritization for quick commerce success.",
    "areaServed": "India",
    "serviceType": "Quick Commerce Listing Services"
  };

  return (
    <>
      <SEO
        title="Swiggy Instamart Express Listing & Menu Setup | Quick Product Onboarding | Simply Setup"
        description="Fast-track your Swiggy Instamart store launch with express listing services. Expert category mapping, SKU prioritization, and menu optimization for quick commerce success. Go live in 24 hours!"
        canonicalUrl="https://simplysetup.in/growth/swiggy-instamart-account-management/express-listing"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Navbar />

      <main className="min-h-screen">
        <div className="bg-gray-50 py-3 border-b">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600">
              <Link href="/growth" className="hover:text-orange-600">Growth</Link>
              <span className="mx-2">/</span>
              <Link href="/growth/swiggy-instamart-account-management" className="hover:text-orange-600">Swiggy Instamart Account Management</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Express Listing & Menu Setup</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-orange-50 via-white to-red-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  <Zap className="w-3 h-3 mr-1" /> Instamart Listing Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Express Listing &{" "}
                  <span className="text-orange-600">Menu Setup</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Launch your products on Swiggy Instamart in record time. Our express onboarding service 
                  ensures your catalog is live, optimized, and ready to capture quick commerce demand.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-orange-600 hover:bg-orange-700" data-testid="button-express-listing">
                        Start Express Listing
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Express Listing on Swiggy Instamart</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-orange-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">500+ SKUs Listed Monthly</p>
                    <p className="text-xs text-gray-500">24-hour express activation</p>
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

        <section className="w-full bg-white py-8 border-t border-b border-gray-200 overflow-hidden">
          <div className="max-w-6xl mx-auto px-5">
            <div className="text-center mb-5">
              <h2 className="text-2xl text-gray-900 font-bold mb-1 leading-tight">
                Trusted by Leading Brands
              </h2>
              <div className="w-20 h-1 bg-orange-600 mx-auto my-3 rounded-sm"></div>
            </div>

            <div className="relative max-w-6xl mx-auto overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-linear"
                style={{
                  animation: "scroll-logos 20s linear infinite",
                  width: "calc(200% + 96px)",
                }}
              >
                {[...Array(2)].map((_, setIndex) => (
                  <div key={setIndex} className="flex">
                    {[
                      { src: "https://cdn.shopify.com/s/files/1/0704/3704/4519/files/Airtel-logo.png?v=1744191898", alt: "AIRTEL" },
                      { src: "https://cdn.shopify.com/s/files/1/0704/3704/4519/files/godrej-logo-191FB61A1F-seeklogo.com.png?v=1723541004", alt: "GODREJ" },
                      { src: "https://cdn.shopify.com/s/files/1/0704/3704/4519/files/TATA_1mg_Logo.png?v=1749482060", alt: "TATA1MG" },
                      { src: "https://cdn.shopify.com/s/files/1/0704/3704/4519/files/MANKIND.NS_BIG-e2edbe6b.png?v=1740139347", alt: "MANKIND" },
                      { src: "https://cdn.shopify.com/s/files/1/0704/3704/4519/files/haldirams-logo_1.png?v=1723630841", alt: "HALDIRAM" },
                      { src: "https://thegstco.com/cdn/shop/files/Milton_Logo_x38.png?v=1719050580", alt: "MILTON" },
                      { src: "https://thegstco.com/cdn/shop/files/mamaearth-logo_x38.png?v=1706364685", alt: "MAMAEARTH" },
                      { src: "https://cdn.shopify.com/s/files/1/0704/3704/4519/files/cocoblu-logo.png?v=1723009856", alt: "COCOBLU" },
                    ].map((logo, idx) => (
                      <div key={idx} className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                        <img className="max-w-full max-h-12 object-contain" src={logo.src} alt={logo.alt} />
                      </div>
                    ))}
                  </div>
                ))}
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

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Struggling with Instamart Onboarding?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common listing challenges we solve for Swiggy Instamart sellers
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

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">Launch on Swiggy Instamart Today</h3>
                <p className="text-gray-600 text-lg">
                  Let our experts fast-track your Instamart store setup and catalog management.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free catalog audit worth ₹3,000</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">24-hour express activation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Dedicated account manager</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <ZohoFormEmbed />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Complete Express Listing Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                End-to-end catalog management for your Swiggy Instamart quick commerce success
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-2">{service.icon}</div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-orange-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Express Listing Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A streamlined 4-step approach to get you selling on Swiggy Instamart fast
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    {step.icon}
                  </div>
                  <div className="bg-orange-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Services</h2>
              <p className="text-gray-600">Explore more Swiggy Instamart growth services</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/growth/swiggy-instamart-account-management/inventory-forecasting">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Inventory Forecasting</h3>
                    <p className="text-sm text-gray-600">Dark store optimization</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/swiggy-instamart-account-management/hyperlocal-promotions">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Hyperlocal Promotions</h3>
                    <p className="text-sm text-gray-600">Location-based offers</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/swiggy-instamart-account-management/sla-monitoring">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">SLA Monitoring</h3>
                    <p className="text-sm text-gray-600">Operations excellence</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border px-6">
                    <AccordionTrigger className="text-left font-medium hover:no-underline">
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

        <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Launch on Swiggy Instamart?
            </h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Get your products listed and start selling on Swiggy Instamart today. 
              Our experts are ready to help you succeed in quick commerce.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100" data-testid="button-cta-listing">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Start Your Instamart Journey</DialogTitle>
                </DialogHeader>
                <ZohoFormEmbed />
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>

      <Footer location={null} />
    </>
  );
}
