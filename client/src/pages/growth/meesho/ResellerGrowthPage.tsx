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
  Users,
  MessageCircle,
  Share2,
  Target,
  Heart,
  Network,
  Smartphone,
  ShoppingBag,
  Star,
  Megaphone,
  UserPlus,
  Repeat
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

export default function ResellerGrowthPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Low Reseller Count",
      solution: "Strategic positioning to attract more resellers to your products"
    },
    {
      icon: <Share2 className="w-6 h-6 text-red-500" />,
      problem: "Products Not Being Shared",
      solution: "Optimize product images and pricing for maximum WhatsApp sharing"
    },
    {
      icon: <Repeat className="w-6 h-6 text-red-500" />,
      problem: "No Repeat Orders",
      solution: "Build reseller loyalty with consistent quality and margins"
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-red-500" />,
      problem: "Poor Social Commerce",
      solution: "Create share-worthy content that performs on social platforms"
    }
  ];

  const services = [
    {
      icon: <Network className="w-8 h-8 text-pink-600" />,
      title: "Reseller Attraction",
      description: "Strategies to get more resellers selling your products",
      features: ["Pricing optimization", "Margin analysis", "Category positioning"]
    },
    {
      icon: <Share2 className="w-8 h-8 text-fuchsia-600" />,
      title: "Social Commerce",
      description: "Optimize for WhatsApp and social sharing",
      features: ["Shareable images", "Quick descriptions", "Viral triggers"]
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-purple-600" />,
      title: "WhatsApp Optimization",
      description: "Make your products WhatsApp-ready",
      features: ["Image sizing", "Product captions", "Share templates"]
    },
    {
      icon: <Heart className="w-8 h-8 text-pink-600" />,
      title: "Reseller Retention",
      description: "Keep resellers coming back for more",
      features: ["Quality consistency", "Fast dispatch", "Issue resolution"]
    },
    {
      icon: <Megaphone className="w-8 h-8 text-fuchsia-600" />,
      title: "Promotional Strategy",
      description: "Run campaigns that attract reseller attention",
      features: ["Festival campaigns", "Flash deals", "Bundle offers"]
    },
    {
      icon: <Star className="w-8 h-8 text-purple-600" />,
      title: "Rating Optimization",
      description: "Build trust with excellent seller ratings",
      features: ["Review management", "Quality control", "Customer satisfaction"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Reseller Analysis",
      description: "Understand what makes resellers choose and share products",
      icon: <Users className="w-6 h-6 text-pink-600" />
    },
    {
      step: "2", 
      title: "Content Optimization",
      description: "Create share-worthy product content for social platforms",
      icon: <Share2 className="w-6 h-6 text-pink-600" />
    },
    {
      step: "3",
      title: "Margin Strategy",
      description: "Set margins that make resellers excited to promote",
      icon: <Target className="w-6 h-6 text-pink-600" />
    },
    {
      step: "4",
      title: "Network Growth",
      description: "Scale your reseller network with proven strategies",
      icon: <TrendingUp className="w-6 h-6 text-pink-600" />
    }
  ];

  const successMetrics = [
    { value: "5x", label: "Reseller Growth", description: "Average increase" },
    { value: "80%", label: "Share Rate", description: "On WhatsApp" },
    { value: "150+", label: "Sellers Helped", description: "Build networks" },
    { value: "60%", label: "Repeat Orders", description: "From resellers" }
  ];

  const faqs = [
    {
      question: "How do I attract more resellers to my Meesho products?",
      answer: "Resellers look for products with good margins (10-25%), attractive images, trending designs, and affordable prices. We help optimize all these factors plus ensure fast dispatch and low return rates which builds reseller trust."
    },
    {
      question: "What margin should I offer resellers?",
      answer: "The sweet spot is typically 15-20% margin for resellers. Too low and they won't promote your products; too high and your prices become uncompetitive. We help calculate the optimal margin for your category."
    },
    {
      question: "How can I make my products more shareable on WhatsApp?",
      answer: "Products that go viral have clean images with white backgrounds, clear product visibility, attractive pricing, and simple descriptions. We provide templates and guidelines to make your catalog WhatsApp-ready."
    },
    {
      question: "Why do resellers stop ordering from me?",
      answer: "Common reasons include quality issues, delayed dispatch, high return rates, or better margins elsewhere. We help identify and fix these issues to improve reseller retention."
    },
    {
      question: "Can you help increase my product share count?",
      answer: "Yes! We optimize your product images, titles, and pricing specifically for social sharing. Products with the right combination of visual appeal and margin consistently get more shares."
    },
    {
      question: "How do I build a loyal reseller base?",
      answer: "Consistency is key - maintain quality, ship on time, handle returns gracefully, and keep competitive margins. We help you build systems that ensure consistent reseller experience across all orders."
    }
  ];

  const relatedServices = [
    { title: "Seller Launch", href: "/growth/meesho-account-management/seller-launch", description: "Set up your Meesho seller account" },
    { title: "Catalog Strategy", href: "/growth/meesho-account-management/catalog-strategy", description: "Optimize your product catalog" },
    { title: "Logistics & COD", href: "/growth/meesho-account-management/logistics", description: "Manage shipping and payments" }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Meesho Reseller Growth Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Meesho reseller network growth services. Attract more resellers, optimize for social commerce, and build a loyal reseller base.",
    "areaServed": "India",
    "serviceType": "Social Commerce Optimization"
  };

  return (
    <>
      <SEO
        title="Meesho Reseller Network Growth | Social Commerce Optimization | Simply Setup"
        description="Grow your Meesho reseller network with expert strategies. Optimize for WhatsApp sharing, attract more resellers, and boost repeat orders. Free growth consultation!"
        canonicalUrl="https://simplysetup.in/growth/meesho-account-management/reseller-growth"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Navbar />

      <main className="min-h-screen">
        <div className="bg-gray-50 py-3 border-b">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600">
              <Link href="/growth" className="hover:text-pink-600">Growth</Link>
              <span className="mx-2">/</span>
              <Link href="/growth/meesho-account-management" className="hover:text-pink-600">Meesho Account Management</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Reseller Growth</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-pink-50 via-white to-fuchsia-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-100">
                  <Network className="w-3 h-3 mr-1" /> Reseller Network Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Reseller Network{" "}
                  <span className="text-pink-600">Growth Strategy</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Turn your Meesho store into a reseller magnet. Our social commerce strategies 
                  help you attract, retain, and grow a loyal reseller network.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-pink-600 hover:bg-pink-700" data-testid="button-grow-network">
                        Grow My Network
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Grow Your Reseller Network</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-pink-100 border-2 border-white flex items-center justify-center">
                        <Users className="w-5 h-5 text-pink-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">150+ Sellers Scaled</p>
                    <p className="text-xs text-gray-500">5x average reseller growth</p>
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
                Trusted by Leading Brands
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
                Struggling to Grow Your Reseller Base?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common reseller growth challenges we solve
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
                <h3 className="text-3xl font-bold text-gray-900">Scale Your Reseller Network</h3>
                <p className="text-gray-600 text-lg">
                  Get expert strategies to attract and retain more resellers for your products.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free network growth consultation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">WhatsApp optimization guide</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Reseller retention strategies</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <ZohoFormEmbed />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Complete Reseller Growth Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to build a thriving reseller network
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="border hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-4">{service.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-pink-500" />
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
                Our Growth Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Strategic approach to reseller network expansion
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-2 border-pink-200">
                    {step.icon}
                  </div>
                  <div className="text-sm font-bold text-pink-600 mb-2">Step {step.step}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Services</h2>
              <p className="text-gray-600">Explore more ways to grow on Meesho</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedServices.map((service, index) => (
                <Link key={index} href={service.href}>
                  <Card className="border hover:border-pink-300 hover:shadow-md transition-all cursor-pointer h-full">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-sm text-gray-600">{service.description}</p>
                      <div className="mt-4 text-pink-600 text-sm font-medium flex items-center">
                        Learn more <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
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
                  Everything about growing your reseller network
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border px-6">
                    <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-pink-600">
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

        <section className="py-16 bg-gradient-to-r from-pink-600 to-fuchsia-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Grow Your Reseller Network?
            </h2>
            <p className="text-pink-100 mb-8 max-w-2xl mx-auto">
              Get expert strategies to attract more resellers and boost your Meesho sales
            </p>
            <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50" data-testid="button-cta-reseller">
                  Get Growth Strategy
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Grow Your Reseller Network</DialogTitle>
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
