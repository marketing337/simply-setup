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
  TrendingUp,
  Building,
  Scale,
  Target,
  AlertTriangle,
  Users,
  ArrowRight,
  Award,
  Landmark,
  Globe,
  CheckSquare,
  BookOpen,
  Lightbulb,
  Briefcase,
  IndianRupee,
  Star,
  Banknote,
  CreditCard,
  PiggyBank,
  Percent,
  Calculator,
  UserCheck
} from "lucide-react";

export default function NidhiCompanyRegistrationPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Scale className="w-6 h-6 text-red-500" />,
      problem: "Complex MCA Nidhi Rules Compliance",
      solution: "Expert guidance on Nidhi Company Rules 2014 compliance, regulatory requirements, and ongoing MCA obligations"
    },
    {
      icon: <IndianRupee className="w-6 h-6 text-red-500" />,
      problem: "High Capital Requirements and Member Management",
      solution: "Structured approach to ₹10 lakh minimum capital and 200 member requirement with proper documentation"
    },
    {
      icon: <CreditCard className="w-6 h-6 text-red-500" />,
      problem: "Restricted Financial Activities and Regulatory Limits",
      solution: "Clear understanding of permitted activities, lending restrictions, and deposit acceptance limitations"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Extensive Documentation and NDH Declaration Process",
      solution: "Complete documentation support including NDH declaration, member agreements, and compliance framework"
    }
  ];

  const keyBenefits = [
    {
      icon: <PiggyBank className="w-8 h-8 text-green-600" />,
      title: "Member-Centric Financial Services",
      description: "Provide deposits, loans, and financial services exclusively to members with mutual benefit focus",
      features: ["Deposit acceptance from members", "Lending to members only", "Dividend distribution", "Member welfare schemes"]
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Regulatory Protection & Recognition",
      description: "Government recognized financial institution with member protection and regulatory oversight",
      features: ["MCA recognition", "Legal protection", "Regulated operations", "Member grievance mechanism"]
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Cooperative Financial Structure",
      description: "Community-based financial institution with democratic governance and member participation",
      features: ["Member ownership", "Democratic governance", "Community focus", "Local financial inclusion"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Sustainable Growth Model",
      description: "Stable business model with recurring income from financial services and member loyalty",
      features: ["Recurring revenue", "Member retention", "Sustainable growth", "Community development"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      icon: <Building className="w-8 h-8 text-blue-600" />,
      title: "Company Incorporation & Capital Setup",
      description: "Incorporate public limited company with minimum ₹10 lakh paid-up capital and obtain basic compliance."
    },
    {
      step: "2", 
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Member Recruitment & Documentation",
      description: "Recruit minimum 200 members, execute member agreements, and establish governance structure."
    },
    {
      step: "3",
      icon: <FileText className="w-8 h-8 text-purple-600" />,
      title: "NDH Declaration & MCA Approval",
      description: "Submit NDH-4 declaration to MCA within 120 days of incorporation for Nidhi company approval."
    },
    {
      step: "4",
      icon: <Award className="w-8 h-8 text-orange-600" />,
      title: "Operational Setup & Compliance Framework",
      description: "Establish financial operations, member services, and ongoing compliance management system."
    }
  ];

  const eligibilityRequirements = [
    {
      criteria: "Minimum Capital",
      description: "Paid-up equity share capital of not less than ₹10 lakhs",
      details: "Capital must be fully paid-up at the time of NDH-4 declaration submission within 120 days of incorporation"
    },
    {
      criteria: "Member Requirement",
      description: "Minimum 200 members before filing NDH-4 (within 120 days of incorporation)",
      details: "All members must have shareholding and proper member agreements executed"
    },
    {
      criteria: "Company Structure",
      description: "Must be incorporated as a public limited company under Companies Act with 'Limited' suffix",
      details: "Company name must include 'Nidhi Limited' at incorporation (subject to MCA approval)"
    },
    {
      criteria: "Business Restriction",
      description: "Business limited to deposit acceptance and lending to members only",
      details: "Cannot engage in hire purchase, leasing, insurance, or chit fund business"
    },
    {
      criteria: "Net Worth Maintenance",
      description: "Maintain Net Owned Funds (NOF) of at least ₹20 lakhs for continued operations",
      details: "NOF calculated as per Nidhi Amendment Rules 2022 excluding revaluation reserves"
    },
    {
      criteria: "Geographic Operations",
      description: "Operations typically restricted to one district or contiguous districts",
      details: "Common bond of association among members in the same locality or profession"
    }
  ];

  const documentRequirements = [
    {
      category: "Incorporation Documents",
      timeline: "At company formation",
      documents: ["Certificate of Incorporation", "Memorandum & Articles of Association", "PAN and TAN certificates", "Share certificates for ₹10 lakh capital", "Board resolutions for capital"]
    },
    {
      category: "Member Documentation", 
      timeline: "For NDH declaration",
      documents: ["List of 200 members with details", "Member application forms", "Member agreements and bylaws", "Share allotment certificates", "Member KYC documents"]
    },
    {
      category: "NDH Application Documents",
      timeline: "For MCA submission",
      documents: ["NDH-4 declaration form", "Auditor's certificate", "Compliance certificate", "Business plan for Nidhi operations", "Board resolution for NDH application"]
    }
  ];

  const nidhiFeatures = [
    {
      feature: "Deposit Services",
      description: "Accept various types of deposits from members with competitive interest rates",
      operations: "Fixed deposits, recurring deposits, savings deposits (where permitted)",
      regulations: "Member-only deposits, interest rate regulations, maturity restrictions"
    },
    {
      feature: "Lending Services",
      description: "Provide loans and advances exclusively to members for various purposes",
      operations: "Personal loans, secured loans, emergency loans, vehicle loans",
      regulations: "Member-only lending, loan-to-deposit ratio, security requirements"
    },
    {
      feature: "Member Services",
      description: "Additional financial and welfare services for member benefit and community development",
      operations: "Financial advisory, member welfare schemes, financial literacy sessions",
      regulations: "Member welfare focus, community development, regulatory compliance"
    },
    {
      feature: "Investment Activities",
      description: "Maintain unencumbered term deposits with scheduled commercial banks/post office as prescribed",
      operations: "Unencumbered term deposits only with scheduled commercial banks or post office",
      regulations: "No investments in mutual funds, equity, real estate, or speculative instruments"
    }
  ];

  const complianceRequirements = [
    {
      title: "Annual MCA Filings",
      frequency: "Annually",
      deadline: "Form-specific deadlines",
      description: "Submit AOC-4 within 30 days of AGM; MGT-7 within 60 days of AGM; NDH-3 half-yearly within 30 days from end of half-year"
    },
    {
      title: "Audit & Financial Reporting",
      frequency: "Annually", 
      deadline: "As per Companies Act",
      description: "Conduct statutory audit and submit audited financial statements with Nidhi-specific reporting"
    },
    {
      title: "Member Records Maintenance",
      frequency: "Ongoing",
      deadline: "Real-time updates",
      description: "Maintain updated member records, deposit details, loan accounts, and compliance documentation"
    },
    {
      title: "Prudential Norm Compliance",
      frequency: "Monthly/Quarterly",
      deadline: "As applicable",
      description: "Maintain liquidity ratios, provision for bad debts, and other prudential norms as prescribed"
    }
  ];

  const operationalLimitations = [
    {
      limitation: "Business Scope",
      restriction: "Limited to deposit acceptance and lending to members only",
      implication: "Cannot engage in hire purchase, leasing, insurance business, or chit fund activities",
      compliance: "Strictly member-centric operations with no external customer business"
    },
    {
      limitation: "Deposit Restrictions",
      restriction: "Can accept deposits only from members",
      implication: "No public deposits or deposits from non-members allowed under any scheme",
      compliance: "Member verification and KYC compliance for all deposit accounts"
    },
    {
      limitation: "Lending Restrictions",
      restriction: "Loans and advances can be provided only to members",
      implication: "No lending to non-members, companies, or external parties permitted",
      compliance: "Member verification and purpose validation for all loan disbursals"
    },
    {
      limitation: "Investment Restrictions",
      restriction: "Can only maintain unencumbered term deposits with scheduled commercial banks/post office as prescribed",
      implication: "Cannot invest in mutual funds, equity shares, real estate, securities, or speculative investments",
      compliance: "Strict adherence to prescribed investment limits and regular monitoring of deposits"
    }
  ];

  const faqs = [
    {
      question: "What is a Nidhi Company and how does it differ from other financial institutions?",
      answer: "A Nidhi Company is a non-banking financial company (NBFC) that deals exclusively with its members for deposit acceptance and lending. Unlike banks or other NBFCs, Nidhi companies can only accept deposits from and provide loans to their members only. They are regulated by MCA under Nidhi Company Rules 2014, not by RBI, and focus on mutual benefit and community financial inclusion."
    },
    {
      question: "What are the minimum requirements to start a Nidhi Company?",
      answer: "Key requirements include: minimum paid-up capital of ₹10 lakhs, at least 200 members with proper agreements, incorporation as public limited company, submission of NDH-4 declaration within 120 days to MCA, Net Owned Funds (NOF) maintenance of ₹20 lakhs, and business restricted to one district or contiguous districts. All members must have shareholding and the company must maintain member-only operations."
    },
    {
      question: "How long does Nidhi Company registration take and what are the costs?",
      answer: "Nidhi Company registration typically takes 3-6 months including company incorporation, member recruitment, and NDH-4 approval. Total costs include company incorporation (₹25,000-₹40,000), capital requirement (₹10,00,000), member recruitment and documentation (₹50,000-₹1,00,000), NDH-4 declaration filing (₹25,000-₹50,000), and professional services (₹75,000-₹1,50,000). Total investment ranges from ₹12-17 lakhs."
    },
    {
      question: "What business activities can a Nidhi Company undertake?",
      answer: "Nidhi Companies can accept deposits from members (fixed, recurring, savings), provide loans and advances to members, maintain unencumbered term deposits with scheduled commercial banks/post office as prescribed, and facilitate member welfare schemes. They cannot engage in hire purchase, leasing, insurance business, chit fund activities, lending to non-members, accepting public deposits, or investments in mutual funds, equity, real estate, or securities."
    },
    {
      question: "What are the ongoing compliance requirements for Nidhi Companies?",
      answer: "Ongoing compliance includes annual MCA filings (annual return, financial statements, compliance certificate), statutory audit with Nidhi-specific reporting, maintaining member records and KYC documentation, compliance with prudential norms (liquidity ratios, provisioning), regular board meetings, and ensuring member-only operations. Net Owned Funds (NOF) of ₹20 lakhs must be maintained continuously."
    },
    {
      question: "Can Nidhi Companies accept deposits from general public or lend to non-members?",
      answer: "No, Nidhi Companies are strictly prohibited from accepting deposits from general public or lending to non-members. They can only accept deposits from members only, and provide loans exclusively to members. This member-only restriction is fundamental to Nidhi Company operations and violating this can lead to regulatory action and loss of Nidhi status."
    }
  ];

  const successStories = [
    {
      industry: "Community Nidhi",
      challenge: "Local community needed affordable financial services and member-focused lending institution",
      solution: "Established Nidhi company with 500+ members providing deposits and loans within community",
      outcome: "₹2+ crore deposits mobilized, 300+ loans disbursed, strong community financial inclusion",
      timeline: "4 months registration + 2 years operations",
      text: "The Nidhi company model provided exactly what our community needed - accessible financial services with member ownership and local focus. Member trust and participation has been outstanding."
    },
    {
      industry: "Professional Nidhi",
      challenge: "Professional association needed member-centric financial institution for group financial needs",
      solution: "Created Nidhi company for professionals with specialized lending and deposit schemes",
      outcome: "₹1.5 crore capital base, 400+ professional members, sustainable operations",
      timeline: "5 months registration + 18 months growth",
      text: "The regulatory framework gave our members confidence while the mutual benefit model aligned perfectly with our professional association's goals."
    },
    {
      industry: "Rural Nidhi",
      challenge: "Rural area lacked accessible financial services and needed community-based lending institution",
      solution: "Established Nidhi company focusing on rural financial inclusion and agricultural lending",
      outcome: "₹3 crore operations, 600+ rural members, significant agricultural loan portfolio",
      timeline: "6 months registration + 3 years development",
      text: "The Nidhi model enabled us to serve our rural community effectively. Member-only operations ensured trust and sustainability while providing much-needed financial services."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" data-testid="nidhi-company-registration-page">
      <SEO 
        title="Nidhi Company Registration in India | Member-Only Financial Institution | MCA NDH Approval"
        description="Register Nidhi Company in India for member-centric financial services. Complete support for MCA NDH-4 declaration, ₹10 lakh capital, 200 member requirement, and compliance."
        canonicalUrl="/services/nidhi-company-registration"
      />

      {/* Hero Section */}
      <section className="py-8 md:py-16 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200" data-testid="service-badge">
                <PiggyBank className="w-4 h-4 mr-1" />
                Nidhi Company Registration
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight" data-testid="main-heading">
                Nidhi Company Registration
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed" data-testid="main-description">
                Register Nidhi Company for member-centric financial services with deposits and lending activities. 
                Expert assistance for MCA NDH declaration, capital requirements, and comprehensive compliance management.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all" data-testid="cta-button-hero">
                      Register Nidhi Company
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
                <div className="flex items-center space-x-2" data-testid="stat-capital">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>₹10 lakh minimum capital</span>
                </div>
                <div className="flex items-center space-x-2" data-testid="stat-members">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>200 member requirement</span>
                </div>
                <div className="flex items-center space-x-2" data-testid="stat-timeline">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>3-6 month process</span>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-8 shadow-lg">
                <PiggyBank className="w-32 h-32 text-green-600 mx-auto" />
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
              Nidhi Company Registration Challenges We Solve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Navigate complex MCA regulations and member-centric financial institution requirements with expert legal and compliance support.
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
              Complete Nidhi Company Formation Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for Nidhi company registration, member management, and sustainable financial operations.
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

      {/* Eligibility Section */}
      <section id="eligibility" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-eligibility">
              Nidhi Company Eligibility Requirements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understand the comprehensive eligibility criteria for Nidhi company registration and MCA NDH declaration.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4" data-testid="eligibility-notice">
              <p className="text-sm text-green-800"><strong>Important:</strong> All eligibility criteria must be met continuously. Nidhi companies are regulated by MCA under Nidhi Company Rules 2014 with strict member-only operations.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eligibilityRequirements.map((requirement, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-green-500" data-testid={`eligibility-${index}`}>
                <CardContent className="p-0">
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 mb-2">{requirement.criteria}</h3>
                    <p className="text-sm text-gray-600 mb-3">{requirement.description}</p>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-700">{requirement.details}</p>
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
              How Nidhi Company Registration Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive 4-step process to register Nidhi company with MCA NDH declaration and member management.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="p-6 text-center border-0 shadow-lg hover:shadow-xl transition-shadow" data-testid={`process-step-${index}`}>
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

      {/* Nidhi Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-features">
              Nidhi Company Features & Operations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understand the permitted activities, operational framework, and regulatory compliance for Nidhi companies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {nidhiFeatures.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-green-500" data-testid={`nidhi-feature-${index}`}>
                <CardContent className="p-0">
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">{feature.feature}</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-blue-700 text-sm mb-1">Description</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-700 text-sm mb-1">Operations</h4>
                        <p className="text-sm text-gray-600">{feature.operations}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-700 text-sm mb-1">Regulations</h4>
                        <p className="text-sm text-gray-600">{feature.regulations}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Operational Limitations Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-limitations">
              Nidhi Company Operational Limitations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Critical limitations and restrictions that Nidhi companies must comply with for legal operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {operationalLimitations.map((limitation, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-yellow-500" data-testid={`limitation-${index}`}>
                <CardContent className="p-0">
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <AlertTriangle className="w-6 h-6 text-yellow-600" />
                      <h3 className="font-bold text-gray-900">{limitation.limitation}</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-red-700 text-sm mb-1">Restriction</h4>
                        <p className="text-sm text-gray-600">{limitation.restriction}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-orange-700 text-sm mb-1">Implication</h4>
                        <p className="text-sm text-gray-600">{limitation.implication}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-700 text-sm mb-1">Compliance</h4>
                        <p className="text-sm text-gray-600">{limitation.compliance}</p>
                      </div>
                    </div>
                  </div>
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
              Document Requirements for Nidhi Company Registration
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete checklist of documents required for Nidhi company formation and MCA NDH declaration process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {documentRequirements.map((category, index) => (
              <Card key={index} className="p-6 border-t-4 border-green-500 shadow-lg hover:shadow-xl transition-shadow" data-testid={`document-category-${index}`}>
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl font-bold text-gray-900">{category.category}</CardTitle>
                  <Badge variant="outline" className="w-fit text-sm text-green-600">{category.timeline}</Badge>
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

      {/* Compliance Requirements Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-compliance">
              Nidhi Company Compliance Requirements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understand the ongoing compliance obligations for maintaining Nidhi company operations and MCA compliance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceRequirements.map((compliance, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-green-500" data-testid={`compliance-${index}`}>
                <CardContent className="p-0">
                  <div className="mb-4">
                    <Scale className="w-8 h-8 text-green-600 mb-3" />
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-stories">
              Nidhi Company Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how communities and groups have successfully established Nidhi companies for member-centric financial services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="p-6 border-t-4 border-green-500 shadow-lg hover:shadow-xl transition-shadow" data-testid={`success-story-${index}`}>
                <CardContent className="p-0">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-green-100 text-green-800">{story.industry}</Badge>
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
                  
                  <blockquote className="italic text-sm text-gray-700 border-l-2 border-green-500 pl-3">
                    "{story.text}"
                  </blockquote>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-faq">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about Nidhi company registration and member-centric financial operations.
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
      <section className="py-20 bg-gradient-to-r from-green-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6" data-testid="cta-heading">
            Ready to Register Your Nidhi Company?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Get expert assistance for Nidhi company registration with MCA NDH declaration and member management. Start your member-centric financial institution with proper legal foundation.
          </p>
          <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all" data-testid="cta-button-final">
                Start Registration Process
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