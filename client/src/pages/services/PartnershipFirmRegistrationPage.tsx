import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocation } from "@/hooks/useLocation";
import SEO from "@/components/SEO";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  CheckCircle, 
  Building, 
  Shield, 
  Users, 
  Globe, 
  TrendingUp, 
  Star,
  ArrowRight,
  Calculator,
  FileText,
  Clock,
  Award,
  Target,
  CheckSquare,
  Scale,
  Banknote,
  Handshake,
  Book,
  UserCheck,
  Gavel,
  ChartBar
} from "lucide-react";

export default function PartnershipFirmRegistrationPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Complex Partnership Documentation",
      solution: "Expert preparation of partnership deed with comprehensive terms, profit-sharing ratios, and legal clauses"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "State-wise Registration Variations",
      solution: "Complete knowledge of state-specific requirements and fees for smooth registration across all Indian states"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Lengthy Documentation Process",
      solution: "Streamlined 7-15 working day registration with parallel processing of all required documents and approvals"
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Partner Liability Concerns",
      solution: "Clear documentation of partner responsibilities, liability terms, and dispute resolution mechanisms"
    }
  ];

  const keyBenefits = [
    {
      icon: <Handshake className="w-8 h-8 text-blue-600" />,
      title: "Legal Recognition & Protection",
      description: "Gain full legal recognition with right to sue, contract enforcement, and protection under Partnership Act 1932",
      features: ["Right to sue third parties", "Legal contract enforcement", "Court dispute resolution", "Set-off claims ability"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      title: "Enhanced Business Credibility", 
      description: "Build trust with banks, suppliers, and customers through formal registration and professional business structure",
      features: ["Banking relationships", "Vendor credibility", "Loan eligibility", "Business continuity"]
    },
    {
      icon: <Scale className="w-8 h-8 text-purple-600" />,
      title: "Flexible Business Structure",
      description: "Enjoy operational flexibility with shared responsibilities, distributed profits, and easy partner additions",
      features: ["Flexible profit sharing", "Distributed workload", "Easy partner changes", "Operational freedom"]
    },
    {
      icon: <ChartBar className="w-8 h-8 text-orange-600" />,
      title: "Tax Benefits & Compliance",
      description: "Access better tax planning opportunities and simplified compliance with proper registration status",
      features: ["Tax planning benefits", "Simplified compliance", "Audit applicability based on turnover", "Income distribution"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Partnership Deed Preparation",
      description: "Draft comprehensive partnership deed covering firm name, business nature, profit-sharing ratios, and partner responsibilities",
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "Documentation & Notarization",
      description: "Collect all partner documents, prepare application forms, and get partnership deed notarized on non-judicial stamp paper",
      icon: <UserCheck className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "PAN & Bank Account Setup",
      description: "Apply for firm's PAN card, TAN registration, and open current account in firm's name for business operations",
      icon: <Banknote className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "State Registration Filing",
      description: "Submit prescribed application form with all documents to State Registrar of Firms and receive Certificate of Registration",
      icon: <Award className="w-6 h-6 text-blue-600" />
    }
  ];

  const partnershipTypes = [
    {
      type: "General Partnership",
      description: "All partners actively manage business with unlimited liability",
      suitability: "Small businesses, professional services",
      benefits: ["Equal management rights", "Shared responsibilities", "Flexible operations"],
      considerations: ["Unlimited liability", "Joint responsibility"]
    },
    {
      type: "Particular Partnership", 
      description: "Partnership formed for a specific business or transaction",
      suitability: "Project-based work, specific ventures",
      benefits: ["Clear scope definition", "Limited business purpose", "Automatic dissolution"],
      considerations: ["Limited scope", "Short-term nature"]
    },
    {
      type: "Partnership at Will",
      description: "No fixed duration partnership that can be dissolved anytime",
      suitability: "Experimental ventures, project-based work",
      benefits: ["Maximum flexibility", "Easy dissolution", "No time constraints"],
      considerations: ["Business uncertainty", "Planning difficulties"]
    }
  ];

  const requiredDocuments = [
    {
      category: "Partner Documents",
      documents: ["PAN cards of all partners", "Aadhaar cards/identity proof", "Address proof (utility bills)", "Passport-size photographs"]
    },
    {
      category: "Firm Documents", 
      documents: ["Partnership deed (notarized)", "Prescribed application form", "PAN application form", "Registered office proof"]
    },
    {
      category: "Business Setup",
      documents: ["Trade license application", "Bank account opening documents", "Professional service authorizations", "State-specific requirements"]
    }
  ];

  const complianceRequirements = [
    {
      title: "Annual Income Tax Returns",
      description: "File ITR using firm's PAN with proper income distribution",
      frequency: "Annual"
    },
    {
      title: "Books of Accounts",
      description: "Maintain proper accounting records and financial statements", 
      frequency: "Ongoing"
    },
    {
      title: "Partner Changes Notification",
      description: "Inform Registrar of any partner additions or removals",
      frequency: "As needed"
    },
    {
      title: "License Renewals",
      description: "Renew trade licenses and professional authorizations",
      frequency: "Periodic"
    }
  ];

  const faqs = [
    {
      question: "Is Partnership Firm registration mandatory in India?",
      answer: "Partnership Firm registration is not mandatory under the Indian Partnership Act, 1932, but it's highly recommended. Unregistered firms cannot sue third parties, enforce contracts in court, or claim set-offs if sued. Registration provides legal recognition, credibility, and protection essential for business operations."
    },
    {
      question: "What are the minimum requirements to register a Partnership Firm?",
      answer: "Minimum 2 partners and maximum 50 partners are allowed under the Companies Act 2013. All partners must be at least 18 years old, mentally sound, and legally capable. You need a unique firm name, principal place of business in India, and a notarized partnership deed with clearly defined terms."
    },
    {
      question: "How long does Partnership Firm registration take and what are the costs?",
      answer: "Registration typically takes 7-15 working days depending on the state. Official fees range from ₹5 to ₹2,000 across different states. Additional costs include stamp duty for partnership deed, notarization charges, professional service fees, and PAN/TAN application fees."
    },
    {
      question: "What documents are required for Partnership Firm registration?",
      answer: "Required documents include: PAN cards and Aadhaar cards of all partners, address proof, photographs, notarized partnership deed on stamp paper, prescribed application form (varies by state), firm's PAN application, registered office address proof with NOC, and trade license. State-specific additional documents may be required."
    },
    {
      question: "Can foreign nationals become partners in an Indian Partnership Firm?",
      answer: "Foreign nationals can become partners but with significant restrictions. FDI in partnership firms is generally not permitted under the automatic route and requires prior government approval. Most foreign investors prefer Limited Liability Partnerships (LLP) which allow easier foreign participation. Foreign partners need valid passport, visa, and must comply with FEMA regulations."
    },
    {
      question: "What happens if partners want to dissolve the Partnership Firm?",
      answer: "Partnership can be dissolved voluntarily by mutual consent, expiry of partnership term, or by court order. The dissolution process involves settling all liabilities, distributing assets among partners as per partnership deed terms, filing necessary forms with Registrar, and closing bank accounts and licenses."
    }
  ];

  const testimonials = [
    {
      name: "Ravi Patel",
      company: "TechSolutions Partnership",
      location: "Ahmedabad",
      rating: 5,
      text: "Excellent support for our partnership firm registration. The team prepared a comprehensive partnership deed and handled all state formalities efficiently. Our firm was registered within 10 days as promised.",
      avatar: "RP"
    },
    {
      name: "Meera Joshi", 
      company: "Creative Consultants",
      location: "Mumbai",
      rating: 5,
      text: "Professional service with clear guidance on partnership structure. They helped us understand liability implications and draft proper profit-sharing agreements. Highly recommend their expertise.",
      avatar: "MJ"
    },
    {
      name: "Amit Singh",
      company: "EcoGreen Partners",
      location: "Delhi",
      rating: 5,
      text: "The team's knowledge of state-specific requirements was invaluable. They managed our 4-partner firm registration seamlessly with proper documentation and legal compliance.",
      avatar: "AS"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" data-testid="partnership-firm-page">
      <SEO 
        title="Partnership Firm Registration in India | Legal Recognition | SimplySetup"
        description="Register your Partnership Firm in India with legal recognition under Partnership Act 1932. Expert assistance for 2-50 partners setup. Fast registration in 7-15 days."
        canonicalUrl="/services/partnership-firm-registration"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-green-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200" data-testid="service-badge">
                  <Handshake className="w-4 h-4 mr-1" />
                  Partnership Firm Registration
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight" data-testid="page-title">
                  Partnership Firm Registration in India
                </h1>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed" data-testid="page-description">
                  Register your Partnership Firm with complete legal recognition under Indian Partnership Act 1932. 
                  Establish credible business structure with proper documentation and statutory compliance.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="px-8 py-3" data-testid="button-get-quote">
                        Start Partnership Registration
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Get Partnership Firm Registration Quote</DialogTitle>
                        <p className="text-sm text-gray-600">Get expert assistance for your partnership firm registration with complete legal compliance.</p>
                      </DialogHeader>
                      <ContactForm />
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline" size="lg" className="px-8 py-3" onClick={() => {
                    const pricingSection = document.getElementById('partnership-types');
                    if (pricingSection) {
                      pricingSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }} data-testid="button-check-pricing">
                    <Calculator className="mr-2 h-5 w-5" />
                    View Partnership Types
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                  <div className="text-center" data-testid="stat-timeline">
                    <div className="text-2xl font-bold text-green-600 mb-1">7-15</div>
                    <div className="text-sm text-gray-600">Days Registration</div>
                  </div>
                  <div className="text-center" data-testid="stat-partners">
                    <div className="text-2xl font-bold text-blue-600 mb-1">2-50</div>
                    <div className="text-sm text-gray-600">Partners Allowed</div>
                  </div>
                  <div className="text-center" data-testid="stat-states">
                    <div className="text-2xl font-bold text-orange-600 mb-1">All</div>
                    <div className="text-sm text-gray-600">States Supported</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200" data-testid="benefits-card">
                  <div className="text-center mb-6">
                    <Handshake className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900">Partnership Firm Benefits</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3" data-testid="benefit-legal">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Full legal recognition & protection</span>
                    </div>
                    <div className="flex items-center space-x-3" data-testid="benefit-sue">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Right to sue third parties</span>
                    </div>
                    <div className="flex items-center space-x-3" data-testid="benefit-credibility">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Enhanced business credibility</span>
                    </div>
                    <div className="flex items-center space-x-3" data-testid="benefit-banking">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Better banking relationships</span>
                    </div>
                    <div className="flex items-center space-x-3" data-testid="benefit-flexibility">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Operational flexibility</span>
                    </div>
                    <div className="flex items-center space-x-3" data-testid="benefit-tax">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Tax planning benefits</span>
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
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-challenges">
                Partnership Registration Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Navigate partnership documentation complexities with expert guidance and comprehensive support.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {painPoints.map((point, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-red-500" data-testid={`pain-point-${index}`}>
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

        {/* Key Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-benefits">
                Why Register Your Partnership Firm?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Unlock legal protection, business credibility, and operational advantages with registered partnership status.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {keyBenefits.map((benefit, index) => (
                <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-green-300" data-testid={`key-benefit-${index}`}>
                  <CardHeader className="p-0 mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {benefit.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl text-gray-900">{benefit.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-gray-600 mb-4 leading-relaxed">{benefit.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {benefit.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2" data-testid={`feature-${index}-${featureIndex}`}>
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

        {/* Process Steps Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-process">
                Our Partnership Firm Registration Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process to get your Partnership Firm registered with complete legal compliance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow relative" data-testid={`process-step-${index}`}>
                  <CardContent className="p-0">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        {step.icon}
                      </div>
                      <div className="absolute -top-2 -left-2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Types Section */}
        <section id="partnership-types" className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-types">
                Types of Partnership Firms
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the right partnership structure based on your business needs and liability preferences.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {partnershipTypes.map((type, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow h-full" data-testid={`partnership-type-${index}`}>
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="mb-4">
                      <Handshake className="w-12 h-12 text-green-600 mb-4" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">{type.type}</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{type.description}</p>
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-green-700 mb-2">Best For: {type.suitability}</p>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                      <ul className="space-y-1 mb-4">
                        {type.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center space-x-2 text-sm" data-testid={`benefit-${index}-${benefitIndex}`}>
                            <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      <h4 className="font-semibold text-gray-900 mb-2">Consider:</h4>
                      <ul className="space-y-1">
                        {type.considerations.map((consideration, considIndex) => (
                          <li key={considIndex} className="flex items-center space-x-2 text-sm" data-testid={`consideration-${index}-${considIndex}`}>
                            <Scale className="w-3 h-3 text-orange-600 flex-shrink-0" />
                            <span className="text-gray-700">{consideration}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Required Documents Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-documents">
                Required Documents for Registration
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complete checklist of documents needed for Partnership Firm registration in India.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {requiredDocuments.map((docCategory, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow" data-testid={`document-category-${index}`}>
                  <CardContent className="p-0">
                    <div className="mb-4">
                      <FileText className="w-12 h-12 text-blue-600 mb-4" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-4 text-lg">{docCategory.category}</h3>
                    <ul className="space-y-2">
                      {docCategory.documents.map((document, docIndex) => (
                        <li key={docIndex} className="flex items-center space-x-3" data-testid={`document-${index}-${docIndex}`}>
                          <CheckSquare className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{document}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Requirements Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-compliance">
                Ongoing Compliance Requirements
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understand the compliance obligations for Partnership Firms in India.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {complianceRequirements.map((compliance, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-green-500" data-testid={`compliance-${index}`}>
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <Book className="w-6 h-6 text-green-600" />
                      <Badge variant="outline" className="text-xs">{compliance.frequency}</Badge>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{compliance.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{compliance.description}</p>
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
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-faq">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about Partnership Firm registration in India.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4" data-testid="faq-accordion">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-gray-50 rounded-lg border shadow-sm" data-testid={`faq-item-${index}`}>
                  <AccordionTrigger className="px-6 py-4 text-left hover:bg-gray-100 rounded-t-lg">
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-600 leading-relaxed border-t border-gray-200">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-testimonials">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600">
                Success stories from entrepreneurs who registered their Partnership Firms with us.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow" data-testid={`testimonial-${index}`}>
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.company}</p>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 italic text-sm leading-relaxed">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-green-600 to-green-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6" data-testid="cta-title">
              Ready to Register Your Partnership Firm?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Get expert assistance for Partnership Firm registration with complete legal compliance. 
              Establish your business partnership with professional support and statutory protection.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" variant="secondary" className="px-8 py-3" data-testid="cta-button-register">
                    Start Registration Today
                    <ArrowRight className="ml-2 h-5 w-5" />
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
          </div>
        </section>
      </main>
      
      <Footer location={currentLocation} />
    </div>
  );
}