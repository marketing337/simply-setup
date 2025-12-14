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
  Users, 
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
  Handshake
} from "lucide-react";

export default function LLPRegistrationPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Partnership Liability Concerns",
      solution: "LLP provides partnership flexibility with limited liability protection for all partners"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Complex LLP Agreement Drafting",
      solution: "Professional LLP agreement preparation covering profit sharing, management, and partner rights"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Lengthy Registration Process",
      solution: "Fast-track LLP registration completed within 7-12 working days with expert support"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      problem: "Ongoing Compliance Management",
      solution: "Complete annual filing support including Form 8, Form 11, and statutory compliances"
    }
  ];

  const keyBenefits = [
    {
      icon: <Handshake className="w-8 h-8 text-blue-600" />,
      title: "Partnership Flexibility",
      description: "Enjoy partnership operational flexibility while maintaining separate legal entity status",
      features: ["Flexible profit sharing", "Simple management structure", "Partner decision making", "Internal governance freedom"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Limited Liability Protection", 
      description: "Partners' personal assets protected from business liabilities and debts of the LLP",
      features: ["Personal asset protection", "Limited liability coverage", "Partner insulation", "Business risk mitigation"]
    },
    {
      icon: <Scale className="w-8 h-8 text-purple-600" />,
      title: "Professional Structure",
      description: "Ideal business structure for professional services with regulatory compliance support",
      features: ["Professional services suitable", "Regulatory approval friendly", "Client credibility", "Industry recognition"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Tax Benefits & Compliance",
      description: "Simplified tax structure and lower compliance burden compared to companies",
      features: ["Pass-through taxation", "Lower compliance costs", "Simplified audit requirements", "Tax efficiency"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Name Reservation & DSC",
      description: "Reserve unique LLP name with MCA and obtain Digital Signature Certificates for designated partners",
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "Document Preparation",
      description: "Prepare LLP agreement, Form FiLLiP, and all incorporation documents with legal compliance",
      icon: <Shield className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "MCA Filing & Registration",
      description: "File LLP incorporation documents with MCA and obtain LLPIN (Limited Liability Partnership Identification Number)",
      icon: <Building className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "Certificate & Bank Setup",
      description: "Receive certificate of incorporation and assist with business bank account opening",
      icon: <Award className="w-6 h-6 text-blue-600" />
    }
  ];

  const llpTypes = [
    {
      type: "Professional Services LLP",
      timeline: "7-12 working days",
      requirements: "Minimum 2 partners, professional qualification",
      benefits: ["Professional practice structure", "Client credibility", "Regulatory compliance", "Flexible operations"],
      idealFor: "CA firms, law firms, consultants, architects, doctors",
      pricing: "₹7,999 + Govt fees"
    },
    {
      type: "Business LLP",
      timeline: "7-12 working days", 
      requirements: "Minimum 2 partners, business purpose",
      benefits: ["Partnership flexibility", "Limited liability", "Easy fund raising", "Lower compliance"],
      idealFor: "Trading, manufacturing, service businesses",
      pricing: "₹6,999 + Govt fees"
    },
    {
      type: "Startup LLP",
      timeline: "5-10 working days",
      requirements: "Minimum 2 partners, startup recognition",
      benefits: ["Tax exemptions", "Startup benefits", "Government schemes", "Investor friendly"],
      idealFor: "Technology startups, innovative businesses",
      pricing: "₹8,999 + Govt fees"
    }
  ];

  const faqs = [
    {
      question: "What is the difference between LLP and Partnership firm?",
      answer: "LLP (Limited Liability Partnership) provides limited liability protection to partners, has separate legal entity status, and requires registration with MCA. Traditional partnership firms have unlimited liability, no separate legal status, and can operate without formal registration. LLP offers better credibility, easier compliance, and protection of personal assets."
    },
    {
      question: "How many partners are required for LLP registration?",
      answer: "Minimum 2 partners are required for LLP registration. There is no maximum limit on number of partners. At least 2 partners must be designated partners and both must be individuals. One designated partner must be resident of India. Partners can be individuals, companies, or other LLPs."
    },
    {
      question: "What documents are required for LLP registration?",
      answer: "Required documents include: PAN cards of all partners, Aadhaar cards or passport for identity proof, address proof (utility bills, bank statements), passport-size photographs, Digital Signature Certificates (DSC) for designated partners, registered office address proof with NOC, LLP agreement draft, and consent of partners to act as designated partners."
    },
    {
      question: "What is the annual compliance requirement for LLP?",
      answer: "Annual compliances include: Form 8 filing (Statement of Account and Solvency) within 30 days of financial year end, Form 11 filing (Annual Return) within 60 days of financial year end, Income Tax Return filing, and maintenance of books of accounts. LLPs with turnover above ₹40 lakhs or contribution above ₹25 lakhs need to file these forms."
    },
    {
      question: "Can LLP be converted to Private Limited Company?",
      answer: "Yes, LLP can be converted to Private Limited Company through a legal process. This involves filing necessary forms with MCA, obtaining approvals, transferring assets and liabilities, and completing the conversion within prescribed timelines. Professional guidance is recommended for smooth conversion process."
    },
    {
      question: "What are the tax implications of LLP?",
      answer: "LLP has pass-through taxation where profits are taxed in hands of partners, not at LLP level. Partners pay tax on their profit share as per individual tax slabs. LLP pays tax only on salary paid to partners above ₹40 lakhs per annum. This provides tax efficiency compared to companies which face double taxation."
    }
  ];

  const testimonials = [
    {
      name: "Advocate Ravi Mehta",
      company: "Legal Associates LLP",
      location: "Delhi",
      rating: 5,
      text: "Perfect structure for our law firm. The team handled all documentation professionally and we got our LLP registered in just 10 days. Excellent service for professional services.",
      avatar: "RM"
    },
    {
      name: "CA Priya Jain",
      company: "Tax Consultants LLP", 
      location: "Mumbai",
      rating: 5,
      text: "LLP registration was smooth and hassle-free. The team understood our CA firm requirements perfectly and provided comprehensive support throughout the process.",
      avatar: "PJ"
    },
    {
      name: "Dr. Suresh Kumar",
      company: "Healthcare Partners LLP",
      location: "Bangalore",
      rating: 5,
      text: "Great experience with LLP registration for our medical practice. Professional service, clear communication, and timely completion. Highly recommend for healthcare professionals.",
      avatar: "SK"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="LLP Registration in India | Limited Liability Partnership Registration | SimplySetup"
        description="Register your Limited Liability Partnership (LLP) in India with complete MCA compliance. Professional LLP registration service for CA firms, law firms, and business partnerships."
        canonicalUrl="/services/llp-registration"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-purple-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200">
                  <Users className="w-4 h-4 mr-1" />
                  LLP Registration
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  LLP Registration in India
                </h1>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  Register your Limited Liability Partnership with professional support. Perfect structure 
                  for CA firms, law firms, and business partnerships with limited liability protection.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="px-8 py-3">
                        Register Your LLP
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Get LLP Registration Quote</DialogTitle>
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
                    <div className="text-2xl font-bold text-purple-600 mb-1">7-12</div>
                    <div className="text-sm text-gray-600">Days Registration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">25K+</div>
                    <div className="text-sm text-gray-600">LLPs Registered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">100%</div>
                    <div className="text-sm text-gray-600">MCA Compliance</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200">
                  <div className="text-center mb-6">
                    <Handshake className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900">LLP Registration Benefits</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Limited liability protection</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Partnership operational flexibility</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Pass-through taxation benefits</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Lower compliance requirements</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Professional services suitable</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Easy partner changes</span>
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
                LLP Registration Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get professional support for seamless LLP registration and ongoing compliance.
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

        {/* LLP Types Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Choose Your LLP Structure
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Select the right LLP type based on your business or professional service needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {llpTypes.map((type, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow relative">
                  <CardHeader className="p-0 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-purple-100 text-purple-800">{type.timeline}</Badge>
                      <div className="text-2xl font-bold text-purple-600">{type.pricing}</div>
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
                Why Choose Our LLP Registration Service
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professional LLP registration with comprehensive legal and compliance support.
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
                LLP Registration Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process to get your LLP registered with complete MCA compliance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="p-6 text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      {step.icon}
                    </div>
                    <div className="bg-purple-600 text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4">
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
                What Our Professional Clients Say
              </h2>
              <p className="text-xl text-gray-600">
                Trusted by CA firms, law firms, and professional service providers across India.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
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
                Get answers to common LLP registration questions.
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
        <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Register Your LLP?
            </h2>
            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              Get started with professional LLP registration and establish your partnership with limited liability protection.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3">
                    Start LLP Registration
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Get LLP Registration Quote</DialogTitle>
                  </DialogHeader>
                  <ContactForm />
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3">
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