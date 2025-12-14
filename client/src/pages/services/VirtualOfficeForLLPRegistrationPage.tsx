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
import { Dialog, DialogContent,  DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  CheckCircle, 
  Users, 
  Shield, 
  MapPin, 
  Building, 
  Globe, 
  TrendingUp, 
  ArrowRight,
  FileText,
  Clock,
  Award,
  Target,
  CheckSquare,
  Briefcase,
  HandHeart
} from "lucide-react";

export default function VirtualOfficeForLLPRegistrationPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "High Partnership Setup Costs",
      solution: "Professional registered office address at fraction of commercial property costs"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Complex LLP Agreement Drafting",
      solution: "Expert legal assistance with LLP agreement preparation and MCA filing support"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Lengthy Registration Process",
      solution: "Fast-track LLP registration completed within 12-18 working days with expert guidance"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      problem: "Partner Liability Concerns",
      solution: "Limited liability protection with proper LLP structure and compliance management"
    }
  ];

  const keyBenefits = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Complete LLP Registration Support",
      description: "End-to-end Limited Liability Partnership registration with expert legal and compliance assistance",
      features: ["MCA portal filing", "LLP agreement drafting", "Digital signature setup", "Certificate of incorporation"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Limited Liability Protection", 
      description: "Protect personal assets with proper LLP structure and ongoing compliance management",
      features: ["Limited liability benefits", "Partner protection", "Professional credibility", "Statutory compliance"]
    },
    {
      icon: <Building className="w-8 h-8 text-purple-600" />,
      title: "Professional Business Infrastructure",
      description: "Establish LLP operations with government-verified registered office addresses",
      features: ["MCA compliant address", "Business correspondence", "Professional reception", "Meeting facilities"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Partnership Growth Support",
      description: "Scale your LLP with flexible partnership management and business development assistance",
      features: ["Partner addition/removal", "Annual compliance", "Tax optimization", "Business expansion support"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Partner Assessment & Planning",
      description: "Evaluate partnership structure, define roles, responsibilities, and profit-sharing agreements between partners",
      icon: <Users className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "Documentation & LLP Agreement",
      description: "Prepare LLP agreement, gather partner documents, and draft all required legal documentation for filing",
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "MCA Filing & Registration",
      description: "File LLP incorporation documents with MCA, obtain digital signatures, and complete registration process",
      icon: <CheckSquare className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "LLP Certificate & Activation",
      description: "Receive LLP certificate, PAN, TAN, and complete setup for operational business activities",
      icon: <Award className="w-6 h-6 text-blue-600" />
    }
  ];

  const llpAdvantages = [
    {
      advantage: "Limited Liability Protection",
      description: "Partners are not personally liable for LLP debts beyond their agreed contribution",
      benefits: ["Personal asset protection", "Risk limitation", "Financial security", "Professional credibility"]
    },
    {
      advantage: "Flexible Management Structure",
      description: "No mandatory board meetings, simpler compliance compared to companies",
      benefits: ["Operational flexibility", "Reduced compliance burden", "Cost-effective management", "Partner autonomy"]
    },
    {
      advantage: "Tax Benefits & Efficiency",
      description: "Pass-through taxation, no double taxation like companies",
      benefits: ["Tax transparency", "No dividend distribution tax", "Partner-level taxation", "Efficient tax structure"]
    },
    {
      advantage: "Professional Recognition",
      description: "Ideal structure for professional services and consultancies",
      benefits: ["Professional credibility", "Client trust", "Industry recognition", "Service sector preference"]
    }
  ];

  const suitableBusinesses = [
    {
      category: "Professional Services",
      examples: ["Law firms", "CA firms", "Consulting services", "Architecture firms", "Medical practices"],
      whyLLP: "Professional recognition, limited liability, flexible management"
    },
    {
      category: "Service Businesses",
      examples: ["IT services", "Marketing agencies", "HR consultancies", "Training institutes", "Design studios"],
      whyLLP: "Operational flexibility, tax efficiency, professional credibility"
    },
    {
      category: "Trading & Partnerships",
      examples: ["Import-export", "Wholesale trading", "Retail chains", "Distribution networks", "Joint ventures"],
      whyLLP: "Limited liability, easy profit sharing, simplified compliance"
    }
  ];

  const faqs = [
    {
      question: "What is the minimum number of partners required for LLP registration?",
      answer: "Minimum 2 partners are required for LLP registration. There's no maximum limit on partners. At least one partner must be an Indian resident. Partners can be individuals or corporate entities."
    },
    {
      question: "Can I use virtual office address for LLP registration?",
      answer: "Yes, virtual office addresses are fully accepted for LLP registration with MCA. Our addresses are government-verified and come with all required documentation including utility bills and NOC certificates."
    },
    {
      question: "How long does LLP registration take and what is the process?",
      answer: "LLP registration typically takes 12-18 working days. Process includes name reservation, LLP agreement preparation, digital signature procurement, MCA filing, and certificate issuance. We handle the entire process with expert support."
    },
    {
      question: "What are the ongoing compliance requirements for LLP?",
      answer: "LLP compliance includes annual return filing (Form 11), statement of account and solvency (Form 8), partner changes notification, and maintaining statutory registers. Much simpler than company compliance requirements."
    },
    {
      question: "Can partners be added or removed after LLP registration?",
      answer: "Yes, partners can be added or removed with proper documentation and MCA filing. Changes require consent of existing partners, modification of LLP agreement, and filing of appropriate forms with the registrar."
    },
    {
      question: "What is the difference between LLP and private limited company?",
      answer: "LLP has limited liability like companies but with partnership flexibility. Key differences: no minimum capital requirement, pass-through taxation, simpler compliance, no board meetings required, and ideal for service businesses."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        pageType="purpose"
        service="llp-registration"
        canonicalUrl="/purpose/virtual-office-for-llp-registration"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-purple-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200">
                  <Users className="w-4 h-4 mr-1" />
                  LLP Registration
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Virtual Office for LLP Registration
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Register your Limited Liability Partnership with professional business address. Complete LLP registration, legal documentation, compliance support, and ongoing partnership management services.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Start LLP Registration
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
                    <span>12-18 day registration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Limited liability protection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Professional credibility</span>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-purple-100 to-blue-100 p-12">
                    <Users className="w-48 h-48 text-purple-600 mx-auto" />
                  </div>
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-purple-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-100 rounded-full opacity-60"></div>
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
                LLP Registration Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simplify your partnership formation with expert legal support and compliant business infrastructure.
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
                Complete LLP Registration & Management Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need for hassle-free LLP registration and ongoing partnership operations management.
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

        {/* LLP Advantages Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Why Choose LLP Structure for Your Business
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Limited Liability Partnership combines the benefits of limited liability with operational flexibility of partnerships.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {llpAdvantages.map((advantage, index) => (
                <Card key={index} className="p-6 border-l-4 border-purple-500 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.advantage}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{advantage.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {advantage.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Suitable Businesses Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Businesses Ideal for LLP Structure
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                LLP is particularly suitable for professional services, partnerships, and service-oriented businesses.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {suitableBusinesses.map((business, index) => (
                <Card key={index} className="p-6 border-t-4 border-purple-500 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl font-bold text-gray-900">{business.category}</CardTitle>
                    <p className="text-sm text-gray-600 mt-2"><strong>Why LLP:</strong> {business.whyLLP}</p>
                  </CardHeader>
                  <CardContent className="p-0">
                    <h4 className="font-semibold text-gray-900 mb-3">Example Businesses:</h4>
                    <div className="space-y-2">
                      {business.examples.map((example, exampleIndex) => (
                        <div key={exampleIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{example}</span>
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
                How LLP Registration Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process to get your LLP registered and operational within 12-18 working days.
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

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about LLP registration process and structure.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Register Your LLP?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Get your Limited Liability Partnership registered with complete legal support and professional business address. Start your partnership venture today.
            </p>
            <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  Start LLP Registration Now
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
      
      <Footer location={currentLocation} />
    </div>
  );
}