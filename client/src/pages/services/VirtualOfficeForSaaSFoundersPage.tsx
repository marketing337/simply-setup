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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  CheckCircle, 
  Cloud, 
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
  Server,
  CreditCard,
  Code
} from "lucide-react";
import heroImage from "@assets/ChatGPT Image Jun 7, 2025, 01_48_00 PM_1749296051817.png";

export default function VirtualOfficeForSaaSFoundersPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Pain points that SaaS founders face
  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Global Credibility Requirements",
      solution: "Professional business address in major business districts to build international trust"
    },
    {
      icon: <CreditCard className="w-6 h-6 text-red-500" />,
      problem: "Payment Gateway Compliance",
      solution: "Registered address required for Razorpay, Stripe, and international payment processors"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      problem: "Data Compliance & Privacy Laws",
      solution: "Legal address for GDPR compliance and data localization requirements"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Investor Due Diligence",
      solution: "Professional infrastructure that passes VC and angel investor scrutiny"
    }
  ];

  // Key benefits for SaaS founders
  const keyBenefits = [
    {
      icon: <Cloud className="w-8 h-8 text-blue-600" />,
      title: "Global SaaS Infrastructure",
      description: "Build a world-class SaaS business with professional infrastructure that scales globally",
      features: ["International payment gateway support", "Global customer trust building", "Multi-currency business setup"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Compliance & Security",
      description: "Meet international compliance standards for data protection and financial regulations",
      features: ["GDPR compliance support", "SOC 2 readiness assistance", "Financial audit preparation"]
    },
    {
      icon: <Server className="w-8 h-8 text-purple-600" />,
      title: "Enterprise Credibility",
      description: "Establish enterprise-grade credibility for B2B SaaS sales and partnerships",
      features: ["Enterprise client meetings", "Professional demo environments", "Corporate partnership support"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Rapid Scaling Support",
      description: "Scale your SaaS operations across multiple markets without physical expansion",
      features: ["Multi-region presence", "International team coordination", "Global customer support infrastructure"]
    }
  ];

  // How it works process
  const processSteps = [
    {
      step: "1",
      title: "Select Business Hub",
      description: "Choose from premium addresses in tech hubs like Bangalore, Pune, Mumbai for maximum SaaS credibility",
      icon: <MapPin className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "Complete SaaS Setup",
      description: "We handle GST registration, payment gateway documentation, and compliance paperwork",
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "Launch & Scale",
      description: "Start acquiring customers with professional infrastructure and global payment processing",
      icon: <CheckSquare className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "Enterprise Growth",
      description: "Scale to enterprise clients with meeting rooms, professional support, and compliance backing",
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />
    }
  ];

  // Success stories with measurable outcomes
  const successStories = [
    {
      company: "CloudAnalytics Pro",
      founder: "Arjun Patel",
      sector: "Business Intelligence SaaS",
      location: "Bangalore",
      achievement: "₹50L ARR within 18 months",
      timeline: "From MVP to enterprise clients",
      testimonial: "The professional address was crucial for enterprise sales. Having meeting rooms for client demos and proper compliance documentation helped us close deals with Fortune 500 companies.",
      metrics: ["₹50L ARR achieved", "25 enterprise clients", "95% customer retention"]
    },
    {
      company: "EduTech Solutions",
      founder: "Sneha Krishnan",
      sector: "EdTech SaaS Platform",
      location: "Pune",
      achievement: "International expansion to 15 countries",
      timeline: "Within 2 years of launch",
      testimonial: "Virtual office support was essential for international payment processing and GDPR compliance. We scaled globally without worrying about legal infrastructure.",
      metrics: ["15 countries served", "100K+ users", "$2M ARR achieved"]
    },
    {
      company: "FinanceFlow SaaS",
      founder: "Rajesh Kumar",
      sector: "Financial SaaS",
      location: "Mumbai",
      achievement: "RBI approval for financial services",
      timeline: "Within 8 months of setup",
      testimonial: "The Mumbai business district address was critical for RBI approvals. Professional infrastructure gave us credibility with banking partners and enterprise clients.",
      metrics: ["RBI approval secured", "500+ financial institutions served", "₹10Cr transaction volume"]
    }
  ];

  // FAQ section for SaaS founders
  const faqs = [
    {
      question: "Can I use the virtual office for international payment gateway registration?",
      answer: "Yes, our addresses are accepted by all major payment gateways including Stripe, Razorpay, PayPal, and international processors. We provide necessary documentation for KYC and compliance requirements."
    },
    {
      question: "Do you support GDPR compliance documentation?",
      answer: "We provide registered business address documentation required for GDPR compliance. For legal compliance advice, we recommend consulting with specialized data protection lawyers."
    },
    {
      question: "Can I host enterprise client demos at your locations?",
      answer: "Absolutely. Our premium meeting rooms are equipped with high-speed internet, presentation systems, and professional environment perfect for SaaS demos and enterprise client meetings."
    },
    {
      question: "How quickly can I get set up for SaaS operations?",
      answer: "Most SaaS founders are operational within 24-48 hours. We prioritize fast setup for payment processing, business registration, and compliance documentation."
    },
    {
      question: "Do you assist with SOC 2 compliance preparation?",
      answer: "We provide the physical infrastructure and documentation components required for SOC 2 audits. For complete SOC 2 compliance, you'll need additional security and process auditing."
    },
    {
      question: "Can I register multiple SaaS products under the same address?",
      answer: "Yes, you can register multiple SaaS products or business entities under the same virtual office. Each product can have separate documentation and compliance tracking."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Virtual Office for SaaS Founders | Professional Business Address | Payment Gateway Ready"
        description="Launch your SaaS business with professional virtual office solutions. Get payment gateway approvals, enterprise credibility, and global compliance support. 24-hour setup available."
        keywords="virtual office for SaaS, SaaS business address, payment gateway registration, enterprise credibility, SaaS compliance, professional business address, virtual office India"
        pageType="usecase"
        industry="saas-founders"
        canonicalUrl="/usecase/virtual-office-for-saas-founders"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content on Left */}
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                  <Cloud className="w-4 h-4 mr-1" />
                  For SaaS Founders
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Virtual Office for SaaS Founders
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Launch and scale your SaaS business with professional infrastructure. Get payment gateway approvals, enterprise credibility, and global compliance support - all without physical office overhead.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Launch Your SaaS Business
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
                    <span>24-hour setup</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Payment gateway ready</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Global compliance</span>
                  </div>
                </div>
              </div>

              {/* Image on Right */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={heroImage} 
                      alt="SaaS founders working with virtual office solutions"
                      className="w-full h-auto max-w-lg object-cover"
                      loading="eager"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-purple-100 rounded-full opacity-60"></div>
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
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                SaaS Business Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Focus on building great software while we handle the business infrastructure needed for global SaaS success.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {painPoints.map((point, index) => (
                <Card key={index} className="p-6 border-l-4 border-red-500 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">{point.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-red-600 mb-2">{point.problem}</h3>
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

        {/* Key Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Complete SaaS Infrastructure Package
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to launch, scale, and manage a successful SaaS business from day one.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {keyBenefits.map((benefit, index) => (
                <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="mb-6">{benefit.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{benefit.description}</p>
                    <div className="space-y-3">
                      {benefit.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
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
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                How to Launch Your SaaS Business
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get your SaaS business operational and compliant in just 4 simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                SaaS Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real founders who built successful SaaS businesses with our virtual office support.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-2 mb-4">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-600">{story.location}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{story.company}</h3>
                    <p className="text-gray-600 mb-2">by {story.founder}</p>
                    <Badge className="mb-4 bg-green-100 text-green-800">{story.sector}</Badge>
                    
                    <div className="mb-6">
                      <div className="text-lg font-bold text-blue-600 mb-1">{story.achievement}</div>
                      <div className="text-sm text-gray-500">{story.timeline}</div>
                    </div>

                    <blockquote className="text-gray-700 mb-6 italic">
                      "{story.testimonial}"
                    </blockquote>

                    <div className="space-y-2">
                      {story.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-gray-600">{metric}</span>
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
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about virtual offices for SaaS businesses.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Launch Your SaaS Business?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of successful SaaS founders who chose our virtual office solutions to build and scale their businesses.
            </p>
            
            <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  Get Started Today
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
        </section>
      </main>
      
      <Footer />
    </div>
  );
}