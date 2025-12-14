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
  Tag,
  Layers,
  Grid3X3,
  ShoppingCart,
  IndianRupee,
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

export default function ExpressListingPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Slow Product Onboarding",
      solution: "Express catalog setup with same-day activation on BigBasket"
    },
    {
      icon: <Grid3X3 className="w-6 h-6 text-red-500" />,
      problem: "Category Mapping Errors",
      solution: "Accurate grocery category placement for maximum visibility"
    },
    {
      icon: <Layers className="w-6 h-6 text-red-500" />,
      problem: "SKU Prioritization Issues",
      solution: "Strategic fast-moving grocery SKU prioritization"
    },
    {
      icon: <IndianRupee className="w-6 h-6 text-red-500" />,
      problem: "Pricing & MRP Confusion",
      solution: "Optimal pricing setup with competitive positioning"
    }
  ];

  const services = [
    {
      icon: <Zap className="w-8 h-8 text-green-600" />,
      title: "Express Product Onboarding",
      description: "Get your grocery products live on BigBasket within 24-48 hours",
      features: ["Same-day activation", "Bulk upload support", "FSSAI compliance check"]
    },
    {
      icon: <Grid3X3 className="w-8 h-8 text-emerald-600" />,
      title: "Category Mapping",
      description: "Strategic placement in high-visibility grocery categories",
      features: ["Staples & essentials", "Fresh produce setup", "Browse path optimization"]
    },
    {
      icon: <Tag className="w-8 h-8 text-lime-600" />,
      title: "SKU Prioritization",
      description: "Identify and prioritize your best-selling grocery products",
      features: ["Fast-mover analysis", "Seasonal demand mapping", "Expiry-based prioritization"]
    },
    {
      icon: <Edit3 className="w-8 h-8 text-teal-600" />,
      title: "Menu Optimization",
      description: "Complete product menu setup for grocery marketplace",
      features: ["Title optimization", "Nutritional info setup", "Image guidelines"]
    },
    {
      icon: <Search className="w-8 h-8 text-green-700" />,
      title: "Search Visibility",
      description: "Optimize listings for BigBasket's search algorithm",
      features: ["Keyword research", "Tag optimization", "Attribute filling"]
    },
    {
      icon: <Image className="w-8 h-8 text-emerald-700" />,
      title: "Content Enhancement",
      description: "High-quality product content that converts",
      features: ["Product photography", "Description writing", "A+ content creation"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Catalog Audit",
      description: "Analyze your product catalog and identify priority grocery SKUs",
      icon: <Search className="w-6 h-6 text-green-600" />
    },
    {
      step: "2", 
      title: "Category Strategy",
      description: "Map products to optimal BigBasket categories for discoverability",
      icon: <Target className="w-6 h-6 text-green-600" />
    },
    {
      step: "3",
      title: "Express Setup",
      description: "Fast-track listing creation with all required attributes",
      icon: <Zap className="w-6 h-6 text-green-600" />
    },
    {
      step: "4",
      title: "Go Live & Optimize",
      description: "Launch and continuously optimize for better performance",
      icon: <TrendingUp className="w-6 h-6 text-green-600" />
    }
  ];

  const successMetrics = [
    { value: "24hrs", label: "Avg. Listing Time", description: "Express activation" },
    { value: "98%", label: "Category Accuracy", description: "First-time right" },
    { value: "1000+", label: "SKUs Listed", description: "Monthly average" },
    { value: "3x", label: "Faster Onboarding", description: "Than standard process" }
  ];

  const faqs = [
    {
      question: "How quickly can my grocery products go live on BigBasket?",
      answer: "With our express listing service, most products go live within 24-48 hours. We handle all documentation, FSSAI verification, category mapping, and quality compliance requirements to ensure fast activation."
    },
    {
      question: "What is category mapping and why is it important for BigBasket?",
      answer: "Category mapping ensures your grocery products appear in the right categories like Staples, Fresh Produce, Dairy, Beverages, etc. Proper mapping increases visibility, helps customers find your products easily, and improves search rankings."
    },
    {
      question: "How do you prioritize which SKUs to list first?",
      answer: "We analyze your catalog based on demand patterns, shelf life, margins, and BigBasket-specific trends. Essential grocery items, daily-use products, and high-turnover SKUs typically get priority for faster listing."
    },
    {
      question: "What documents are needed for BigBasket listing?",
      answer: "You'll need GST registration, FSSAI license (mandatory for food items), product images meeting BigBasket guidelines, brand authorization letters, and complete product information including MRP, weight, shelf life, and nutritional information."
    },
    {
      question: "Can you help with bulk grocery product uploads?",
      answer: "Yes! We specialize in bulk catalog management for grocery sellers. Whether you have 100 or 10,000 SKUs, our team can efficiently process and list your entire grocery catalog with proper categorization."
    },
    {
      question: "Do you provide ongoing menu and catalog management?",
      answer: "Absolutely. We offer continuous catalog management including new product additions, seasonal updates, price changes, expiry monitoring, and performance optimization to keep your BigBasket presence competitive."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "BigBasket Express Listing & Menu Setup Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional BigBasket express listing services including quick product onboarding, category mapping, and grocery SKU prioritization for marketplace success.",
    "areaServed": "India",
    "serviceType": "Grocery Marketplace Listing Services"
  };

  return (
    <>
      <SEO
        title="BigBasket Express Listing & Menu Setup | Quick Product Onboarding | Simply Setup"
        description="Fast-track your BigBasket store launch with express listing services. Expert category mapping, SKU prioritization, and menu optimization for grocery marketplace success. Go live in 24 hours!"
        canonicalUrl="https://simplysetup.in/growth/bigbasket-account-management/express-listing"
      />

      <Navbar />

      <main className="min-h-screen">
        <div className="bg-gray-50 py-3 border-b">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600">
              <Link href="/growth" className="hover:text-green-600">Growth</Link>
              <span className="mx-2">/</span>
              <Link href="/growth/bigbasket-account-management" className="hover:text-green-600">BigBasket Account Management</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Express Listing & Menu Setup</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  <Zap className="w-3 h-3 mr-1" /> BigBasket Listing Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Express Listing &{" "}
                  <span className="text-green-600">Menu Setup</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Launch your grocery products on BigBasket in record time. Our express onboarding service 
                  ensures your catalog is live, optimized, and ready to capture grocery marketplace demand.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-green-600 hover:bg-green-700" data-testid="button-express-listing">
                        Start Express Listing
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Express Listing on BigBasket</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-green-100 border-2 border-white flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 text-green-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">1000+ SKUs Listed Monthly</p>
                    <p className="text-xs text-gray-500">24-hour express activation</p>
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

        <section className="w-full bg-white py-8 border-t border-b border-gray-200 overflow-hidden">
          <div className="max-w-6xl mx-auto px-5">
            <div className="text-center mb-5">
              <h2 className="text-2xl text-gray-900 font-bold mb-1 leading-tight">
                Trusted by Leading Brands
              </h2>
              <div className="w-20 h-1 bg-green-600 mx-auto my-3 rounded-sm"></div>
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
                Struggling with BigBasket Onboarding?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common listing challenges we solve for grocery marketplace sellers
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

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">Launch on BigBasket Today</h3>
                <p className="text-gray-600 text-lg">
                  Let our experts fast-track your BigBasket store setup and catalog management.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free catalog audit worth ₹5,000</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">24-hour express activation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Dedicated grocery account manager</span>
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
                End-to-end catalog management for your BigBasket grocery marketplace success
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

        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Express Listing Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A streamlined 4-step approach to get you selling on BigBasket fast
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    {step.icon}
                  </div>
                  <div className="bg-green-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3">
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
              <p className="text-gray-600">Explore more BigBasket growth services</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/growth/bigbasket-account-management/inventory-forecasting">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Inventory Forecasting</h3>
                    <p className="text-sm text-gray-600">Demand prediction & stock optimization</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/bigbasket-account-management/hyperlocal-promotions">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-6 h-6 text-lime-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Hyperlocal Promotions</h3>
                    <p className="text-sm text-gray-600">Area-specific offers & visibility</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/bigbasket-account-management/sla-monitoring">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-6 h-6 text-teal-600" />
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
                  <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-6">
                    <AccordionTrigger className="text-left font-medium">
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

        <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Launch on BigBasket?
            </h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Get your grocery products live in 24 hours with our express listing service
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-green-50">
                  Start Express Listing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Express Listing on BigBasket</DialogTitle>
                </DialogHeader>
                <ZohoFormEmbed />
              </DialogContent>
            </Dialog>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </main>

      <Footer />
    </>
  );
}
