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
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Globe, 
  Zap, 
  TrendingUp, 
  Star,
  ArrowRight,
  Calculator,
  FileText,
  Clock,
  Award,
  Target,
  CheckSquare,
  MessageCircle,
  Briefcase,
  Calendar,
  Banknote,
  Scale,
  Landmark,
  Handshake,
  PieChart
} from "lucide-react";

export default function PublicLimitedCompanyRegistrationPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Complex Public Company Regulations",
      solution: "Complete ROC compliance and statutory filing assistance with expert guidance through intricate public company regulations"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Extensive Documentation Requirements",
      solution: "Comprehensive document preparation including MOA, AOA, prospectus drafting, and shareholder agreements with legal review"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Lengthy Registration Process",
      solution: "Streamlined 15-20 working day registration timeline with parallel processing of multiple statutory requirements"
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Multiple Directors & Shareholders Management",
      solution: "Professional handling of minimum 3 directors and 7 shareholders with DIN procurement and compliance setup"
    }
  ];

  const keyBenefits = [
    {
      icon: <Landmark className="w-8 h-8 text-blue-600" />,
      title: "Public Fund Raising Capability",
      description: "Access capital markets and raise funds from the general public through share offerings and stock exchange listing",
      features: ["IPO readiness", "Public share offerings", "Stock exchange listing", "Institutional investor access"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      title: "Enhanced Business Credibility", 
      description: "Establish maximum corporate credibility with banks, suppliers, customers, and government agencies",
      features: ["Banking relationships", "Vendor credibility", "Government contracts", "International business"]
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "Limited Liability Protection",
      description: "Directors and shareholders enjoy limited liability protection with clear separation of personal and business assets",
      features: ["Personal asset protection", "Limited liability", "Separate legal entity", "Risk mitigation"]
    },
    {
      icon: <PieChart className="w-8 h-8 text-orange-600" />,
      title: "Large Scale Operations",
      description: "Structure designed for significant business operations with unlimited growth potential and expansion capabilities",
      features: ["Unlimited expansion", "Large scale operations", "Multiple business lines", "Professional management"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Name Reservation & Documentation",
      description: "Reserve unique company name with MCA and prepare comprehensive incorporation documents including detailed MOA, AOA",
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "Director & Shareholder Setup",
      description: "Process DIN applications for minimum 3 directors and organize minimum 7 shareholders with all required documentation",
      icon: <Users className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "Digital Signatures & MCA Filing",
      description: "Obtain digital signature certificates for all directors and file comprehensive SPICe+ form with Registrar of Companies",
      icon: <Shield className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "Incorporation & Compliance Setup",
      description: "Receive certificate of incorporation and establish ongoing statutory compliance framework for public company requirements",
      icon: <Award className="w-6 h-6 text-blue-600" />
    }
  ];

  const complianceRequirements = [
    {
      title: "Board Meetings",
      description: "Minimum 4 board meetings per year with proper quorum and minutes",
      frequency: "Quarterly"
    },
    {
      title: "Annual General Meeting",
      description: "Mandatory AGM within 6 months of financial year closure", 
      frequency: "Annual"
    },
    {
      title: "Financial Reporting",
      description: "Detailed financial statements with mandatory audit requirements",
      frequency: "Annual"
    },
    {
      title: "Statutory Filings",
      description: "Regular MCA filings including annual returns and compliance certificates",
      frequency: "Ongoing"
    }
  ];

  const capitalRequirements = [
    {
      type: "Minimum Authorized Capital",
      amount: "₹1,00,000",
      description: "Required authorized capital for public limited company registration"
    },
    {
      type: "Minimum Paid-up Capital", 
      amount: "No Minimum",
      description: "No minimum paid-up capital required since Companies Amendment Act 2015"
    },
    {
      type: "Government Fees",
      amount: "₹8,000 - ₹25,000",
      description: "MCA registration fees based on authorized capital structure"
    }
  ];

  const faqs = [
    {
      question: "What are the minimum requirements to register a Public Limited Company in India?",
      answer: "A Public Limited Company requires minimum 3 directors and 7 shareholders (can be same individuals). All directors need Director Identification Number (DIN) and Digital Signature Certificate (DSC). Minimum authorized capital is ₹1 lakh with no minimum paid-up capital requirement since 2015. At least one director must be an Indian resident, and the company must have a registered office address in India."
    },
    {
      question: "How long does Public Limited Company registration take and what is the process?",
      answer: "Registration typically takes 15-20 working days. The process includes: name reservation (3-5 days), DIN and DSC procurement (3-5 days), document preparation (2-3 days), MCA filing through SPICe+ form (7-10 days for approval). Our team handles end-to-end process including document preparation, statutory compliances, and follow-ups with ROC."
    },
    {
      question: "What are the ongoing compliance requirements for a Public Limited Company?",
      answer: "Annual compliances include: Annual General Meeting within 6 months of financial year end, Annual Return filing (Form MGT-7), Financial Statement filing (Form AOC-4), Board Meetings (minimum 4 per year), Directors' Report, Auditor's Report, and various other statutory filings. Non-compliance results in penalties and legal consequences."
    },
    {
      question: "Can a Public Limited Company raise funds from the public immediately after incorporation?",
      answer: "No, newly incorporated Public Limited Companies cannot immediately raise funds from the public. They must first comply with various regulations, may need SEBI approval for public offerings, and must meet specific criteria. However, they can raise funds from existing shareholders, issue rights shares, or seek private investments more easily than private companies."
    },
    {
      question: "What documents are required for Public Limited Company registration?",
      answer: "Required documents include: PAN cards and Aadhaar cards of all directors and shareholders, passport-size photographs, registered office address proof with NOC, utility bills, Memorandum and Articles of Association (MOA & AOA), consent letters from directors (Form DIR-3), Digital Signature Certificates, and in case of foreign directors - passport copies and overseas address proof."
    },
    {
      question: "What are the benefits of choosing Public Limited Company over Private Limited Company?",
      answer: "Key advantages include: ability to raise capital from general public, shares can be freely transferred, higher business credibility and trust, easier access to institutional funding, potential for stock exchange listing, unlimited membership, better positioned for large-scale operations, and enhanced opportunities for business expansion and growth."
    }
  ];

  const testimonials = [
    {
      name: "Vikram Agarwal",
      company: "MetroTech Industries Ltd",
      location: "Mumbai",
      rating: 5,
      text: "Exceptional service for our Public Limited Company registration. The team handled all complex documentation and statutory requirements professionally. Our company was incorporated smoothly within the promised timeline.",
      avatar: "VA"
    },
    {
      name: "Sunita Reddy", 
      company: "EcoGreen Solutions Ltd",
      location: "Hyderabad",
      rating: 5,
      text: "The team's expertise in Public Limited Company regulations was invaluable. They guided us through every step from director appointments to ROC filings. Highly recommend their comprehensive service.",
      avatar: "SR"
    },
    {
      name: "Arjun Malhotra",
      company: "TechVenture Corp Ltd",
      location: "Bangalore",
      rating: 5,
      text: "Professional and efficient service. They managed our 7 shareholders and 4 directors setup seamlessly. The ongoing compliance support has been excellent too. Great value for money.",
      avatar: "AM"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" data-testid="public-limited-company-page">
      <SEO 
        title="Public Limited Company Registration in India | ROC Compliance | SimplySetup"
        description="Register your Public Limited Company in India with complete ROC compliance. Expert assistance for minimum 3 directors, 7 shareholders setup. Fast-track registration in 15-20 days."
        canonicalUrl="/services/public-limited-company-registration"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200" data-testid="service-badge">
                  <Landmark className="w-4 h-4 mr-1" />
                  Public Limited Company Registration
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight" data-testid="page-title">
                  Public Limited Company Registration in India
                </h1>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed" data-testid="page-description">
                  Register your Public Limited Company with complete ROC compliance and statutory support. 
                  Access public funding, enhance credibility, and scale your business operations with professional incorporation services.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="px-8 py-3" data-testid="button-get-quote">
                        Get Registration Quote
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Get Public Limited Company Registration Quote</DialogTitle>
                      </DialogHeader>
                      <ContactForm />
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline" size="lg" className="px-8 py-3" onClick={() => {
                    const pricingSection = document.getElementById('capital-requirements');
                    if (pricingSection) {
                      pricingSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }} data-testid="button-check-pricing">
                    <Calculator className="mr-2 h-5 w-5" />
                    Check Pricing
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                  <div className="text-center" data-testid="stat-timeline">
                    <div className="text-2xl font-bold text-blue-600 mb-1">15-20</div>
                    <div className="text-sm text-gray-600">Days Registration</div>
                  </div>
                  <div className="text-center" data-testid="stat-capital">
                    <div className="text-2xl font-bold text-green-600 mb-1">₹1L</div>
                    <div className="text-sm text-gray-600">Min Auth Capital</div>
                  </div>
                  <div className="text-center" data-testid="stat-compliance">
                    <div className="text-2xl font-bold text-orange-600 mb-1">100%</div>
                    <div className="text-sm text-gray-600">ROC Compliance</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200" data-testid="benefits-card">
                  <div className="text-center mb-6">
                    <Landmark className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900">Public Limited Company Benefits</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3" data-testid="benefit-public-funding">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Public fund raising capability</span>
                    </div>
                    <div className="flex items-center space-x-3" data-testid="benefit-credibility">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Maximum business credibility</span>
                    </div>
                    <div className="flex items-center space-x-3" data-testid="benefit-listing">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Stock exchange listing potential</span>
                    </div>
                    <div className="flex items-center space-x-3" data-testid="benefit-liability">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Limited liability protection</span>
                    </div>
                    <div className="flex items-center space-x-3" data-testid="benefit-operations">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Large scale business operations</span>
                    </div>
                    <div className="flex items-center space-x-3" data-testid="benefit-expansion">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Unlimited expansion potential</span>
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
                Public Limited Company Registration Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Navigate complex public company regulations with expert guidance and professional support.
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
                Why Choose Public Limited Company Structure?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Access maximum business potential with public company benefits and professional corporate structure.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {keyBenefits.map((benefit, index) => (
                <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300" data-testid={`key-benefit-${index}`}>
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
                Our Public Limited Company Registration Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Streamlined 4-step process to get your Public Limited Company registered with complete ROC compliance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow relative" data-testid={`process-step-${index}`}>
                  <CardContent className="p-0">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        {step.icon}
                      </div>
                      <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
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

        {/* Capital Requirements Section */}
        <section id="capital-requirements" className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-capital">
                Capital Requirements & Investment Structure
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understand the financial requirements for Public Limited Company registration in India.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {capitalRequirements.map((requirement, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow" data-testid={`capital-requirement-${index}`}>
                  <CardContent className="p-0">
                    <div className="mb-4">
                      <Banknote className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">{requirement.type}</h3>
                    <div className="text-3xl font-bold text-green-600 mb-3">{requirement.amount}</div>
                    <p className="text-gray-600 text-sm leading-relaxed">{requirement.description}</p>
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
                Ongoing Compliance Requirements
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understand the statutory compliance obligations for Public Limited Companies in India.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {complianceRequirements.map((compliance, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-blue-500" data-testid={`compliance-${index}`}>
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <FileText className="w-6 h-6 text-blue-600" />
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
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-faq">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about Public Limited Company registration in India.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4" data-testid="faq-accordion">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border shadow-sm" data-testid={`faq-item-${index}`}>
                  <AccordionTrigger className="px-6 py-4 text-left hover:bg-gray-50 rounded-t-lg">
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="section-title-testimonials">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600">
                Success stories from entrepreneurs who registered their Public Limited Companies with us.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow" data-testid={`testimonial-${index}`}>
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
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
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6" data-testid="cta-title">
              Ready to Register Your Public Limited Company?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Get expert assistance for Public Limited Company registration with complete ROC compliance. 
              Start your journey towards public company benefits today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" variant="secondary" className="px-8 py-3" data-testid="cta-button-register">
                    Start Registration Process
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader className="sr-only">
                    <DialogTitle>Contact Form</DialogTitle>
                  </DialogHeader>
                  <ContactForm />
                </DialogContent>
              </Dialog>
              
              <div className="flex items-center space-x-4 text-blue-100">
                <div className="flex items-center space-x-2" data-testid="cta-phone">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm">Call: +91-8045994441</span>
                </div>
                <div className="flex items-center space-x-2" data-testid="cta-email">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">info@simplysetup.in</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer location={currentLocation} />
    </div>
  );
}