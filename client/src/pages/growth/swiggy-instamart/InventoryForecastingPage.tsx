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
  Warehouse,
  MapPin,
  RefreshCw,
  AlertTriangle,
  LineChart,
  Boxes
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

export default function InventoryForecastingPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      problem: "Frequent Stockouts",
      solution: "AI-powered demand forecasting to maintain optimal inventory levels"
    },
    {
      icon: <Warehouse className="w-6 h-6 text-red-500" />,
      problem: "Dark Store Misallocation",
      solution: "Strategic inventory distribution across Instamart dark stores"
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-red-500" />,
      problem: "Overstocking Issues",
      solution: "Data-driven stock optimization to reduce holding costs"
    },
    {
      icon: <MapPin className="w-6 h-6 text-red-500" />,
      problem: "Location Mismatch",
      solution: "Hyperlocal demand analysis for precise store allocation"
    }
  ];

  const services = [
    {
      icon: <LineChart className="w-8 h-8 text-orange-600" />,
      title: "Demand Forecasting",
      description: "AI-powered predictions for accurate inventory planning on Instamart",
      features: ["Historical data analysis", "Seasonal trend prediction", "Event-based forecasting"]
    },
    {
      icon: <Warehouse className="w-8 h-8 text-red-600" />,
      title: "Dark Store Optimization",
      description: "Strategic inventory allocation across Instamart dark store network",
      features: ["Store-wise allocation", "Capacity planning", "Replenishment scheduling"]
    },
    {
      icon: <Boxes className="w-8 h-8 text-orange-500" />,
      title: "Stock Level Management",
      description: "Maintain optimal stock levels to maximize sales and minimize waste",
      features: ["Safety stock calculation", "Reorder point optimization", "Dead stock prevention"]
    },
    {
      icon: <MapPin className="w-8 h-8 text-green-600" />,
      title: "Location-Based Planning",
      description: "Hyperlocal inventory strategies based on area-specific demand",
      features: ["Zone-wise analysis", "Demographics mapping", "Local event tracking"]
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-blue-600" />,
      title: "Replenishment Automation",
      description: "Automated inventory replenishment triggers and alerts",
      features: ["Auto-replenishment setup", "Alert notifications", "Supplier coordination"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
      title: "Performance Analytics",
      description: "Comprehensive inventory performance monitoring and reporting",
      features: ["Turnover metrics", "Fill rate tracking", "Wastage analysis"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Data Collection",
      description: "Gather historical sales data and analyze demand patterns on Instamart",
      icon: <Search className="w-6 h-6 text-orange-600" />
    },
    {
      step: "2", 
      title: "Demand Analysis",
      description: "Use AI models to forecast future demand across dark stores",
      icon: <LineChart className="w-6 h-6 text-orange-600" />
    },
    {
      step: "3",
      title: "Allocation Strategy",
      description: "Develop optimal inventory distribution plan per location",
      icon: <Warehouse className="w-6 h-6 text-orange-600" />
    },
    {
      step: "4",
      title: "Monitor & Optimize",
      description: "Continuously track performance and refine forecasts",
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />
    }
  ];

  const successMetrics = [
    { value: "35%", label: "Stockout Reduction", description: "Average improvement" },
    { value: "92%", label: "Forecast Accuracy", description: "Demand prediction" },
    { value: "25%", label: "Inventory Cost Savings", description: "Reduced holding" },
    { value: "40+", label: "Dark Stores Optimized", description: "Across cities" }
  ];

  const faqs = [
    {
      question: "How does demand forecasting work for Swiggy Instamart?",
      answer: "We use AI-powered models that analyze your historical sales data, seasonal trends, local events, and market patterns to predict future demand. This helps you stock the right products in the right quantities at each dark store location."
    },
    {
      question: "What is dark store inventory optimization?",
      answer: "Dark stores are Instamart's fulfillment centers. Our optimization service ensures each dark store has the right inventory mix based on local demand patterns, reducing stockouts while minimizing overstocking and wastage."
    },
    {
      question: "How quickly can I see results from inventory optimization?",
      answer: "Most sellers see significant improvements within 4-6 weeks. You'll notice reduced stockouts, better fill rates, and lower inventory carrying costs as the forecasting models learn your specific demand patterns."
    },
    {
      question: "Can you help with perishable product inventory?",
      answer: "Absolutely. We have specialized models for perishable goods that factor in shelf life, seasonal demand, and local consumption patterns. This is crucial for quick commerce where freshness is paramount."
    },
    {
      question: "How do you handle seasonal demand variations?",
      answer: "Our forecasting models incorporate historical seasonal patterns, festival calendars, and market trends. We also factor in local events and weather patterns that can affect demand in specific areas."
    },
    {
      question: "Do you integrate with our existing inventory systems?",
      answer: "Yes, we can work with your existing inventory management systems and ERP. Our team helps set up data flows and dashboards that give you real-time visibility into inventory performance across all Instamart dark stores."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Swiggy Instamart Inventory Forecasting & Dark Store Optimization",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional inventory forecasting and dark store optimization services for Swiggy Instamart sellers. AI-powered demand prediction, stock optimization, and strategic store allocation.",
    "areaServed": "India",
    "serviceType": "Inventory Management Services"
  };

  return (
    <>
      <SEO
        title="Swiggy Instamart Inventory Forecasting & Dark Store Optimization | Simply Setup"
        description="Optimize your Swiggy Instamart inventory with AI-powered demand forecasting. Reduce stockouts, optimize dark store allocation, and maximize quick commerce success. Get expert inventory management!"
        canonicalUrl="https://simplysetup.in/growth/swiggy-instamart-account-management/inventory-forecasting"
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
              <span className="text-gray-900">Inventory Forecasting</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-orange-50 via-white to-red-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  <Warehouse className="w-3 h-3 mr-1" /> Instamart Inventory Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Dark Store Inventory &{" "}
                  <span className="text-orange-600">Forecasting</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Optimize your Swiggy Instamart inventory with AI-powered demand forecasting. 
                  Never miss a sale due to stockouts or waste money on overstocking.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-orange-600 hover:bg-orange-700" data-testid="button-inventory-optimization">
                        Optimize Inventory Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Inventory Optimization for Instamart</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center">
                        <Warehouse className="w-5 h-5 text-orange-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">40+ Dark Stores Optimized</p>
                    <p className="text-xs text-gray-500">92% forecast accuracy</p>
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
                Common Instamart Inventory Challenges
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Inventory problems we solve for Swiggy Instamart sellers
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
                <h3 className="text-3xl font-bold text-gray-900">Optimize Your Instamart Inventory</h3>
                <p className="text-gray-600 text-lg">
                  Let our experts help you master inventory management for Swiggy Instamart's quick commerce model.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free inventory health audit</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">AI-powered demand forecasting</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Dark store allocation strategy</span>
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
                Complete Inventory Management Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                End-to-end inventory optimization for Swiggy Instamart success
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
                Our Inventory Optimization Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A data-driven approach to perfect your Instamart inventory management
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
              <Link href="/growth/swiggy-instamart-account-management/express-listing">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Express Listing</h3>
                    <p className="text-sm text-gray-600">Quick product onboarding</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/swiggy-instamart-account-management/hyperlocal-promotions">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-6 h-6 text-red-600" />
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
              Ready to Optimize Your Instamart Inventory?
            </h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Stop losing sales to stockouts. Let our experts help you master inventory 
              management for Swiggy Instamart's quick commerce model.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100" data-testid="button-cta-inventory">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Optimize Your Instamart Inventory</DialogTitle>
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
