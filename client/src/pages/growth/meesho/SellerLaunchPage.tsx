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
  Package,
  FileText,
  Clock,
  Target,
  Settings,
  Rocket,
  Upload,
  ShoppingBag,
  Users,
  Zap,
  Store,
  CheckSquare,
  UserPlus
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

export default function SellerLaunchPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Complex Registration Process",
      solution: "Guided seller registration with document preparation and verification support"
    },
    {
      icon: <Upload className="w-6 h-6 text-red-500" />,
      problem: "Catalog Upload Confusion",
      solution: "Bulk catalog upload assistance with proper categorization and attributes"
    },
    {
      icon: <Settings className="w-6 h-6 text-red-500" />,
      problem: "Account Setup Delays",
      solution: "Fast-track account configuration with all settings optimized for sales"
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-red-500" />,
      problem: "First Order Anxiety",
      solution: "End-to-end support for your first order from confirmation to dispatch"
    }
  ];

  const services = [
    {
      icon: <UserPlus className="w-8 h-8 text-pink-600" />,
      title: "Seller Registration",
      description: "Complete registration with proper documentation",
      features: ["GST verification", "Bank account linking", "Profile optimization"]
    },
    {
      icon: <Upload className="w-8 h-8 text-fuchsia-600" />,
      title: "Catalog Upload",
      description: "Professional product listing and catalog setup",
      features: ["Bulk upload support", "Image optimization", "Category mapping"]
    },
    {
      icon: <Settings className="w-8 h-8 text-purple-600" />,
      title: "Account Configuration",
      description: "Optimize all seller settings for maximum visibility",
      features: ["Shipping setup", "Return policy", "Payment configuration"]
    },
    {
      icon: <Target className="w-8 h-8 text-pink-600" />,
      title: "Pricing Strategy",
      description: "Competitive pricing for reseller attraction",
      features: ["Margin calculation", "Commission optimization", "Reseller appeal"]
    },
    {
      icon: <Zap className="w-8 h-8 text-fuchsia-600" />,
      title: "First Order Support",
      description: "Handholding through your first successful order",
      features: ["Order processing", "Packaging guidance", "Dispatch support"]
    },
    {
      icon: <Store className="w-8 h-8 text-purple-600" />,
      title: "Store Branding",
      description: "Create an attractive seller profile",
      features: ["Store banner", "About section", "Trust indicators"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Document Preparation",
      description: "Gather GST, PAN, bank details and get verification-ready",
      icon: <FileText className="w-6 h-6 text-pink-600" />
    },
    {
      step: "2", 
      title: "Account Registration",
      description: "Complete seller registration with optimized profile setup",
      icon: <UserPlus className="w-6 h-6 text-pink-600" />
    },
    {
      step: "3",
      title: "Catalog Launch",
      description: "Upload products with proper images, descriptions, and pricing",
      icon: <Upload className="w-6 h-6 text-pink-600" />
    },
    {
      step: "4",
      title: "First Sale Success",
      description: "Process and dispatch your first order with expert guidance",
      icon: <Rocket className="w-6 h-6 text-pink-600" />
    }
  ];

  const successMetrics = [
    { value: "24hrs", label: "Account Activation", description: "Fast approval" },
    { value: "500+", label: "Sellers Launched", description: "On Meesho" },
    { value: "100%", label: "First Order Rate", description: "Within 7 days" },
    { value: "₹0", label: "Platform Fees", description: "Zero commission" }
  ];

  const faqs = [
    {
      question: "What documents do I need to start selling on Meesho?",
      answer: "You need a valid GST number, PAN card, bank account details, and a mobile number. For certain categories, additional documents like brand authorization or FSSAI license may be required. We help you prepare all documentation correctly."
    },
    {
      question: "How long does Meesho seller registration take?",
      answer: "With our assistance, most seller accounts are activated within 24-48 hours. We ensure all documents are correctly uploaded and verification requirements are met on the first attempt, avoiding delays."
    },
    {
      question: "Is there any fee to sell on Meesho?",
      answer: "Meesho charges zero commission on sales - one of the lowest in the industry. There are minimal shipping and payment processing charges, but no platform fees. We help you understand all costs upfront."
    },
    {
      question: "How many products should I list initially?",
      answer: "We recommend starting with at least 20-50 products across 2-3 categories. More products mean more visibility. Our team helps with bulk catalog upload to get you started quickly."
    },
    {
      question: "Will I get my first order immediately after listing?",
      answer: "With proper pricing and optimization, most sellers receive their first order within 3-7 days. We help set competitive prices that attract resellers while maintaining your margins."
    },
    {
      question: "Do you provide support after the account is set up?",
      answer: "Yes! Our launch package includes 7 days of post-launch support to help you process first orders, handle any issues, and optimize your catalog based on initial performance."
    }
  ];

  const relatedServices = [
    { title: "Catalog Strategy", href: "/growth/meesho-account-management/catalog-strategy", description: "Optimize your catalog for viral growth" },
    { title: "Reseller Growth", href: "/growth/meesho-account-management/reseller-growth", description: "Build your reseller network" },
    { title: "Logistics & COD", href: "/growth/meesho-account-management/logistics", description: "Manage shipping and payments" }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Meesho Seller Launch Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Meesho seller registration and launch services. Quick account setup, catalog upload, and first order support for new Meesho sellers.",
    "areaServed": "India",
    "serviceType": "E-commerce Seller Onboarding"
  };

  return (
    <>
      <SEO
        title="Meesho Seller Launch Services | Quick Registration & Setup | Simply Setup"
        description="Launch your Meesho seller account in 24 hours. Expert assistance with registration, catalog upload, and first order setup. Zero commission platform - start selling today!"
        canonicalUrl="https://simplysetup.in/growth/meesho-account-management/seller-launch"
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
              <span className="text-gray-900">Seller Launch</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-pink-50 via-white to-fuchsia-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-100">
                  <Rocket className="w-3 h-3 mr-1" /> Rapid Seller Launchpad
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Launch Your Meesho Store{" "}
                  <span className="text-pink-600">in 24 Hours</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  From registration to first order - we handle everything. Get your Meesho seller 
                  account live with optimized catalog and start selling to millions of resellers.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-pink-600 hover:bg-pink-700" data-testid="button-launch-store">
                        Launch My Store
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Start Your Meesho Journey</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-pink-100 border-2 border-white flex items-center justify-center">
                        <Store className="w-5 h-5 text-pink-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">500+ Sellers Launched</p>
                    <p className="text-xs text-gray-500">100% first order within 7 days</p>
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
                Struggling to Start on Meesho?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common challenges we solve for new Meesho sellers
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
                <h3 className="text-3xl font-bold text-gray-900">Launch Your Meesho Store</h3>
                <p className="text-gray-600 text-lg">
                  Get expert assistance to set up your seller account and start selling to millions.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free account setup consultation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">24-hour activation guarantee</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">First order support included</span>
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
                Complete Seller Launch Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to start selling on Meesho successfully
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
                Your Launch Journey
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From zero to first sale in 4 simple steps
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
                  Everything you need to know about launching on Meesho
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
              Ready to Launch Your Meesho Store?
            </h2>
            <p className="text-pink-100 mb-8 max-w-2xl mx-auto">
              Join 500+ successful sellers who started their Meesho journey with us
            </p>
            <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50" data-testid="button-cta-launch">
                  Start Selling Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Launch Your Meesho Store</DialogTitle>
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
