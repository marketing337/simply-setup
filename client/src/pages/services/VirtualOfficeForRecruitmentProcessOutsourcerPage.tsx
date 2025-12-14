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
  Users, 
  Shield, 
  MapPin, 
  Phone, 
  Mail, 
  UserCheck, 
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
  Search,
  UserPlus
} from "lucide-react";
import heroImage from "@assets/ChatGPT Image Jun 7, 2025, 01_48_00 PM_1749296051817.png";

export default function VirtualOfficeForRecruitmentProcessOutsourcerPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Client Trust & Professional Credibility",
      solution: "Professional business address in commercial hubs to build confidence with enterprise clients"
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Candidate Interview Infrastructure",
      solution: "Professional meeting rooms and interview spaces equipped for candidate assessments"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Regulatory Compliance & Licensing",
      solution: "Registered address for staffing agency licenses and labor department compliance"
    },
    {
      icon: <Building className="w-6 h-6 text-red-500" />,
      problem: "Multi-Location Operations",
      solution: "Presence across major cities for regional recruitment and client servicing"
    }
  ];

  const keyBenefits = [
    {
      icon: <UserCheck className="w-8 h-8 text-blue-600" />,
      title: "Professional Recruitment Infrastructure",
      description: "Complete setup for staffing agencies and recruitment process outsourcing companies",
      features: ["Interview room facilities", "Candidate assessment spaces", "Client presentation areas"]
    },
    {
      icon: <Building className="w-8 h-8 text-green-600" />,
      title: "Multi-City Presence",
      description: "Establish recruitment operations across Mumbai, Delhi, Bangalore, Pune, and Chennai",
      features: ["Regional recruitment hubs", "Local candidate sourcing", "Client proximity advantage"]
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "Compliance & Licensing Support",
      description: "Professional address for staffing license registration and labor law compliance",
      features: ["Staffing agency registration", "Labor department compliance", "Contract staffing licenses"]
    },
    {
      icon: <Globe className="w-8 h-8 text-orange-600" />,
      title: "Enterprise Client Credibility",
      description: "Build trust with Fortune 500 companies and large enterprises for RPO contracts",
      features: ["Enterprise client meetings", "Vendor registration support", "Professional presentation setup"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Business Registration",
      description: "Register your recruitment agency with professional address and complete staffing license applications",
      icon: <Building className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "Infrastructure Setup",
      description: "Access interview rooms, candidate assessment facilities, and client meeting spaces",
      icon: <Users className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "Client Acquisition",
      description: "Leverage professional presence to win enterprise clients and RPO contracts",
      icon: <Briefcase className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "Scale Operations",
      description: "Expand to multiple cities and grow your recruitment team with continued support",
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />
    }
  ];

  const successStories = [
    {
      company: "TechTalent RPO",
      founder: "Vikram Reddy",
      sector: "IT Recruitment Outsourcing",
      location: "Bangalore - Koramangala",
      achievement: "₹10Cr RPO contract with multinational",
      timeline: "Won major contract within 18 months",
      testimonial: "The Koramangala address gave us credibility with tech companies. Professional interview facilities helped us demonstrate our capabilities to enterprise clients.",
      metrics: ["₹10Cr RPO contract", "500+ placements annually", "25 enterprise clients"]
    },
    {
      company: "Corporate Staffing Solutions",
      founder: "Neha Agarwal",
      sector: "Executive Search & Staffing",
      location: "Mumbai - BKC", 
      achievement: "Expanded to 5 cities within 2 years",
      timeline: "From startup to multi-city operations",
      testimonial: "Mumbai BKC address was crucial for financial sector recruitment. The professional meeting spaces impressed C-level candidates and clients.",
      metrics: ["5 city operations", "₹15Cr annual revenue", "1000+ executive placements"]
    },
    {
      company: "Manufacturing Workforce Co.",
      founder: "Rajesh Kumar",
      sector: "Blue Collar Recruitment",
      location: "Delhi - Connaught Place",
      achievement: "Partnership with 50+ manufacturing units",
      timeline: "Built network in 24 months",
      testimonial: "The Delhi presence helped with government relations and manufacturing clients. Professional setup supported our vendor registrations.",
      metrics: ["50+ manufacturing partners", "₹5Cr annual contracts", "2000+ worker placements"]
    }
  ];

  const faqs = [
    {
      question: "Can you assist with staffing agency license registration?",
      answer: "Yes, we provide registered office address for staffing agency licenses and assist with labor department documentation. For specialized compliance, we connect you with employment law experts."
    },
    {
      question: "Do you have facilities suitable for candidate interviews and assessments?",
      answer: "Absolutely. Our meeting rooms are equipped for interviews, group discussions, and candidate assessments. We also provide video conferencing for remote interviews."
    },
    {
      question: "Can I use the address for vendor registration with large enterprises?",
      answer: "Yes, our premium business addresses are accepted for vendor registration with Fortune 500 companies and government organizations. We provide necessary documentation support."
    },
    {
      question: "Do you support multi-city recruitment operations?",
      answer: "Yes, we can establish your presence across multiple cities with consistent branding and professional infrastructure. Ideal for regional recruitment strategies."
    },
    {
      question: "How do you support RPO contract presentations and client meetings?",
      answer: "We provide professional boardrooms with presentation equipment, catering services, and executive ambiance perfect for RPO proposals and client presentations."
    },
    {
      question: "Can you assist with contract staffing and temporary employment compliance?",
      answer: "We provide registered address for contract staffing licenses. For complex labor law compliance, we recommend specialized employment law consultants."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Virtual Office for Recruitment Process Outsourcer | Staffing Agency Registration | RPO Business"
        description="Establish your recruitment agency with professional virtual office. Get staffing licenses, interview facilities, enterprise credibility, and multi-city presence for RPO business."
        keywords="virtual office for recruitment agency, staffing agency registration, RPO business address, interview facilities, enterprise recruitment credibility, staffing license"
        pageType="usecase"
        industry="recruitment-outsourcer"
        canonicalUrl="/usecase/virtual-office-for-recruitment-process-outsourcer"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                  <Users className="w-4 h-4 mr-1" />
                  For Recruitment Agencies
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Virtual Office for Recruitment Process Outsourcer
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Launch your recruitment agency with professional virtual office solutions. Get staffing licenses, interview facilities, enterprise credibility, and multi-city presence for successful RPO operations.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Start Your Recruitment Business
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
                    <span>Staffing licenses</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Interview facilities</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Enterprise credibility</span>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={heroImage} 
                      alt="Recruitment agency team conducting interviews with professional virtual office"
                      className="w-full h-auto max-w-lg object-cover"
                      loading="eager"
                    />
                  </div>
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-green-100 rounded-full opacity-60"></div>
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
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Recruitment Business Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Build a credible recruitment agency with professional infrastructure that wins enterprise clients and top candidates.
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
                Complete Recruitment Business Infrastructure
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything your recruitment agency needs to compete with established players and win major RPO contracts.
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

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Your Recruitment Agency Launch Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Establish your recruitment business with professional infrastructure in 4 steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Recruitment Agency Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Successful recruitment agencies that built profitable businesses with our virtual office support.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-2 mb-4">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-600">{story.location}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{story.company}</h3>
                    <p className="text-gray-600 mb-2">by {story.founder}</p>
                    <Badge className="mb-4 bg-blue-100 text-blue-800">{story.sector}</Badge>
                    
                    <div className="mb-6">
                      <div className="text-lg font-bold text-blue-600 mb-1">{story.achievement}</div>
                      <div className="text-sm text-gray-500">{story.timeline}</div>
                    </div>

                    <blockquote className="text-gray-700 mb-6 italic">
                      "{story.testimonial}"
                    </blockquote>

                    <div className="space-y-2">
                      {story.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-gray-600">{metric}</span>
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
                Everything you need to know about virtual offices for recruitment agencies.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Launch Your Recruitment Agency?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join successful recruitment agencies that built profitable businesses with our professional infrastructure and support.
            </p>
            
            <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  Start Your Agency Today
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
      
      <Footer />
    </div>
  );
}