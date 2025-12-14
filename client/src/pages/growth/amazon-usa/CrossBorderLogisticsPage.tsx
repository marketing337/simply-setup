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
  Globe, 
  TrendingUp, 
  ArrowRight,
  FileText,
  Users,
  Truck,
  Package,
  Ship,
  Plane,
  Warehouse,
  ClipboardList,
  Calculator,
  MapPin,
  Shield,
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

export default function CrossBorderLogisticsPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Ship className="w-6 h-6 text-red-500" />,
      problem: "Complex International Shipping",
      solution: "End-to-end logistics from Indian warehouse to US Amazon fulfillment centers"
    },
    {
      icon: <ClipboardList className="w-6 h-6 text-red-500" />,
      problem: "Customs & Documentation",
      solution: "Complete customs clearance with proper HS codes, commercial invoices, and import documentation"
    },
    {
      icon: <DollarSign className="w-6 h-6 text-red-500" />,
      problem: "High Duties & Hidden Costs",
      solution: "Optimized shipping routes and duty planning to minimize landed costs"
    },
    {
      icon: <Warehouse className="w-6 h-6 text-red-500" />,
      problem: "FBA Prep Requirements",
      solution: "US-based prep centers ensure products meet Amazon's strict FBA requirements"
    }
  ];

  const services = [
    {
      icon: <Plane className="w-8 h-8 text-orange-600" />,
      title: "Air Freight Services",
      description: "Fast shipping for urgent inventory or initial product launches",
      features: ["Express 3-5 day delivery", "Time-sensitive shipments", "Small batch shipping"]
    },
    {
      icon: <Ship className="w-8 h-8 text-amber-600" />,
      title: "Sea Freight Solutions",
      description: "Cost-effective bulk shipping for regular inventory replenishment",
      features: ["FCL & LCL options", "25-30 day transit", "Best for large volumes"]
    },
    {
      icon: <ClipboardList className="w-8 h-8 text-orange-700" />,
      title: "Customs Clearance",
      description: "Hassle-free US customs with expert documentation",
      features: ["HS code classification", "ISF filing", "Duty calculation"]
    },
    {
      icon: <Warehouse className="w-8 h-8 text-amber-700" />,
      title: "FBA Prep Services",
      description: "US-based prep centers for Amazon compliance",
      features: ["FNSKU labeling", "Poly bagging", "Bundle packaging"]
    },
    {
      icon: <Calculator className="w-8 h-8 text-orange-800" />,
      title: "Duty Management",
      description: "Optimize your import costs and duty payments",
      features: ["Duty drawback programs", "FTZ utilization", "Cost optimization"]
    },
    {
      icon: <MapPin className="w-8 h-8 text-amber-800" />,
      title: "Inventory Distribution",
      description: "Strategic placement across Amazon's US fulfillment network",
      features: ["Multi-warehouse delivery", "Inventory placement", "Stock level monitoring"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Shipment Planning",
      description: "Analyze your products, volumes, and timelines to determine optimal shipping method",
      icon: <ClipboardList className="w-6 h-6 text-orange-600" />
    },
    {
      step: "2", 
      title: "Export & Transit",
      description: "Handle India export documentation, freight booking, and shipment tracking",
      icon: <Truck className="w-6 h-6 text-orange-600" />
    },
    {
      step: "3",
      title: "US Import & Customs",
      description: "Clear US customs, pay duties, and transport to FBA prep center",
      icon: <Shield className="w-6 h-6 text-orange-600" />
    },
    {
      step: "4",
      title: "FBA Prep & Delivery",
      description: "Prepare products per Amazon requirements and deliver to fulfillment centers",
      icon: <Package className="w-6 h-6 text-orange-600" />
    }
  ];

  const successMetrics = [
    { value: "1000+", label: "Shipments Handled", description: "India to USA" },
    { value: "99.5%", label: "On-Time Delivery", description: "To Amazon FBA" },
    { value: "30%", label: "Avg Cost Savings", description: "Vs standard rates" },
    { value: "0%", label: "Customs Issues", description: "Rejection rate" }
  ];

  const faqs = [
    {
      question: "What is the best shipping method for sending products from India to Amazon USA?",
      answer: "It depends on your timeline and budget. Sea freight (25-35 days) is most cost-effective for regular inventory, with costs of $2-4 per kg. Air freight (5-7 days) is better for urgent shipments or initial launches at $5-10 per kg. We help you choose based on your product margins and inventory needs."
    },
    {
      question: "What documentation is required for shipping to the US?",
      answer: "You'll need commercial invoices, packing lists, bill of lading/airway bill, and potentially certificates of origin. For FDA-regulated products, prior notice filings are required. We handle all documentation including ISF (Importer Security Filing) which must be filed 24 hours before cargo loads onto vessel."
    },
    {
      question: "How do customs duties work for Amazon FBA shipments?",
      answer: "US import duties are based on your product's HS code classification, typically ranging from 0-25%. Duties are paid when goods clear US customs before reaching Amazon. We provide accurate duty estimates upfront and help classify products to optimize duty rates where legally possible."
    },
    {
      question: "What is FBA Prep and why do I need a prep center?",
      answer: "FBA Prep ensures your products meet Amazon's strict requirements including FNSKU labeling, poly bagging, bundling, and packaging standards. Using a US-based prep center allows inspection before Amazon receipt, reducing rejections and ensuring products are sellable immediately upon FBA check-in."
    },
    {
      question: "How long does the entire process take from India to Amazon FBA?",
      answer: "Total timeline: Sea freight takes 35-45 days (25-30 transit + 7-10 for customs, prep, and FBA delivery). Air freight takes 10-15 days (5-7 transit + 5-7 for processing). These include buffer for customs clearance, prep center processing, and FBA receiving."
    },
    {
      question: "Can you handle returns and unsold inventory?",
      answer: "Yes, we offer returns management and inventory removal services. This includes receiving customer returns, inspection/refurbishment, relisting of sellable items, and disposal/liquidation of unsellable inventory. We can also ship inventory back to India if needed."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Amazon USA Cross-Border Logistics Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Complete cross-border logistics for Amazon USA sellers. FBA Export, international shipping, customs clearance, and duty management for Indian sellers.",
    "areaServed": ["India", "United States"],
    "serviceType": "International E-commerce Logistics"
  };

  return (
    <>
      <SEO
        title="Amazon USA Cross-Border Logistics | FBA Export & Shipping | Simply Setup"
        description="Expert cross-border logistics for Amazon USA. International shipping, customs clearance, FBA prep, and duty management for Indian sellers. Ship from India to Amazon.com FBA!"
        canonicalUrl="https://simplysetup.in/growth/amazon-usa-account-management/cross-border-logistics"
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
              <span className="text-gray-900">Cross-Border Logistics</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-orange-50 via-white to-amber-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  <Truck className="w-3 h-3 mr-1" /> International Logistics Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Cross-Border Logistics{" "}
                  <span className="text-orange-600">India to Amazon USA</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Ship your products seamlessly from India to Amazon's US fulfillment centers. 
                  We handle freight, customs, duties, and FBA prep so you can focus on selling.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-orange-600 hover:bg-orange-700" data-testid="button-get-shipping-quote">
                        Get Free Shipping Quote
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free Shipping Quote</DialogTitle>
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
                    <p className="text-sm font-semibold text-gray-900">1000+ Shipments Delivered</p>
                    <p className="text-xs text-gray-500">99.5% on-time to Amazon FBA</p>
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
                Cross-Border Shipping Challenges We Solve
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Complex logistics issues we handle for Indian sellers shipping to Amazon USA
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
                <h3 className="text-3xl font-bold text-gray-900">Get Your Shipping Quote</h3>
                <p className="text-gray-600 text-lg">
                  Let us handle the complexities of international shipping to Amazon USA.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free shipping cost estimate</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Duty and landed cost calculation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Timeline and route optimization</span>
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
                Complete Logistics Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                End-to-end shipping solutions from your Indian warehouse to Amazon's US fulfillment centers
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
                Our Logistics Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A proven 4-step approach to seamless India-to-USA shipping
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
              <Link href="/growth/amazon-usa-account-management/market-entry">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Market Entry</h3>
                    <p className="text-sm text-gray-600">US compliance & registration</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/amazon-usa-account-management/localized-content">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Localized Content</h3>
                    <p className="text-sm text-gray-600">US audience optimization</p>
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
              Ready to Ship to Amazon USA?
            </h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Get a free shipping quote and start selling on the world's largest marketplace
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50">
                  Get Free Shipping Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Free Shipping Quote</DialogTitle>
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
