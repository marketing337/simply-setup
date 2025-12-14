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
import { Dialog, DialogContent,  DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  CheckCircle, 
  Factory, 
  Shield, 
  MapPin, 
  Building, 
  Globe, 
  TrendingUp, 
  ArrowRight,
  FileText,
  Clock,
  Award,
  Target,
  CheckSquare,
  IndianRupee,
  Users,
  Briefcase
} from "lucide-react";

export default function VirtualOfficeForMSMERegistrationPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "High Infrastructure Investment Required",
      solution: "Professional business address without large infrastructure investment for MSME registration"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Complex Udyam Portal Navigation",
      solution: "Expert assistance with Udyam registration portal and complete documentation support"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Lengthy Government Approval Process",
      solution: "Fast-track MSME registration completed within 5-7 working days with expert guidance"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      problem: "Classification and Category Confusion",
      solution: "Expert guidance on correct MSME classification based on investment and turnover criteria"
    }
  ];

  const keyBenefits = [
    {
      icon: <Factory className="w-8 h-8 text-blue-600" />,
      title: "Complete MSME Registration Support",
      description: "End-to-end Udyam registration with expert guidance for micro, small, and medium enterprises",
      features: ["Udyam portal registration", "Classification assistance", "Document verification", "MSME certificate"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Government Scheme Access", 
      description: "Unlock government benefits, subsidies, and schemes available exclusively for registered MSMEs",
      features: ["Subsidy scheme access", "Priority sector lending", "Government tender eligibility", "Export promotion schemes"]
    },
    {
      icon: <Building className="w-8 h-8 text-purple-600" />,
      title: "Professional Business Infrastructure",
      description: "Establish MSME operations with government-verified business addresses and professional setup",
      features: ["Government verified address", "Business correspondence handling", "Professional reception", "Meeting facilities"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Business Growth & Compliance",
      description: "Scale your MSME operations with ongoing compliance support and business development assistance",
      features: ["Annual compliance support", "Investment tracking", "Turnover monitoring", "Upgrade guidance"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Business Assessment & Classification",
      description: "Evaluate your business to determine correct MSME category (micro/small/medium) based on investment and turnover",
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "Udyam Portal Registration",
      description: "File Udyam registration application through government portal with all required business details and documentation",
      icon: <Globe className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "Verification & Processing",
      description: "Government verification of business details and address with our support throughout the approval process",
      icon: <CheckSquare className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "MSME Certificate & Benefits",
      description: "Receive Udyam registration certificate and begin accessing government schemes and benefits for MSMEs",
      icon: <Award className="w-6 h-6 text-blue-600" />
    }
  ];

  const msmeCategories = [
    {
      type: "Micro Enterprise",
      investment: "Up to ₹1 Crore",
      turnover: "Up to ₹5 Crore",
      benefits: ["Priority sector lending", "Collateral-free loans up to ₹10 lakh", "Government scheme access", "Tax benefits"],
      idealFor: "Small manufacturers, service providers, traders"
    },
    {
      type: "Small Enterprise",
      investment: "₹1 Crore to ₹10 Crore",
      turnover: "₹5 Crore to ₹50 Crore",
      benefits: ["Bank loan preferences", "Government tender participation", "Export promotion benefits", "Technology upgradation support"],
      idealFor: "Growing manufacturers, IT companies, service businesses"
    },
    {
      type: "Medium Enterprise",
      investment: "₹10 Crore to ₹50 Crore",
      turnover: "₹50 Crore to ₹250 Crore",
      benefits: ["Large project eligibility", "Export incentives", "Cluster development programs", "Infrastructure development support"],
      idealFor: "Established manufacturers, large service providers, exporters"
    }
  ];

  const governmentBenefits = [
    {
      category: "Financial Benefits",
      schemes: [
        "Priority Sector Lending with lower interest rates",
        "Collateral-free loans up to ₹10 lakh for micro enterprises",
        "Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)",
        "Stand-Up India scheme for SC/ST and women entrepreneurs"
      ]
    },
    {
      category: "Business Development",
      schemes: [
        "Market Development Assistance (MDA) for exports",
        "Technology Upgradation Fund Scheme (TUFS)",
        "Cluster Development Programme for infrastructure",
        "Quality Management Standards & Quality Technology Tools"
      ]
    },
    {
      category: "Government Procurement",
      schemes: [
        "25% reservation in government procurement",
        "Price preference in government tenders",
        "Exemption from earnest money and tender fees",
        "GeM (Government e-Marketplace) seller benefits"
      ]
    }
  ];

  const faqs = [
    {
      question: "What is the difference between old SSI registration and new Udyam registration?",
      answer: "Udyam registration replaced the earlier SSI, MSME, and other registrations in July 2020. It's a single online registration that's free of cost and provides a unique Udyam Registration Number (URN) for accessing all MSME benefits."
    },
    {
      question: "Can I register for MSME with virtual office address?",
      answer: "Yes, virtual office addresses are fully accepted for Udyam registration. Our government-verified addresses come with all required documentation and utility bills for smooth MSME registration process."
    },
    {
      question: "How long does MSME registration take and what is the validity?",
      answer: "Udyam registration typically takes 5-7 working days and is valid for the lifetime of the enterprise. There's no renewal required, but you need to file annual returns and update information as business grows."
    },
    {
      question: "What are the investment and turnover criteria for MSME classification?",
      answer: "Classification is based on both investment in plant & machinery/equipment and annual turnover. Micro: up to ₹1Cr investment & ₹5Cr turnover, Small: ₹1-10Cr investment & ₹5-50Cr turnover, Medium: ₹10-50Cr investment & ₹50-250Cr turnover."
    },
    {
      question: "What government benefits can I access after MSME registration?",
      answer: "Benefits include priority sector lending, collateral-free loans, 25% reservation in government procurement, price preference in tenders, export promotion schemes, subsidy access, and various skill development programs."
    },
    {
      question: "Do you provide support for annual MSME compliance and returns?",
      answer: "Yes, we provide ongoing support for annual return filing, investment and turnover updates, compliance monitoring, and guidance on upgrading categories as your business grows."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        pageType="purpose"
        service="msme-registration"
        canonicalUrl="/purpose/virtual-office-for-msme-registration"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-orange-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200">
                  <Factory className="w-4 h-4 mr-1" />
                  MSME Registration
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Virtual Office for MSME Registration
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Register your MSME with professional business address. Complete Udyam registration, access government benefits and schemes, with ongoing compliance support for micro, small, and medium enterprises.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Start MSME Registration
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
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>5-7 day registration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Government verified address</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Scheme access support</span>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-orange-100 to-yellow-100 p-12">
                    <Factory className="w-48 h-48 text-orange-600 mx-auto" />
                  </div>
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-orange-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-yellow-100 rounded-full opacity-60"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sales Person Card */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {currentLocation && (
              <SalesPersonCards locationId={currentLocation.id} />
            )}
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                MSME Registration Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simplify your MSME registration with expert guidance and compliant business infrastructure for accessing government benefits.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {painPoints.map((point, index) => (
                <Card key={index} className="p-6 border-l-4 border-red-500 shadow-lg hover:shadow-xl transition-shadow">
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
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Complete MSME Registration & Support Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need for hassle-free MSME registration and accessing government schemes and benefits.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {keyBenefits.map((benefit, index) => (
                <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="mb-6">{benefit.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{benefit.description}</p>
                    <div className="space-y-3">
                      {benefit.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
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

        {/* MSME Categories Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                MSME Categories & Classification
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the right MSME category based on your investment and turnover to access appropriate government benefits.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {msmeCategories.map((category, index) => (
                <Card key={index} className="p-6 border-t-4 border-orange-500 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl font-bold text-gray-900">{category.type}</CardTitle>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div><strong>Investment:</strong> {category.investment}</div>
                      <div><strong>Turnover:</strong> {category.turnover}</div>
                      <div><strong>Ideal for:</strong> {category.idealFor}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Benefits:</h4>
                    <div className="space-y-2">
                      {category.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Government Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Government Benefits for Registered MSMEs
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Access exclusive government schemes, subsidies, and benefits available only for registered MSME enterprises.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {governmentBenefits.map((benefit, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl font-bold text-gray-900 mb-3">{benefit.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-3">
                      {benefit.schemes.map((scheme, schemeIndex) => (
                        <div key={schemeIndex} className="flex items-start space-x-3">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 leading-relaxed">{scheme}</span>
                        </div>
                      ))}
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
                How MSME Registration Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process to get your MSME registered and access government benefits within 5-7 working days.
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

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about MSME registration process and benefits.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
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
        <section className="py-20 bg-gradient-to-r from-orange-600 to-yellow-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Register Your MSME?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Get your Udyam registration certificate and unlock government benefits with complete support and professional business address. Start your MSME journey today.
            </p>
            <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  Start MSME Registration Now
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
      </main>
      
      <Footer location={currentLocation} />
    </div>
  );
}