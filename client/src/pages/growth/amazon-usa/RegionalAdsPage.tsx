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
  Globe, 
  TrendingUp, 
  ArrowRight,
  FileText,
  Users,
  Target,
  BarChart3,
  Megaphone,
  PieChart,
  LineChart,
  Zap,
  DollarSign,
  Calendar,
  Star,
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

export default function RegionalAdsPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <DollarSign className="w-6 h-6 text-red-500" />,
      problem: "High US Ad Costs",
      solution: "Strategic bid management and optimization to maximize ROAS in the competitive US market"
    },
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Wrong Audience Targeting",
      solution: "US consumer behavior analysis and precise audience segmentation for better targeting"
    },
    {
      icon: <Calendar className="w-6 h-6 text-red-500" />,
      problem: "Missing Holiday Opportunities",
      solution: "Strategic campaigns for Prime Day, Black Friday, Cyber Monday, and seasonal peaks"
    },
    {
      icon: <LineChart className="w-6 h-6 text-red-500" />,
      problem: "Unclear Performance Data",
      solution: "Comprehensive reporting with actionable insights and clear ROI metrics"
    }
  ];

  const services = [
    {
      icon: <Target className="w-8 h-8 text-orange-600" />,
      title: "Sponsored Products USA",
      description: "Keyword-targeted ads for maximum product visibility",
      features: ["US keyword research", "Bid optimization", "Negative keyword mining"]
    },
    {
      icon: <Megaphone className="w-8 h-8 text-amber-600" />,
      title: "Sponsored Brands",
      description: "Build brand awareness with headline search ads",
      features: ["Custom creative development", "Store spotlight ads", "Video brand ads"]
    },
    {
      icon: <Star className="w-8 h-8 text-orange-700" />,
      title: "Sponsored Display",
      description: "Retarget shoppers on and off Amazon",
      features: ["Audience retargeting", "Product targeting", "Competitor conquesting"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-amber-700" />,
      title: "Amazon DSP",
      description: "Programmatic display and video advertising",
      features: ["Off-Amazon reach", "Custom audiences", "Cross-device targeting"]
    },
    {
      icon: <Calendar className="w-8 h-8 text-orange-800" />,
      title: "Holiday Campaigns",
      description: "Maximize sales during peak shopping seasons",
      features: ["Prime Day strategy", "Black Friday/Cyber Monday", "Q4 holiday planning"]
    },
    {
      icon: <PieChart className="w-8 h-8 text-amber-800" />,
      title: "Performance Analytics",
      description: "Data-driven insights for continuous improvement",
      features: ["Weekly reporting", "Attribution analysis", "Competitive intelligence"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "US Market Analysis",
      description: "Analyze competition, search trends, and advertising landscape in your category",
      icon: <BarChart3 className="w-6 h-6 text-orange-600" />
    },
    {
      step: "2", 
      title: "Strategy Development",
      description: "Create a custom advertising strategy aligned with your goals and budget",
      icon: <FileText className="w-6 h-6 text-orange-600" />
    },
    {
      step: "3",
      title: "Campaign Launch",
      description: "Set up and launch optimized campaigns across all ad types",
      icon: <Zap className="w-6 h-6 text-orange-600" />
    },
    {
      step: "4",
      title: "Optimize & Scale",
      description: "Continuous optimization with data-driven adjustments to maximize ROAS",
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />
    }
  ];

  const successMetrics = [
    { value: "4.5x", label: "Avg ROAS", description: "Return on ad spend" },
    { value: "$2M+", label: "US Ad Spend Managed", description: "Annually" },
    { value: "45%", label: "ACoS Reduction", description: "In 60 days" },
    { value: "24/7", label: "Campaign Monitoring", description: "Real-time optimization" }
  ];

  const faqs = [
    {
      question: "How is advertising on Amazon USA different from Amazon India?",
      answer: "US advertising is more competitive with higher CPCs, but also offers higher profit potential. US consumers respond to different messaging, and seasonal events (Prime Day, Black Friday, Thanksgiving) are crucial. We adapt strategies for US search behavior, competitive landscape, and shopping patterns."
    },
    {
      question: "What budget do I need for Amazon PPC in the US?",
      answer: "We recommend a minimum of $50-100/day per product for meaningful data collection in the US market. Your ideal budget depends on category competition, product margins, and goals. We help optimize spend to achieve positive ROAS regardless of budget size, starting from $1,500/month."
    },
    {
      question: "What is a good ACoS for the US market?",
      answer: "Target ACoS in the US varies by category but generally ranges from 15-30%. For new product launches, higher ACoS (30-50%) is acceptable for ranking. Break-even ACoS depends on your profit margins - we help calculate your target and optimize towards it systematically."
    },
    {
      question: "How do you handle Prime Day and Black Friday advertising?",
      answer: "We develop specific holiday strategies including budget ramp-up, bid adjustments, deal coordination, and creative optimization. Planning starts 4-6 weeks before major events. We've helped clients increase holiday sales by 300-500% through strategic advertising around these events."
    },
    {
      question: "What is Amazon DSP and when should I use it?",
      answer: "Amazon DSP (Demand-Side Platform) is programmatic advertising that reaches audiences on and off Amazon. It's ideal for brand building, retargeting shoppers who viewed but didn't purchase, and reaching new customers. We recommend DSP when you have established products and want to scale beyond traditional PPC."
    },
    {
      question: "How quickly can I expect results from US PPC campaigns?",
      answer: "Initial data and trends appear within 1-2 weeks. Meaningful optimization typically happens in 4-6 weeks as we gather sufficient data. Full optimization with stable, profitable performance usually takes 2-3 months. We provide weekly reports tracking progress throughout."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Amazon USA Advertising & PPC Management Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Expert Amazon USA advertising management services. Sponsored Products, Sponsored Brands, DSP, and holiday campaign optimization for Indian sellers on Amazon.com.",
    "areaServed": ["India", "United States"],
    "serviceType": "E-commerce Advertising Management"
  };

  return (
    <>
      <SEO
        title="Amazon USA Advertising & PPC Management | US Growth Campaigns | Simply Setup"
        description="Expert Amazon USA advertising services. Sponsored Products, Brands, Display, and DSP campaigns optimized for the US market. Maximize ROAS with holiday campaign strategy!"
        canonicalUrl="https://simplysetup.in/growth/amazon-usa-account-management/regional-ads"
      />

      <Navbar />

      <main className="min-h-screen">
        <div className="bg-gray-50 py-3 border-b">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600">
              <Link href="/growth" className="hover:text-orange-600">Growth</Link>
              <span className="mx-2">/</span>
              <Link href="/growth/amazon-usa-account-management" className="hover:text-orange-600">Amazon USA Account Management</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">US Advertising & Growth</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-orange-50 via-white to-amber-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  <BarChart3 className="w-3 h-3 mr-1" /> US Advertising Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  US Advertising &{" "}
                  <span className="text-orange-600">Growth Campaigns</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Dominate the world's largest e-commerce market with data-driven advertising. 
                  From Sponsored Products to DSP, we maximize your ROAS on Amazon USA.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-orange-600 hover:bg-orange-700" data-testid="button-get-ppc-audit">
                        Get Free PPC Audit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free US PPC Audit</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center">
                        <Users className="w-5 h-5 text-orange-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">$2M+ US Ad Spend Managed</p>
                    <p className="text-xs text-gray-500">Average 4.5x ROAS achieved</p>
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
                US Advertising Challenges We Solve
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common advertising problems we fix for Indian sellers on Amazon USA
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
                <h3 className="text-3xl font-bold text-gray-900">Get Your Free PPC Audit</h3>
                <p className="text-gray-600 text-lg">
                  Let our US advertising experts analyze your campaigns and identify growth opportunities.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free PPC audit worth $300</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Wasted spend analysis</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Keyword opportunity report</span>
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
                Complete US Advertising Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Full-funnel advertising solutions to dominate the US marketplace
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
                Our Advertising Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A proven 4-step approach to profitable US advertising
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
              <p className="text-gray-600">Explore more Amazon USA growth services</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/growth/amazon-usa-account-management/market-entry">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Market Entry</h3>
                    <p className="text-sm text-gray-600">US compliance & registration</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/amazon-usa-account-management/localized-content">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Localized Content</h3>
                    <p className="text-sm text-gray-600">US audience optimization</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/amazon-usa-account-management/cross-border-logistics">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Cross-Border Logistics</h3>
                    <p className="text-sm text-gray-600">FBA Export & shipping</p>
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

        <section className="py-16 bg-gradient-to-r from-orange-600 to-amber-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Dominate US Amazon Advertising?
            </h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Get a free PPC audit and start maximizing your ROAS on Amazon USA
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50">
                  Get Free PPC Audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Free US PPC Audit</DialogTitle>
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

      <Footer />
    </>
  );
}
