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
  Camera,
  Palette,
  Image,
  Layout,
  Sparkles,
  Eye,
  Layers,
  Ruler,
  Monitor,
  FileImage
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

export default function VisualMerchandisingPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Camera className="w-6 h-6 text-red-500" />,
      problem: "Poor Product Photos",
      solution: "Professional photography meeting Ajio's strict image guidelines"
    },
    {
      icon: <Eye className="w-6 h-6 text-red-500" />,
      problem: "Low Click Rates",
      solution: "Eye-catching visuals that stand out in Ajio's crowded marketplace"
    },
    {
      icon: <Layout className="w-6 h-6 text-red-500" />,
      problem: "Inconsistent Styling",
      solution: "Cohesive brand presentation across all product listings"
    },
    {
      icon: <FileImage className="w-6 h-6 text-red-500" />,
      problem: "Image Rejections",
      solution: "100% Ajio-compliant images with proper specifications"
    }
  ];

  const services = [
    {
      icon: <Camera className="w-8 h-8 text-teal-600" />,
      title: "Product Photography",
      description: "Professional product shoots for Ajio listings",
      features: ["White background shots", "360° product views", "Detail close-ups"]
    },
    {
      icon: <Palette className="w-8 h-8 text-teal-600" />,
      title: "Catalog Styling",
      description: "Consistent visual identity across your catalog",
      features: ["Color correction", "Brand consistency", "Style guidelines"]
    },
    {
      icon: <Image className="w-8 h-8 text-teal-600" />,
      title: "Lifestyle Imagery",
      description: "Contextual product photography",
      features: ["Model photography", "Usage scenarios", "Lifestyle shots"]
    },
    {
      icon: <Layers className="w-8 h-8 text-teal-600" />,
      title: "Image Editing",
      description: "Professional retouching and enhancement",
      features: ["Background removal", "Color enhancement", "Shadow creation"]
    },
    {
      icon: <Ruler className="w-8 h-8 text-teal-600" />,
      title: "Size Guides",
      description: "Visual size and fit guides",
      features: ["Measurement charts", "Fit guides", "Size comparison"]
    },
    {
      icon: <Monitor className="w-8 h-8 text-teal-600" />,
      title: "Banner Design",
      description: "Promotional banners for Ajio campaigns",
      features: ["Sale banners", "Brand banners", "Campaign creatives"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Brand Discovery",
      description: "Understand your brand aesthetic and product range",
      icon: <Sparkles className="w-6 h-6 text-teal-600" />
    },
    {
      step: "2", 
      title: "Photography",
      description: "Professional product shoots with proper styling",
      icon: <Camera className="w-6 h-6 text-teal-600" />
    },
    {
      step: "3",
      title: "Editing & Retouching",
      description: "Post-production to meet Ajio specifications",
      icon: <Palette className="w-6 h-6 text-teal-600" />
    },
    {
      step: "4",
      title: "Delivery & Upload",
      description: "Formatted images ready for Ajio catalog",
      icon: <TrendingUp className="w-6 h-6 text-teal-600" />
    }
  ];

  const successMetrics = [
    { value: "35%", label: "Click Rate Increase", description: "With optimized images" },
    { value: "1000+", label: "Products Photographed", description: "For Ajio sellers" },
    { value: "100%", label: "Compliance Rate", description: "Ajio image standards" },
    { value: "3 Days", label: "Avg. Turnaround", description: "Per catalog shoot" }
  ];

  const faqs = [
    {
      question: "What are Ajio's image requirements for product listings?",
      answer: "Ajio requires high-resolution images (minimum 1080x1440 pixels), white/neutral background for main images, proper lighting, multiple angles (front, back, side), and detail shots. We ensure all images meet these specifications."
    },
    {
      question: "Do you provide model photography for fashion products?",
      answer: "Yes, we offer both model and flat-lay photography services. Model photography is recommended for apparel as it helps customers visualize fit and styling. We have access to diverse models for different brand requirements."
    },
    {
      question: "How many images do I need per product on Ajio?",
      answer: "Ajio recommends 4-6 images per product including main shot, back view, detail shots, and lifestyle/model images. More images typically lead to higher conversion rates."
    },
    {
      question: "Can you edit our existing product images?",
      answer: "Absolutely! We offer image editing services including background removal, color correction, shadow creation, and resizing to meet Ajio's specifications. This is a cost-effective option if you already have raw product images."
    },
    {
      question: "What is the turnaround time for a product shoot?",
      answer: "Typical turnaround is 3-5 working days from the shoot date, depending on the number of products. Rush delivery options are available for urgent requirements."
    },
    {
      question: "Do you create infographics and size charts?",
      answer: "Yes, we create custom infographics, size guides, measurement charts, and comparison visuals that help customers make informed purchase decisions and reduce return rates."
    }
  ];

  const relatedServices = [
    { title: "Brand Onboarding", url: "/growth/ajio-account-management/brand-onboarding", description: "Seller registration & setup" },
    { title: "Promotions & Campaigns", url: "/growth/ajio-account-management/campaigns", description: "Sales events & visibility boosters" },
    { title: "Returns Management", url: "/growth/ajio-account-management/returns-management", description: "Returns handling & operations" }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Ajio Visual Merchandising & Product Photography Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Ajio product photography and visual merchandising services including catalog styling, image editing, lifestyle shoots, and Ajio-compliant imagery.",
    "areaServed": "India",
    "serviceType": "E-commerce Visual Merchandising"
  };

  return (
    <>
      <SEO
        title="Ajio Visual Merchandising & Product Photography Services | Simply Setup"
        description="Professional Ajio product photography and catalog styling services. Boost click rates with Ajio-compliant images, lifestyle shoots, and professional retouching. 100% compliance guaranteed!"
        canonicalUrl="https://simplysetup.in/growth/ajio-account-management/visual-merchandising"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Navbar />

      <main className="min-h-screen">
        <div className="bg-gray-50 py-3 border-b">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600">
              <Link href="/growth" className="hover:text-teal-600">Growth</Link>
              <span className="mx-2">/</span>
              <Link href="/growth/ajio-account-management" className="hover:text-teal-600">Ajio Account Management</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Visual Merchandising</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100">
                  <Camera className="w-3 h-3 mr-1" /> Visual Merchandising Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Ajio Visual Merchandising &{" "}
                  <span className="text-teal-600">Product Photography</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Transform your Ajio catalog with stunning product imagery. Our photography and 
                  styling experts create visuals that drive clicks and conversions.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-teal-600 hover:bg-teal-700" data-testid="button-get-photography-quote">
                        Get Photography Quote
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Photography Quote</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-teal-100 border-2 border-white flex items-center justify-center">
                        <Camera className="w-5 h-5 text-teal-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">1000+ Products Photographed</p>
                    <p className="text-xs text-gray-500">35% average click rate increase</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-8 border">
                  <div className="grid grid-cols-2 gap-6">
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="text-center p-4 bg-teal-50 rounded-xl">
                        <p className="text-3xl font-bold text-teal-600">{metric.value}</p>
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
              <div className="w-20 h-1 bg-teal-600 mx-auto my-3 rounded-sm"></div>
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
                Are Your Product Images Underperforming?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common visual merchandising challenges we solve for Ajio sellers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {painPoints.map((point, index) => (
                <Card key={index} className="border-2 hover:border-teal-200 transition-colors">
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
                <h3 className="text-3xl font-bold text-gray-900">Get Stunning Product Images</h3>
                <p className="text-gray-600 text-lg">
                  Let our visual merchandising experts transform your Ajio catalog.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free sample image editing</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">100% Ajio-compliant images</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">3-day turnaround time</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Unlimited revisions included</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 border">
                <ZohoFormEmbed />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Complete Visual Merchandising Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need for stunning Ajio product visuals
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="border-2 hover:border-teal-200 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
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

        <section className="py-16 bg-teal-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Photography Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A systematic approach to creating stunning product visuals
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl p-6 shadow-md h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                      {step.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-teal-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Related Ajio Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Complete your Ajio success with our other specialized services
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedServices.map((service, index) => (
                <Link key={index} href={service.url}>
                  <Card className="border-2 hover:border-teal-300 hover:shadow-lg transition-all cursor-pointer h-full">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                      <span className="text-teal-600 text-sm font-medium flex items-center gap-1">
                        Learn more <ArrowRight className="w-4 h-4" />
                      </span>
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
                  Common questions about Ajio visual merchandising
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border px-6">
                    <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-teal-600">
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

        <section className="py-16 bg-teal-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Ajio Catalog?
            </h2>
            <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
              Get professional product photography and visual merchandising services 
              that drive clicks and conversions on Ajio.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-teal-600 hover:bg-gray-100" data-testid="button-cta-get-started">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Photography Quote</DialogTitle>
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
