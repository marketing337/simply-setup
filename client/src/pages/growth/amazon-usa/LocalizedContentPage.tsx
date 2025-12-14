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
      problem: "Content Doesn't Resonate",
      solution: "Native US English copywriting that connects with American consumers"
    },
    {
      icon: <Search className="w-6 h-6 text-red-500" />,
      problem: "Wrong Keywords",
      solution: "US-specific keyword research based on how Americans actually search"
    },
    {
      icon: <Image className="w-6 h-6 text-red-500" />,
      problem: "Boring Listings",
      solution: "A+ Content and Brand Story that showcase your products beautifully"
    },
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Missing Cultural Context",
      solution: "Messaging that aligns with US consumer preferences and buying behavior"
    }
  ];

  const services = [
    {
      icon: <Search className="w-8 h-8 text-orange-600" />,
      title: "US Keyword Research",
      description: "Discover how American customers search for your products",
      features: ["Regional search terms", "Competitor keyword analysis", "Seasonal trend mapping"]
    },
    {
      icon: <Edit3 className="w-8 h-8 text-amber-600" />,
      title: "US English Copywriting",
      description: "Native copywriters who understand American consumers",
      features: ["Title optimization", "Bullet point writing", "Product descriptions"]
    },
    {
      icon: <Star className="w-8 h-8 text-orange-700" />,
      title: "A+ Content Design",
      description: "Enhanced brand content that converts browsers to buyers",
      features: ["Custom module design", "Comparison charts", "Lifestyle imagery"]
    },
    {
      icon: <BookOpen className="w-8 h-8 text-amber-700" />,
      title: "Brand Story Creation",
      description: "Tell your brand story in a way that resonates with US audience",
      features: ["Brand narrative development", "Hero image design", "About section optimization"]
    },
    {
      icon: <LayoutGrid className="w-8 h-8 text-orange-800" />,
      title: "EBC (Enhanced Brand Content)",
      description: "Premium product pages that stand out from competition",
      features: ["Premium A+ modules", "Video integration", "Interactive elements"]
    },
    {
      icon: <Sparkles className="w-8 h-8 text-amber-800" />,
      title: "Listing Localization",
      description: "Adapt your entire catalog for the US marketplace",
      features: ["Unit conversions", "Pricing psychology", "Cultural adaptation"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Market Research",
      description: "Analyze US competitors, search trends, and consumer preferences in your category",
      icon: <Search className="w-6 h-6 text-orange-600" />
    },
    {
      step: "2", 
      title: "Content Strategy",
      description: "Develop a localization plan for titles, bullets, descriptions, and A+ content",
      icon: <FileText className="w-6 h-6 text-orange-600" />
    },
    {
      step: "3",
      title: "Content Creation",
      description: "Native US writers and designers create compelling localized content",
      icon: <Edit3 className="w-6 h-6 text-orange-600" />
    },
    {
      step: "4",
      title: "Optimize & Test",
      description: "A/B test content variations and continuously improve performance",
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />
    }
  ];

  const successMetrics = [
    { value: "85%", label: "Conversion Lift", description: "With A+ Content" },
    { value: "500+", label: "Listings Localized", description: "For US market" },
    { value: "3x", label: "Higher CTR", description: "Vs non-localized" },
    { value: "72hrs", label: "Turnaround", description: "Per listing" }
  ];

  const faqs = [
    {
      question: "Why can't I just use my India listing for the US market?",
      answer: "US consumers search differently, use different terminology, and have different expectations. Keywords that work in India often have zero search volume in the US. Cultural references, units of measurement, and even spelling (color vs colour) differ. Proper localization typically increases conversion rates by 40-85%."
    },
    {
      question: "What is A+ Content and do I need it?",
      answer: "A+ Content (formerly Enhanced Brand Content) is Amazon's rich media feature that allows brand-registered sellers to add enhanced images, comparison charts, and formatted text to product pages. It typically increases conversions by 5-10% and is essential for competing in the US market where most established brands use it."
    },
    {
      question: "How do you research US keywords for my products?",
      answer: "We use multiple data sources including Amazon's own search data, US-specific keyword tools, competitor analysis, and consumer behavior research. We identify not just high-volume keywords but also the specific language and phrases American shoppers use that differ from Indian English."
    },
    {
      question: "What's included in A+ Brand Story?",
      answer: "Brand Story appears above the A+ Content section and includes your brand's background carousel, hero image, About section, and can link to your Amazon storefront. It helps build brand awareness and customer trust, especially important for international sellers establishing presence in the US."
    },
    {
      question: "Can you help with video content for listings?",
      answer: "Yes, we can help produce or adapt video content for US listings. This includes product videos, lifestyle videos, and how-to content. Video is increasingly important for US Amazon success, with video-enabled listings seeing significantly higher engagement and conversion."
    },
    {
      question: "How long does full listing localization take?",
      answer: "A single product listing (title, bullets, description, backend keywords) takes 48-72 hours. A+ Content takes 5-7 business days including design. Full catalog localization timelines depend on the number of products - we can localize 10-20 products per week with our team."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Amazon USA Localized Listing & A+ Content Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Amazon USA listing localization and A+ Content creation services. US keyword research, native English copywriting, and enhanced brand content for Indian sellers.",
    "areaServed": ["India", "United States"],
    "serviceType": "E-commerce Content Localization"
  };

  return (
    <>
      <SEO
        title="Amazon USA Localized Listing & A+ Content | US Market Optimization | Simply Setup"
        description="Expert Amazon USA listing localization services. US keyword research, native English copywriting, A+ Content design, and Brand Story creation for Indian sellers. Boost your US conversions!"
        canonicalUrl="https://simplysetup.in/growth/amazon-usa-account-management/localized-content"
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
              <span className="text-gray-900">Localized Listing & A+ Content</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-orange-50 via-white to-amber-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  <Edit3 className="w-3 h-3 mr-1" /> US Content Specialist
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Localized Listing &{" "}
                  <span className="text-orange-600">A+ Content for USA</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Connect with American consumers through content that speaks their language. 
                  Our US-native writers and designers create listings that convert browsers into buyers.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-orange-600 hover:bg-orange-700" data-testid="button-get-content-audit">
                        Get Free Content Audit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free US Content Audit</DialogTitle>
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
                    <p className="text-sm font-semibold text-gray-900">500+ Listings Localized</p>
                    <p className="text-xs text-gray-500">Average 85% conversion lift</p>
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
                Why Your Current Listings Aren't Working
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common content problems we fix for Indian sellers on Amazon USA
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
                <h3 className="text-3xl font-bold text-gray-900">Get Your Listings Localized</h3>
                <p className="text-gray-600 text-lg">
                  Connect with US consumers through content that speaks their language.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free content audit worth $200</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">US keyword opportunity analysis</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">A+ Content recommendations</span>
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
                Complete US Content Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to create compelling content for American consumers
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
                Our Localization Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A proven 4-step approach to creating content that converts in the US market
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
              <Link href="/growth/amazon-usa-account-management/cross-border-logistics">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Cross-Border Logistics</h3>
                    <p className="text-sm text-gray-600">FBA Export & shipping</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/amazon-usa-account-management/regional-ads">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="font-semibold mb-2">US Advertising</h3>
                    <p className="text-sm text-gray-600">PPC & growth campaigns</p>
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
              Ready to Connect with US Consumers?
            </h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Get a free content audit and start creating listings that convert American shoppers
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50">
                  Get Free Content Audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Free US Content Audit</DialogTitle>
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
