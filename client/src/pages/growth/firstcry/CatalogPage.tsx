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
  Search,
  Edit3,
  List,
  Tag,
  Eye,
  Star,
  Baby,
  Image,
  Layers,
  Grid3X3
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

export default function CatalogPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Eye className="w-6 h-6 text-red-500" />,
      problem: "Low Product Visibility",
      solution: "Parent-focused keyword optimization for higher search rankings"
    },
    {
      icon: <Grid3X3 className="w-6 h-6 text-red-500" />,
      problem: "Wrong Age Categorization",
      solution: "Precise age-group mapping for accurate product discovery"
    },
    {
      icon: <Image className="w-6 h-6 text-red-500" />,
      problem: "Poor Product Images",
      solution: "Professional baby product photography guidelines"
    },
    {
      icon: <List className="w-6 h-6 text-red-500" />,
      problem: "Incomplete Listings",
      solution: "Full attribute coverage for all nursery product categories"
    }
  ];

  const services = [
    {
      icon: <Search className="w-8 h-8 text-orange-600" />,
      title: "Parent Keyword Research",
      description: "Keywords parents use when shopping for baby products",
      features: ["Mom search patterns", "Safety-focused terms", "Brand + generic mix"]
    },
    {
      icon: <Edit3 className="w-8 h-8 text-pink-600" />,
      title: "Product Titles",
      description: "Trust-building titles that resonate with parents",
      features: ["Age-appropriate labels", "Safety certifications", "Material highlights"]
    },
    {
      icon: <Layers className="w-8 h-8 text-purple-600" />,
      title: "Age-Group Categorization",
      description: "Accurate age mapping for product discovery",
      features: ["Newborn 0-3 months", "Infant 3-12 months", "Toddler 1-3 years"]
    },
    {
      icon: <FileText className="w-8 h-8 text-green-600" />,
      title: "Product Descriptions",
      description: "Detailed descriptions parents trust",
      features: ["Safety features", "Usage instructions", "Care guidelines"]
    },
    {
      icon: <Image className="w-8 h-8 text-blue-600" />,
      title: "Image Guidelines",
      description: "Photography standards for baby products",
      features: ["Scale reference", "Usage context", "Safety feature close-ups"]
    },
    {
      icon: <Tag className="w-8 h-8 text-coral-600" />,
      title: "Attribute Optimization",
      description: "Complete product attribute filling",
      features: ["Material type", "Safety certifications", "Size/weight specs"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Category Analysis",
      description: "Analyze your nursery products and identify optimal categories",
      icon: <Grid3X3 className="w-6 h-6 text-orange-600" />
    },
    {
      step: "2", 
      title: "Content Creation",
      description: "Create parent-focused titles, descriptions, and bullet points",
      icon: <Edit3 className="w-6 h-6 text-orange-600" />
    },
    {
      step: "3",
      title: "Age Mapping",
      description: "Accurate age-group categorization for all products",
      icon: <Layers className="w-6 h-6 text-orange-600" />
    },
    {
      step: "4",
      title: "Listing Launch",
      description: "Submit optimized listings with complete attributes",
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />
    }
  ];

  const successMetrics = [
    { value: "180%", label: "Visibility Boost", description: "In parent searches" },
    { value: "45%", label: "Higher CTR", description: "Than basic listings" },
    { value: "3000+", label: "Products Listed", description: "On FirstCry" },
    { value: "24hrs", label: "Turnaround", description: "Per listing" }
  ];

  const faqs = [
    {
      question: "How is FirstCry catalog optimization different from Amazon?",
      answer: "FirstCry caters specifically to parents, so optimization focuses on age-appropriate keywords, safety certifications, and parenting-focused content. We emphasize trust signals like BIS certification, material safety, and age suitability that matter most to parents."
    },
    {
      question: "What are the age categories on FirstCry?",
      answer: "FirstCry uses specific age brackets: Newborn (0-3 months), Infant (3-6 months, 6-12 months), Toddler (1-2 years, 2-3 years), and Kids (3+ years). Proper categorization ensures your products appear in relevant filtered searches."
    },
    {
      question: "Do you help with product photography for FirstCry?",
      answer: "We provide detailed photography guidelines specific to baby products, including scale references with common objects, usage context shots, and close-ups of safety features. We can also connect you with baby product photographers."
    },
    {
      question: "How long does catalog optimization take?",
      answer: "We typically optimize 10-15 products per day with full keyword research, descriptions, and attribute filling. Large catalogs of 100+ products can be completed within 7-10 business days with our dedicated team."
    },
    {
      question: "Can you optimize existing FirstCry listings?",
      answer: "Absolutely! We audit your existing listings, identify optimization opportunities, and update content to improve visibility and conversions. Many sellers see significant improvements by optimizing their current catalog."
    },
    {
      question: "Do you handle bulk catalog uploads?",
      answer: "Yes, we specialize in bulk catalog management. We prepare category-specific templates, ensure data accuracy, and handle the complete upload process including error resolution for large product catalogs."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "FirstCry Nursery Catalog Optimization Services",
    "provider": {
      "@type": "Organization",
      "name": "Simply Setup",
      "url": "https://simplysetup.in"
    },
    "description": "Professional FirstCry product listing and catalog optimization services. Expert baby product descriptions, age-group categorization, and parent-focused keyword optimization.",
    "areaServed": "India",
    "serviceType": "E-commerce Catalog Optimization"
  };

  return (
    <>
      <SEO
        title="FirstCry Catalog Optimization | Baby Product Listings | Age-Group Categorization | Simply Setup"
        description="Expert FirstCry catalog optimization for baby products. Parent-focused keywords, accurate age categorization, and compelling product descriptions. Boost visibility 180%!"
        canonicalUrl="https://simplysetup.in/growth/firstcry-account-management/catalog"
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
              <span className="text-gray-900">Catalog Optimization</span>
            </nav>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-orange-50 via-white to-pink-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  <Baby className="w-3 h-3 mr-1" /> Nursery Catalog Expert
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Nursery Catalog{" "}
                  <span className="text-orange-600">Optimization</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Create product listings that parents trust and love. Our experts optimize every element 
                  from age-group categorization to safety-focused descriptions for maximum conversions.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-orange-600 hover:bg-orange-700" data-testid="button-catalog-audit">
                        Get Free Catalog Audit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Get Your Free Catalog Audit</DialogTitle>
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
                    <p className="text-sm font-semibold text-gray-900">3000+ Products Listed</p>
                    <p className="text-xs text-gray-500">Average 180% visibility increase</p>
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
                Are Your Product Listings Parent-Ready?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common listing challenges we solve for FirstCry sellers
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
                <h3 className="text-3xl font-bold text-gray-900">Get Your Catalog Optimized</h3>
                <p className="text-gray-600 text-lg">
                  Let our nursery catalog experts boost your product visibility and parent trust.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Free catalog audit worth ₹3,000</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">24-hour turnaround per listing</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Parent-focused optimization</span>
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
                Every element of your nursery product catalog optimized for parent trust and conversions
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
                Our Catalog Optimization Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A proven 4-step approach to parent-focused product listings
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
              <Link href="/growth/firstcry-account-management/inventory">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Inventory Planning</h3>
                    <p className="text-sm text-gray-600">Omni-channel sync</p>
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
              Ready to Boost Your Product Visibility?
            </h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Get a free catalog audit and discover how to improve your FirstCry sales
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50">
                  Get Free Catalog Audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Get Your Free Catalog Audit</DialogTitle>
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
