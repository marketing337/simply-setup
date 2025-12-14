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
  Megaphone,
  Tag,
  Percent,
  Calendar,
  Target,
  BarChart3,
  Zap,
  Gift,
  Star,
  Timer,
  Sparkles,
  Eye
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

export default function CampaignsPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Eye className="w-6 h-6 text-red-500" />,
      problem: "Low Product Visibility",
      solution: "Strategic campaign placement to boost product discoverability on Ajio"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-red-500" />,
      problem: "Poor Sale Performance",
      solution: "Optimized promotional strategies for maximum ROI during sales events"
    },
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Missed Sale Opportunities",
      solution: "Proactive enrollment in all major Ajio sale events and festivals"
    },
    {
      icon: <Timer className="w-6 h-6 text-red-500" />,
      problem: "Last-Minute Campaign Setup",
      solution: "Advance planning and preparation for seamless campaign execution"
    }
  ];

  const services = [
    {
      icon: <Calendar className="w-8 h-8 text-teal-600" />,
      title: "Sale Event Management",
      description: "Complete management of Ajio sale events",
      features: ["Big Bold Sale participation", "Festival sale enrollment", "Flash sale setup"]
    },
    {
      icon: <Percent className="w-8 h-8 text-teal-600" />,
      title: "Coupon & Offers",
      description: "Strategic discount and coupon management",
      features: ["Coupon code creation", "Bundle offers", "Bank offer integration"]
    },
    {
      icon: <Megaphone className="w-8 h-8 text-teal-600" />,
      title: "Visibility Boosters",
      description: "Enhanced product placement strategies",
      features: ["Featured listings", "Category spotlight", "Homepage visibility"]
    },
    {
      icon: <Tag className="w-8 h-8 text-teal-600" />,
      title: "Pricing Strategy",
      description: "Competitive pricing optimization",
      features: ["Price benchmarking", "Dynamic pricing", "Margin optimization"]
    },
    {
      icon: <Star className="w-8 h-8 text-teal-600" />,
      title: "Brand Promotions",
      description: "Brand-level promotional activities",
      features: ["Brand day campaigns", "Exclusive launches", "Brand visibility"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-teal-600" />,
      title: "Campaign Analytics",
      description: "Performance tracking and optimization",
      features: ["Sales analytics", "ROI tracking", "Campaign reporting"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Campaign Planning",
      description: "Identify upcoming sales and promotional opportunities",
      icon: <Calendar className="w-6 h-6 text-teal-600" />
    },
    {
      step: "2", 
      title: "Strategy Development",
      description: "Create pricing and promotion strategy for maximum ROI",
      icon: <Target className="w-6 h-6 text-teal-600" />
    },
    {
      step: "3",
      title: "Campaign Execution",
      description: "Set up and launch campaigns across Ajio platform",
      icon: <Zap className="w-6 h-6 text-teal-600" />
    },
    {
      step: "4",
      title: "Monitor & Optimize",
      description: "Track performance and optimize for better results",
      icon: <TrendingUp className="w-6 h-6 text-teal-600" />
    }
  ];

  const successMetrics = [
    { value: "3x", label: "Avg. Sales Increase", description: "During campaigns" },
    { value: "200+", label: "Campaigns Managed", description: "For Ajio sellers" },
    { value: "45%", label: "Better ROI", description: "Vs. unmanaged campaigns" },
    { value: "100%", label: "On-Time Setup", description: "Never miss a sale" }
  ];

  const faqs = [
    {
      question: "What sale events does Ajio run throughout the year?",
      answer: "Ajio runs several major sale events including Big Bold Sale, AJIO-MANIA, End of Season Sale (EOSS), Republic Day Sale, Independence Day Sale, Diwali Sale, and various flash sales. We ensure your brand participates in all relevant events."
    },
    {
      question: "How do I get my products featured during Ajio sales?",
      answer: "Getting featured requires meeting specific criteria including competitive pricing, good seller metrics, and adequate inventory. We help optimize your listings and coordinate with Ajio's merchandising team for feature placements."
    },
    {
      question: "What is the typical ROI from Ajio promotional campaigns?",
      answer: "With proper campaign management, sellers typically see 3-5x increase in sales during major events. ROI varies based on product category, pricing strategy, and inventory levels. We track and report detailed ROI metrics for all campaigns."
    },
    {
      question: "Can you help with Ajio's visibility boosters and ad products?",
      answer: "Yes, we manage all Ajio advertising and visibility products including sponsored listings, brand spotlights, and category features. We optimize ad spend for maximum return on investment."
    },
    {
      question: "How far in advance should we plan for Ajio sales?",
      answer: "We recommend planning at least 2-3 weeks before major sales for inventory preparation, pricing optimization, and campaign setup. For flagship events like Big Bold Sale, we start planning 4-6 weeks in advance."
    },
    {
      question: "Do you provide performance reports for campaigns?",
      answer: "Absolutely! We provide comprehensive campaign reports including sales performance, traffic analysis, conversion rates, ad spend ROI, and competitor benchmarking. Reports are shared daily during sales and weekly for ongoing campaigns."
    }
  ];

  const relatedServices = [
    { title: "Brand Onboarding", url: "/growth/ajio-account-management/brand-onboarding", description: "Seller registration & setup" },
    { title: "Visual Merchandising", url: "/growth/ajio-account-management/visual-merchandising", description: "Product photography & styling" },
    { title: "Returns Management", url: "/growth/ajio-account-management/returns-management", description: "Returns handling & operations" }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Ajio Promotions & Campaign Management Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Ajio campaign management services including sale event participation, coupon creation, visibility boosters, and promotional strategy optimization.",
    "areaServed": "India",
    "serviceType": "E-commerce Campaign Management"
  };

  return (
    <>
      <SEO
        title="Ajio Promotions & Campaign Management Services | Simply Setup"
        description="Expert Ajio campaign management services. Boost sales with strategic promotions, sale event participation, coupons, and visibility boosters. 3x average sales increase during campaigns!"
        canonicalUrl="https://simplysetup.in/growth/ajio-account-management/campaigns"
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
              <span className="text-gray-900">Promotions & Campaigns</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100">
                  <Megaphone className="w-3 h-3 mr-1" /> Campaign Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Ajio Promotions &{" "}
                  <span className="text-teal-600">Campaign Management</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Maximize your Ajio sales with strategic promotions. Our campaign experts manage 
                  sale events, visibility boosters, and promotional strategies for explosive growth.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-teal-600 hover:bg-teal-700" data-testid="button-get-campaign-consultation">
                        Get Campaign Consultation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Campaign Consultation</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-teal-100 border-2 border-white flex items-center justify-center">
                        <Megaphone className="w-5 h-5 text-teal-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">200+ Campaigns Managed</p>
                    <p className="text-xs text-gray-500">3x average sales increase</p>
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
                Are Your Ajio Campaigns Underperforming?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common promotional challenges we solve for Ajio sellers
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
                <h3 className="text-3xl font-bold text-gray-900">Boost Your Ajio Sales</h3>
                <p className="text-gray-600 text-lg">
                  Let our campaign experts maximize your promotional ROI on Ajio.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free campaign audit</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Sale event calendar planning</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">3x average sales increase</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Real-time performance tracking</span>
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
                Complete Campaign Management Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need for successful Ajio promotions
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
                Our Campaign Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A systematic approach to maximizing your Ajio promotions
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
                  Common questions about Ajio campaign management
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
              Ready to Supercharge Your Ajio Sales?
            </h2>
            <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
              Get expert campaign management that drives 3x more sales during promotions. 
              Never miss a sale event again.
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
                  <DialogTitle>Get Your Campaign Consultation</DialogTitle>
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
