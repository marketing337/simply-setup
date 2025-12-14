import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ContactForm from "@/components/ContactForm";
import SEO from "@/components/SEO";
import { 
  CheckCircle, 
  Shield, 
  FileText, 
  Clock, 
  User,
  Building,
  Scale,
  Target,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  Award,
  Landmark,
  Globe,
  CheckSquare,
  Users,
  BookOpen,
  CreditCard,
  Briefcase
} from "lucide-react";

export default function OPCRegistrationPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Complex Director Requirements for Traditional Companies",
      solution: "Single-person ownership and management with nominee provision for seamless operations"
    },
    {
      icon: <CreditCard className="w-6 h-6 text-red-500" />,
      problem: "High Capital Requirements and Compliance Costs",
      solution: "No minimum capital requirement with simplified compliance and lower operational costs"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Extensive Documentation and Approval Process",
      solution: "Streamlined incorporation process with reduced documentation and faster approvals through SPICe+"
    },
    {
      icon: <Scale className="w-6 h-6 text-red-500" />,
      problem: "Limited Growth and Conversion Challenges",
      solution: "Easy conversion to private limited company when business scales with preserved legal continuity"
    }
  ];

  const keyBenefits = [
    {
      icon: <User className="w-8 h-8 text-blue-600" />,
      title: "Single Person Corporate Structure",
      description: "Perfect for individual entrepreneurs wanting corporate benefits without multiple shareholders or directors",
      features: ["One person company formation", "Limited liability protection", "Perpetual succession", "Professional business identity"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Minimal Compliance Requirements",
      description: "Simplified reporting and compliance obligations designed specifically for small business operations",
      features: ["Simplified governance structure", "Simplified annual filing", "Statutory audit mandatory; simplified other compliances", "Reduced regulatory burden"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      title: "Business Growth & Conversion",
      description: "Seamless conversion options when your business outgrows OPC structure with preserved legal standing",
      features: ["Convert to private limited", "Smooth ownership transfer", "Business continuity", "Scaling flexibility"]
    },
    {
      icon: <Landmark className="w-8 h-8 text-orange-600" />,
      title: "Banking & Financial Benefits",
      description: "Enhanced access to business banking, loans, and financial services with corporate legal structure",
      features: ["Business bank accounts", "Better loan access", "Credit rating benefits", "Financial transparency"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: "Document Preparation & Verification",
      description: "Gather required documents including director and nominee details, address proofs, and business plan."
    },
    {
      step: "2", 
      icon: <Building className="w-8 h-8 text-green-600" />,
      title: "Name Reservation & Digital Filing",
      description: "Reserve unique company name and submit incorporation application through SPICe+ portal."
    },
    {
      step: "3",
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: "Certificate of Incorporation",
      description: "Receive Certificate of Incorporation, CIN, and PAN after ROC approval and verification."
    },
    {
      step: "4",
      icon: <CheckCircle className="w-8 h-8 text-orange-600" />,
      title: "Post-Incorporation Setup",
      description: "Open business bank account, obtain necessary licenses, and complete operational setup."
    }
  ];

  const documentRequirements = [
    {
      category: "Director Documents",
      timeline: "Required at filing",
      documents: ["PAN card of director", "Aadhaar card of director", "Passport-size photographs", "Address proof of director", "Mobile number and email ID"]
    },
    {
      category: "Nominee Documents", 
      timeline: "Mandatory requirement",
      documents: ["PAN card of nominee", "Aadhaar card of nominee", "Consent letter from nominee", "Address proof of nominee", "Nominee photograph"]
    },
    {
      category: "Registered Office Documents",
      timeline: "For incorporation",
      documents: ["Registered office address proof", "Rental agreement (if rented)", "NOC from landlord", "Utility bill of premises", "Property ownership documents"]
    }
  ];

  const opcFeatures = [
    {
      feature: "Ownership Structure",
      description: "Single person can hold 100% shares with nominee provision",
      limitation: "Cannot have more than one member at any time",
      benefit: "Complete control and decision-making authority"
    },
    {
      feature: "Capital Requirements",
      description: "No minimum paid-up capital requirement with flexibility in capital structure",
      limitation: "No statutory turnover restrictions (voluntary conversion available)",
      benefit: "Low entry barrier for small entrepreneurs"
    },
    {
      feature: "Board Meetings",
      description: "No board meetings required if only one director; simplified meeting requirements if multiple directors",
      limitation: "Major decisions require proper documentation and compliance with governance requirements",
      benefit: "Simplified governance and faster decision-making"
    },
    {
      feature: "Audit Requirements",
      description: "Statutory audit mandatory but simplified compliance procedures",
      limitation: "Must maintain proper books of accounts",
      benefit: "Reduced compliance costs and administrative burden"
    }
  ];

  const complianceRequirements = [
    {
      title: "Annual Return Filing",
      frequency: "Annually",
      deadline: "Within prescribed timeline",
      description: "File Form MGT-7A for OPC with details of members, directors, and business activities (no AGM required)"
    },
    {
      title: "Financial Statement Filing",
      frequency: "Annually", 
      deadline: "180 days from FY end",
      description: "Submit Form AOC-4 with audited financial statements for OPC"
    },
    {
      title: "Income Tax Return",
      frequency: "Annually",
      deadline: "As per CBDT (typically 31 Oct)",
      description: "File corporate income tax return with proper documentation of income and expenses"
    },
    {
      title: "GST Compliance",
      frequency: "As applicable",
      deadline: "Monthly/Quarterly",
      description: "GST registration and filing if annual turnover exceeds ₹40 lakhs (₹20 lakhs for services)"
    }
  ];

  const conversionOptions = [
    {
      type: "Voluntary OPC Conversion",
      trigger: "Business growth requirements or strategic decisions",
      timeline: "2-3 months",
      process: "Board resolution, file Form INC-6, update MOA/AOA",
      benefits: ["Multiple shareholders allowed", "Higher business limits", "Enhanced credibility", "Better funding access"]
    },
    {
      type: "Voluntary Conversion",
      trigger: "Business growth requirements or strategic decisions",
      timeline: "2-3 months",
      process: "Special resolution, ROC approval, compliance verification",
      benefits: ["Planned business expansion", "Partnership opportunities", "Investment readiness", "Operational flexibility"]
    }
  ];

  const faqs = [
    {
      question: "What is One Person Company (OPC) and who can form it?",
      answer: "One Person Company (OPC) is a corporate structure where a single person can own 100% shares and manage the company. Indian citizens including NRIs can form OPC. The concept was introduced in Companies Act 2013 to encourage individual entrepreneurship with corporate benefits and limited liability protection."
    },
    {
      question: "What is the minimum capital requirement for OPC registration?",
      answer: "There is no minimum paid-up capital requirement for OPC under current regulations. OPC provides flexibility in capital structure and can voluntarily convert to private limited company when business growth requires multiple shareholders or enhanced corporate structure."
    },
    {
      question: "Is nominee mandatory for OPC and what are their rights?",
      answer: "Yes, appointing a nominee is mandatory for OPC registration. The nominee has no rights during the member's lifetime; upon death/incapacity, the nominee may become the member and can then be appointed director as per law. The nominee must be an Indian citizen (resident or NRI), and their consent is required."
    },
    {
      question: "What are the compliance requirements for OPC?",
      answer: "OPC has relaxed compliance requirements including no board meetings required if only one director; if multiple directors, at least one meeting in each half-year with 90-day gap and simplified annual filing (Form MGT-7A). However, statutory audit is mandatory regardless of turnover, proper books of accounts must be maintained, and annual returns must be filed within prescribed timelines."
    },
    {
      question: "Can OPC be converted to other company types?",
      answer: "Yes, OPC can be converted to Private Limited Company voluntarily at any time based on business requirements. The conversion process involves filing Form INC-6, updating MOA/AOA, and completing ROC formalities. Conversion to private or public company is permitted; conversion to Section 8 company is not allowed."
    },
    {
      question: "What are the restrictions and limitations of OPC?",
      answer: "OPC cannot engage in non-banking financial investment activities, cannot convert into Section 8 company, cannot have more than one member, and must have mandatory statutory audit. Additionally, OPC cannot be incorporated as subsidiary of another OPC and cannot have corporate nominee."
    }
  ];

  const successStories = [
    {
      industry: "E-commerce Business",
      challenge: "Online retailer needed corporate structure for business credibility and vendor contracts",
      solution: "Registered OPC with minimal compliance burden and quick incorporation process",
      outcome: "Achieved ₹80 lakhs turnover in 2 years with professional business identity",
      timeline: "12 days incorporation",
      text: "OPC registration gave my e-commerce business the corporate credibility needed for vendor partnerships while keeping compliance simple. The limited liability protection was crucial for business growth."
    },
    {
      industry: "IT Consulting",
      challenge: "Software consultant required corporate structure for international client contracts",
      solution: "Formed OPC with streamlined compliance and professional business setup",
      outcome: "Secured ₹50+ lakhs in international contracts with enhanced business credibility",
      timeline: "10 days complete setup",
      text: "The OPC structure perfectly suited my IT consulting practice. Single-person control with corporate benefits enabled me to compete with larger firms for international projects."
    },
    {
      industry: "Manufacturing Unit",
      challenge: "Small manufacturer needed legal structure for supplier agreements and business expansion",
      solution: "Established OPC with nominee and minimal capital requirements",
      outcome: "Expanded operations to 3 states with proper corporate governance",
      timeline: "15 days registration",
      text: "OPC provided the perfect balance of corporate benefits and operational simplicity for our manufacturing business. The conversion option gave us confidence for future growth."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" data-testid="opc-registration-page">
      <SEO 
        title="OPC Registration in India | One Person Company Formation | Expert Legal Services"
        description="Register One Person Company (OPC) in India with expert assistance. Complete support for single entrepreneur business formation, minimal compliance, and seamless conversion options."
        canonicalUrl="/services/opc-registration"
      />

      {/* Hero Section */}
      <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200" data-testid="service-badge">
                <User className="w-4 h-4 mr-1" />
                OPC Registration
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight" data-testid="main-heading">
                OPC Registration in India
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed" data-testid="main-description">
                Register One Person Company (OPC) for individual entrepreneurs. Perfect corporate structure with single ownership, 
                limited liability protection, minimal compliance, and easy conversion options for business growth.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all" data-testid="cta-button-hero">
                      Register Your OPC
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
                <div className="flex items-center space-x-2" data-testid="stat-timeline">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>10-15 day incorporation</span>
                </div>
                <div className="flex items-center space-x-2" data-testid="stat-capital">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>No minimum capital</span>
                </div>
                <div className="flex items-center space-x-2" data-testid="stat-compliance">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Minimal compliance</span>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 shadow-lg">
                <User className="w-32 h-32 text-blue-600 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-problems">
              OPC Registration Challenges We Solve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Overcome traditional company formation barriers with OPC's single-person structure designed for individual entrepreneurs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {painPoints.map((point, index) => (
              <Card key={index} className="p-6 border-l-4 border-red-500 shadow-lg hover:shadow-xl transition-shadow" data-testid={`pain-point-${index}`}>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-benefits">
              Complete OPC Formation & Management Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for professional OPC registration, compliance management, and business growth support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {keyBenefits.map((benefit, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow" data-testid={`benefit-${index}`}>
                <CardContent className="p-0">
                  <div className="mb-6">{benefit.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{benefit.description}</p>
                  <div className="space-y-3">
                    {benefit.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3" data-testid={`benefit-feature-${index}-${featureIndex}`}>
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

      {/* OPC Features & Limitations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-features">
              OPC Features, Benefits & Limitations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understand the unique characteristics and operational boundaries of One Person Company structure.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4" data-testid="disclaimer-notice">
              <p className="text-sm text-yellow-800"><strong>Important:</strong> OPC can voluntarily convert to private limited company at any time as per business requirements. No mandatory conversion thresholds exist under current regulations.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {opcFeatures.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-blue-500" data-testid={`opc-feature-${index}`}>
                <CardContent className="p-0">
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">{feature.feature}</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-green-700 text-sm mb-1">Description</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-700 text-sm mb-1">Benefit</h4>
                        <p className="text-sm text-gray-600">{feature.benefit}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-orange-700 text-sm mb-1">Limitation</h4>
                        <p className="text-sm text-gray-600">{feature.limitation}</p>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-process">
              How OPC Registration Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple 4-step process to register your One Person Company with complete legal compliance and quick incorporation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="p-6 text-center border-0 shadow-lg hover:shadow-xl transition-shadow" data-testid={`process-step-${index}`}>
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

      {/* Document Requirements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-documents">
              Document Requirements for OPC Registration
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete checklist of documents required for One Person Company incorporation and nominee appointment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {documentRequirements.map((category, index) => (
              <Card key={index} className="p-6 border-t-4 border-blue-500 shadow-lg hover:shadow-xl transition-shadow" data-testid={`document-category-${index}`}>
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl font-bold text-gray-900">{category.category}</CardTitle>
                  <Badge variant="outline" className="w-fit text-sm text-blue-600">{category.timeline}</Badge>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-2">
                    {category.documents.map((doc, docIndex) => (
                      <div key={docIndex} className="flex items-center space-x-2" data-testid={`document-${index}-${docIndex}`}>
                        <CheckSquare className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{doc}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Options Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-conversion">
              OPC Conversion Options
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understand when and how to convert your OPC to private limited company for business growth and expansion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {conversionOptions.map((option, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-blue-500" data-testid={`conversion-option-${index}`}>
                <CardContent className="p-0">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-900 text-lg">{option.type}</h3>
                      <Badge variant="outline" className="text-sm">{option.timeline}</Badge>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div>
                        <h4 className="font-semibold text-gray-700">Trigger:</h4>
                        <p className="text-gray-600">{option.trigger}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700">Process:</h4>
                        <p className="text-gray-600">{option.process}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Benefits:</h4>
                        <ul className="space-y-1">
                          {option.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="flex items-center space-x-2" data-testid={`conversion-benefit-${index}-${benefitIndex}`}>
                              <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                              <span className="text-gray-700">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Requirements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-compliance">
              OPC Compliance Requirements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understand the simplified compliance obligations for One Person Companies in India.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceRequirements.map((compliance, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-blue-500" data-testid={`compliance-${index}`}>
                <CardContent className="p-0">
                  <div className="mb-4">
                    <Scale className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="font-bold text-gray-900 mb-2">{compliance.title}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div><strong>Frequency:</strong> {compliance.frequency}</div>
                      <div><strong>Deadline:</strong> {compliance.deadline}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{compliance.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-stories">
              OPC Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how entrepreneurs have leveraged OPC structure for business growth and professional credibility.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="p-6 border-t-4 border-blue-500 shadow-lg hover:shadow-xl transition-shadow" data-testid={`success-story-${index}`}>
                <CardContent className="p-0">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-blue-100 text-blue-800">{story.industry}</Badge>
                      <span className="text-sm text-gray-500">{story.timeline}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{story.challenge}</h3>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <h4 className="font-semibold text-green-700 text-sm">Solution</h4>
                      <p className="text-sm text-gray-600">{story.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-700 text-sm">Outcome</h4>
                      <p className="text-sm text-gray-600">{story.outcome}</p>
                    </div>
                  </div>
                  
                  <blockquote className="italic text-sm text-gray-700 border-l-2 border-blue-500 pl-3">
                    "{story.text}"
                  </blockquote>
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
              Get answers to common questions about OPC registration and compliance in India.
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} data-testid={`faq-item-${index}`}>
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6" data-testid="cta-heading">
            Ready to Register Your One Person Company?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get expert assistance for OPC registration with minimal compliance setup. Start your entrepreneurial journey with professional corporate structure today.
          </p>
          <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all" data-testid="cta-button-final">
                Start OPC Registration
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
    </div>
  );
}