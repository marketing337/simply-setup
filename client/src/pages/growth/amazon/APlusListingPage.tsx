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
  ShoppingCart,
  Shield, 
  Users, 
  Zap, 
  TrendingUp, 
  ArrowRight,
  Package,
  FileText,
  Clock,
  Target,
  BarChart3,
  Image,
  Palette,
  Layout,
  Award,
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

export default function APlusListingPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Image className="w-6 h-6 text-red-500" />,
      problem: "Generic Product Pages",
      solution: "Premium A+ Content that showcases your brand story and product benefits"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-red-500" />,
      problem: "Low Conversion Rates",
      solution: "Visually rich content proven to increase conversions by up to 10%"
    },
    {
      icon: <Star className="w-6 h-6 text-red-500" />,
      problem: "Brand Not Standing Out",
      solution: "Custom-designed modules that differentiate you from competitors"
    },
    {
      icon: <Layout className="w-6 h-6 text-red-500" />,
      problem: "Poor Mobile Experience",
      solution: "Mobile-optimized designs that look great on all devices"
    }
  ];

  const services = [
    {
      icon: <Image className="w-8 h-8 text-purple-600" />,
      title: "A+ Content Design",
      description: "Premium enhanced brand content for product pages",
      features: ["Custom module layouts", "High-quality imagery", "Brand storytelling"]
    },
    {
      icon: <Layout className="w-8 h-8 text-blue-600" />,
      title: "Amazon Brand Store",
      description: "Multi-page storefront for your brand on Amazon",
      features: ["Custom store design", "Category organization", "Brand showcase"]
    },
    {
      icon: <Palette className="w-8 h-8 text-pink-600" />,
      title: "Infographic Design",
      description: "Visual content that communicates product benefits",
      features: ["Comparison charts", "Feature highlights", "Size guides"]
    },
    {
      icon: <Image className="w-8 h-8 text-green-600" />,
      title: "Lifestyle Photography",
      description: "Product images in real-life contexts",
      features: ["Usage scenarios", "Lifestyle shots", "Context images"]
    },
    {
      icon: <Sparkles className="w-8 h-8 text-indigo-600" />,
      title: "Premium A+ Content",
      description: "Advanced modules for Brand Registry sellers",
      features: ["Interactive modules", "Video integration", "Enhanced visuals"]
    },
    {
      icon: <Award className="w-8 h-8 text-orange-600" />,
      title: "Brand Story Module",
      description: "Tell your brand journey to build customer trust",
      features: ["Brand history", "Mission & values", "Team showcase"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Brand Discovery",
      description: "Understand your brand, products, and target audience",
      icon: <Target className="w-6 h-6 text-purple-600" />
    },
    {
      step: "2", 
      title: "Content Strategy",
      description: "Plan A+ modules and messaging for maximum impact",
      icon: <FileText className="w-6 h-6 text-purple-600" />
    },
    {
      step: "3",
      title: "Design & Creation",
      description: "Create stunning visuals and compelling copy",
      icon: <Palette className="w-6 h-6 text-purple-600" />
    },
    {
      step: "4",
      title: "Upload & Optimize",
      description: "Implement on Amazon and monitor performance",
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />
    }
  ];

  const successMetrics = [
    { value: "10%", label: "Conversion Increase", description: "Average uplift" },
    { value: "500+", label: "A+ Pages Created", description: "For Indian brands" },
    { value: "5-7", label: "Days Delivery", description: "Per A+ project" },
    { value: "100%", label: "Brand Compliance", description: "Amazon approved" }
  ];

  const faqs = [
    {
      question: "What is Amazon A+ Content?",
      answer: "A+ Content (formerly Enhanced Brand Content) is a premium feature that allows brand-registered sellers to add rich images, comparison charts, and detailed descriptions to their product listings, going beyond the standard bullet points and description."
    },
    {
      question: "Do I need Brand Registry for A+ Content?",
      answer: "Yes, Amazon A+ Content is only available to sellers enrolled in Amazon Brand Registry. We can help you with Brand Registry enrollment if you haven't completed it yet."
    },
    {
      question: "How much does A+ Content increase conversions?",
      answer: "Amazon reports that A+ Content can increase sales by 3-10% on average. The exact impact depends on your product category and the quality of the A+ content implementation."
    },
    {
      question: "What's the difference between Basic and Premium A+ Content?",
      answer: "Basic A+ Content includes standard modules like images with text, comparison charts, and product details. Premium A+ Content offers advanced features like video, interactive modules, and enhanced mobile layouts, but requires higher brand metrics to access."
    },
    {
      question: "Can you create A+ Content for multiple products?",
      answer: "Yes! We offer bulk A+ Content creation packages for sellers with multiple ASINs. We create templates that can be efficiently applied across your product catalog while maintaining brand consistency."
    },
    {
      question: "Do you also create Amazon Brand Store pages?",
      answer: "Absolutely! We design and build complete Amazon Brand Stores that showcase your entire product range. This includes homepage design, category pages, and custom landing pages for campaigns."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Amazon A+ Content & Brand Store Design Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Amazon A+ Content creation and Brand Store design services. Enhance your product pages with premium visual content to boost conversions and build brand presence.",
    "areaServed": "India",
    "serviceType": "E-commerce Brand Content"
  };

  return (
    <>
      <SEO
        title="Amazon A+ Content & Brand Store Design | Enhanced Brand Content | Simply Setup"
        description="Professional Amazon A+ Content creation services. Boost conversions with premium enhanced brand content, lifestyle imagery, and custom Brand Store design. Get a free consultation!"
        canonicalUrl="https://simplysetup.in/growth/amazon-account-management/a-plus-listing"
      />

      <Navbar />

      <main className="min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-3 border-b">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600">
              <Link href="/growth" className="hover:text-purple-600">Growth</Link>
              <span className="mx-2">/</span>
              <Link href="/growth/amazon-account-management" className="hover:text-purple-600">Amazon Account Management</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">A+ Content</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-50 via-white to-pink-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                  <Sparkles className="w-3 h-3 mr-1" /> Enhanced Brand Content
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Amazon A+ Content &{" "}
                  <span className="text-purple-600">Brand Store Design</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Elevate your Amazon presence with stunning A+ Content that tells your brand story, 
                  builds trust, and converts browsers into loyal customers.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-purple-600 hover:bg-purple-700" data-testid="button-get-aplus-quote">
                        Get Free A+ Quote
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free A+ Content Quote</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">500+ A+ Pages Created</p>
                    <p className="text-xs text-gray-500">For leading Indian brands</p>
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

        {/* Trusted Clients Section */}
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

        {/* Pain Points Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Is Your Product Page Missing the Wow Factor?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common branding challenges we solve with premium A+ Content
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

        {/* Form Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">Get Premium A+ Content</h3>
                <p className="text-gray-600 text-lg">
                  Transform your product pages with stunning visuals and compelling brand content.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free A+ content mockup</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">5-7 day delivery</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Unlimited revisions</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <ZohoFormEmbed />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Complete A+ Content & Brand Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to build a premium brand presence on Amazon
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

        {/* Process Section */}
        <section className="py-16 bg-purple-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our A+ Content Creation Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A streamlined approach to creating stunning brand content
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

        {/* Related Services */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Services</h2>
              <p className="text-gray-600">Explore more Amazon growth services</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/growth/amazon-account-management/product-listing">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Product Listing</h3>
                    <p className="text-sm text-gray-600">SEO optimization</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/amazon-account-management/ppc-ads">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">PPC Ads Campaign</h3>
                    <p className="text-sm text-gray-600">Maximize ad ROI</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/amazon-account-management/fba-onboarding">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">FBA Onboarding</h3>
                    <p className="text-sm text-gray-600">Fulfillment by Amazon</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Product Pages?
            </h2>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              Get premium A+ Content that builds trust and drives conversions
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-purple-50">
                  Get Free A+ Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Free A+ Content Quote</DialogTitle>
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
