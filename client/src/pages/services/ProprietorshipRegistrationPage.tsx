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
  User, 
  Shield, 
  MapPin, 
  Phone, 
  Mail, 
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
  Briefcase,
  Calendar,
  Banknote,
  Scale,
  UserCheck
} from "lucide-react";

export default function ProprietorshipRegistrationPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Individual Business Identity Confusion",
      solution: "Separate business identity registration with professional business name and documentation"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Bank Account Opening Challenges",
      solution: "Complete documentation support for business bank account opening with proper business proof"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "GST Registration Requirements",
      solution: "Seamless GST registration support with proper business address and documentation"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      problem: "Business Credibility Issues",
      solution: "Professional business setup with proper licenses and regulatory compliance"
    }
  ];

  const keyBenefits = [
    {
      icon: <UserCheck className="w-8 h-8 text-blue-600" />,
      title: "Simple Business Structure",
      description: "Easiest form of business registration with minimal compliance and complete owner control",
      features: ["Full ownership control", "Simple decision making", "Direct profit retention", "Minimal regulatory requirements"]
    },
    {
      icon: <Zap className="w-8 h-8 text-green-600" />,
      title: "Quick Setup & Low Cost", 
      description: "Fastest business registration with minimal documentation and lowest setup costs",
      features: ["Instant business setup", "Low registration cost", "Minimal documentation", "Quick processing"]
    },
    {
      icon: <Scale className="w-8 h-8 text-purple-600" />,
      title: "Tax Benefits",
      description: "Tax advantages for small businesses with presumptive taxation scheme benefits",
      features: ["Presumptive taxation option", "Lower tax rates", "Simple tax filing", "Business expense deductions"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Business Growth Support",
      description: "Professional business setup enabling future expansion and conversion to other structures",
      features: ["Easy business expansion", "Future conversion options", "Professional credibility", "Market access"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Business Name Registration",
      description: "Reserve unique business name and complete business registration with local authorities",
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "License & Documentation",
      description: "Obtain required business licenses, trade licenses, and prepare all necessary documentation",
      icon: <Shield className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "GST & PAN Registration",
      description: "Register for GST (if applicable) and ensure proper PAN registration for business operations",
      icon: <Building className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "Bank Account & Operations",
      description: "Open business bank account and set up complete business infrastructure for operations",
      icon: <Award className="w-6 h-6 text-blue-600" />
    }
  ];

  const businessTypes = [
    {
      type: "Retail Trading Business",
      timeline: "3-5 working days",
      requirements: "Trade license, shop establishment license",
      benefits: ["Simple setup", "Low compliance", "Direct customer sales", "Flexible operations"],
      idealFor: "Retail shops, trading businesses, small stores",
      pricing: "₹2,999 + Govt fees"
    },
    {
      type: "Professional Services",
      timeline: "5-7 working days", 
      requirements: "Professional registration, service tax registration",
      benefits: ["Professional credibility", "Service tax benefits", "Client trust", "Easy scaling"],
      idealFor: "Consultants, freelancers, service providers",
      pricing: "₹3,999 + Govt fees"
    },
    {
      type: "Manufacturing Business",
      timeline: "7-10 working days",
      requirements: "Factory license, pollution clearance, labor license",
      benefits: ["Production control", "Direct sales", "Custom manufacturing", "Quality control"],
      idealFor: "Small manufacturers, artisans, cottage industries",
      pricing: "₹4,999 + Govt fees"
    }
  ];

  const faqs = [
    {
      question: "What is the difference between Proprietorship and Company registration?",
      answer: "Proprietorship is the simplest business structure where the business and owner are the same legal entity, with unlimited liability and complete owner control. Company registration creates a separate legal entity with limited liability protection but requires more compliance and formalities. Proprietorship has lower setup costs and simpler operations but limited growth potential compared to companies."
    },
    {
      question: "Do I need to register Proprietorship business with ROC?",
      answer: "No, Proprietorship businesses are not required to register with Registrar of Companies (ROC). However, they need to obtain relevant licenses like trade license, shop establishment license, GST registration (if turnover exceeds threshold), and professional tax registration. The business operates under the owner's PAN and individual identity."
    },
    {
      question: "What licenses are required for Proprietorship business?",
      answer: "Common licenses include: Trade License from local municipal corporation, Shop and Establishment License, GST registration (if annual turnover exceeds ₹20/40 lakhs), Professional Tax registration, FSSAI license (for food businesses), and specific industry licenses. Requirements vary based on business type and location."
    },
    {
      question: "Can I convert Proprietorship to Private Limited Company later?",
      answer: "Yes, Proprietorship can be converted to Private Limited Company, but it's not a direct conversion process. You need to incorporate a new company, transfer assets and liabilities, obtain necessary approvals, and follow legal procedures. It's essentially closing the proprietorship and starting a company with transferred business."
    },
    {
      question: "What are the tax implications for Proprietorship business?",
      answer: "Proprietorship business income is treated as individual income and taxed as per personal income tax slabs. Benefits include: presumptive taxation scheme for businesses with turnover up to ₹2 crores (8% of turnover as deemed profit), business expense deductions, depreciation benefits, and simpler tax filing requirements."
    },
    {
      question: "Can I open business bank account for Proprietorship?",
      answer: "Yes, you can open a business bank account in the business name (e.g., 'John Doe trading as ABC Enterprises'). Required documents include: business registration certificate, trade license, PAN card, identity proof, address proof, and bank account opening forms. Business bank account helps separate personal and business finances."
    }
  ];

  const testimonials = [
    {
      name: "Ramesh Kumar",
      company: "Kumar Electronics",
      location: "Jaipur",
      rating: 5,
      text: "Perfect for my retail electronics business. Simple registration process and got all licenses including GST registration. Great support for small business owners.",
      avatar: "RK"
    },
    {
      name: "Sunita Agarwal",
      company: "Creative Design Studio", 
      location: "Pune",
      rating: 5,
      text: "Excellent service for my design consultancy. They handled all professional licenses and GST registration efficiently. Ideal structure for service businesses.",
      avatar: "SA"
    },
    {
      name: "Mohan Lal",
      company: "Handicraft Manufacturing",
      location: "Udaipur",
      rating: 5,
      text: "Great support for my handicraft manufacturing unit. They arranged all manufacturing licenses and helped with business bank account opening. Highly recommended.",
      avatar: "ML"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Proprietorship Registration in India | Sole Proprietorship Business Registration | SimplySetup"
        description="Register your Proprietorship business in India with complete license support. Simple business registration for retail, services, and manufacturing businesses."
        canonicalUrl="/services/proprietorship-registration"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-green-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
                  <User className="w-4 h-4 mr-1" />
                  Proprietorship Registration
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Proprietorship Registration in India
                </h1>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  Start your business with the simplest structure. Complete proprietorship registration 
                  with trade licenses, GST setup, and professional business documentation.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="px-8 py-3">
                        Register Your Business
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Get Proprietorship Registration Quote</DialogTitle>
                      </DialogHeader>
                      <ContactForm />
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline" size="lg" className="px-8 py-3">
                    <Calculator className="mr-2 h-5 w-5" />
                    Check Pricing
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">3-5</div>
                    <div className="text-sm text-gray-600">Days Setup</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">100K+</div>
                    <div className="text-sm text-gray-600">Businesses Registered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">₹2,999</div>
                    <div className="text-sm text-gray-600">Starting Price</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200">
                  <div className="text-center mb-6">
                    <UserCheck className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900">Proprietorship Benefits</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Complete owner control</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Minimal compliance requirements</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Quick setup and low cost</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Direct profit retention</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Presumptive taxation benefits</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Easy decision making</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Proprietorship Registration Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get professional support for seamless business setup and compliance management.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {painPoints.map((point, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {point.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2 text-lg">{point.problem}</h3>
                        <div className="flex items-center space-x-2 text-green-700">
                          <CheckCircle className="w-5 h-5 flex-shrink-0" />
                          <p className="text-sm">{point.solution}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Business Types Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Choose Your Business Type
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Select the right proprietorship setup based on your business nature and requirements.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {businessTypes.map((type, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow relative">
                  <CardHeader className="p-0 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-green-100 text-green-800">{type.timeline}</Badge>
                      <div className="text-2xl font-bold text-green-600">{type.pricing}</div>
                    </div>
                    <CardTitle className="text-xl text-gray-900 mb-2">{type.type}</CardTitle>
                    <p className="text-gray-600 text-sm">{type.requirements}</p>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Benefits:</h4>
                      <div className="space-y-2">
                        {type.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-sm text-gray-600"><strong>Ideal for:</strong> {type.idealFor}</p>
                    </div>

                    <Button className="w-full">
                      Register {type.type}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
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
                Why Choose Our Proprietorship Registration Service
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complete business setup with professional support and compliance management.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {keyBenefits.map((benefit, index) => (
                <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          {benefit.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">{benefit.description}</p>
                        <div className="space-y-2">
                          {benefit.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
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
                Proprietorship Registration Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process to get your proprietorship business registered and operational.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="p-6 text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      {step.icon}
                    </div>
                    <div className="bg-green-600 text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                What Our Business Owners Say
              </h2>
              <p className="text-xl text-gray-600">
                Trusted by thousands of small business owners and entrepreneurs across India.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.company}</p>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{testimonial.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed italic">
                      "{testimonial.text}"
                    </p>
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
                Get answers to common proprietorship registration questions.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Start Your Business?
            </h2>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Get started with simple proprietorship registration and establish your business with complete legal setup.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
                    Start Business Registration
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Get Proprietorship Registration Quote</DialogTitle>
                  </DialogHeader>
                  <ContactForm />
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3">
                <Phone className="mr-2 h-5 w-5" />
                Call Expert: +91-8447746183
              </Button>
            </div>

            <SalesPersonCards locationId={currentLocation?.id || 1} />
          </div>
        </section>
      </main>
      
      <Footer location={currentLocation} />
    </div>
  );
}