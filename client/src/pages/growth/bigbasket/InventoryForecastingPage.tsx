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
  ShoppingCart,
  Calendar,
  Thermometer
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
      solution: "Strategic inventory distribution across BigBasket fulfillment centers"
    },
    {
      icon: <Calendar className="w-6 h-6 text-red-500" />,
      problem: "Expiry & Wastage Issues",
      solution: "FIFO management and expiry-based demand forecasting"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Slow Replenishment",
      solution: "Automated alerts and streamlined restocking process"
    }
  ];

  const services = [
    {
      icon: <LineChart className="w-8 h-8 text-green-600" />,
      title: "Demand Forecasting",
      description: "Predict future grocery demand with data-driven insights",
      features: ["Historical analysis", "Seasonal trends", "Festival-based predictions"]
    },
    {
      icon: <Warehouse className="w-8 h-8 text-emerald-600" />,
      title: "Dark Store Allocation",
      description: "Optimize inventory across BigBasket fulfillment centers",
      features: ["Location-based distribution", "Demand mapping", "Stock balancing"]
    },
    {
      icon: <Calendar className="w-8 h-8 text-lime-600" />,
      title: "Expiry Management",
      description: "Minimize wastage with smart expiry tracking",
      features: ["Batch-wise monitoring", "FIFO implementation", "Expiry alerts"]
    },
    {
      icon: <Calculator className="w-8 h-8 text-teal-600" />,
      title: "Reorder Point Setup",
      description: "Never run out of stock with smart reorder alerts",
      features: ["Safety stock levels", "Lead time calculation", "Auto-alerts"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-green-700" />,
      title: "Performance Analytics",
      description: "Track inventory KPIs and identify improvement areas",
      features: ["Stock-out tracking", "Fill rate monitoring", "Turnover analysis"]
    },
    {
      icon: <Thermometer className="w-8 h-8 text-emerald-700" />,
      title: "Perishable Goods Management",
      description: "Special handling for fresh produce and dairy",
      features: ["Cold chain tracking", "Freshness monitoring", "Quality alerts"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Data Analysis",
      description: "Analyze historical sales and inventory patterns for your grocery products",
      icon: <BarChart3 className="w-6 h-6 text-green-600" />
    },
    {
      step: "2", 
      title: "Demand Modeling",
      description: "Build forecasting models for each SKU considering seasonality and shelf life",
      icon: <LineChart className="w-6 h-6 text-green-600" />
    },
    {
      step: "3",
      title: "Allocation Strategy",
      description: "Create distribution plan based on regional demand patterns",
      icon: <MapPin className="w-6 h-6 text-green-600" />
    },
    {
      step: "4",
      title: "Continuous Optimization",
      description: "Monitor, learn, and improve forecasting accuracy",
      icon: <TrendingUp className="w-6 h-6 text-green-600" />
    }
  ];

  const successMetrics = [
    { value: "45%", label: "Stockout Reduction", description: "Average improvement" },
    { value: "35%", label: "Wastage Reduced", description: "Expiry management" },
    { value: "98%", label: "Fill Rate", description: "Target achievement" },
    { value: "2.5x", label: "Turnover Increase", description: "Inventory velocity" }
  ];

  const faqs = [
    {
      question: "What is BigBasket dark store inventory management?",
      answer: "BigBasket operates through fulfillment centers and dark stores for quick grocery delivery. Inventory management involves ensuring the right products are stocked at the right locations based on local demand patterns to enable fast deliveries and minimize wastage."
    },
    {
      question: "How does demand forecasting help my grocery business?",
      answer: "Demand forecasting predicts how much of each product will sell in each location, accounting for seasonality, festivals, and expiry dates. This helps you stock optimal quantities, avoid stockouts, and prevent wastage from expired products."
    },
    {
      question: "How do you manage perishable inventory differently?",
      answer: "For perishables, we implement FIFO (First In, First Out) strictly, set shorter reorder cycles, monitor expiry dates actively, and adjust forecasting to account for shorter shelf life. We also factor in cold chain requirements and freshness expectations."
    },
    {
      question: "What happens if my products frequently expire before selling?",
      answer: "We analyze expiry patterns and adjust inventory levels to match actual demand velocity. We implement batch-wise tracking, set up expiry alerts, and recommend promotional strategies for products nearing expiry to minimize wastage."
    },
    {
      question: "Can you help with seasonal demand planning for grocery?",
      answer: "Absolutely! We factor in festivals (Diwali, Holi, etc.), seasons, weather patterns, and local events. For example, we'll help you stock up on specific items before festivals and adjust for monsoon or summer demand changes."
    },
    {
      question: "How quickly can I see improvements in inventory management?",
      answer: "Initial improvements in stock availability are visible within 2-4 weeks. Comprehensive optimization with reduced stockouts, lower wastage, and better turnover typically shows results within 6-8 weeks of implementation."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "BigBasket Inventory & Demand Forecasting Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional BigBasket inventory management services including demand forecasting, stock optimization, expiry management, and dark store allocation for grocery marketplace excellence.",
    "areaServed": "India",
    "serviceType": "Grocery Marketplace Inventory Management"
  };

  return (
    <>
      <SEO
        title="BigBasket Inventory & Demand Forecasting | Stock Optimization | Simply Setup"
        description="Expert BigBasket inventory management with demand forecasting, expiry tracking, and stock optimization. Reduce stockouts by 45% and minimize wastage for grocery marketplace success."
        canonicalUrl="https://simplysetup.in/growth/bigbasket-account-management/inventory-forecasting"
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
              <span className="text-gray-900">Inventory & Demand Forecasting</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  <Warehouse className="w-3 h-3 mr-1" /> Inventory Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Inventory &{" "}
                  <span className="text-green-600">Demand Forecasting</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Never miss a sale due to stockouts or lose products to expiry. Our AI-powered forecasting ensures optimal 
                  inventory levels across all BigBasket fulfillment centers for seamless grocery operations.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-green-600 hover:bg-green-700" data-testid="button-inventory-audit">
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
                      <div key={i} className="w-10 h-10 rounded-full bg-green-100 border-2 border-white flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 text-green-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">300+ FMCG Brands Trust Us</p>
                    <p className="text-xs text-gray-500">45% average stockout reduction</p>
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
                Struggling with Inventory on BigBasket?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common inventory challenges we solve for grocery marketplace sellers
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
                <h3 className="text-3xl font-bold text-gray-900">Optimize Your Inventory Today</h3>
                <p className="text-gray-600 text-lg">
                  Let our experts help you reduce stockouts, minimize wastage, and improve inventory turnover.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free inventory audit worth ₹7,500</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">AI-powered demand forecasting</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Expiry & wastage reduction strategy</span>
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
                End-to-end inventory optimization for your BigBasket grocery success
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
                Our Inventory Optimization Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A data-driven approach to maximize your BigBasket inventory efficiency
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
              <Link href="/growth/bigbasket-account-management/express-listing">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Express Listing</h3>
                    <p className="text-sm text-gray-600">Quick product onboarding</p>
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
                    <p className="text-sm text-gray-600">Area-specific offers</p>
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
              Ready to Optimize Your Inventory?
            </h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Reduce stockouts by 45% and minimize wastage with our expert inventory management
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-green-50">
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
