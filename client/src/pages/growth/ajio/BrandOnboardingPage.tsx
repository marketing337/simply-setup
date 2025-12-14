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
  Shield, 
  TrendingUp, 
  ArrowRight,
  FileText,
  Target,
  Award,
  BadgeCheck,
  FileCheck,
  Building2,
  Clipboard,
  Users,
  Settings,
  Store,
  Package
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

export default function BrandOnboardingPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <FileCheck className="w-6 h-6 text-red-500" />,
      problem: "Seller Registration Delays",
      solution: "Fast-track Ajio seller account setup with complete documentation and verification"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      problem: "Brand Approval Rejections",
      solution: "Pre-verified brand documentation ensuring first-time approval on Ajio"
    },
    {
      icon: <Building2 className="w-6 h-6 text-red-500" />,
      problem: "Catalog Setup Confusion",
      solution: "Expert catalog structure setup following Ajio's category guidelines"
    },
    {
      icon: <Clipboard className="w-6 h-6 text-red-500" />,
      problem: "GST & Compliance Issues",
      solution: "Complete GST verification and compliance documentation assistance"
    }
  ];

  const services = [
    {
      icon: <BadgeCheck className="w-8 h-8 text-teal-600" />,
      title: "Seller Registration",
      description: "Complete Ajio seller account creation and verification",
      features: ["Account setup assistance", "Business verification", "Seller dashboard access"]
    },
    {
      icon: <FileText className="w-8 h-8 text-teal-600" />,
      title: "Brand Verification",
      description: "Trademark and brand authorization processing",
      features: ["Trademark verification", "Brand authorization letters", "IP documentation"]
    },
    {
      icon: <Settings className="w-8 h-8 text-teal-600" />,
      title: "Catalog Setup",
      description: "Product catalog structure and category mapping",
      features: ["Category selection", "Attribute mapping", "SKU structure setup"]
    },
    {
      icon: <Award className="w-8 h-8 text-teal-600" />,
      title: "Quality Compliance",
      description: "Meet Ajio's quality and listing standards",
      features: ["Quality guidelines review", "Product compliance check", "Listing optimization"]
    },
    {
      icon: <Users className="w-8 h-8 text-teal-600" />,
      title: "Seller Training",
      description: "Complete training on Ajio seller portal",
      features: ["Portal navigation", "Order management", "Performance tracking"]
    },
    {
      icon: <Shield className="w-8 h-8 text-teal-600" />,
      title: "Policy Compliance",
      description: "Ensure adherence to Ajio marketplace policies",
      features: ["Return policy setup", "Shipping guidelines", "Seller metrics optimization"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Document Collection",
      description: "Gather all required business and brand documents",
      icon: <FileText className="w-6 h-6 text-teal-600" />
    },
    {
      step: "2", 
      title: "Account Creation",
      description: "Complete Ajio seller registration and verification",
      icon: <BadgeCheck className="w-6 h-6 text-teal-600" />
    },
    {
      step: "3",
      title: "Catalog Setup",
      description: "Configure product catalog with proper categorization",
      icon: <Settings className="w-6 h-6 text-teal-600" />
    },
    {
      step: "4",
      title: "Go Live",
      description: "Launch your brand on Ajio with full support",
      icon: <TrendingUp className="w-6 h-6 text-teal-600" />
    }
  ];

  const successMetrics = [
    { value: "150+", label: "Brands Onboarded", description: "On Ajio platform" },
    { value: "92%", label: "First-Time Approval", description: "Success rate" },
    { value: "5 Days", label: "Avg. Onboarding Time", description: "From start to live" },
    { value: "100%", label: "Compliance Rate", description: "All standards met" }
  ];

  const faqs = [
    {
      question: "What documents are required for Ajio seller registration?",
      answer: "You'll need GST registration certificate, PAN card, business registration documents (Pvt Ltd/LLP/Proprietorship), bank account details, trademark registration or authorization letter, and product catalog with images meeting Ajio guidelines."
    },
    {
      question: "How long does the Ajio onboarding process take?",
      answer: "With our assistance, the typical onboarding process takes 5-7 working days from document submission to going live. This includes seller verification, brand approval, and initial catalog upload."
    },
    {
      question: "Do I need a registered trademark to sell on Ajio?",
      answer: "While a registered trademark is preferred, you can start with a trademark application (TM status) along with a brand authorization letter. For full brand protection, registered trademark (®) is recommended."
    },
    {
      question: "What are Ajio's quality standards for products?",
      answer: "Ajio has specific quality standards covering fabric quality, stitching, color accuracy, sizing, and packaging. We provide a comprehensive quality audit checklist and help you meet all requirements before going live."
    },
    {
      question: "Can you help with Ajio seller portal training?",
      answer: "Yes, we provide complete training on Ajio seller portal including order management, inventory updates, catalog management, performance analytics, and customer service best practices."
    },
    {
      question: "What happens if my seller application is rejected?",
      answer: "We have a 92% first-time approval rate. In case of rejection, we analyze the feedback, rectify issues, and resubmit with enhanced documentation. Our team handles the complete reapplication process at no extra cost."
    }
  ];

  const relatedServices = [
    { title: "Visual Merchandising", url: "/growth/ajio-account-management/visual-merchandising", description: "Product photography & catalog styling" },
    { title: "Promotions & Campaigns", url: "/growth/ajio-account-management/campaigns", description: "Sales events & visibility boosters" },
    { title: "Returns Management", url: "/growth/ajio-account-management/returns-management", description: "Returns handling & operations" }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Ajio Brand Onboarding & Seller Registration Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Ajio seller registration and brand onboarding services including documentation, brand verification, catalog setup, and seller portal training.",
    "areaServed": "India",
    "serviceType": "E-commerce Seller Onboarding"
  };

  return (
    <>
      <SEO
        title="Ajio Brand Onboarding & Seller Registration Services | Simply Setup"
        description="Expert Ajio seller registration and brand onboarding services. Fast-track account setup, brand verification, catalog configuration, and seller training. 92% first-time approval rate!"
        canonicalUrl="https://simplysetup.in/growth/ajio-account-management/brand-onboarding"
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
              <span className="text-gray-900">Brand Onboarding & Setup</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100">
                  <Store className="w-3 h-3 mr-1" /> Ajio Seller Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Ajio Brand Onboarding &{" "}
                  <span className="text-teal-600">Seller Setup</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Launch your brand on Ajio with confidence. Our experts handle seller registration, 
                  brand verification, and catalog setup for a seamless onboarding experience.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-teal-600 hover:bg-teal-700" data-testid="button-get-onboarding-consultation">
                        Get Free Consultation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free Onboarding Consultation</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-teal-100 border-2 border-white flex items-center justify-center">
                        <Store className="w-5 h-5 text-teal-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">150+ Brands Onboarded</p>
                    <p className="text-xs text-gray-500">92% first-time approval rate</p>
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
                Struggling with Ajio Onboarding?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common challenges we solve for brands every day
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
                <h3 className="text-3xl font-bold text-gray-900">Start Your Ajio Journey</h3>
                <p className="text-gray-600 text-lg">
                  Let our brand onboarding experts guide you through the complete process.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free brand eligibility assessment</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Document checklist provided</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Dedicated onboarding manager</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">92% first-time approval rate</span>
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
                Complete Brand Onboarding Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to successfully launch your brand on Ajio
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
                Our Onboarding Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A systematic approach to get your brand live on Ajio
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
                  Common questions about Ajio brand onboarding
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
              Ready to Launch on Ajio?
            </h2>
            <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
              Get expert guidance on Ajio seller registration and brand onboarding. 
              Our team will help you go live in just 5 days.
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
                  <DialogTitle>Start Your Ajio Journey</DialogTitle>
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
