import { CheckCircle2, FileText, Users, Shield, TrendingUp, AlertCircle, Clock, DollarSign, Scale, UserCheck } from "lucide-react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function MicrofinanceCompanyRegistrationPage() {
  const heroStats = [
    { label: "Minimum NOF Required", value: "₹10 Crore", subtext: "₹5 Cr for NE States" },
    { label: "Processing Timeline", value: "6-9+ Months", subtext: "End-to-end process" },
    { label: "Application Fee", value: "₹3 Lakh", subtext: "RBI registration fee" },
    { label: "Market Size", value: "₹3.5 Trillion", subtext: "Indian microfinance sector" }
  ];

  const painPoints = [
    {
      issue: "Complex RBI Compliance Framework",
      impact: "Scale-based regulation with multiple compliance layers and extensive documentation requirements",
      icon: FileText
    },
    {
      issue: "High Capital Requirement",
      impact: "₹10 crore NOF requirement creates significant entry barriers for new microfinance players",
      icon: DollarSign
    },
    {
      issue: "Lengthy Approval Process",
      impact: "4-6 months RBI approval timeline with intensive due diligence and documentation review",
      icon: Clock
    },
    {
      issue: "Operational Restrictions",
      impact: "75% asset deployment requirement in microfinance loans with strict customer protection norms",
      icon: Shield
    }
  ];

  const benefits = [
    {
      title: "Regulated Financial Institution Status",
      description: "RBI-regulated NBFC-MFI license enables formal financial services delivery with regulatory backing",
      icon: Shield,
      keyAdvantages: ["Regulatory credibility", "Institutional investor access", "Banking partnerships", "Customer trust"]
    },
    {
      title: "Expanded Market Access",
      description: "Serve households with annual income up to ₹3 lakh across rural and urban markets nationwide",
      icon: Users,
      keyAdvantages: ["Large addressable market", "Financial inclusion impact", "Geographic expansion", "Product diversity"]
    },
    {
      title: "Flexible Interest Rate Pricing",
      description: "Interest rate deregulation under RBI Directions 2022 enables risk-based pricing and competitive positioning",
      icon: TrendingUp,
      keyAdvantages: ["Risk-based pricing", "Market-driven rates", "Competitive advantage", "Profitability optimization"]
    },
    {
      title: "Scale-Based Regulatory Framework",
      description: "Proportionate compliance requirements based on asset size with streamlined reporting for smaller institutions",
      icon: Scale,
      keyAdvantages: ["Proportionate compliance", "Growth-friendly regulation", "Reduced compliance burden", "Operational efficiency"]
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Company Incorporation",
      description: "Incorporate company under Companies Act 2013 with adequate authorized capital for achieving ₹10 crore NOF",
      timeline: "15-30 days",
      deliverables: ["Certificate of Incorporation", "MOA & AOA", "PAN & TAN", "Bank account opening"],
      keyRequirements: "Public or private limited company structure with NBFC-compliant object clause"
    },
    {
      step: 2,
      title: "Net Owned Fund Setup",
      description: "Arrange ₹10 crore NOF (₹5 crore for NE states) through equity infusion and establish regulatory capital",
      timeline: "30-45 days",
      deliverables: ["NOF certificate", "Auditor certification", "Fixed deposit proof", "Capital adequacy calculation"],
      keyRequirements: "15% minimum CRAR with 10% Tier-I capital requirement"
    },
    {
      step: 3,
      title: "Documentation Preparation",
      description: "Prepare comprehensive application documents including business plan, compliance framework, and director credentials",
      timeline: "45-60 days",
      deliverables: ["Business plan", "Compliance policies", "Risk management framework", "Director fit & proper certificates"],
      keyRequirements: "Directors meeting RBI fit and proper criteria with relevant banking/NBFC experience"
    },
    {
      step: 4,
      title: "RBI Application Submission",
      description: "Submit online application through RBI COSMOS portal with supporting documents and application fee",
      timeline: "5-10 days",
      deliverables: ["Online application", "Document submission", "Fee payment", "Acknowledgment receipt"],
      keyRequirements: "Complete application with all mandatory documents and RBI fee payment"
    },
    {
      step: 5,
      title: "RBI Due Diligence",
      description: "RBI conducts comprehensive review including management evaluation, business model assessment, and regulatory compliance",
      timeline: "90-180 days",
      deliverables: ["RBI queries response", "Additional documentation", "Management presentations", "Due diligence compliance"],
      keyRequirements: "Responsive engagement with RBI queries and comprehensive compliance demonstration"
    },
    {
      step: 6,
      title: "Certificate of Registration",
      description: "Receive RBI Certificate of Registration and commence NBFC-MFI operations with regulatory compliance",
      timeline: "15-30 days",
      deliverables: ["CoR from RBI", "Operational guidelines", "Compliance manual", "SRO membership"],
      keyRequirements: "Post-registration compliance including statutory auditor appointment and reporting setup"
    }
  ];

  const documentRequirements = [
    {
      category: "Company Documents",
      timeline: "During incorporation",
      documents: ["Certificate of Incorporation", "Memorandum and Articles of Association", "Board resolutions for NBFC operations", "Share certificate and shareholding pattern", "PAN and TAN certificates"]
    },
    {
      category: "Financial Documents", 
      timeline: "Before RBI application",
      documents: ["Audited financial statements (if applicable)", "NOF certificate from auditor", "Fixed deposit receipts/bank certificates", "Capital adequacy calculation", "Cash flow projections for 3 years"]
    },
    {
      category: "Management Documents",
      timeline: "For RBI submission",
      documents: ["Directors' profiles with experience certificates", "Fit and proper declarations", "Credit reports for directors and shareholders", "Management organization structure", "Key personnel appointment letters"]
    },
    {
      category: "Business Plan Documents",
      timeline: "For RBI evaluation",
      documents: ["Detailed business plan with financial projections", "Market analysis and target customer segments", "Risk management and compliance framework", "Technology and operational infrastructure plan", "Product portfolio and pricing strategy"]
    },
    {
      category: "Compliance Documents",
      timeline: "Pre-operational setup",
      documents: ["Fair practices code", "Customer grievance redressal policy", "KYC and AML compliance policies", "Board-approved lending policies", "Recovery and collection guidelines"]
    }
  ];

  const eligibilityRequirements = [
    {
      criteria: "Minimum Net Owned Fund",
      description: "₹10 crore NOF for general states; ₹5 crore for North Eastern states",
      details: "Fully paid-up capital with adequate capital adequacy ratio (15% minimum CRAR)"
    },
    {
      criteria: "Company Structure",
      description: "Public or private limited company incorporated under Companies Act 2013",
      details: "Must have NBFC-compliant object clause for microfinance and related financial services"
    },
    {
      criteria: "Management Experience",
      description: "Directors meeting RBI's fit and proper criteria with relevant banking/NBFC experience",
      details: "All directors must meet RBI's fit and proper criteria with relevant experience and clean credit records"
    },
    {
      criteria: "Business Focus",
      description: "Minimum 75% of total assets deployed in qualifying microfinance loans",
      details: "Collateral-free loans to households with annual income up to ₹3 lakh; maintain 75% asset deployment"
    },
    {
      criteria: "Regulatory Compliance",
      description: "Adherence to RBI (Regulatory Framework for Microfinance Loans) Directions, 2022",
      details: "Customer protection norms, fair practices code, and transparent pricing disclosure"
    }
  ];

  const microfinanceFeatures = [
    {
      feature: "Target Customer Segment",
      description: "Collateral-free lending to households with annual income up to ₹3 lakh",
      operations: "Rural and urban microfinance loans, group lending, individual loans",
      regulations: "Household income assessment, customer protection norms, fair lending practices"
    },
    {
      feature: "Interest Rate Framework",
      description: "Deregulated pricing under RBI Directions 2022 with transparent disclosure requirements",
      operations: "Risk-based pricing, competitive rates, no usurious charges",
      regulations: "Board-approved pricing policy, advance notice for rate changes, borrower disclosure"
    },
    {
      feature: "Qualifying Assets Requirement",
      description: "Minimum 75% of total assets in microfinance loans with ongoing compliance monitoring",
      operations: "Qualifying microfinance loans (75% minimum), related financial inclusion products",
      regulations: "Quarterly asset composition reporting, regulatory compliance maintenance"
    },
    {
      feature: "Customer Protection Measures",
      description: "Comprehensive borrower protection framework under unified microfinance regulations",
      operations: "Fair practices code, grievance redressal, recovery guidelines",
      regulations: "RBI customer protection norms, SRO compliance, transparent lending practices"
    },
    {
      feature: "Technology and Operations",
      description: "Digital lending platforms, mobile banking, and financial technology integration",
      operations: "Core banking systems, mobile apps, digital payments, data analytics",
      regulations: "Information security, data protection, technology risk management"
    }
  ];

  const complianceRequirements = [
    {
      title: "RBI Reporting and Returns",
      frequency: "Monthly/Quarterly/Annual",
      deadline: "Scale-based compliance timeline",
      description: "Submit NBS returns, asset composition reports, and prudential returns based on asset size and regulatory layer"
    },
    {
      title: "Microfinance Loan Compliance",
      frequency: "Ongoing",
      deadline: "Real-time compliance",
      description: "Adherence to RBI Directions 2022 including household income assessment, pricing transparency, and customer protection"
    },
    {
      title: "Capital Adequacy Maintenance", 
      frequency: "Ongoing",
      deadline: "Monthly monitoring",
      description: "Maintain minimum 15% CRAR with 10% Tier-I capital and regulatory capital adequacy per RBI norms"
    },
    {
      title: "Statutory Audit and Certification",
      frequency: "Annually",
      deadline: "Within 6 months of FY end",
      description: "Statutory audit by qualified auditor per RBI guidelines with NBFC-specific compliance certification and asset classification"
    },
    {
      title: "SRO Membership and Compliance",
      frequency: "Ongoing",
      deadline: "Membership required",
      description: "RBI-recognized SRO membership (e.g., MFIN/Sa-Dhan) as per applicable RBI guidance and industry practice with code compliance"
    }
  ];

  const operationalLimitations = [
    {
      limitation: "Asset Deployment Requirement",
      restriction: "Minimum 75% of total assets must be deployed in qualifying microfinance loans",
      implication: "Limited portfolio diversification with focus on microfinance lending activities",
      compliance: "Quarterly monitoring and asset composition maintenance with regulatory reporting"
    },
    {
      limitation: "Customer Income Restrictions",
      restriction: "Can lend only to households with annual income up to ₹3 lakh",
      implication: "Target market limited to lower and middle-income segments",
      compliance: "Household income assessment policy and verification procedures"
    },
    {
      limitation: "Geographic and Operational Constraints",
      restriction: "Focus on financial inclusion with emphasis on underserved communities",
      implication: "Limited high-value lending opportunities and market segments",
      compliance: "Financial inclusion reporting and impact measurement"
    },
    {
      limitation: "Interest Rate and Pricing Disclosure",
      restriction: "Transparent pricing with advance notice for changes and non-usurious rates",
      implication: "Limited pricing flexibility with mandatory customer disclosure requirements",
      compliance: "Board-approved pricing policy and customer communication protocols"
    }
  ];

  const faqs = [
    {
      question: "What is the difference between NBFC-MFI and other NBFC categories?",
      answer: "NBFC-MFI is a specialized category focusing on microfinance with 75% asset deployment in qualifying microfinance loans. Unlike other NBFCs, it operates under specific microfinance regulations including customer income caps (₹3 lakh annually), collateral-free lending, customer protection norms, and SRO membership requirements. It benefits from proportionate regulation and financial inclusion focus."
    },
    {
      question: "What are the current capital requirements for NBFC-MFI registration?",
      answer: "NBFC-MFI requires minimum ₹10 crore Net Owned Fund (NOF) for general states and ₹5 crore for North Eastern states. NOF comprises paid-up equity capital plus free reserves minus deductions. Additionally, it must maintain 15% minimum Capital Adequacy Ratio (CRAR) with 10% Tier-I capital. The application fee to RBI is ₹3 lakh (non-refundable). Total investment including professional services ranges from ₹12-15 crore."
    },
    {
      question: "How long does NBFC-MFI registration take and what is the process?",
      answer: "NBFC-MFI registration typically takes 6-9+ months including company incorporation (15-30 days), NOF arrangement (30-45 days), documentation preparation (45-60 days), RBI application submission (5-10 days), RBI due diligence (90-180 days), and certificate issuance (15-30 days). Timeline varies based on application completeness and RBI workload. Process involves online application through RBI COSMOS portal with comprehensive document submission."
    },
    {
      question: "What are the operational requirements under RBI Directions 2022?",
      answer: "Under RBI (Regulatory Framework for Microfinance Loans) Directions 2022, NBFC-MFIs must: provide Key Facts Statement (KFS) to borrowers, ensure total household loan repayments don't exceed 50% of household income, maintain collateral-free lending (no security deposits/third-party guarantees), offer choice of repayment frequency to borrowers, prohibit prepayment penalties, implement board-approved fair practices code with public display, establish grievance redressal with prescribed timelines, conduct credit bureau checks before disbursement, and follow recovery conduct norms (no coercion, proper agent training)."
    },
    {
      question: "What ongoing compliance is required for NBFC-MFI operations?",
      answer: "Ongoing compliance includes scale-based RBI reporting (monthly/quarterly/annual based on asset size), microfinance loan compliance per RBI Directions 2022, capital adequacy maintenance (15% CRAR), statutory audit by qualified auditor per RBI guidelines, SRO membership and code compliance, customer protection norm adherence, and technology and risk management compliance. Non-compliance may result in regulatory action."
    }
  ];

  return (
    <>
      <SEO 
        title="NBFC-MFI Registration - Microfinance Company License | RBI Approved Process"
        description="Register your NBFC-MFI with RBI for microfinance operations. Complete guide on capital requirements (₹10 Cr NOF), RBI Directions 2022 compliance, application process, and regulatory framework. Expert assistance for microfinance institution registration."
        canonicalUrl="/services/microfinance-company-registration"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50" data-testid="microfinance-company-registration-page">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden" data-testid="hero-section">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200 bg-blue-50">
                <Shield className="w-4 h-4 mr-2" />
                RBI Regulated Financial Institution
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                NBFC-MFI Registration
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Establish your <strong>microfinance institution</strong> with RBI-approved NBFC-MFI license. 
                Navigate complex regulatory framework, capital requirements, and compliance under RBI Directions 2022 
                for sustainable microfinance operations in India.
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
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700" data-testid="button-get-started">
                  Start NBFC-MFI Registration
                </Button>
                <Button variant="outline" size="lg" data-testid="button-download-guide">
                  Download Registration Guide
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                Microfinance Registration Challenges
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
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                NBFC-MFI Registration Benefits
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="h-full shadow-sm hover:shadow-md transition-shadow" data-testid={`benefit-${index}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <benefit.icon className="w-6 h-6 text-blue-600" />
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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                NBFC-MFI Registration Process
              </h2>
              <div className="space-y-8">
                {processSteps.map((step, index) => (
                  <Card key={index} className="shadow-sm" data-testid={`process-step-${index}`}>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
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
        <section className="py-16 bg-gray-50">
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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                NBFC-MFI Eligibility Requirements
              </h2>
              <div className="space-y-6">
                {eligibilityRequirements.map((req, index) => (
                  <Card key={index} className="shadow-sm" data-testid={`eligibility-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <UserCheck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
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

        {/* Microfinance Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                NBFC-MFI Operational Features
              </h2>
              <div className="space-y-6">
                {microfinanceFeatures.map((feature, index) => (
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
        <section className="py-16 bg-white">
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
                      <div className="text-sm text-blue-600 font-medium">{req.deadline}</div>
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
        <section className="py-16 bg-gray-50">
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
        <section className="py-16 bg-white">
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
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Register Your NBFC-MFI?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Navigate complex RBI compliance with expert guidance for successful microfinance institution registration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100" data-testid="button-start-registration">
                Start Registration Process
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-consult-expert">
                Consult NBFC Expert
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}