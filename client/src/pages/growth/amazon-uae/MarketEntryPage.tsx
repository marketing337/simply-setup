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
  DollarSign,
  Briefcase
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
      problem: "Complex UAE Seller Registration",
      solution: "Step-by-step guidance through Amazon.ae seller central registration with proper Emirates documentation"
    },
    {
      icon: <Scale className="w-6 h-6 text-red-500" />,
      problem: "UAE VAT Compliance Confusion",
      solution: "Complete UAE VAT registration, TRN setup, and FTA compliance for Amazon sellers"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      problem: "Emirates Regulatory Requirements",
      solution: "Expert guidance on ESMA certifications, product labeling, and category-specific compliance"
    },
    {
      icon: <BadgeCheck className="w-6 h-6 text-red-500" />,
      problem: "Trademark & Brand Protection",
      solution: "UAE trademark filing assistance and Amazon Brand Registry UAE enrollment"
    }
  ];

  const services = [
    {
      icon: <Building className="w-8 h-8 text-yellow-600" />,
      title: "UAE Seller Account Setup",
      description: "Complete Amazon.ae seller account registration for Indian businesses",
      features: ["Professional seller account setup", "Emirates ID verification support", "UAE bank account linking"]
    },
    {
      icon: <Landmark className="w-8 h-8 text-yellow-700" />,
      title: "UAE VAT Registration",
      description: "Obtain essential UAE Tax Registration Number (TRN)",
      features: ["FTA VAT registration", "TRN application filing", "VAT return compliance"]
    },
    {
      icon: <Scale className="w-8 h-8 text-yellow-600" />,
      title: "Emirates Business Compliance",
      description: "Navigate UAE business regulatory requirements",
      features: ["Trade license guidance", "Economic department registration", "Free zone compliance"]
    },
    {
      icon: <ClipboardCheck className="w-8 h-8 text-yellow-700" />,
      title: "ESMA Certification",
      description: "Product compliance for Emirates Standards & Metrology",
      features: ["ESMA product registration", "Quality certification", "Halal certification support"]
    },
    {
      icon: <BadgeCheck className="w-8 h-8 text-yellow-600" />,
      title: "UAE Trademark Filing",
      description: "Protect your brand in the United Arab Emirates",
      features: ["UAE Ministry search", "Application filing", "Brand Registry enrollment"]
    },
    {
      icon: <FileText className="w-8 h-8 text-yellow-700" />,
      title: "Product Compliance",
      description: "Category-specific regulatory requirements for GCC markets",
      features: ["Safety certifications", "Arabic labeling requirements", "Documentation preparation"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Business Assessment",
      description: "Evaluate your products for UAE market regulatory requirements and Emirates compliance needs",
      icon: <ClipboardCheck className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "2", 
      title: "Documentation & Registration",
      description: "Prepare documents and register your seller account with UAE VAT/TRN",
      icon: <FileText className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "3",
      title: "Compliance Setup",
      description: "Complete ESMA registration, obtain certifications, and set up VAT collection",
      icon: <Shield className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "4",
      title: "Brand Protection",
      description: "File UAE trademark and enroll in Amazon Brand Registry for IP protection",
      icon: <BadgeCheck className="w-6 h-6 text-yellow-600" />
    }
  ];

  const successMetrics = [
    { value: "150+", label: "UAE Accounts Registered", description: "For Indian sellers" },
    { value: "100%", label: "Compliance Rate", description: "Zero suspensions" },
    { value: "3-4 Wks", label: "Setup Timeline", description: "Account to launch" },
    { value: "45+", label: "VAT Registrations", description: "Successfully filed" }
  ];

  const faqs = [
    {
      question: "What documents do I need to register as a seller on Amazon UAE?",
      answer: "You'll need your Indian business registration documents (Certificate of Incorporation, GST certificate), PAN card, valid passport, bank account details (Indian or UAE), and credit card for seller fees. For VAT registration, you'll also need Emirates-specific documentation. We guide you through preparing all required paperwork."
    },
    {
      question: "Do I need UAE VAT registration to sell on Amazon.ae?",
      answer: "Yes, VAT registration is mandatory for sellers with taxable supplies exceeding AED 375,000 annually. Even below this threshold, voluntary registration is recommended for credibility and input VAT recovery. We assist with the complete FTA registration process and ongoing compliance."
    },
    {
      question: "What is ESMA certification and when is it required?",
      answer: "ESMA (Emirates Authority for Standardization & Metrology) certification is required for regulated products including electronics, toys, cosmetics, and food items. Each category has specific quality and safety standards that must be met before selling in the UAE market."
    },
    {
      question: "How long does UAE trademark registration take?",
      answer: "UAE trademark registration typically takes 6-9 months through the Ministry of Economy. However, you can apply for Amazon Brand Registry with a pending application. We handle the entire process from search to registration including Arabic transliteration."
    },
    {
      question: "Can I sell without a UAE trade license?",
      answer: "Yes, Indian sellers can sell on Amazon.ae without a UAE trade license by using their Indian business entity. However, having a UAE presence (free zone license) can provide advantages like local bank accounts, easier VAT registration, and better customer perception."
    },
    {
      question: "What products require special approval to sell in UAE?",
      answer: "Categories like food & beverages, cosmetics, health supplements, children's products, and electronics require additional certifications. Products must comply with GCC standardization requirements and may need Halal certification for certain categories."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Amazon UAE Market Entry & Compliance Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Complete Amazon UAE market entry services for Indian sellers including seller registration, VAT compliance, ESMA certification, and trademark filing.",
    "areaServed": ["India", "United Arab Emirates", "GCC"],
    "serviceType": "International E-commerce Market Entry"
  };

  return (
    <>
      <SEO
        title="Amazon UAE Market Entry & Compliance | UAE Seller Registration | Simply Setup"
        description="Expert Amazon UAE market entry services. Complete UAE seller registration, VAT/TRN compliance, ESMA certification, and trademark filing for Indian sellers. Start selling on Amazon.ae!"
        canonicalUrl="https://simplysetup.in/growth/amazon-uae-account-management/market-entry"
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
              <span className="text-yellow-500">Market Entry & Compliance</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 lg:py-24">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
          <div className="container mx-auto px-4 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border-yellow-500/50">
                  <Flag className="w-3 h-3 mr-1" /> UAE Market Entry Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  UAE Market Entry &{" "}
                  <span className="text-yellow-500">Compliance Services</span>
                </h1>
                
                <p className="text-lg text-gray-300 leading-relaxed">
                  Navigate the complexities of entering the Emirates marketplace. From seller registration to VAT 
                  compliance and trademark protection, we handle every regulatory requirement for Indian sellers.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" data-testid="button-get-compliance-assessment">
                        Get Free Compliance Assessment
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free UAE Market Entry Assessment</DialogTitle>
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
                    <p className="text-sm font-semibold text-white">150+ Sellers Registered</p>
                    <p className="text-xs text-gray-400">100% compliance success rate</p>
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
                Common UAE Market Entry Challenges
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Regulatory and compliance hurdles we help Indian sellers overcome every day
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
                <h3 className="text-3xl font-bold text-white">Start Your UAE Market Entry</h3>
                <p className="text-gray-300 text-lg">
                  Get expert guidance on UAE seller registration and regulatory compliance.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                    <span className="text-gray-300">Free compliance assessment worth AED 1,000</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                    <span className="text-gray-300">Complete regulatory requirement checklist</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                    <span className="text-gray-300">100% success rate on registrations</span>
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
                Complete Market Entry Services
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                End-to-end support for entering the UAE Amazon marketplace legally and compliantly
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
                Our Market Entry Process
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A proven 4-step approach to entering the UAE Amazon marketplace
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
                  Common questions about Amazon UAE market entry and compliance
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
              Ready to Enter the UAE Market?
            </h2>
            <p className="text-gray-800 mb-8 max-w-2xl mx-auto">
              Get expert guidance on compliance, registration, and launching your products on Amazon.ae
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
                  <DialogTitle>Start Your UAE Market Entry Journey</DialogTitle>
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
