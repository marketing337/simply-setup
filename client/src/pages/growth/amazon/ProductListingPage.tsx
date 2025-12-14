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
  Shield, 
  Users, 
  Zap, 
  TrendingUp, 
  ArrowRight,
  Package,
  FileText,
  Clock,
  Target,
  BarChart3,
  Search,
  Edit3,
  List,
  Tag,
  Eye,
  Star
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

export default function ProductListingPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Eye className="w-6 h-6 text-red-500" />,
      problem: "Poor Product Visibility",
      solution: "Keyword-optimized titles and bullet points for higher search rankings"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-red-500" />,
      problem: "Low Conversion Rates",
      solution: "Compelling product descriptions that convert browsers into buyers"
    },
    {
      icon: <Search className="w-6 h-6 text-red-500" />,
      problem: "Missing Keywords",
      solution: "Comprehensive keyword research covering all search terms customers use"
    },
    {
      icon: <List className="w-6 h-6 text-red-500" />,
      problem: "Unoptimized Backend",
      solution: "Hidden search terms optimization to capture additional traffic"
    }
  ];

  const services = [
    {
      icon: <Search className="w-8 h-8 text-orange-600" />,
      title: "Keyword Research",
      description: "In-depth analysis of high-volume, relevant keywords",
      features: ["Competitor keyword analysis", "Long-tail keyword discovery", "Search volume prioritization"]
    },
    {
      icon: <Edit3 className="w-8 h-8 text-blue-600" />,
      title: "Title Optimization",
      description: "SEO-optimized titles that drive clicks and sales",
      features: ["Keyword-rich titles", "Brand name placement", "Character limit optimization"]
    },
    {
      icon: <List className="w-8 h-8 text-purple-600" />,
      title: "Bullet Point Writing",
      description: "Compelling feature bullets that convert",
      features: ["Benefit-focused copy", "Scannable formatting", "Key features highlighted"]
    },
    {
      icon: <FileText className="w-8 h-8 text-green-600" />,
      title: "Product Description",
      description: "Engaging descriptions that tell your brand story",
      features: ["SEO-optimized content", "Brand voice consistency", "HTML formatting"]
    },
    {
      icon: <Tag className="w-8 h-8 text-indigo-600" />,
      title: "Backend Keywords",
      description: "Hidden search term optimization",
      features: ["Search term fields", "Alternative spellings", "Related keywords"]
    },
    {
      icon: <Star className="w-8 h-8 text-pink-600" />,
      title: "Category & Attributes",
      description: "Proper categorization for maximum visibility",
      features: ["Best category selection", "All attributes filled", "Browse node optimization"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Product Analysis",
      description: "Deep dive into your product, competition, and target audience",
      icon: <Search className="w-6 h-6 text-orange-600" />
    },
    {
      step: "2", 
      title: "Keyword Research",
      description: "Identify high-impact keywords customers use to find products like yours",
      icon: <Target className="w-6 h-6 text-orange-600" />
    },
    {
      step: "3",
      title: "Content Creation",
      description: "Write compelling titles, bullets, and descriptions that convert",
      icon: <Edit3 className="w-6 h-6 text-orange-600" />
    },
    {
      step: "4",
      title: "Optimization & Testing",
      description: "Continuous monitoring and A/B testing for best performance",
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />
    }
  ];

  const successMetrics = [
    { value: "150%", label: "Avg. Visibility Increase", description: "In search results" },
    { value: "40%", label: "Higher Click Rate", description: "Than unoptimized listings" },
    { value: "2000+", label: "Listings Optimized", description: "Across categories" },
    { value: "48hrs", label: "Turnaround Time", description: "Per listing" }
  ];

  const faqs = [
    {
      question: "How long does it take to optimize a product listing?",
      answer: "Typically, we complete a full listing optimization within 48-72 hours. This includes keyword research, title optimization, bullet points, description, and backend keywords."
    },
    {
      question: "Will my listing rank higher after optimization?",
      answer: "Yes, properly optimized listings typically see significant improvements in search visibility within 2-4 weeks. We use proven SEO techniques specific to Amazon's A9 algorithm."
    },
    {
      question: "Do you optimize existing listings or create new ones?",
      answer: "We do both! Whether you have existing listings that need improvement or need new product listings created from scratch, our team can help."
    },
    {
      question: "How do you research keywords for my products?",
      answer: "We use multiple data sources including Amazon's own search suggestions, competitor analysis, and specialized tools to identify high-volume, relevant keywords for your specific products."
    },
    {
      question: "Can you optimize listings for multiple Amazon marketplaces?",
      answer: "Yes, we optimize listings for Amazon India, USA, UK, UAE, and other marketplaces. Each marketplace requires localized keyword research and content adaptation."
    },
    {
      question: "Do you provide images as part of listing optimization?",
      answer: "Our listing optimization service focuses on text content. For image optimization and A+ Content with enhanced visuals, check our A+ Listing service."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Amazon Product Listing & Optimization Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional Amazon product listing optimization services including keyword research, title optimization, bullet points, and backend keywords to boost visibility and sales.",
    "areaServed": "India",
    "serviceType": "E-commerce Listing Optimization"
  };

  return (
    <>
      <SEO
        title="Amazon Product Listing & Optimization Services | Boost Visibility | Simply Setup"
        description="Expert Amazon product listing optimization services. Improve search rankings with keyword-optimized titles, compelling bullet points, and backend keywords. Get a free listing audit!"
        canonicalUrl="https://simplysetup.in/growth/amazon-account-management/product-listing"
      />

      <Navbar />

      <main className="min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-3 border-b">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600">
              <Link href="/growth" className="hover:text-orange-600">Growth</Link>
              <span className="mx-2">/</span>
              <Link href="/growth/amazon-account-management" className="hover:text-orange-600">Amazon Account Management</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Product Listing & Optimization</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-orange-50 via-white to-yellow-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  <Package className="w-3 h-3 mr-1" /> Amazon Listing Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Amazon Product Listing &{" "}
                  <span className="text-orange-600">Optimization</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Transform your product listings into high-converting sales machines. Our SEO experts 
                  optimize every element to boost visibility, clicks, and conversions on Amazon.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-orange-600 hover:bg-orange-700" data-testid="button-get-listing-audit">
                        Get Free Listing Audit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free Listing Audit</DialogTitle>
                      </DialogHeader>
                      <ZohoFormEmbed />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center">
                        <Package className="w-5 h-5 text-orange-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">2000+ Listings Optimized</p>
                    <p className="text-xs text-gray-500">Average 150% visibility increase</p>
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

        {/* Trusted Clients Section */}
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

        {/* Pain Points Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Is Your Product Listing Underperforming?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common listing problems we solve for Amazon sellers every day
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

        {/* Form Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">Get Your Listings Optimized</h3>
                <p className="text-gray-600 text-lg">
                  Let our Amazon listing experts boost your product visibility and sales.
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

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Complete Listing Optimization Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Every element of your product listing optimized for maximum visibility and conversions
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
        <section className="py-16 bg-orange-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Optimization Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A proven 4-step approach to transforming your product listings
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

        {/* Related Services */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Services</h2>
              <p className="text-gray-600">Explore more Amazon growth services</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
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
        <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Boost Your Product Visibility?
            </h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Get a free listing audit and discover how we can improve your Amazon sales
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50">
                  Get Free Listing Audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Free Listing Audit</DialogTitle>
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
