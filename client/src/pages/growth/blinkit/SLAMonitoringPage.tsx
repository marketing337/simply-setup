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
  Timer,
  AlertTriangle,
  CheckSquare,
  LineChart,
  Shield,
  Zap,
  Warehouse,
  Gauge,
  ClipboardCheck
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
      problem: "Delivery SLA Breaches",
      solution: "Proactive monitoring to maintain 10-minute delivery compliance"
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      problem: "Order Accuracy Issues",
      solution: "Quality checks and fulfillment process optimization"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-red-500" />,
      problem: "Poor Seller Metrics",
      solution: "Performance improvement strategies to boost ratings"
    },
    {
      icon: <Package className="w-6 h-6 text-red-500" />,
      problem: "High Cancellation Rate",
      solution: "Root cause analysis and inventory sync improvements"
    }
  ];

  const services = [
    {
      icon: <Timer className="w-8 h-8 text-yellow-600" />,
      title: "Delivery Time Monitoring",
      description: "Track and maintain 10-minute delivery promise",
      features: ["Real-time SLA tracking", "Breach alerts", "Route optimization support"]
    },
    {
      icon: <CheckSquare className="w-8 h-8 text-amber-600" />,
      title: "Order Accuracy Tracking",
      description: "Ensure correct items reach customers every time",
      features: ["Quality check protocols", "Error pattern analysis", "Process improvements"]
    },
    {
      icon: <Gauge className="w-8 h-8 text-orange-600" />,
      title: "Performance Metrics",
      description: "Comprehensive dashboard for all seller KPIs",
      features: ["Fill rate monitoring", "Cancellation tracking", "Rating management"]
    },
    {
      icon: <LineChart className="w-8 h-8 text-green-600" />,
      title: "Analytics & Reporting",
      description: "Data-driven insights for continuous improvement",
      features: ["Weekly reports", "Trend analysis", "Benchmark comparison"]
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Compliance Management",
      description: "Stay compliant with Blinkit seller guidelines",
      features: ["Policy updates", "Document management", "Audit preparation"]
    },
    {
      icon: <ClipboardCheck className="w-8 h-8 text-purple-600" />,
      title: "Operational Excellence",
      description: "End-to-end operations optimization",
      features: ["Process audits", "Staff training", "SOP development"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Operations Audit",
      description: "Comprehensive review of current performance metrics",
      icon: <ClipboardCheck className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "2", 
      title: "Gap Identification",
      description: "Identify SLA breaches and performance bottlenecks",
      icon: <AlertTriangle className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "3",
      title: "Process Optimization",
      description: "Implement improvements for faster, accurate fulfillment",
      icon: <Gauge className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "4",
      title: "Continuous Monitoring",
      description: "Ongoing tracking with real-time alerts and reporting",
      icon: <TrendingUp className="w-6 h-6 text-yellow-600" />
    }
  ];

  const successMetrics = [
    { value: "99%", label: "SLA Compliance", description: "Delivery on time" },
    { value: "98%", label: "Order Accuracy", description: "Correct fulfillment" },
    { value: "<2%", label: "Cancellation Rate", description: "Industry best" },
    { value: "4.8★", label: "Avg. Rating", description: "Seller score" }
  ];

  const faqs = [
    {
      question: "What is 10-minute delivery SLA on Blinkit?",
      answer: "Blinkit promises customers delivery within 10 minutes. As a seller, your products must be properly stocked and ready for quick picking. SLA compliance measures how often orders are fulfilled within this timeframe from your inventory."
    },
    {
      question: "How do you monitor delivery SLA compliance?",
      answer: "We set up real-time dashboards tracking every order's fulfillment time. Automated alerts notify you of potential breaches before they happen, allowing proactive action. Weekly reports show trends and improvement areas."
    },
    {
      question: "What causes SLA breaches on Blinkit?",
      answer: "Common causes include stockouts, inventory sync issues, wrong product placement in dark stores, incomplete product information, and quality check failures. We identify root causes and implement preventive measures."
    },
    {
      question: "How important are seller ratings on Blinkit?",
      answer: "Critical! Seller ratings affect your product visibility, search ranking, and customer trust. Low ratings can lead to reduced visibility or account suspension. We help maintain 4.5+ ratings through operational excellence."
    },
    {
      question: "What is order accuracy rate?",
      answer: "Order accuracy measures how often the correct products (right item, right quantity, right quality) reach customers. On quick commerce, even small errors hurt ratings significantly. We aim for 98%+ accuracy through process improvements."
    },
    {
      question: "How quickly can I see improvements in my metrics?",
      answer: "Initial improvements in SLA compliance are visible within 1-2 weeks after implementing our recommendations. Sustained metric improvements across all KPIs typically take 4-6 weeks of consistent monitoring and optimization."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Blinkit Operations & SLA Monitoring Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Blinkit SLA monitoring services including 10-minute delivery compliance, order accuracy tracking, and performance optimization for quick commerce excellence.",
    "areaServed": "India",
    "serviceType": "Quick Commerce Operations Management"
  };

  return (
    <>
      <SEO
        title="Blinkit Operations & SLA Monitoring | 10-Min Delivery Compliance | Simply Setup"
        description="Expert Blinkit SLA monitoring with 10-minute delivery compliance, order accuracy tracking, and performance optimization. Achieve 99% SLA compliance and 4.8+ seller rating."
        canonicalUrl="https://simplysetup.in/growth/blinkit-account-management/sla-monitoring"
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
              <span className="text-gray-900">Operations & SLA Monitoring</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-yellow-50 via-white to-amber-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                  <Gauge className="w-3 h-3 mr-1" /> Operations Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Operations &{" "}
                  <span className="text-yellow-600">SLA Monitoring</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Master the 10-minute delivery game with expert operations monitoring. We ensure 
                  your Blinkit store maintains top-tier performance metrics and seller ratings.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700" data-testid="button-ops-audit">
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
                      <div key={i} className="w-10 h-10 rounded-full bg-yellow-100 border-2 border-white flex items-center justify-center">
                        <Timer className="w-5 h-5 text-yellow-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">99% SLA Compliance</p>
                    <p className="text-xs text-gray-500">10-minute delivery on time</p>
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
                Struggling with Blinkit Operations?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common operational challenges we solve for quick commerce sellers
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
                <h3 className="text-3xl font-bold text-gray-900">Optimize Your Operations Today</h3>
                <p className="text-gray-600 text-lg">
                  Let our experts audit and optimize your Blinkit operations for peak performance.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free operations audit worth ₹5,000</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Real-time SLA monitoring dashboard</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Weekly performance reports</span>
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
                End-to-end operational excellence for your Blinkit business
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
                Our Monitoring Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A systematic approach to operational excellence
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
              <Link href="/growth/blinkit-account-management/inventory-forecasting">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Warehouse className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Inventory Forecasting</h3>
                    <p className="text-sm text-gray-600">Dark store optimization</p>
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
              Ready to Master 10-Minute Delivery?
            </h2>
            <p className="text-yellow-100 mb-8 max-w-2xl mx-auto">
              Get a free operations audit and achieve 99% SLA compliance
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-yellow-600 hover:bg-yellow-50">
                  Get Free Operations Audit
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
