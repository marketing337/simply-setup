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
  ShoppingCart,
  TrendingUp, 
  ArrowRight,
  Package,
  FileText,
  Target,
  BarChart3,
  Search,
  Edit3,
  List,
  Tag,
  Eye,
  Star,
  Image,
  IndianRupee
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

export default function FlipkartProductListingPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Eye className="w-6 h-6 text-red-500" />,
      problem: "Poor Search Visibility",
      solution: "Keyword-optimized titles and descriptions for higher search rankings on Flipkart"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-red-500" />,
      problem: "Low Conversion Rates",
      solution: "Compelling product content that converts browsers into buyers"
    },
    {
      icon: <Image className="w-6 h-6 text-red-500" />,
      problem: "Image Rejections",
      solution: "Flipkart-compliant images meeting all size and quality guidelines"
    },
    {
      icon: <IndianRupee className="w-6 h-6 text-red-500" />,
      problem: "Pricing Strategy Issues",
      solution: "Competitive pricing analysis with margin optimization"
    }
  ];

  const services = [
    {
      icon: <Search className="w-8 h-8 text-blue-600" />,
      title: "Keyword Research",
      description: "In-depth analysis of high-volume Flipkart keywords",
      features: ["Category-specific keywords", "Long-tail discovery", "Competitor analysis"]
    },
    {
      icon: <Edit3 className="w-8 h-8 text-indigo-600" />,
      title: "Title Optimization",
      description: "SEO-optimized titles that drive clicks and sales",
      features: ["Keyword-rich titles", "Brand name placement", "Character limit optimization"]
    },
    {
      icon: <List className="w-8 h-8 text-purple-600" />,
      title: "Bullet Points & Highlights",
      description: "Compelling key features that convert",
      features: ["Benefit-focused copy", "Scannable formatting", "USP highlighting"]
    },
    {
      icon: <Image className="w-8 h-8 text-green-600" />,
      title: "Image Optimization",
      description: "Flipkart-compliant product images",
      features: ["Size guidelines", "White background", "Lifestyle images"]
    },
    {
      icon: <Tag className="w-8 h-8 text-blue-700" />,
      title: "Category Mapping",
      description: "Optimal category and attribute selection",
      features: ["Best category selection", "All attributes filled", "Vertical-specific optimization"]
    },
    {
      icon: <IndianRupee className="w-8 h-8 text-pink-600" />,
      title: "Pricing Strategy",
      description: "Competitive pricing for maximum sales",
      features: ["Competitor price tracking", "Margin optimization", "Sale pricing strategy"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Catalog Audit",
      description: "Deep dive into your current listings and identify optimization opportunities",
      icon: <Search className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "Keyword Research",
      description: "Identify high-impact keywords Flipkart shoppers use to find your products",
      icon: <Target className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "Content Optimization",
      description: "Optimize titles, descriptions, bullets, and images for maximum visibility",
      icon: <Edit3 className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "Monitor & Improve",
      description: "Track performance and continuously optimize based on data",
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />
    }
  ];

  const successMetrics = [
    { value: "180%", label: "Avg. Visibility Increase", description: "In search results" },
    { value: "45%", label: "Higher Click Rate", description: "Than unoptimized listings" },
    { value: "3000+", label: "Listings Optimized", description: "Across categories" },
    { value: "48hrs", label: "Turnaround Time", description: "Per listing" }
  ];

  const faqs = [
    {
      question: "How long does it take to optimize a Flipkart product listing?",
      answer: "Typically, we complete a full listing optimization within 48-72 hours. This includes keyword research, title optimization, bullet points, description, images review, and pricing analysis."
    },
    {
      question: "Will my listing rank higher on Flipkart after optimization?",
      answer: "Yes, properly optimized listings typically see significant improvements in search visibility within 2-4 weeks. We use proven SEO techniques specific to Flipkart's search algorithm."
    },
    {
      question: "Do you help with Flipkart image guidelines compliance?",
      answer: "Absolutely! We ensure all product images meet Flipkart's strict guidelines including size requirements, white background, and quality standards to avoid rejections."
    },
    {
      question: "How do you research keywords for Flipkart?",
      answer: "We use Flipkart's search suggestions, category analysis, competitor research, and specialized tools to identify high-volume, relevant keywords for your products."
    },
    {
      question: "Can you optimize listings for multiple categories?",
      answer: "Yes, we optimize listings across all Flipkart categories including Electronics, Fashion, Home, Beauty, and more. Each category has specific requirements we address."
    },
    {
      question: "Do you help with pricing strategy on Flipkart?",
      answer: "Yes, our optimization includes competitive pricing analysis to help you price products optimally for both visibility in search results and maintaining healthy margins."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Flipkart Product Listing & Catalog Optimization Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Flipkart product listing optimization services including keyword research, title optimization, image compliance, and pricing strategy to boost visibility and sales.",
    "areaServed": "India",
    "serviceType": "E-commerce Listing Optimization"
  };

  return (
    <>
      <SEO
        title="Flipkart Product Listing & Catalog Optimization Services | Simply Setup"
        description="Expert Flipkart product listing optimization services. Improve search rankings with keyword-optimized titles, compliant images, and competitive pricing. Get a free listing audit!"
        canonicalUrl="https://simplysetup.in/growth/flipkart-account-management/product-listing"
      />

      <Navbar />

      <main className="min-h-screen">
        <div className="bg-gray-50 py-3 border-b">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600">
              <Link href="/growth" className="hover:text-blue-600">Growth</Link>
              <span className="mx-2">/</span>
              <Link href="/growth/flipkart-account-management" className="hover:text-blue-600">Flipkart Account Management</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Product Listing & Catalog Optimization</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                  <Package className="w-3 h-3 mr-1" /> Flipkart Listing Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Flipkart Product Listing &{" "}
                  <span className="text-blue-600">Catalog Optimization</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Transform your Flipkart catalog into a high-converting sales machine. Our SEO experts 
                  optimize every element to boost visibility, clicks, and conversions on India's largest marketplace.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700" data-testid="button-get-listing-audit">
                        Get Free Listing Audit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free Flipkart Listing Audit</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center">
                        <Package className="w-5 h-5 text-blue-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">3000+ Listings Optimized</p>
                    <p className="text-xs text-gray-500">Average 180% visibility increase</p>
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

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Is Your Flipkart Catalog Underperforming?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common listing problems we solve for Flipkart sellers every day
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

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">Get Your Flipkart Listings Optimized</h3>
                <p className="text-gray-600 text-lg">
                  Let our Flipkart listing experts boost your product visibility and sales.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free listing audit worth ₹2,000</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">48-hour turnaround time</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">100% satisfaction guarantee</span>
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
                Complete Catalog Optimization Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Every element of your Flipkart catalog optimized for maximum visibility and conversions
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

        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Optimization Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A proven 4-step approach to transforming your Flipkart catalog
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

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Services</h2>
              <p className="text-gray-600">Explore more Flipkart growth services</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/growth/flipkart-account-management/ads-promotions">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Flipkart Ads & Promotions</h3>
                    <p className="text-sm text-gray-600">Maximize ad ROI</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/flipkart-account-management/fulfillment">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">F-Assured / FBF</h3>
                    <p className="text-sm text-gray-600">Flipkart Fulfillment</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/growth/flipkart-account-management/performance-analytics">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Performance Analytics</h3>
                    <p className="text-sm text-gray-600">Seller score optimization</p>
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

        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Boost Your Flipkart Visibility?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Get a free catalog audit and discover how we can improve your Flipkart sales
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                  Get Free Listing Audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Free Flipkart Listing Audit</DialogTitle>
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
