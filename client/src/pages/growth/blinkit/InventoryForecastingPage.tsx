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
  TrendingUp, 
  ArrowRight,
  Package,
  Clock,
  Target,
  BarChart3,
  Warehouse,
  LineChart,
  AlertTriangle,
  RefreshCw,
  MapPin,
  Calculator,
  Zap,
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

export default function InventoryForecastingPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      problem: "Frequent Stockouts",
      solution: "AI-powered demand prediction to maintain optimal stock levels"
    },
    {
      icon: <Warehouse className="w-6 h-6 text-red-500" />,
      problem: "Poor Dark Store Allocation",
      solution: "Strategic inventory distribution across dark stores"
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-red-500" />,
      problem: "Overstocking Issues",
      solution: "Data-driven reorder points to minimize dead stock"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Slow Replenishment",
      solution: "Automated alerts and streamlined restocking process"
    }
  ];

  const services = [
    {
      icon: <LineChart className="w-8 h-8 text-yellow-600" />,
      title: "Demand Forecasting",
      description: "Predict future demand with data-driven insights",
      features: ["Historical analysis", "Seasonal trends", "Event-based predictions"]
    },
    {
      icon: <Warehouse className="w-8 h-8 text-amber-600" />,
      title: "Dark Store Allocation",
      description: "Optimize inventory across Blinkit dark stores",
      features: ["Location-based distribution", "Demand mapping", "Stock balancing"]
    },
    {
      icon: <Calculator className="w-8 h-8 text-orange-600" />,
      title: "Reorder Point Setup",
      description: "Never run out of stock with smart reorder alerts",
      features: ["Safety stock levels", "Lead time calculation", "Auto-alerts"]
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-green-600" />,
      title: "Stock Optimization",
      description: "Balance inventory to maximize sales and minimize costs",
      features: ["Dead stock reduction", "Turnover optimization", "Working capital efficiency"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: "Performance Analytics",
      description: "Track inventory KPIs and identify improvement areas",
      features: ["Stock-out tracking", "Fill rate monitoring", "Inventory turnover"]
    },
    {
      icon: <MapPin className="w-8 h-8 text-purple-600" />,
      title: "Multi-Store Management",
      description: "Centralized view of inventory across all dark stores",
      features: ["Real-time visibility", "Cross-store transfers", "Unified dashboard"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Data Analysis",
      description: "Analyze historical sales and inventory patterns",
      icon: <BarChart3 className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "2", 
      title: "Demand Modeling",
      description: "Build forecasting models for each SKU and location",
      icon: <LineChart className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "3",
      title: "Allocation Strategy",
      description: "Create dark store distribution plan based on demand",
      icon: <MapPin className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "4",
      title: "Continuous Optimization",
      description: "Monitor, learn, and improve forecasting accuracy",
      icon: <TrendingUp className="w-6 h-6 text-yellow-600" />
    }
  ];

  const successMetrics = [
    { value: "40%", label: "Stockout Reduction", description: "Average improvement" },
    { value: "25%", label: "Inventory Costs", description: "Reduction achieved" },
    { value: "98%", label: "Fill Rate", description: "Target achievement" },
    { value: "2x", label: "Turnover Increase", description: "Inventory velocity" }
  ];

  const faqs = [
    {
      question: "What is dark store inventory management?",
      answer: "Dark stores are mini-warehouses that Blinkit uses for quick delivery. Inventory management involves ensuring the right products are stocked at the right dark stores based on local demand patterns to enable 10-minute deliveries."
    },
    {
      question: "How does demand forecasting help my Blinkit business?",
      answer: "Demand forecasting predicts how much of each product will sell in each location. This helps you stock optimal quantities, avoid stockouts that lose sales, and prevent overstocking that ties up capital and risks expiry."
    },
    {
      question: "How do you determine which dark stores need which products?",
      answer: "We analyze location-specific demand patterns, demographics, seasonality, and historical sales data. Products are allocated based on local consumption patterns, ensuring each dark store has the right mix and quantity."
    },
    {
      question: "What happens if my products frequently go out of stock?",
      answer: "Stockouts on Blinkit hurt your visibility and sales ranking. We set up safety stock levels and automated reorder alerts to ensure replenishment happens before stockouts occur, maintaining your product availability."
    },
    {
      question: "Can you help with seasonal demand planning?",
      answer: "Absolutely! We factor in festivals, seasons, weather patterns, and local events into our forecasting models. This helps you prepare inventory ahead of demand spikes for Diwali, summer, monsoon, etc."
    },
    {
      question: "How quickly can I see improvements in inventory management?",
      answer: "Initial improvements in stock availability are visible within 2-4 weeks. Comprehensive optimization with reduced stockouts and better turnover typically shows results within 6-8 weeks of implementation."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Blinkit Dark Store Inventory & Forecasting Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Blinkit inventory management services including demand forecasting, stock optimization, and dark store allocation for quick commerce excellence.",
    "areaServed": "India",
    "serviceType": "Quick Commerce Inventory Management"
  };

  return (
    <>
      <SEO
        title="Blinkit Dark Store Inventory & Forecasting | Demand Prediction | Simply Setup"
        description="Expert Blinkit inventory management with demand forecasting, stock optimization, and dark store allocation. Reduce stockouts by 40% and optimize working capital."
        canonicalUrl="https://simplysetup.in/growth/blinkit-account-management/inventory-forecasting"
      />

      <Navbar />

      <main className="min-h-screen">
        <div className="bg-gray-50 py-3 border-b">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600">
              <Link href="/growth" className="hover:text-yellow-600">Growth</Link>
              <span className="mx-2">/</span>
              <Link href="/growth/blinkit-account-management" className="hover:text-yellow-600">Blinkit Account Management</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Dark Store Inventory & Forecasting</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-yellow-50 via-white to-amber-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                  <Warehouse className="w-3 h-3 mr-1" /> Inventory Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Dark Store Inventory &{" "}
                  <span className="text-yellow-600">Forecasting</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Never miss a sale due to stockouts. Our AI-powered forecasting ensures optimal 
                  inventory levels across all dark stores for seamless quick commerce operations.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700" data-testid="button-inventory-audit">
                        Get Inventory Audit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free Inventory Audit</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-yellow-100 border-2 border-white flex items-center justify-center">
                        <Package className="w-5 h-5 text-yellow-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">40% Stockout Reduction</p>
                    <p className="text-xs text-gray-500">Average client improvement</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-8 border">
                  <div className="grid grid-cols-2 gap-6">
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="text-center p-4 bg-yellow-50 rounded-xl">
                        <p className="text-3xl font-bold text-yellow-600">{metric.value}</p>
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
              <div className="w-20 h-1 bg-yellow-600 mx-auto my-3 rounded-sm"></div>
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
                Inventory Challenges Hurting Your Sales?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common inventory problems we solve for Blinkit sellers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {painPoints.map((point, index) => (
                <Card key={index} className="border-2 hover:border-yellow-200 transition-colors">
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
                <h3 className="text-3xl font-bold text-gray-900">Optimize Your Inventory Today</h3>
                <p className="text-gray-600 text-lg">
                  Let our experts analyze and optimize your Blinkit inventory strategy.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free inventory health check worth ₹5,000</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Custom forecasting models</span>
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
                End-to-end inventory optimization for your Blinkit dark store operations
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

        <section className="py-16 bg-yellow-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Forecasting Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A data-driven approach to inventory excellence
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    {step.icon}
                  </div>
                  <div className="bg-yellow-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3">
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
              <p className="text-gray-600">Explore more Blinkit growth services</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/growth/blinkit-account-management/express-listing">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Express Listing</h3>
                    <p className="text-sm text-gray-600">Quick product onboarding</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/blinkit-account-management/hyperlocal-promotions">
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
              <Link href="/growth/blinkit-account-management/sla-monitoring">
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

        <section className="py-16 bg-gradient-to-r from-yellow-600 to-amber-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Optimize Your Inventory?
            </h2>
            <p className="text-yellow-100 mb-8 max-w-2xl mx-auto">
              Get a free inventory audit and discover how to reduce stockouts by 40%
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-yellow-600 hover:bg-yellow-50">
                  Get Free Inventory Audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Free Inventory Audit</DialogTitle>
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
