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
  Truck,
  Package,
  IndianRupee,
  Shield,
  Clock,
  MapPin,
  AlertTriangle,
  Wallet,
  RotateCcw,
  Timer,
  CheckSquare,
  Settings
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

export default function LogisticsPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <IndianRupee className="w-6 h-6 text-red-500" />,
      problem: "High COD Returns",
      solution: "Risk management strategies to reduce COD rejection rates"
    },
    {
      icon: <Timer className="w-6 h-6 text-red-500" />,
      problem: "Delayed Dispatches",
      solution: "Streamlined fulfillment processes for same-day dispatch"
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-red-500" />,
      problem: "Return Overload",
      solution: "Proactive measures to minimize RTO and return rates"
    },
    {
      icon: <MapPin className="w-6 h-6 text-red-500" />,
      problem: "Delivery Failures",
      solution: "Address verification and delivery optimization"
    }
  ];

  const services = [
    {
      icon: <Truck className="w-8 h-8 text-pink-600" />,
      title: "Shipping Setup",
      description: "Configure optimal shipping settings for pan-India delivery",
      features: ["Courier selection", "Zone optimization", "Rate negotiation"]
    },
    {
      icon: <Wallet className="w-8 h-8 text-fuchsia-600" />,
      title: "COD Risk Management",
      description: "Minimize losses from COD rejections",
      features: ["Customer verification", "Risk scoring", "Prepaid incentives"]
    },
    {
      icon: <Package className="w-8 h-8 text-purple-600" />,
      title: "Packaging Guidelines",
      description: "Ensure products reach customers safely",
      features: ["Damage prevention", "Weight optimization", "Brand packaging"]
    },
    {
      icon: <Timer className="w-8 h-8 text-pink-600" />,
      title: "Dispatch Optimization",
      description: "Same-day dispatch to maintain seller metrics",
      features: ["Process workflow", "Inventory management", "SLA compliance"]
    },
    {
      icon: <RotateCcw className="w-8 h-8 text-fuchsia-600" />,
      title: "RTO Reduction",
      description: "Strategies to minimize return-to-origin rates",
      features: ["Address verification", "Customer confirmation", "Delivery attempts"]
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "Claims & Disputes",
      description: "Handle shipping issues and claims effectively",
      features: ["Damage claims", "Lost shipments", "Dispute resolution"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Logistics Audit",
      description: "Analyze your current shipping setup and identify issues",
      icon: <CheckSquare className="w-6 h-6 text-pink-600" />
    },
    {
      step: "2", 
      title: "Strategy Development",
      description: "Create custom logistics and COD management plan",
      icon: <Settings className="w-6 h-6 text-pink-600" />
    },
    {
      step: "3",
      title: "Process Implementation",
      description: "Set up optimized fulfillment workflows",
      icon: <Truck className="w-6 h-6 text-pink-600" />
    },
    {
      step: "4",
      title: "Performance Monitoring",
      description: "Track metrics and continuously improve delivery rates",
      icon: <TrendingUp className="w-6 h-6 text-pink-600" />
    }
  ];

  const successMetrics = [
    { value: "35%", label: "RTO Reduction", description: "Average decrease" },
    { value: "95%", label: "On-time Dispatch", description: "Same-day rate" },
    { value: "200+", label: "Sellers Optimized", description: "Logistics setup" },
    { value: "20%", label: "COD Success Boost", description: "Delivery rate" }
  ];

  const faqs = [
    {
      question: "How can I reduce COD rejections on Meesho?",
      answer: "COD rejections can be reduced through customer verification calls, offering prepaid discounts, setting minimum order values for COD, and identifying high-risk pin codes. We help implement all these strategies based on your order patterns."
    },
    {
      question: "What is the ideal dispatch time for Meesho orders?",
      answer: "Meesho expects dispatch within 2 days, but same-day dispatch significantly improves seller ratings and customer satisfaction. We help you set up processes to achieve consistent same-day dispatch for orders placed before 2 PM."
    },
    {
      question: "How do I handle high return rates?",
      answer: "High returns are usually due to quality mismatch, size issues, or delayed delivery. We help with accurate product descriptions, size guides, quality checks, and faster dispatch to reduce return rates."
    },
    {
      question: "Which courier partners work best for Meesho?",
      answer: "Meesho provides its own logistics through Meesho Logistics. The key is optimizing your pickup location, packaging weight, and dispatch times to get the best delivery performance from their network."
    },
    {
      question: "How can I reduce shipping costs?",
      answer: "Shipping costs can be reduced through proper product weight/dimension declaration, lightweight packaging materials, and consolidating products. We help optimize your packaging to minimize volumetric weight charges."
    },
    {
      question: "What should I do about lost or damaged shipments?",
      answer: "We help you set up proper claim processes with Meesho for lost or damaged shipments, including documentation requirements, timelines, and escalation procedures to ensure you get reimbursed fairly."
    }
  ];

  const relatedServices = [
    { title: "Seller Launch", href: "/growth/meesho-account-management/seller-launch", description: "Set up your Meesho seller account" },
    { title: "Catalog Strategy", href: "/growth/meesho-account-management/catalog-strategy", description: "Optimize your product catalog" },
    { title: "Reseller Growth", href: "/growth/meesho-account-management/reseller-growth", description: "Build your reseller network" }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Meesho Logistics & COD Management Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Meesho logistics and COD management services. Reduce RTO rates, optimize delivery, and manage cash-on-delivery risks effectively.",
    "areaServed": "India",
    "serviceType": "E-commerce Logistics Management"
  };

  return (
    <>
      <SEO
        title="Meesho Logistics & COD Management | Reduce RTO & Shipping Issues | Simply Setup"
        description="Optimize your Meesho logistics and manage COD risks. Expert shipping setup, RTO reduction strategies, and delivery optimization. Reduce returns by 35%!"
        canonicalUrl="https://simplysetup.in/growth/meesho-account-management/logistics"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Navbar />

      <main className="min-h-screen">
        <div className="bg-gray-50 py-3 border-b">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600">
              <Link href="/growth" className="hover:text-pink-600">Growth</Link>
              <span className="mx-2">/</span>
              <Link href="/growth/meesho-account-management" className="hover:text-pink-600">Meesho Account Management</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Logistics & COD</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-pink-50 via-white to-fuchsia-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-100">
                  <Truck className="w-3 h-3 mr-1" /> Logistics Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Logistics & COD{" "}
                  <span className="text-pink-600">Management</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Master Meesho logistics and eliminate COD nightmares. Our strategies reduce 
                  RTO rates, optimize delivery, and protect your profits from payment failures.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-pink-600 hover:bg-pink-700" data-testid="button-logistics-audit">
                        Get Logistics Audit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Logistics Audited</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-pink-100 border-2 border-white flex items-center justify-center">
                        <Package className="w-5 h-5 text-pink-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">200+ Sellers Optimized</p>
                    <p className="text-xs text-gray-500">35% average RTO reduction</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-8 border">
                  <div className="grid grid-cols-2 gap-6">
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="text-center p-4 bg-pink-50 rounded-xl">
                        <p className="text-3xl font-bold text-pink-600">{metric.value}</p>
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
              <div className="w-20 h-1 bg-pink-600 mx-auto my-3 rounded-sm"></div>
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
                Logistics & COD Challenges?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common shipping problems we solve for Meesho sellers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {painPoints.map((point, index) => (
                <Card key={index} className="border-2 hover:border-pink-200 transition-colors">
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
                <h3 className="text-3xl font-bold text-gray-900">Optimize Your Logistics</h3>
                <p className="text-gray-600 text-lg">
                  Get expert strategies to reduce RTO and manage COD risks effectively.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free logistics audit report</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">RTO reduction strategies</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">COD risk management plan</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <ZohoFormEmbed />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Complete Logistics Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                End-to-end logistics and COD management solutions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="border hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-4">{service.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-pink-500" />
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

        <section className="py-16 bg-pink-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Optimization Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Strategic approach to logistics excellence
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-2 border-pink-200">
                    {step.icon}
                  </div>
                  <div className="text-sm font-bold text-pink-600 mb-2">Step {step.step}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Services</h2>
              <p className="text-gray-600">Explore more ways to grow on Meesho</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedServices.map((service, index) => (
                <Link key={index} href={service.href}>
                  <Card className="border hover:border-pink-300 hover:shadow-md transition-all cursor-pointer h-full">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-sm text-gray-600">{service.description}</p>
                      <div className="mt-4 text-pink-600 text-sm font-medium flex items-center">
                        Learn more <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
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
                  Everything about logistics and COD management
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border px-6">
                    <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-pink-600">
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

        <section className="py-16 bg-gradient-to-r from-pink-600 to-fuchsia-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Optimize Your Logistics?
            </h2>
            <p className="text-pink-100 mb-8 max-w-2xl mx-auto">
              Get expert strategies to reduce RTO and manage COD risks effectively
            </p>
            <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50" data-testid="button-cta-logistics">
                  Get Logistics Audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Logistics Audit</DialogTitle>
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
