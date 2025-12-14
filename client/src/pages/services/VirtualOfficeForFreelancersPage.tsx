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
  User, 
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
  Laptop,
  IndianRupee
} from "lucide-react";
import heroImage from "@assets/ChatGPT Image Jun 7, 2025, 05_01_12 PM_1749296049965.png";

export default function VirtualOfficeForFreelancersPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Pain points that freelancers face
  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Lack of Professional Business Identity",
      solution: "Professional business address and GST registration for credibility"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Complex Tax and Compliance Requirements",
      solution: "Complete GST registration and tax compliance support"
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Client Trust and Payment Issues",
      solution: "Professional business infrastructure that builds client confidence"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Time Spent on Administrative Tasks",
      solution: "Mail handling, call management, and business support services"
    }
  ];

  // Key benefits for freelancers
  const keyBenefits = [
    {
      icon: <User className="w-8 h-8 text-emerald-600" />,
      title: "Professional Business Identity",
      description: "Transform from freelancer to legitimate business entity with proper registration and infrastructure",
      features: ["Professional business address", "GST registration support", "Business phone number", "Professional email setup"]
    },
    {
      icon: <IndianRupee className="w-8 h-8 text-green-600" />,
      title: "Higher Client Rates",
      description: "Command premium rates by operating as a registered business rather than individual freelancer",
      features: ["GST invoice capability", "Business credibility", "Corporate client access", "Professional proposals"]
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Tax Benefits & Compliance",
      description: "Access business tax benefits and ensure full compliance with Indian regulations",
      features: ["Input tax credit on GST", "Business expense deductions", "Professional tax guidance", "Compliance tracking"]
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: "Global Client Access",
      description: "Work with international clients using proper business infrastructure and documentation",
      features: ["Business registration certificate", "Professional meeting spaces", "International payment support", "Export documentation"]
    }
  ];

  // How it works process for freelancers
  const processSteps = [
    {
      step: "1",
      title: "Business Registration Setup",
      description: "Register your freelance business with professional address and complete all necessary documentation",
      icon: <FileText className="w-6 h-6 text-emerald-600" />
    },
    {
      step: "2", 
      title: "GST Registration & Compliance",
      description: "Get GST registration completed and set up proper invoicing and tax compliance systems",
      icon: <Calculator className="w-6 h-6 text-emerald-600" />
    },
    {
      step: "3",
      title: "Professional Operations",
      description: "Start operating as registered business with professional communication and client management",
      icon: <Laptop className="w-6 h-6 text-emerald-600" />
    },
    {
      step: "4",
      title: "Scale Your Business",
      description: "Expand client base, increase rates, and grow your freelance business into a full-fledged company",
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />
    }
  ];

  // Success stories with measurable outcomes
  const successStories = [
    {
      freelancer: "Priya Sharma",
      specialization: "Graphic Designer",
      location: "Mumbai",
      achievement: "Increased rates by 60% and client base by 200%",
      timeline: "Within 8 months",
      testimonial: "GST registration and professional business setup helped me work with Fortune 500 companies. Clients trust businesses more than individual freelancers. My income tripled in less than a year.",
      metrics: ["₹15L annual income", "60% rate increase", "25 corporate clients"]
    },
    {
      freelancer: "Rahul Kumar",
      specialization: "Web Developer",
      location: "Bangalore",
      achievement: "Built team of 8 developers",
      timeline: "Within 18 months",
      testimonial: "Started as solo freelancer, now run a development agency. The professional business infrastructure was key to winning enterprise clients and scaling the team.",
      metrics: ["8 team members", "₹50L annual revenue", "15 enterprise clients"]
    },
    {
      freelancer: "Kavya Reddy", 
      specialization: "Digital Marketing Consultant",
      location: "Hyderabad",
      achievement: "Secured 3 international clients",
      timeline: "Within 6 months",
      testimonial: "Professional business address and meeting rooms helped me expand internationally. International clients prefer working with registered businesses rather than individual freelancers.",
      metrics: ["3 international clients", "₹25L project value", "12 countries served"]
    }
  ];

  // FAQ section for freelancers
  const faqs = [
    {
      question: "How does GST registration benefit my freelance business?",
      answer: "GST registration allows you to charge GST to clients (increasing your effective rates), claim input tax credits on business expenses, work with larger corporate clients who prefer GST-registered vendors, and operate as a legitimate business entity."
    },
    {
      question: "Can I use the virtual office address for all my business registrations?",
      answer: "Yes, our virtual office addresses are accepted for GST registration, professional licenses, bank account opening, and most government registrations. We provide all necessary documentation for verification."
    },
    {
      question: "How do you help with client meetings when I work remotely?",
      answer: "We provide professional meeting rooms that you can book by the hour for client meetings. This gives you a professional space to meet clients without maintaining a physical office. Video conferencing facilities are also available."
    },
    {
      question: "What support do you provide for transitioning from individual to business?",
      answer: "We guide you through the entire process - business name registration, GST registration, professional bank account setup, business license applications, and ongoing compliance management. Our team handles all paperwork and government interactions."
    },
    {
      question: "Can I invoice international clients using this business setup?",
      answer: "Absolutely. With proper business registration and GST setup, you can issue professional invoices to international clients. We also help with export documentation and international payment processing setup."
    },
    {
      question: "How does this help me get higher rates from clients?",
      answer: "Registered businesses command higher rates because they appear more professional and trustworthy. You can charge GST (which is often passed to clients), access corporate procurement processes, and justify premium pricing with professional infrastructure."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        pageType="usecase"
        industry="freelancers"
        canonicalUrl="/usecase/virtual-office-for-freelancers"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content on Left */}
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                  <User className="w-4 h-4 mr-1" />
                  For Freelancers
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Get Virtual Office for Freelancers
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Get GST registration, professional business address, and complete infrastructure to operate as a legitimate business. Increase your rates, work with corporate clients, and access tax benefits.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Start My Business
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
                    <span>GST registration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Higher client rates</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Tax benefits</span>
                  </div>
                </div>
              </div>

              {/* Image on Right */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={heroImage} 
                      alt="Professional freelancers using virtual office solutions"
                      className="w-full h-auto max-w-lg object-cover"
                      loading="eager"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-emerald-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-teal-100 rounded-full opacity-60"></div>
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
                Common Freelancer Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stop losing opportunities due to lack of professional infrastructure. Transform your freelance work into a legitimate business.
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
                Complete Business Transformation Package
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to operate as a professional business and access opportunities that individual freelancers can't.
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

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                How to Transform Your Freelance Business
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process to convert from individual freelancer to professional business entity.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-emerald-600">{step.step}</span>
                      </div>
                      <div className="flex justify-center mb-4">{step.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
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
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Real Success Stories from Freelancers
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how professional business setup helped these freelancers scale their income and win bigger clients.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{story.freelancer}</h3>
                        <Award className="w-6 h-6 text-yellow-500" />
                      </div>
                      <div className="text-sm text-gray-600 mb-2">{story.specialization}</div>
                      <div className="text-sm text-emerald-600 mb-1">📍 {story.location}</div>
                      <div className="text-sm font-semibold text-green-600 mb-1">{story.achievement}</div>
                      <div className="text-sm text-orange-600">{story.timeline}</div>
                    </div>
                    <blockquote className="text-gray-700 italic leading-relaxed mb-4">
                      "{story.testimonial}"
                    </blockquote>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Key Metrics:</h4>
                      {story.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-700">{metric}</span>
                        </div>
                      ))}
                    </div>
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
                Get answers to common questions about transforming your freelance work into a business.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your Freelance Business?
            </h2>
            <p className="text-xl mb-8 text-emerald-100">
              Join 1000+ freelancers who transformed their business and increased their income. Get professional infrastructure and start commanding premium rates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3">
                    Start My Business Today
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
            <div className="text-sm text-emerald-200">
              ✅ GST registration support  ✅ 60% average rate increase  ✅ Tax benefits
            </div>
          </div>
        </section>
      </main>
      
      <Footer location={currentLocation} />
    </div>
  );
}