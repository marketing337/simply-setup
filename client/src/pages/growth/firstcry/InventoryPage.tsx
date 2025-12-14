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
  Package,
  Warehouse,
  RefreshCw,
  BarChart3,
  Clock,
  AlertTriangle,
  Baby,
  Store,
  Truck,
  LineChart
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

export default function InventoryPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      problem: "Frequent Stockouts",
      solution: "Predictive demand forecasting to maintain optimal stock levels"
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-red-500" />,
      problem: "Store-Online Mismatch",
      solution: "Real-time inventory sync across all FirstCry channels"
    },
    {
      icon: <Warehouse className="w-6 h-6 text-red-500" />,
      problem: "Excess Inventory Costs",
      solution: "Data-driven inventory optimization to reduce holding costs"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Seasonal Planning Gaps",
      solution: "Baby product seasonality analysis for proactive stocking"
    }
  ];

  const services = [
    {
      icon: <RefreshCw className="w-8 h-8 text-orange-600" />,
      title: "Omni-channel Sync",
      description: "Real-time inventory synchronization across channels",
      features: ["FirstCry online sync", "Store inventory connect", "Marketplace integration"]
    },
    {
      icon: <LineChart className="w-8 h-8 text-pink-600" />,
      title: "Demand Forecasting",
      description: "AI-powered predictions for baby product demand",
      features: ["Seasonal trends", "Milestone-based demand", "Festival planning"]
    },
    {
      icon: <Package className="w-8 h-8 text-purple-600" />,
      title: "Stock Level Optimization",
      description: "Right inventory at the right time",
      features: ["Reorder point setup", "Safety stock calculation", "Dead stock alerts"]
    },
    {
      icon: <Truck className="w-8 h-8 text-green-600" />,
      title: "Fulfillment Strategy",
      description: "Optimize fulfillment for faster delivery",
      features: ["Warehouse allocation", "Multi-location strategy", "Express delivery setup"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: "Inventory Analytics",
      description: "Data-driven inventory insights",
      features: ["Turnover analysis", "SKU performance", "Channel-wise tracking"]
    },
    {
      icon: <Store className="w-8 h-8 text-coral-600" />,
      title: "Store Integration",
      description: "Connect physical stores with online inventory",
      features: ["POS integration", "Store pickup setup", "Stock transfer management"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Inventory Audit",
      description: "Analyze current inventory across all channels and locations",
      icon: <BarChart3 className="w-6 h-6 text-orange-600" />
    },
    {
      step: "2", 
      title: "System Integration",
      description: "Connect all channels for real-time inventory visibility",
      icon: <RefreshCw className="w-6 h-6 text-orange-600" />
    },
    {
      step: "3",
      title: "Forecasting Setup",
      description: "Implement demand forecasting for optimal stocking",
      icon: <LineChart className="w-6 h-6 text-orange-600" />
    },
    {
      step: "4",
      title: "Continuous Optimization",
      description: "Ongoing monitoring and inventory performance improvement",
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />
    }
  ];

  const successMetrics = [
    { value: "40%", label: "Stockout Reduction", description: "On average" },
    { value: "25%", label: "Holding Cost Savings", description: "Through optimization" },
    { value: "100+", label: "Brands Managed", description: "Multi-channel inventory" },
    { value: "99.5%", label: "Sync Accuracy", description: "Real-time updates" }
  ];

  const faqs = [
    {
      question: "How does omni-channel inventory work with FirstCry?",
      answer: "We integrate your inventory management system with FirstCry's online platform and physical store network. This ensures real-time visibility across all channels, preventing overselling and enabling features like store pickup for online orders."
    },
    {
      question: "What is demand forecasting for baby products?",
      answer: "Baby products have unique demand patterns based on age milestones, seasons, and festivals. Our forecasting models consider factors like newborn rates, seasonal needs (monsoon gear, winter wear), and festival shopping patterns to predict demand accurately."
    },
    {
      question: "How do you handle seasonal inventory for baby products?",
      answer: "We analyze historical data and upcoming trends to plan seasonal inventory. For example, we stock up on winter wear before October, monsoon essentials before June, and school supplies before April. This ensures you never miss peak demand periods."
    },
    {
      question: "Can you integrate with our existing ERP or inventory system?",
      answer: "Yes, we integrate with most popular ERP and inventory management systems including SAP, Oracle, Tally, Zoho Inventory, and others. Our team handles the complete integration process and data migration."
    },
    {
      question: "How quickly can inventory sync between channels?",
      answer: "Our real-time sync updates inventory across all channels within seconds. This prevents overselling scenarios where the same item is sold on multiple channels simultaneously. We maintain 99.5% sync accuracy."
    },
    {
      question: "Do you help with FirstCry's fulfillment requirements?",
      answer: "Absolutely! We help optimize your fulfillment strategy for FirstCry including warehouse allocation, inventory positioning for faster delivery, and meeting FirstCry's fulfillment SLAs. This includes both seller-fulfilled and FirstCry-fulfilled options."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "FirstCry Omni-channel Inventory Planning Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional omni-channel inventory management for FirstCry sellers. Real-time sync, demand forecasting, and stock optimization for baby product brands.",
    "areaServed": "India",
    "serviceType": "E-commerce Inventory Management"
  };

  return (
    <>
      <SEO
        title="FirstCry Inventory Planning | Omni-channel Sync | Demand Forecasting | Simply Setup"
        description="Expert FirstCry inventory management services. Omni-channel sync, demand forecasting, and stock optimization for baby brands. Reduce stockouts by 40%!"
        canonicalUrl="https://simplysetup.in/growth/firstcry-account-management/inventory"
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
              <span className="text-gray-900">Inventory Planning</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-orange-50 via-white to-blue-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  <Warehouse className="w-3 h-3 mr-1" /> Inventory Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Omni-channel Inventory{" "}
                  <span className="text-orange-600">Planning</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Never miss a sale due to stockouts. Our inventory management syncs your online 
                  and store inventory in real-time with smart demand forecasting for baby products.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-orange-600 hover:bg-orange-700" data-testid="button-inventory-consultation">
                        Get Inventory Consultation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Inventory Consultation</DialogTitle>
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
                    <p className="text-sm font-semibold text-gray-900">100+ Brands Managed</p>
                    <p className="text-xs text-gray-500">40% average stockout reduction</p>
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
                Are You Losing Sales to Inventory Issues?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common inventory challenges we solve for FirstCry sellers
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
                <h3 className="text-3xl font-bold text-gray-900">Optimize Your Inventory</h3>
                <p className="text-gray-600 text-lg">
                  Let our inventory experts sync your channels and forecast demand for baby products.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free inventory health assessment</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">40% average stockout reduction</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Real-time omni-channel sync</span>
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
                Complete Inventory Management Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                End-to-end inventory solutions for baby product brands
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
                Our Inventory Planning Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A proven 4-step approach to omni-channel inventory excellence
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
              <Link href="/growth/firstcry-account-management/compliance">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Safety Compliance</h3>
                    <p className="text-sm text-gray-600">BIS certification support</p>
                  </CardContent>
                </Card>
              </Link>
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
              Ready to Optimize Your Inventory?
            </h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Get a free inventory health assessment and never miss a sale again
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50">
                  Get Free Inventory Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Inventory Assessment</DialogTitle>
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
