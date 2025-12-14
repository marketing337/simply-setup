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
  HandHeart,
  Users,
  Scale,
  Target,
  AlertTriangle,
  Building,
  BookOpen,
  TrendingUp,
  ArrowRight,
  Award,
  Landmark,
  Globe,
  CheckSquare
} from "lucide-react";

export default function TrustRegistrationPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Complex Trust Deed Drafting Requirements",
      solution: "Expert legal drafting with clause-wise customization for specific trust objectives and beneficiary protection"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Lengthy Registration and Documentation Process",
      solution: "Streamlined filing with Registrar of Societies and income tax department with end-to-end processing"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      problem: "Tax Exemption and Compliance Confusion",
      solution: "Complete guidance on 12A, 80G registrations and ongoing compliance requirements for charitable trusts"
    },
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Trustee Liability and Governance Issues",
      solution: "Comprehensive trustee protection through proper governance structure and legal safeguards"
    }
  ];

  const keyBenefits = [
    {
      icon: <HandHeart className="w-8 h-8 text-rose-600" />,
      title: "Complete Trust Formation Services",
      description: "End-to-end trust registration covering charitable, religious, educational, and welfare purposes with legal compliance",
      features: ["Trust deed preparation", "Registrar filing", "PAN/TAN applications", "Opening trust bank account"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Tax Exemption Setup",
      description: "Complete assistance for 12A and 80G tax exemption registrations to maximize donor benefits and trust savings",
      features: ["12A income tax exemption", "80G donor tax benefits", "FCRA registration support", "Annual compliance filing"]
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Trustee Protection & Governance",
      description: "Robust governance framework with trustee protection and clear succession planning for sustainable operations",
      features: ["Trustee indemnity clauses", "Power distribution framework", "Succession planning", "Conflict resolution mechanisms"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      title: "Ongoing Compliance Support",
      description: "Comprehensive compliance management including annual filings, audit requirements, and regulatory updates",
      features: ["Annual return filing", "Audit compliance", "Regulatory notifications", "Amendment support"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: "Trust Objectives & Structure Planning",
      description: "Define charitable objectives, identify trustees, beneficiaries, and determine optimal trust structure for your social cause."
    },
    {
      step: "2", 
      icon: <FileText className="w-8 h-8 text-green-600" />,
      title: "Trust Deed Drafting & Legal Review",
      description: "Comprehensive trust deed preparation with protective clauses, governance framework, and compliance requirements."
    },
    {
      step: "3",
      icon: <Landmark className="w-8 h-8 text-purple-600" />,
      title: "Registration & Government Filing",
      description: "Submit applications to Registrar of Societies, obtain registration certificate, and complete all statutory filings."
    },
    {
      step: "4",
      icon: <Award className="w-8 h-8 text-orange-600" />,
      title: "Tax Exemptions & Bank Account Setup",
      description: "Apply for 12A and 80G tax exemptions, open trust bank account, and establish operational infrastructure."
    }
  ];

  const documentRequirements = [
    {
      category: "Trustee Documents",
      timeline: "Required at filing",
      documents: ["PAN cards of all trustees", "Address proof of trustees", "Identity proof (Aadhaar/Passport)", "Trustee consent letters", "Trustee photographs"]
    },
    {
      category: "Trust Formation Documents", 
      timeline: "Foundation stage",
      documents: ["Trust deed (minimum 3 copies)", "Trust registration application", "Property documents (if any)", "Initial corpus proof", "Object clause details"]
    },
    {
      category: "Compliance Documents",
      timeline: "Post-registration",
      documents: ["Trust registration certificate", "PAN/TAN certificates", "Bank account opening documents", "12A/80G application forms", "Annual filing documents"]
    }
  ];

  const trustTypes = [
    {
      type: "Public Charitable Trust",
      description: "For charitable activities benefiting general public",
      minTrustees: "Minimum 3 trustees",
      corpus: "₹1,00,000+",
      timeline: "25-30 days",
      benefits: ["12A tax exemption", "80G donor benefits", "Public recognition", "Government grant access"],
      suitability: "Healthcare, education, poverty alleviation, disaster relief, environmental protection"
    },
    {
      type: "Private Trust", 
      description: "For specific beneficiaries or limited purposes",
      minTrustees: "Minimum 2 trustees",
      corpus: "₹50,000+",
      timeline: "20-25 days", 
      benefits: ["Asset protection", "Estate planning", "Tax optimization", "Succession planning"],
      suitability: "Family wealth management, educational funds, religious purposes, maintenance of dependents"
    },
    {
      type: "Religious Trust",
      description: "For religious and spiritual activities",
      minTrustees: "Minimum 3 trustees",
      corpus: "₹75,000+",
      timeline: "20-30 days",
      benefits: ["Religious tax exemptions", "Community support", "Heritage protection", "Spiritual activities"],
      suitability: "Temple management, religious education, spiritual welfare, religious literature, pilgrimage support"
    }
  ];

  const complianceRequirements = [
    {
      title: "Annual Return Filing",
      frequency: "Annually",
      deadline: "30th September",
      description: "Submit annual activities report and financial statements to Registrar"
    },
    {
      title: "Income Tax Filing",
      frequency: "Annually", 
      deadline: "31st October",
      description: "File IT returns and maintain 12A/80G compliance with detailed activity reports"
    },
    {
      title: "Audit Requirements",
      frequency: "Annually",
      deadline: "As applicable",
      description: "Statutory audit if income exceeds ₹25 lakhs or as required by trust deed"
    },
    {
      title: "Foreign Contribution Reporting",
      frequency: "As applicable",
      deadline: "Within 30 days",
      description: "FCRA compliance for trusts receiving foreign donations with quarterly reporting"
    }
  ];

  const faqs = [
    {
      question: "What is the difference between a Trust and a Society?",
      answer: "A Trust is formed through a trust deed and registered under Indian Trust Act, focusing on specific objectives with trustees managing assets for beneficiaries. A Society is formed under Societies Registration Act with members, governing body, and democratic decision-making. Trusts offer more control to trustees while Societies have broader membership involvement."
    },
    {
      question: "What documents are required for Trust registration in India?",
      answer: "Required documents include trust deed, trustees' PAN cards and address proofs, consent letters from trustees, identity proofs, property documents (if any), initial corpus proof, and trust registration application. Additional documents may be required based on trust objectives and state-specific requirements."
    },
    {
      question: "How long does Trust registration take and what are the costs?",
      answer: "Trust registration typically takes 20-30 days depending on state registrar efficiency and document completeness. Costs include stamp duty (₹500-₹1,000), registration fees (₹500-₹2,000), legal drafting charges (₹5,000-₹15,000), and professional assistance fees. Total costs range from ₹8,000-₹25,000."
    },
    {
      question: "Can a Trust be converted to other legal structures?",
      answer: "Yes, with proper legal procedures. Trusts can be converted to Societies or Section 8 Companies through dissolution and reformation, though it requires trustee consent, beneficiary approval, and compliance with conversion regulations. Asset transfer and tax implications must be carefully managed during conversion."
    },
    {
      question: "What are 12A and 80G registrations and how do they benefit Trusts?",
      answer: "12A registration provides income tax exemption to trusts under sections 11-12 of Income Tax Act, valid for 5 years. 80G registration allows donors to claim 50% tax deduction on donations to the trust. Both registrations significantly enhance trust credibility, encourage donations, and reduce tax burden."
    },
    {
      question: "Can foreign nationals be trustees of an Indian Trust?",
      answer: "Yes, foreign nationals can be trustees but with restrictions. They cannot hold majority control in charitable trusts and require RBI approval for certain activities. For receiving foreign contributions, FCRA registration is mandatory. Compliance with FEMA regulations and reporting requirements is essential for foreign trustee involvement."
    }
  ];

  const successStories = [
    {
      industry: "Education Trust",
      challenge: "Rural education initiative needed legal structure for scholarship programs",
      solution: "Established public charitable trust with 12A and 80G registrations for donor tax benefits",
      outcome: "Successfully funded 500+ students with ₹2+ crores in donations",
      timeline: "25 days registration",
      text: "The trust registration process was seamless. Our educational trust now operates efficiently with proper tax exemptions, enabling us to maximize scholarship funding for underprivileged students."
    },
    {
      industry: "Healthcare Trust", 
      challenge: "Medical professionals needed structure for free healthcare services",
      solution: "Registered healthcare trust with FCRA approval for international medical aid",
      outcome: "Established 3 free clinics serving 10,000+ patients annually",
      timeline: "30 days complete setup",
      text: "Expert guidance helped us navigate complex healthcare trust regulations. We now receive international funding and provide quality healthcare to rural communities with full legal compliance."
    },
    {
      industry: "Religious Trust",
      challenge: "Temple management needed formal structure for donations and maintenance",
      solution: "Formed religious trust with transparent governance and tax exemption setup",
      outcome: "Increased donations by 300% with proper financial management",
      timeline: "22 days registration",
      text: "Professional trust registration service helped establish transparent temple management. Devotees now contribute confidently knowing their donations are tax-deductible and properly utilized."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" data-testid="trust-registration-page">
      <SEO 
        title="Trust Registration in India | Charitable, Religious & Private Trusts | Expert Legal Services"
        description="Register your Trust in India with expert legal assistance. Complete support for charitable, religious & private trust formation, 12A/80G tax exemptions, and ongoing compliance."
        canonicalUrl="/services/trust-registration"
      />

      {/* Hero Section */}
      <section className="py-8 md:py-16 bg-gradient-to-br from-rose-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Badge className="mb-4 bg-rose-100 text-rose-800 hover:bg-rose-200" data-testid="service-badge">
                <HandHeart className="w-4 h-4 mr-1" />
                Trust Registration
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight" data-testid="main-heading">
                Trust Registration in India
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed" data-testid="main-description">
                Register your charitable, religious, or private trust with complete legal compliance. Expert assistance for trust deed drafting, 
                12A, 80G tax exemptions, and ongoing compliance management for social impact organizations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all" data-testid="cta-button-hero">
                      Register Your Trust
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
                  <span>20-30 day registration</span>
                </div>
                <div className="flex items-center space-x-2" data-testid="stat-exemption">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>12A & 80G tax exemptions</span>
                </div>
                <div className="flex items-center space-x-2" data-testid="stat-compliance">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Full compliance support</span>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="bg-gradient-to-br from-rose-100 to-rose-200 rounded-2xl p-8 shadow-lg">
                <HandHeart className="w-32 h-32 text-rose-600 mx-auto" />
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
              Trust Registration Challenges We Solve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simplify your trust formation with expert legal guidance and comprehensive compliance support for sustainable social impact.
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
              Complete Trust Formation & Compliance Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for professional trust registration, tax exemptions, and ongoing legal compliance management.
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

      {/* Trust Types Comparison Section */}
      <section id="trust-types" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-types">
              Choose Your Trust Structure
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare charitable, private, and religious trust structures to select the best fit for your objectives and beneficiaries.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4" data-testid="disclaimer-notice">
              <p className="text-sm text-blue-800"><strong>Important:</strong> Trust laws, stamp duty, and registration procedures vary by state. Corpus requirements and timelines may differ based on state registrar and trust objectives.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {trustTypes.map((trust, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 h-full border-2 hover:border-rose-300" data-testid={`trust-type-${index}`}>
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <HandHeart className="w-12 h-12 text-rose-600" />
                      <Badge variant="outline" className="text-sm">{trust.timeline}</Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{trust.type}</h3>
                    <p className="text-gray-600 text-sm mb-4">{trust.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">Trustees:</span>
                      <p className="text-gray-600">{trust.minTrustees}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Corpus:</span>
                      <p className="text-gray-600">{trust.corpus}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Best For:</h4>
                    <p className="text-sm text-gray-600">{trust.suitability}</p>
                  </div>
                  
                  <div className="mb-4 flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                    <ul className="space-y-1">
                      {trust.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center space-x-2 text-sm" data-testid={`trust-benefit-${index}-${benefitIndex}`}>
                          <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
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

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-process">
              How Trust Registration Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple 4-step process to register your trust with complete legal compliance and tax exemption setup.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="p-6 text-center border-0 shadow-lg hover:shadow-xl transition-shadow" data-testid={`process-step-${index}`}>
                <CardContent className="p-0">
                  <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="bg-rose-600 text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4">
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
              Document Requirements for Trust Registration
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete checklist of documents required at each stage of trust formation and registration process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {documentRequirements.map((category, index) => (
              <Card key={index} className="p-6 border-t-4 border-rose-500 shadow-lg hover:shadow-xl transition-shadow" data-testid={`document-category-${index}`}>
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl font-bold text-gray-900">{category.category}</CardTitle>
                  <Badge variant="outline" className="w-fit text-sm text-rose-600">{category.timeline}</Badge>
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
              Ongoing Compliance Requirements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understand the compliance obligations for registered trusts in India to maintain legal standing and tax benefits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceRequirements.map((compliance, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-rose-500" data-testid={`compliance-${index}`}>
                <CardContent className="p-0">
                  <div className="mb-4">
                    <Scale className="w-8 h-8 text-rose-600 mb-3" />
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
              Trust Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our expert trust registration services have enabled organizations to achieve their social impact goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="p-6 border-t-4 border-rose-500 shadow-lg hover:shadow-xl transition-shadow" data-testid={`success-story-${index}`}>
                <CardContent className="p-0">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-rose-100 text-rose-800">{story.industry}</Badge>
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
                  
                  <blockquote className="italic text-sm text-gray-700 border-l-2 border-rose-500 pl-3">
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
              Get answers to common questions about trust registration and compliance in India.
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
      <section className="py-20 bg-gradient-to-r from-rose-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6" data-testid="cta-heading">
            Ready to Register Your Trust?
          </h2>
          <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
            Get expert assistance for trust registration with complete compliance setup. Start making your social impact today with proper legal foundation.
          </p>
          <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-white text-rose-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all" data-testid="cta-button-final">
                Start Trust Registration
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