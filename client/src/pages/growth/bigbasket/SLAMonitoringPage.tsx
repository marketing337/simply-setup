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
  Truck,
  AlertTriangle,
  Shield,
  Timer,
  FileCheck,
  ShoppingCart,
  Zap,
  Star,
  ThumbsUp,
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

export default function SLAMonitoringPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Timer className="w-6 h-6 text-red-500" />,
      problem: "Missed Delivery SLAs",
      solution: "Real-time monitoring and proactive alerts for SLA compliance"
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      problem: "Quality Issues",
      solution: "Comprehensive quality control checks for fresh produce and packaged goods"
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-red-500" />,
      problem: "High Return Rates",
      solution: "Root cause analysis and process improvements to minimize returns"
    },
    {
      icon: <Star className="w-6 h-6 text-red-500" />,
      problem: "Poor Seller Ratings",
      solution: "Systematic improvement plan to boost customer satisfaction"
    }
  ];

  const services = [
    {
      icon: <Timer className="w-8 h-8 text-green-600" />,
      title: "SLA Compliance Monitoring",
      description: "Track and ensure timely order fulfillment",
      features: ["Real-time tracking", "Deadline alerts", "Compliance reporting"]
    },
    {
      icon: <FileCheck className="w-8 h-8 text-emerald-600" />,
      title: "Quality Control",
      description: "Ensure product quality meets BigBasket standards",
      features: ["Freshness checks", "Packaging verification", "Expiry validation"]
    },
    {
      icon: <Truck className="w-8 h-8 text-lime-600" />,
      title: "Order Fulfillment Optimization",
      description: "Streamline picking, packing, and dispatch processes",
      features: ["Process automation", "Error reduction", "Speed optimization"]
    },
    {
      icon: <ThumbsUp className="w-8 h-8 text-teal-600" />,
      title: "Customer Satisfaction Management",
      description: "Monitor and improve customer experience metrics",
      features: ["Review management", "Issue resolution", "Feedback analysis"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-700" />,
      title: "Account Health Protection",
      description: "Maintain healthy seller account standing",
      features: ["Penalty prevention", "Policy compliance", "Account monitoring"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-emerald-700" />,
      title: "Performance Analytics",
      description: "Data-driven insights for operational excellence",
      features: ["KPI dashboards", "Trend analysis", "Benchmark comparison"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Operations Audit",
      description: "Comprehensive review of current fulfillment processes",
      icon: <FileCheck className="w-6 h-6 text-green-600" />
    },
    {
      step: "2", 
      title: "SLA Setup",
      description: "Configure monitoring systems and alert thresholds",
      icon: <Timer className="w-6 h-6 text-green-600" />
    },
    {
      step: "3",
      title: "Quality Framework",
      description: "Implement quality control checkpoints",
      icon: <Shield className="w-6 h-6 text-green-600" />
    },
    {
      step: "4",
      title: "Continuous Improvement",
      description: "Ongoing optimization based on performance data",
      icon: <TrendingUp className="w-6 h-6 text-green-600" />
    }
  ];

  const successMetrics = [
    { value: "99.5%", label: "SLA Compliance", description: "On-time fulfillment" },
    { value: "60%", label: "Return Reduction", description: "Quality improvements" },
    { value: "4.8★", label: "Avg. Seller Rating", description: "Customer satisfaction" },
    { value: "Zero", label: "Penalties", description: "Account health" }
  ];

  const faqs = [
    {
      question: "What SLAs does BigBasket track for sellers?",
      answer: "BigBasket tracks multiple SLAs including order acceptance time, dispatch time, inventory accuracy, product quality, packaging standards, and customer complaint resolution time. Meeting these SLAs is crucial for maintaining good seller standing and visibility."
    },
    {
      question: "How do you help improve delivery SLA compliance?",
      answer: "We implement real-time order monitoring, set up proactive alerts before SLA breaches, optimize warehouse processes, ensure proper inventory placement, and create contingency plans for peak periods to maintain consistent SLA compliance."
    },
    {
      question: "What quality control measures do you implement?",
      answer: "For grocery products, we implement freshness verification, expiry date checks before dispatch, proper cold chain handling for perishables, packaging quality inspection, and weight/quantity verification to minimize quality-related returns."
    },
    {
      question: "How do you handle high return rates?",
      answer: "We analyze return reasons systematically, identify root causes (damaged products, wrong items, quality issues), implement corrective measures at each stage, and monitor improvement. This typically reduces returns by 50-60%."
    },
    {
      question: "What happens if my seller account health drops?",
      answer: "We immediately identify the factors affecting account health, create a recovery plan, address policy violations or performance gaps, and work with BigBasket support if needed. Our goal is zero penalties and maintained account visibility."
    },
    {
      question: "Do you provide real-time performance dashboards?",
      answer: "Yes, we set up real-time dashboards tracking key metrics like SLA compliance, order accuracy, return rates, customer ratings, and inventory accuracy. You get daily summaries and instant alerts for any issues requiring attention."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "BigBasket Operations & SLA Monitoring Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional BigBasket operations management services including SLA monitoring, order fulfillment optimization, quality control, and seller account health management.",
    "areaServed": "India",
    "serviceType": "Grocery Marketplace Operations Management"
  };

  return (
    <>
      <SEO
        title="BigBasket Operations & SLA Monitoring | Quality Control | Simply Setup"
        description="Expert BigBasket operations management with SLA monitoring, quality control, and order fulfillment optimization. Achieve 99.5% SLA compliance and reduce returns by 60%!"
        canonicalUrl="https://simplysetup.in/growth/bigbasket-account-management/sla-monitoring"
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
              <span className="text-gray-900">Operations & SLA Monitoring</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  <Shield className="w-3 h-3 mr-1" /> Operations Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Operations &{" "}
                  <span className="text-green-600">SLA Monitoring</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Maintain operational excellence on BigBasket with our comprehensive SLA monitoring 
                  and quality control services. Never miss a deadline or compromise on product quality.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-green-600 hover:bg-green-700" data-testid="button-ops-audit">
                        Get Operations Audit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free Operations Audit</DialogTitle>
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
                    <p className="text-sm font-semibold text-gray-900">99.5% SLA Compliance</p>
                    <p className="text-xs text-gray-500">Zero penalty accounts</p>
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
                Struggling with Operations on BigBasket?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common operational challenges we solve for grocery marketplace sellers
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
                <h3 className="text-3xl font-bold text-gray-900">Achieve Operational Excellence</h3>
                <p className="text-gray-600 text-lg">
                  Let our experts optimize your BigBasket operations for maximum efficiency and customer satisfaction.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free operations audit worth ₹7,500</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Real-time SLA monitoring</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Quality control framework</span>
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
                Complete Operations Management Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                End-to-end operational excellence for your BigBasket success
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
                Our Operations Optimization Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A systematic approach to achieve operational excellence on BigBasket
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
              <Link href="/growth/bigbasket-account-management/inventory-forecasting">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Inventory Forecasting</h3>
                    <p className="text-sm text-gray-600">Demand prediction</p>
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
              Ready for Operational Excellence?
            </h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Achieve 99.5% SLA compliance and zero penalties with our expert operations management
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-green-50">
                  Get Operations Audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Free Operations Audit</DialogTitle>
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
