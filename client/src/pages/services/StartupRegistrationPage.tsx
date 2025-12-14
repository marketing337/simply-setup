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
  Zap,
  Settings,
  User
} from "lucide-react";

export default function StartupRegistrationPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Building className="w-6 h-6 text-red-500" />,
      problem: "Confusion in Entity Selection for Startups",
      solution: "Expert guidance on choosing optimal business structure (Pvt Ltd, LLP, OPC) based on startup goals and future plans"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Complex Registration Process and Documentation",
      solution: "Streamlined registration with complete documentation support and fast-track incorporation services"
    },
    {
      icon: <Scale className="w-6 h-6 text-red-500" />,
      problem: "Post-Incorporation Compliance and Setup",
      solution: "Comprehensive compliance setup including bank account opening, PAN/TAN, GST, and operational framework"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-red-500" />,
      problem: "Growth Planning and Future Scalability",
      solution: "Scalable business structure design with growth planning, funding readiness, and expansion support"
    }
  ];

  const keyBenefits = [
    {
      icon: <Rocket className="w-8 h-8 text-blue-600" />,
      title: "Fast-Track Startup Incorporation",
      description: "Quick and efficient business registration with startup-friendly entity structures and streamlined processes",
      features: ["7-15 day incorporation", "Multiple entity options", "Digital documentation", "Fast-track processing"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Legal Protection & Compliance",
      description: "Complete legal protection with proper corporate governance and ongoing compliance management",
      features: ["Limited liability protection", "Corporate governance", "Compliance framework", "Legal documentation"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      title: "Growth & Funding Readiness",
      description: "Business structure designed for future growth, investment readiness, and scalability",
      features: ["Investor-friendly structure", "Equity management", "Growth planning", "Exit strategy preparation"]
    },
    {
      icon: <Settings className="w-8 h-8 text-orange-600" />,
      title: "Complete Business Setup",
      description: "End-to-end business setup including banking, compliance, and operational framework establishment",
      features: ["Bank account opening", "PAN/TAN/GST setup", "Operational compliance", "Business framework"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Entity Selection & Planning",
      description: "Choose optimal business structure based on startup goals, funding plans, and operational requirements."
    },
    {
      step: "2", 
      icon: <FileText className="w-8 h-8 text-green-600" />,
      title: "Documentation & Application",
      description: "Prepare comprehensive documentation and submit incorporation application with regulatory authorities."
    },
    {
      step: "3",
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: "Incorporation & Certification",
      description: "Obtain incorporation certificate, PAN/TAN, and complete legal entity establishment."
    },
    {
      step: "4",
      icon: <Settings className="w-8 h-8 text-orange-600" />,
      title: "Post-Incorporation Setup",
      description: "Complete business setup including banking, compliance framework, and operational readiness."
    }
  ];

  const entityComparison = [
    {
      entity: "Private Limited Company",
      suitability: "High-growth startups seeking funding and scalability",
      advantages: ["Limited liability", "Separate legal entity", "Easy funding", "Credibility with investors", "Perpetual succession"],
      disadvantages: ["Higher compliance", "Audit requirements", "More formalities", "Higher costs"],
      bestFor: "Startups planning to raise funding, scale rapidly, or go public",
      compliance: "ROC filings, board meetings, audit (if applicable), annual returns"
    },
    {
      entity: "Limited Liability Partnership (LLP)",
      suitability: "Professional services and partnership-based startups",
      advantages: ["Limited liability", "Flexible management", "Lower compliance", "Tax benefits", "Partnership flexibility"],
      disadvantages: ["Funding restrictions", "Limited growth options", "Partner dependency", "Less credibility"],
      bestFor: "Professional services, consulting, and partnership-based businesses",
      compliance: "Annual filings, agreement maintenance, designated partner compliance"
    },
    {
      entity: "One Person Company (OPC)",
      suitability: "Solo entrepreneurs and small-scale startups",
      advantages: ["Single person control", "Limited liability", "Lower compliance", "Easy management", "Corporate benefits"],
      disadvantages: ["Single member restriction", "Limited scalability", "Conversion requirements", "Nominee mandatory"],
      bestFor: "Individual entrepreneurs and small-scale innovative businesses",
      compliance: "Simplified filings, annual returns, statutory compliance"
    }
  ];

  const documentRequirements = [
    {
      category: "Promoter Documents",
      timeline: "At incorporation",
      documents: ["PAN cards of directors/partners", "Address proofs (residence)", "Identity proofs (Aadhar/Passport)", "Photographs", "Email IDs and mobile numbers"]
    },
    {
      category: "Business Documents", 
      timeline: "For registration",
      documents: ["Company/LLP name approval", "MOA & AOA/LLP Agreement", "Registered office documents", "Business activity details", "Digital signature certificates"]
    },
    {
      category: "Post-Incorporation Setup",
      timeline: "After incorporation",
      documents: ["Incorporation certificate", "PAN/TAN certificates", "Bank account opening", "GST registration", "Professional tax registration"]
    }
  ];

  const startupServices = [
    {
      service: "Entity Formation",
      description: "Complete business entity formation with optimal structure selection and registration",
      deliverables: ["Incorporation certificate", "MOA/AOA", "PAN/TAN", "DIN certificates", "Digital signatures"],
      timeline: "7-15 days",
      investment: "₹15,000 - ₹35,000"
    },
    {
      service: "Compliance Setup",
      description: "Comprehensive compliance framework establishment for ongoing business operations",
      deliverables: ["GST registration", "Professional tax", "ESI/PF setup", "Compliance calendar", "Statutory registers"],
      timeline: "5-10 days",
      investment: "₹10,000 - ₹25,000"
    },
    {
      service: "Banking & Finance",
      description: "Business banking setup with financial framework and accounting system establishment",
      deliverables: ["Current account opening", "Internet banking", "Payment gateway", "Accounting setup", "Financial planning"],
      timeline: "10-15 days",
      investment: "₹8,000 - ₹20,000"
    },
    {
      service: "Growth Planning",
      description: "Strategic business planning with growth roadmap and scalability framework",
      deliverables: ["Business plan", "Growth strategy", "Investor readiness", "Market analysis", "Financial projections"],
      timeline: "15-20 days",
      investment: "₹25,000 - ₹50,000"
    }
  ];

  const complianceRequirements = [
    {
      title: "Annual ROC Filings",
      frequency: "Annually",
      deadline: "30th November",
      description: "Submit annual return and financial statements to Registrar of Companies for corporate compliance"
    },
    {
      title: "Board Meetings",
      frequency: "Quarterly", 
      deadline: "As per AOA",
      description: "Conduct board meetings and maintain proper minutes for corporate governance and compliance"
    },
    {
      title: "Tax Compliance",
      frequency: "Monthly/Quarterly",
      deadline: "As applicable",
      description: "File income tax returns, GST returns, and maintain proper books of accounts and financial records"
    },
    {
      title: "Statutory Audit",
      frequency: "Annually",
      deadline: "If applicable",
      description: "Conduct statutory audit if turnover/investment exceeds prescribed limits and file audit reports"
    }
  ];

  const fundingReadiness = [
    {
      stage: "Seed Stage Preparation",
      focus: "Basic legal structure and documentation for early-stage funding",
      requirements: ["Clean incorporation", "IP assignment", "Founder agreements", "Cap table setup", "Basic governance"],
      timeline: "1-2 months post-incorporation",
      fundingRange: "₹25 lakhs - ₹2 crores"
    },
    {
      stage: "Series A Readiness",
      focus: "Institutional investor readiness with comprehensive legal and financial framework",
      requirements: ["Board structure", "Employee stock options", "Compliance track record", "Financial systems", "Legal due diligence readiness"],
      timeline: "6-12 months post-incorporation",
      fundingRange: "₹2 crores - ₹15 crores"
    },
    {
      stage: "Growth Stage Preparation",
      focus: "Scalability framework for large investments and rapid expansion",
      requirements: ["Advanced governance", "Audit infrastructure", "Multi-entity structure", "International readiness", "Exit strategy planning"],
      timeline: "18+ months post-incorporation",
      fundingRange: "₹15 crores+"
    }
  ];

  const faqs = [
    {
      question: "Which entity type is best for my startup and how do I choose?",
      answer: "Entity choice depends on your startup goals, funding plans, and operational needs. Private Limited Company is best for high-growth startups seeking funding with investor credibility and unlimited scalability. LLP suits professional services and partnership businesses with flexibility and lower compliance. OPC is ideal for solo entrepreneurs and small-scale businesses with single-person control and simplified operations."
    },
    {
      question: "How long does startup registration take and what are the total costs?",
      answer: "Startup registration typically takes 7-15 days for entity incorporation plus additional time for complete setup. Total costs vary by entity type: Private Limited (₹15,000-₹35,000), LLP (₹10,000-₹25,000), OPC (₹12,000-₹28,000). Additional costs include compliance setup (₹10,000-₹25,000), banking setup (₹8,000-₹20,000), and professional services fees."
    },
    {
      question: "What post-incorporation steps are essential for startup operations?",
      answer: "Essential post-incorporation steps include obtaining PAN/TAN certificates, opening business bank account, GST registration (if applicable), professional tax registration, setting up accounting systems, creating compliance calendar, obtaining necessary licenses/permits, and establishing operational framework. Complete setup typically takes 2-4 weeks after incorporation."
    },
    {
      question: "How do I prepare my startup for future funding and investment?",
      answer: "Funding readiness involves clean legal structure, proper incorporation documents, founder agreements, IP assignment to company, cap table management, compliance track record, financial systems, and governance framework. Start with basic legal hygiene at incorporation and progressively build investor-grade documentation and processes as you grow."
    },
    {
      question: "What ongoing compliance is required after startup registration?",
      answer: "Ongoing compliance includes annual ROC filings (annual return, financial statements), regular board meetings and minutes, monthly/quarterly tax returns (income tax, GST), maintaining statutory registers and books, audit requirements (if applicable), and renewal of registrations. Compliance requirements vary by entity type and business scale."
    },
    {
      question: "Can I convert my startup entity type later and what are the implications?",
      answer: "Yes, entity conversion is possible but involves legal, tax, and operational implications. Private Limited can convert to LLP (subject to conditions), OPC can convert to Private Limited (voluntary or mandatory), and LLP can convert to Private Limited. Each conversion has specific procedures, costs, tax implications, and compliance requirements that should be planned carefully."
    }
  ];

  const successStories = [
    {
      industry: "EdTech Startup",
      challenge: "Education technology platform needed investor-ready structure for rapid scaling and funding",
      solution: "Incorporated as Private Limited Company with comprehensive compliance and funding readiness setup",
      outcome: "Raised ₹5 crores Series A funding within 18 months of incorporation",
      timeline: "12 days incorporation + 30 days complete setup",
      text: "The investor-ready structure from day one made our funding journey seamless. Proper documentation and compliance track record gave investors confidence in our business."
    },
    {
      industry: "FinTech Startup",
      challenge: "Financial services startup required regulatory compliance and banking partnerships",
      solution: "Established Private Limited with specialized compliance framework and regulatory readiness",
      outcome: "Secured banking partnerships and regulatory approvals for financial services",
      timeline: "15 days incorporation + 45 days compliance setup",
      text: "The comprehensive compliance framework helped us navigate regulatory requirements and establish crucial banking partnerships for our financial services platform."
    },
    {
      industry: "Healthcare Startup",
      challenge: "Healthcare innovation platform needed IP protection and professional credibility",
      solution: "Incorporated with IP assignment framework and professional healthcare compliance",
      outcome: "Successfully protected 5 patents and partnered with leading hospitals",
      timeline: "10 days incorporation + 20 days IP setup",
      text: "The IP protection framework from incorporation helped us secure our innovations and build credibility with healthcare partners and investors."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" data-testid="startup-registration-page">
      <SEO 
        title="Startup Registration in India | Company Formation for Startups | Business Entity Setup"
        description="Register your startup in India with optimal entity selection. Complete support for Private Limited, LLP, OPC registration with funding readiness and growth planning."
        canonicalUrl="/services/startup-registration"
      />

      {/* Hero Section */}
      <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200" data-testid="service-badge">
                <Rocket className="w-4 h-4 mr-1" />
                Startup Registration
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight" data-testid="main-heading">
                Startup Registration in India
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed" data-testid="main-description">
                Register your startup with optimal business structure for growth and funding readiness. 
                Expert guidance on entity selection, complete incorporation, and scalable compliance framework.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all" data-testid="cta-button-hero">
                      Register Your Startup
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
                  <span>7-15 day incorporation</span>
                </div>
                <div className="flex items-center space-x-2" data-testid="stat-funding">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Funding ready structure</span>
                </div>
                <div className="flex items-center space-x-2" data-testid="stat-compliance">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Complete compliance</span>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 shadow-lg">
                <Rocket className="w-32 h-32 text-blue-600 mx-auto" />
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
              Startup Registration Challenges We Solve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Overcome startup incorporation complexities with expert entity selection and growth-focused business structure design.
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
              Complete Startup Registration Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for professional startup incorporation, compliance setup, and growth-ready business foundation.
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

      {/* Entity Comparison Section */}
      <section id="entity-comparison" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-entities">
              Startup Entity Types Comparison
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the optimal business structure for your startup based on growth plans, funding requirements, and operational needs.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4" data-testid="entity-guidance-notice">
              <p className="text-sm text-blue-800"><strong>Expert Tip:</strong> Entity selection impacts funding capability, compliance requirements, and future growth options. Choose based on your startup's specific goals and scaling plans.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {entityComparison.map((entity, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 h-full border-2 hover:border-blue-300" data-testid={`entity-type-${index}`}>
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <Building className="w-12 h-12 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{entity.entity}</h3>
                    <p className="text-gray-600 text-sm mb-4">{entity.suitability}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Advantages:</h4>
                    <ul className="space-y-1">
                      {entity.advantages.map((advantage, advIndex) => (
                        <li key={advIndex} className="flex items-center space-x-2 text-sm" data-testid={`entity-advantage-${index}-${advIndex}`}>
                          <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Considerations:</h4>
                    <ul className="space-y-1">
                      {entity.disadvantages.map((disadvantage, disIndex) => (
                        <li key={disIndex} className="flex items-center space-x-2 text-sm" data-testid={`entity-consideration-${index}-${disIndex}`}>
                          <AlertTriangle className="w-3 h-3 text-yellow-600 flex-shrink-0" />
                          <span className="text-gray-700">{disadvantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4 flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Best For:</h4>
                    <p className="text-sm text-gray-600 mb-3">{entity.bestFor}</p>
                    <h4 className="font-semibold text-gray-900 mb-2">Compliance:</h4>
                    <p className="text-xs text-gray-600">{entity.compliance}</p>
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
              How Startup Registration Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple 4-step process to register your startup with optimal structure and complete business setup.
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

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-services">
              Comprehensive Startup Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete startup setup services from entity formation to growth planning and operational readiness.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {startupServices.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500" data-testid={`startup-service-${index}`}>
                <CardContent className="p-0">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{service.service}</h3>
                      <Badge className="bg-blue-100 text-blue-800">{service.timeline}</Badge>
                    </div>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Deliverables:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {service.deliverables.map((deliverable, delIndex) => (
                        <div key={delIndex} className="flex items-center space-x-2" data-testid={`service-deliverable-${index}-${delIndex}`}>
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{deliverable}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">{service.investment}</span>
                    <span className="text-sm text-gray-500">Timeline: {service.timeline}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Funding Readiness Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-funding">
              Startup Funding Readiness Framework
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Progressive framework to prepare your startup for different funding stages and investor requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {fundingReadiness.map((stage, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 h-full border-t-4 border-t-green-500" data-testid={`funding-stage-${index}`}>
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <TrendingUp className="w-12 h-12 text-green-600" />
                      <Badge className="bg-green-100 text-green-800">{stage.timeline}</Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{stage.stage}</h3>
                    <p className="text-gray-600 text-sm mb-4">{stage.focus}</p>
                  </div>
                  
                  <div className="mb-4 flex-1">
                    <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
                    <ul className="space-y-2">
                      {stage.requirements.map((requirement, reqIndex) => (
                        <li key={reqIndex} className="flex items-center space-x-2 text-sm" data-testid={`funding-requirement-${index}-${reqIndex}`}>
                          <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-1">Funding Range:</h4>
                    <p className="text-lg font-bold text-green-600">{stage.fundingRange}</p>
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
              Document Requirements for Startup Registration
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete checklist of documents required for startup incorporation and business setup process.
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-compliance">
              Startup Compliance Requirements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understand the ongoing compliance obligations for maintaining startup operations and legal standing.
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-stories">
              Startup Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how entrepreneurs have built successful startups with proper legal foundation and growth-focused structure.
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-faq">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about startup registration and business entity formation in India.
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
            Ready to Register Your Startup?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get expert assistance for startup registration with optimal entity selection and growth-ready business foundation. Start your entrepreneurial journey with proper legal structure.
          </p>
          <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all" data-testid="cta-button-final">
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