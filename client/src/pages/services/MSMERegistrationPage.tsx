import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocation } from "@/hooks/useLocation";
import SEO from "@/components/SEO";
import ContactForm from "@/components/ContactForm";
import SalesPersonCards from "@/components/SalesPersonCards";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  CheckCircle, 
  Factory, 
  Shield, 
  MapPin, 
  Phone, 
  Mail, 
  Building, 
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
  Package,
  CreditCard
} from "lucide-react";

export default function MSMERegistrationPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Missing Government Scheme Benefits",
      solution: "Complete MSME registration to access government subsidies, loans, and business support schemes"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Complex Udyam Registration Process",
      solution: "Expert assistance with Udyam portal registration and all required documentation"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Credit and Loan Access Issues",
      solution: "MSME certificate enabling easier bank loans, credit facilities, and financial support"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      problem: "Market Access and Credibility",
      solution: "Government recognized status improving business credibility and market opportunities"
    }
  ];

  const keyBenefits = [
    {
      icon: <CreditCard className="w-8 h-8 text-blue-600" />,
      title: "Financial Benefits & Support",
      description: "Access to government subsidies, priority lending, and collateral-free loans up to ₹1 crore",
      features: ["Priority sector lending", "Collateral-free loans", "Government subsidies", "Lower interest rates"]
    },
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: "Tax Benefits & Exemptions", 
      description: "Income tax exemptions, reduced compliance burden, and various tax incentives for MSMEs",
      features: ["Income tax benefits", "Excise duty exemptions", "Reduced documentation", "Fast-track clearances"]
    },
    {
      icon: <Scale className="w-8 h-8 text-purple-600" />,
      title: "Market Access & Protection",
      description: "Government tender participation, protection against delayed payments, and market support",
      features: ["Government tender access", "Delayed payment protection", "Export promotion", "Technology support"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Business Growth Support",
      description: "Skill development programs, technology upgradation, and business expansion support",
      features: ["Skill development schemes", "Technology assistance", "Marketing support", "Export facilitation"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Business Classification",
      description: "Classify your business as micro, small, or medium enterprise based on investment and turnover",
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "Document Preparation",
      description: "Prepare Aadhaar, PAN, bank statement, and business documents for Udyam registration",
      icon: <Shield className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "Udyam Portal Registration",
      description: "Complete online registration on Udyam portal with business details and supporting documents",
      icon: <Building className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "Certificate & Scheme Access",
      description: "Receive Udyam registration certificate and guidance on accessing various MSME schemes",
      icon: <Award className="w-6 h-6 text-blue-600" />
    }
  ];

  const msmeCategories = [
    {
      type: "Micro Enterprise",
      investment: "Up to ₹1 Crore",
      turnover: "Up to ₹5 Crore",
      benefits: ["Collateral-free loans", "Government subsidies", "Tax exemptions", "Priority lending"],
      idealFor: "Small manufacturers, service providers, traders",
      pricing: "₹1,999 + Govt fees"
    },
    {
      type: "Small Enterprise",
      investment: "₹1-10 Crore", 
      turnover: "₹5-50 Crore",
      benefits: ["Bank loan facilities", "Technology support", "Export promotion", "Skill development"],
      idealFor: "Growing businesses, medium manufacturers",
      pricing: "₹2,999 + Govt fees"
    },
    {
      type: "Medium Enterprise",
      investment: "₹10-50 Crore",
      turnover: "₹50-250 Crore",
      benefits: ["Large credit facilities", "International support", "Technology upgradation", "Market access"],
      idealFor: "Established businesses, large operations",
      pricing: "₹3,999 + Govt fees"
    }
  ];

  const schemes = [
    {
      scheme: "Prime Minister's Employment Generation Programme (PMEGP)",
      benefit: "Subsidy up to 35% for project cost",
      eligibility: "New enterprises in manufacturing and services"
    },
    {
      scheme: "Credit Guarantee Fund Trust for Micro and Small Enterprises",
      benefit: "Collateral-free loans up to ₹1 crore",
      eligibility: "Micro and Small enterprises"
    },
    {
      scheme: "Technology Upgradation Fund Scheme (TUFS)",
      benefit: "Credit linked capital subsidy",
      eligibility: "Textile industry enterprises"
    },
    {
      scheme: "Cluster Development Programme",
      benefit: "Infrastructure development support",
      eligibility: "MSME clusters"
    }
  ];

  const faqs = [
    {
      question: "What is the difference between old SSI registration and new Udyam registration?",
      answer: "Udyam registration replaced the earlier SSI/EM-II registrations in July 2020. Key differences: Udyam is completely online, uses Aadhaar for authentication, has revised investment and turnover criteria, provides lifetime validity, and offers self-declaration based registration. The new system is more transparent and easier to use compared to the old SSI registration process."
    },
    {
      question: "What are the investment and turnover criteria for MSME classification?",
      answer: "Micro Enterprise: Investment up to ₹1 crore, Turnover up to ₹5 crore. Small Enterprise: Investment ₹1-10 crore, Turnover ₹5-50 crore. Medium Enterprise: Investment ₹10-50 crore, Turnover ₹50-250 crore. Both investment and turnover criteria must be satisfied for classification. Investment includes plant & machinery for manufacturing and equipment for service enterprises."
    },
    {
      question: "Is Udyam registration mandatory for businesses?",
      answer: "Udyam registration is not mandatory but highly recommended for businesses falling under MSME criteria. It's required to avail MSME benefits like government schemes, subsidies, priority lending, protection against delayed payments, and participation in government tenders reserved for MSMEs. Without registration, businesses cannot access these benefits."
    },
    {
      question: "What documents are required for MSME registration?",
      answer: "Required documents include: Aadhaar card of promoter/owner, PAN card of enterprise, bank account details, business details like date of commencement, main business activity, employment details, and investment in plant & machinery/equipment. For partnerships/companies, additional documents like registration certificate, partner/director details are required."
    },
    {
      question: "How long is MSME registration valid and can it be updated?",
      answer: "Udyam registration has lifetime validity and doesn't require renewal. However, enterprises must file annual self-declaration called Annual Verification of Information (AVI) by 31st March every year. The registration details can be updated anytime through the Udyam portal if there are changes in business activities, investment, or other details."
    },
    {
      question: "What are the main benefits of MSME registration for businesses?",
      answer: "Key benefits include: Priority sector lending with lower interest rates, collateral-free loans up to ₹1 crore, government subsidies and schemes access, protection against delayed payments from large buyers, reservation in government procurement, excise and customs duty concessions, reduced compliance burden, technology and skill development support, and export promotion assistance."
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Gupta",
      company: "Modern Manufacturing Unit",
      location: "Gurgaon",
      rating: 5,
      text: "MSME registration opened doors to government subsidies and bank loans. Got ₹25 lakh loan without collateral. Excellent service and support throughout the process.",
      avatar: "RG"
    },
    {
      name: "Meena Sharma",
      company: "Textile Processing Unit", 
      location: "Surat",
      rating: 5,
      text: "Perfect support for our textile business. MSME certificate helped us get TUFS benefits and technology upgradation. Great team with industry knowledge.",
      avatar: "MS"
    },
    {
      name: "Sunil Kumar",
      company: "IT Services Provider",
      location: "Bangalore",
      rating: 5,
      text: "Quick MSME registration for our IT company. Now we can participate in government tenders and access priority lending. Professional and efficient service.",
      avatar: "SK"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="MSME Registration in India | Udyam Registration Certificate Online | SimplySetup"
        description="Get MSME registration (Udyam certificate) in India with complete benefits access. Micro, Small & Medium Enterprise registration for government schemes and loan benefits."
        canonicalUrl="/services/msme-registration"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-orange-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200">
                  <Factory className="w-4 h-4 mr-1" />
                  MSME Registration
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  MSME Registration in India
                </h1>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  Get your Udyam registration certificate and unlock government benefits, subsidies, 
                  and collateral-free loans for your business growth and development.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="px-8 py-3">
                        Register for MSME
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Get MSME Registration Quote</DialogTitle>
                      </DialogHeader>
                      <ContactForm />
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline" size="lg" className="px-8 py-3">
                    <Calculator className="mr-2 h-5 w-5" />
                    Check Eligibility
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">7-10</div>
                    <div className="text-sm text-gray-600">Days Processing</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">75K+</div>
                    <div className="text-sm text-gray-600">MSMEs Registered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">₹1 Cr</div>
                    <div className="text-sm text-gray-600">Loan Without Collateral</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200">
                  <div className="text-center mb-6">
                    <Package className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900">MSME Registration Benefits</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Collateral-free loans up to ₹1 crore</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Government subsidies and schemes</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Priority sector lending</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Tax benefits and exemptions</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Government tender participation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Delayed payment protection</span>
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
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Business Challenges MSME Registration Solves
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Unlock government support and financial benefits for your business growth.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {painPoints.map((point, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
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

        {/* MSME Categories Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Choose Your MSME Category
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Select the right MSME classification based on your business investment and annual turnover.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {msmeCategories.map((category, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow relative">
                  <CardHeader className="p-0 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-orange-100 text-orange-800">{category.investment}</Badge>
                      <div className="text-2xl font-bold text-orange-600">{category.pricing}</div>
                    </div>
                    <CardTitle className="text-xl text-gray-900 mb-2">{category.type}</CardTitle>
                    <p className="text-gray-600 text-sm">Investment: {category.investment}</p>
                    <p className="text-gray-600 text-sm">Turnover: {category.turnover}</p>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Benefits:</h4>
                      <div className="space-y-2">
                        {category.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-sm text-gray-600"><strong>Ideal for:</strong> {category.idealFor}</p>
                    </div>

                    <Button className="w-full">
                      Register as {category.type}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Government Schemes Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Government Schemes Available
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Access various government schemes and financial support programs after MSME registration.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {schemes.map((scheme, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="p-3 bg-orange-100 rounded-lg">
                          <Award className="w-6 h-6 text-orange-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{scheme.scheme}</h3>
                        <p className="text-green-700 font-medium mb-2">{scheme.benefit}</p>
                        <p className="text-gray-600 text-sm">{scheme.eligibility}</p>
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
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our MSME Registration Service
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complete MSME registration with ongoing support for scheme access and compliance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {keyBenefits.map((benefit, index) => (
                <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          {benefit.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">{benefit.description}</p>
                        <div className="space-y-2">
                          {benefit.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{feature}</span>
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

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                MSME Registration Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process to get your MSME certificate and access government benefits.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="p-6 text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
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

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                What Our MSME Clients Say
              </h2>
              <p className="text-xl text-gray-600">
                Trusted by thousands of micro, small, and medium enterprises across India.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.company}</p>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{testimonial.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed italic">
                      "{testimonial.text}"
                    </p>
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
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common MSME registration questions.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-gray-50 border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-600 to-red-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Register for MSME Benefits?
            </h2>
            <p className="text-xl text-orange-100 mb-8 leading-relaxed">
              Get started with MSME registration and unlock government schemes, subsidies, and financial benefits for your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3">
                    Start MSME Registration
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Get MSME Registration Quote</DialogTitle>
                  </DialogHeader>
                  <ContactForm />
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3">
                <Phone className="mr-2 h-5 w-5" />
                Call Expert: +91-8447746183
              </Button>
            </div>

            <SalesPersonCards locationId={currentLocation?.id || 1} />
          </div>
        </section>
      </main>
      
      <Footer location={currentLocation} />
    </div>
  );
}