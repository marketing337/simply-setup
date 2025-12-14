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
  Heart,
  Gavel,
  BookOpen,
  UserCheck,
  HandHeart,
  Home,
  ShieldCheck,
  Landmark,
  ChartBar
} from "lucide-react";

export default function NGORegistrationPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Complex NGO Structure Selection",
      solution: "Expert guidance on choosing between Trust, Society, or Section 8 Company based on your social objectives and operational needs"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Multiple Registration Requirements",
      solution: "Comprehensive handling of primary registration, NGO Darpan, tax exemptions (12A, 80G), and CSR compliance documentation"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Lengthy Approval Process",
      solution: "Streamlined processing across all three NGO types with parallel handling of regulatory approvals and documentation"
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Compliance & Tax Exemption Confusion",
      solution: "Complete setup of annual compliance calendar, tax exemption registrations, and ongoing regulatory requirement management"
    }
  ];

  const keyBenefits = [
    {
      icon: <Heart className="w-8 h-8 text-blue-600" />,
      title: "Social Impact & Legal Recognition",
      description: "Establish credible platform for social welfare activities with full legal recognition and statutory compliance",
      features: ["Legal entity status", "Social credibility", "Perpetual succession", "Limited liability protection"]
    },
    {
      icon: <Banknote className="w-8 h-8 text-green-600" />,
      title: "Tax Benefits & Exemptions", 
      description: "Access comprehensive tax exemptions and benefits for both the organization and donors supporting your cause",
      features: ["Income tax exemption", "80G donor benefits", "State-dependent fees", "FCRA eligibility (3+ years activity)"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      title: "Funding & Grant Access",
      description: "Unlock access to government grants, CSR funding, international donations, and public fundraising opportunities",
      features: ["Government grants", "CSR funding eligibility", "International donations", "Public fundraising"]
    },
    {
      icon: <ChartBar className="w-8 h-8 text-orange-600" />,
      title: "Professional Operations",
      description: "Establish professional infrastructure for sustained social impact with proper governance and accountability",
      features: ["Professional governance", "Transparent operations", "Audit framework", "Impact measurement"]
    }
  ];

  const ngoTypes = [
    {
      type: "Trust",
      description: "Trustee-managed structure for charitable and religious activities",
      minMembers: "2 Trustees",
      governingLaw: "State public trust laws where applicable, Registration Act 1908",
      timeline: "20 working days",
      cost: "₹7,000 - ₹12,000",
      benefits: ["Simple structure", "Flexible operations", "Lower compliance", "Religious activities"],
      suitability: "Charitable activities, religious organizations, educational institutions",
      considerations: ["Limited corporate credibility", "State-specific variations"]
    },
    {
      type: "Society", 
      description: "Member-based democratic structure for social welfare activities",
      minMembers: "7 Founding Members",
      governingLaw: "Societies Registration Act 1860",
      timeline: "25 working days",
      cost: "₹7,500 - ₹12,000",
      benefits: ["Democratic governance", "Member participation", "Good credibility", "Established framework"],
      suitability: "Community welfare, social work, cultural activities, advocacy",
      considerations: ["More compliance requirements", "Democratic decision making"]
    },
    {
      type: "Section 8 Company",
      description: "Board of directors managed structure with highest credibility",
      minMembers: "2-3 Directors",
      governingLaw: "Companies Act 2013",
      timeline: "10-15 working days",
      cost: "₹20,000 - ₹25,000",
      benefits: ["Highest credibility", "Corporate structure", "Structured compliance", "Professional image"],
      suitability: "Large-scale operations, international funding, corporate partnerships",
      considerations: ["Higher initial cost", "Formal compliance requirements"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "NGO Structure Selection & Planning",
      description: "Choose appropriate NGO type (Trust/Society/Section 8) based on objectives, scale, and operational requirements",
      icon: <BookOpen className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "Documentation & Legal Preparation",
      description: "Prepare governing documents (Trust Deed/Memorandum/MOA-AOA), member details, and registered office setup",
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "Primary Registration Filing",
      description: "Submit application with respective registrar (Trust/Society/ROC) and obtain incorporation certificate",
      icon: <Building className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "Additional Registrations & Compliance",
      description: "Complete NGO Darpan registration, PAN/TAN setup, and tax exemption applications (12A, 80G, FCRA)",
      icon: <Award className="w-6 h-6 text-blue-600" />
    }
  ];

  const additionalRegistrations = [
    {
      title: "NGO Darpan Registration",
      description: "Mandatory for government funding and partnerships",
      requirement: "All NGOs seeking government collaboration",
      timeline: "7-10 days",
      benefits: ["Government funding access", "Official recognition", "Partnership opportunities"]
    },
    {
      title: "12A Tax Exemption",
      description: "Income tax exemption for NGO operations",
      requirement: "NGOs with charitable objectives",
      timeline: "30-45 days",
      benefits: ["Income tax exemption", "Surplus reinvestment", "Operational benefits"]
    },
    {
      title: "80G Registration",
      description: "Tax deduction benefits for donors",
      requirement: "NGOs seeking donor tax benefits",
      timeline: "45-60 days",
      benefits: ["50% tax deduction for donors", "Increased donations", "Donor incentives"]
    },
    {
      title: "FCRA Registration",
      description: "Foreign contribution acceptance license (prior permission route available for new NGOs)",
      requirement: "NGOs receiving international funding (3+ years for full registration, prior permission for newer NGOs)",
      timeline: "90-120 days",
      benefits: ["Foreign funding access", "International partnerships", "Global operations"]
    }
  ];

  const complianceRequirements = [
    {
      title: "Annual Filing Requirements",
      description: "Submit annual returns and activity reports to respective registrars",
      frequency: "Annual"
    },
    {
      title: "Financial Auditing",
      description: "Mandatory audit by chartered accountant for transparency and compliance", 
      frequency: "Annual"
    },
    {
      title: "Tax Exemption Renewals",
      description: "Renew 12A and 80G registrations every 5 years and maintain compliance",
      frequency: "5 Years"
    },
    {
      title: "Activity Reporting",
      description: "Regular reporting of social activities and fund utilization",
      frequency: "Ongoing"
    }
  ];

  const faqs = [
    {
      question: "Which type of NGO registration is best for my organization?",
      answer: "The choice depends on your objectives and scale: Trust is ideal for simple charitable/religious activities with minimal compliance. Society works well for community-based democratic organizations. Section 8 Company offers highest credibility and is best for large-scale operations, international funding, and corporate partnerships, though it costs more initially."
    },
    {
      question: "What documents are required for NGO registration in India?",
      answer: "Common documents include: Identity and address proof of all members/trustees/directors, registered office address proof with NOC, governing documents (Trust Deed/Memorandum/MOA-AOA), list of founding members with signatures, affidavits, and specific forms based on NGO type. Section 8 companies additionally require DSC and DIN for directors."
    },
    {
      question: "How long does NGO registration take and what are the costs?",
      answer: "Timeline varies by type: Trust (20 days, ₹7,000-₹12,000), Society (25 days, ₹7,500-₹12,000), Section 8 Company (10-15 days, ₹20,000-₹25,000). Additional registrations like NGO Darpan, 12A, 80G take extra time. Costs include government fees, professional charges, and stamp duty."
    },
    {
      question: "Is NGO Darpan registration mandatory for all NGOs?",
      answer: "NGO Darpan registration is mandatory only if you plan to seek government funding, grants, or partnerships. It's done through ngodarpan.gov.in after primary registration. While not required for all NGOs, it's highly recommended as it provides official recognition and access to government schemes."
    },
    {
      question: "What are 12A and 80G registrations and why are they important?",
      answer: "12A registration provides income tax exemption to NGOs under sections 11-12 of Income Tax Act, valid for 5 years. 80G registration allows donors to claim 50% tax deduction on donations. Both significantly benefit NGO operations and encourage donations, making them essential for sustainable funding."
    },
    {
      question: "Can foreign nationals be involved in Indian NGO operations?",
      answer: "Yes, but with restrictions. Foreign nationals can be members/trustees but may face limitations in executive roles. For receiving foreign funding, FCRA registration is mandatory. Section 8 companies allow foreign directors more easily. Always ensure compliance with FEMA regulations and FCRA requirements for foreign involvement."
    }
  ];

  const testimonials = [
    {
      name: "Dr. Priya Sharma",
      company: "Education for All Trust",
      location: "Mumbai",
      rating: 5,
      text: "Excellent guidance in choosing Trust structure for our educational initiative. The team handled all documentation and helped us secure 12A and 80G registrations efficiently. Our NGO is now fully operational.",
      avatar: "PS"
    },
    {
      name: "Rajesh Kumar", 
      company: "Community Welfare Society",
      location: "Delhi",
      rating: 5,
      text: "Professional support for our society registration and NGO Darpan setup. They explained all compliance requirements clearly and helped us access government grants. Highly recommend their expertise.",
      avatar: "RK"
    },
    {
      name: "Meera Patel",
      company: "HealthCare Foundation (Section 8)",
      location: "Bangalore",
      rating: 5,
      text: "The team's knowledge of Section 8 company registration was invaluable. They handled ROC filing and guided us through the FCRA prior permission process, enabling us to receive international funding for our healthcare projects.",
      avatar: "MP"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" data-testid="ngo-registration-page">
      <SEO 
        title="NGO Registration in India | Trust, Society, Section 8 Company | SimplySetup"
        description="Register your NGO in India with Trust, Society, or Section 8 Company structure. Expert assistance for 12A, 80G, FCRA, NGO Darpan registrations. Complete social impact setup."
        canonicalUrl="/services/ngo-registration"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-rose-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-rose-100 text-rose-800 hover:bg-rose-200" data-testid="service-badge">
                  <Heart className="w-4 h-4 mr-1" />
                  NGO Registration
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight" data-testid="page-title">
                  NGO Registration in India
                </h1>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed" data-testid="page-description">
                  Register your NGO with Trust, Society, or Section 8 Company structure. Get complete setup with 
                  12A, 80G tax exemptions, NGO Darpan, and FCRA registrations for social impact organizations.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="px-8 py-3" data-testid="button-get-quote">
                        Start NGO Registration
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Get NGO Registration Quote</DialogTitle>
                        <p className="text-sm text-gray-600">Get expert assistance for your NGO registration with complete compliance setup.</p>
                      </DialogHeader>
                      <ContactForm />
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline" size="lg" className="px-8 py-3" onClick={() => {
                    const typesSection = document.getElementById('ngo-types');
                    if (typesSection) {
                      typesSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }} data-testid="button-compare-types">
                    <Calculator className="mr-2 h-5 w-5" />
                    Compare NGO Types
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                  <div className="text-center" data-testid="stat-timeline">
                    <div className="text-2xl font-bold text-rose-600 mb-1">10-25</div>
                    <div className="text-sm text-gray-600">Days Setup</div>
                  </div>
                  <div className="text-center" data-testid="stat-types">
                    <div className="text-2xl font-bold text-blue-600 mb-1">3</div>
                    <div className="text-sm text-gray-600">NGO Types</div>
                  </div>
                  <div className="text-center" data-testid="stat-compliance">
                    <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
                    <div className="text-sm text-gray-600">Compliance Setup</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200" data-testid="benefits-card">
                  <div className="text-center mb-6">
                    <Heart className="w-16 h-16 text-rose-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900">NGO Registration Benefits</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3" data-testid="benefit-legal">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Full legal recognition & credibility</span>
                    </div>
                    <div className="flex items-center space-x-3" data-testid="benefit-tax">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Income tax exemption (12A)</span>
                    </div>
                    <div className="flex items-center space-x-3" data-testid="benefit-donor">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Donor tax benefits (80G)</span>
                    </div>
                    <div className="flex items-center space-x-3" data-testid="benefit-funding">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Government grants & CSR funding</span>
                    </div>
                    <div className="flex items-center space-x-3" data-testid="benefit-fcra">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Foreign funding eligibility (FCRA)</span>
                    </div>
                    <div className="flex items-center space-x-3" data-testid="benefit-perpetual">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Perpetual succession & operations</span>
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
                NGO Registration Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Navigate complex NGO regulations and compliance requirements with expert guidance and comprehensive support.
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
                Why Register Your NGO?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Unlock legal recognition, tax benefits, funding opportunities, and professional credibility for sustained social impact.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {keyBenefits.map((benefit, index) => (
                <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-rose-300" data-testid={`key-benefit-${index}`}>
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
                Our NGO Registration Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive 4-step process to establish your NGO with complete legal compliance and operational setup.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow relative" data-testid={`process-step-${index}`}>
                  <CardContent className="p-0">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        {step.icon}
                      </div>
                      <div className="absolute -top-2 -left-2 w-8 h-8 bg-rose-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
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

        {/* NGO Types Comparison Section */}
        <section id="ngo-types" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-types">
                Choose Your NGO Structure
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Compare Trust, Society, and Section 8 Company structures to select the best fit for your social objectives.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4" data-testid="disclaimer-notice">
                <p className="text-sm text-blue-800"><strong>Important:</strong> Laws, costs, stamp duty, and timelines vary by state/registrar. We provide state-specific guidance for your location.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {ngoTypes.map((ngo, index) => (
                <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 h-full border-2 hover:border-rose-300" data-testid={`ngo-type-${index}`}>
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <HandHeart className="w-12 h-12 text-rose-600" />
                        <Badge variant="outline" className="text-sm">{ngo.timeline}</Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{ngo.type}</h3>
                      <p className="text-gray-600 text-sm mb-4">{ngo.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div>
                        <span className="font-semibold text-gray-700">Min Members:</span>
                        <p className="text-gray-600">{ngo.minMembers}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Cost:</span>
                        <p className="text-gray-600">{ngo.cost}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Governing Law:</h4>
                      <p className="text-sm text-gray-600">{ngo.governingLaw}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Best For:</h4>
                      <p className="text-sm text-gray-600">{ngo.suitability}</p>
                    </div>
                    
                    <div className="mb-4 flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                      <ul className="space-y-1">
                        {ngo.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center space-x-2 text-sm" data-testid={`ngo-benefit-${index}-${benefitIndex}`}>
                            <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Considerations:</h4>
                      <ul className="space-y-1">
                        {ngo.considerations.map((consideration, considIndex) => (
                          <li key={considIndex} className="flex items-center space-x-2 text-sm" data-testid={`ngo-consideration-${index}-${considIndex}`}>
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

        {/* Additional Registrations Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-additional">
                Essential Additional Registrations
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complete your NGO setup with these critical registrations for funding access and tax benefits.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {additionalRegistrations.map((registration, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-rose-500" data-testid={`additional-registration-${index}`}>
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4 mb-4">
                      <ShieldCheck className="w-8 h-8 text-rose-600 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2 text-lg">{registration.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{registration.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                          <div>
                            <span className="font-semibold text-gray-700">For:</span>
                            <p className="text-gray-600">{registration.requirement}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-700">Timeline:</span>
                            <p className="text-gray-600">{registration.timeline}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                          <ul className="space-y-1">
                            {registration.benefits.map((benefit, benefitIndex) => (
                              <li key={benefitIndex} className="flex items-center space-x-2 text-sm" data-testid={`registration-benefit-${index}-${benefitIndex}`}>
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
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-compliance">
                Ongoing Compliance Requirements
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understand the compliance obligations for registered NGOs in India to maintain legal standing.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {complianceRequirements.map((compliance, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-rose-500" data-testid={`compliance-${index}`}>
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <BookOpen className="w-6 h-6 text-rose-600" />
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
                Get answers to common questions about NGO registration and compliance in India.
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
                Success stories from social entrepreneurs who registered their NGOs with us.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow" data-testid={`testimonial-${index}`}>
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-rose-600 text-white rounded-full flex items-center justify-center font-bold">
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
        <section className="py-20 bg-gradient-to-br from-rose-600 to-rose-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6" data-testid="cta-title">
              Ready to Start Your Social Impact Journey?
            </h2>
            <p className="text-xl text-rose-100 mb-8 max-w-3xl mx-auto">
              Register your NGO with complete compliance setup including tax exemptions, funding access, and ongoing support. 
              Transform your social vision into sustainable impact today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" variant="secondary" className="px-8 py-3" data-testid="cta-button-register">
                    Start NGO Registration
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader className="sr-only">
                    <DialogTitle>Contact Form</DialogTitle>
                    <p className="text-sm text-gray-600">Get expert assistance for NGO registration with complete compliance setup.</p>
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