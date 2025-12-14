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
  Clock,
  Target,
  BarChart3,
  AlertTriangle,
  Timer,
  ShieldCheck,
  Activity,
  ClipboardCheck,
  Gauge,
  FileCheck,
  Truck
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
      solution: "Real-time monitoring to ensure 10-20 minute delivery compliance"
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      problem: "Order Cancellations",
      solution: "Proactive issue detection to minimize order failures"
    },
    {
      icon: <ClipboardCheck className="w-6 h-6 text-red-500" />,
      problem: "Poor Fill Rates",
      solution: "Stock availability monitoring for higher order fulfillment"
    },
    {
      icon: <Gauge className="w-6 h-6 text-red-500" />,
      problem: "Performance Penalties",
      solution: "SLA compliance tracking to avoid platform penalties"
    }
  ];

  const services = [
    {
      icon: <Timer className="w-8 h-8 text-orange-600" />,
      title: "Delivery SLA Tracking",
      description: "Monitor and maintain quick delivery compliance on Instamart",
      features: ["Real-time delivery tracking", "SLA breach alerts", "Time-to-pick monitoring"]
    },
    {
      icon: <ClipboardCheck className="w-8 h-8 text-red-600" />,
      title: "Order Fulfillment Rate",
      description: "Maximize order completion and minimize cancellations",
      features: ["Fill rate monitoring", "Out-of-stock alerts", "Substitution management"]
    },
    {
      icon: <Activity className="w-8 h-8 text-orange-500" />,
      title: "Performance Dashboards",
      description: "Comprehensive visibility into all operational metrics",
      features: ["Real-time dashboards", "Trend analysis", "Comparative benchmarks"]
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
      title: "Quality Compliance",
      description: "Ensure product quality and packaging standards",
      features: ["Quality score tracking", "Customer feedback analysis", "Issue resolution"]
    },
    {
      icon: <FileCheck className="w-8 h-8 text-blue-600" />,
      title: "Operational Audits",
      description: "Regular performance audits and improvement recommendations",
      features: ["Weekly reviews", "Action item tracking", "Performance reports"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
      title: "Analytics & Reporting",
      description: "Data-driven insights for continuous improvement",
      features: ["Custom reports", "Trend identification", "Predictive alerts"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Baseline Assessment",
      description: "Analyze current SLA performance and identify improvement areas",
      icon: <Gauge className="w-6 h-6 text-orange-600" />
    },
    {
      step: "2", 
      title: "Monitoring Setup",
      description: "Implement real-time tracking for all key performance metrics",
      icon: <Activity className="w-6 h-6 text-orange-600" />
    },
    {
      step: "3",
      title: "Optimization",
      description: "Execute improvements to boost SLA compliance rates",
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />
    },
    {
      step: "4",
      title: "Continuous Monitoring",
      description: "Ongoing tracking and proactive issue resolution",
      icon: <ShieldCheck className="w-6 h-6 text-orange-600" />
    }
  ];

  const successMetrics = [
    { value: "99.2%", label: "Avg. SLA Compliance", description: "Delivery on-time" },
    { value: "98%", label: "Fill Rate", description: "Order fulfillment" },
    { value: "60%", label: "Penalty Reduction", description: "Platform charges" },
    { value: "24/7", label: "Monitoring", description: "Real-time tracking" }
  ];

  const faqs = [
    {
      question: "What SLA metrics does Swiggy Instamart track?",
      answer: "Instamart tracks several key SLAs including Time-to-Pick (how quickly you acknowledge and pick orders), Fill Rate (percentage of orders fulfilled without stockouts), Delivery Time (10-20 minute delivery window), and Quality Scores (based on customer feedback and returns)."
    },
    {
      question: "What happens if I breach Instamart SLAs?",
      answer: "SLA breaches can result in penalties including reduced visibility in search, lower priority during high-demand periods, financial penalties, and in severe cases, suspension from the platform. Our monitoring service helps you avoid these issues proactively."
    },
    {
      question: "How do you monitor operations in real-time?",
      answer: "We set up dashboards that pull data from Instamart's seller portal and integrate with your inventory systems. This gives us real-time visibility into order status, stock levels, and delivery performance, allowing us to flag issues before they become SLA breaches."
    },
    {
      question: "Can you help improve my current fill rate?",
      answer: "Absolutely. We analyze your historical fill rate data, identify patterns in stockouts, and implement inventory management improvements. Combined with our forecasting services, most sellers see significant improvements in fill rates within weeks."
    },
    {
      question: "What is considered a good SLA performance on Instamart?",
      answer: "Top-performing sellers maintain 98%+ SLA compliance for delivery time, 95%+ fill rates, and customer ratings above 4.5 stars. Our goal is to help you reach and maintain these benchmarks consistently."
    },
    {
      question: "Do you provide reports for internal stakeholders?",
      answer: "Yes, we provide customizable weekly and monthly reports covering all key operational metrics. These reports are designed for easy sharing with management and can be tailored to focus on the metrics most important to your business."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Swiggy Instamart Operations & SLA Monitoring Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional SLA monitoring and operations management services for Swiggy Instamart. Quick delivery compliance, order fulfillment tracking, and performance optimization for quick commerce.",
    "areaServed": "India",
    "serviceType": "Operations Management Services"
  };

  return (
    <>
      <SEO
        title="Swiggy Instamart SLA Monitoring & Operations Management | Simply Setup"
        description="Maintain 99%+ SLA compliance on Swiggy Instamart with expert operations monitoring. Real-time delivery tracking, order fulfillment optimization, and performance management. Avoid penalties!"
        canonicalUrl="https://simplysetup.in/growth/swiggy-instamart-account-management/sla-monitoring"
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
              <span className="text-gray-900">Operations & SLA Monitoring</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-orange-50 via-white to-red-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  <ShieldCheck className="w-3 h-3 mr-1" /> Instamart Operations Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Operations &{" "}
                  <span className="text-orange-600">SLA Monitoring</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Ensure flawless quick commerce operations on Swiggy Instamart. 
                  Real-time monitoring, proactive alerts, and continuous optimization for SLA excellence.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-orange-600 hover:bg-orange-700" data-testid="button-start-monitoring">
                        Start SLA Monitoring
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get SLA Monitoring for Instamart</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center">
                        <Activity className="w-5 h-5 text-orange-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">99.2% Avg. SLA Compliance</p>
                    <p className="text-xs text-gray-500">24/7 real-time monitoring</p>
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
                Common Instamart Operational Challenges
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Operations problems we solve for Swiggy Instamart sellers
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
                <h3 className="text-3xl font-bold text-gray-900">Master Your Instamart Operations</h3>
                <p className="text-gray-600 text-lg">
                  Let our operations experts ensure flawless SLA performance for your Swiggy Instamart business.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free operations health check</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">24/7 real-time monitoring</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Proactive issue resolution</span>
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
                End-to-end operational excellence for Swiggy Instamart success
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
                Our SLA Monitoring Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A systematic approach to operational excellence on Instamart
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
              Ready to Achieve SLA Excellence?
            </h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Stop worrying about SLA breaches and penalties. Let our operations experts 
              ensure flawless performance for your Swiggy Instamart business.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100" data-testid="button-cta-sla">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Start SLA Monitoring Today</DialogTitle>
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
