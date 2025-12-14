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
  Warehouse,
  MapPin,
  AlertTriangle,
  LineChart,
  Boxes,
  RefreshCw
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
      solution: "AI-powered demand forecasting to prevent out-of-stock situations"
    },
    {
      icon: <Warehouse className="w-6 h-6 text-red-500" />,
      problem: "Dark Store Imbalance",
      solution: "Optimal stock allocation across multiple Zepto dark stores"
    },
    {
      icon: <MapPin className="w-6 h-6 text-red-500" />,
      problem: "Micro-Market Blind Spots",
      solution: "Hyperlocal demand analysis for each delivery zone"
    },
    {
      icon: <LineChart className="w-6 h-6 text-red-500" />,
      problem: "Inaccurate Demand Planning",
      solution: "Data-driven forecasting based on historical patterns"
    }
  ];

  const services = [
    {
      icon: <LineChart className="w-8 h-8 text-purple-600" />,
      title: "Demand Forecasting",
      description: "AI-powered prediction of product demand patterns",
      features: ["Historical data analysis", "Seasonal trend identification", "Event-based forecasting"]
    },
    {
      icon: <Warehouse className="w-8 h-8 text-violet-600" />,
      title: "Dark Store Allocation",
      description: "Optimize inventory across Zepto's dark store network",
      features: ["Store-wise planning", "Transfer recommendations", "Capacity optimization"]
    },
    {
      icon: <MapPin className="w-8 h-8 text-purple-600" />,
      title: "Micro-Market Analysis",
      description: "Understand demand at the neighborhood level",
      features: ["Zone-wise demand mapping", "Customer behavior analysis", "Location intelligence"]
    },
    {
      icon: <Boxes className="w-8 h-8 text-fuchsia-600" />,
      title: "Stock Level Optimization",
      description: "Maintain optimal inventory levels at all times",
      features: ["Safety stock calculation", "Reorder point alerts", "Dead stock identification"]
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-indigo-600" />,
      title: "Replenishment Planning",
      description: "Automated inventory replenishment recommendations",
      features: ["Auto-replenishment triggers", "Lead time optimization", "Supplier coordination"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
      title: "Performance Analytics",
      description: "Track and improve inventory performance metrics",
      features: ["Fill rate tracking", "Inventory turnover", "Cost optimization"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Data Collection",
      description: "Gather historical sales, inventory, and demand data from Zepto",
      icon: <FileText className="w-6 h-6 text-purple-600" />
    },
    {
      step: "2", 
      title: "Demand Analysis",
      description: "Analyze patterns, seasonality, and micro-market trends",
      icon: <LineChart className="w-6 h-6 text-purple-600" />
    },
    {
      step: "3",
      title: "Forecasting Model",
      description: "Build predictive models for accurate demand forecasting",
      icon: <Target className="w-6 h-6 text-purple-600" />
    },
    {
      step: "4",
      title: "Optimize & Execute",
      description: "Implement recommendations and monitor performance",
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />
    }
  ];

  const successMetrics = [
    { value: "40%", label: "Stockout Reduction", description: "Average improvement" },
    { value: "25%", label: "Inventory Cost Savings", description: "Through optimization" },
    { value: "95%", label: "Fill Rate Achieved", description: "Across dark stores" },
    { value: "3x", label: "Faster Replenishment", description: "Decision making" }
  ];

  const faqs = [
    {
      question: "How does inventory forecasting help my Zepto business?",
      answer: "Accurate inventory forecasting prevents stockouts (lost sales) and overstocking (blocked capital). For Zepto's 10-minute delivery model, having the right products at the right dark store is critical for success and customer satisfaction."
    },
    {
      question: "What data do you need for demand forecasting?",
      answer: "We analyze your historical sales data, inventory levels, seasonal patterns, promotional calendars, and Zepto-specific metrics like zone-wise demand. The more data available, the more accurate our forecasting models become."
    },
    {
      question: "How do you handle multiple dark store locations?",
      answer: "We create location-specific forecasts for each Zepto dark store, considering local demand patterns, demographics, and delivery zone characteristics. This ensures optimal stock allocation across your entire network."
    },
    {
      question: "What is micro-market demand analysis?",
      answer: "Micro-market analysis examines demand at the neighborhood or pin code level. This hyperlocal approach helps understand which products sell better in specific areas, enabling targeted inventory decisions for each Zepto dark store."
    },
    {
      question: "How quickly can I see results from inventory optimization?",
      answer: "Most sellers see measurable improvements within 4-6 weeks of implementing our recommendations. Stockout rates typically decrease by 30-40%, and inventory carrying costs reduce significantly."
    },
    {
      question: "Do you provide ongoing forecasting support?",
      answer: "Yes, we offer continuous forecasting services with regular model updates based on new data. Our team monitors performance, adjusts predictions for seasonal changes, and provides monthly optimization recommendations."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Zepto Dark Store Inventory & Forecasting Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Zepto inventory forecasting and dark store optimization services including demand planning, stock allocation, and micro-market analysis for quick commerce success.",
    "areaServed": "India",
    "serviceType": "Quick Commerce Inventory Management"
  };

  return (
    <>
      <SEO
        title="Zepto Dark Store Inventory & Forecasting | Stock Planning | Simply Setup"
        description="Optimize your Zepto inventory with AI-powered demand forecasting. Expert dark store allocation, micro-market analysis, and stock planning for 10-minute delivery success."
        canonicalUrl="https://simplysetup.in/growth/zepto-account-management/inventory-forecasting"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Navbar />

      <main className="min-h-screen">
        <div className="bg-gray-50 py-3 border-b">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600">
              <Link href="/growth" className="hover:text-purple-600">Growth</Link>
              <span className="mx-2">/</span>
              <Link href="/growth/zepto-account-management" className="hover:text-purple-600">Zepto Account Management</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Inventory & Forecasting</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-purple-50 via-white to-violet-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                  <Warehouse className="w-3 h-3 mr-1" /> Dark Store Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Dark Store Inventory &{" "}
                  <span className="text-purple-600">Forecasting</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Never miss a sale due to stockouts. Our AI-powered inventory forecasting ensures 
                  optimal stock levels across all Zepto dark stores for flawless 10-minute delivery.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-purple-600 hover:bg-purple-700" data-testid="button-inventory-forecasting">
                        Optimize Inventory
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Inventory Optimization for Zepto</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center">
                        <Package className="w-5 h-5 text-purple-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">40% Stockout Reduction</p>
                    <p className="text-xs text-gray-500">Average improvement for clients</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-8 border">
                  <div className="grid grid-cols-2 gap-6">
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="text-center p-4 bg-purple-50 rounded-xl">
                        <p className="text-3xl font-bold text-purple-600">{metric.value}</p>
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
              <div className="w-20 h-1 bg-purple-600 mx-auto my-3 rounded-sm"></div>
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
                Inventory Challenges We Solve
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common inventory problems for quick commerce sellers on Zepto
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {painPoints.map((point, index) => (
                <Card key={index} className="border-2 hover:border-purple-200 transition-colors">
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
                <h3 className="text-3xl font-bold text-gray-900">Optimize Your Zepto Inventory</h3>
                <p className="text-gray-600 text-lg">
                  Get AI-powered inventory planning for your Zepto dark store operations.
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
                    <span className="text-gray-700">Dark store optimization strategy</span>
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
                End-to-end inventory optimization for your Zepto quick commerce success
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

        <section className="py-16 bg-purple-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Inventory Optimization Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A data-driven 4-step approach to optimize your Zepto inventory
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    {step.icon}
                  </div>
                  <div className="bg-purple-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3">
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
              <p className="text-gray-600">Explore more Zepto growth services</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/growth/zepto-account-management/express-listing">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Express Listing</h3>
                    <p className="text-sm text-gray-600">Quick product setup</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/zepto-account-management/hyperlocal-promotions">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-fuchsia-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-6 h-6 text-fuchsia-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Hyperlocal Promotions</h3>
                    <p className="text-sm text-gray-600">Location-based offers</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/zepto-account-management/sla-monitoring">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-6 h-6 text-violet-600" />
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

        <section className="py-16 bg-purple-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Optimize Your Zepto Inventory?
            </h2>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              Get AI-powered inventory forecasting and dark store optimization for your Zepto business.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100" data-testid="button-cta-inventory">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Inventory Optimization for Zepto</DialogTitle>
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
