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
  Globe, 
  Shield, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Building, 
  Plane, 
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
  Flag,
  Building2
} from "lucide-react";
import heroImage from "@assets/ChatGPT Image Jun 7, 2025, 01_48_00 PM_1749296051817.png";

export default function VirtualOfficeForForeignSMEEntryDeskPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Pain points that foreign SMEs face when entering India
  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Complex Indian Market Entry Requirements",
      solution: "Complete regulatory guidance and local business address for smooth market entry"
    },
    {
      icon: <Building className="w-6 h-6 text-red-500" />,
      problem: "Local Presence & Credibility",
      solution: "Professional Indian business address in major commercial hubs for local market trust"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "FEMA & RBI Compliance",
      solution: "Expert assistance with foreign investment regulations and RBI reporting requirements"
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Local Partner & Vendor Network",
      solution: "Access to verified local partners, suppliers, and business development support"
    }
  ];

  // Key benefits for foreign SME entry
  const keyBenefits = [
    {
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      title: "India Market Entry Support",
      description: "Complete support for establishing your foreign SME's presence in Indian markets",
      features: ["FEMA compliance assistance", "RBI reporting support", "Local incorporation guidance"]
    },
    {
      icon: <Building2 className="w-8 h-8 text-green-600" />,
      title: "Strategic Location Presence",
      description: "Professional addresses in Mumbai's BKC, Delhi's Connaught Place, Bangalore's UB City",
      features: ["Premium business district locations", "Multinational corporation proximity", "Government office accessibility"]
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "Regulatory Compliance",
      description: "Navigate Indian business regulations with expert guidance and documentation support",
      features: ["GST registration for foreign entities", "Import-export license assistance", "Tax structure optimization"]
    },
    {
      icon: <Users className="w-8 h-8 text-orange-600" />,
      title: "Local Business Network",
      description: "Connect with verified local partners, suppliers, and business development opportunities",
      features: ["Vetted supplier networks", "Local hiring assistance", "Cultural adaptation support"]
    }
  ];

  // Process for foreign SME entry
  const processSteps = [
    {
      step: "1",
      title: "Market Entry Consultation",
      description: "Detailed consultation on Indian market entry strategy, regulations, and business structure options",
      icon: <MapPin className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "Regulatory Setup",
      description: "Complete assistance with FEMA approvals, RBI compliance, and Indian business registration",
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "Local Presence Establishment",
      description: "Professional business address setup with local support infrastructure and team coordination",
      icon: <Building className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "Business Development Support",
      description: "Ongoing support for local partnerships, team building, and market expansion activities",
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />
    }
  ];

  // Success stories
  const successStories = [
    {
      company: "Nordic Tech Solutions",
      founder: "Erik Andersson (Sweden)",
      sector: "Industrial IoT Solutions",
      location: "Mumbai - BKC",
      achievement: "₹15Cr revenue in Year 2",
      timeline: "From market entry to profitability in 18 months",
      testimonial: "The Mumbai BKC address gave us immediate credibility with Indian manufacturers. The regulatory support was invaluable for navigating FEMA and RBI requirements.",
      metrics: ["₹15Cr revenue achieved", "50+ manufacturing clients", "3 state operations"]
    },
    {
      company: "German Engineering Co.",
      founder: "Hans Mueller (Germany)",
      sector: "Precision Manufacturing",
      location: "Delhi - Connaught Place", 
      achievement: "Joint venture with Tata Group",
      timeline: "Strategic partnership within 12 months",
      testimonial: "Having a Connaught Place address was crucial for government relations and large corporate partnerships. The local team support accelerated our expansion.",
      metrics: ["Tata Group JV secured", "₹25Cr project pipeline", "200+ employees hired locally"]
    },
    {
      company: "Singapore FinServ",
      founder: "Liam Chen (Singapore)",
      sector: "Financial Services",
      location: "Bangalore - UB City",
      achievement: "RBI license for payment services",
      timeline: "Regulatory approval in 10 months",
      testimonial: "The Bangalore presence and regulatory support helped us navigate RBI requirements efficiently. Local expertise was critical for compliance.",
      metrics: ["RBI license approved", "₹5Cr investment deployed", "50K+ transactions monthly"]
    }
  ];

  // FAQ section
  const faqs = [
    {
      question: "What support do you provide for FEMA compliance and foreign investment regulations?",
      answer: "We provide comprehensive FEMA compliance support including documentation assistance, RBI reporting guidance, and connecting you with specialized FEMA consultants for complex foreign investment structures."
    },
    {
      question: "Can you help with setting up Indian subsidiary or branch office?",
      answer: "Yes, we provide registered office address for both subsidiary incorporation and branch office establishment. We also assist with MCA filings and regulatory documentation required for foreign companies."
    },
    {
      question: "Do you assist with GST registration for foreign entities?",
      answer: "Absolutely. We help foreign companies with GST registration requirements, including documentation for non-resident entities and compliance with Indian tax regulations."
    },
    {
      question: "What kind of local business network access do you provide?",
      answer: "We connect foreign SMEs with vetted local suppliers, potential partners, legal advisors, and business development opportunities through our extensive network across major Indian cities."
    },
    {
      question: "Can you assist with hiring local teams and HR compliance?",
      answer: "We provide guidance on local hiring practices, employment law compliance, and can connect you with specialized HR consultants for setting up your Indian operations team."
    },
    {
      question: "Do you help with import-export licenses and customs procedures?",
      answer: "Yes, we assist with IEC (Import Export Code) registration, customs documentation, and connecting you with specialized trade consultants for complex import-export operations."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Virtual Office for Foreign SME India Entry | International Business Setup | FEMA Compliance"
        description="Establish your foreign SME in India with professional virtual office solutions. Get FEMA compliance, RBI support, and local business presence in Mumbai, Delhi, Bangalore."
        keywords="foreign SME India entry, international business setup India, FEMA compliance, RBI reporting, foreign company registration, virtual office for foreign companies"
        pageType="usecase"
        industry="foreign-sme"
        canonicalUrl="/usecase/virtual-office-for-foreign-sme-entry-desk"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                  <Globe className="w-4 h-4 mr-1" />
                  For Foreign SMEs
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Foreign SME India Entry Desk
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Establish your foreign SME in India with professional virtual office solutions. Complete FEMA compliance, RBI support, local presence in Mumbai BKC, Delhi CP, Bangalore UB City, and business development assistance.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Enter Indian Market
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
                    <span>FEMA compliance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>RBI support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Local presence</span>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={heroImage} 
                      alt="Foreign SME team establishing business presence in India"
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
                Foreign SME India Entry Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Navigate complex Indian market entry requirements with expert guidance and professional infrastructure support.
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
                Complete India Market Entry Support
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything your foreign SME needs to successfully establish and grow in the Indian market.
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
                Your India Market Entry Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Structured approach to establishing your foreign SME's successful presence in India.
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
                Foreign SME Success Stories in India
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                International companies that successfully entered the Indian market with our support.
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
                Everything you need to know about establishing your foreign SME in India.
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
              Ready to Enter the Indian Market?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join successful foreign SMEs that established profitable operations in India with our comprehensive support.
            </p>
            
            <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  Start Your India Journey
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