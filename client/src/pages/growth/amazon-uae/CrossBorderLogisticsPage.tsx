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
  Package,
  Truck,
  Ship,
  Plane,
  Warehouse,
  ClipboardCheck,
  MapPin,
  Clock,
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
      problem: "Complex India-UAE Shipping",
      solution: "End-to-end logistics from Indian warehouse to Amazon UAE fulfillment centers"
    },
    {
      icon: <ClipboardCheck className="w-6 h-6 text-red-500" />,
      problem: "GCC Customs Clearance Issues",
      solution: "Expert handling of UAE customs documentation and duty calculations"
    },
    {
      icon: <DollarSign className="w-6 h-6 text-red-500" />,
      problem: "High Shipping Costs",
      solution: "Consolidated shipping and optimized routes to reduce per-unit costs"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Long Transit Times",
      solution: "Air freight options and strategic inventory placement for faster delivery"
    }
  ];

  const services = [
    {
      icon: <Warehouse className="w-8 h-8 text-yellow-600" />,
      title: "FBA UAE Onboarding",
      description: "Complete Fulfillment by Amazon UAE setup and management",
      features: ["FBA account setup", "Shipment creation", "Inventory management"]
    },
    {
      icon: <Ship className="w-8 h-8 text-yellow-700" />,
      title: "Sea Freight to UAE",
      description: "Cost-effective ocean shipping from India to Dubai/Abu Dhabi",
      features: ["FCL & LCL options", "Port-to-warehouse delivery", "15-20 day transit"]
    },
    {
      icon: <Plane className="w-8 h-8 text-yellow-600" />,
      title: "Air Freight Express",
      description: "Fast air cargo for urgent inventory replenishment",
      features: ["3-5 day delivery", "Airport-to-door service", "Priority handling"]
    },
    {
      icon: <ClipboardCheck className="w-8 h-8 text-yellow-700" />,
      title: "GCC Customs Clearance",
      description: "Hassle-free customs documentation and clearance",
      features: ["HS code classification", "Duty calculation", "Documentation support"]
    },
    {
      icon: <Package className="w-8 h-8 text-yellow-600" />,
      title: "FBA Prep Services",
      description: "Amazon-compliant labeling and packaging in UAE",
      features: ["FNSKU labeling", "Packaging compliance", "Quality inspection"]
    },
    {
      icon: <MapPin className="w-8 h-8 text-yellow-700" />,
      title: "Pan-GCC Distribution",
      description: "Expand to Saudi Arabia, Kuwait, Oman, Bahrain, Qatar",
      features: ["Multi-country fulfillment", "GCC expansion strategy", "Regional warehousing"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Logistics Assessment",
      description: "Analyze your products, volumes, and identify optimal shipping routes to UAE",
      icon: <ClipboardCheck className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "2", 
      title: "Shipping Setup",
      description: "Configure freight forwarding, customs documentation, and FBA shipments",
      icon: <Ship className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "3",
      title: "Customs & Delivery",
      description: "Handle GCC customs clearance and delivery to Amazon UAE warehouses",
      icon: <Package className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "4",
      title: "Inventory Management",
      description: "Monitor stock levels and coordinate replenishments for uninterrupted sales",
      icon: <Warehouse className="w-6 h-6 text-yellow-600" />
    }
  ];

  const successMetrics = [
    { value: "1000+", label: "Shipments Delivered", description: "To UAE FBA" },
    { value: "40%", label: "Cost Savings", description: "Vs individual shipping" },
    { value: "99.5%", label: "On-Time Delivery", description: "Track record" },
    { value: "5-7 Days", label: "Air Freight", description: "India to Dubai" }
  ];

  const faqs = [
    {
      question: "What is the best shipping method from India to Amazon UAE?",
      answer: "For most sellers, sea freight is the most cost-effective option (15-20 days transit). Air freight (5-7 days) is ideal for initial inventory, high-margin products, or urgent replenishment. We analyze your product characteristics and sales velocity to recommend the optimal mix."
    },
    {
      question: "How does FBA UAE work for Indian sellers?",
      answer: "FBA UAE works similarly to FBA India. You ship inventory to Amazon's UAE fulfillment centers (Dubai/Abu Dhabi), and Amazon handles storage, picking, packing, shipping, and customer service. We help with shipment creation, prep requirements, and inventory management."
    },
    {
      question: "What customs duties apply for Indian products in UAE?",
      answer: "UAE applies a standard 5% customs duty on most imported goods, with some categories exempt (like books). You'll also need to pay 5% VAT. We help with accurate HS code classification and ensure proper documentation to avoid delays or penalties."
    },
    {
      question: "Can you help with products that need special certifications?",
      answer: "Yes, we assist with ESMA certification, Emirates conformity assessment, and category-specific approvals. Products like electronics, toys, cosmetics, and food items have specific requirements we help navigate before shipping to UAE."
    },
    {
      question: "What are the FBA labeling requirements for UAE?",
      answer: "Products must have Amazon FNSKU barcodes, and some categories require Arabic labeling on packaging. We provide complete FBA prep services in India or UAE including labeling, packaging, and quality inspection before inbound shipment."
    },
    {
      question: "Can I expand to other GCC countries from UAE?",
      answer: "Yes, Amazon UAE can fulfill orders to Saudi Arabia, Kuwait, Oman, Bahrain, and Qatar. We help with Pan-GCC expansion strategy, including separate marketplace registration (like Amazon.sa) and multi-country inventory planning."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Amazon UAE Cross-Border Logistics Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Complete cross-border logistics services for Amazon UAE sellers. FBA onboarding, India-UAE shipping, GCC customs clearance, and inventory management for Indian sellers.",
    "areaServed": ["India", "United Arab Emirates", "GCC"],
    "serviceType": "International E-commerce Logistics"
  };

  return (
    <>
      <SEO
        title="Amazon UAE Cross-Border Logistics | FBA UAE Shipping | Simply Setup"
        description="Expert Amazon UAE logistics services. India to UAE shipping, FBA onboarding, GCC customs clearance, and inventory management for Indian sellers. Optimize your supply chain!"
        canonicalUrl="https://simplysetup.in/growth/amazon-uae-account-management/cross-border-logistics"
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
              <span className="text-yellow-500">Cross-Border Logistics</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 lg:py-24">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
          <div className="container mx-auto px-4 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border-yellow-500/50">
                  <Truck className="w-3 h-3 mr-1" /> UAE Logistics Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Cross-Border{" "}
                  <span className="text-yellow-500">Logistics & FBA UAE</span>
                </h1>
                
                <p className="text-lg text-gray-300 leading-relaxed">
                  Seamless shipping from India to Amazon UAE fulfillment centers. 
                  We handle freight forwarding, customs clearance, and FBA prep so you can focus on selling.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" data-testid="button-get-shipping-quote">
                        Get Free Shipping Quote
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free UAE Shipping Quote</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-yellow-500/20 border-2 border-gray-700 flex items-center justify-center">
                        <Package className="w-5 h-5 text-yellow-500" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">1000+ Shipments Delivered</p>
                    <p className="text-xs text-gray-400">99.5% on-time delivery rate</p>
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
                Common Cross-Border Challenges
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Logistics hurdles we help Indian sellers overcome for UAE expansion
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
                <h3 className="text-3xl font-bold text-white">Get Your Shipping Quote</h3>
                <p className="text-gray-300 text-lg">
                  Optimize your India to UAE supply chain with expert logistics support.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                    <span className="text-gray-300">Free shipping cost analysis</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                    <span className="text-gray-300">Customs duty calculation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                    <span className="text-gray-300">FBA prep requirements review</span>
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
                Complete Logistics Services
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                End-to-end supply chain solutions for Amazon UAE sellers
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
                Our Logistics Process
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A streamlined 4-step approach to getting your products to Amazon UAE
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
              <Link href="/growth/amazon-uae-account-management/market-entry">
                <Card className="bg-gray-900 border border-yellow-500/20 hover:border-yellow-500/50 hover:shadow-lg transition-all cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-6 h-6 text-yellow-500" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">Market Entry</h3>
                    <p className="text-sm text-gray-400">UAE compliance & registration</p>
                  </CardContent>
                </Card>
              </Link>
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
                  Common questions about India to UAE shipping and FBA logistics
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
              Ready to Ship to UAE?
            </h2>
            <p className="text-gray-800 mb-8 max-w-2xl mx-auto">
              Get expert logistics support for seamless India to UAE shipping and FBA fulfillment
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
                  <DialogTitle>Start Your UAE Logistics Journey</DialogTitle>
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
