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
  Shield, 
  Globe, 
  TrendingUp, 
  ArrowRight,
  FileText,
  Scale,
  Building,
  FileCheck,
  Users,
  ClipboardCheck,
  BadgeCheck,
  Landmark,
  Flag,
  Receipt
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

export default function MarketEntryPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <FileCheck className="w-6 h-6 text-red-500" />,
      problem: "Complex Japan Seller Registration",
      solution: "Step-by-step guidance through Amazon.co.jp seller central registration with proper documentation"
    },
    {
      icon: <Scale className="w-6 h-6 text-red-500" />,
      problem: "JCT Tax Compliance Confusion",
      solution: "Complete Japanese Consumption Tax (JCT) registration and invoice system compliance"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      problem: "PSE & Regulatory Requirements",
      solution: "Expert guidance on PSE certification, pharmaceutical affairs law, and category-specific compliance"
    },
    {
      icon: <BadgeCheck className="w-6 h-6 text-red-500" />,
      problem: "Trademark & Brand Protection",
      solution: "Japan Patent Office trademark filing and Amazon Brand Registry Japan enrollment"
    }
  ];

  const services = [
    {
      icon: <Building className="w-8 h-8 text-red-600" />,
      title: "Japan Seller Account Setup",
      description: "Complete Amazon.co.jp seller account registration for Indian businesses",
      features: ["Professional seller account setup", "Business verification support", "Japanese bank account linking"]
    },
    {
      icon: <Landmark className="w-8 h-8 text-red-700" />,
      title: "JCT Tax Registration",
      description: "Japanese Consumption Tax compliance and registration",
      features: ["JCT registration filing", "Qualified Invoice System setup", "Tax representative appointment"]
    },
    {
      icon: <Scale className="w-8 h-8 text-red-800" />,
      title: "Business Entity Setup",
      description: "Establish legal presence in Japan if required",
      features: ["Branch office registration", "Representative office setup", "Local director services"]
    },
    {
      icon: <ClipboardCheck className="w-8 h-8 text-rose-600" />,
      title: "PSE Certification",
      description: "Product Safety Electrical Appliance certification",
      features: ["PSE mark application", "Testing coordination", "Compliance documentation"]
    },
    {
      icon: <BadgeCheck className="w-8 h-8 text-red-700" />,
      title: "Japan Trademark Filing",
      description: "Protect your brand in Japan",
      features: ["JPO trademark search", "Application filing", "Brand Registry enrollment"]
    },
    {
      icon: <FileText className="w-8 h-8 text-rose-700" />,
      title: "Product Compliance",
      description: "Category-specific regulatory requirements for Japan",
      features: ["Food sanitation law", "Cosmetics regulations", "Electronics certification"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Business Assessment",
      description: "Evaluate your products for Japan market regulatory requirements and compliance needs",
      icon: <ClipboardCheck className="w-6 h-6 text-red-600" />
    },
    {
      step: "2", 
      title: "Documentation & Registration",
      description: "Prepare documents and register your seller account with JCT tax registration",
      icon: <FileText className="w-6 h-6 text-red-600" />
    },
    {
      step: "3",
      title: "Compliance Setup",
      description: "Complete PSE certification, obtain required permits, and set up tax invoicing",
      icon: <Shield className="w-6 h-6 text-red-600" />
    },
    {
      step: "4",
      title: "Brand Protection",
      description: "File Japan trademark and enroll in Amazon Brand Registry for IP protection",
      icon: <BadgeCheck className="w-6 h-6 text-red-600" />
    }
  ];

  const successMetrics = [
    { value: "150+", label: "Japan Accounts Registered", description: "For Indian sellers" },
    { value: "100%", label: "Compliance Rate", description: "Zero suspensions" },
    { value: "6-8 Wks", label: "Setup Timeline", description: "Account to launch" },
    { value: "40+", label: "JCT Registrations", description: "Successfully filed" }
  ];

  const faqs = [
    {
      question: "What documents do I need to register as a seller on Amazon Japan?",
      answer: "You'll need your Indian business registration documents (Certificate of Incorporation, GST certificate), PAN card, valid passport, bank account details capable of receiving Japanese Yen, and a credit card for seller fees. For JCT registration, additional documents like articles of incorporation translations may be required."
    },
    {
      question: "What is JCT and do I need to register for it?",
      answer: "JCT (Japanese Consumption Tax) is Japan's 10% sales tax. From October 2023, the Qualified Invoice System requires JCT registration for B2B sales. While not mandatory for B2C, many Japanese businesses prefer suppliers with JCT registration. We help assess if JCT registration benefits your business model."
    },
    {
      question: "What is PSE certification and which products need it?",
      answer: "PSE (Product Safety Electrical Appliance and Material) is mandatory for electrical products sold in Japan. Products like mobile chargers, adapters, batteries, and electrical appliances require PSE marks. There are two types: diamond PSE for higher-risk items and circle PSE for lower-risk items."
    },
    {
      question: "How long does Japan trademark registration take?",
      answer: "Japan trademark registration through JPO typically takes 8-12 months. However, you can enroll in Amazon Brand Registry Japan with a pending trademark application. We handle the entire process including prior art search, application filing, and Brand Registry enrollment."
    },
    {
      question: "Do I need a Japanese entity to sell on Amazon Japan?",
      answer: "No, you can sell as a foreign entity. However, for certain regulatory compliance like cosmetics or pharmaceuticals, a Japanese importer of record is required. For JCT registration, you'll need a tax representative in Japan. We provide all necessary local representation services."
    },
    {
      question: "What categories are restricted for foreign sellers on Amazon Japan?",
      answer: "Categories like pharmaceuticals, quasi-drugs, cosmetics, and food products have strict regulations requiring Japanese importers and specific certifications. Electronics need PSE certification. We help navigate these requirements and can assist with ungating in restricted categories."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Amazon Japan Market Entry & Compliance Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Complete Amazon Japan market entry services for Indian sellers including seller registration, JCT tax compliance, PSE certification, and trademark filing.",
    "areaServed": ["India", "Japan"],
    "serviceType": "International E-commerce Market Entry"
  };

  return (
    <>
      <SEO
        title="Amazon Japan Market Entry & Compliance | JCT Registration | Simply Setup"
        description="Expert Amazon Japan market entry services. Complete Amazon.co.jp seller registration, JCT tax compliance, PSE certification, and trademark filing for Indian sellers. Start selling in Japan!"
        canonicalUrl="https://simplysetup.in/growth/amazon-japan-account-management/market-entry"
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
              <span className="text-gray-900">Market Entry & Compliance</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-red-50 via-white to-rose-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                  <Flag className="w-3 h-3 mr-1" /> Japan Market Entry Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Japan Market Entry &{" "}
                  <span className="text-red-600">Compliance Services</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Navigate the complexities of entering the Japanese marketplace. From seller registration to JCT 
                  tax compliance and PSE certification, we handle every regulatory requirement for Indian sellers.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-red-600 hover:bg-red-700" data-testid="button-get-compliance-assessment">
                        Get Free Compliance Assessment
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free Japan Market Entry Assessment</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-red-100 border-2 border-white flex items-center justify-center">
                        <Users className="w-5 h-5 text-red-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">150+ Sellers Registered</p>
                    <p className="text-xs text-gray-500">100% compliance success rate</p>
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
                Common Japan Market Entry Challenges
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Regulatory and compliance hurdles we help Indian sellers overcome every day
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
                <h3 className="text-3xl font-bold text-gray-900">Start Your Japan Market Entry</h3>
                <p className="text-gray-600 text-lg">
                  Get expert guidance on Amazon Japan seller registration and regulatory compliance.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free compliance assessment worth ¥50,000</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Complete regulatory requirement checklist</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">100% success rate on registrations</span>
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
                Complete Market Entry Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                End-to-end support for entering the Japanese Amazon marketplace legally and compliantly
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
                Our Market Entry Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A proven 4-step approach to entering the Japanese Amazon marketplace
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
              <Link href="/growth/amazon-japan-account-management/localized-content">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Japanese Content</h3>
                    <p className="text-sm text-gray-600">Native localization</p>
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
                Common questions about Amazon Japan market entry
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
              Ready to Enter the Japanese Market?
            </h2>
            <p className="text-red-100 mb-8 max-w-2xl mx-auto">
              Let our Japan market entry experts guide you through every step of launching on Amazon.co.jp
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-red-50" data-testid="button-cta-japan-entry">
                  Start Japan Market Entry
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Free Japan Market Entry Assessment</DialogTitle>
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
