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
  Award,
  Languages
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
      icon: <Languages className="w-6 h-6 text-red-500" />,
      problem: "Missing Arabic Keywords",
      solution: "Bilingual keyword research covering both Arabic and English search terms in UAE"
    },
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Wrong Audience Targeting",
      solution: "UAE/GCC consumer behavior analysis and precise audience segmentation"
    },
    {
      icon: <Calendar className="w-6 h-6 text-red-500" />,
      problem: "Missing Ramadan Opportunities",
      solution: "Strategic campaigns for Ramadan, Eid, National Day, and regional shopping seasons"
    },
    {
      icon: <DollarSign className="w-6 h-6 text-red-500" />,
      problem: "Wasted Ad Spend",
      solution: "Optimized bidding strategies tailored for the Middle East market dynamics"
    }
  ];

  const services = [
    {
      icon: <Target className="w-8 h-8 text-yellow-600" />,
      title: "Sponsored Products UAE",
      description: "Bilingual keyword-targeted ads for maximum visibility",
      features: ["Arabic keyword research", "English keyword optimization", "Competitor analysis"]
    },
    {
      icon: <Megaphone className="w-8 h-8 text-yellow-700" />,
      title: "Sponsored Brands",
      description: "Build brand awareness in the Middle East market",
      features: ["Bilingual creative development", "Store spotlight ads", "Video brand ads"]
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-600" />,
      title: "Sponsored Display",
      description: "Retarget shoppers across UAE and GCC",
      features: ["Audience retargeting", "Product targeting", "Competitor conquesting"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-yellow-700" />,
      title: "Amazon DSP UAE",
      description: "Programmatic display and video advertising",
      features: ["GCC audience reach", "Custom segments", "Cross-platform targeting"]
    },
    {
      icon: <Calendar className="w-8 h-8 text-yellow-600" />,
      title: "Ramadan & Eid Campaigns",
      description: "Maximize sales during Islamic shopping seasons",
      features: ["Ramadan strategy", "Eid promotions", "National Day campaigns"]
    },
    {
      icon: <PieChart className="w-8 h-8 text-yellow-700" />,
      title: "Performance Analytics",
      description: "Data-driven insights for continuous improvement",
      features: ["Weekly reporting", "Arabic vs English analysis", "ROAS optimization"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "UAE Market Analysis",
      description: "Analyze competition, bilingual search trends, and advertising landscape in your category",
      icon: <BarChart3 className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "2", 
      title: "Strategy Development",
      description: "Create a custom advertising strategy for Arabic and English audiences",
      icon: <FileText className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "3",
      title: "Campaign Launch",
      description: "Set up and launch optimized bilingual campaigns across all ad types",
      icon: <Zap className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "4",
      title: "Optimize & Scale",
      description: "Continuous optimization with regional insights to maximize ROAS",
      icon: <TrendingUp className="w-6 h-6 text-yellow-600" />
    }
  ];

  const successMetrics = [
    { value: "5.2x", label: "Avg ROAS", description: "Return on ad spend" },
    { value: "AED 3M+", label: "Ad Spend Managed", description: "Annually" },
    { value: "50%", label: "ACoS Reduction", description: "In 60 days" },
    { value: "24/7", label: "Campaign Monitoring", description: "Real-time optimization" }
  ];

  const faqs = [
    {
      question: "How is advertising on Amazon UAE different from Amazon India?",
      answer: "UAE advertising requires bilingual approach (Arabic and English), understanding of Islamic calendar seasons like Ramadan and Eid, and knowledge of Gulf consumer behavior. CPCs can be higher in some categories, but conversion rates are often better due to higher purchasing power. We adapt strategies for UAE-specific search behavior and cultural preferences."
    },
    {
      question: "Should I run ads in Arabic or English for Amazon UAE?",
      answer: "We recommend both. While many UAE residents speak English, a significant portion of shoppers search in Arabic. Our bilingual keyword research identifies opportunities in both languages. Typically, we allocate budget between Arabic and English campaigns based on performance data specific to your category."
    },
    {
      question: "What budget do I need for Amazon PPC in the UAE?",
      answer: "We recommend a minimum of AED 150-300/day per product for meaningful data collection in the UAE market. Your ideal budget depends on category competition, product margins, and goals. We help optimize spend to achieve positive ROAS regardless of budget size, starting from AED 5,000/month."
    },
    {
      question: "How do you handle Ramadan advertising?",
      answer: "Ramadan is the biggest shopping season in the Middle East. We develop comprehensive Ramadan strategies including pre-Ramadan buildup, iftar timing optimization, Eid preparation campaigns, and special promotions. Planning starts 6-8 weeks before Ramadan. We've helped clients increase Ramadan sales by 400-600%."
    },
    {
      question: "What is a good ACoS for the UAE market?",
      answer: "Target ACoS in UAE typically ranges from 12-25% depending on category. The UAE market often has better margins than India due to higher selling prices. For new product launches, higher ACoS (25-40%) is acceptable for ranking. We help calculate your target based on actual profit margins."
    },
    {
      question: "Can you run ads targeting other GCC countries?",
      answer: "Yes, Amazon UAE can deliver to Saudi Arabia, Kuwait, Bahrain, Oman, and Qatar. We can create campaigns targeting these countries specifically. For dedicated Saudi campaigns, we also manage Amazon.sa advertising which has its own marketplace and advertising platform."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Amazon UAE Advertising & PPC Management Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Expert Amazon UAE advertising management services. Bilingual Sponsored Products, Sponsored Brands, DSP, and Ramadan campaign optimization for Indian sellers on Amazon.ae.",
    "areaServed": ["India", "United Arab Emirates", "GCC"],
    "serviceType": "E-commerce Advertising Management"
  };

  return (
    <>
      <SEO
        title="Amazon UAE Advertising & PPC Management | Arabic/English Campaigns | Simply Setup"
        description="Expert Amazon UAE advertising services. Bilingual Sponsored Products, Brands, Display, and DSP campaigns for the Middle East market. Maximize ROAS with Ramadan & Eid strategies!"
        canonicalUrl="https://simplysetup.in/growth/amazon-uae-account-management/regional-ads"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Navbar />

      <main className="min-h-screen">
        <div className="bg-gray-900 py-3 border-b border-yellow-600/30">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-300">
              <Link href="/growth" className="hover:text-yellow-500">Growth</Link>
              <span className="mx-2">/</span>
              <Link href="/growth/amazon-uae-account-management" className="hover:text-yellow-500">Amazon UAE Account Management</Link>
              <span className="mx-2">/</span>
              <span className="text-yellow-500">UAE Regional Advertising</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 lg:py-24">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
          <div className="container mx-auto px-4 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border-yellow-500/50">
                  <BarChart3 className="w-3 h-3 mr-1" /> UAE Advertising Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  UAE Regional{" "}
                  <span className="text-yellow-500">Advertising & PPC</span>
                </h1>
                
                <p className="text-lg text-gray-300 leading-relaxed">
                  Dominate the Middle East's fastest-growing e-commerce market with bilingual advertising. 
                  From Arabic keyword campaigns to Ramadan strategies, we maximize your ROAS on Amazon UAE.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" data-testid="button-get-ppc-audit">
                        Get Free PPC Audit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free UAE PPC Audit</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-yellow-500/20 border-2 border-gray-700 flex items-center justify-center">
                        <Target className="w-5 h-5 text-yellow-500" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">AED 3M+ Ad Spend Managed</p>
                    <p className="text-xs text-gray-400">Average 5.2x ROAS</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gray-800/50 backdrop-blur rounded-2xl shadow-xl p-8 border border-yellow-500/20">
                  <div className="grid grid-cols-2 gap-6">
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="text-center p-4 bg-gray-900/50 rounded-xl border border-yellow-500/10">
                        <p className="text-3xl font-bold text-yellow-500">{metric.value}</p>
                        <p className="text-sm font-medium text-white mt-1">{metric.label}</p>
                        <p className="text-xs text-gray-400">{metric.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-gray-900 py-8 border-t border-b border-yellow-500/20 overflow-hidden">
          <div className="max-w-6xl mx-auto px-5">
            <div className="text-center mb-5">
              <h2 className="text-2xl text-white font-bold mb-1 leading-tight">
                Trusted by Leading Brands
              </h2>
              <div className="w-20 h-1 bg-yellow-500 mx-auto my-3 rounded-sm"></div>
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
                        <img className="max-w-full max-h-12 object-contain brightness-0 invert opacity-70" src={logo.src} alt={logo.alt} />
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

        <section className="py-16 bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Common UAE Advertising Challenges
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Advertising hurdles we help Indian sellers overcome in the Middle East
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {painPoints.map((point, index) => (
                <Card key={index} className="bg-gray-900 border-2 border-yellow-500/20 hover:border-yellow-500/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="mb-4">{point.icon}</div>
                    <h3 className="font-semibold text-white mb-2">{point.problem}</h3>
                    <p className="text-sm text-gray-400">{point.solution}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">Get Your Free PPC Audit</h3>
                <p className="text-gray-300 text-lg">
                  Discover untapped opportunities in your UAE advertising campaigns.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                    <span className="text-gray-300">Free campaign performance analysis worth AED 1,500</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                    <span className="text-gray-300">Arabic keyword opportunity report</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                    <span className="text-gray-300">Competitor advertising insights</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <ZohoFormEmbed />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Complete UAE Advertising Services
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Full-funnel advertising solutions for the Middle East market
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="bg-gray-900 border border-yellow-500/20 hover:border-yellow-500/40 hover:shadow-lg hover:shadow-yellow-500/10 transition-all">
                  <CardHeader>
                    <div className="mb-2">{service.icon}</div>
                    <CardTitle className="text-lg text-white">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-yellow-500 mr-2 shrink-0" />
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

        <section className="py-16 bg-gradient-to-br from-yellow-500/10 to-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Our Advertising Process
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A proven 4-step approach to advertising success in the UAE market
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md border border-yellow-500/30">
                    {step.icon}
                  </div>
                  <div className="bg-yellow-500 text-gray-900 text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Related Services</h2>
              <p className="text-gray-400">Explore more Amazon UAE growth services</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/growth/amazon-uae-account-management/market-entry">
                <Card className="bg-gray-900 border border-yellow-500/20 hover:border-yellow-500/50 hover:shadow-lg transition-all cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-6 h-6 text-yellow-500" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">Market Entry</h3>
                    <p className="text-sm text-gray-400">UAE compliance & registration</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/amazon-uae-account-management/localized-content">
                <Card className="bg-gray-900 border border-yellow-500/20 hover:border-yellow-500/50 hover:shadow-lg transition-all cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-6 h-6 text-yellow-500" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">Localized Content</h3>
                    <p className="text-sm text-gray-400">Arabic/English optimization</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/amazon-uae-account-management/cross-border-logistics">
                <Card className="bg-gray-900 border border-yellow-500/20 hover:border-yellow-500/50 hover:shadow-lg transition-all cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-6 h-6 text-yellow-500" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">Cross-Border Logistics</h3>
                    <p className="text-sm text-gray-400">FBA UAE & GCC shipping</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-400">
                  Common questions about Amazon UAE advertising and PPC management
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-gray-800 rounded-lg border border-yellow-500/20 px-6">
                    <AccordionTrigger className="text-left text-white hover:text-yellow-500">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-400">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-yellow-600 to-yellow-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Dominate UAE Advertising?
            </h2>
            <p className="text-gray-800 mb-8 max-w-2xl mx-auto">
              Get expert bilingual PPC management that maximizes your ROAS in the Middle East market
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white" data-testid="button-cta-get-started">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Start Your UAE Advertising Journey</DialogTitle>
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
