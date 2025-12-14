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
  Rocket,
  Zap
} from "lucide-react";

export default function StartupIndiaRegistrationPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Scale className="w-6 h-6 text-red-500" />,
      problem: "Complex DPIIT Recognition Process",
      solution: "Streamlined DPIIT recognition with expert guidance on eligibility criteria, documentation, and compliance requirements"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Extensive Innovation and Scalability Documentation",
      solution: "Professional business plan preparation demonstrating innovation, scalability, and job creation potential"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-red-500" />,
      problem: "Tax Benefit Optimization and Compliance",
      solution: "Complete tax exemption setup under Section 80-IAC with three-year benefit planning and ongoing compliance"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Time-Sensitive Application and Documentation",
      solution: "Fast-track application process meeting DPIIT deadlines with comprehensive document preparation and submission"
    }
  ];

  const keyBenefits = [
    {
      icon: <IndianRupee className="w-8 h-8 text-green-600" />,
      title: "Tax Exemptions & Financial Benefits",
      description: "Access comprehensive tax benefits including 3-year income tax exemption under Section 80-IAC and startup-friendly compliance",
      features: ["3-year income tax exemption", "Angel tax exemption", "Reduced patent fees", "Self-certification for labor laws"]
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Fast-Track Government Support",
      description: "Accelerated processes for startup-related government applications and simplified regulatory compliance",
      features: ["Fast-track patent examination", "Simplified IPR process", "Single window clearance", "Government tender benefits"]
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: "DPIIT Recognition & Credibility",
      description: "Official government recognition enhancing credibility with investors, banks, and business partners",
      features: ["Government recognition certificate", "Startup India logo usage", "Investor networking access", "International market support"]
    },
    {
      icon: <Rocket className="w-8 h-8 text-orange-600" />,
      title: "Funding & Growth Support",
      description: "Enhanced access to government funding schemes, incubation programs, and investor networks",
      features: ["Fund of Funds access", "Government scheme eligibility", "Incubator network access", "Mentorship programs"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      icon: <Building className="w-8 h-8 text-blue-600" />,
      title: "Entity Incorporation & Documentation",
      description: "Incorporate business as private limited company, LLP, or partnership with proper legal structure and documentation."
    },
    {
      step: "2", 
      icon: <Lightbulb className="w-8 h-8 text-green-600" />,
      title: "Innovation & Business Plan Preparation",
      description: "Develop comprehensive business plan demonstrating innovation, scalability, job creation potential, and market viability."
    },
    {
      step: "3",
      icon: <FileText className="w-8 h-8 text-purple-600" />,
      title: "DPIIT Application & Submission",
      description: "Complete online application on Startup India portal with all required documents and innovation certification."
    },
    {
      step: "4",
      icon: <Award className="w-8 h-8 text-orange-600" />,
      title: "Recognition & Benefits Activation",
      description: "Receive DPIIT recognition certificate and activate tax exemptions, compliance benefits, and government support."
    }
  ];

  const documentRequirements = [
    {
      category: "Entity Documents",
      timeline: "At incorporation",
      documents: ["Certificate of Incorporation", "Memorandum & Articles of Association", "PAN and TAN certificates", "DIN certificates for directors", "Registered office address proof"]
    },
    {
      category: "Business Documentation", 
      timeline: "For DPIIT application",
      documents: ["Detailed business plan", "Innovation description", "Scalability analysis", "Job creation potential", "Market research and analysis"]
    },
    {
      category: "Compliance & Certification",
      timeline: "Post-recognition",
      documents: ["DPIIT recognition certificate", "Section 80-IAC tax exemption application", "Self-certification for labor compliance", "Patent application (if applicable)", "Annual compliance reports"]
    }
  ];

  const eligibilityRequirements = [
    {
      criteria: "Entity Type",
      description: "Must be incorporated as Private Limited Company, Partnership Firm, or Limited Liability Partnership",
      details: "Entity should be legally constituted in India with proper incorporation documents and compliance"
    },
    {
      criteria: "Innovation Factor",
      description: "Business should involve innovation, development, or improvement of products/processes/services",
      details: "Clear innovation element with potential for commercialization and scalability in the market"
    },
    {
      criteria: "Incorporation Period",
      description: "Entity should not be older than 10 years from the date of incorporation",
      details: "Recent incorporation ensures startup characteristics and growth potential"
    },
    {
      criteria: "Annual Turnover",
      description: "Annual turnover should not exceed ₹100 crores in any financial year since incorporation",
      details: "Turnover limit ensures focus on growing startups rather than established businesses"
    },
    {
      criteria: "Original Entity", 
      description: "Should not be formed by splitting up or reconstruction of existing business",
      details: "Genuine new business formation rather than restructuring of existing operations"
    },
    {
      criteria: "Job Creation Potential",
      description: "Business should have potential for wealth and employment generation",
      details: "Clear business model demonstrating scalability and economic impact potential"
    }
  ];

  const taxBenefits = [
    {
      benefit: "Income Tax Exemption",
      section: "Section 80-IAC",
      duration: "3 consecutive years",
      description: "100% income tax exemption for three consecutive financial years out of first 10 years",
      conditions: "Subject to DPIIT recognition and annual turnover not exceeding ₹100 crores"
    },
    {
      benefit: "Angel Tax Exemption",
      section: "Section 56(2)(viib)",
      duration: "Throughout operation",
      description: "Exemption from angel tax on funding received from angel investors and venture capital funds",
      conditions: "With proper valuation and DPIIT recognition certificate"
    },
    {
      benefit: "Patent Fee Reduction",
      section: "Patent Rules",
      duration: "Throughout patent process",
      description: "80% reduction in patent filing fees for startups compared to standard fees",
      conditions: "Valid DPIIT recognition and compliance with patent office requirements"
    },
    {
      benefit: "Self-Certification",
      section: "Labor Laws",
      duration: "First 3 years",
      description: "Self-certification for labor law compliance for first 3 years of operation",
      conditions: "Subject to specific labor law provisions and employee count limits"
    }
  ];

  const startupTypes = [
    {
      type: "Technology Startups",
      description: "Software, apps, AI, blockchain, and technology-driven innovation companies",
      examples: ["Software platforms", "Mobile applications", "AI/ML solutions", "Blockchain platforms"],
      benefits: ["IPR fast-track", "Tech incubator access", "Digital India benefits", "Export promotion"],
      growth: "High scalability with global market potential and technology commercialization"
    },
    {
      type: "Manufacturing Startups",
      description: "Product manufacturing, innovation in production processes, and industrial solutions",
      examples: ["Product manufacturing", "Industrial automation", "Green technology", "Medical devices"],
      benefits: ["Make in India support", "Manufacturing incentives", "Export facilitation", "Quality certification"],
      growth: "Job creation potential with manufacturing ecosystem development"
    },
    {
      type: "Service Startups",
      description: "Innovative service delivery models, platforms, and service sector solutions",
      examples: ["Healthcare services", "Education platforms", "Logistics solutions", "Financial services"],
      benefits: ["Service export benefits", "Digital platform support", "Skill development", "Market access"],
      growth: "Scalable service models with employment generation and skill development"
    }
  ];

  const complianceRequirements = [
    {
      title: "Annual DPIIT Compliance",
      frequency: "Annually",
      deadline: "As per DPIIT guidelines",
      description: "Submit annual compliance report to DPIIT with business progress, employment data, and turnover details"
    },
    {
      title: "Tax Exemption Maintenance",
      frequency: "Annually", 
      deadline: "With ITR filing",
      description: "Maintain Section 80-IAC eligibility and file proper documentation for continued tax exemption benefits"
    },
    {
      title: "Entity Compliance",
      frequency: "As applicable",
      deadline: "Statutory deadlines",
      description: "Maintain corporate compliance including ROC filings, board meetings, and statutory audits as applicable"
    },
    {
      title: "IPR Maintenance",
      frequency: "As applicable",
      deadline: "Patent office timelines",
      description: "Maintain intellectual property rights including patent renewals and trademark compliance"
    }
  ];

  const faqs = [
    {
      question: "What is Startup India registration and who is eligible?",
      answer: "Startup India registration is DPIIT recognition for innovative startups providing tax benefits and government support. Eligibility includes: entity incorporated as Pvt Ltd/LLP/Partnership, not older than 10 years, annual turnover under ₹100 crores, innovation in products/services, and not formed by business splitting. The startup should demonstrate scalability and job creation potential."
    },
    {
      question: "What are the key benefits of Startup India recognition?",
      answer: "Key benefits include 3-year income tax exemption under Section 80-IAC, angel tax exemption, 80% reduction in patent fees, self-certification for labor laws, fast-track patent examination, government tender benefits, access to Fund of Funds, incubator networks, and official DPIIT recognition enhancing credibility with investors and partners."
    },
    {
      question: "How long does Startup India registration take and what are the costs?",
      answer: "DPIIT recognition typically takes 30-60 days after entity incorporation. Total costs include entity incorporation (₹15,000-₹30,000), business plan preparation (₹25,000-₹50,000), DPIIT application filing (₹10,000-₹20,000), and professional services (₹30,000-₹60,000). Total investment ranges from ₹80,000-₹1,60,000 depending on complexity."
    },
    {
      question: "What is Section 80-IAC tax exemption and how does it work?",
      answer: "Section 80-IAC provides 100% income tax exemption for 3 consecutive financial years out of first 10 years of operation. Startups can choose any 3 consecutive years when they start generating profits. The exemption applies to income from business operations, subject to annual turnover not exceeding ₹100 crores and maintaining DPIIT recognition."
    },
    {
      question: "Can existing companies apply for Startup India recognition?",
      answer: "Yes, existing companies can apply if they meet eligibility criteria: incorporated within last 10 years, annual turnover under ₹100 crores, innovation in products/services, and not formed by splitting existing business. However, the entity should demonstrate startup characteristics including innovation, scalability, and growth potential rather than established business operations."
    },
    {
      question: "What ongoing compliance is required after Startup India registration?",
      answer: "Ongoing compliance includes annual DPIIT reporting with business progress and employment data, maintaining Section 80-IAC eligibility for tax benefits, regular entity compliance (ROC filings, board meetings), and IPR maintenance if applicable. Startups must also ensure turnover remains under ₹100 crores and maintain innovation focus to retain recognition benefits."
    }
  ];

  const successStories = [
    {
      industry: "FinTech Startup",
      challenge: "Financial technology company needed tax optimization and government recognition for investor confidence",
      solution: "Obtained DPIIT recognition with Section 80-IAC tax exemption and angel tax exemption benefits",
      outcome: "Saved ₹50+ lakhs in taxes over 3 years, raised ₹10 crores with angel tax exemption",
      timeline: "45 days complete process",
      text: "Startup India recognition transformed our financial planning. The tax exemptions provided crucial runway for growth while government recognition enhanced investor confidence significantly."
    },
    {
      industry: "HealthTech Platform",
      challenge: "Healthcare innovation platform required IP protection and compliance simplification",
      solution: "Leveraged patent fee reduction and self-certification benefits with fast-track IP processing",
      outcome: "80% savings on patent costs, simplified compliance, successful IP portfolio development",
      timeline: "60 days with IP filing",
      text: "The patent fee reduction and fast-track processing were game-changers for our IP strategy. Self-certification simplified early operations allowing focus on product development."
    },
    {
      industry: "Manufacturing Startup",
      challenge: "Green technology manufacturer needed Make in India benefits and export support",
      solution: "Obtained recognition focusing on manufacturing innovation and job creation potential",
      outcome: "Accessed government schemes, created 100+ jobs, achieved ₹5 crore export revenue",
      timeline: "50 days including documentation",
      text: "Startup India recognition opened doors to government manufacturing schemes and export promotion. The credibility boost helped in securing major contracts and partnerships."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" data-testid="startup-india-registration-page">
      <SEO 
        title="Startup India Registration | DPIIT Recognition | 3-Year Tax Exemption | Government Benefits"
        description="Get Startup India registration with DPIIT recognition. Complete support for tax exemptions under Section 80-IAC, patent benefits, and government startup scheme access."
        canonicalUrl="/services/startup-india-registration"
      />

      {/* Hero Section */}
      <section className="py-8 md:py-16 bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200" data-testid="service-badge">
                <Rocket className="w-4 h-4 mr-1" />
                Startup India Registration
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight" data-testid="main-heading">
                Startup India Registration
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed" data-testid="main-description">
                Get DPIIT recognition for your innovative startup and unlock 3-year tax exemption, patent benefits, 
                and government support. Expert assistance for complete Startup India registration and compliance management.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all" data-testid="cta-button-hero">
                      Get DPIIT Recognition
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
                <div className="flex items-center space-x-2" data-testid="stat-tax-exemption">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>3-year tax exemption</span>
                </div>
                <div className="flex items-center space-x-2" data-testid="stat-timeline">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>30-60 day process</span>
                </div>
                <div className="flex items-center space-x-2" data-testid="stat-recognition">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Government recognition</span>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-8 shadow-lg">
                <Rocket className="w-32 h-32 text-orange-600 mx-auto" />
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
              Startup India Registration Challenges We Solve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Navigate complex DPIIT recognition process and unlock comprehensive government benefits for your innovative startup.
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
              Complete Startup India Registration Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for DPIIT recognition, tax exemption setup, and comprehensive government benefit activation.
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
              Startup India Eligibility Criteria
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understand the comprehensive eligibility requirements for DPIIT recognition and government startup benefits.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4" data-testid="eligibility-notice">
              <p className="text-sm text-orange-800"><strong>Important:</strong> All eligibility criteria must be met for DPIIT recognition. Innovation and scalability demonstration is crucial for approval.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eligibilityRequirements.map((requirement, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-orange-500" data-testid={`eligibility-${index}`}>
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

      {/* Tax Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-tax-benefits">
              Startup India Tax Benefits & Exemptions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tax benefits and exemptions available for DPIIT recognized startups in India.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {taxBenefits.map((benefit, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-green-300" data-testid={`tax-benefit-${index}`}>
                <CardContent className="p-0">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <IndianRupee className="w-8 h-8 text-green-600" />
                      <Badge className="bg-green-100 text-green-800">{benefit.duration}</Badge>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{benefit.benefit}</h3>
                    <p className="text-sm text-blue-600 font-medium mb-3">{benefit.section}</p>
                    <p className="text-gray-600 text-sm mb-4">{benefit.description}</p>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 mb-1">Conditions:</h4>
                    <p className="text-xs text-gray-700">{benefit.conditions}</p>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-process">
              How Startup India Registration Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple 4-step process to get DPIIT recognition and activate all startup benefits and government support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="p-6 text-center border-0 shadow-lg hover:shadow-xl transition-shadow" data-testid={`process-step-${index}`}>
                <CardContent className="p-0">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="bg-orange-600 text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4">
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

      {/* Startup Types Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-types">
              Types of Startups Eligible for Registration
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understand which types of innovative startups qualify for DPIIT recognition and government benefits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {startupTypes.map((startup, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 h-full border-2 hover:border-orange-300" data-testid={`startup-type-${index}`}>
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <Lightbulb className="w-12 h-12 text-orange-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{startup.type}</h3>
                    <p className="text-gray-600 text-sm mb-4">{startup.description}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Examples:</h4>
                    <ul className="space-y-1">
                      {startup.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex} className="flex items-center space-x-2 text-sm" data-testid={`startup-example-${index}-${exampleIndex}`}>
                          <CheckCircle className="w-3 h-3 text-orange-600 flex-shrink-0" />
                          <span className="text-gray-700">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                    <ul className="space-y-1">
                      {startup.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center space-x-2 text-sm" data-testid={`startup-benefit-${index}-${benefitIndex}`}>
                          <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Growth Potential:</h4>
                    <p className="text-sm text-gray-600">{startup.growth}</p>
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
              Document Requirements for Startup India Registration
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete checklist of documents required for DPIIT recognition and startup benefit activation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {documentRequirements.map((category, index) => (
              <Card key={index} className="p-6 border-t-4 border-orange-500 shadow-lg hover:shadow-xl transition-shadow" data-testid={`document-category-${index}`}>
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl font-bold text-gray-900">{category.category}</CardTitle>
                  <Badge variant="outline" className="w-fit text-sm text-orange-600">{category.timeline}</Badge>
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
              Startup India Compliance Requirements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understand the ongoing compliance obligations for maintaining DPIIT recognition and startup benefits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceRequirements.map((compliance, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-orange-500" data-testid={`compliance-${index}`}>
                <CardContent className="p-0">
                  <div className="mb-4">
                    <Scale className="w-8 h-8 text-orange-600 mb-3" />
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
              Startup India Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how innovative startups have leveraged DPIIT recognition for growth, funding, and market success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="p-6 border-t-4 border-orange-500 shadow-lg hover:shadow-xl transition-shadow" data-testid={`success-story-${index}`}>
                <CardContent className="p-0">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-orange-100 text-orange-800">{story.industry}</Badge>
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
                  
                  <blockquote className="italic text-sm text-gray-700 border-l-2 border-orange-500 pl-3">
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
              Get answers to common questions about Startup India registration and DPIIT recognition process.
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
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6" data-testid="cta-heading">
            Ready to Get Startup India Recognition?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Get expert assistance for DPIIT recognition and unlock 3-year tax exemption with comprehensive government benefits. Start your startup journey with proper legal foundation.
          </p>
          <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all" data-testid="cta-button-final">
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