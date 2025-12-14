import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  CheckCircle, 
  TrendingUp, 
  ArrowRight,
  RotateCcw,
  Package,
  Truck,
  ClipboardList,
  BarChart3,
  AlertTriangle,
  Shield,
  RefreshCw,
  Database,
  Settings,
  Clock,
  PackageCheck
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

export default function ReturnsManagementPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <RotateCcw className="w-6 h-6 text-red-500" />,
      problem: "High Return Rates",
      solution: "Data-driven strategies to reduce returns by improving product information"
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      problem: "Inventory Mismatch",
      solution: "Real-time inventory sync preventing overselling and stockouts"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Delayed Processing",
      solution: "Streamlined workflows for faster return processing and refunds"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-red-500" />,
      problem: "Poor Seller Metrics",
      solution: "Proactive management to maintain excellent seller ratings"
    }
  ];

  const services = [
    {
      icon: <RotateCcw className="w-8 h-8 text-teal-600" />,
      title: "Returns Processing",
      description: "End-to-end returns management",
      features: ["Return request handling", "Quality inspection", "Refund processing"]
    },
    {
      icon: <Database className="w-8 h-8 text-teal-600" />,
      title: "Inventory Sync",
      description: "Real-time inventory management",
      features: ["Multi-channel sync", "Stock level updates", "Restock alerts"]
    },
    {
      icon: <ClipboardList className="w-8 h-8 text-teal-600" />,
      title: "Order Management",
      description: "Complete order fulfillment support",
      features: ["Order tracking", "Dispatch management", "Delivery coordination"]
    },
    {
      icon: <Shield className="w-8 h-8 text-teal-600" />,
      title: "Quality Control",
      description: "Product quality inspection services",
      features: ["Pre-dispatch checks", "Return inspection", "Quality reporting"]
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-teal-600" />,
      title: "Reverse Logistics",
      description: "Efficient return pickup and processing",
      features: ["Pickup coordination", "Warehouse management", "Restocking workflow"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-teal-600" />,
      title: "Analytics & Reporting",
      description: "Insights to reduce return rates",
      features: ["Return analysis", "Trend identification", "Improvement recommendations"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Operations Audit",
      description: "Analyze current operations and identify bottlenecks",
      icon: <ClipboardList className="w-6 h-6 text-teal-600" />
    },
    {
      step: "2", 
      title: "System Setup",
      description: "Implement inventory sync and order management systems",
      icon: <Settings className="w-6 h-6 text-teal-600" />
    },
    {
      step: "3",
      title: "Process Optimization",
      description: "Streamline returns and fulfillment workflows",
      icon: <RefreshCw className="w-6 h-6 text-teal-600" />
    },
    {
      step: "4",
      title: "Monitor & Improve",
      description: "Continuous monitoring and metric improvement",
      icon: <TrendingUp className="w-6 h-6 text-teal-600" />
    }
  ];

  const successMetrics = [
    { value: "40%", label: "Return Rate Reduction", description: "Average improvement" },
    { value: "99.5%", label: "Inventory Accuracy", description: "Real-time sync" },
    { value: "24hrs", label: "Return Processing", description: "Average time" },
    { value: "4.8★", label: "Seller Rating", description: "Average maintained" }
  ];

  const faqs = [
    {
      question: "How can you help reduce our return rates on Ajio?",
      answer: "We analyze return patterns to identify root causes - whether it's sizing issues, product description gaps, or quality concerns. We then implement targeted fixes like better size guides, enhanced product images, and improved descriptions to reduce return-triggering issues."
    },
    {
      question: "What inventory management systems do you integrate with?",
      answer: "We integrate with popular inventory management systems and ERPs. We also help set up Ajio's native inventory tools and can create custom integrations for seamless stock sync across your sales channels."
    },
    {
      question: "How do you handle Ajio's return policies and timelines?",
      answer: "We ensure strict adherence to Ajio's return SLAs including pickup scheduling, quality check turnaround, and refund processing. Our team monitors all returns daily to ensure timely processing and maintain your seller metrics."
    },
    {
      question: "Can you help improve our seller rating on Ajio?",
      answer: "Yes, we focus on all factors affecting seller ratings including on-time dispatch, return processing speed, customer communication, and product quality. Our proactive approach helps maintain ratings above 4.5 stars consistently."
    },
    {
      question: "Do you provide warehouse management services?",
      answer: "We provide warehouse management consulting and can help optimize your existing warehouse operations. For sellers needing fulfillment services, we can connect you with our partner 3PL providers who specialize in fashion e-commerce."
    },
    {
      question: "How do you handle quality inspection for returns?",
      answer: "We establish standard operating procedures for quality checks including product condition assessment, packaging inspection, and resale eligibility determination. This helps maximize recovery value from returns while maintaining quality standards."
    }
  ];

  const relatedServices = [
    { title: "Brand Onboarding", url: "/growth/ajio-account-management/brand-onboarding", description: "Seller registration & setup" },
    { title: "Visual Merchandising", url: "/growth/ajio-account-management/visual-merchandising", description: "Product photography & styling" },
    { title: "Promotions & Campaigns", url: "/growth/ajio-account-management/campaigns", description: "Sales events & visibility boosters" }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Ajio Returns & Operations Management Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Ajio returns management and operations services including inventory sync, order fulfillment, reverse logistics, and seller performance optimization.",
    "areaServed": "India",
    "serviceType": "E-commerce Operations Management"
  };

  return (
    <>
      <SEO
        title="Ajio Returns & Operations Management Services | Simply Setup"
        description="Expert Ajio returns management and operations services. Reduce return rates by 40%, real-time inventory sync, and maintain excellent seller ratings. Get a free operations audit!"
        canonicalUrl="https://simplysetup.in/growth/ajio-account-management/returns-management"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Navbar />

      <main className="min-h-screen">
        <div className="bg-gray-50 py-3 border-b">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600">
              <Link href="/growth" className="hover:text-teal-600">Growth</Link>
              <span className="mx-2">/</span>
              <Link href="/growth/ajio-account-management" className="hover:text-teal-600">Ajio Account Management</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Returns & Operations</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100">
                  <PackageCheck className="w-3 h-3 mr-1" /> Operations Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Ajio Returns &{" "}
                  <span className="text-teal-600">Operations Management</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Streamline your Ajio operations with expert returns management, inventory sync, 
                  and order fulfillment support. Reduce returns and boost seller ratings.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-teal-600 hover:bg-teal-700" data-testid="button-get-operations-audit">
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

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-teal-100 border-2 border-white flex items-center justify-center">
                        <PackageCheck className="w-5 h-5 text-teal-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">40% Avg. Return Reduction</p>
                    <p className="text-xs text-gray-500">99.5% inventory accuracy</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-8 border">
                  <div className="grid grid-cols-2 gap-6">
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="text-center p-4 bg-teal-50 rounded-xl">
                        <p className="text-3xl font-bold text-teal-600">{metric.value}</p>
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
              <div className="w-20 h-1 bg-teal-600 mx-auto my-3 rounded-sm"></div>
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
                Are Your Ajio Operations Struggling?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common operations challenges we solve for Ajio sellers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {painPoints.map((point, index) => (
                <Card key={index} className="border-2 hover:border-teal-200 transition-colors">
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
                <h3 className="text-3xl font-bold text-gray-900">Optimize Your Ajio Operations</h3>
                <p className="text-gray-600 text-lg">
                  Let our operations experts streamline your returns and fulfillment.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free operations audit</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">40% average return reduction</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Real-time inventory sync</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">24-hour return processing</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 border">
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
                Everything you need for seamless Ajio operations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="border-2 hover:border-teal-200 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
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

        <section className="py-16 bg-teal-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Operations Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A systematic approach to optimizing your Ajio operations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl p-6 shadow-md h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                      {step.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-teal-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Related Ajio Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Complete your Ajio success with our other specialized services
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedServices.map((service, index) => (
                <Link key={index} href={service.url}>
                  <Card className="border-2 hover:border-teal-300 hover:shadow-lg transition-all cursor-pointer h-full">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                      <span className="text-teal-600 text-sm font-medium flex items-center gap-1">
                        Learn more <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600">
                  Common questions about Ajio operations management
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border px-6">
                    <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-teal-600">
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

        <section className="py-16 bg-teal-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Streamline Your Ajio Operations?
            </h2>
            <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
              Get expert operations management that reduces returns by 40% and 
              maintains excellent seller ratings on Ajio.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-teal-600 hover:bg-gray-100" data-testid="button-cta-get-started">
                  Get Started Today
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
      </main>

      <Footer />
    </>
  );
}
