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
  CreditCard, 
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
  DollarSign,
  Lock,
  Smartphone
} from "lucide-react";
import heroImage from "@assets/ChatGPT Image Jun 7, 2025, 01_48_00 PM_1749296051817.png";

export default function VirtualOfficeForFinTechStartupPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "RBI Licensing & Compliance Requirements",
      solution: "Professional Mumbai financial district address for RBI approvals and banking partnerships"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      problem: "Banking Partnership Credibility",
      solution: "Premium business addresses that pass due diligence from major banks and financial institutions"
    },
    {
      icon: <CreditCard className="w-6 h-6 text-red-500" />,
      problem: "Payment Gateway & Compliance",
      solution: "Documentation support for payment processor approvals and financial service licensing"
    },
    {
      icon: <Lock className="w-6 h-6 text-red-500" />,
      problem: "Data Security & Audit Requirements",
      solution: "Professional infrastructure that meets financial audit and security compliance standards"
    }
  ];

  const keyBenefits = [
    {
      icon: <CreditCard className="w-8 h-8 text-blue-600" />,
      title: "FinTech Regulatory Support",
      description: "Navigate RBI regulations and financial service licensing with expert guidance and documentation",
      features: ["RBI license application support", "NBFC registration assistance", "Payment aggregator licensing"]
    },
    {
      icon: <Building className="w-8 h-8 text-green-600" />,
      title: "Financial District Presence",
      description: "Premium addresses in Mumbai's BKC, Delhi's Connaught Place, and Bangalore's financial hubs",
      features: ["Banking sector proximity", "Regulatory office accessibility", "Financial ecosystem connectivity"]
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "Banking & Partnership Credibility",
      description: "Build trust with banks, payment processors, and financial institutions through professional presence",
      features: ["Due diligence support", "Bank partnership facilitation", "Investor meeting infrastructure"]
    },
    {
      icon: <Smartphone className="w-8 h-8 text-orange-600" />,
      title: "Scalable FinTech Operations",
      description: "Infrastructure that scales with your growing fintech business across India",
      features: ["Multi-city expansion support", "Compliance tracking", "Regulatory update assistance"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "FinTech Business Setup",
      description: "Choose premium financial district address and complete business registration with fintech-specific documentation",
      icon: <MapPin className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "Regulatory Compliance",
      description: "Get assistance with RBI guidelines, payment regulations, and financial service licensing requirements",
      icon: <Shield className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "Banking Partnerships",
      description: "Leverage professional infrastructure to establish relationships with banks and payment processors",
      icon: <Building className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "Scale & Compliance",
      description: "Expand operations while maintaining regulatory compliance and audit readiness",
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />
    }
  ];

  const successStories = [
    {
      company: "PayFlow India",
      founder: "Rajesh Sharma",
      sector: "Digital Payments",
      location: "Mumbai - BKC",
      achievement: "RBI Payment Aggregator License",
      timeline: "Secured license within 8 months",
      testimonial: "The BKC address was crucial for RBI licensing. Having a presence in Mumbai's financial district gave us credibility with banking partners and regulatory authorities.",
      metrics: ["RBI PA license secured", "₹100Cr transaction volume", "50+ merchant partnerships"]
    },
    {
      company: "LendTech Solutions",
      founder: "Priya Nair",
      sector: "Digital Lending",
      location: "Delhi - Connaught Place", 
      achievement: "₹25Cr funding from major VCs",
      timeline: "Series A completed in 12 months",
      testimonial: "The professional address and meeting facilities were essential for investor meetings. RBI compliance support helped us navigate complex lending regulations.",
      metrics: ["₹25Cr Series A raised", "10,000+ loans disbursed", "NBFC license obtained"]
    },
    {
      company: "WealthManage Pro",
      founder: "Arjun Patel",
      sector: "Wealth Management",
      location: "Bangalore - UB City",
      achievement: "₹500Cr AUM milestone",
      timeline: "Reached in 18 months of operations",
      testimonial: "The Bangalore financial hub presence attracted HNI clients. Professional infrastructure supported our compliance and audit requirements.",
      metrics: ["₹500Cr AUM achieved", "1000+ HNI clients", "SEBI IA registration completed"]
    }
  ];

  const faqs = [
    {
      question: "Do you assist with RBI licensing for payment services and NBFC registration?",
      answer: "We provide the registered office address and documentation support required for RBI licenses. For specialized regulatory advice, we connect you with experienced fintech lawyers and consultants."
    },
    {
      question: "Can the virtual office address be used for banking partnerships and due diligence?",
      answer: "Yes, our premium financial district addresses are accepted by all major banks and pass their due diligence requirements for partnerships and business relationships."
    },
    {
      question: "Do you support compliance with data localization and security requirements?",
      answer: "We provide physical infrastructure documentation required for compliance. For technical data security implementation, we recommend specialized cybersecurity consultants."
    },
    {
      question: "How quickly can a fintech startup become operational?",
      answer: "Most fintech startups are operational within 72 hours for basic setup. RBI licensing and specialized approvals may take additional time based on regulatory requirements."
    },
    {
      question: "Do you assist with payment gateway registration and processor approvals?",
      answer: "We provide business address documentation required for payment gateway applications. Our locations are pre-approved by major payment processors like Razorpay, Payu, and international gateways."
    },
    {
      question: "Can you support audit and compliance documentation requirements?",
      answer: "Yes, we maintain proper business address documentation and can assist with audit trail requirements. For specialized financial audits, we connect you with CA firms experienced in fintech."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Virtual Office for FinTech Startup | RBI Compliance | Banking Partnership Support"
        description="Launch your FinTech startup with professional virtual office in Mumbai BKC, Delhi CP. Get RBI licensing support, banking partnerships, and financial compliance assistance."
        keywords="virtual office for fintech, RBI compliance, payment gateway registration, NBFC registration, fintech business address, banking partnerships, financial district address"
        pageType="usecase"
        industry="fintech-startup"
        canonicalUrl="/usecase/virtual-office-for-fintech-startup"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                  <CreditCard className="w-4 h-4 mr-1" />
                  For FinTech Startups
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Virtual Office for FinTech Startups
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Launch your FinTech startup with professional addresses in Mumbai's BKC, Delhi's financial district. Get RBI compliance support, banking partnerships, and regulatory guidance for payment services, lending, and wealth management.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Launch Your FinTech
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
                    <span>RBI compliance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Banking partnerships</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Financial district presence</span>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={heroImage} 
                      alt="FinTech startup team working with professional virtual office"
                      className="w-full h-auto max-w-lg object-cover"
                      loading="eager"
                    />
                  </div>
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-green-100 rounded-full opacity-60"></div>
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
                FinTech Startup Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Navigate complex financial regulations and build credibility with professional infrastructure designed for fintech success.
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
                Complete FinTech Infrastructure Package
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything your fintech startup needs to build trust, ensure compliance, and scale successfully.
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

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Your FinTech Launch Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get your fintech startup operational and compliant in 4 structured steps.
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
                FinTech Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Successful fintech startups that built scalable businesses with our virtual office support.
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
                    <Badge className="mb-4 bg-blue-100 text-blue-800">{story.sector}</Badge>
                    
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
                Everything you need to know about virtual offices for fintech startups.
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
        <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Launch Your FinTech Startup?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join successful fintech companies that built their businesses with our professional infrastructure and regulatory support.
            </p>
            
            <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  Start Your FinTech Today
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