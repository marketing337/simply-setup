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
      problem: "Machine Translation Fails",
      solution: "Native Japanese copywriters who understand nuance, keigo (polite language), and cultural context"
    },
    {
      icon: <Search className="w-6 h-6 text-red-500" />,
      problem: "Wrong Japanese Keywords",
      solution: "Japan-specific keyword research including kanji, hiragana, and katakana variations"
    },
    {
      icon: <Image className="w-6 h-6 text-red-500" />,
      problem: "Unengaging Listings",
      solution: "A+ Content and Brand Story designed for Japanese consumer preferences"
    },
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Cultural Misalignment",
      solution: "Messaging that resonates with Japanese values: quality, attention to detail, and trust"
    }
  ];

  const services = [
    {
      icon: <Search className="w-8 h-8 text-red-600" />,
      title: "Japanese Keyword Research",
      description: "Discover how Japanese customers search for your products",
      features: ["Kanji/hiragana/katakana terms", "Seasonal search trends", "Competitor keyword analysis"]
    },
    {
      icon: <Edit3 className="w-8 h-8 text-red-700" />,
      title: "Native Japanese Copywriting",
      description: "Professional translators with e-commerce expertise",
      features: ["Title optimization", "Bullet point writing", "Product descriptions"]
    },
    {
      icon: <Star className="w-8 h-8 text-red-800" />,
      title: "A+ Content Design",
      description: "Enhanced brand content optimized for Japanese consumers",
      features: ["Custom module design", "Comparison charts", "Lifestyle imagery"]
    },
    {
      icon: <BookOpen className="w-8 h-8 text-rose-600" />,
      title: "Brand Story Creation",
      description: "Tell your brand story in authentic Japanese",
      features: ["Brand narrative localization", "Hero image design", "About section optimization"]
    },
    {
      icon: <LayoutGrid className="w-8 h-8 text-red-700" />,
      title: "Product Page Optimization",
      description: "Complete listing optimization for Amazon.co.jp",
      features: ["Image optimization", "Review response templates", "Q&A management"]
    },
    {
      icon: <Sparkles className="w-8 h-8 text-rose-700" />,
      title: "Cultural Adaptation",
      description: "Adapt your brand for the Japanese market",
      features: ["Cultural sensitivity review", "Color psychology", "Seasonal messaging"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Market Research",
      description: "Analyze Japanese competitors, search trends, and consumer preferences in your category",
      icon: <Search className="w-6 h-6 text-red-600" />
    },
    {
      step: "2", 
      title: "Content Strategy",
      description: "Develop a localization plan for titles, bullets, descriptions, and A+ content",
      icon: <FileText className="w-6 h-6 text-red-600" />
    },
    {
      step: "3",
      title: "Content Creation",
      description: "Native Japanese writers and designers create compelling localized content",
      icon: <Edit3 className="w-6 h-6 text-red-600" />
    },
    {
      step: "4",
      title: "Optimize & Test",
      description: "A/B test content variations and continuously improve performance",
      icon: <TrendingUp className="w-6 h-6 text-red-600" />
    }
  ];

  const successMetrics = [
    { value: "90%", label: "Conversion Lift", description: "With native content" },
    { value: "400+", label: "Listings Localized", description: "For Japan market" },
    { value: "3.5x", label: "Higher CTR", description: "Vs translated content" },
    { value: "48hrs", label: "Turnaround", description: "Per listing" }
  ];

  const faqs = [
    {
      question: "Why can't I just use Google Translate for my Japanese listings?",
      answer: "Machine translation fails to capture Japanese nuances, keigo (politeness levels), and cultural context. Japanese consumers are extremely detail-oriented and can immediately spot poor translations, which damages trust. Native copywriting typically increases conversions by 50-90% compared to machine-translated content."
    },
    {
      question: "What makes Japanese keyword research different?",
      answer: "Japanese uses three writing systems: kanji (Chinese characters), hiragana (native syllabary), and katakana (foreign words). Customers search using different combinations. For example, 'bag' might be searched as バッグ (katakana), かばん (hiragana), or 鞄 (kanji). We research all variations to maximize visibility."
    },
    {
      question: "What is A+ Content and does it work in Japan?",
      answer: "A+ Content (商品紹介コンテンツ) is Amazon's enhanced content feature. It's highly effective in Japan where consumers value detailed product information. Japanese shoppers spend more time reading product pages than Western consumers, making A+ Content even more important for building trust and converting sales."
    },
    {
      question: "How do you handle Japanese cultural preferences?",
      answer: "We understand Japanese consumer psychology: emphasis on quality over price, importance of seasonality (sakura season, New Year, Obon), preference for detailed specifications, and the cultural significance of packaging. Our content reflects these values while maintaining your brand identity."
    },
    {
      question: "Can you help with Japanese customer review responses?",
      answer: "Yes, we provide review response templates and ongoing review management. Japanese customers expect polite, formal responses using appropriate keigo. Negative reviews handled incorrectly can severely damage your reputation. We help maintain proper tone while addressing customer concerns."
    },
    {
      question: "How long does full listing localization take?",
      answer: "A single product listing (title, bullets, description, backend keywords) takes 48-72 hours with native writers. A+ Content takes 5-7 business days including design. Full catalog localization timelines depend on the number of products - we can localize 8-15 products per week."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Amazon Japan Localized Content & A+ Design Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Amazon Japan listing localization and A+ Content creation services. Native Japanese copywriting, keyword research, and enhanced brand content for Indian sellers.",
    "areaServed": ["India", "Japan"],
    "serviceType": "E-commerce Content Localization"
  };

  return (
    <>
      <SEO
        title="Amazon Japan Localized Content & A+ Design | Japanese Copywriting | Simply Setup"
        description="Expert Amazon Japan listing localization services. Native Japanese copywriting, keyword research, A+ Content design, and cultural adaptation for Indian sellers. Boost your Japan conversions!"
        canonicalUrl="https://simplysetup.in/growth/amazon-japan-account-management/localized-content"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Navbar />

      <main className="min-h-screen">
        <div className="bg-gray-50 py-3 border-b">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600">
              <Link href="/growth" className="hover:text-red-600">Growth</Link>
              <span className="mx-2">/</span>
              <Link href="/growth/amazon-japan-account-management" className="hover:text-red-600">Amazon Japan Account Management</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Japanese Localized Content</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-red-50 via-white to-rose-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                  <Edit3 className="w-3 h-3 mr-1" /> Japanese Content Specialist
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Japanese Localized Content &{" "}
                  <span className="text-red-600">A+ Design</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Connect with Japanese consumers through content that speaks their language authentically. 
                  Our native Japanese writers and designers create listings that build trust and convert.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-red-600 hover:bg-red-700" data-testid="button-get-content-audit">
                        Get Free Content Audit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free Japanese Content Audit</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-red-100 border-2 border-white flex items-center justify-center">
                        <Languages className="w-5 h-5 text-red-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">400+ Listings Localized</p>
                    <p className="text-xs text-gray-500">Average 90% conversion lift</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-8 border">
                  <div className="grid grid-cols-2 gap-6">
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="text-center p-4 bg-red-50 rounded-xl">
                        <p className="text-3xl font-bold text-red-600">{metric.value}</p>
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
              <div className="w-20 h-1 bg-red-600 mx-auto my-3 rounded-sm"></div>
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
                Japanese Content Challenges We Solve
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common localization problems we fix for Indian sellers on Amazon Japan
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {painPoints.map((point, index) => (
                <Card key={index} className="border-2 hover:border-red-200 transition-colors">
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
                <h3 className="text-3xl font-bold text-gray-900">Get Your Free Content Audit</h3>
                <p className="text-gray-600 text-lg">
                  Let our Japanese content experts analyze your listings and identify improvement opportunities.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free content quality assessment</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Japanese keyword opportunity report</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Competitor content analysis</span>
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
                Complete Localization Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                End-to-end Japanese content creation for Amazon.co.jp success
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

        <section className="py-16 bg-red-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Localization Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A proven 4-step approach to authentic Japanese content
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    {step.icon}
                  </div>
                  <div className="bg-red-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3">
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
              <p className="text-gray-600">Explore more Amazon Japan growth services</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/growth/amazon-japan-account-management/market-entry">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Market Entry</h3>
                    <p className="text-sm text-gray-600">Japan compliance & JCT</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/amazon-japan-account-management/cross-border-logistics">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-6 h-6 text-rose-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Cross-Border Logistics</h3>
                    <p className="text-sm text-gray-600">FBA Japan & shipping</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/amazon-japan-account-management/regional-ads">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Japan Advertising</h3>
                    <p className="text-sm text-gray-600">PPC & growth campaigns</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Common questions about Japanese content localization
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border px-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-red-600">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-16 bg-red-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Connect with Japanese Consumers?
            </h2>
            <p className="text-red-100 mb-8 max-w-2xl mx-auto">
              Let our native Japanese content experts create listings that build trust and drive sales
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-red-50" data-testid="button-cta-japan-content">
                  Get Japanese Content Audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Free Japanese Content Audit</DialogTitle>
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
