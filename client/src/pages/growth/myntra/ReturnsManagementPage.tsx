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
  Target,
  RotateCcw,
  Users,
  BarChart3,
  Ruler,
  Shield,
  ThumbsUp,
  AlertTriangle,
  Package,
  Star,
  HeartHandshake,
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

export default function ReturnsManagementPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <RotateCcw className="w-6 h-6 text-red-500" />,
      problem: "High Return Rates",
      solution: "Data-driven analysis and actionable strategies to reduce returns"
    },
    {
      icon: <Ruler className="w-6 h-6 text-red-500" />,
      problem: "Size-Related Returns",
      solution: "Accurate size guides and fit recommendations to prevent sizing issues"
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      problem: "Quality Complaints",
      solution: "Pre-dispatch quality checks and improved product descriptions"
    },
    {
      icon: <Star className="w-6 h-6 text-red-500" />,
      problem: "Poor Customer Reviews",
      solution: "Proactive customer experience management and issue resolution"
    }
  ];

  const services = [
    {
      icon: <BarChart3 className="w-8 h-8 text-pink-600" />,
      title: "Returns Analysis",
      description: "Deep dive into return reasons and patterns",
      features: ["Category-wise analysis", "Reason code tracking", "Trend identification"]
    },
    {
      icon: <Ruler className="w-8 h-8 text-pink-600" />,
      title: "Size Guide Optimization",
      description: "Accurate sizing to reduce fit-related returns",
      features: ["Size chart creation", "Fit recommendations", "Comparison guides"]
    },
    {
      icon: <ClipboardCheck className="w-8 h-8 text-pink-600" />,
      title: "Quality Control",
      description: "Pre-dispatch quality assurance processes",
      features: ["QC checklist creation", "Defect prevention", "Packaging standards"]
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-pink-600" />,
      title: "Customer Experience",
      description: "Enhance customer satisfaction and loyalty",
      features: ["Review management", "Complaint resolution", "Feedback analysis"]
    },
    {
      icon: <Package className="w-8 h-8 text-pink-600" />,
      title: "Product Description",
      description: "Accurate product information to set expectations",
      features: ["Material details", "Care instructions", "Accurate imagery"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-pink-600" />,
      title: "Performance Monitoring",
      description: "Track and improve seller metrics",
      features: ["Return rate tracking", "Customer rating optimization", "Benchmark comparison"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Returns Audit",
      description: "Analyze historical return data and identify patterns",
      icon: <BarChart3 className="w-6 h-6 text-pink-600" />
    },
    {
      step: "2", 
      title: "Root Cause Analysis",
      description: "Identify primary reasons for returns in each category",
      icon: <Target className="w-6 h-6 text-pink-600" />
    },
    {
      step: "3",
      title: "Implementation",
      description: "Deploy size guides, QC processes, and content improvements",
      icon: <Shield className="w-6 h-6 text-pink-600" />
    },
    {
      step: "4",
      title: "Monitor & Optimize",
      description: "Track improvements and continuously refine strategies",
      icon: <TrendingUp className="w-6 h-6 text-pink-600" />
    }
  ];

  const successMetrics = [
    { value: "40%", label: "Return Reduction", description: "Average decrease" },
    { value: "4.5+", label: "Customer Rating", description: "Achieved consistently" },
    { value: "100+", label: "Brands Optimized", description: "On Myntra" },
    { value: "25%", label: "Cost Savings", description: "On reverse logistics" }
  ];

  const faqs = [
    {
      question: "What is a healthy return rate for fashion on Myntra?",
      answer: "Industry average for fashion on Myntra is 15-25%, but top-performing brands maintain 10-15%. We help you benchmark against competitors and implement strategies to reduce returns while maintaining customer satisfaction."
    },
    {
      question: "How do you reduce size-related returns?",
      answer: "We create detailed size guides with measurements, fit recommendations, and comparison with popular brands. We also analyze which sizes have highest returns and adjust inventory/descriptions accordingly."
    },
    {
      question: "What quality control measures do you recommend?",
      answer: "We implement multi-point QC checklists covering fabric quality, stitching, color accuracy, sizing, and packaging. We also train your team on Myntra's quality expectations and common defect prevention."
    },
    {
      question: "How do you handle negative customer reviews?",
      answer: "We monitor reviews daily, respond professionally to concerns, and identify systemic issues. We help you turn negative experiences into positive outcomes through timely resolution and process improvements."
    },
    {
      question: "Can you help with returns from specific product categories?",
      answer: "Yes, we specialize in category-specific return optimization. Whether it's ethnic wear sizing, footwear fit issues, or accessories quality, we have tailored strategies for each category."
    },
    {
      question: "What impact does return rate have on Myntra seller ranking?",
      answer: "Return rate directly impacts your seller score, search visibility, and eligibility for promotional events. High returns can lead to penalties and reduced visibility. We help you maintain optimal metrics for maximum platform benefits."
    }
  ];

  const relatedServices = [
    { title: "Brand Onboarding", url: "/growth/myntra-account-management/brand-onboarding", description: "Complete Myntra onboarding support" },
    { title: "Visual Merchandising", url: "/growth/myntra-account-management/visual-merchandising", description: "Product photography & styling" },
    { title: "Campaign Management", url: "/growth/myntra-account-management/campaigns", description: "EORS & influencer activations" }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Myntra Returns & Customer Experience Management Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Myntra returns optimization services including returns analysis, size guide optimization, quality control, and customer experience management.",
    "areaServed": "India",
    "serviceType": "E-commerce Operations"
  };

  return (
    <>
      <SEO
        title="Myntra Returns & Customer Experience Management | Reduce Returns | Simply Setup"
        description="Expert Myntra returns optimization services. Reduce return rates by 40%, improve size guides, enhance quality control, and boost customer satisfaction. Get a free returns audit!"
        canonicalUrl="https://simplysetup.in/growth/myntra-account-management/returns-management"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Navbar />

      <main className="min-h-screen">
        <div className="bg-gray-50 py-3 border-b">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600">
              <Link href="/growth" className="hover:text-pink-600">Growth</Link>
              <span className="mx-2">/</span>
              <Link href="/growth/myntra-account-management" className="hover:text-pink-600">Myntra Account Management</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Returns & Customer Experience</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-pink-50 via-white to-rose-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-100">
                  <RotateCcw className="w-3 h-3 mr-1" /> Returns Optimization Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Returns & Customer{" "}
                  <span className="text-pink-600">Experience</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Reduce returns, boost customer satisfaction, and protect your margins. Our experts 
                  analyze return patterns and implement strategies for sustainable improvement.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-pink-600 hover:bg-pink-700" data-testid="button-get-returns-audit">
                        Get Free Returns Audit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free Returns Audit</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-pink-100 border-2 border-white flex items-center justify-center">
                        <ThumbsUp className="w-5 h-5 text-pink-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">100+ Brands Optimized</p>
                    <p className="text-xs text-gray-500">40% average return reduction</p>
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
                Trusted by Leading Fashion Brands
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
                Are Returns Eating Into Your Profits?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common return challenges we solve for fashion brands
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
                <h3 className="text-3xl font-bold text-gray-900">Reduce Returns, Boost Profits</h3>
                <p className="text-gray-600 text-lg">
                  Data-driven strategies to minimize returns while maximizing customer satisfaction.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free returns analysis report</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Category-wise benchmarking</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Custom size guide templates</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">QC process implementation</span>
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
                Complete Returns Management Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to optimize returns and customer experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="border-2 hover:border-pink-200 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-pink-600 shrink-0" />
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
                Our Returns Optimization Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Systematic approach to reduce returns and improve customer experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl p-6 shadow-md h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                      {step.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-pink-400" />
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
                Related Myntra Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Complete your Myntra success with our other specialized services
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedServices.map((service, index) => (
                <Link key={index} href={service.url}>
                  <Card className="border-2 hover:border-pink-300 hover:shadow-lg transition-all cursor-pointer h-full">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                      <span className="text-pink-600 text-sm font-medium flex items-center gap-1">
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
                  Everything you need to know about returns optimization for Myntra
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border px-6">
                    <AccordionTrigger className="text-left font-medium text-gray-900">
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

        <section className="py-16 bg-gradient-to-r from-pink-600 to-rose-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Reduce Returns and Boost Profits?
            </h2>
            <p className="text-pink-100 mb-8 max-w-2xl mx-auto">
              Get expert returns analysis, size guide optimization, and customer experience strategies. 
              Join brands that have reduced returns by 40%.
            </p>
            <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-pink-600 hover:bg-pink-50" data-testid="button-cta-get-started">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Free Returns Audit</DialogTitle>
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
