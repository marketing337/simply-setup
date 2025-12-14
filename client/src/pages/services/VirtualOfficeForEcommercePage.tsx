import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocation } from "@/hooks/useLocation";
import SEO from "@/components/SEO";
import ContactForm from "@/components/ContactForm";
import SalesPersonCards from "@/components/SalesPersonCards";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CheckCircle,
  ShoppingCart,
  Shield,
  MapPin,
  Phone,
  Mail,
  Users,
  Building,
  Globe,
  Zap,
  TrendingUp,
  Star,
  ArrowRight,
  Calculator,
  FileText,
  Clock,
  Award,
  Target,
  CheckSquare,
  MessageCircle,
  Package,
  Truck,
  IndianRupee,
} from "lucide-react";
import heroImage from "@assets/ChatGPT Image Jun 7, 2025, 01_48_00 PM_1749296051817.png";

export default function VirtualOfficeForEcommercePage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Pain points that e-commerce businesses face
  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Marketplace Compliance Requirements",
      solution:
        "Registered business address for Amazon, Flipkart, and other marketplace approvals",
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "GST Registration Complexity",
      solution:
        "Complete GST registration and e-commerce tax compliance support",
    },
    {
      icon: <Truck className="w-6 h-6 text-red-500" />,
      problem: "APOB Registration",
      solution: "Get APOB for 100+ Warehouses",
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Customer Trust Issues",
      solution:
        "Verified business address and professional customer support infrastructure",
    },
  ];

  // Key benefits for e-commerce businesses
  const keyBenefits = [
    {
      icon: <ShoppingCart className="w-8 h-8 text-orange-600" />,
      title: "Marketplace Approval & Compliance",
      description:
        "Get approved on all major marketplaces with verified business address and proper documentation",
      features: [
        "Amazon seller approval",
        "Flipkart registration",
        "Meesho marketplace access",
        "Government e-marketplace (GeM) registration",
      ],
    },
    {
      icon: <Package className="w-8 h-8 text-blue-600" />,
      title: "Professional Return Management",
      description:
        "Handle product returns efficiently with dedicated return address and processing services",
      features: [
        "Dedicated return address",
        "Return product inspection",
        "Refurbishment services",
        "Return analytics dashboard",
      ],
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "E-commerce Tax Compliance",
      description:
        "Stay compliant with complex e-commerce tax regulations and marketplace requirements",
      features: [
        "E-commerce GST filing",
        "TCS compliance",
        "Marketplace tax reporting",
        "Input tax credit optimization",
      ],
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: "Multi-Channel Operations",
      description:
        "Scale across multiple sales channels with unified business infrastructure",
      features: [
        "Multi-marketplace management",
        "Website order fulfillment",
        "Social commerce integration",
        "Export documentation",
      ],
    },
  ];

  // How it works process for e-commerce
  const processSteps = [
    {
      step: "1",
      title: "Business Registration & GST",
      description:
        "Complete e-commerce business registration with GST and all necessary marketplace documentation",
      icon: <FileText className="w-6 h-6 text-orange-600" />,
    },
    {
      step: "2",
      title: "Marketplace Approvals",
      description:
        "Get approved on Amazon, Flipkart, and other major marketplaces using verified business address",
      icon: <CheckSquare className="w-6 h-6 text-orange-600" />,
    },
    {
      step: "3",
      title: "Start Selling & Operations",
      description:
        "Begin selling across multiple channels with professional return address and customer support",
      icon: <ShoppingCart className="w-6 h-6 text-orange-600" />,
    },
    {
      step: "4",
      title: "Scale & Expand",
      description:
        "Grow to new marketplaces, international sales, and multi-channel operations with full support",
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />,
    },
  ];

  // Supported marketplaces
  const marketplaces = [
    { name: "Amazon", description: "India's largest marketplace", logo: "🛒" },
    {
      name: "Flipkart",
      description: "Leading e-commerce platform",
      logo: "🛍️",
    },
    { name: "Meesho", description: "Social commerce leader", logo: "📱" },
    { name: "Myntra", description: "Fashion marketplace", logo: "👗" },
    { name: "Snapdeal", description: "Value e-commerce", logo: "💰" },
    { name: "JioMart", description: "Retail marketplace", logo: "🏪" },
  ];

  // Success stories with measurable outcomes
  const successStories = [
    {
      business: "StyleCraft Fashion",
      founder: "Anita Desai",
      category: "Fashion & Apparel",
      location: "Mumbai",
      achievement: "₹2.5 Cr annual GMV across 5 marketplaces",
      timeline: "Within 14 months",
      testimonial:
        "The professional business setup helped us get approved on all major fashion marketplaces. Having a proper return address was crucial for customer trust and marketplace compliance.",
      metrics: [
        "₹2.5Cr annual GMV",
        "5 marketplace presence",
        "15,000+ orders/month",
      ],
    },
    {
      business: "TechGadgets Pro",
      founder: "Rajesh Kumar",
      category: "Electronics",
      location: "Delhi",
      achievement: "Expanded to international markets",
      timeline: "Within 10 months",
      testimonial:
        "Professional business infrastructure helped us scale from local to international sales. The export documentation support was invaluable for expanding to Southeast Asia.",
      metrics: [
        "International expansion",
        "₹1.8Cr annual revenue",
        "8 countries served",
      ],
    },
    {
      business: "Organic Wellness",
      founder: "Dr. Priya Sharma",
      category: "Health & Wellness",
      location: "Bangalore",
      achievement: "Built subscription business with 5000+ customers",
      timeline: "Within 8 months",
      testimonial:
        "The professional setup helped us build customer trust in the wellness space. Having verified business address was essential for health product approvals and customer confidence.",
      metrics: [
        "5,000+ subscribers",
        "₹95L annual revenue",
        "40% repeat customers",
      ],
    },
  ];

  // FAQ section for e-commerce
  const faqs = [
    {
      question: "How does virtual office help with marketplace approvals?",
      answer:
        "Major marketplaces like Amazon and Flipkart require verified business addresses for seller approval. Our virtual office addresses are verified and accepted by all major e-commerce platforms. We provide all necessary documentation including address proof and business registration certificates.",
    },
    {
      question: "Can you handle product returns for my e-commerce business?",
      answer:
        "Yes, we provide dedicated return address services. Customers can return products to our address, and we handle initial inspection, sorting, and notification. You can collect or have items forwarded based on your preference. This is essential for marketplace compliance.",
    },
    {
      question: "What e-commerce tax compliance support do you provide?",
      answer:
        "We help with GST registration for e-commerce, TCS (Tax Collected at Source) compliance, marketplace tax reporting, and input tax credit optimization. Our team understands complex e-commerce tax regulations and ensures full compliance.",
    },
    {
      question: "How do you support international e-commerce expansion?",
      answer:
        "We provide export documentation, international shipping address verification, and compliance support for international sales. Our business addresses are accepted for export licenses and international payment gateway approvals.",
    },
    {
      question: "Can I use the address for multiple e-commerce businesses?",
      answer:
        "Yes, you can register multiple e-commerce brands under the same address. Each brand can have separate documentation while sharing the infrastructure. Additional charges may apply for multiple business registrations.",
    },
    {
      question: "What customer support infrastructure do you provide?",
      answer:
        "We offer professional phone answering, mail handling, and customer inquiry management. This helps build customer trust and meets marketplace requirements for professional customer support infrastructure.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        pageType="usecase"
        industry="ecommerce"
        canonicalUrl="/usecase/virtual-office-for-ecommerce"
      />

      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content on Left */}
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200">
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  For E-commerce
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Get Virtual Office for E-commerce
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Get marketplace approvals, GST registration, APOB Registration, and complete e-commerce compliance support. Start selling on Amazon, Flipkart, and other major platforms immediately.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Start Selling Online
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader className="sr-only">
                        <DialogTitle>Contact Form</DialogTitle>
                      </DialogHeader>
                      <ContactForm />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Marketplace approvals</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>APOB Registration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Tax compliance</span>
                  </div>
                </div>
              </div>

              {/* Image on Right */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={heroImage} 
                      alt="E-commerce business using virtual office solutions"
                      className="w-full h-auto max-w-lg object-cover"
                      loading="eager"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-orange-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-red-100 rounded-full opacity-60"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sales Person Card */}
<section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {currentLocation && (
              <SalesPersonCards locationId={currentLocation.id} />
            )}
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Common E-commerce Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Don't let compliance and infrastructure issues prevent you from
                scaling your online business across multiple platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {painPoints.map((point, index) => (
                <Card
                  key={index}
                  className="p-6 border-l-4 border-red-500 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">{point.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-red-600 mb-2">
                          {point.problem}
                        </h3>
                        <div className="flex items-center space-x-2 text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          <p className="font-medium">{point.solution}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Marketplace Support Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Supported E-commerce Platforms
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get approved and start selling on all major Indian e-commerce
                marketplaces with verified business infrastructure.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
              {marketplaces.map((marketplace, index) => (
                <Card
                  key={index}
                  className="text-center p-4 border-0 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className="text-4xl mb-3">{marketplace.logo}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {marketplace.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {marketplace.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Complete E-commerce Business Solution
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to launch, operate, and scale your
                e-commerce business across multiple channels.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {keyBenefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className="mb-6">{benefit.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {benefit.description}
                    </p>
                    <div className="space-y-3">
                      {benefit.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center space-x-3"
                        >
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                How to Launch Your E-commerce Business
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process to get your e-commerce business approved
                on all major marketplaces and start selling.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <Card
                  key={index}
                  className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-orange-600">
                          {step.step}
                        </span>
                      </div>
                      <div className="flex justify-center mb-4">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Real Success Stories from E-commerce Businesses
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how our virtual office services helped e-commerce businesses
                achieve marketplace success and scale operations.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card
                  key={index}
                  className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {story.business}
                        </h3>
                        <Award className="w-6 h-6 text-yellow-500" />
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Founded by {story.founder} • {story.category}
                      </div>
                      <div className="text-sm text-orange-600 mb-1">
                        📍 {story.location}
                      </div>
                      <div className="text-sm font-semibold text-green-600 mb-1">
                        {story.achievement}
                      </div>
                      <div className="text-sm text-blue-600">
                        {story.timeline}
                      </div>
                    </div>
                    <blockquote className="text-gray-700 italic leading-relaxed mb-4">
                      "{story.testimonial}"
                    </blockquote>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">
                        Key Metrics:
                      </h4>
                      {story.metrics.map((metric, metricIndex) => (
                        <div
                          key={metricIndex}
                          className="flex items-center space-x-2"
                        >
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-700">
                            {metric}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about virtual office services
                for e-commerce businesses.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Launch Your E-commerce Business?
            </h2>
            <p className="text-xl mb-8 text-orange-100">
              Join 800+ successful e-commerce businesses that chose our virtual
              office services. Get marketplace approvals and start selling
              across multiple platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Dialog
                open={isContactFormOpen}
                onOpenChange={setIsContactFormOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3"
                  >
                    Start Selling Today
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader className="sr-only">

                    <DialogTitle>Contact Form</DialogTitle>

                  </DialogHeader>
                  <ContactForm />
                </DialogContent>
              </Dialog>

            </div>
            <div className="text-sm text-orange-200">
              ✅ Marketplace approvals ✅ Return management ✅ Tax compliance
            </div>
          </div>
        </section>
      </main>

      <Footer location={currentLocation} />
    </div>
  );
}
