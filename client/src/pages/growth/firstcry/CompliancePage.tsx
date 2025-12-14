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
  TrendingUp, 
  ArrowRight,
  FileText,
  Target,
  ClipboardCheck,
  Award,
  AlertTriangle,
  FileCheck,
  BadgeCheck,
  Microscope,
  ScrollText,
  Baby,
  ShieldCheck
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

export default function CompliancePage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      problem: "BIS Certification Confusion",
      solution: "Expert guidance through BIS certification process for baby products"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Missing Safety Documentation",
      solution: "Complete documentation support for safety standards compliance"
    },
    {
      icon: <Microscope className="w-6 h-6 text-red-500" />,
      problem: "Failed Product Testing",
      solution: "Pre-testing consultation to ensure products meet safety standards"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      problem: "Listing Rejections",
      solution: "Compliance-first approach to prevent FirstCry listing rejections"
    }
  ];

  const services = [
    {
      icon: <Award className="w-8 h-8 text-orange-600" />,
      title: "BIS Certification Support",
      description: "Complete assistance for Bureau of Indian Standards certification",
      features: ["Application processing", "Documentation preparation", "Factory audit support"]
    },
    {
      icon: <ClipboardCheck className="w-8 h-8 text-coral-600" />,
      title: "Safety Standards Compliance",
      description: "Ensure products meet Indian and international safety standards",
      features: ["IS standards mapping", "ASTM/EN compliance", "Age-appropriate testing"]
    },
    {
      icon: <Microscope className="w-8 h-8 text-pink-600" />,
      title: "Product Testing Coordination",
      description: "Liaising with accredited testing laboratories",
      features: ["Lab selection", "Test scheduling", "Report analysis"]
    },
    {
      icon: <FileCheck className="w-8 h-8 text-purple-600" />,
      title: "Quality Documentation",
      description: "Complete quality management documentation",
      features: ["QC procedures", "Inspection reports", "Batch records"]
    },
    {
      icon: <BadgeCheck className="w-8 h-8 text-green-600" />,
      title: "Certification Renewal",
      description: "Timely renewal and maintenance of certifications",
      features: ["Expiry tracking", "Renewal processing", "Audit preparation"]
    },
    {
      icon: <ScrollText className="w-8 h-8 text-blue-600" />,
      title: "Regulatory Updates",
      description: "Stay current with changing baby product regulations",
      features: ["Regulatory monitoring", "Compliance alerts", "Policy updates"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Compliance Audit",
      description: "Assess your current product compliance status and identify gaps",
      icon: <ClipboardCheck className="w-6 h-6 text-orange-600" />
    },
    {
      step: "2", 
      title: "Documentation Prep",
      description: "Prepare all required safety and quality documentation",
      icon: <FileText className="w-6 h-6 text-orange-600" />
    },
    {
      step: "3",
      title: "Testing & Certification",
      description: "Coordinate product testing and certification applications",
      icon: <Award className="w-6 h-6 text-orange-600" />
    },
    {
      step: "4",
      title: "Listing Approval",
      description: "Submit compliant products for FirstCry listing approval",
      icon: <CheckCircle className="w-6 h-6 text-orange-600" />
    }
  ];

  const successMetrics = [
    { value: "100%", label: "Compliance Rate", description: "First-time approval" },
    { value: "500+", label: "Products Certified", description: "For FirstCry" },
    { value: "30 Days", label: "Avg. Certification", description: "Timeline" },
    { value: "Zero", label: "Listing Rejections", description: "Post-compliance" }
  ];

  const faqs = [
    {
      question: "What certifications are required to sell baby products on FirstCry?",
      answer: "Baby products sold on FirstCry typically require BIS certification for categories like toys, feeding bottles, and cribs. Additionally, textiles need OEKO-TEX certification, and food products require FSSAI. We help identify exactly which certifications your products need."
    },
    {
      question: "How long does the BIS certification process take?",
      answer: "The BIS certification process typically takes 30-60 days depending on the product category and documentation readiness. With our pre-prepared documentation and expedited processing support, we often achieve certification in 30 days or less."
    },
    {
      question: "What happens if my product fails the safety test?",
      answer: "If a product fails testing, we help you understand the failure points, work with manufacturers to address issues, and coordinate retesting. Our pre-testing consultation significantly reduces failure rates by identifying potential issues before formal testing."
    },
    {
      question: "Do you help with international safety certifications?",
      answer: "Yes, we assist with international certifications like CE marking (Europe), ASTM compliance (USA), and AS/NZS (Australia). These certifications can also strengthen your FirstCry listing and customer trust."
    },
    {
      question: "How often do baby product safety regulations change?",
      answer: "Safety regulations are updated periodically by BIS and other bodies. We monitor these changes continuously and proactively inform our clients about new requirements, ensuring ongoing compliance without disruption to your business."
    },
    {
      question: "Can you help with compliance for imported baby products?",
      answer: "Absolutely. We assist importers with all compliance requirements including BIS registration for foreign manufacturers, ISI marking requirements, and customs documentation to ensure smooth import and FirstCry listing."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "FirstCry Child Safety Compliance & Certification Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional BIS certification and safety compliance services for FirstCry sellers. Expert guidance for baby product testing, quality documentation, and regulatory compliance.",
    "areaServed": "India",
    "serviceType": "E-commerce Compliance Services"
  };

  return (
    <>
      <SEO
        title="FirstCry Compliance & BIS Certification Services | Child Safety Standards | Simply Setup"
        description="Expert FirstCry compliance services for baby products. Get BIS certification, safety testing support, and quality documentation to sell on FirstCry. 100% first-time approval rate!"
        canonicalUrl="https://simplysetup.in/growth/firstcry-account-management/compliance"
      />

      <Navbar />

      <main className="min-h-screen">
        <div className="bg-gray-50 py-3 border-b">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600">
              <Link href="/growth" className="hover:text-orange-600">Growth</Link>
              <span className="mx-2">/</span>
              <Link href="/growth/firstcry-account-management" className="hover:text-orange-600">FirstCry Account Management</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Compliance & Certification</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-orange-50 via-white to-coral-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  <ShieldCheck className="w-3 h-3 mr-1" /> Child Safety Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Child Safety Compliance &{" "}
                  <span className="text-orange-600">Certification</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Ensure your baby products meet all safety standards for FirstCry. Our experts handle 
                  BIS certification, product testing, and quality documentation for hassle-free listing approval.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-orange-600 hover:bg-orange-700" data-testid="button-compliance-consultation">
                        Get Compliance Consultation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Compliance Consultation</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center">
                        <Baby className="w-5 h-5 text-orange-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">500+ Products Certified</p>
                    <p className="text-xs text-gray-500">100% first-time approval rate</p>
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
                Is Your Baby Product Compliance-Ready?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common compliance challenges we solve for FirstCry sellers
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
                <h3 className="text-3xl font-bold text-gray-900">Get Your Products Certified</h3>
                <p className="text-gray-600 text-lg">
                  Let our compliance experts handle BIS certification and safety documentation for your baby products.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free compliance assessment</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">30-day certification timeline</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">100% approval guarantee</span>
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
                Complete Compliance Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                End-to-end support for baby product safety certification and compliance
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
                Our Certification Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A streamlined 4-step approach to getting your products certified
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
              <p className="text-gray-600">Explore more FirstCry growth services</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/growth/firstcry-account-management/catalog">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-6 h-6 text-pink-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Catalog Optimization</h3>
                    <p className="text-sm text-gray-600">Nursery product listings</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/firstcry-account-management/promotions">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Community Promotions</h3>
                    <p className="text-sm text-gray-600">Mom-focused campaigns</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/firstcry-account-management/inventory">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Inventory Planning</h3>
                    <p className="text-sm text-gray-600">Omni-channel sync</p>
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

        <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Your Products Certified?
            </h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Get a free compliance assessment and start selling on FirstCry with confidence
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
                  <DialogTitle>Get Compliance Assessment</DialogTitle>
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

      <Footer location={null} />
    </>
  );
}
