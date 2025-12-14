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
  CreditCard, 
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
  Banknote,
  Landmark
} from "lucide-react";

export default function VirtualOfficeForBankAccountFormationPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "High Security Deposit Requirements",
      solution: "Professional business address eliminates need for large property deposits"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Complex Address Verification Process",
      solution: "Pre-verified business addresses with instant bank-acceptable documentation"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Lengthy Account Opening Timeline",
      solution: "Fast-track processing with relationship manager support and documentation assistance"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      problem: "Multiple Branch Visits Required",
      solution: "Single-visit account opening with complete documentation preparation"
    }
  ];

  const keyBenefits = [
    {
      icon: <Landmark className="w-8 h-8 text-blue-600" />,
      title: "Complete Bank Account Opening Support",
      description: "End-to-end assistance for current account opening with major banks across India",
      features: ["Documentation preparation", "Bank relationship management", "Account opening assistance", "Cheque book & debit card setup"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Address Verification Compliance", 
      description: "Bank-verified business addresses that meet all KYC and compliance requirements",
      features: ["RBI compliant addresses", "Utility bill provision", "NOC certificates", "Instant verification support"]
    },
    {
      icon: <Building className="w-8 h-8 text-purple-600" />,
      title: "Professional Banking Infrastructure",
      description: "Establish banking relationships with prime business addresses in financial districts",
      features: ["Corporate banking facilities", "Net banking setup", "RTGS/NEFT services", "Mobile banking activation"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Multi-Banking Solutions",
      description: "Open accounts with multiple banks for diversified banking operations and better services",
      features: ["Multiple bank accounts", "Escrow account setup", "Foreign currency accounts", "Specialized banking products"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Documentation Preparation",
      description: "Collect and verify all required documents including business registration, address proof, and director KYC documents",
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "Bank Selection & Application",
      description: "Choose suitable banks based on your business needs and submit account opening applications with complete documentation",
      icon: <Landmark className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "Verification & Approval",
      description: "Bank verification of address and documents with our support throughout the process for quick approval",
      icon: <CheckSquare className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "Account Activation",
      description: "Receive account details, cheque books, debit cards, and complete banking setup for business operations",
      icon: <Award className="w-6 h-6 text-blue-600" />
    }
  ];

  const bankingPartners = [
    {
      category: "Public Sector Banks",
      banks: ["State Bank of India", "Bank of Baroda", "Punjab National Bank", "Canara Bank"],
      features: ["Lower charges", "Government backing", "Wide branch network", "Traditional banking"],
      timeline: "7-15 working days",
      minBalance: "₹10,000 - ₹25,000"
    },
    {
      category: "Private Sector Banks",
      banks: ["HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank"],
      features: ["Digital banking", "Quick processing", "Premium services", "Relationship management"],
      timeline: "3-7 working days",
      minBalance: "₹25,000 - ₹1,00,000"
    },
    {
      category: "Small Finance Banks",
      banks: ["AU Small Finance", "Equitas Bank", "Ujjivan Bank", "Jana Small Finance"],
      features: ["SME focus", "Flexible terms", "Lower requirements", "Personalized service"],
      timeline: "5-10 working days",
      minBalance: "₹5,000 - ₹15,000"
    }
  ];

  const faqs = [
    {
      question: "What documents are required for corporate bank account opening?",
      answer: "Required documents include certificate of incorporation, memorandum & articles of association, board resolution for account opening, director KYC documents, business address proof, and financial projections. We assist with complete documentation preparation."
    },
    {
      question: "Can I open bank account with virtual office address?",
      answer: "Yes, all major banks accept virtual office addresses for current account opening. Our addresses are RBI compliant and come with utility bills, NOC certificates, and all required documentation for smooth account opening."
    },
    {
      question: "How long does bank account opening take with virtual office?",
      answer: "Account opening typically takes 3-15 working days depending on the bank. Private banks are faster (3-7 days) while public sector banks take 7-15 days. We expedite the process with proper documentation and relationship management."
    },
    {
      question: "What is the minimum balance requirement for corporate accounts?",
      answer: "Minimum balance varies by bank and account type: Public sector banks (₹10,000-₹25,000), Private banks (₹25,000-₹1,00,000), Small finance banks (₹5,000-₹15,000). We help you choose the most suitable option."
    },
    {
      question: "Do you help with multiple bank account opening?",
      answer: "Yes, we assist with opening accounts in multiple banks for diversified banking operations. This helps with better cash flow management, reduced dependency, and access to specialized banking products from different banks."
    },
    {
      question: "What banking services are included after account opening?",
      answer: "Post account opening, we help with net banking setup, mobile banking activation, cheque book ordering, debit card setup, RTGS/NEFT services, and ongoing banking support for smooth operations."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        pageType="purpose"
        service="bank-account-formation"
        canonicalUrl="/purpose/virtual-office-for-bank-account-formation"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                  <Landmark className="w-4 h-4 mr-1" />
                  Bank Account Opening
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Virtual Office for Bank Account Formation
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Open corporate bank accounts with professional business address. Complete documentation support, bank relationship management, and multi-banking solutions for your business needs.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Open Bank Account
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
                    <span>3-15 day opening</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>RBI compliant address</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Multi-bank support</span>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-blue-100 to-green-100 p-12">
                    <Landmark className="w-48 h-48 text-blue-600 mx-auto" />
                  </div>
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-green-100 rounded-full opacity-60"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Bank Account Opening Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simplify your corporate banking setup with professional support and compliant business infrastructure.
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
                Complete Banking Solutions for Your Business
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need for hassle-free bank account opening and ongoing banking operations management.
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

        {/* Banking Partners Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Banking Partners & Options
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose from a wide range of banking partners based on your business needs and operational requirements.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {bankingPartners.map((partner, index) => (
                <Card key={index} className="p-6 border-t-4 border-blue-500 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl font-bold text-gray-900">{partner.category}</CardTitle>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div><strong>Timeline:</strong> {partner.timeline}</div>
                      <div><strong>Min Balance:</strong> {partner.minBalance}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <h4 className="font-semibold text-gray-900 mb-3">Featured Banks:</h4>
                    <div className="space-y-1 mb-4">
                      {partner.banks.map((bank, bankIndex) => (
                        <div key={bankIndex} className="text-sm text-gray-700">• {bank}</div>
                      ))}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <div className="space-y-2">
                      {partner.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
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

        {/* How It Works Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                How Bank Account Opening Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process to get your corporate bank account opened and operational within 3-15 working days.
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

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about corporate bank account opening process.
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
        <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Open Your Corporate Bank Account?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get your corporate banking setup with complete documentation support and professional business address. Start your business banking operations today.
            </p>
            <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  Start Bank Account Opening
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