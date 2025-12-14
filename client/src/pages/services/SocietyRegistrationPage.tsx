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
  Users,
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
  BookOpen,
  Vote,
  Briefcase,
  HeartHandshake
} from "lucide-react";

export default function SocietyRegistrationPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Complex Membership Management and Governance",
      solution: "Democratic governance structure with clear member rights, voting procedures, and transparent decision-making processes"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Extensive Documentation and Bylaws Requirements",
      solution: "Comprehensive memorandum and rules preparation with legal compliance and clear operational guidelines"
    },
    {
      icon: <Scale className="w-6 h-6 text-red-500" />,
      problem: "State-Specific Registration Procedures",
      solution: "Expert guidance on state registrar requirements, documentation standards, and compliance procedures"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Annual Compliance and Reporting Burden",
      solution: "Simplified compliance management with annual return filing, audit support, and regulatory compliance tracking"
    }
  ];

  const keyBenefits = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Democratic Membership Structure",
      description: "Establish society with democratic governance, member participation, and transparent decision-making processes",
      features: ["Member-driven governance", "Democratic voting rights", "General body meetings", "Executive committee structure"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Legal Recognition & Protection",
      description: "Obtain official recognition with legal protection for society activities and perpetual succession",
      features: ["Government recognition", "Legal entity status", "Perpetual succession", "Limited liability protection"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      title: "Funding & Grant Access",
      description: "Enhanced access to government grants, CSR funding, and donation benefits with tax exemption support",
      features: ["Government grant eligibility", "CSR funding access", "Tax exemption benefits", "International funding eligibility"]
    },
    {
      icon: <Building className="w-8 h-8 text-orange-600" />,
      title: "Operational Flexibility",
      description: "Flexible operational structure suitable for diverse activities from social welfare to professional associations",
      features: ["Diverse activity scope", "Branch establishment", "Property ownership rights", "Professional credibility"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: "Society Planning & Member Assembly",
      description: "Define objectives, assemble founding members (minimum 7), and plan society structure and activities."
    },
    {
      step: "2", 
      icon: <FileText className="w-8 h-8 text-green-600" />,
      title: "Memorandum & Rules Preparation",
      description: "Draft comprehensive memorandum of association and rules & regulations covering governance and operations."
    },
    {
      step: "3",
      icon: <Vote className="w-8 h-8 text-purple-600" />,
      title: "General Body Meeting & Approvals",
      description: "Conduct founding general body meeting, approve memorandum, elect governing body, and record minutes."
    },
    {
      step: "4",
      icon: <Award className="w-8 h-8 text-orange-600" />,
      title: "Registration & Compliance Setup",
      description: "File registration application with state registrar, obtain registration certificate, and setup compliance framework."
    }
  ];

  const documentRequirements = [
    {
      category: "Founding Documents",
      timeline: "Required for registration",
      documents: ["Memorandum of Association", "Rules and Regulations", "List of founding members", "Consent letters from members", "Society name verification"]
    },
    {
      category: "Member & Officer Documents", 
      timeline: "At incorporation",
      documents: ["PAN cards of office bearers", "Address proofs of members", "Identity proofs of all members", "Photographs of office bearers", "Appointment letters for key positions"]
    },
    {
      category: "Operational Documents",
      timeline: "Post-registration",
      documents: ["Society registration certificate", "PAN/TAN certificates", "Bank account opening documents", "Rent agreement for registered office", "First general body meeting minutes"]
    }
  ];

  const societyFeatures = [
    {
      feature: "Membership Structure",
      description: "Minimum 7 members required with democratic participation and voting rights",
      benefit: "Inclusive decision-making and member engagement",
      governance: "General body has supreme authority with executive committee management"
    },
    {
      feature: "Governing Body",
      description: "Elected president, secretary, treasurer and other office bearers as per rules",
      benefit: "Professional management with accountability to members",
      governance: "Regular elections and term limits as defined in society rules"
    },
    {
      feature: "Activity Scope",
      description: "Broad scope for social, educational, cultural, scientific, and professional activities",
      benefit: "Flexibility to pursue diverse objectives within legal framework",
      governance: "Activities must align with memorandum objectives and legal compliance"
    },
    {
      feature: "Financial Management",
      description: "Transparent financial management with audit requirements and member oversight",
      benefit: "Enhanced credibility and donor confidence through accountability",
      governance: "Annual financial statements and audit as per society rules"
    }
  ];

  const complianceRequirements = [
    {
      title: "Annual Return Filing",
      frequency: "Annually",
      deadline: "As per state rules",
      description: "Submit annual return with activities report, financial statements, and member details to registrar"
    },
    {
      title: "General Body Meeting",
      frequency: "Annually", 
      deadline: "As per bylaws",
      description: "Conduct annual general body meeting for accounts approval, activity review, and elections"
    },
    {
      title: "Audit & Financial Reporting",
      frequency: "Annually",
      deadline: "As applicable",
      description: "Conduct independent audit if income/expenditure exceeds prescribed limits and maintain books"
    },
    {
      title: "Income Tax Compliance",
      frequency: "Annually",
      deadline: "31st October",
      description: "File income tax return and maintain 12A/80G registrations for tax exemption benefits"
    }
  ];

  const societyTypes = [
    {
      type: "Charitable Society",
      description: "For social welfare, healthcare, education, and poverty alleviation activities",
      examples: ["Healthcare societies", "Educational societies", "Women welfare societies", "Child care societies"],
      benefits: ["12A & 80G tax exemptions", "Government grant access", "CSR funding eligibility", "Donation benefits"],
      governance: "Strict adherence to charitable objectives with transparent fund utilization"
    },
    {
      type: "Professional Society",
      description: "For professional development, trade associations, and industry collaboration",
      examples: ["Medical associations", "Engineering societies", "Trade bodies", "Professional institutes"],
      benefits: ["Professional credibility", "Industry recognition", "Networking platform", "Advocacy power"],
      governance: "Member-driven governance with professional standards and ethics"
    },
    {
      type: "Cultural Society",
      description: "For arts, culture, literature, sports, and recreational activities promotion",
      examples: ["Cultural organizations", "Sports clubs", "Literary societies", "Arts promotion groups"],
      benefits: ["Cultural preservation", "Community engagement", "Event organization", "Heritage protection"],
      governance: "Democratic participation with focus on cultural and artistic objectives"
    }
  ];

  const faqs = [
    {
      question: "What is the minimum number of members required to form a Society?",
      answer: "A minimum of 7 members is required to form a Society under the Societies Registration Act. These founding members must sign the memorandum of association and participate in the initial general body meeting. The society can have unlimited members after registration, and membership criteria are defined in the society's rules and regulations."
    },
    {
      question: "What are the key documents required for Society registration?",
      answer: "Key documents include Memorandum of Association defining objectives, Rules and Regulations for governance, list of founding members with their consent letters, PAN cards and address proofs of office bearers, society name verification, and minutes of the first general body meeting. State-specific requirements may vary, so local registrar guidelines should be followed."
    },
    {
      question: "How long does Society registration take and what are the costs?",
      answer: "Society registration typically takes 15-30 days depending on state registrar processing and document completeness. Costs include stamp duty (₹500-₹2,000), registration fees (₹500-₹5,000), legal documentation charges (₹10,000-₹25,000), and professional assistance fees. Total costs generally range from ₹15,000-₹35,000 varying by state and complexity."
    },
    {
      question: "What are the ongoing compliance requirements for a registered Society?",
      answer: "Registered societies must file annual returns with state registrar, conduct annual general body meetings, maintain proper books of accounts, and file income tax returns. If income exceeds prescribed limits, independent audit is mandatory. Societies with tax exemptions must comply with 12A and 80G requirements including annual filings with income tax department."
    },
    {
      question: "Can a Society engage in commercial activities and generate profits?",
      answer: "Societies can engage in commercial activities if permitted by their memorandum and rules, but profits cannot be distributed to members. All surplus must be used for society's objectives only. Commercial activities should be incidental to main charitable/social objectives. For primarily commercial activities, other business structures like companies are more appropriate."
    },
    {
      question: "How does Society differ from Trust and Section 8 Company?",
      answer: "Society has democratic membership structure with voting rights, while Trust is managed by trustees for beneficiaries. Section 8 Company has corporate governance with directors but no democratic membership. Society is governed by state acts, Trust by Trust Acts, and Section 8 by Companies Act. Each has different governance, compliance, and operational characteristics suitable for different organizational needs."
    }
  ];

  const successStories = [
    {
      industry: "Healthcare Society",
      challenge: "Medical professionals needed structure for community healthcare programs and free medical camps",
      solution: "Registered charitable society with 12A and 80G tax exemptions for enhanced donation benefits",
      outcome: "Organized 200+ medical camps serving 50,000+ patients with ₹1+ crore in donations",
      timeline: "25 days registration",
      text: "Society registration enabled our medical team to formalize community service with proper governance. The tax exemption benefits significantly boosted donations for our healthcare programs."
    },
    {
      industry: "Educational Society",
      challenge: "Educators required legal structure for educational institution and scholarship programs",
      solution: "Established educational society with democratic governance and government recognition",
      outcome: "Founded school serving 500+ students with government grants and CSR funding",
      timeline: "30 days complete setup",
      text: "The society structure provided the perfect framework for our educational mission. Democratic governance ensured transparency while government recognition opened funding opportunities."
    },
    {
      industry: "Cultural Society",
      challenge: "Artists needed organized platform for cultural preservation and community events",
      solution: "Formed cultural society with broad membership base and flexible activity scope",
      outcome: "Organized 50+ cultural events preserving local heritage with 1000+ members",
      timeline: "20 days registration",
      text: "Society registration gave our cultural group the legal recognition needed for event organization and funding. The democratic structure keeps all artists engaged in decision-making."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" data-testid="society-registration-page">
      <SEO 
        title="Society Registration in India | Charitable, Professional & Cultural Societies | Expert Legal Services"
        description="Register Society in India with expert legal assistance. Complete support for charitable, professional & cultural society formation, democratic governance, and compliance management."
        canonicalUrl="/services/society-registration"
      />

      {/* Hero Section */}
      <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200" data-testid="service-badge">
                <Users className="w-4 h-4 mr-1" />
                Society Registration
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight" data-testid="main-heading">
                Society Registration in India
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed" data-testid="main-description">
                Register Society with democratic governance structure for charitable, professional, and cultural activities. 
                Expert assistance for memorandum drafting, member management, and ongoing compliance for sustainable social impact.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all" data-testid="cta-button-hero">
                      Register Your Society
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
                  <span>15-30 day registration</span>
                </div>
                <div className="flex items-center space-x-2" data-testid="stat-members">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Minimum 7 members</span>
                </div>
                <div className="flex items-center space-x-2" data-testid="stat-governance">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Democratic governance</span>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 shadow-lg">
                <Users className="w-32 h-32 text-blue-600 mx-auto" />
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
              Society Registration Challenges We Solve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Overcome organizational complexity with democratic society structure designed for member-driven social and professional activities.
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
              Complete Society Formation & Management Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for professional society registration, democratic governance setup, and ongoing compliance management.
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

      {/* Society Types Section */}
      <section id="society-types" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-types">
              Types of Societies You Can Register
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the society type that best fits your objectives and activities for maximum impact and legal compliance.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4" data-testid="disclaimer-notice">
              <p className="text-sm text-blue-800"><strong>Important:</strong> Society registration is governed by state-specific Societies Registration Acts. Requirements, procedures, and compliance may vary by state registrar.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {societyTypes.map((society, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 h-full border-2 hover:border-blue-300" data-testid={`society-type-${index}`}>
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <HeartHandshake className="w-12 h-12 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{society.type}</h3>
                    <p className="text-gray-600 text-sm mb-4">{society.description}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Examples:</h4>
                    <ul className="space-y-1">
                      {society.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex} className="flex items-center space-x-2 text-sm" data-testid={`society-example-${index}-${exampleIndex}`}>
                          <CheckCircle className="w-3 h-3 text-blue-600 flex-shrink-0" />
                          <span className="text-gray-700">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4 flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                    <ul className="space-y-1">
                      {society.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center space-x-2 text-sm" data-testid={`society-benefit-${index}-${benefitIndex}`}>
                          <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Governance:</h4>
                    <p className="text-sm text-gray-600">{society.governance}</p>
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
              How Society Registration Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple 4-step process to register your society with democratic governance and complete legal compliance.
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

      {/* Society Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-features">
              Society Features & Governance Structure
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understand the democratic features and governance characteristics of registered societies in India.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {societyFeatures.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-blue-500" data-testid={`society-feature-${index}`}>
                <CardContent className="p-0">
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">{feature.feature}</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-blue-700 text-sm mb-1">Structure</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-700 text-sm mb-1">Benefit</h4>
                        <p className="text-sm text-gray-600">{feature.benefit}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-700 text-sm mb-1">Governance</h4>
                        <p className="text-sm text-gray-600">{feature.governance}</p>
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-documents">
              Document Requirements for Society Registration
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete checklist of documents required for society formation and member registration process.
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

      {/* Compliance Requirements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-compliance">
              Society Compliance Requirements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understand the ongoing compliance obligations for registered societies in India for sustained operations.
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
              Society Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how organizations have leveraged society structure for democratic governance and sustainable social impact.
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
              Get answers to common questions about society registration and compliance in India.
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
            Ready to Register Your Society?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get expert assistance for society registration with democratic governance setup. Start your social impact journey with proper legal foundation and member engagement.
          </p>
          <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all" data-testid="cta-button-final">
                Start Society Registration
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