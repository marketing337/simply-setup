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
  Target,
  TrendingUp, 
  ArrowRight,
  Package,
  FileText,
  BarChart3,
  IndianRupee,
  Zap,
  LineChart,
  PieChart,
  Settings,
  Search,
  Star,
  DollarSign,
  Percent
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

export default function PPCAdsPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <DollarSign className="w-6 h-6 text-red-500" />,
      problem: "High ACoS / Wasted Spend",
      solution: "Strategic bid management and negative keyword optimization to reduce wasteful spend"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-red-500" />,
      problem: "Low Click-Through Rates",
      solution: "Targeted keyword selection and compelling ad copy to improve CTR"
    },
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Poor Targeting",
      solution: "Precise audience and keyword targeting for higher conversion rates"
    },
    {
      icon: <LineChart className="w-6 h-6 text-red-500" />,
      problem: "No Clear ROI",
      solution: "Detailed reporting and attribution to track every rupee spent"
    }
  ];

  const services = [
    {
      icon: <Search className="w-8 h-8 text-blue-600" />,
      title: "Sponsored Products",
      description: "Keyword-targeted ads in search results and product pages",
      features: ["Automatic campaigns", "Manual targeting", "ASIN targeting"]
    },
    {
      icon: <Star className="w-8 h-8 text-purple-600" />,
      title: "Sponsored Brands",
      description: "Headline ads featuring your brand logo and products",
      features: ["Brand awareness", "Custom headlines", "Store spotlight"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-orange-600" />,
      title: "Sponsored Display",
      description: "Retargeting ads on and off Amazon",
      features: ["Product targeting", "Audience retargeting", "Competitor targeting"]
    },
    {
      icon: <PieChart className="w-8 h-8 text-green-600" />,
      title: "Campaign Optimization",
      description: "Continuous improvement for maximum ROI",
      features: ["Bid adjustments", "Keyword harvesting", "Negative keyword mining"]
    },
    {
      icon: <LineChart className="w-8 h-8 text-indigo-600" />,
      title: "Performance Analytics",
      description: "Data-driven insights and reporting",
      features: ["Weekly reports", "Sales attribution", "Trend analysis"]
    },
    {
      icon: <Settings className="w-8 h-8 text-pink-600" />,
      title: "Account Audit",
      description: "Comprehensive PPC health check",
      features: ["Wasted spend analysis", "Opportunity identification", "Strategy recommendations"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Account Audit",
      description: "Analyze current campaigns, identify waste and opportunities",
      icon: <Search className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "Strategy Development",
      description: "Create customized PPC strategy based on your goals and budget",
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "Campaign Launch",
      description: "Set up and launch optimized campaigns across ad types",
      icon: <Zap className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "Optimize & Scale",
      description: "Continuous optimization with weekly reporting and strategy adjustments",
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />
    }
  ];

  const successMetrics = [
    { value: "45%", label: "Avg. ACoS Reduction", description: "Within 60 days" },
    { value: "3x", label: "ROAS Improvement", description: "Return on ad spend" },
    { value: "₹50Cr+", label: "Ad Spend Managed", description: "Annually" },
    { value: "24/7", label: "Campaign Monitoring", description: "Real-time optimization" }
  ];

  const faqs = [
    {
      question: "What is Amazon PPC and why do I need it?",
      answer: "Amazon PPC (Pay-Per-Click) is Amazon's advertising platform where you pay only when someone clicks your ad. It's essential for increasing product visibility, driving sales, and competing effectively on Amazon, especially for new products that need initial momentum."
    },
    {
      question: "What is a good ACoS (Advertising Cost of Sale)?",
      answer: "A good ACoS depends on your profit margins and goals. Generally, an ACoS of 15-25% is considered healthy for most products. For new product launches, higher ACoS is acceptable for visibility. We work to achieve your target ACoS based on your specific margins."
    },
    {
      question: "How much should I budget for Amazon PPC?",
      answer: "We recommend starting with a minimum daily budget of ₹500-1000 per product for meaningful data collection. Your ideal budget depends on your product price, competition, and goals. We help optimize spend to maximize ROI regardless of budget size."
    },
    {
      question: "How long before I see results from PPC campaigns?",
      answer: "Initial data and trends appear within 1-2 weeks. Meaningful optimization typically happens in 4-6 weeks as we gather sufficient data for informed decisions. Full optimization with stable performance usually takes 2-3 months."
    },
    {
      question: "Do you manage Sponsored Brands and Display ads too?",
      answer: "Yes! We manage all Amazon ad types including Sponsored Products, Sponsored Brands, Sponsored Display, and Amazon DSP for larger advertisers. Each ad type serves different objectives in your advertising funnel."
    },
    {
      question: "What reporting do you provide?",
      answer: "We provide weekly performance reports covering key metrics like ACoS, ROAS, impressions, clicks, conversions, and spend. Monthly strategy reviews include deeper analysis, optimization actions taken, and recommendations for the coming period."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Amazon PPC Advertising Management Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Amazon PPC management services including Sponsored Products, Sponsored Brands, and Sponsored Display campaigns. Maximize ROAS with expert bid management and optimization.",
    "areaServed": "India",
    "serviceType": "E-commerce Advertising"
  };

  return (
    <>
      <SEO
        title="Amazon PPC Ads Management | Maximize ROAS | Simply Setup"
        description="Expert Amazon PPC management services. Reduce ACoS and increase ROAS with data-driven Sponsored Products, Brands & Display campaigns. Get a free PPC audit!"
        canonicalUrl="https://simplysetup.in/growth/amazon-account-management/ppc-ads"
      />

      <Navbar />

      <main className="min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-3 border-b">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600">
              <Link href="/growth" className="hover:text-blue-600">Growth</Link>
              <span className="mx-2">/</span>
              <Link href="/growth/amazon-account-management" className="hover:text-blue-600">Amazon Account Management</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">PPC Ads Campaign</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                  <BarChart3 className="w-3 h-3 mr-1" /> Amazon Advertising Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Amazon PPC Ads{" "}
                  <span className="text-blue-600">Campaign Management</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Maximize your advertising ROI with data-driven PPC strategies. Our experts optimize 
                  every campaign to reduce ACoS, increase sales, and scale your Amazon business profitably.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700" data-testid="button-get-ppc-audit">
                        Get Free PPC Audit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free PPC Audit</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">₹50Cr+ Ad Spend Managed</p>
                    <p className="text-xs text-gray-500">Average 45% ACoS reduction</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-8 border">
                  <div className="grid grid-cols-2 gap-6">
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="text-center p-4 bg-blue-50 rounded-xl">
                        <p className="text-3xl font-bold text-blue-600">{metric.value}</p>
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
              <div className="w-20 h-1 bg-blue-600 mx-auto my-3 rounded-sm"></div>
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
                Are Your Amazon Ads Underperforming?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common PPC challenges we solve for Amazon sellers every day
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {painPoints.map((point, index) => (
                <Card key={index} className="border-2 hover:border-blue-200 transition-colors">
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
                <h3 className="text-3xl font-bold text-gray-900">Get Expert PPC Management</h3>
                <p className="text-gray-600 text-lg">
                  Let our Amazon advertising experts maximize your ROAS and scale your business.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free PPC audit worth ₹10,000</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Weekly performance reports</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">No long-term contracts</span>
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
                Complete Amazon PPC Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Full-funnel advertising management for maximum ROI
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
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our PPC Management Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A data-driven approach to maximizing your advertising ROI
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    {step.icon}
                  </div>
                  <div className="bg-blue-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3">
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
              <Link href="/growth/amazon-account-management/fba-onboarding">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">FBA Onboarding</h3>
                    <p className="text-sm text-gray-600">Fulfillment by Amazon</p>
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
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Maximize Your Ad ROI?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Get a free PPC audit and discover how we can reduce your ACoS and scale your sales
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                  Get Free PPC Audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Free PPC Audit</DialogTitle>
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
