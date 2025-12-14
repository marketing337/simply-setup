import { useState } from "react";
import SEO from "@/components/SEO";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Search,
  FileText,
  Clock,
  Scale,
  Shield,
  TrendingUp,
  Building,
  Copyright,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  IndianRupee,
  Users,
  Target,
  BookOpen,
  Award,
  Globe,
  UserCheck,
  DollarSign
} from "lucide-react";

export default function WordmarkRegistrationPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const heroStats = [
    { label: "Registration Timeline", value: "12-14 Months", subtext: "End-to-end process" },
    { label: "Application Fee", value: "₹4,500", subtext: "Online filing per class" },
    { label: "Protection Period", value: "10 Years", subtext: "Renewable indefinitely" },
    { label: "Nice Classification", value: "45 Classes", subtext: "Goods & services" }
  ];

  const painPoints = [
    {
      icon: <Search className="w-6 h-6 text-red-500" />,
      problem: "Complex Trademark Search and Similarity Assessment",
      solution: "Comprehensive trademark search across 45 classes with expert analysis of conflicting marks and distinctive character evaluation"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Intricate Application Filing and Classification Selection",
      solution: "Expert guidance on Nice Classification selection, Form TM-A preparation, and proper wordmark specification for maximum protection"
    },
    {
      icon: <Scale className="w-6 h-6 text-red-500" />,
      problem: "Examination Objections and Legal Response Preparation",
      solution: "Professional handling of examiner objections, legal argument drafting, and evidence submission to secure registration approval"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Lengthy Opposition Period and Registration Timeline",
      solution: "Proactive opposition monitoring, defense strategy preparation, and expedited processing options to accelerate registration"
    }
  ];

  const keyBenefits = [
    {
      icon: <Copyright className="w-8 h-8 text-blue-600" />,
      title: "Exclusive Brand Protection",
      description: "Secure exclusive rights to your wordmark nationwide with legal monopoly over text-based brand elements",
      features: ["Text-only protection", "Font-independent rights", "Nationwide exclusivity", "Infringement enforcement"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Legal Enforcement Powers",
      description: "Strong legal foundation for brand protection with criminal and civil remedies against infringement",
      features: ["Civil action rights", "Criminal remedies (counterfeiting)", "Damages recovery", "Injunctive relief"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      title: "Business Value Enhancement",
      description: "Increase brand valuation and market credibility with registered trademark status and licensing opportunities",
      features: ["Asset value creation", "Licensing revenue", "Market credibility", "Investment attraction"]
    },
    {
      icon: <Globe className="w-8 h-8 text-orange-600" />,
      title: "International Expansion Base",
      description: "Foundation for global brand protection through Madrid Protocol and foreign filing with priority claims",
      features: ["Priority claim rights", "Madrid Protocol access", "International filing", "Cross-border protection"]
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Comprehensive Trademark Search",
      description: "Conduct thorough search across IP India database and international databases to assess registration feasibility",
      timeline: "2-3 days",
      deliverables: ["Search report", "Conflict analysis", "Distinctiveness assessment", "Registration probability"],
      keyRequirements: "Clear wordmark specification and intended classes of goods/services"
    },
    {
      step: 2,
      title: "Application Strategy & Preparation",
      description: "Select appropriate Nice Classification classes and prepare Form TM-A with optimal wordmark specification",
      timeline: "3-5 days",
      deliverables: ["Class selection report", "Form TM-A preparation", "Wordmark specification", "Supporting documents"],
      keyRequirements: "Detailed business description and goods/services identification"
    },
    {
      step: 3,
      title: "Official Filing & Application Submission",
      description: "Submit application through IP India online portal with proper documentation and fee payment",
      timeline: "1-2 days",
      deliverables: ["Application number", "Filing receipt", "Fee payment proof", "Online tracking access"],
      keyRequirements: "All documents ready and applicant verification completed"
    },
    {
      step: 4,
      title: "Examination & Objection Response",
      description: "Handle examiner review, respond to objections, and provide additional evidence if required",
      timeline: "4-6 months",
      deliverables: ["Examination report", "Objection response", "Supporting evidence", "Legal arguments"],
      keyRequirements: "Prompt response to examination reports within 30-day deadline"
    },
    {
      step: 5,
      title: "Publication & Opposition Monitoring",
      description: "Monitor Trademark Journal publication and handle any opposition proceedings during 4-month window",
      timeline: "4-6 months",
      deliverables: ["Publication confirmation", "Opposition monitoring", "Defense preparation", "Opposition response"],
      keyRequirements: "Active monitoring and quick response to any opposition filed"
    },
    {
      step: 6,
      title: "Registration & Certificate Issuance",
      description: "Obtain final registration certificate and establish ongoing trademark maintenance schedule",
      timeline: "2-3 months",
      deliverables: ["Registration certificate", "® symbol usage rights", "Renewal calendar", "Protection summary"],
      keyRequirements: "Completion of all procedural requirements and clearance of opposition period"
    }
  ];

  const trademarkTypes = [
    {
      type: "Single Class Wordmark",
      description: "Protect your brand name in one specific Nice Classification class for focused business operations",
      features: ["One class protection", "₹4,500 filing fee", "Specific goods/services", "Targeted registration"],
      suitableFor: "Startups, single-product businesses, focused service providers",
      timeline: "12-14 months"
    },
    {
      type: "Multi-Class Wordmark",
      description: "Comprehensive protection across multiple classes for diversified business operations and expansion",
      features: ["Multiple class filing", "₹4,500 per class", "Broad protection", "Business expansion ready"],
      suitableFor: "Established businesses, product diversification, future expansion plans",
      timeline: "12-14 months"
    },
    {
      type: "Service Mark Registration",
      description: "Specific protection for service-based businesses using classes 35-45 of Nice Classification",
      features: ["Service-focused classes", "Classes 35-45", "Professional services", "Intangible offerings"],
      suitableFor: "Consultants, professionals, service providers, digital platforms",
      timeline: "12-14 months"
    },
    {
      type: "Collective Mark Registration",
      description: "Protect marks used by associations, cooperatives, and group organizations for member identification",
      features: ["Association use", "Group ownership", "Member identification", "Quality assurance"],
      suitableFor: "Trade associations, cooperatives, industry groups, certification bodies",
      timeline: "14-16 months"
    }
  ];

  const documentRequirements = [
    {
      category: "Applicant Information",
      documents: [
        "Complete application Form TM-A",
        "Identity proof (PAN card, Aadhaar card, passport)",
        "Address proof (utility bill, rental agreement)",
        "Business registration documents (if applicable)"
      ],
      description: "Basic applicant identification and address verification for registration"
    },
    {
      category: "Wordmark Specification",
      documents: [
        "Clear text specification of wordmark",
        "Clear text specification for e-filing",
        "Meaning and translation (if applicable)",
        "Transliteration for non-English words"
      ],
      description: "Precise wordmark definition and visual representation requirements"
    },
    {
      category: "Business & Classification",
      documents: [
        "Detailed description of goods/services",
        "Nice Classification class selection",
        "Business operation proof",
        "Use evidence (if mark already in use)"
      ],
      description: "Classification selection and business operation verification"
    },
    {
      category: "Legal & Authorization",
      documents: [
        "TM-48 authorization form (if using agent)",
        "Affidavit of use (if applicable)",
        "Priority documents (if claiming priority)",
        "User agreement for foreign applicants"
      ],
      description: "Legal authorization and representation documentation"
    }
  ];

  const eligibilityCriteria = [
    {
      criteria: "Distinctiveness Requirement",
      description: "Wordmark must be distinctive and capable of distinguishing goods/services from others",
      details: "Cannot be generic, descriptive, or common words without distinctiveness"
    },
    {
      criteria: "Non-Deceptive Nature",
      description: "Mark should not deceive or cause confusion about nature, quality, or geographical origin",
      details: "Must not mislead consumers about product characteristics or business origin"
    },
    {
      criteria: "Legal Compliance",
      description: "Compliance with Trade Marks Act 1999 and Rules 2017 provisions and restrictions",
      details: "Cannot violate public order, morality, or contain prohibited symbols/words"
    },
    {
      criteria: "Prior Rights Clearance",
      description: "No conflict with existing registered or pending trademarks in same/similar classes",
      details: "Must clear comprehensive search and not infringe existing trademark rights"
    },
    {
      criteria: "Applicant Standing",
      description: "Applicant must be person/entity using or intending to use the mark in business",
      details: "Individual, company, partnership, LLP, or other legal entity can apply"
    }
  ];

  const keyFeatures = [
    {
      feature: "Text-Only Protection",
      description: "Protects word/text regardless of font, size, color, or stylistic presentation",
      benefits: ["Font independence", "Format flexibility", "Styling variations", "Typography freedom"]
    },
    {
      feature: "Class-Based Registration",
      description: "Protection specific to selected Nice Classification classes for goods and services",
      benefits: ["Targeted protection", "Cost efficiency", "Clear scope", "Industry focus"]
    },
    {
      feature: "Renewable Protection",
      description: "10-year initial term with unlimited renewal options for continued brand protection",
      benefits: ["Long-term security", "Indefinite protection", "Investment preservation", "Legacy building"]
    },
    {
      feature: "Legal Enforceability",
      description: "Strong legal foundation for infringement action with civil and criminal remedies",
      benefits: ["Court enforcement", "Damages recovery", "Injunction rights", "Criminal remedies (counterfeiting)"]
    }
  ];

  const complianceRequirements = [
    {
      requirement: "Registration Maintenance",
      description: "Maintain active use and file renewal applications every 10 years",
      frequency: "Every 10 years",
      deadline: "Before expiry date",
      consequences: "Loss of trademark rights if not renewed"
    },
    {
      requirement: "Proper Usage",
      description: "Use registered trademark properly with ® symbol and maintain distinctive character",
      frequency: "Ongoing",
      deadline: "Continuous compliance",
      consequences: "Risk of genericization or abandonment claims"
    },
    {
      requirement: "Address Updates",
      description: "Notify trademark office of any changes in applicant address or business details",
      frequency: "As required",
      deadline: "Within prescribed time",
      consequences: "Communication issues and procedural complications"
    },
    {
      requirement: "Opposition Response",
      description: "Respond to any opposition or cancellation proceedings within statutory deadlines",
      frequency: "If applicable",
      deadline: "30-60 days as prescribed",
      consequences: "Registration cancellation or application abandonment"
    }
  ];

  const limitations = [
    "Protection limited to specific registered classes only",
    "No protection against unrelated goods/services in different classes",
    "Requires active use within 5 years and 3 months to avoid cancellation",
    "Subject to opposition during 4-month publication period",
    "Cannot prevent similar marks in unregistered classes",
    "Limited to geographical boundaries of India (unless international filing)",
    "Vulnerable to cancellation for non-use or improper use",
    "No retroactive protection before registration date"
  ];

  const successStories = [
    {
      client: "Tech Startup 'CloudInnovate'",
      challenge: "Needed to protect brand name across software and consulting services before product launch",
      solution: "Multi-class wordmark registration in classes 9 (software) and 42 (IT services) with comprehensive search",
      results: ["Secured exclusive rights to 'CloudInnovate' wordmark", "Protected against competitor confusion", "Enabled confident marketing and branding", "Foundation for international expansion"],
      metrics: { registrationTime: "13 months", classesProtected: "2 classes", investmentProtected: "₹50 lakh brand value" }
    },
    {
      client: "Restaurant Chain 'SpiceRoute'",
      challenge: "Multiple locations planned but needed trademark protection against copycats in food industry",
      solution: "Strategic wordmark registration in class 43 (restaurant services) with opposition defense preparation",
      results: ["Exclusive rights to 'SpiceRoute' for restaurant services", "Prevented franchise confusion", "Licensed name to franchisees", "Expanded to 15 locations confidently"],
      metrics: { registrationTime: "14 months", franchiseLocations: "15 outlets", brandValue: "₹2 crore protected" }
    }
  ];

  const faqs = [
    {
      question: "What is the difference between wordmark and logo trademark registration?",
      answer: "Wordmark protects only the text/words of your brand regardless of font, color, or design, while logo trademark protects the specific visual design. Wordmark provides broader protection as it covers the name in any visual presentation, making it ideal for text-based brand protection. Logo trademarks protect the specific design elements but not the underlying words in different formats."
    },
    {
      question: "How much does wordmark registration cost and what are the government fees?",
      answer: "For individuals, startups, and small enterprises: ₹4,500 online filing (₹5,000 physical) per class. For other entities/corporates: ₹9,000 online (₹10,000 physical) per class. Additional costs include professional fees for search (₹5,000-10,000), objection response (₹15,000-25,000), and renewal after 10 years (₹9,000-10,000 per class). Priority processing available for ₹20,000-40,000 extra."
    },
    {
      question: "How long does the wordmark registration process take and what are the key stages?",
      answer: "Complete process takes 12-14 months typically. Stages: Application filing (immediate receipt), Examination (3-6 months), Publication in Trademark Journal (4-month opposition period), Registration certificate (2-3 months if no opposition). Timeline can extend to 18-24 months if objections or oppositions occur. Expedited processing available for faster registration."
    },
    {
      question: "Can I use the ™ and ® symbols, and what's the difference?",
      answer: "Use ™ symbol after filing application to indicate trademark claim. Use ® symbol only after receiving registration certificate - using ® before registration is illegal and punishable. ™ shows you claim trademark rights but haven't registered yet. ® confirms official government registration with full legal protection and enforcement rights."
    },
    {
      question: "What happens if someone opposes my wordmark application during publication?",
      answer: "During 4-month publication period, anyone can file opposition. You'll receive notice and must respond within prescribed time (usually 30-60 days). Opposition proceedings involve legal arguments, evidence submission, and potentially hearings. We handle opposition defense including legal responses, evidence compilation, and representation. Success depends on strength of your mark and opposition grounds."
    },
    {
      question: "How do I select the right Nice Classification classes for my wordmark?",
      answer: "Classes 1-34 cover goods (products), classes 35-45 cover services. Select based on your actual business activities and future expansion plans. Multiple classes require separate fees (₹4,500 each). Common examples: Class 25 (clothing), Class 35 (retail services), Class 42 (IT services), Class 43 (restaurant services). Professional classification review ensures optimal protection scope."
    },
    {
      question: "What ongoing maintenance is required after wordmark registration?",
      answer: "Renew every 10 years before expiry (grace period available with surcharge). Maintain active commercial use within 5 years and 3 months to avoid cancellation. Update address changes with trademark office. Monitor for infringement and take action when necessary. File renewal application 6-12 months before expiry. Proper usage with ® symbol and maintain distinctive character."
    },
    {
      question: "Can foreign companies register wordmarks in India and what are the requirements?",
      answer: "Yes, foreign applicants can register through local attorney representation. Must provide Indian address for service (can be attorney's address). Need power of attorney, priority documents if claiming foreign priority. Convention applications accepted from Paris Convention countries. Madrid Protocol filing available for international registration designating India. Same fees and process as domestic applicants."
    }
  ];

  return (
    <>
      <SEO 
        title="Wordmark Registration - Trademark Text Protection | Brand Name Registration India"
        description="Register wordmark trademark for text-based brand protection in India. Complete guide on Form TM-A filing, ₹4,500 fees, Nice Classification, IP India process, and exclusive brand rights under Trade Marks Act 1999."
        canonicalUrl="/services/wordmark-registration"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" data-testid="wordmark-registration-page">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8" data-testid="hero-section">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200">
                  <Copyright className="w-4 h-4 mr-2" />
                  Intellectual Property Protection
                </Badge>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight" data-testid="main-heading">
                  Wordmark Registration
                  <span className="block text-blue-600 mt-2">Brand Text Protection</span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Secure <strong>exclusive rights</strong> to your brand name with professional wordmark registration. 
                  Protect text-based brand elements nationwide under Trade Marks Act 1999 with comprehensive 
                  IP India filing and enforcement support.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                  {heroStats.map((stat, index) => (
                    <div key={index} className="text-center" data-testid={`hero-stat-${index}`}>
                      <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                      <div className="text-sm font-medium text-gray-900 mt-1">{stat.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{stat.subtext}</div>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button 
                    size="lg" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                    onClick={() => setIsContactFormOpen(true)}
                    data-testid="get-started-button"
                  >
                    Start Registration Process
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                    onClick={() => document.getElementById('process-section')?.scrollIntoView({ behavior: 'smooth' })}
                    data-testid="learn-more-button"
                  >
                    Learn Process
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                  <div className="text-center mb-6">
                    <Copyright className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900">Trademark Protection</h3>
                    <p className="text-gray-600 mt-2">Secure your brand identity</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center text-green-600">
                      <CheckCircle2 className="w-5 h-5 mr-3" />
                      <span className="text-sm">Exclusive brand rights</span>
                    </div>
                    <div className="flex items-center text-green-600">
                      <CheckCircle2 className="w-5 h-5 mr-3" />
                      <span className="text-sm">Legal enforcement power</span>
                    </div>
                    <div className="flex items-center text-green-600">
                      <CheckCircle2 className="w-5 h-5 mr-3" />
                      <span className="text-sm">10-year renewable protection</span>
                    </div>
                    <div className="flex items-center text-green-600">
                      <CheckCircle2 className="w-5 h-5 mr-3" />
                      <span className="text-sm">International expansion base</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Trademark Registration Challenges</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Navigate complex IP procedures with expert guidance and comprehensive support
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {painPoints.map((point, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {point.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{point.problem}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{point.solution}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Wordmark Registration Benefits</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive brand protection with legal enforcement and business value enhancement
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {keyBenefits.map((benefit, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                        <p className="text-gray-600 mb-4">{benefit.description}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {benefit.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center text-sm text-green-600">
                              <CheckCircle2 className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Steps Section */}
        <section id="process-section" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Wordmark Registration Process</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive 6-step process from search to registration certificate
              </p>
            </div>
            
            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                      <div className="flex-shrink-0 mb-4 md:mb-0">
                        <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                          {step.step}
                        </div>
                      </div>
                      
                      <div className="flex-grow">
                        <div className="grid md:grid-cols-3 gap-6">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-gray-600 text-sm">{step.description}</p>
                            <div className="mt-3 flex items-center text-sm text-blue-600">
                              <Clock className="w-4 h-4 mr-2" />
                              {step.timeline}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Deliverables</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {step.deliverables.map((deliverable, deliverableIndex) => (
                                <li key={deliverableIndex} className="flex items-center">
                                  <CheckCircle2 className="w-3 h-3 mr-2 text-green-600 flex-shrink-0" />
                                  {deliverable}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Key Requirements</h4>
                            <p className="text-sm text-gray-600">{step.keyRequirements}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trademark Types Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Wordmark Registration Types</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the right registration approach based on your business needs and scope
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {trademarkTypes.map((type, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">{type.type}</CardTitle>
                    <CardDescription className="text-gray-600">{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Key Features</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {type.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                              <CheckCircle2 className="w-3 h-3 mr-2 text-green-600 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-gray-900">Suitable For:</span>
                          <span className="text-blue-600 font-medium">{type.timeline}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{type.suitableFor}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Document Requirements Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Required Documents</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complete documentation checklist for smooth wordmark registration process
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {documentRequirements.map((category, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900">
                      <FileText className="w-5 h-5 mr-3 text-blue-600" />
                      {category.category}
                    </CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.documents.map((document, docIndex) => (
                        <li key={docIndex} className="flex items-start">
                          <CheckCircle2 className="w-4 h-4 mr-3 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{document}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Eligibility Criteria Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Eligibility Criteria</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Essential requirements for successful wordmark registration under Trade Marks Act 1999
              </p>
            </div>
            
            <div className="space-y-6">
              {eligibilityCriteria.map((criteria, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Scale className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{criteria.criteria}</h3>
                        <p className="text-gray-600 mb-2">{criteria.description}</p>
                        <p className="text-sm text-gray-500">{criteria.details}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Wordmark Protection Features</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive features ensuring robust brand protection and enforcement
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {keyFeatures.map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.feature}</h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center text-sm text-green-600">
                          <CheckCircle2 className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>{benefit}</span>
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
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ongoing Compliance Requirements</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Essential compliance obligations to maintain trademark protection and rights
              </p>
            </div>
            
            <div className="space-y-6">
              {complianceRequirements.map((requirement, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-4 gap-4 items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{requirement.requirement}</h3>
                        <p className="text-sm text-gray-600">{requirement.description}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-blue-600">{requirement.frequency}</div>
                        <div className="text-xs text-gray-500 mt-1">Frequency</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-orange-600">{requirement.deadline}</div>
                        <div className="text-xs text-gray-500 mt-1">Deadline</div>
                      </div>
                      <div>
                        <div className="text-sm text-red-600">{requirement.consequences}</div>
                        <div className="text-xs text-gray-500 mt-1">Non-compliance risk</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Limitations Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-red-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Important Limitations</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understanding scope and boundaries of wordmark protection
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {limitations.map((limitation, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{limitation}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real businesses achieving brand protection and commercial success
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{story.client}</h3>
                      <p className="text-gray-600 text-sm mb-4">{story.challenge}</p>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Our Solution</h4>
                        <p className="text-sm text-gray-600">{story.solution}</p>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Results Achieved</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {story.results.map((result, resultIndex) => (
                            <li key={resultIndex} className="flex items-start">
                              <CheckCircle2 className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-blue-600">{story.metrics.registrationTime}</div>
                        <div className="text-xs text-gray-500">Timeline</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-600">{story.metrics.classesProtected || story.metrics.franchiseLocations}</div>
                        <div className="text-xs text-gray-500">Protection/Scale</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-purple-600">{story.metrics.investmentProtected || story.metrics.brandValue}</div>
                        <div className="text-xs text-gray-500">Value Protected</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">
                Common questions about wordmark registration process and requirements
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-sm border-0">
                  <AccordionTrigger 
                    className="px-6 py-4 text-left hover:no-underline hover:bg-gray-50 rounded-lg"
                    data-testid={`faq-trigger-${index}`}
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Protect Your Brand with Wordmark Registration?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Secure exclusive rights to your brand name nationwide. Expert guidance from search to registration certificate.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8"
                onClick={() => setIsContactFormOpen(true)}
                data-testid="cta-start-button"
              >
                <Copyright className="w-5 h-5 mr-2" aria-hidden="true" />
                Start Wordmark Registration
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-blue-300 text-white hover:bg-blue-700 px-8"
                onClick={() => setIsContactFormOpen(true)}
                data-testid="cta-consultation-button"
              >
                Get Expert Consultation
              </Button>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="text-blue-100">
                <div className="text-2xl font-bold text-white">₹4,500</div>
                <div className="text-sm">Government Fee (Online)</div>
              </div>
              <div className="text-blue-100">
                <div className="text-2xl font-bold text-white">12-14 Months</div>
                <div className="text-sm">Registration Timeline</div>
              </div>
              <div className="text-blue-100">
                <div className="text-2xl font-bold text-white">10 Years</div>
                <div className="text-sm">Protection Period</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Modal */}
        {isContactFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Start Your Wordmark Registration</h3>
                  <button
                    onClick={() => setIsContactFormOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                    data-testid="close-contact-form"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <ContactForm />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}