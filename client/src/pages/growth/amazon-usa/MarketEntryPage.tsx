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
  AlertTriangle,
  ClipboardCheck,
  BadgeCheck,
  Landmark,
  Flag,
  DollarSign
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
      problem: "Complex US Seller Registration",
      solution: "Step-by-step guidance through Amazon.com seller central registration with proper documentation"
    },
    {
      icon: <Scale className="w-6 h-6 text-red-500" />,
      problem: "US Tax Compliance Confusion",
      solution: "Complete EIN/ITIN setup, sales tax nexus management, and state tax registration assistance"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      problem: "FDA & Regulatory Requirements",
      solution: "Expert guidance on FDA registration, product labeling, and category-specific compliance"
    },
    {
      icon: <BadgeCheck className="w-6 h-6 text-red-500" />,
      problem: "Trademark & Brand Protection",
      solution: "US trademark filing assistance and Amazon Brand Registry USA enrollment"
    }
  ];

  const services = [
    {
      icon: <Building className="w-8 h-8 text-orange-600" />,
      title: "US Seller Account Setup",
      description: "Complete Amazon.com seller account registration for Indian businesses",
      features: ["Professional seller account setup", "Business verification support", "Bank account linking"]
    },
    {
      icon: <Landmark className="w-8 h-8 text-amber-600" />,
      title: "EIN/ITIN Registration",
      description: "Obtain essential US tax identification numbers",
      features: ["EIN application filing", "ITIN support for individuals", "W-8BEN form assistance"]
    },
    {
      icon: <Scale className="w-8 h-8 text-orange-700" />,
      title: "Sales Tax Compliance",
      description: "Navigate complex US state sales tax requirements",
      features: ["Nexus determination", "State registration", "Tax collection setup"]
    },
    {
      icon: <ClipboardCheck className="w-8 h-8 text-amber-700" />,
      title: "FDA Registration",
      description: "Regulatory compliance for food, cosmetics, and medical devices",
      features: ["FDA facility registration", "Product listing filing", "Prior notice requirements"]
    },
    {
      icon: <BadgeCheck className="w-8 h-8 text-orange-800" />,
      title: "US Trademark Filing",
      description: "Protect your brand in the United States",
      features: ["USPTO trademark search", "Application filing", "Brand Registry enrollment"]
    },
    {
      icon: <FileText className="w-8 h-8 text-amber-800" />,
      title: "Product Compliance",
      description: "Category-specific regulatory requirements",
      features: ["Safety certifications", "Labeling requirements", "Documentation preparation"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Business Assessment",
      description: "Evaluate your products for US market regulatory requirements and compliance needs",
      icon: <ClipboardCheck className="w-6 h-6 text-orange-600" />
    },
    {
      step: "2", 
      title: "Documentation & Registration",
      description: "Prepare documents and register your seller account with proper tax IDs",
      icon: <FileText className="w-6 h-6 text-orange-600" />
    },
    {
      step: "3",
      title: "Compliance Setup",
      description: "Complete FDA registration, obtain certifications, and set up sales tax collection",
      icon: <Shield className="w-6 h-6 text-orange-600" />
    },
    {
      step: "4",
      title: "Brand Protection",
      description: "File US trademark and enroll in Amazon Brand Registry for IP protection",
      icon: <BadgeCheck className="w-6 h-6 text-orange-600" />
    }
  ];

  const successMetrics = [
    { value: "200+", label: "US Accounts Registered", description: "For Indian sellers" },
    { value: "100%", label: "Compliance Rate", description: "Zero suspensions" },
    { value: "4-6 Wks", label: "Setup Timeline", description: "Account to launch" },
    { value: "50+", label: "FDA Registrations", description: "Successfully filed" }
  ];

  const faqs = [
    {
      question: "What documents do I need to register as a seller on Amazon USA?",
      answer: "You'll need your Indian business registration documents (Certificate of Incorporation, GST certificate), PAN card, valid government ID (passport preferred), bank account details, and a credit card for seller fees. We guide you through preparing all required documentation for seamless registration."
    },
    {
      question: "Do I need an EIN to sell on Amazon USA?",
      answer: "While not strictly required for registration, having a US EIN (Employer Identification Number) is highly recommended. It helps with tax compliance, prevents excessive tax withholding, and is required for certain categories. We assist with the EIN application process through IRS Form SS-4."
    },
    {
      question: "What products require FDA registration?",
      answer: "Food, beverages, dietary supplements, cosmetics, medical devices, and pharmaceutical products require FDA registration. Each category has specific requirements including facility registration, product listing, and prior notice for imports. We help determine your exact requirements and complete all filings."
    },
    {
      question: "How long does the US trademark registration take?",
      answer: "US trademark registration through USPTO typically takes 8-12 months. However, you can enroll in Amazon Brand Registry with a pending trademark application after receiving the serial number (usually within 2-3 weeks of filing). We handle the entire process from search to registration."
    },
    {
      question: "What is sales tax nexus and do I need to worry about it?",
      answer: "Sales tax nexus determines which US states you must collect sales tax in. Amazon handles collection in most states through Marketplace Facilitator laws, but you may still have filing obligations. We analyze your nexus situation and ensure you're fully compliant with state requirements."
    },
    {
      question: "Can I sell restricted categories as an Indian seller?",
      answer: "Yes, many restricted categories are accessible to Indian sellers with proper approval. Categories like grocery, beauty, health, and supplements require ungating which involves documentation, certifications, and sometimes test purchases. We have experience ungating sellers in multiple restricted categories."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Amazon USA Market Entry & Compliance Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Complete Amazon USA market entry services for Indian sellers including seller registration, tax compliance, FDA registration, and trademark filing.",
    "areaServed": ["India", "United States"],
    "serviceType": "International E-commerce Market Entry"
  };

  return (
    <>
      <SEO
        title="Amazon USA Market Entry & Compliance | US Seller Registration | Simply Setup"
        description="Expert Amazon USA market entry services. Complete US seller registration, EIN/tax compliance, FDA registration, and trademark filing for Indian sellers. Start selling on Amazon.com!"
        canonicalUrl="https://simplysetup.in/growth/amazon-usa-account-management/market-entry"
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
              <span className="text-gray-900">Market Entry & Compliance</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-orange-50 via-white to-amber-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  <Flag className="w-3 h-3 mr-1" /> US Market Entry Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  US Market Entry &{" "}
                  <span className="text-orange-600">Compliance Services</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Navigate the complexities of entering the US marketplace. From seller registration to FDA 
                  compliance and trademark protection, we handle every regulatory requirement for Indian sellers.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-orange-600 hover:bg-orange-700" data-testid="button-get-compliance-assessment">
                        Get Free Compliance Assessment
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free US Market Entry Assessment</DialogTitle>
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
                    <p className="text-sm font-semibold text-gray-900">200+ Sellers Registered</p>
                    <p className="text-xs text-gray-500">100% compliance success rate</p>
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
                Common US Market Entry Challenges
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Regulatory and compliance hurdles we help Indian sellers overcome every day
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
                <h3 className="text-3xl font-bold text-gray-900">Start Your US Market Entry</h3>
                <p className="text-gray-600 text-lg">
                  Get expert guidance on US seller registration and regulatory compliance.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free compliance assessment worth $300</span>
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
                End-to-end support for entering the US Amazon marketplace legally and compliantly
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
                Our Market Entry Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A proven 4-step approach to entering the US Amazon marketplace
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
              <Link href="/growth/amazon-usa-account-management/localized-content">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Localized Content</h3>
                    <p className="text-sm text-gray-600">US audience optimization</p>
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
              Ready to Enter the US Market?
            </h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Get a free compliance assessment and start your Amazon USA journey with confidence
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50">
                  Get Free Compliance Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Free US Market Entry Assessment</DialogTitle>
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
