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
  Shield, 
  TrendingUp, 
  ArrowRight,
  Package,
  FileText,
  BarChart3,
  Truck,
  Warehouse,
  Clock,
  Target,
  Settings,
  CheckSquare,
  Star,
  Box,
  MapPin,
  Zap
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

export default function JiomartFulfillmentPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Warehouse className="w-6 h-6 text-red-500" />,
      problem: "Complex Fulfillment Setup",
      solution: "Step-by-step guidance through Reliance logistics and warehouse integration"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      problem: "Delivery SLA Issues",
      solution: "Meet all JioMart delivery requirements for faster delivery promise"
    },
    {
      icon: <Truck className="w-6 h-6 text-red-500" />,
      problem: "Shipment & Inventory Errors",
      solution: "Proper labeling, packaging, and inventory management with Reliance system"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-red-500" />,
      problem: "High Fulfillment Costs",
      solution: "Optimize storage and shipping to reduce overall costs on JioMart"
    }
  ];

  const services = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Reliance Fulfillment Setup",
      description: "Complete integration with Reliance logistics network",
      features: ["Eligibility assessment", "Network integration", "Account activation"]
    },
    {
      icon: <Warehouse className="w-8 h-8 text-indigo-600" />,
      title: "Warehouse Integration",
      description: "Connect to JioMart's fulfillment centers",
      features: ["Account configuration", "Warehouse selection", "Inbound shipment"]
    },
    {
      icon: <Package className="w-8 h-8 text-blue-700" />,
      title: "Product Preparation",
      description: "Ensure products meet JioMart requirements",
      features: ["Labeling guidelines", "Packaging standards", "Quality checks"]
    },
    {
      icon: <Truck className="w-8 h-8 text-indigo-500" />,
      title: "Inbound Shipment",
      description: "Optimized shipment to Reliance warehouses",
      features: ["Shipment planning", "Box labeling", "Carrier coordination"]
    },
    {
      icon: <MapPin className="w-8 h-8 text-blue-800" />,
      title: "Delivery Optimization",
      description: "Faster delivery across India via Reliance network",
      features: ["Location optimization", "Route planning", "SLA management"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-indigo-600" />,
      title: "Inventory Management",
      description: "Ongoing inventory optimization",
      features: ["Restock alerts", "Storage fee monitoring", "Stock reconciliation"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Fulfillment Assessment",
      description: "Evaluate your products for Reliance fulfillment eligibility and profitability",
      icon: <CheckSquare className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "Account Setup",
      description: "Configure fulfillment settings and Reliance logistics preferences",
      icon: <Settings className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "First Shipment",
      description: "Guide you through creating and sending your first fulfillment shipment",
      icon: <Truck className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "Ongoing Support",
      description: "Continuous inventory management and delivery optimization",
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />
    }
  ];

  const successMetrics = [
    { value: "Express", label: "Delivery Badge", description: "Faster delivery" },
    { value: "Same-Day", label: "Delivery Speed", description: "Metro city reach" },
    { value: "350+", label: "Sellers Onboarded", description: "To Reliance fulfillment" },
    { value: "98%", label: "First Shipment Success", description: "No rejections" }
  ];

  const faqs = [
    {
      question: "What is JioMart Fulfillment and how does it work?",
      answer: "JioMart Fulfillment leverages Reliance Retail's extensive logistics network. You send products to their fulfillment centers, and Reliance handles storage, packaging, shipping, and returns. Your products get faster delivery promise and better visibility."
    },
    {
      question: "What are the benefits of using Reliance logistics for JioMart?",
      answer: "Benefits include faster delivery times (same-day and next-day in metro cities), better product visibility on JioMart, access to Reliance's vast retail network, reduced shipping costs, and improved customer trust."
    },
    {
      question: "What are the costs involved in JioMart Fulfillment?",
      answer: "Costs include fulfillment fees (based on product size/weight), storage fees, and optional services. We help you calculate profitability and optimize costs for your specific products on the Reliance network."
    },
    {
      question: "How long does JioMart Fulfillment onboarding take?",
      answer: "Initial setup takes 1-2 weeks including account configuration. Products go live 1-2 weeks after Reliance receives inventory. Total time from start to selling is typically 3-4 weeks."
    },
    {
      question: "Can Reliance Fulfillment help during Jio Sales?",
      answer: "Absolutely! Products fulfilled by Reliance get priority placement during sales, faster delivery promises, and better visibility. We help with pre-sale inventory planning and positioning for maximum sales."
    },
    {
      question: "What happens if products get rejected at the warehouse?",
      answer: "Rejections incur fees and delays. Our onboarding ensures proper labeling, packaging, and quality to minimize rejections. If issues occur, we help with returns and re-shipment coordination."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "JioMart Fulfillment & Reliance Logistics Integration Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional JioMart Fulfillment onboarding and Reliance logistics integration services. Get faster delivery, better visibility, and higher sales with expert warehouse setup.",
    "areaServed": "India",
    "serviceType": "E-commerce Fulfillment"
  };

  return (
    <>
      <SEO
        title="JioMart Fulfillment & Reliance Logistics Integration | Simply Setup"
        description="Expert JioMart Fulfillment and Reliance logistics integration services. Get faster delivery, better visibility with proper warehouse setup and inventory optimization."
        canonicalUrl="https://simplysetup.in/growth/jiomart-account-management/fulfillment"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Navbar />

      <main className="min-h-screen">
        <div className="bg-gray-50 py-3 border-b">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600" data-testid="breadcrumb-nav">
              <Link href="/growth" className="hover:text-blue-600">Growth</Link>
              <span className="mx-2">/</span>
              <Link href="/growth/jiomart-account-management" className="hover:text-blue-600">JioMart Account Management</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Fulfillment & Logistics</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                  <Box className="w-3 h-3 mr-1" /> JioMart Fulfillment Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  JioMart Fulfillment &{" "}
                  <span className="text-blue-600">Reliance Logistics</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Leverage Reliance's powerful logistics network for faster delivery. Our experts handle 
                  everything from account configuration to your first successful warehouse shipment.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700" data-testid="button-start-fulfillment">
                        Start Fulfillment Setup
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Start Your JioMart Fulfillment Journey</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center">
                        <Box className="w-5 h-5 text-blue-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">350+ Sellers Onboarded</p>
                    <p className="text-xs text-gray-500">98% first shipment success rate</p>
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

        <section className="w-full bg-white py-8 border-t border-b border-gray-200 overflow-hidden">
          <div className="max-w-6xl mx-auto px-5">
            <div className="text-center mb-5">
              <h2 className="text-2xl text-gray-900 font-bold mb-1 leading-tight">
                Trusted by Leading Brands
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto my-3 rounded-sm"></div>
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
                Struggling with JioMart Fulfillment?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common fulfillment challenges we solve for JioMart sellers every day
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

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">Get Started with Reliance Logistics</h3>
                <p className="text-gray-600 text-lg">
                  Let our experts help you set up JioMart Fulfillment for faster delivery and better sales.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free fulfillment eligibility assessment</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Complete Reliance integration guidance</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Ongoing inventory support</span>
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
                Complete Fulfillment Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                End-to-end JioMart Fulfillment setup and Reliance logistics management
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

        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Fulfillment Onboarding Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A proven 4-step approach to getting you on Reliance logistics
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    {step.icon}
                  </div>
                  <div className="bg-blue-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3">
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
              <p className="text-gray-600">Explore more JioMart growth services</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/growth/jiomart-account-management/product-listing">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Product Listing</h3>
                    <p className="text-sm text-gray-600">Catalog optimization</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/jiomart-account-management/ads-promotions">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">JioMart Ads</h3>
                    <p className="text-sm text-gray-600">Maximize ad ROI</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/jiomart-account-management/performance-analytics">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Performance Analytics</h3>
                    <p className="text-sm text-gray-600">Seller metrics optimization</p>
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
                  <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-6 border">
                    <AccordionTrigger className="text-left font-semibold hover:no-underline">
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

        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Speed Up Your JioMart Deliveries?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Get your free fulfillment assessment and see how Reliance logistics can transform your delivery speed and sales.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50" data-testid="button-cta-get-started">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Start Your JioMart Fulfillment Journey</DialogTitle>
                </DialogHeader>
                <ZohoFormEmbed />
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
