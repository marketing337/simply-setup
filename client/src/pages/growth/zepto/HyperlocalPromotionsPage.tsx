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
  MapPin,
  Gift,
  Percent,
  Timer,
  Users,
  Megaphone
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

export default function HyperlocalPromotionsPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <MapPin className="w-6 h-6 text-red-500" />,
      problem: "Poor Geo-Targeting",
      solution: "Precision-targeted promotions for specific Zepto delivery zones"
    },
    {
      icon: <Timer className="w-6 h-6 text-red-500" />,
      problem: "Missed Flash Deal Windows",
      solution: "Strategic timing of flash deals during peak demand hours"
    },
    {
      icon: <Percent className="w-6 h-6 text-red-500" />,
      problem: "Low Promotion ROI",
      solution: "Data-driven offer optimization for maximum returns"
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Generic Campaigns",
      solution: "Personalized category promotions based on local preferences"
    }
  ];

  const services = [
    {
      icon: <MapPin className="w-8 h-8 text-purple-600" />,
      title: "Geo-Targeted Offers",
      description: "Location-specific promotions for maximum impact",
      features: ["Zone-wise targeting", "Neighborhood preferences", "Local event tie-ins"]
    },
    {
      icon: <Timer className="w-8 h-8 text-violet-600" />,
      title: "Flash Deal Management",
      description: "Time-sensitive offers that create urgency and drive sales",
      features: ["Peak hour targeting", "Limited-time deals", "Countdown campaigns"]
    },
    {
      icon: <Gift className="w-8 h-8 text-purple-600" />,
      title: "Category Promotions",
      description: "Strategic category-wide offers for visibility boost",
      features: ["Category takeovers", "Bundle deals", "Cross-sell promotions"]
    },
    {
      icon: <Percent className="w-8 h-8 text-fuchsia-600" />,
      title: "Discount Optimization",
      description: "Find the sweet spot for maximum conversions and profit",
      features: ["Price elasticity analysis", "Margin protection", "Competitor benchmarking"]
    },
    {
      icon: <Megaphone className="w-8 h-8 text-indigo-600" />,
      title: "Campaign Planning",
      description: "Strategic promotional calendar for consistent growth",
      features: ["Festival campaigns", "Seasonal promotions", "New launch offers"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
      title: "Performance Analytics",
      description: "Track and optimize promotion performance",
      features: ["ROI tracking", "Conversion analysis", "A/B testing"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Market Analysis",
      description: "Analyze hyperlocal demand patterns and customer preferences",
      icon: <Target className="w-6 h-6 text-purple-600" />
    },
    {
      step: "2", 
      title: "Strategy Design",
      description: "Create targeted promotion strategy for each zone and category",
      icon: <MapPin className="w-6 h-6 text-purple-600" />
    },
    {
      step: "3",
      title: "Campaign Launch",
      description: "Execute geo-targeted promotions with optimal timing",
      icon: <Megaphone className="w-6 h-6 text-purple-600" />
    },
    {
      step: "4",
      title: "Optimize & Scale",
      description: "Analyze results and scale winning campaigns",
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />
    }
  ];

  const successMetrics = [
    { value: "3x", label: "Higher Conversions", description: "With geo-targeting" },
    { value: "150%", label: "Flash Deal Uplift", description: "Average order spike" },
    { value: "45%", label: "Better ROI", description: "On promotions" },
    { value: "200+", label: "Campaigns Managed", description: "Monthly average" }
  ];

  const faqs = [
    {
      question: "What are hyperlocal promotions on Zepto?",
      answer: "Hyperlocal promotions are location-specific offers targeted at customers in particular Zepto delivery zones. These campaigns leverage local demand patterns, demographics, and preferences to create highly relevant offers that drive higher conversions."
    },
    {
      question: "How do flash deals work on Zepto?",
      answer: "Flash deals are time-limited offers that create urgency among customers. We strategically schedule these during peak demand hours (meal times, evenings, weekends) to maximize visibility and sales. The limited-time nature drives immediate action from customers."
    },
    {
      question: "How do you determine which zones to target?",
      answer: "We analyze historical sales data, customer density, competition, and local preferences to identify high-potential zones. Factors like average order value, repeat purchase rates, and category preferences help us prioritize zones for promotional campaigns."
    },
    {
      question: "What types of category promotions do you run?",
      answer: "We run various category promotions including category takeovers, bundle deals, buy-one-get-one offers, percentage discounts, and new product launch campaigns. Each is tailored to the category's characteristics and customer behavior patterns."
    },
    {
      question: "How do you ensure promotion profitability?",
      answer: "We conduct thorough margin analysis before recommending any promotion. Our team balances discount depth with expected volume uplift, ensuring campaigns remain profitable while driving growth. We also set up guardrails to prevent over-discounting."
    },
    {
      question: "Can you manage festival and seasonal campaigns?",
      answer: "Absolutely! We plan and execute comprehensive promotional calendars around festivals (Diwali, Holi, etc.), seasons, and special occasions. These campaigns include pre-event buildup, main event offers, and post-event follow-ups for maximum impact."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Zepto Hyperlocal Promotions & Flash Deal Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Zepto hyperlocal promotion services including geo-targeted offers, flash deal management, and category promotions for quick commerce success.",
    "areaServed": "India",
    "serviceType": "Quick Commerce Promotion Services"
  };

  return (
    <>
      <SEO
        title="Zepto Hyperlocal Promotions | Flash Deals & Geo-Targeted Offers | Simply Setup"
        description="Boost your Zepto sales with hyperlocal promotions. Expert geo-targeted offers, flash deal management, and category promotions for 10-minute delivery success."
        canonicalUrl="https://simplysetup.in/growth/zepto-account-management/hyperlocal-promotions"
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
              <span className="text-gray-900">Hyperlocal Promotions</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-purple-50 via-white to-violet-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                  <Target className="w-3 h-3 mr-1" /> Promotion Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Hyperlocal{" "}
                  <span className="text-purple-600">Promotions</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Drive explosive sales with geo-targeted offers and flash deals. Our hyperlocal 
                  promotion strategies help you reach the right customers at the right time on Zepto.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-purple-600 hover:bg-purple-700" data-testid="button-hyperlocal-promotions">
                        Launch Promotions
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Hyperlocal Promotion Strategy</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center">
                        <Gift className="w-5 h-5 text-purple-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">3x Higher Conversions</p>
                    <p className="text-xs text-gray-500">With geo-targeted campaigns</p>
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
                Promotion Challenges We Solve
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common promotional challenges for quick commerce sellers on Zepto
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
                <h3 className="text-3xl font-bold text-gray-900">Supercharge Your Zepto Sales</h3>
                <p className="text-gray-600 text-lg">
                  Get expert promotion strategy for your Zepto quick commerce business.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free promotion audit</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Geo-targeted campaign planning</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Flash deal optimization</span>
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
                Complete Promotion Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                End-to-end promotion management for your Zepto quick commerce success
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
                Our Promotion Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A strategic 4-step approach to hyperlocal promotions on Zepto
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
              <Link href="/growth/zepto-account-management/sla-monitoring">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-fuchsia-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-6 h-6 text-fuchsia-600" />
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
              Ready to Boost Your Zepto Sales?
            </h2>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              Launch hyperlocal promotions and flash deals to drive massive growth on Zepto.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100" data-testid="button-cta-promotions">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Hyperlocal Promotion Strategy</DialogTitle>
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
