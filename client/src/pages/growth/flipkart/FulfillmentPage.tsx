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

export default function FlipkartFulfillmentPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Warehouse className="w-6 h-6 text-red-500" />,
      problem: "Complex FBF Setup",
      solution: "Step-by-step guidance through Flipkart Fulfillment enrollment"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      problem: "F-Assured Eligibility Issues",
      solution: "Meet all requirements for F-Assured badge and faster delivery promise"
    },
    {
      icon: <Truck className="w-6 h-6 text-red-500" />,
      problem: "Shipment & Inventory Errors",
      solution: "Proper labeling, packaging, and inventory management"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-red-500" />,
      problem: "High Fulfillment Costs",
      solution: "Optimize storage and shipping to reduce overall costs"
    }
  ];

  const services = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "F-Assured Enrollment",
      description: "Get the trusted F-Assured badge on your products",
      features: ["Eligibility assessment", "Quality compliance", "Badge activation"]
    },
    {
      icon: <Warehouse className="w-8 h-8 text-green-600" />,
      title: "FBF (Flipkart Fulfilment)",
      description: "Complete Flipkart warehouse fulfillment setup",
      features: ["Account configuration", "Warehouse selection", "Inbound shipment"]
    },
    {
      icon: <Package className="w-8 h-8 text-purple-600" />,
      title: "Product Preparation",
      description: "Ensure products meet FBF requirements",
      features: ["Labeling guidelines", "Packaging standards", "Quality checks"]
    },
    {
      icon: <Truck className="w-8 h-8 text-orange-600" />,
      title: "Inbound Shipment",
      description: "Optimized shipment to Flipkart warehouses",
      features: ["Shipment planning", "Box labeling", "Carrier coordination"]
    },
    {
      icon: <MapPin className="w-8 h-8 text-indigo-600" />,
      title: "Warehouse Strategy",
      description: "Optimize inventory across fulfillment centers",
      features: ["Location optimization", "Inventory distribution", "Storage planning"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-pink-600" />,
      title: "Inventory Management",
      description: "Ongoing FBF inventory optimization",
      features: ["Restock alerts", "Storage fee monitoring", "Stock reconciliation"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "FBF Assessment",
      description: "Evaluate your products for FBF eligibility and profitability",
      icon: <CheckSquare className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "Account Setup",
      description: "Configure FBF settings and fulfillment preferences",
      icon: <Settings className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "First Shipment",
      description: "Guide you through creating and sending your first FBF shipment",
      icon: <Truck className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "Ongoing Support",
      description: "Continuous inventory management and optimization",
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />
    }
  ];

  const successMetrics = [
    { value: "F-Assured", label: "Badge Eligibility", description: "Instant credibility" },
    { value: "1-Day", label: "Delivery Speed", description: "Metro city reach" },
    { value: "400+", label: "Sellers Onboarded", description: "To FBF" },
    { value: "99%", label: "First Shipment Success", description: "No rejections" }
  ];

  const faqs = [
    {
      question: "What is Flipkart Fulfillment (FBF)?",
      answer: "FBF (Flipkart Fulfillment by Flipkart) is a service where you send products to Flipkart's warehouses. Flipkart handles storage, packaging, shipping, and returns. Your products get F-Assured badge and faster delivery promise."
    },
    {
      question: "What is F-Assured and how do I get it?",
      answer: "F-Assured is Flipkart's quality assurance badge indicating fast, reliable delivery and genuine products. You can get it through FBF enrollment or by meeting Flipkart's seller-fulfilled criteria including SLA compliance and quality standards."
    },
    {
      question: "What are the costs involved in FBF?",
      answer: "FBF fees include fulfillment fees (based on product size/weight), storage fees (per cubic foot), and optional services. We help you calculate profitability and optimize costs for your specific products."
    },
    {
      question: "How long does FBF onboarding take?",
      answer: "Initial setup takes 1-2 weeks including account configuration. Products go live 1-2 weeks after Flipkart receives inventory. Total time from start to selling is typically 3-4 weeks."
    },
    {
      question: "Can FBF help during Big Billion Days?",
      answer: "Absolutely! FBF products get priority placement during sales, faster delivery promises, and better visibility. We help with pre-sale inventory planning and positioning for maximum sales."
    },
    {
      question: "What happens if products get rejected at the warehouse?",
      answer: "Rejections incur fees and delays. Our onboarding ensures proper labeling, packaging, and quality to minimize rejections. If issues occur, we help with returns and re-shipment coordination."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Flipkart Fulfillment (FBF) & F-Assured Onboarding Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Flipkart Fulfillment (FBF) onboarding and F-Assured enrollment services. Get faster delivery, better visibility, and higher sales with expert warehouse setup.",
    "areaServed": "India",
    "serviceType": "E-commerce Fulfillment"
  };

  return (
    <>
      <SEO
        title="Flipkart Fulfillment (FBF) & F-Assured Onboarding | Simply Setup"
        description="Expert Flipkart Fulfillment and F-Assured enrollment services. Get faster delivery, better visibility with proper FBF setup, warehouse management, and inventory optimization."
        canonicalUrl="https://simplysetup.in/growth/flipkart-account-management/fulfillment"
      />

      <Navbar />

      <main className="min-h-screen">
        <div className="bg-gray-50 py-3 border-b">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600">
              <Link href="/growth" className="hover:text-blue-600">Growth</Link>
              <span className="mx-2">/</span>
              <Link href="/growth/flipkart-account-management" className="hover:text-blue-600">Flipkart Account Management</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Fulfillment (F-Assured / FBF)</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                  <Box className="w-3 h-3 mr-1" /> Flipkart Fulfillment Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Flipkart Fulfillment{" "}
                  <span className="text-blue-600">(F-Assured / FBF)</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Get your products F-Assured with hassle-free FBF setup. Our experts handle 
                  everything from account configuration to your first successful warehouse shipment.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700" data-testid="button-start-fbf">
                        Start FBF Onboarding
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Start Your Flipkart Fulfillment Journey</DialogTitle>
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
                    <p className="text-sm font-semibold text-gray-900">400+ Sellers Onboarded</p>
                    <p className="text-xs text-gray-500">99% first shipment success rate</p>
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
                Struggling with Flipkart Fulfillment?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common fulfillment challenges we solve for Flipkart sellers every day
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
                <h3 className="text-3xl font-bold text-gray-900">Get F-Assured Today</h3>
                <p className="text-gray-600 text-lg">
                  Let our experts help you set up Flipkart Fulfillment for faster delivery and better sales.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free FBF eligibility assessment</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Complete setup guidance</span>
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
                End-to-end Flipkart Fulfillment setup and management
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
                Our FBF Onboarding Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A proven 4-step approach to getting you F-Assured
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
              <p className="text-gray-600">Explore more Flipkart growth services</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/growth/flipkart-account-management/product-listing">
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
              <Link href="/growth/flipkart-account-management/ads-promotions">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Flipkart Ads</h3>
                    <p className="text-sm text-gray-600">Maximize ad ROI</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/flipkart-account-management/performance-analytics">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Performance Analytics</h3>
                    <p className="text-sm text-gray-600">Seller score optimization</p>
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

        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get F-Assured?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Get started with Flipkart Fulfillment and boost your sales with faster delivery
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                  Start FBF Onboarding
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Start Your Flipkart Fulfillment Journey</DialogTitle>
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
