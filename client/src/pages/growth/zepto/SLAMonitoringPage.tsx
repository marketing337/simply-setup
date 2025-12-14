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
  Shield,
  Timer,
  Activity,
  CheckSquare,
  FileSearch
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
      problem: "10-Minute SLA Breaches",
      solution: "Real-time monitoring and alerts for delivery time compliance"
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      problem: "Quality Issues",
      solution: "Proactive quality control and product condition tracking"
    },
    {
      icon: <Activity className="w-6 h-6 text-red-500" />,
      problem: "Inconsistent Performance",
      solution: "Performance analytics and trend identification"
    },
    {
      icon: <FileSearch className="w-6 h-6 text-red-500" />,
      problem: "Lack of Visibility",
      solution: "Comprehensive dashboards for all operational metrics"
    }
  ];

  const services = [
    {
      icon: <Timer className="w-8 h-8 text-purple-600" />,
      title: "Delivery Time Monitoring",
      description: "Track and optimize 10-minute delivery compliance",
      features: ["Real-time tracking", "SLA breach alerts", "Trend analysis"]
    },
    {
      icon: <Shield className="w-8 h-8 text-violet-600" />,
      title: "Quality Control",
      description: "Ensure product quality meets Zepto standards",
      features: ["Quality audits", "Defect tracking", "Compliance reporting"]
    },
    {
      icon: <Activity className="w-8 h-8 text-purple-600" />,
      title: "Performance Tracking",
      description: "Monitor all key operational metrics",
      features: ["Order accuracy", "Fill rates", "Customer ratings"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-fuchsia-600" />,
      title: "Analytics Dashboard",
      description: "Comprehensive visibility into operations",
      features: ["Custom reports", "Visual dashboards", "Exportable data"]
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-indigo-600" />,
      title: "Issue Resolution",
      description: "Rapid identification and resolution of problems",
      features: ["Root cause analysis", "Escalation management", "Process improvement"]
    },
    {
      icon: <CheckSquare className="w-8 h-8 text-purple-600" />,
      title: "Compliance Management",
      description: "Ensure adherence to Zepto's operational guidelines",
      features: ["Policy compliance", "Documentation", "Audit preparation"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Baseline Assessment",
      description: "Evaluate current operational performance and SLA compliance",
      icon: <FileSearch className="w-6 h-6 text-purple-600" />
    },
    {
      step: "2", 
      title: "Monitoring Setup",
      description: "Implement tracking systems and alert mechanisms",
      icon: <Activity className="w-6 h-6 text-purple-600" />
    },
    {
      step: "3",
      title: "Process Optimization",
      description: "Identify and fix bottlenecks affecting SLA compliance",
      icon: <Target className="w-6 h-6 text-purple-600" />
    },
    {
      step: "4",
      title: "Continuous Improvement",
      description: "Ongoing monitoring and performance enhancement",
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />
    }
  ];

  const successMetrics = [
    { value: "99%", label: "SLA Compliance", description: "Average achievement" },
    { value: "60%", label: "Issue Reduction", description: "In quality problems" },
    { value: "8min", label: "Avg. Delivery Time", description: "Optimized performance" },
    { value: "4.8★", label: "Customer Rating", description: "Average score" }
  ];

  const faqs = [
    {
      question: "What is 10-minute delivery SLA and why is it important?",
      answer: "Zepto promises 10-minute delivery to customers. Meeting this SLA is crucial for customer satisfaction and platform reputation. Breaching SLAs can lead to penalties, reduced visibility, and customer complaints. Our monitoring helps you consistently meet this commitment."
    },
    {
      question: "How do you monitor SLA compliance in real-time?",
      answer: "We set up automated tracking systems that monitor order processing time, dispatch speed, and delivery completion. Alerts are triggered when delays are detected, allowing immediate corrective action before SLA breaches occur."
    },
    {
      question: "What quality metrics do you track for Zepto?",
      answer: "We track product condition upon delivery, packaging quality, order accuracy, expiry date compliance, and customer feedback. Each metric is monitored against Zepto's standards with regular reporting and improvement recommendations."
    },
    {
      question: "How can you help reduce SLA breaches?",
      answer: "We analyze the root causes of SLA breaches - whether it's inventory issues, slow processing, or dispatch delays. Then we implement process improvements, optimize dark store operations, and create contingency protocols to minimize breaches."
    },
    {
      question: "What kind of reports do you provide?",
      answer: "We provide daily, weekly, and monthly reports covering SLA compliance rates, delivery times, quality metrics, customer ratings, and trend analysis. Custom dashboards give you real-time visibility into all operational KPIs."
    },
    {
      question: "Can you help with Zepto penalty management?",
      answer: "Yes, we help minimize penalties through proactive SLA compliance. When issues occur, we assist with documentation and appeal processes. Our goal is to prevent penalties by maintaining excellent operational performance."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Zepto Operations & SLA Monitoring Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Zepto SLA monitoring and operations management services including 10-minute delivery compliance, quality control, and performance tracking for quick commerce success.",
    "areaServed": "India",
    "serviceType": "Quick Commerce Operations Management"
  };

  return (
    <>
      <SEO
        title="Zepto Operations & SLA Monitoring | 10-Min Delivery Compliance | Simply Setup"
        description="Ensure 10-minute delivery compliance on Zepto. Expert SLA monitoring, quality control, and performance tracking for flawless quick commerce operations."
        canonicalUrl="https://simplysetup.in/growth/zepto-account-management/sla-monitoring"
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
              <span className="text-gray-900">Operations & SLA Monitoring</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-purple-50 via-white to-violet-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                  <Shield className="w-3 h-3 mr-1" /> Operations Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Operations &{" "}
                  <span className="text-purple-600">SLA Monitoring</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Never miss the 10-minute delivery promise. Our SLA monitoring and operations 
                  management ensures flawless execution and maximum customer satisfaction on Zepto.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-purple-600 hover:bg-purple-700" data-testid="button-sla-monitoring">
                        Optimize Operations
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get SLA Monitoring for Zepto</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center">
                        <Shield className="w-5 h-5 text-purple-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">99% SLA Compliance</p>
                    <p className="text-xs text-gray-500">Achieved for our clients</p>
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
                Operational Challenges We Solve
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common operational problems for quick commerce sellers on Zepto
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
                <h3 className="text-3xl font-bold text-gray-900">Master Your Zepto Operations</h3>
                <p className="text-gray-600 text-lg">
                  Get expert operations management for your Zepto quick commerce business.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free operations audit</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Real-time SLA monitoring</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Quality control protocols</span>
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
                Complete Operations Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                End-to-end operations management for your Zepto quick commerce success
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
                Our SLA Monitoring Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A systematic 4-step approach to operations excellence on Zepto
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
              <Link href="/growth/zepto-account-management/inventory-forecasting">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-6 h-6 text-violet-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Inventory Forecasting</h3>
                    <p className="text-sm text-gray-600">Dark store optimization</p>
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
              Ready to Master Zepto Operations?
            </h2>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              Achieve 99% SLA compliance and operational excellence on Zepto's 10-minute delivery platform.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100" data-testid="button-cta-sla">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get SLA Monitoring for Zepto</DialogTitle>
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
