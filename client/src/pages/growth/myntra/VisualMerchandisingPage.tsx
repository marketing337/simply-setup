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
  Target,
  Camera,
  Palette,
  Image,
  Users,
  Sparkles,
  Ruler,
  Shirt,
  Eye,
  Layout,
  Scissors
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
      problem: "Poor Product Photography",
      solution: "Professional fashion photography that meets Myntra's premium standards"
    },
    {
      icon: <Eye className="w-6 h-6 text-red-500" />,
      problem: "Low Click-Through Rates",
      solution: "Scroll-stopping visuals that attract fashion-conscious shoppers"
    },
    {
      icon: <Shirt className="w-6 h-6 text-red-500" />,
      problem: "Inconsistent Brand Look",
      solution: "Cohesive style guides ensuring consistent brand presentation"
    },
    {
      icon: <Layout className="w-6 h-6 text-red-500" />,
      problem: "Catalog Rejections",
      solution: "Images compliant with Myntra's strict visual guidelines"
    }
  ];

  const services = [
    {
      icon: <Camera className="w-8 h-8 text-pink-600" />,
      title: "Product Photography",
      description: "High-quality product shots for fashion catalog",
      features: ["Ghost mannequin shots", "Flat lay photography", "Detail close-ups"]
    },
    {
      icon: <Users className="w-8 h-8 text-pink-600" />,
      title: "Model Photography",
      description: "Professional model shoots for lifestyle imagery",
      features: ["On-model photography", "Lifestyle shots", "Size representation"]
    },
    {
      icon: <Palette className="w-8 h-8 text-pink-600" />,
      title: "Style Guide Creation",
      description: "Brand-consistent visual guidelines",
      features: ["Color palette definition", "Typography standards", "Image style rules"]
    },
    {
      icon: <Sparkles className="w-8 h-8 text-pink-600" />,
      title: "Image Retouching",
      description: "Professional post-production editing",
      features: ["Color correction", "Background removal", "Shadow enhancement"]
    },
    {
      icon: <Layout className="w-8 h-8 text-pink-600" />,
      title: "Catalog Aesthetics",
      description: "Cohesive catalog presentation",
      features: ["Grid optimization", "Visual hierarchy", "Category styling"]
    },
    {
      icon: <Ruler className="w-8 h-8 text-pink-600" />,
      title: "Size & Fit Guides",
      description: "Visual size guidance for customers",
      features: ["Size chart graphics", "Fit comparison visuals", "Measurement guides"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Brand Discovery",
      description: "Understand your brand aesthetic and target audience",
      icon: <Target className="w-6 h-6 text-pink-600" />
    },
    {
      step: "2", 
      title: "Photography Planning",
      description: "Plan shoot concepts, models, and styling requirements",
      icon: <Camera className="w-6 h-6 text-pink-600" />
    },
    {
      step: "3",
      title: "Production & Editing",
      description: "Execute shoots and professional post-production",
      icon: <Scissors className="w-6 h-6 text-pink-600" />
    },
    {
      step: "4",
      title: "Catalog Upload",
      description: "Optimized images uploaded to Myntra catalog",
      icon: <TrendingUp className="w-6 h-6 text-pink-600" />
    }
  ];

  const successMetrics = [
    { value: "50K+", label: "Images Produced", description: "For fashion brands" },
    { value: "35%", label: "CTR Improvement", description: "Average increase" },
    { value: "100%", label: "Compliance Rate", description: "Myntra guidelines" },
    { value: "3-5 Days", label: "Turnaround Time", description: "Per collection" }
  ];

  const faqs = [
    {
      question: "What are Myntra's image requirements for fashion products?",
      answer: "Myntra requires high-resolution images (minimum 1500x2000 pixels), white or light grey backgrounds, proper lighting, multiple angles, and on-model shots for apparel. We ensure all images meet or exceed these standards."
    },
    {
      question: "Do you provide models for product photography?",
      answer: "Yes, we have access to a network of professional fashion models. We help you select models that represent your target demographic and brand aesthetic. We handle model booking, styling, and coordination."
    },
    {
      question: "How many images do you recommend per product?",
      answer: "We recommend 5-7 images per product: front view, back view, side view, detail shots (fabric, buttons, zippers), and lifestyle/on-model images. This comprehensive approach maximizes customer confidence and conversions."
    },
    {
      question: "Can you help with existing product images that need improvement?",
      answer: "Absolutely! We offer image enhancement services including background removal, color correction, retouching, and optimization for Myntra's platform. We can transform existing images to meet quality standards."
    },
    {
      question: "What's the typical turnaround time for a product collection?",
      answer: "For a standard collection of 50-100 SKUs, our typical turnaround is 3-5 business days from shoot to final edited images. Rush orders can be accommodated with advance planning."
    },
    {
      question: "Do you create video content for Myntra listings?",
      answer: "Yes, we create product videos including 360-degree spins, styling videos, and fabric/detail close-ups. Video content can significantly boost engagement and is increasingly important on fashion platforms."
    }
  ];

  const relatedServices = [
    { title: "Brand Onboarding", url: "/growth/myntra-account-management/brand-onboarding", description: "Complete Myntra onboarding support" },
    { title: "Campaign Management", url: "/growth/myntra-account-management/campaigns", description: "EORS & influencer activations" },
    { title: "Returns Management", url: "/growth/myntra-account-management/returns-management", description: "Optimize returns & customer experience" }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Myntra Visual Merchandising & Product Photography Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Myntra visual merchandising services including product photography, model shoots, style guides, and catalog aesthetics optimization for fashion brands.",
    "areaServed": "India",
    "serviceType": "E-commerce Visual Content"
  };

  return (
    <>
      <SEO
        title="Myntra Visual Merchandising & Product Photography | Style Guides | Simply Setup"
        description="Expert Myntra visual merchandising services. Professional product photography, model shoots, style guides, and catalog aesthetics. Boost CTR by 35%!"
        canonicalUrl="https://simplysetup.in/growth/myntra-account-management/visual-merchandising"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Navbar />

      <main className="min-h-screen">
        <div className="bg-gray-50 py-3 border-b">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600">
              <Link href="/growth" className="hover:text-pink-600">Growth</Link>
              <span className="mx-2">/</span>
              <Link href="/growth/myntra-account-management" className="hover:text-pink-600">Myntra Account Management</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Visual Merchandising & Styling</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-pink-50 via-white to-rose-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-100">
                  <Camera className="w-3 h-3 mr-1" /> Fashion Photography Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Visual Merchandising &{" "}
                  <span className="text-pink-600">Styling</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Create stunning visual content that sells. From professional product photography to 
                  model shoots and style guides, we make your fashion brand shine on Myntra.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-pink-600 hover:bg-pink-700" data-testid="button-get-visual-quote">
                        Get Photography Quote
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Visual Merchandising Quote</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-pink-100 border-2 border-white flex items-center justify-center">
                        <Camera className="w-5 h-5 text-pink-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">50,000+ Images Produced</p>
                    <p className="text-xs text-gray-500">35% average CTR improvement</p>
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
                Trusted by Leading Fashion Brands
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
                Is Your Visual Content Holding You Back?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common visual merchandising challenges we solve for fashion brands
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
                <h3 className="text-3xl font-bold text-gray-900">Elevate Your Brand Visuals</h3>
                <p className="text-gray-600 text-lg">
                  Professional fashion photography and styling that converts browsers into buyers.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free visual audit of current catalog</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Sample images before full production</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Professional model network access</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">100% Myntra compliance guarantee</span>
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
                Everything you need for stunning fashion visuals on Myntra
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="border-2 hover:border-pink-200 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-pink-600 shrink-0" />
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
                Our Visual Production Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From concept to catalog-ready images
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl p-6 shadow-md h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                      {step.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-pink-400" />
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
                Related Myntra Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Complete your Myntra success with our other specialized services
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedServices.map((service, index) => (
                <Link key={index} href={service.url}>
                  <Card className="border-2 hover:border-pink-300 hover:shadow-lg transition-all cursor-pointer h-full">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                      <span className="text-pink-600 text-sm font-medium flex items-center gap-1">
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
                  Everything you need to know about visual merchandising for Myntra
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border px-6">
                    <AccordionTrigger className="text-left font-medium text-gray-900">
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

        <section className="py-16 bg-gradient-to-r from-pink-600 to-rose-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Product Visuals?
            </h2>
            <p className="text-pink-100 mb-8 max-w-2xl mx-auto">
              Get professional fashion photography and styling that makes your brand stand out on Myntra. 
              Join brands that have boosted their CTR by 35%.
            </p>
            <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-pink-600 hover:bg-pink-50" data-testid="button-cta-get-started">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Visual Merchandising Quote</DialogTitle>
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
