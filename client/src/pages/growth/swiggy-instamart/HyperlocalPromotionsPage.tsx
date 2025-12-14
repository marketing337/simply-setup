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
  Megaphone,
  Users,
  Percent,
  Tag,
  Calendar,
  Award
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
      problem: "Poor Targeting",
      solution: "Hyperlocal campaigns targeting specific neighborhoods and zones"
    },
    {
      icon: <Percent className="w-6 h-6 text-red-500" />,
      problem: "Low Promotion ROI",
      solution: "Data-driven offer strategies that maximize return on investment"
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Weak Brand Awareness",
      solution: "Strategic sampling programs to acquire new customers"
    },
    {
      icon: <Calendar className="w-6 h-6 text-red-500" />,
      problem: "Missed Seasonal Sales",
      solution: "Festival and event-based promotional campaigns"
    }
  ];

  const services = [
    {
      icon: <MapPin className="w-8 h-8 text-orange-600" />,
      title: "Hyperlocal Targeting",
      description: "Location-based campaigns for specific neighborhoods on Instamart",
      features: ["Zone-wise targeting", "Dark store radius campaigns", "Local event promotions"]
    },
    {
      icon: <Percent className="w-8 h-8 text-red-600" />,
      title: "Instamart Deals Setup",
      description: "Create compelling deals and offers on Swiggy Instamart platform",
      features: ["Flash deals", "Bundle offers", "Combo promotions"]
    },
    {
      icon: <Gift className="w-8 h-8 text-orange-500" />,
      title: "Sampling Programs",
      description: "Strategic product sampling to drive trial and awareness",
      features: ["Free sample campaigns", "Trial pack offers", "New product launches"]
    },
    {
      icon: <Megaphone className="w-8 h-8 text-green-600" />,
      title: "In-App Advertising",
      description: "Visibility campaigns within Swiggy Instamart app",
      features: ["Banner placements", "Category sponsorships", "Search promotions"]
    },
    {
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      title: "Festival Campaigns",
      description: "Seasonal and festival-based promotional strategies",
      features: ["Diwali specials", "Summer campaigns", "Back-to-school offers"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
      title: "Campaign Analytics",
      description: "Performance tracking and optimization for all promotions",
      features: ["ROI measurement", "A/B testing", "Customer insights"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Market Analysis",
      description: "Analyze local demand patterns and competitor promotions on Instamart",
      icon: <Target className="w-6 h-6 text-orange-600" />
    },
    {
      step: "2", 
      title: "Campaign Design",
      description: "Create targeted hyperlocal promotional strategies",
      icon: <Megaphone className="w-6 h-6 text-orange-600" />
    },
    {
      step: "3",
      title: "Launch & Execute",
      description: "Deploy campaigns with optimal timing and targeting",
      icon: <Zap className="w-6 h-6 text-orange-600" />
    },
    {
      step: "4",
      title: "Optimize & Scale",
      description: "Analyze results and scale successful promotions",
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />
    }
  ];

  const successMetrics = [
    { value: "180%", label: "Avg. Sales Lift", description: "During promotions" },
    { value: "45%", label: "New Customer Rate", description: "From campaigns" },
    { value: "3.5x", label: "ROAS Average", description: "Return on ad spend" },
    { value: "200+", label: "Campaigns Managed", description: "Monthly average" }
  ];

  const faqs = [
    {
      question: "What are hyperlocal promotions on Swiggy Instamart?",
      answer: "Hyperlocal promotions are targeted marketing campaigns that focus on specific geographic areas, neighborhoods, or dark store zones. This allows you to customize offers based on local demand patterns and maximize ROI by targeting customers most likely to convert."
    },
    {
      question: "How do Instamart deals and offers work?",
      answer: "Instamart offers various promotion types including flash deals, percentage discounts, bundle offers, and combo deals. We help you select the right promotion type, set optimal pricing, and time your campaigns for maximum impact."
    },
    {
      question: "What is a sampling program and how does it help?",
      answer: "Sampling programs allow you to offer free or heavily discounted trial-size products to customers. This is an effective way to introduce new products, drive trial, and convert first-time buyers into repeat customers on Instamart."
    },
    {
      question: "How do you measure promotion performance?",
      answer: "We track key metrics including sales lift during promotion, new customer acquisition, ROAS (Return on Ad Spend), redemption rates, and post-promotion retention. Our analytics dashboards provide real-time visibility into campaign performance."
    },
    {
      question: "Can you run promotions for specific festivals or events?",
      answer: "Absolutely! Festival and event-based campaigns are highly effective on Instamart. We plan campaigns around major festivals like Diwali, Holi, and regional celebrations, as well as occasions like summer holidays, back-to-school, and New Year."
    },
    {
      question: "How much budget do I need for Instamart promotions?",
      answer: "Promotion budgets vary based on your goals and scale. We can start with focused hyperlocal campaigns for a few thousand rupees and scale up based on results. Our team helps optimize your budget for maximum ROI regardless of scale."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Swiggy Instamart Hyperlocal Promotions & Marketing Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional hyperlocal promotion services for Swiggy Instamart. Location-based campaigns, Instamart deals setup, sampling programs, and festival promotions to drive sales.",
    "areaServed": "India",
    "serviceType": "Quick Commerce Marketing Services"
  };

  return (
    <>
      <SEO
        title="Swiggy Instamart Hyperlocal Promotions | Location-Based Marketing | Simply Setup"
        description="Boost your Swiggy Instamart sales with hyperlocal promotions. Expert location-based campaigns, Instamart deals setup, sampling programs, and festival marketing. Maximize your quick commerce ROI!"
        canonicalUrl="https://simplysetup.in/growth/swiggy-instamart-account-management/hyperlocal-promotions"
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
              <span className="text-gray-900">Hyperlocal Promotions</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-orange-50 via-white to-red-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  <Megaphone className="w-3 h-3 mr-1" /> Instamart Marketing Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Hyperlocal{" "}
                  <span className="text-orange-600">Promotions</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Drive explosive sales growth on Swiggy Instamart with targeted hyperlocal campaigns. 
                  Reach the right customers with the right offers at the right time.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-orange-600 hover:bg-orange-700" data-testid="button-start-promotions">
                        Start Promotions
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Launch Hyperlocal Promotions on Instamart</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center">
                        <Target className="w-5 h-5 text-orange-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">200+ Campaigns Monthly</p>
                    <p className="text-xs text-gray-500">3.5x average ROAS</p>
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
                Common Instamart Marketing Challenges
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Promotion problems we solve for Swiggy Instamart sellers
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
                <h3 className="text-3xl font-bold text-gray-900">Boost Your Instamart Sales</h3>
                <p className="text-gray-600 text-lg">
                  Let our marketing experts create high-impact promotional campaigns for your Instamart store.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free promotional strategy consultation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Hyperlocal targeting expertise</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">ROI-focused campaign management</span>
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
                End-to-end marketing solutions for Swiggy Instamart success
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
                Our Campaign Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A strategic approach to maximize your Instamart promotional ROI
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
              <Link href="/growth/swiggy-instamart-account-management/sla-monitoring">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-6 h-6 text-green-600" />
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
              Ready to Boost Your Instamart Sales?
            </h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Launch targeted hyperlocal campaigns that drive real results. 
              Let our experts help you maximize your Swiggy Instamart promotional ROI.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100" data-testid="button-cta-promotions">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Start Your Instamart Promotions</DialogTitle>
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
