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
  Sun, 
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
  Leaf,
  Battery
} from "lucide-react";
import heroImage from "@assets/image (1)_1749296156045.png";

export default function VirtualOfficeForRenewableEnergyPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Pain points that renewable energy companies face
  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Complex Government Approvals and Licensing",
      solution: "Professional business address for MNRE, SECI, and state renewable energy approvals"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Multiple Project Site Coordination",
      solution: "Centralized business operations for multi-location renewable energy projects"
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Investor and Stakeholder Credibility",
      solution: "Prestigious business address that builds confidence for large renewable energy investments"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Long Project Cycles and Documentation",
      solution: "Professional mail handling and document management for lengthy project approvals"
    }
  ];

  // Key benefits for renewable energy companies
  const keyBenefits = [
    {
      icon: <Sun className="w-8 h-8 text-yellow-600" />,
      title: "Government Approvals & Licensing",
      description: "Streamline renewable energy project approvals with verified business address and compliance support",
      features: ["MNRE registration", "State policy approvals", "Solar/wind project licenses", "Subsidy documentation"]
    },
    {
      icon: <Battery className="w-8 h-8 text-green-600" />,
      title: "Multi-Project Coordination",
      description: "Manage renewable energy projects across multiple states with unified business infrastructure",
      features: ["Multi-state operations", "Project coordination hub", "Vendor management", "Site documentation"]
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Investment & Banking Support",
      description: "Build credibility for renewable energy financing and investment with professional setup",
      features: ["Bank loan documentation", "Investor presentations", "Financial compliance", "Credit facility support"]
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: "International Operations",
      description: "Support global renewable energy partnerships and export opportunities",
      features: ["Export documentation", "International partnerships", "Technology transfer", "Global certification"]
    }
  ];

  // How it works process for renewable energy
  const processSteps = [
    {
      step: "1",
      title: "Renewable Energy Business Setup",
      description: "Register your renewable energy company with MNRE and obtain necessary government approvals",
      icon: <Building className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "2", 
      title: "Project Licensing & Approvals",
      description: "Complete solar/wind project licensing with state authorities and obtain policy benefits",
      icon: <FileText className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "3",
      title: "Project Implementation",
      description: "Coordinate renewable energy project execution across multiple locations with professional support",
      icon: <Sun className="w-6 h-6 text-yellow-600" />
    },
    {
      step: "4",
      title: "Scale & Expand Operations",
      description: "Grow renewable energy portfolio and expand to new states with additional project approvals",
      icon: <TrendingUp className="w-6 h-6 text-yellow-600" />
    }
  ];

  // Success stories with measurable outcomes
  const successStories = [
    {
      company: "SolarTech Solutions",
      founder: "Dr. Amit Sharma",
      specialization: "Solar Power Projects",
      location: "Rajasthan & Gujarat",
      achievement: "Commissioned 500MW solar projects worth ₹2,500Cr",
      timeline: "Within 36 months",
      testimonial: "Professional business setup helped us secure MNRE approvals and state government clearances for large-scale solar projects. Investors and banks trust companies with proper infrastructure for renewable energy financing.",
      metrics: ["500MW capacity", "₹2,500Cr projects", "15 solar farms"]
    },
    {
      company: "WindPower India",
      founder: "Meera Patel",
      specialization: "Wind Energy Projects",
      location: "Tamil Nadu & Karnataka",
      achievement: "Developed 300MW wind farms",
      timeline: "Within 30 months",
      testimonial: "Having professional addresses in wind-rich states helped us establish credibility with state electricity boards and secure long-term power purchase agreements. Professional infrastructure is crucial for renewable energy success.",
      metrics: ["300MW wind capacity", "₹1,800Cr investment", "12 wind farms"]
    },
    {
      company: "GreenTech Innovations",
      founder: "Rajesh Kumar",
      specialization: "Hybrid Renewable Projects",
      location: "Maharashtra & Andhra Pradesh",
      achievement: "Built India's largest hybrid solar-wind project",
      timeline: "Within 42 months",
      testimonial: "Professional business setup enabled us to coordinate complex hybrid renewable energy projects across multiple states. Government approvals and investor confidence came much easier with proper business infrastructure.",
      metrics: ["200MW hybrid project", "₹1,200Cr investment", "First-of-kind technology"]
    }
  ];

  // FAQ section for renewable energy
  const faqs = [
    {
      question: "How does virtual office help with MNRE and government approvals?",
      answer: "Our virtual office addresses are verified and accepted by MNRE, SECI, and state renewable energy departments. We provide all necessary documentation for renewable energy project approvals, subsidies, and policy benefits. Professional addresses are essential for government credibility."
    },
    {
      question: "Can I use the address for renewable energy project licensing?",
      answer: "Yes, our virtual office addresses are accepted for solar/wind project licensing, environmental clearances, land acquisition documentation, and all renewable energy regulatory approvals across different states."
    },
    {
      question: "How do you support multi-state renewable energy operations?",
      answer: "We provide virtual office services across 15+ major cities including renewable energy hubs. You can coordinate projects in multiple states while maintaining consistent business presence and regulatory compliance."
    },
    {
      question: "What support do you provide for renewable energy financing?",
      answer: "Professional business infrastructure significantly helps with bank loans, investor presentations, and financial institution partnerships. Renewable energy projects require substantial funding, and professional setup builds crucial credibility with lenders."
    },
    {
      question: "How does this help with international renewable energy partnerships?",
      answer: "Professional business addresses and meeting facilities help establish credibility with international technology partners, equipment suppliers, and global renewable energy companies. We also support export documentation for renewable energy equipment."
    },
    {
      question: "What compliance support do you provide for renewable energy companies?",
      answer: "We help with regulatory compliance including environmental clearances, grid connectivity approvals, power purchase agreement documentation, and ongoing reporting requirements for renewable energy projects."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        pageType="usecase"
        industry="renewable-energy"
        canonicalUrl="/usecase/virtual-office-for-renewable-energy"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content on Left */}
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                  <Sun className="w-4 h-4 mr-1" />
                  For Renewable Energy & Solar
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Get Virtual Office for Renewable Energy and Solar
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  MNRE registration, government approvals, project licensing, and complete renewable energy business infrastructure. Build credibility for solar, wind, and hybrid energy projects.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Start Your Energy Company
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
                    <span>MNRE registration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Project approvals</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Multi-state operations</span>
                  </div>
                </div>
              </div>

              {/* Image on Right */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={heroImage} 
                      alt="Renewable energy team using virtual office solutions"
                      className="w-full h-auto max-w-lg object-cover"
                      loading="eager"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-yellow-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-orange-100 rounded-full opacity-60"></div>
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
                Common Renewable Energy Business Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Focus on developing clean energy projects while we handle the business infrastructure that builds government and investor confidence.
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
                Complete Renewable Energy Business Solution
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to launch and scale renewable energy projects - from solar farms to wind parks and hybrid installations.
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
                How to Launch Your Renewable Energy Company
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process to establish renewable energy business infrastructure and start developing clean energy projects.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-yellow-600">{step.step}</span>
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
                Real Success Stories from Renewable Energy Companies
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how our virtual office services helped renewable energy companies secure approvals and develop large-scale clean energy projects.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{story.company}</h3>
                        <Award className="w-6 h-6 text-yellow-500" />
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Founded by {story.founder} • {story.specialization}
                      </div>
                      <div className="text-sm text-yellow-600 mb-1">📍 {story.location}</div>
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
                Get answers to common questions about virtual office services for renewable energy companies.
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
        <section className="py-20 bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Launch Your Renewable Energy Company?
            </h2>
            <p className="text-xl mb-8 text-yellow-100">
              Join 300+ successful renewable energy companies that chose our virtual office services. Get government approvals and start developing clean energy projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-yellow-600 hover:bg-gray-100 px-8 py-3">
                    Start Your Energy Company Today
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
            <div className="text-sm text-yellow-200">
              ✅ MNRE registration support  ✅ Project approvals  ✅ Multi-state operations
            </div>
          </div>
        </section>
      </main>
      
      <Footer location={currentLocation} />
    </div>
  );
}