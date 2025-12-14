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
  Building, 
  Shield, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
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
  Scale
} from "lucide-react";

export default function CompanyRegistrationPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Complex MCA Registration Process",
      solution: "Complete end-to-end company registration with expert guidance through entire MCA filing process"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Multiple Document Requirements",
      solution: "Document preparation and verification service ensuring all paperwork is compliant and error-free"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Lengthy Registration Timeline",
      solution: "Fast-track registration completed within 10-15 working days with professional support"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      problem: "Regulatory Compliance Confusion",
      solution: "Complete compliance management including annual filings, board resolutions, and statutory requirements"
    }
  ];

  const keyBenefits = [
    {
      icon: <Building className="w-8 h-8 text-blue-600" />,
      title: "Complete ROC Registration",
      description: "End-to-end company registration with Ministry of Corporate Affairs filing and documentation",
      features: ["MCA portal filing", "Digital signature procurement", "Director identification number", "Certificate of incorporation"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Legal Entity Formation", 
      description: "Establish separate legal entity with limited liability protection for directors and shareholders",
      features: ["Limited liability protection", "Separate legal identity", "Perpetual succession", "Corporate benefits"]
    },
    {
      icon: <Scale className="w-8 h-8 text-purple-600" />,
      title: "Professional Credibility",
      description: "Build business credibility with registered company status and professional business infrastructure",
      features: ["Professional business address", "Corporate banking setup", "GST registration support", "Business credit building"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Business Growth Support",
      description: "Access business loans, venture capital, and government schemes available only to registered companies",
      features: ["Easy fund raising", "Government scheme access", "Business loan eligibility", "Investor credibility"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Name Reservation & Documentation",
      description: "Reserve unique company name with MCA and prepare all required documents including MOA, AOA, and director details",
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "Digital Signature & DIN",
      description: "Obtain digital signature certificates for directors and apply for Director Identification Numbers (DIN)",
      icon: <Shield className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "MCA Filing & Registration",
      description: "File incorporation documents with MCA including SPICe+ form and await approval from Registrar of Companies",
      icon: <Building className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "Certificate & Compliance Setup",
      description: "Receive certificate of incorporation and set up ongoing compliance calendar for annual filings",
      icon: <Award className="w-6 h-6 text-blue-600" />
    }
  ];

  const registrationTypes = [
    {
      type: "Private Limited Company",
      timeline: "10-15 working days",
      requirements: "Minimum 2 directors, 1 shareholder",
      benefits: ["Limited liability protection", "Separate legal entity", "Easy fund raising", "Perpetual succession"],
      idealFor: "Startups, SMEs, businesses seeking investment",
      pricing: "₹8,999 + Govt fees"
    },
    {
      type: "One Person Company (OPC)",
      timeline: "7-10 working days", 
      requirements: "Single director and shareholder",
      benefits: ["Individual ownership", "Limited liability", "Corporate benefits", "Simplified compliance"],
      idealFor: "Solo entrepreneurs, consultants, freelancers",
      pricing: "₹6,999 + Govt fees"
    },
    {
      type: "Public Limited Company",
      timeline: "15-20 working days",
      requirements: "Minimum 3 directors, 7 shareholders",
      benefits: ["Public fund raising", "Stock exchange listing", "High credibility", "Large scale operations"],
      idealFor: "Large enterprises, IPO aspirants",
      pricing: "₹15,999 + Govt fees"
    }
  ];

  const faqs = [
    {
      question: "What documents are required for company registration in India?",
      answer: "Essential documents include: PAN cards of all directors and shareholders, Aadhaar cards or passport for identity proof, address proof (utility bills, bank statements), passport-size photographs, digital signature certificates (DSC), registered office address proof with NOC from property owner, memorandum and articles of association (MOA & AOA), and Form DIR-3 for Director Identification Number. For foreign directors, additional documents like passport copies and overseas address proof are required."
    },
    {
      question: "How long does company registration take and what are the government fees?",
      answer: "Timeline varies by company type: Private Limited (10-15 days), OPC (7-10 days), Public Limited (15-20 days). Government fees include: name reservation (₹1,000), incorporation fees (₹4,000-₹8,000 based on capital), stamp duty (₹200), and digital signature certificate (₹800-1,500 per director). Additional fees may apply for expedited processing."
    },
    {
      question: "Can foreign nationals become directors in Indian companies?",
      answer: "Yes, foreign nationals can become directors in Indian companies. They need to obtain Director Identification Number (DIN) from MCA, provide passport copies with visa details, overseas address proof, and in some cases, security clearance. Foreign directors must visit India at least once every year and comply with FEMA regulations for foreign investment."
    },
    {
      question: "What is the minimum capital requirement for company registration?",
      answer: "There is no minimum capital requirement for Private Limited and OPC registration since 2013. You can start with ₹1,000 paid-up capital. For Public Limited companies, minimum paid-up capital is ₹5 lakhs. The authorized capital can be set as per business requirements and can be increased later through proper procedures."
    },
    {
      question: "What ongoing compliance is required after company registration?",
      answer: "Annual compliance includes: Annual Return filing (Form MGT-7), Financial Statement filing (Form AOC-4), Income tax returns, GST returns (if applicable), board meetings and resolutions, maintenance of statutory books and registers, and director-related compliances like DIN KYC. Non-compliance can result in penalties and legal consequences."
    },
    {
      question: "Can I change company name, directors, or registered office after incorporation?",
      answer: "Yes, all these can be changed post-incorporation: Company name change requires special resolution and MCA approval. Directors can be appointed/removed through board resolutions and MCA filings. Registered office can be changed within same state through board resolution and MCA filing, interstate changes require additional approvals and compliance."
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      company: "TechVenture Pvt Ltd",
      location: "Bangalore",
      rating: 5,
      text: "The company registration process was seamless. Their team handled everything from name approval to final incorporation. Got our Private Limited Company registered in just 12 days!",
      avatar: "PS"
    },
    {
      name: "Rajesh Kumar",
      company: "InnoSoft OPC",
      location: "Pune",
      rating: 5,
      text: "As a solo entrepreneur, OPC registration was perfect for me. The team explained everything clearly and handled all compliance requirements. Highly professional service.",
      avatar: "RK"
    },
    {
      name: "Anita Desai",
      company: "GreenTech Solutions",
      location: "Mumbai",
      rating: 5,
      text: "Excellent support for our Public Limited company registration. They guided us through the complex process and ensured all statutory requirements were met perfectly.",
      avatar: "AD"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Company Registration in India | Private Limited, OPC, Public Limited | SimplySetup"
        description="Get your company registered in India with complete ROC compliance. Private Limited, One Person Company (OPC), and Public Limited company registration with professional support."
        canonicalUrl="/services/company-registration"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                  <Building className="w-4 h-4 mr-1" />
                  Company Registration
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Company Registration in India
                </h1>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  Register your Private Limited, OPC, or Public Limited company with complete ROC compliance. 
                  Get professional business setup with expert guidance and fast-track processing.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="px-8 py-3">
                        Get Company Registered
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Get Company Registration Quote</DialogTitle>
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
                    <div className="text-2xl font-bold text-blue-600 mb-1">10-15</div>
                    <div className="text-sm text-gray-600">Days Registration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">50K+</div>
                    <div className="text-sm text-gray-600">Companies Registered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">100%</div>
                    <div className="text-sm text-gray-600">ROC Compliance</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200">
                  <div className="text-center mb-6">
                    <Building className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900">Company Registration Benefits</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Limited liability protection</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Easy fund raising capability</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Business loan eligibility</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Government scheme access</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Professional business credibility</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Perpetual business succession</span>
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
                Company Registration Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Don't let complex regulations and lengthy processes delay your business launch.
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

        {/* Company Types Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Choose Your Company Structure
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Select the right company type based on your business needs and growth plans.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {registrationTypes.map((type, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow relative">
                  <CardHeader className="p-0 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-blue-100 text-blue-800">{type.timeline}</Badge>
                      <div className="text-2xl font-bold text-blue-600">{type.pricing}</div>
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
                Why Choose Our Company Registration Service
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complete business setup with professional support and ongoing compliance management.
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
                Company Registration Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process to get your company registered with complete ROC compliance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="p-6 text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      {step.icon}
                    </div>
                    <div className="bg-blue-600 text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4">
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
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600">
                Trusted by thousands of entrepreneurs across India.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
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
                Get answers to common company registration questions.
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
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Register Your Company?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Get started with professional company registration and establish your business with complete legal compliance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                    Start Company Registration
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Get Company Registration Quote</DialogTitle>
                  </DialogHeader>
                  <ContactForm />
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
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