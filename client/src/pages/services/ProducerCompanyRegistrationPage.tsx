import { CheckCircle2, FileText, Users, Shield, TrendingUp, Wheat, Tractor, Building, UserCheck, Clock, DollarSign } from "lucide-react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ProducerCompanyRegistrationPage() {
  const heroStats = [
    { label: "Minimum Members", value: "10 Producers", subtext: "Or 2 institutions" },
    { label: "Registration Timeline", value: "15-20 Days", subtext: "Working days" },
    { label: "Recommended Capital", value: "₹5 Lakh Auth", subtext: "₹1 Lakh paid-up" },
    { label: "Director Requirement", value: "5-15 Directors", subtext: "Minimum to maximum" }
  ];

  const painPoints = [
    {
      issue: "Complex Agricultural Market Access",
      impact: "Individual farmers struggle with marketing agricultural produce, middlemen exploitation, and limited bargaining power",
      icon: TrendingUp
    },
    {
      issue: "Limited Financial Access",
      impact: "Difficulty accessing credit, insurance, and subsidies due to lack of collective strength and creditworthiness",
      icon: DollarSign
    },
    {
      issue: "Fragmented Operations",
      impact: "Small-scale operations, lack of bulk purchasing power, and inefficient resource utilization across individual farms",
      icon: Building
    },
    {
      issue: "Regulatory Compliance Challenges",
      impact: "Complex registration process, legal documentation requirements, and ongoing compliance for agricultural businesses",
      icon: FileText
    }
  ];

  const benefits = [
    {
      title: "Collective Bargaining Power",
      description: "Unite farmers for better market access, price negotiation, and elimination of middlemen exploitation",
      icon: Users,
      keyAdvantages: ["Higher crop prices", "Direct market access", "Bulk selling power", "Export opportunities"]
    },
    {
      title: "Enhanced Financial Access",
      description: "Improved creditworthiness and access to formal financial services, subsidies, and government schemes",
      icon: Shield,
      keyAdvantages: ["Bank loan access", "NABARD funding", "Government subsidies", "Insurance facilities"]
    },
    {
      title: "Limited Liability Protection",
      description: "Corporate structure with limited liability protection while maintaining individual land ownership rights",
      icon: Building,
      keyAdvantages: ["Personal asset protection", "Legal entity status", "Contract capability", "Property ownership"]
    },
    {
      title: "Tax Benefits & Exemptions",
      description: "Income qualifying as agricultural income under Section 10(1) of Income Tax Act is tax-exempt with access to various government incentives",
      icon: CheckCircle2,
      keyAdvantages: ["Tax-exempt income", "Subsidy eligibility", "Government schemes", "Financial incentives"]
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Pre-Registration Preparation",
      description: "Organize farmer group, obtain DSC and DIN for directors, and conduct feasibility assessment",
      timeline: "7-10 days",
      deliverables: ["Farmer group formation", "Director identification", "DSC and DIN certificates", "Feasibility study"],
      keyRequirements: "Minimum 10 individual producers or 2 producer institutions; 5-15 directors identified"
    },
    {
      step: 2,
      title: "Name Reservation",
      description: "Apply for unique company name through SPICe+ (Part A), must end with 'Producer Company Limited'",
      timeline: "1-3 days",
      deliverables: ["Name availability check", "SPICe+ Part A filing", "Name approval letter", "Reserved name certificate"],
      keyRequirements: "Name must comply with producer company naming conventions and availability"
    },
    {
      step: 3,
      title: "Document Preparation",
      description: "Prepare MOA, AOA, and all incorporation documents as per producer company requirements",
      timeline: "5-7 days",
      deliverables: ["Memorandum of Association", "Articles of Association", "Subscriber affidavits", "Registered office documents"],
      keyRequirements: "Documents must reflect agricultural/producer activities and member structure"
    },
    {
      step: 4,
      title: "Capital Arrangement",
      description: "Arrange recommended ₹5 lakh authorized capital and ₹1 lakh paid-up capital from member contributions (no statutory minimum required)",
      timeline: "3-5 days",
      deliverables: ["Bank account opening", "Capital contribution from members", "Share subscription", "Capital adequacy proof"],
      keyRequirements: "Member equity participation and adequate capitalization per regulations"
    },
    {
      step: 5,
      title: "ROC Filing & Registration",
      description: "File SPICe+ form with ROC along with all supporting documents and fees",
      timeline: "1-2 days",
      deliverables: ["SPICe+ form filing", "Document upload", "Fee payment", "Filing acknowledgment"],
      keyRequirements: "Complete documentation and compliance with MCA requirements"
    },
    {
      step: 6,
      title: "Certificate Issuance",
      description: "Receive Certificate of Incorporation and commence producer company operations",
      timeline: "7-10 days",
      deliverables: ["Certificate of Incorporation", "CIN allocation", "PAN and TAN", "Commencement certificate"],
      keyRequirements: "Post-incorporation compliance setup and operational readiness"
    }
  ];

  const documentRequirements = [
    {
      category: "Director Documents",
      timeline: "Pre-registration phase",
      documents: ["Director identification numbers (DIN)", "Digital signature certificates (DSC)", "Identity and address proofs", "Passport size photographs", "Director consent letters"]
    },
    {
      category: "Company Formation Documents",
      timeline: "During documentation",
      documents: ["Memorandum of Association (MOA)", "Articles of Association (AOA)", "Subscriber affidavits", "Declaration of compliance", "Director declarations"]
    },
    {
      category: "Registered Office Documents",
      timeline: "Before filing",
      documents: ["Registered office address proof", "Rental agreement or ownership proof", "NOC from property owner", "Utility bills for address verification", "Municipal permission if required"]
    },
    {
      category: "Member & Capital Documents",
      timeline: "Capital arrangement phase",
      documents: ["Member identification proofs", "Producer activity evidence", "Bank account opening documents", "Share subscription forms", "Capital contribution proofs"]
    },
    {
      category: "Regulatory Compliance Documents",
      timeline: "Post-incorporation setup",
      documents: ["Board meeting minutes", "Share certificate template", "Common seal design", "Statutory register formats", "Compliance calendar"]
    }
  ];

  const eligibilityRequirements = [
    {
      criteria: "Membership Structure",
      description: "Minimum 10 individual producers OR 2 producer institutions (or combination)",
      details: "Members must be engaged in primary production activities like agriculture, horticulture, or animal husbandry"
    },
    {
      criteria: "Director Requirements",
      description: "Minimum 5 directors and maximum 15 directors from member producers",
      details: "Directors should primarily be from member producers; co-opted expert directors (non-members) allowed without voting rights up to prescribed limits"
    },
    {
      criteria: "Capital Requirements",
      description: "Recommended ₹5 lakh authorized capital and ₹1 lakh paid-up capital (no statutory minimum)",
      details: "Capital must come from member equity participation; only equity shares allowed"
    },
    {
      criteria: "Business Activities",
      description: "Must be engaged in primary production, processing, or marketing of agricultural produce",
      details: "Activities include production, harvesting, procurement, processing, import/export, and marketing"
    },
    {
      criteria: "Legal Compliance",
      description: "Compliance with Part IXA of Companies Act 1956 (saved by Section 465 of Companies Act 2013) and producer company regulations",
      details: "Must maintain separate legal identity and follow corporate governance norms"
    }
  ];

  const producerFeatures = [
    {
      feature: "Collective Marketing",
      description: "Group marketing of agricultural produce with better price realization and market access",
      operations: "Bulk sales, direct market access, export facilitation, value addition",
      regulations: "Market regulation compliance, quality standards, export-import procedures"
    },
    {
      feature: "Financial Services",
      description: "Access to credit, insurance, and financial services for members through collective strength",
      operations: "Bank loans, NABARD funding, insurance schemes, subsidy facilitation",
      regulations: "Financial service regulations, credit discipline, repayment management"
    },
    {
      feature: "Input Supply",
      description: "Bulk procurement and supply of agricultural inputs like seeds, fertilizers, and equipment",
      operations: "Bulk purchasing, quality assurance, timely supply, cost optimization",
      regulations: "Input quality standards, licensing requirements, distribution regulations"
    },
    {
      feature: "Processing & Value Addition",
      description: "Primary and secondary processing of agricultural produce for value enhancement",
      operations: "Storage facilities, processing units, packaging, branding",
      regulations: "Food safety standards, processing licenses, quality certifications"
    },
    {
      feature: "Government Scheme Access",
      description: "Facilitation of government schemes, subsidies, and support programs for member farmers",
      operations: "Scheme application, documentation, benefit distribution, compliance monitoring",
      regulations: "Government guidelines, scheme compliance, audit requirements"
    }
  ];

  const complianceRequirements = [
    {
      title: "Board Meetings & Governance",
      frequency: "Quarterly",
      deadline: "Minimum 4 meetings annually",
      description: "Conduct regular board meetings with proper minutes and ensure corporate governance compliance"
    },
    {
      title: "Annual Filings with MCA",
      frequency: "Annually",
      deadline: "Within prescribed timelines",
      description: "File annual return, financial statements, and other statutory documents with Registrar of Companies"
    },
    {
      title: "Member Records Maintenance",
      frequency: "Ongoing",
      deadline: "Real-time updates",
      description: "Maintain updated member registers, share certificates, and member-related documentation"
    },
    {
      title: "Financial Audit & Reporting",
      frequency: "Annually",
      deadline: "Within 6 months of FY end",
      description: "Conduct statutory audit and prepare financial statements as per accounting standards"
    },
    {
      title: "Government Scheme Compliance",
      frequency: "As applicable",
      deadline: "Scheme-specific timelines",
      description: "Comply with various government scheme requirements, reporting, and utilization certificates"
    }
  ];

  const operationalLimitations = [
    {
      limitation: "Business Activity Restrictions",
      restriction: "Limited to primary production, processing, and marketing of agricultural produce",
      implication: "Cannot engage in non-agricultural business activities or financial services beyond member needs",
      compliance: "Activity monitoring and business scope limitation as per producer company regulations"
    },
    {
      limitation: "Member Eligibility Constraints",
      restriction: "Only producers engaged in primary production can become members",
      implication: "Limited membership base compared to general companies",
      compliance: "Member verification and eligibility assessment for primary production involvement"
    },
    {
      limitation: "Capital Structure Limitations",
      restriction: "Can only issue equity shares; no preference shares or debentures allowed",
      implication: "Limited capital raising options compared to other company types",
      compliance: "Share capital structure monitoring and regulatory compliance"
    },
    {
      limitation: "Conversion Restrictions",
      restriction: "Cannot be converted to public company; only conversion to multi-state cooperative allowed",
      implication: "Limited exit options and business model flexibility",
      compliance: "Structure maintenance and regulatory constraint adherence"
    }
  ];

  const faqs = [
    {
      question: "What is a Producer Company and how is it different from other company types?",
      answer: "A Producer Company is a specialized corporate structure governed by Part IXA of Companies Act 1956 (continuing under Section 465 of Companies Act 2013), designed for producers engaged in primary production like agriculture. Unlike regular companies, it combines benefits of corporate structure (limited liability, legal entity) with cooperative principles (member ownership, collective action). It requires minimum 10 producer members, can only issue equity shares, and must focus on agricultural/primary production activities."
    },
    {
      question: "What are the capital requirements for Producer Company registration?",
      answer: "Producer Company typically requires ₹5 lakh authorized capital and ₹1 lakh paid-up capital (no statutory minimum prescribed). Capital must come from member equity participation and only equity shares are allowed (no preference shares or debentures). There's no upper limit on capital. Under the 10,000 FPO scheme, government support includes equity grant up to ₹2,000 per member (capped at ₹15 lakh) plus credit guarantee and management cost support."
    },
    {
      question: "How long does Producer Company registration take and what is the process?",
      answer: "Producer Company registration typically takes 15-20 working days including pre-registration preparation (7-10 days), name reservation (1-3 days), document preparation (5-7 days), capital arrangement (3-5 days), ROC filing (1-2 days), and certificate issuance (7-10 days). Process involves farmer group formation, director identification, document preparation, and ROC filing through SPICe+ form."
    },
    {
      question: "What are the main benefits of forming a Producer Company for farmers?",
      answer: "Key benefits include collective bargaining power for better crop prices, enhanced financial access through improved creditworthiness, limited liability protection with individual land ownership, tax exemption on income qualifying as agricultural income under Section 10(1) of Income Tax Act, access to government schemes and subsidies, bulk input procurement at lower costs, direct market access eliminating middlemen, and professional management of agricultural activities."
    },
    {
      question: "What ongoing compliance is required for Producer Company operations?",
      answer: "Ongoing compliance includes conducting minimum 4 board meetings annually, filing annual returns and financial statements with MCA, maintaining member registers and share certificates, statutory audit by qualified auditor, compliance with government scheme requirements if availed, maintaining separate books of accounts, and ensuring business activities remain within agricultural/primary production scope as per regulatory requirements."
    }
  ];

  return (
    <>
      <SEO 
        title="Producer Company Registration - Farmer Producer Organization (FPO) | Agricultural Business Setup"
        description="Register Producer Company for farmers and agricultural producers. Complete guide on FPO registration, minimum 10 members, recommended capitalization (no statutory minimum), collective marketing benefits, and agricultural business compliance under Part IXA of Companies Act 1956."
        canonicalUrl="/services/producer-company-registration"
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50" data-testid="producer-company-registration-page">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden" data-testid="hero-section">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="outline" className="mb-4 text-green-600 border-green-200 bg-green-50">
                <Wheat className="w-4 h-4 mr-2" />
                Agricultural Business Registration
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Producer Company Registration
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Empower farmers through <strong>collective strength</strong> with Producer Company registration. 
                Establish Farmer Producer Organization (FPO) for better market access, financial services, 
                and agricultural business growth under Part IXA of Companies Act 1956 (preserved by Section 465 of Companies Act 2013).
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {heroStats.map((stat, index) => (
                  <div key={index} className="text-center" data-testid={`stat-${index}`}>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                    <div className="text-xs text-gray-500">{stat.subtext}</div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button size="lg" className="bg-green-600 hover:bg-green-700" data-testid="button-get-started">
                  Start Producer Company Registration
                </Button>
                <Button variant="outline" size="lg" data-testid="button-download-guide">
                  Download FPO Guide
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-16 bg-white" data-testid="pain-points-section">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                Agricultural Business Challenges
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {painPoints.map((pain, index) => (
                  <Card key={index} className="border-l-4 border-l-red-500 shadow-sm" data-testid={`pain-point-${index}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <pain.icon className="w-6 h-6 text-red-500" />
                        <CardTitle className="text-lg text-gray-900">{pain.issue}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{pain.impact}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50" data-testid="benefits-section">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                Producer Company Benefits
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="h-full shadow-sm hover:shadow-md transition-shadow" data-testid={`benefit-${index}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <benefit.icon className="w-6 h-6 text-green-600" />
                        </div>
                        <CardTitle className="text-xl text-gray-900">{benefit.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{benefit.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {benefit.keyAdvantages.map((advantage, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{advantage}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps Section */}
        <section className="py-16 bg-white" data-testid="process-section">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                Producer Company Registration Process
              </h2>
              <div className="space-y-8">
                {processSteps.map((step, index) => (
                  <Card key={index} className="shadow-sm" data-testid={`process-step-${index}`}>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl text-gray-900 mb-2">{step.title}</CardTitle>
                          <p className="text-gray-600">{step.description}</p>
                          <Badge variant="outline" className="mt-2">{step.timeline}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6 ml-14">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Key Deliverables:</h4>
                          <ul className="space-y-1">
                            {step.deliverables.map((deliverable, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <span className="text-sm text-gray-600">{deliverable}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                          <p className="text-sm text-gray-600">{step.keyRequirements}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Document Requirements Section */}
        <section className="py-16 bg-gray-50" data-testid="documents-section">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                Document Requirements
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documentRequirements.map((category, index) => (
                  <Card key={index} className="shadow-sm" data-testid={`document-category-${index}`}>
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-900">{category.category}</CardTitle>
                      <Badge variant="outline" className="w-fit">{category.timeline}</Badge>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.documents.map((doc, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <FileText className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600">{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Requirements Section */}
        <section className="py-16 bg-white" data-testid="eligibility-section">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                Producer Company Eligibility Requirements
              </h2>
              <div className="space-y-6">
                {eligibilityRequirements.map((req, index) => (
                  <Card key={index} className="shadow-sm" data-testid={`eligibility-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <UserCheck className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{req.criteria}</h3>
                          <p className="text-gray-600 mb-2">{req.description}</p>
                          <p className="text-sm text-gray-500">{req.details}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Producer Features Section */}
        <section className="py-16 bg-gray-50" data-testid="features-section">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                Producer Company Operational Features
              </h2>
              <div className="space-y-6">
                {producerFeatures.map((feature, index) => (
                  <Card key={index} className="shadow-sm" data-testid={`feature-${index}`}>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">{feature.feature}</h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">DESCRIPTION</h4>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">OPERATIONS</h4>
                          <p className="text-sm text-gray-600">{feature.operations}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">REGULATIONS</h4>
                          <p className="text-sm text-gray-600">{feature.regulations}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Compliance Requirements Section */}
        <section className="py-16 bg-white" data-testid="compliance-section">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                Ongoing Compliance Requirements
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {complianceRequirements.map((req, index) => (
                  <Card key={index} className="shadow-sm" data-testid={`compliance-${index}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-gray-900">{req.title}</CardTitle>
                        <Badge variant="outline">{req.frequency}</Badge>
                      </div>
                      <div className="text-sm text-green-600 font-medium">{req.deadline}</div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{req.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Operational Limitations Section */}
        <section className="py-16 bg-gray-50" data-testid="limitations-section">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                Operational Limitations & Restrictions
              </h2>
              <div className="space-y-6">
                {operationalLimitations.map((limitation, index) => (
                  <Card key={index} className="shadow-sm border-l-4 border-l-orange-500" data-testid={`limitation-${index}`}>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">{limitation.limitation}</h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">RESTRICTION</h4>
                          <p className="text-sm text-gray-600">{limitation.restriction}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">IMPLICATION</h4>
                          <p className="text-sm text-gray-600">{limitation.implication}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">COMPLIANCE</h4>
                          <p className="text-sm text-gray-600">{limitation.compliance}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white" data-testid="faq-section">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`} 
                    className="border rounded-lg px-6 shadow-sm"
                    data-testid={`faq-${index}`}
                  >
                    <AccordionTrigger className="text-left font-medium text-gray-900 py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white" data-testid="cta-section">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Register Your Producer Company?
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Empower farmers through collective strength with expert guidance for successful FPO registration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100" data-testid="button-start-registration">
                Start Registration Process
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-consult-expert">
                Consult Agricultural Expert
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}