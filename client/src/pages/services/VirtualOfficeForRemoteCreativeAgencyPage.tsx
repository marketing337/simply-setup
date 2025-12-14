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
  Palette, 
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
  Camera,
  Brush,
  Monitor
} from "lucide-react";
import heroImage from "@assets/ChatGPT Image Jun 7, 2025, 01_48_00 PM_1749296051817.png";

export default function VirtualOfficeForRemoteCreativeAgencyPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Pain points that remote creative agencies face
  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Client Trust & Credibility Issues",
      solution: "Professional business address in creative hubs to establish agency credibility"
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Remote Team Coordination",
      solution: "Professional meeting spaces for client presentations and team collaborations"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Brand Registration & IP Protection",
      solution: "Legal business address for trademark registration and intellectual property filing"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Client Meeting Infrastructure",
      solution: "Premium presentation spaces with creative equipment and professional ambiance"
    }
  ];

  // Key benefits for remote creative agencies
  const keyBenefits = [
    {
      icon: <Palette className="w-8 h-8 text-purple-600" />,
      title: "Creative Hub Presence",
      description: "Establish your agency in Mumbai's Bandra, Delhi's Hauz Khas, or Bangalore's Koramangala",
      features: ["Creative district addresses", "Trendy neighborhood presence", "Cultural credibility boost"]
    },
    {
      icon: <Monitor className="w-8 h-8 text-blue-600" />,
      title: "Professional Presentation Spaces",
      description: "Impress clients with fully equipped creative presentation and collaboration spaces",
      features: ["4K display setups", "Creative software access", "Professional lighting equipment"]
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Remote Team Coordination",
      description: "Coordinate your distributed creative team with professional infrastructure",
      features: ["Video conferencing facilities", "Collaborative workspaces", "Creative equipment rental"]
    },
    {
      icon: <Shield className="w-8 h-8 text-orange-600" />,
      title: "Brand & IP Protection",
      description: "Protect your creative work with proper business registration and legal support",
      features: ["Trademark registration support", "Copyright documentation", "Contract management"]
    }
  ];

  // Success stories
  const successStories = [
    {
      company: "PixelCraft Studios",
      founder: "Ananya Sharma",
      sector: "Digital Design Agency",
      location: "Mumbai - Bandra",
      achievement: "₹2Cr revenue in first year",
      timeline: "From freelance to 25-person agency",
      testimonial: "The Bandra address gave us instant credibility with Bollywood clients. The presentation spaces helped us win major brand campaigns.",
      metrics: ["₹2Cr revenue achieved", "50+ brand campaigns", "25 team members"]
    },
    {
      company: "Creative Collective",
      founder: "Rohan Gupta",
      sector: "Brand Identity Agency",
      location: "Delhi - Hauz Khas", 
      achievement: "Partnership with 3 Fortune 500 companies",
      timeline: "Within 18 months of setup",
      testimonial: "The professional infrastructure helped us compete with established agencies. Clients loved our presentation setup and creative workspace.",
      metrics: ["3 Fortune 500 clients", "100+ brand identities created", "₹1.5Cr annual revenue"]
    },
    {
      company: "Digital Dreams Agency",
      founder: "Pritha Nair",
      sector: "Social Media & Content Creation",
      location: "Bangalore - Koramangala",
      achievement: "Managing 200+ social media accounts",
      timeline: "Scaled from 5 to 200 clients in 2 years",
      testimonial: "Having a professional address in Koramangala attracted tech startups. The meeting rooms were perfect for strategy sessions with clients.",
      metrics: ["200+ client accounts", "50M+ social impressions monthly", "₹80L annual revenue"]
    }
  ];

  // FAQ section
  const faqs = [
    {
      question: "Can I use the virtual office for creative agency registration and GST?",
      answer: "Yes, our addresses are perfect for creative agency registration, GST filing, and all business compliance requirements. We handle the documentation process."
    },
    {
      question: "Do you have presentation spaces suitable for creative pitches?",
      answer: "Absolutely. Our premium meeting rooms feature 4K displays, professional lighting, and creative presentation equipment perfect for agency pitches and client presentations."
    },
    {
      question: "Can remote team members use the workspace for collaboration?",
      answer: "Yes, your remote team can access our collaborative workspaces, meeting rooms, and creative facilities. Perfect for team brainstorming and project collaboration sessions."
    },
    {
      question: "Do you assist with trademark and copyright registration?",
      answer: "We provide the registered business address required for trademark and copyright applications. For legal services, we can connect you with specialized IP lawyers."
    },
    {
      question: "What creative equipment is available in meeting rooms?",
      answer: "Our spaces include high-resolution displays, professional cameras, lighting equipment, and access to creative software. Specific equipment varies by location."
    },
    {
      question: "Can I host client workshops and creative sessions?",
      answer: "Yes, our larger meeting rooms and event spaces are perfect for client workshops, creative sessions, and team building activities. Catering and equipment support available."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Virtual Office for Remote Creative Agency | Professional Address for Design Studios"
        description="Launch your remote creative agency with professional virtual office in Mumbai, Delhi, Bangalore. Get credibility, meeting spaces, and business registration support for design studios."
        keywords="virtual office for creative agency, remote design studio address, creative agency registration, professional presentation space, brand credibility, creative hub address"
        pageType="usecase"
        industry="creative-agency"
        canonicalUrl="/usecase/virtual-office-for-remote-creative-agency"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-purple-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200">
                  <Palette className="w-4 h-4 mr-1" />
                  For Creative Agencies
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Virtual Office for Remote Creative Agencies
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Build a credible creative agency with professional addresses in Mumbai's Bandra, Delhi's Hauz Khas, or Bangalore's Koramangala. Get presentation spaces, team coordination, and brand registration support.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Launch Your Creative Agency
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
                    <span>Creative hub locations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Presentation spaces</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Brand registration</span>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={heroImage} 
                      alt="Remote creative agency team using virtual office solutions"
                      className="w-full h-auto max-w-lg object-cover"
                      loading="eager"
                    />
                  </div>
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-purple-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-pink-100 rounded-full opacity-60"></div>
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
                Remote Creative Agency Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Focus on creativity while we provide the professional infrastructure your agency needs to win clients and scale.
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
                Complete Creative Agency Infrastructure
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything your remote creative agency needs to compete with established studios and win premium clients.
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

        {/* Success Stories Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Creative Agency Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Remote creative agencies that built successful businesses with our virtual office support.
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
                    <Badge className="mb-4 bg-purple-100 text-purple-800">{story.sector}</Badge>
                    
                    <div className="mb-6">
                      <div className="text-lg font-bold text-purple-600 mb-1">{story.achievement}</div>
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
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about virtual offices for creative agencies.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-purple-600">
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
        <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Launch Your Creative Agency?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join successful creative agencies that chose our virtual office solutions to build credible, scalable businesses.
            </p>
            
            <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
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