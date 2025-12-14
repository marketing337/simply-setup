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
  Receipt, 
  Shield, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
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
  IndianRupee
} from "lucide-react";

export default function VirtualOfficeForGSTRegistrationPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "High Commercial Address Costs",
      solution: "GST-compliant business address at fraction of commercial property rates"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Complex GST Portal Navigation",
      solution: "Expert assistance with GST portal filing and documentation submission"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Lengthy Verification Process",
      solution: "Fast-track GST registration completed within 3-7 working days"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      problem: "Document Verification Issues",
      solution: "Pre-verified addresses with instant NOC and utility bills provided"
    }
  ];

  const keyBenefits = [
    {
      icon: <Receipt className="w-8 h-8 text-blue-600" />,
      title: "Complete GST Registration Support",
      description: "End-to-end GST registration with expert guidance through the entire process",
      features: ["GST portal application", "Document verification", "Address validation", "GSTIN certificate"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Compliance & Returns Management", 
      description: "Ongoing GST compliance support with return filing and documentation",
      features: ["Monthly return filing", "Input tax credit optimization", "Compliance calendar", "Amendment support"]
    },
    {
      icon: <Building className="w-8 h-8 text-purple-600" />,
      title: "Professional Business Address",
      description: "GST-compliant registered address in prime business locations across India",
      features: ["Government verified address", "Utility bill provision", "NOC certificate", "Mail forwarding service"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Business Growth Support",
      description: "Scale your GST operations with multi-state registration and interstate trade support",
      features: ["Multi-state GST registration", "Interstate billing support", "E-way bill assistance", "Audit preparation"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Document Collection",
      description: "Gather required documents including PAN card, business registration, address proof, and bank details",
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "GST Portal Application",
      description: "File GST registration application through government portal with all verified documents",
      icon: <Globe className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "Verification & Approval",
      description: "Address verification and document review by GST authorities, with our support throughout",
      icon: <CheckSquare className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "GSTIN Certificate",
      description: "Receive your GSTIN certificate and begin compliant business operations with ongoing support",
      icon: <Award className="w-6 h-6 text-blue-600" />
    }
  ];

  const gstCategories = [
    {
      type: "Regular GST Registration",
      threshold: "₹40 Lakh+ annual turnover",
      timeline: "3-7 working days",
      features: ["Full input tax credit", "Interstate supplies", "Composition scheme option", "E-invoice mandate"],
      idealFor: "Manufacturing, trading, service businesses above threshold"
    },
    {
      type: "Composition Scheme",
      threshold: "₹1.5 Cr annual limit", 
      timeline: "5-10 working days",
      features: ["Lower tax rates", "Quarterly returns", "Simplified compliance", "No input tax credit"],
      idealFor: "Small businesses, retailers, restaurants"
    },
    {
      type: "Casual Taxable Person",
      threshold: "Temporary business operations",
      timeline: "2-5 working days",
      features: ["Temporary registration", "Advance tax deposit", "Limited period validity", "Interstate supplies"],
      idealFor: "Exhibition vendors, seasonal businesses"
    }
  ];

  const faqs = [
    {
      question: "What documents are required for GST registration?",
      answer: "Required documents include PAN card, business registration certificate, address proof of business premises, bank account details, digital signature, and photographs. For virtual office, we provide address proof and NOC certificate."
    },
    {
      question: "Can I use virtual office address for GST registration?",
      answer: "Yes, virtual office addresses are fully accepted for GST registration. Our addresses are pre-verified with GST authorities and come with utility bills, NOC certificates, and all required documentation for smooth registration."
    },
    {
      question: "How long does GST registration take with virtual office?",
      answer: "GST registration typically takes 3-7 working days with virtual office address. The process is faster because our addresses are pre-verified and we provide immediate documentation support."
    },
    {
      question: "What is the difference between regular GST and composition scheme?",
      answer: "Regular GST allows full input tax credit and interstate supplies but requires monthly returns. Composition scheme offers lower tax rates and quarterly returns but no input tax credit and only intrastate supplies allowed."
    },
    {
      question: "Do you provide ongoing GST compliance support?",
      answer: "Yes, we offer comprehensive GST compliance services including monthly return filing (GSTR-1, GSTR-3B), annual returns, input tax credit reconciliation, and amendment support. Our CA team ensures 100% compliance."
    },
    {
      question: "What happens if GST registration gets rejected?",
      answer: "GST rejections are rare with our pre-verified addresses and expert documentation. If rejection occurs, we provide free re-application support, address any deficiencies, and ensure successful registration without additional charges."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        pageType="purpose"
        service="gst-registration"
        canonicalUrl="/purpose/virtual-office-for-gst-registration"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-green-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
                  <Receipt className="w-4 h-4 mr-1" />
                  GST Registration
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Virtual Office for GST Registration
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Get your GSTIN certificate with professional business address. Complete GST registration, compliance support, and ongoing return filing assistance in one comprehensive package.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Start GST Registration
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
                    <span>3-7 day registration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Pre-verified address</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Expert compliance support</span>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-green-100 to-blue-100 p-12">
                    <Receipt className="w-48 h-48 text-green-600 mx-auto" />
                  </div>
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-green-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-100 rounded-full opacity-60"></div>
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
                GST Registration Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Streamline your GST registration with professional support and compliant business infrastructure.
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
                Complete GST Registration & Compliance Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need for hassle-free GST registration and ongoing tax compliance management.
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

        {/* GST Categories Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Types of GST Registration Available
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the right GST registration category based on your business needs and turnover requirements.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {gstCategories.map((category, index) => (
                <Card key={index} className="p-6 border-t-4 border-green-500 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl font-bold text-gray-900">{category.type}</CardTitle>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div><strong>Threshold:</strong> {category.threshold}</div>
                      <div><strong>Timeline:</strong> {category.timeline}</div>
                      <div><strong>Ideal for:</strong> {category.idealFor}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <div className="space-y-2">
                      {category.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
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

        {/* How It Works Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                How GST Registration Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process to get your GSTIN certificate and become GST compliant within 3-7 working days.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="p-6 text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      {step.icon}
                    </div>
                    <div className="bg-green-600 text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4">
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
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about GST registration process and compliance.
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
        <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Get GST Registered?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Get your GSTIN certificate with complete compliance support and professional business address. Start your tax-compliant business operations today.
            </p>
            <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  Start GST Registration Now
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