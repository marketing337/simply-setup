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
  Shield, 
  TrendingUp, 
  ArrowRight,
  FileText,
  Target,
  Users,
  Heart,
  Gift,
  Megaphone,
  Calendar,
  Award,
  Baby,
  MessageCircle,
  Star,
  Sparkles
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

export default function PromotionsPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Low Mom Engagement",
      solution: "Community-driven campaigns that resonate with parents"
    },
    {
      icon: <Megaphone className="w-6 h-6 text-red-500" />,
      problem: "Ineffective Promotions",
      solution: "Data-driven promotional strategies that convert"
    },
    {
      icon: <Gift className="w-6 h-6 text-red-500" />,
      problem: "Missing Seasonal Sales",
      solution: "Timely campaigns for baby milestones and festivals"
    },
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      problem: "Low Brand Loyalty",
      solution: "FirstCry Club integration for repeat customers"
    }
  ];

  const services = [
    {
      icon: <Users className="w-8 h-8 text-orange-600" />,
      title: "Mom Community Campaigns",
      description: "Engage the FirstCry parenting community",
      features: ["Mom influencer partnerships", "Parenting content marketing", "Community reviews program"]
    },
    {
      icon: <Gift className="w-8 h-8 text-pink-600" />,
      title: "FirstCry Club Promotions",
      description: "Leverage loyalty program for repeat sales",
      features: ["Club member exclusives", "Points multiplier events", "VIP early access"]
    },
    {
      icon: <Calendar className="w-8 h-8 text-purple-600" />,
      title: "Milestone Marketing",
      description: "Target parents at key baby milestones",
      features: ["Newborn bundle campaigns", "First birthday specials", "Back-to-school promos"]
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-green-600" />,
      title: "Content Marketing",
      description: "Educational content that builds trust",
      features: ["Baby care guides", "Product comparison content", "Expert parenting tips"]
    },
    {
      icon: <Sparkles className="w-8 h-8 text-blue-600" />,
      title: "Festival Campaigns",
      description: "Maximize sales during peak seasons",
      features: ["Diwali baby specials", "Summer essentials", "Monsoon care products"]
    },
    {
      icon: <Star className="w-8 h-8 text-coral-600" />,
      title: "Review & Rating Strategy",
      description: "Build social proof with parent reviews",
      features: ["Review generation", "Photo review campaigns", "Response management"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Audience Analysis",
      description: "Understand your target parent demographics and preferences",
      icon: <Users className="w-6 h-6 text-orange-600" />
    },
    {
      step: "2", 
      title: "Campaign Strategy",
      description: "Design mom-focused promotional campaigns",
      icon: <Target className="w-6 h-6 text-orange-600" />
    },
    {
      step: "3",
      title: "Content Creation",
      description: "Create engaging parenting content and promotions",
      icon: <FileText className="w-6 h-6 text-orange-600" />
    },
    {
      step: "4",
      title: "Performance Optimization",
      description: "Monitor, analyze, and optimize campaign performance",
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />
    }
  ];

  const successMetrics = [
    { value: "5X", label: "Engagement Rate", description: "Vs. standard ads" },
    { value: "60%", label: "Repeat Purchase", description: "Rate increase" },
    { value: "200+", label: "Campaigns Run", description: "For baby brands" },
    { value: "3.5X", label: "ROAS Average", description: "Return on ad spend" }
  ];

  const faqs = [
    {
      question: "What makes FirstCry promotions different from other platforms?",
      answer: "FirstCry has a unique parenting community with moms actively seeking advice and recommendations. Our campaigns leverage this community through content marketing, mom influencer partnerships, and FirstCry Club integration for highly targeted and effective promotions."
    },
    {
      question: "How do you leverage the FirstCry Club loyalty program?",
      answer: "We design exclusive promotions for Club members including points multipliers, early access to new products, member-only discounts, and special bundles. This drives repeat purchases and builds brand loyalty among high-value customers."
    },
    {
      question: "What are milestone-based marketing campaigns?",
      answer: "Parents shop heavily during key milestones - pregnancy, newborn phase, first birthday, starting solids, potty training, and school start. We create targeted campaigns for each milestone, reaching parents at exactly the right time with relevant products."
    },
    {
      question: "Do you work with mom influencers and bloggers?",
      answer: "Yes, we have partnerships with parenting influencers and mommy bloggers who create authentic content featuring your products. These collaborations include product reviews, unboxing videos, and usage tutorials that build trust with parent audiences."
    },
    {
      question: "How do you measure promotion success on FirstCry?",
      answer: "We track multiple metrics including ROAS (Return on Ad Spend), conversion rates, customer acquisition cost, repeat purchase rates, and engagement metrics. We provide detailed reports with actionable insights for continuous optimization."
    },
    {
      question: "Can you help with content for the FirstCry parenting blog?",
      answer: "Absolutely! We create educational content like baby care guides, product comparisons, and parenting tips that can be featured on FirstCry's platform. This content marketing builds brand authority and drives organic traffic to your products."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "FirstCry Parenting Community Promotions Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional FirstCry promotional services including mom-focused campaigns, FirstCry Club promotions, milestone marketing, and parenting content marketing for baby brands.",
    "areaServed": "India",
    "serviceType": "E-commerce Marketing Services"
  };

  return (
    <>
      <SEO
        title="FirstCry Promotions & Mom Community Marketing | Baby Brand Campaigns | Simply Setup"
        description="Expert FirstCry promotional services. Mom-focused campaigns, FirstCry Club promotions, milestone marketing, and content marketing for baby brands. 5X engagement rate!"
        canonicalUrl="https://simplysetup.in/growth/firstcry-account-management/promotions"
      />

      <Navbar />

      <main className="min-h-screen">
        <div className="bg-gray-50 py-3 border-b">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600">
              <Link href="/growth" className="hover:text-orange-600">Growth</Link>
              <span className="mx-2">/</span>
              <Link href="/growth/firstcry-account-management" className="hover:text-orange-600">FirstCry Account Management</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Community Promotions</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-orange-50 via-white to-pink-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  <Heart className="w-3 h-3 mr-1" /> Mom Community Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Parenting Community{" "}
                  <span className="text-orange-600">Promotions</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Connect with millions of parents on FirstCry. Our expert campaigns leverage the 
                  parenting community, FirstCry Club, and milestone marketing for maximum engagement.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-orange-600 hover:bg-orange-700" data-testid="button-promotion-strategy">
                        Get Promotion Strategy
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Promotion Strategy</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center">
                        <Baby className="w-5 h-5 text-orange-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">200+ Campaigns Managed</p>
                    <p className="text-xs text-gray-500">Average 5X engagement rate</p>
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
                Are Your Promotions Reaching Parents?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common promotional challenges we solve for FirstCry sellers
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
                <h3 className="text-3xl font-bold text-gray-900">Launch Your Campaign</h3>
                <p className="text-gray-600 text-lg">
                  Let our promotion experts create mom-focused campaigns that drive engagement and sales.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free campaign strategy session</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">5X average engagement rate</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Dedicated campaign manager</span>
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
                Complete Promotional Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Full-spectrum promotional support for baby brands on FirstCry
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
                A proven 4-step approach to successful parenting community campaigns
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
              <p className="text-gray-600">Explore more FirstCry growth services</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/growth/firstcry-account-management/compliance">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Safety Compliance</h3>
                    <p className="text-sm text-gray-600">BIS certification support</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/firstcry-account-management/catalog">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-6 h-6 text-pink-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Catalog Optimization</h3>
                    <p className="text-sm text-gray-600">Nursery product listings</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/firstcry-account-management/inventory">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Inventory Planning</h3>
                    <p className="text-sm text-gray-600">Omni-channel sync</p>
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

        <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Connect with Parents?
            </h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Get a free campaign strategy and start engaging the FirstCry parenting community
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50">
                  Get Free Campaign Strategy
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </main>

      <Footer location={null} />
    </>
  );
}
