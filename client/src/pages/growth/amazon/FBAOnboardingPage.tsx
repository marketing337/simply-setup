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
  Package,
  FileText,
  BarChart3,
  Truck,
  Warehouse,
  Clock,
  Target,
  Settings,
  CheckSquare,
  Star,
  Box,
  MapPin
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

export default function FBAOnboardingPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Warehouse className="w-6 h-6 text-red-500" />,
      problem: "Complex FBA Setup",
      solution: "Step-by-step guidance through FBA enrollment and initial shipment"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Labeling & Packaging Errors",
      solution: "Proper FNSKU labels, packaging requirements, and prep guidelines"
    },
    {
      icon: <Truck className="w-6 h-6 text-red-500" />,
      problem: "Shipment Creation Issues",
      solution: "Optimized shipment plans to minimize inbound fees and delays"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-red-500" />,
      problem: "Inventory Management",
      solution: "Stock level optimization to avoid storage fees and stockouts"
    }
  ];

  const services = [
    {
      icon: <Settings className="w-8 h-8 text-green-600" />,
      title: "FBA Account Setup",
      description: "Complete FBA enrollment and configuration",
      features: ["Account registration", "Tax settings", "Return address setup"]
    },
    {
      icon: <Package className="w-8 h-8 text-blue-600" />,
      title: "Product Preparation",
      description: "Ensure products meet Amazon's FBA requirements",
      features: ["FNSKU labeling", "Packaging guidelines", "Prep service coordination"]
    },
    {
      icon: <Truck className="w-8 h-8 text-orange-600" />,
      title: "Shipment Creation",
      description: "Optimized inbound shipment planning",
      features: ["Shipment workflow", "Box content labeling", "Carrier selection"]
    },
    {
      icon: <Warehouse className="w-8 h-8 text-purple-600" />,
      title: "Inventory Management",
      description: "Ongoing FBA inventory optimization",
      features: ["Restock alerts", "Storage fee monitoring", "Stranded inventory fixes"]
    },
    {
      icon: <MapPin className="w-8 h-8 text-indigo-600" />,
      title: "Multi-Location Strategy",
      description: "Optimize inventory placement across FCs",
      features: ["Placement optimization", "IXD recommendations", "Regional distribution"]
    },
    {
      icon: <Shield className="w-8 h-8 text-pink-600" />,
      title: "FBA Compliance",
      description: "Stay compliant with all FBA policies",
      features: ["Policy monitoring", "Restriction handling", "Account health"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "FBA Assessment",
      description: "Evaluate your products for FBA eligibility and profitability",
      icon: <CheckSquare className="w-6 h-6 text-green-600" />
    },
    {
      step: "2", 
      title: "Account Configuration",
      description: "Set up FBA settings, shipping plans, and compliance requirements",
      icon: <Settings className="w-6 h-6 text-green-600" />
    },
    {
      step: "3",
      title: "First Shipment",
      description: "Guide you through creating and sending your first FBA shipment",
      icon: <Truck className="w-6 h-6 text-green-600" />
    },
    {
      step: "4",
      title: "Ongoing Support",
      description: "Continuous inventory management and optimization",
      icon: <TrendingUp className="w-6 h-6 text-green-600" />
    }
  ];

  const successMetrics = [
    { value: "Prime", label: "Badge Eligibility", description: "Instant credibility" },
    { value: "2-Day", label: "Delivery Speed", description: "Pan-India reach" },
    { value: "300+", label: "Sellers Onboarded", description: "To FBA" },
    { value: "99%", label: "First Shipment Success", description: "No rejections" }
  ];

  const faqs = [
    {
      question: "What is Amazon FBA (Fulfillment by Amazon)?",
      answer: "FBA is a service where you send your products to Amazon's fulfillment centers, and Amazon handles storage, packaging, shipping, customer service, and returns. Your products become eligible for Prime shipping, significantly boosting sales potential."
    },
    {
      question: "Is FBA suitable for all types of products?",
      answer: "FBA works well for most products, but profitability depends on product size, weight, and price point. We help you analyze whether FBA makes financial sense for your specific products considering all fees involved."
    },
    {
      question: "What are the costs involved in FBA?",
      answer: "FBA fees include fulfillment fees (based on size/weight), monthly storage fees, and optional services like labeling. We help you calculate total costs and ensure your pricing remains profitable after FBA fees."
    },
    {
      question: "How long does it take to get started with FBA?",
      answer: "The initial setup takes 1-2 weeks including account configuration and first shipment creation. Products typically go live 1-2 weeks after Amazon receives your inventory, depending on processing times at fulfillment centers."
    },
    {
      question: "Can you help with FBA for international marketplaces?",
      answer: "Yes! We assist with FBA setup for Amazon USA, UK, UAE, and other international marketplaces including export documentation, customs compliance, and cross-border logistics coordination."
    },
    {
      question: "What happens if my products get rejected at the fulfillment center?",
      answer: "Product rejections are costly. Our onboarding ensures proper labeling, packaging, and prep to minimize rejections. If issues occur, we help with removal orders and re-shipment coordination."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Amazon FBA Onboarding Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Amazon FBA onboarding services. Get Prime eligibility with expert setup of fulfillment, labeling, shipment creation, and inventory management.",
    "areaServed": "India",
    "serviceType": "E-commerce Fulfillment"
  };

  return (
    <>
      <SEO
        title="Amazon FBA Onboarding Services | Get Prime Eligible | Simply Setup"
        description="Expert Amazon FBA setup and onboarding services. Get Prime eligibility with proper fulfillment setup, labeling, shipment creation, and inventory management. Start selling faster!"
        canonicalUrl="https://simplysetup.in/growth/amazon-account-management/fba-onboarding"
      />

      <Navbar />

      <main className="min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-3 border-b">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600">
              <Link href="/growth" className="hover:text-green-600">Growth</Link>
              <span className="mx-2">/</span>
              <Link href="/growth/amazon-account-management" className="hover:text-green-600">Amazon Account Management</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">FBA Onboarding</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  <Box className="w-3 h-3 mr-1" /> Fulfillment Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Amazon FBA{" "}
                  <span className="text-green-600">Onboarding Services</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Get your products Prime-eligible with hassle-free FBA setup. Our experts handle 
                  everything from account configuration to your first successful shipment.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-green-600 hover:bg-green-700" data-testid="button-start-fba">
                        Start FBA Onboarding
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Start Your FBA Journey</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-green-100 border-2 border-white flex items-center justify-center">
                        <Box className="w-5 h-5 text-green-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">300+ Sellers Onboarded</p>
                    <p className="text-xs text-gray-500">99% first shipment success rate</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-8 border">
                  <div className="grid grid-cols-2 gap-6">
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="text-center p-4 bg-green-50 rounded-xl">
                        <p className="text-3xl font-bold text-green-600">{metric.value}</p>
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
              <div className="w-20 h-1 bg-green-600 mx-auto my-3 rounded-sm"></div>
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
                Struggling with FBA Setup?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common FBA challenges we solve for sellers every day
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {painPoints.map((point, index) => (
                <Card key={index} className="border-2 hover:border-green-200 transition-colors">
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
                <h3 className="text-3xl font-bold text-gray-900">Get Started with FBA</h3>
                <p className="text-gray-600 text-lg">
                  Let our fulfillment experts set up your FBA account and get your products Prime-ready.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free FBA profitability analysis</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Complete setup in 2 weeks</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">99% first shipment success rate</span>
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
                Complete FBA Onboarding Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to succeed with Fulfillment by Amazon
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
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our FBA Onboarding Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A structured approach to getting you FBA-ready quickly and correctly
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    {step.icon}
                  </div>
                  <div className="bg-green-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3">
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
              <Link href="/growth/amazon-account-management/a-plus-listing">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">A+ Content</h3>
                    <p className="text-sm text-gray-600">Premium brand content</p>
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
        <section className="py-16 bg-gradient-to-r from-green-600 to-green-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Prime-Eligible?
            </h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Start your FBA journey today and unlock the power of Amazon's fulfillment network
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-green-50">
                  Start FBA Onboarding
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Start Your FBA Journey</DialogTitle>
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
