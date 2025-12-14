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
  Megaphone,
  Users,
  Sparkles,
  Calendar,
  BarChart3,
  Zap,
  Star,
  Gift,
  Share2,
  Trophy,
  Percent
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
      icon: <Megaphone className="w-6 h-6 text-red-500" />,
      problem: "Missing Major Sale Events",
      solution: "Strategic planning for EORS, Big Fashion Festival, and seasonal sales"
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Low Brand Visibility",
      solution: "Targeted influencer partnerships and brand collaborations"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-red-500" />,
      problem: "Poor Campaign ROI",
      solution: "Data-driven campaign optimization for maximum returns"
    },
    {
      icon: <Calendar className="w-6 h-6 text-red-500" />,
      problem: "Last-Minute Preparations",
      solution: "Advance planning and inventory readiness for peak seasons"
    }
  ];

  const services = [
    {
      icon: <Trophy className="w-8 h-8 text-pink-600" />,
      title: "EORS Campaign Management",
      description: "End of Reason Sale optimization",
      features: ["Inventory planning", "Pricing strategy", "Visibility boosting"]
    },
    {
      icon: <Users className="w-8 h-8 text-pink-600" />,
      title: "Influencer Activations",
      description: "Strategic influencer partnerships",
      features: ["Influencer sourcing", "Campaign coordination", "Performance tracking"]
    },
    {
      icon: <Gift className="w-8 h-8 text-pink-600" />,
      title: "Festive Campaigns",
      description: "Festival and seasonal promotions",
      features: ["Diwali/Eid specials", "Wedding season campaigns", "Summer/Winter sales"]
    },
    {
      icon: <Sparkles className="w-8 h-8 text-pink-600" />,
      title: "Brand Visibility Boost",
      description: "Increase brand presence on Myntra",
      features: ["Featured placements", "Banner advertising", "Category takeovers"]
    },
    {
      icon: <Percent className="w-8 h-8 text-pink-600" />,
      title: "Discount Strategy",
      description: "Optimal pricing during campaigns",
      features: ["Competitive analysis", "Margin optimization", "Flash sale planning"]
    },
    {
      icon: <Share2 className="w-8 h-8 text-pink-600" />,
      title: "Social Media Integration",
      description: "Cross-platform campaign amplification",
      features: ["Social media teasers", "User-generated content", "Hashtag campaigns"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Campaign Planning",
      description: "Strategy development aligned with Myntra's sale calendar",
      icon: <Calendar className="w-6 h-6 text-pink-600" />
    },
    {
      step: "2", 
      title: "Inventory & Pricing",
      description: "Optimize stock levels and competitive pricing",
      icon: <BarChart3 className="w-6 h-6 text-pink-600" />
    },
    {
      step: "3",
      title: "Campaign Execution",
      description: "Launch campaigns with influencer and visibility support",
      icon: <Zap className="w-6 h-6 text-pink-600" />
    },
    {
      step: "4",
      title: "Analysis & Optimization",
      description: "Real-time monitoring and performance optimization",
      icon: <TrendingUp className="w-6 h-6 text-pink-600" />
    }
  ];

  const successMetrics = [
    { value: "300%", label: "EORS Sales Boost", description: "Average increase" },
    { value: "150+", label: "Campaigns Managed", description: "Across brands" },
    { value: "50+", label: "Influencer Partners", description: "Active network" },
    { value: "5X", label: "Visibility Increase", description: "During sales" }
  ];

  const faqs = [
    {
      question: "What is EORS and why is it important for Myntra sellers?",
      answer: "End of Reason Sale (EORS) is Myntra's biggest bi-annual sale event. It's crucial because it drives massive traffic and can contribute up to 30-40% of annual sales for fashion brands. Proper preparation and strategy are essential to maximize results."
    },
    {
      question: "How do you select influencers for brand campaigns?",
      answer: "We analyze influencer metrics including engagement rate, audience demographics, content style, and brand alignment. We have a network of 50+ verified fashion influencers and select based on your target audience, budget, and campaign objectives."
    },
    {
      question: "How far in advance should we plan for major Myntra sales?",
      answer: "We recommend starting preparation 6-8 weeks before major sales like EORS or Big Fashion Festival. This allows time for inventory planning, pricing strategy, creative assets, and visibility slot bookings which fill up quickly."
    },
    {
      question: "Can you help with Myntra Ads and paid visibility?",
      answer: "Yes, we manage Myntra's advertising platform including sponsored products, brand ads, and display advertising. We optimize bids, targeting, and creative to maximize ROI during campaigns."
    },
    {
      question: "What's the typical ROI on influencer campaigns for fashion brands?",
      answer: "Fashion influencer campaigns on Myntra typically see 3-5X ROI when executed strategically. Results vary based on influencer selection, campaign timing, and creative execution. We provide detailed performance reports for every campaign."
    },
    {
      question: "Do you handle only mega sales or regular promotions too?",
      answer: "We manage both major sales events (EORS, BFF, seasonal sales) and ongoing promotional activities including weekly deals, category promotions, and brand-specific campaigns. Consistent promotion is key to sustained growth on Myntra."
    }
  ];

  const relatedServices = [
    { title: "Brand Onboarding", url: "/growth/myntra-account-management/brand-onboarding", description: "Complete Myntra onboarding support" },
    { title: "Visual Merchandising", url: "/growth/myntra-account-management/visual-merchandising", description: "Product photography & styling" },
    { title: "Returns Management", url: "/growth/myntra-account-management/returns-management", description: "Optimize returns & customer experience" }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Myntra Campaign & Influencer Activation Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Myntra campaign management services including EORS optimization, influencer activations, festive campaigns, and brand visibility boosting.",
    "areaServed": "India",
    "serviceType": "E-commerce Marketing"
  };

  return (
    <>
      <SEO
        title="Myntra Campaign & Influencer Activation Services | EORS Experts | Simply Setup"
        description="Expert Myntra campaign management services. Maximize EORS sales, strategic influencer partnerships, festive campaigns, and brand visibility. 300% average sales boost!"
        canonicalUrl="https://simplysetup.in/growth/myntra-account-management/campaigns"
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
              <span className="text-gray-900">Campaign & Influencer Activation</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-pink-50 via-white to-rose-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-100">
                  <Megaphone className="w-3 h-3 mr-1" /> Campaign Experts
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Campaign & Influencer{" "}
                  <span className="text-pink-600">Activation</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Maximize your sales during EORS, Big Fashion Festival, and beyond. Our campaign experts 
                  drive visibility, influencer partnerships, and strategic promotions for explosive growth.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-pink-600 hover:bg-pink-700" data-testid="button-get-campaign-strategy">
                        Get Campaign Strategy
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Campaign Strategy</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-pink-100 border-2 border-white flex items-center justify-center">
                        <Megaphone className="w-5 h-5 text-pink-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">150+ Campaigns Managed</p>
                    <p className="text-xs text-gray-500">300% average EORS sales boost</p>
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
                Are Your Campaigns Underperforming?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common campaign challenges we solve for fashion brands
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
                <h3 className="text-3xl font-bold text-gray-900">Supercharge Your Myntra Sales</h3>
                <p className="text-gray-600 text-lg">
                  Strategic campaigns and influencer activations that drive explosive growth.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free campaign performance audit</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">EORS readiness assessment</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Access to 50+ fashion influencers</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Real-time campaign monitoring</span>
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
                Everything you need for successful Myntra campaigns
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
                Our Campaign Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Strategic approach to maximize campaign performance
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
                  Everything you need to know about Myntra campaigns and influencer activations
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
              Ready to Dominate Myntra Sales Events?
            </h2>
            <p className="text-pink-100 mb-8 max-w-2xl mx-auto">
              Get expert campaign strategy, influencer partnerships, and visibility optimization. 
              Join brands that have achieved 300% sales boost during EORS.
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
                  <DialogTitle>Get Your Campaign Strategy</DialogTitle>
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
