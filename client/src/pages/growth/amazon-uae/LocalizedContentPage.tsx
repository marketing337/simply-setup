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
  Edit3,
  Image,
  Star,
  BookOpen,
  Sparkles,
  Target,
  Languages,
  Search,
  LayoutGrid,
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

export default function LocalizedContentPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Languages className="w-6 h-6 text-red-500" />,
      problem: "Missing Arabic Content",
      solution: "Professional Arabic translation and bilingual listings that resonate with Middle East consumers"
    },
    {
      icon: <Search className="w-6 h-6 text-red-500" />,
      problem: "Wrong Regional Keywords",
      solution: "Arabic and English keyword research based on how UAE/GCC customers actually search"
    },
    {
      icon: <Image className="w-6 h-6 text-red-500" />,
      problem: "Culturally Misaligned Content",
      solution: "A+ Content designed with Middle Eastern aesthetics and cultural sensitivities"
    },
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Low Engagement",
      solution: "Messaging that aligns with Gulf consumer preferences and Islamic values"
    }
  ];

  const services = [
    {
      icon: <Languages className="w-8 h-8 text-yellow-600" />,
      title: "Arabic Translation",
      description: "Professional Arabic translation by native speakers",
      features: ["MSA & Gulf Arabic", "Product terminology", "Marketing copy adaptation"]
    },
    {
      icon: <Search className="w-8 h-8 text-yellow-700" />,
      title: "Bilingual Keyword Research",
      description: "Discover how GCC customers search in both languages",
      features: ["Arabic search terms", "English keywords", "Competitor analysis"]
    },
    {
      icon: <Edit3 className="w-8 h-8 text-yellow-600" />,
      title: "Bilingual Copywriting",
      description: "Compelling content in both Arabic and English",
      features: ["Title optimization", "Bullet point writing", "Product descriptions"]
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-700" />,
      title: "A+ Content Design",
      description: "Enhanced brand content for the Middle East market",
      features: ["RTL Arabic design", "Cultural imagery", "Lifestyle adaptation"]
    },
    {
      icon: <BookOpen className="w-8 h-8 text-yellow-600" />,
      title: "Brand Story Creation",
      description: "Tell your brand story for Arabic-speaking audiences",
      features: ["Bilingual narratives", "Hero image design", "Cultural adaptation"]
    },
    {
      icon: <LayoutGrid className="w-8 h-8 text-yellow-700" />,
      title: "Cultural Adaptation",
      description: "Adapt your content for Gulf cultural sensitivities",
      features: ["Islamic compliance", "Local preferences", "Festival marketing"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Cultural Research",
      description: "Analyze UAE/GCC consumer behavior, preferences, and search patterns in your category",
      icon: <Search className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "2", 
      title: "Content Strategy",
      description: "Develop a bilingual localization plan for all listing elements and A+ content",
      icon: <FileText className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "3",
      title: "Translation & Creation",
      description: "Native Arabic writers and designers create culturally-adapted content",
      icon: <Edit3 className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "4",
      title: "Optimize & Test",
      description: "A/B test Arabic vs English content and continuously improve performance",
      icon: <TrendingUp className="w-6 h-6 text-yellow-600" />
    }
  ];

  const successMetrics = [
    { value: "95%", label: "Conversion Lift", description: "With Arabic A+ Content" },
    { value: "400+", label: "Listings Localized", description: "For UAE market" },
    { value: "3.5x", label: "Higher Engagement", description: "Vs English-only" },
    { value: "48hrs", label: "Turnaround", description: "Per listing" }
  ];

  const faqs = [
    {
      question: "Why do I need Arabic content for Amazon UAE?",
      answer: "While many UAE residents speak English, Arabic content significantly improves trust and conversion rates. Studies show Arabic listings receive 40-60% more engagement from local customers. Additionally, many shoppers prefer browsing in Arabic, and proper translation demonstrates respect for the local market."
    },
    {
      question: "What type of Arabic should be used - MSA or Gulf Arabic?",
      answer: "We use Modern Standard Arabic (MSA) for formal product content like titles and descriptions, which is understood across all Arab countries. For marketing copy and A+ Content, we blend MSA with Gulf Arabic expressions that resonate with UAE consumers specifically."
    },
    {
      question: "How do you handle right-to-left (RTL) design for A+ Content?",
      answer: "Our designers are experienced in RTL layouts for Arabic content. We ensure proper text alignment, image placement, and visual flow that feels natural to Arabic readers while maintaining brand consistency with your English content."
    },
    {
      question: "What cultural considerations do you account for?",
      answer: "We ensure all content respects Islamic values and Gulf cultural norms. This includes appropriate imagery (modest fashion, family-friendly), halal-relevant messaging for applicable products, and awareness of local festivals like Ramadan and Eid for marketing opportunities."
    },
    {
      question: "Can you help with Arabic keyword research?",
      answer: "Yes, we conduct comprehensive bilingual keyword research. Arabic search behavior often differs significantly from English - customers may use transliterated brand names, Arabic product terms, or mixed language queries. We identify all high-value search terms in both languages."
    },
    {
      question: "How long does bilingual listing localization take?",
      answer: "A single product listing (Arabic + English titles, bullets, descriptions, backend keywords) takes 48-72 hours. Bilingual A+ Content takes 7-10 business days including RTL design. Full catalog localization timelines depend on product count - we can handle 10-15 products per week."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Amazon UAE Arabic/English Localized Content Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Amazon UAE listing localization and A+ Content creation services. Arabic translation, bilingual keyword research, and culturally-adapted content for Indian sellers.",
    "areaServed": ["India", "United Arab Emirates", "GCC"],
    "serviceType": "E-commerce Content Localization"
  };

  return (
    <>
      <SEO
        title="Amazon UAE Arabic/English Localized Content | Bilingual Listings | Simply Setup"
        description="Expert Amazon UAE listing localization services. Arabic translation, bilingual keyword research, A+ Content design, and cultural adaptation for Indian sellers. Boost your UAE conversions!"
        canonicalUrl="https://simplysetup.in/growth/amazon-uae-account-management/localized-content"
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
              <span className="text-yellow-500">Arabic/English Localized Content</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 lg:py-24">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
          <div className="container mx-auto px-4 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border-yellow-500/50">
                  <Languages className="w-3 h-3 mr-1" /> Bilingual Content Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Arabic/English{" "}
                  <span className="text-yellow-500">Localized Content</span>
                </h1>
                
                <p className="text-lg text-gray-300 leading-relaxed">
                  Connect with Middle Eastern consumers through content in their language. 
                  Our native Arabic writers and designers create bilingual listings that convert browsers into buyers.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" data-testid="button-get-content-audit">
                        Get Free Content Audit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free UAE Content Audit</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-yellow-500/20 border-2 border-gray-700 flex items-center justify-center">
                        <Users className="w-5 h-5 text-yellow-500" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">400+ Listings Localized</p>
                    <p className="text-xs text-gray-400">Average 95% conversion lift</p>
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
                Why Your Current Listings Aren't Working
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Common content problems we fix for Indian sellers on Amazon UAE
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
                <h3 className="text-3xl font-bold text-white">Get Your Listings Localized</h3>
                <p className="text-gray-300 text-lg">
                  Connect with UAE consumers through bilingual content that speaks their language.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                    <span className="text-gray-300">Free content audit worth AED 750</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                    <span className="text-gray-300">Arabic keyword opportunity analysis</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                    <span className="text-gray-300">Bilingual A+ Content recommendations</span>
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
                Complete Bilingual Content Services
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Everything you need to create compelling Arabic and English content for UAE consumers
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
                Our Localization Process
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A proven 4-step approach to creating bilingual content that converts in the UAE market
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
              <Link href="/growth/amazon-uae-account-management/regional-ads">
                <Card className="bg-gray-900 border border-yellow-500/20 hover:border-yellow-500/50 hover:shadow-lg transition-all cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-6 h-6 text-yellow-500" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">UAE Advertising</h3>
                    <p className="text-sm text-gray-400">PPC & growth campaigns</p>
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
                  Common questions about Arabic/English content localization for Amazon UAE
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
              Ready to Connect with UAE Consumers?
            </h2>
            <p className="text-gray-800 mb-8 max-w-2xl mx-auto">
              Get professional Arabic/English content that resonates with Middle Eastern shoppers
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
                  <DialogTitle>Start Your Content Localization Journey</DialogTitle>
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
