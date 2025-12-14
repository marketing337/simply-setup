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
  TrendingUp, 
  ArrowRight,
  Package,
  Clock,
  Target,
  BarChart3,
  MapPin,
  Megaphone,
  Gift,
  Eye,
  Percent,
  Users,
  ShoppingCart,
  Zap,
  Star,
  Calendar
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

export default function HyperlocalPromotionsPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Eye className="w-6 h-6 text-red-500" />,
      problem: "Low Product Visibility",
      solution: "Strategic placement in high-traffic grocery categories and search results"
    },
    {
      icon: <MapPin className="w-6 h-6 text-red-500" />,
      problem: "Generic Promotions",
      solution: "Hyperlocal campaigns targeting specific pincodes and neighborhoods"
    },
    {
      icon: <Percent className="w-6 h-6 text-red-500" />,
      problem: "Ineffective Discounts",
      solution: "Data-driven promotions with optimal discount strategies"
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Poor Customer Acquisition",
      solution: "Sampling campaigns and new customer offers for trial generation"
    }
  ];

  const services = [
    {
      icon: <MapPin className="w-8 h-8 text-green-600" />,
      title: "Hyperlocal Targeting",
      description: "Target customers in specific areas based on their grocery preferences",
      features: ["Pincode targeting", "Neighborhood campaigns", "Regional offers"]
    },
    {
      icon: <Gift className="w-8 h-8 text-emerald-600" />,
      title: "Sampling Campaigns",
      description: "Drive product trials with strategic sampling offers",
      features: ["Free sample campaigns", "Bundle offers", "Try-before-buy programs"]
    },
    {
      icon: <Eye className="w-8 h-8 text-lime-600" />,
      title: "Visibility Boosters",
      description: "Increase product visibility across BigBasket platform",
      features: ["Featured listings", "Banner placements", "Category sponsorship"]
    },
    {
      icon: <Percent className="w-8 h-8 text-teal-600" />,
      title: "Promotional Campaigns",
      description: "Strategic discount and offer campaigns for maximum ROI",
      features: ["Flash sales", "Festive offers", "Combo deals"]
    },
    {
      icon: <Star className="w-8 h-8 text-green-700" />,
      title: "Brand Building",
      description: "Build brand awareness among BigBasket's grocery shoppers",
      features: ["Brand store setup", "Logo visibility", "Brand campaigns"]
    },
    {
      icon: <Calendar className="w-8 h-8 text-emerald-700" />,
      title: "Festival Marketing",
      description: "Capitalize on high-demand festival seasons",
      features: ["Diwali campaigns", "Holi specials", "Seasonal promotions"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Market Analysis",
      description: "Analyze local demand patterns and competitor promotions",
      icon: <BarChart3 className="w-6 h-6 text-green-600" />
    },
    {
      step: "2", 
      title: "Campaign Planning",
      description: "Design hyperlocal campaigns targeting specific customer segments",
      icon: <Target className="w-6 h-6 text-green-600" />
    },
    {
      step: "3",
      title: "Launch & Execute",
      description: "Deploy campaigns with real-time monitoring and optimization",
      icon: <Megaphone className="w-6 h-6 text-green-600" />
    },
    {
      step: "4",
      title: "Measure & Scale",
      description: "Analyze results and scale successful campaigns across regions",
      icon: <TrendingUp className="w-6 h-6 text-green-600" />
    }
  ];

  const successMetrics = [
    { value: "5x", label: "Visibility Increase", description: "Average improvement" },
    { value: "200%", label: "Order Growth", description: "During campaigns" },
    { value: "40%", label: "New Customer", description: "Acquisition rate" },
    { value: "3.5x", label: "ROAS", description: "Return on ad spend" }
  ];

  const faqs = [
    {
      question: "What are hyperlocal promotions on BigBasket?",
      answer: "Hyperlocal promotions target customers in specific geographic areas like pincodes or neighborhoods. This allows you to run area-specific offers based on local demand, demographics, and preferences for grocery products."
    },
    {
      question: "How do visibility boosters work on BigBasket?",
      answer: "Visibility boosters include featured listings, banner placements, and category sponsorships that make your products more prominent on the BigBasket app. These increase impressions and click-through rates, leading to more orders."
    },
    {
      question: "What sampling campaigns do you recommend for grocery products?",
      answer: "For FMCG and grocery products, we recommend free sample additions with orders, try-new-product discounts, and combo bundles. The strategy depends on product type, margin, and target customer segment."
    },
    {
      question: "How do you optimize promotional ROI?",
      answer: "We analyze historical campaign data, test different offer types, optimize timing, and target the right customer segments. We focus on metrics like customer acquisition cost, repeat purchase rate, and overall ROAS."
    },
    {
      question: "Can you help with festival-specific promotions?",
      answer: "Yes! We plan and execute festival campaigns for Diwali, Holi, Navratri, and other occasions. We start planning 4-6 weeks ahead, ensuring inventory, creative assets, and promotional budgets are optimized."
    },
    {
      question: "How do you measure promotion success?",
      answer: "We track visibility metrics (impressions, CTR), sales metrics (orders, revenue, GMV), customer metrics (new vs repeat), and ROI metrics (ROAS, CAC). You receive detailed reports with actionable insights."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "BigBasket Hyperlocal Promotions Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional BigBasket hyperlocal promotion services including area-specific campaigns, sampling, visibility boosters, and festival marketing for grocery marketplace growth.",
    "areaServed": "India",
    "serviceType": "Grocery Marketplace Promotions"
  };

  return (
    <>
      <SEO
        title="BigBasket Hyperlocal Promotions | Visibility Boosters & Sampling | Simply Setup"
        description="Boost your BigBasket sales with hyperlocal promotions, sampling campaigns, and visibility boosters. 5x visibility increase and 200% order growth during campaigns. Expert grocery marketing!"
        canonicalUrl="https://simplysetup.in/growth/bigbasket-account-management/hyperlocal-promotions"
      />

      <Navbar />

      <main className="min-h-screen">
        <div className="bg-gray-50 py-3 border-b">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600">
              <Link href="/growth" className="hover:text-green-600">Growth</Link>
              <span className="mx-2">/</span>
              <Link href="/growth/bigbasket-account-management" className="hover:text-green-600">BigBasket Account Management</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Hyperlocal Promotions</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  <Megaphone className="w-3 h-3 mr-1" /> Promotions Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Hyperlocal{" "}
                  <span className="text-green-600">Promotions</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Drive sales with targeted, area-specific promotions on BigBasket. From sampling campaigns 
                  to visibility boosters, we help you reach the right customers in every neighborhood.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-green-600 hover:bg-green-700" data-testid="button-promo-strategy">
                        Get Promotion Strategy
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Promotion Strategy</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-green-100 border-2 border-white flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 text-green-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">500+ Campaigns Executed</p>
                    <p className="text-xs text-gray-500">Average 3.5x ROAS</p>
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

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Struggling with BigBasket Visibility?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common promotion challenges we solve for grocery marketplace sellers
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

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">Boost Your Visibility Today</h3>
                <p className="text-gray-600 text-lg">
                  Let our experts design and execute high-impact promotional campaigns for your grocery products.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free promotion strategy worth ₹10,000</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Hyperlocal targeting expertise</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Performance-based optimization</span>
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
                Complete Promotion Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                End-to-end promotional management for your BigBasket success
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

        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Promotion Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A strategic approach to maximize your BigBasket promotional ROI
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

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Services</h2>
              <p className="text-gray-600">Explore more BigBasket growth services</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/growth/bigbasket-account-management/express-listing">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Express Listing</h3>
                    <p className="text-sm text-gray-600">Quick product onboarding</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/bigbasket-account-management/inventory-forecasting">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Inventory Forecasting</h3>
                    <p className="text-sm text-gray-600">Demand prediction</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/bigbasket-account-management/sla-monitoring">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="font-semibold mb-2">SLA Monitoring</h3>
                    <p className="text-sm text-gray-600">Operations excellence</p>
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

        <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Boost Your Sales?
            </h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Drive 200% order growth with our hyperlocal promotion strategies
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-green-50">
                  Get Promotion Strategy
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Promotion Strategy</DialogTitle>
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
