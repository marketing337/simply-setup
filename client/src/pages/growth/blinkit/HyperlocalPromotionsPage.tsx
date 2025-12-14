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
  Target,
  BarChart3,
  MapPin,
  Gift,
  Calendar,
  Megaphone,
  Users,
  Sparkles,
  Percent,
  Zap,
  Warehouse
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
      icon: <MapPin className="w-6 h-6 text-red-500" />,
      problem: "Generic Promotions",
      solution: "Location-specific offers targeting high-potential areas"
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Low Brand Trial",
      solution: "Product sampling campaigns to drive first-time purchases"
    },
    {
      icon: <Calendar className="w-6 h-6 text-red-500" />,
      problem: "Missed Festival Sales",
      solution: "Timely festival campaign planning and execution"
    },
    {
      icon: <Percent className="w-6 h-6 text-red-500" />,
      problem: "Poor Promotion ROI",
      solution: "Data-driven offer optimization for maximum returns"
    }
  ];

  const services = [
    {
      icon: <MapPin className="w-8 h-8 text-yellow-600" />,
      title: "Location-Based Offers",
      description: "Target specific neighborhoods with tailored promotions",
      features: ["Pincode targeting", "Area-specific discounts", "Local demand mapping"]
    },
    {
      icon: <Gift className="w-8 h-8 text-amber-600" />,
      title: "Product Sampling",
      description: "Drive trial with strategic free sample campaigns",
      features: ["Sample selection strategy", "Target audience mapping", "Conversion tracking"]
    },
    {
      icon: <Calendar className="w-8 h-8 text-orange-600" />,
      title: "Festival Campaigns",
      description: "Capitalize on Diwali, Holi, and regional festivals",
      features: ["Festival calendar planning", "Themed promotions", "Inventory alignment"]
    },
    {
      icon: <Megaphone className="w-8 h-8 text-green-600" />,
      title: "Visibility Boosters",
      description: "Premium placements and featured listings",
      features: ["Banner ads", "Category sponsorship", "Search boost"]
    },
    {
      icon: <Sparkles className="w-8 h-8 text-blue-600" />,
      title: "New Launch Campaigns",
      description: "Create buzz for new product introductions",
      features: ["Launch strategy", "Sampling + offers combo", "Awareness building"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
      title: "Performance Analytics",
      description: "Track and optimize campaign performance",
      features: ["ROI measurement", "A/B testing", "Conversion analytics"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Market Analysis",
      description: "Identify high-potential areas and target customer segments",
      icon: <Target className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "2", 
      title: "Campaign Design",
      description: "Create compelling offers tailored to local preferences",
      icon: <Megaphone className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "3",
      title: "Execute & Monitor",
      description: "Launch campaigns with real-time performance tracking",
      icon: <Sparkles className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "4",
      title: "Optimize & Scale",
      description: "Refine based on data and expand winning campaigns",
      icon: <TrendingUp className="w-6 h-6 text-yellow-600" />
    }
  ];

  const successMetrics = [
    { value: "5x", label: "Sampling Conversion", description: "Trial to purchase" },
    { value: "200%", label: "Festival Sales Lift", description: "During campaigns" },
    { value: "60%", label: "Repeat Customers", description: "From sampling" },
    { value: "3x", label: "ROI on Promotions", description: "Average returns" }
  ];

  const faqs = [
    {
      question: "What are hyperlocal promotions on Blinkit?",
      answer: "Hyperlocal promotions are location-specific offers targeting customers in specific pincodes or neighborhoods. This allows you to tailor discounts, bundles, and campaigns based on local demand patterns and competition."
    },
    {
      question: "How does product sampling work on Blinkit?",
      answer: "Product sampling involves offering free or heavily discounted trial-size products to new customers. We identify the right target audience, optimal sample size, and track conversion from sampling to full-size purchase."
    },
    {
      question: "When should I run festival campaigns?",
      answer: "Festival campaigns should be planned 4-6 weeks in advance. Key opportunities include Diwali, Holi, Eid, regional festivals, and occasions like summer holidays. We create a comprehensive festival calendar aligned with your products."
    },
    {
      question: "How do you target specific locations on Blinkit?",
      answer: "We use Blinkit's pincode-level targeting to identify high-potential areas based on demographics, purchase patterns, and competition. Offers are then customized for each location to maximize relevance and conversion."
    },
    {
      question: "What is the typical ROI on Blinkit promotions?",
      answer: "Well-optimized promotions typically deliver 2-5x ROI. This varies by category, offer type, and targeting precision. Our data-driven approach ensures promotions are profitable, not just volume-driving."
    },
    {
      question: "Can you help launch new products on Blinkit?",
      answer: "Absolutely! New product launches benefit from combined sampling, introductory offers, and visibility boosts. We create integrated launch campaigns that build awareness, drive trial, and convert to repeat purchases."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Blinkit Hyperlocal Promotions & Sampling Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Blinkit promotion services including location-based offers, product sampling campaigns, and festival promotions for quick commerce growth.",
    "areaServed": "India",
    "serviceType": "Quick Commerce Marketing Services"
  };

  return (
    <>
      <SEO
        title="Blinkit Hyperlocal Promotions & Sampling | Location-Based Offers | Simply Setup"
        description="Expert Blinkit promotion services with hyperlocal targeting, product sampling campaigns, and festival promotions. Achieve 5x sampling conversion and 200% festival sales lift."
        canonicalUrl="https://simplysetup.in/growth/blinkit-account-management/hyperlocal-promotions"
      />

      <Navbar />

      <main className="min-h-screen">
        <div className="bg-gray-50 py-3 border-b">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600">
              <Link href="/growth" className="hover:text-yellow-600">Growth</Link>
              <span className="mx-2">/</span>
              <Link href="/growth/blinkit-account-management" className="hover:text-yellow-600">Blinkit Account Management</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Hyperlocal Promotions & Sampling</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-yellow-50 via-white to-amber-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                  <Target className="w-3 h-3 mr-1" /> Hyperlocal Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Hyperlocal Promotions &{" "}
                  <span className="text-yellow-600">Sampling</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Drive trials and boost sales with precision-targeted campaigns. Our hyperlocal 
                  strategies ensure your promotions reach the right customers at the right time.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700" data-testid="button-promo-strategy">
                        Get Promotion Strategy
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Hyperlocal Promotion Strategy</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-yellow-100 border-2 border-white flex items-center justify-center">
                        <Gift className="w-5 h-5 text-yellow-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">5x Sampling Conversion</p>
                    <p className="text-xs text-gray-500">Trial to purchase rate</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-8 border">
                  <div className="grid grid-cols-2 gap-6">
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="text-center p-4 bg-yellow-50 rounded-xl">
                        <p className="text-3xl font-bold text-yellow-600">{metric.value}</p>
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
              <div className="w-20 h-1 bg-yellow-600 mx-auto my-3 rounded-sm"></div>
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
                Are Your Promotions Missing the Mark?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common promotion challenges we solve for Blinkit sellers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {painPoints.map((point, index) => (
                <Card key={index} className="border-2 hover:border-yellow-200 transition-colors">
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
                <h3 className="text-3xl font-bold text-gray-900">Launch High-Impact Campaigns</h3>
                <p className="text-gray-600 text-lg">
                  Let our experts create promotions that convert and deliver real ROI.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free promotion strategy worth ₹4,000</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Location-specific targeting</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Performance tracking dashboard</span>
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
                End-to-end campaign management for your Blinkit growth
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

        <section className="py-16 bg-yellow-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Campaign Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A data-driven approach to promotional success
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    {step.icon}
                  </div>
                  <div className="bg-yellow-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3">
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
              <p className="text-gray-600">Explore more Blinkit growth services</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/growth/blinkit-account-management/express-listing">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Express Listing</h3>
                    <p className="text-sm text-gray-600">Quick product onboarding</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/blinkit-account-management/inventory-forecasting">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Warehouse className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Inventory Forecasting</h3>
                    <p className="text-sm text-gray-600">Dark store optimization</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/blinkit-account-management/sla-monitoring">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-6 h-6 text-green-600" />
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

        <section className="py-16 bg-gradient-to-r from-yellow-600 to-amber-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Boost Your Blinkit Sales?
            </h2>
            <p className="text-yellow-100 mb-8 max-w-2xl mx-auto">
              Get a free promotion strategy and see 3x ROI on your campaigns
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-yellow-600 hover:bg-yellow-50">
                  Get Free Promotion Strategy
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Hyperlocal Promotion Strategy</DialogTitle>
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
