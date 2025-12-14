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
  Heart, 
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
  Stethoscope,
  Pill
} from "lucide-react";
import heroImage from "@assets/ChatGPT Image Jun 7, 2025, 05_01_09 PM_1749296048615.png";

export default function VirtualOfficeForHealthcarePage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Pain points that healthcare companies face
  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Complex Healthcare Regulatory Compliance",
      solution: "Professional business address for CDSCO, FDA India, and healthcare authority registrations"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Drug Licensing and Manufacturing Approvals",
      solution: "Verified business infrastructure for pharmaceutical licensing and regulatory submissions"
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Hospital and Medical Institution Trust",
      solution: "Prestigious business address that builds confidence with healthcare institutions"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Multi-State Healthcare Operations",
      solution: "Coordinated business presence across states for pharmaceutical distribution and healthcare services"
    }
  ];

  // Key benefits for healthcare companies
  const keyBenefits = [
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: "Healthcare Regulatory Compliance",
      description: "Navigate complex healthcare regulations with professional business infrastructure and compliance support",
      features: ["CDSCO registration", "Drug license applications", "Medical device approvals", "Import/Export licenses"]
    },
    {
      icon: <Pill className="w-8 h-8 text-blue-600" />,
      title: "Pharmaceutical Operations",
      description: "Establish pharmaceutical business with proper licensing and distribution network coordination",
      features: ["Manufacturing licenses", "Distribution approvals", "Quality certifications", "Supply chain management"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Medical Institution Credibility",
      description: "Build trust with hospitals, clinics, and healthcare institutions through professional setup",
      features: ["Institutional partnerships", "Hospital procurement", "Medical conferences", "Healthcare networking"]
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: "International Healthcare Trade",
      description: "Support global healthcare partnerships, medical equipment imports, and pharmaceutical exports",
      features: ["WHO compliance", "International certifications", "Medical device imports", "Pharmaceutical exports"]
    }
  ];

  // How it works process for healthcare
  const processSteps = [
    {
      step: "1",
      title: "Healthcare Business Registration",
      description: "Register your healthcare/pharmaceutical company with proper regulatory compliance and documentation",
      icon: <Building className="w-6 h-6 text-red-600" />
    },
    {
      step: "2", 
      title: "Regulatory Approvals",
      description: "Obtain necessary healthcare licenses, drug approvals, and regulatory clearances from authorities",
      icon: <FileText className="w-6 h-6 text-red-600" />
    },
    {
      step: "3",
      title: "Healthcare Operations",
      description: "Launch healthcare services or pharmaceutical operations with professional infrastructure support",
      icon: <Heart className="w-6 h-6 text-red-600" />
    },
    {
      step: "4",
      title: "Scale Healthcare Business",
      description: "Expand to new therapeutic areas, additional states, or international healthcare markets",
      icon: <TrendingUp className="w-6 h-6 text-red-600" />
    }
  ];

  // Success stories with measurable outcomes
  const successStories = [
    {
      company: "MediCore Pharmaceuticals",
      founder: "Dr. Priya Sharma",
      specialization: "Generic Drug Manufacturing",
      location: "Hyderabad & Ahmedabad",
      achievement: "Launched 50+ generic drugs with ₹200Cr annual revenue",
      timeline: "Within 36 months",
      testimonial: "Professional business setup in pharmaceutical hubs helped us secure CDSCO approvals and establish credibility with hospital chains. Regulatory authorities trust companies with proper infrastructure for drug manufacturing licenses.",
      metrics: ["50+ drug approvals", "₹200Cr revenue", "500+ hospitals served"]
    },
    {
      company: "CarePlus Medical Devices",
      founder: "Rajesh Gupta",
      specialization: "Medical Equipment Distribution",
      location: "Delhi & Mumbai",
      achievement: "Became authorized distributor for 20+ international brands",
      timeline: "Within 24 months",
      testimonial: "Having professional addresses in medical device hubs enabled partnerships with global manufacturers. Hospitals prefer working with distributors who have established business infrastructure and regulatory compliance.",
      metrics: ["20+ brand partnerships", "₹150Cr annual sales", "1000+ healthcare facilities"]
    },
    {
      company: "LifeSciences Research",
      founder: "Dr. Anil Kumar",
      specialization: "Clinical Research Organization",
      location: "Bangalore & Chennai",
      achievement: "Conducted 100+ clinical trials for global pharma companies",
      timeline: "Within 30 months",
      testimonial: "Professional business infrastructure was crucial for establishing credibility with international pharmaceutical companies. CRO business requires extensive regulatory compliance and professional setup for success.",
      metrics: ["100+ clinical trials", "15 global pharma clients", "₹80Cr research contracts"]
    }
  ];

  // FAQ section for healthcare
  const faqs = [
    {
      question: "How does virtual office help with CDSCO and healthcare regulatory approvals?",
      answer: "Our virtual office addresses are verified and accepted by CDSCO, FDA India, and state drug controllers. We provide all necessary documentation for drug licensing, medical device approvals, and pharmaceutical manufacturing permissions. Professional addresses are essential for regulatory credibility."
    },
    {
      question: "Can I use the address for pharmaceutical manufacturing and distribution licenses?",
      answer: "Yes, our virtual office addresses are accepted for pharmaceutical manufacturing licenses, drug distribution permits, medical device registrations, and all healthcare regulatory approvals. We provide complete documentation support for compliance."
    },
    {
      question: "How do you support healthcare institutions and hospital partnerships?",
      answer: "Professional business addresses and meeting facilities help establish credibility with hospitals, clinics, and healthcare institutions. We provide professional spaces for medical conferences, product presentations, and institutional partnerships."
    },
    {
      question: "What support do you provide for international healthcare trade?",
      answer: "We help with import/export documentation for medical devices and pharmaceuticals, international compliance certifications, and global partnership facilitation. Professional infrastructure is crucial for international healthcare business."
    },
    {
      question: "How does this help with clinical research and pharmaceutical partnerships?",
      answer: "Clinical research organizations and pharmaceutical companies require extensive regulatory compliance and professional infrastructure. Our services help establish credibility with international pharma companies and regulatory authorities."
    },
    {
      question: "What compliance support do you provide for healthcare businesses?",
      answer: "We help with regulatory compliance including drug licensing, medical device approvals, import/export permits, quality certifications, and ongoing regulatory reporting requirements for healthcare and pharmaceutical businesses."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        pageType="usecase"
        industry="healthcare"
        canonicalUrl="/usecase/virtual-office-for-healthcare"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content on Left */}
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-red-100 text-red-800 hover:bg-red-200">
                  <Heart className="w-4 h-4 mr-1" />
                  For Healthcare & Pharmaceuticals
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Get Virtual Office for Healthcare and Pharma
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  CDSCO registration, drug licensing, pharmaceutical approvals, and complete healthcare business infrastructure. Build trust with hospitals and regulatory authorities.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Start Your Healthcare Company
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
                    <span>CDSCO registration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Drug licensing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Regulatory compliance</span>
                  </div>
                </div>
              </div>

              {/* Image on Right */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={heroImage} 
                      alt="Healthcare professionals using virtual office solutions"
                      className="w-full h-auto max-w-lg object-cover"
                      loading="eager"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-red-100 rounded-full opacity-60"></div>
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
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Common Healthcare Business Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Focus on advancing healthcare and developing life-saving treatments while we handle the regulatory infrastructure that builds authority trust.
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
                Complete Healthcare Business Solution
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to launch and scale healthcare businesses - from pharmaceutical manufacturing to medical device distribution and clinical research.
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
                How to Launch Your Healthcare Company
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process to establish healthcare business infrastructure and start serving patients and healthcare institutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-red-600">{step.step}</span>
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
                Real Success Stories from Healthcare Companies
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how our virtual office services helped healthcare companies secure regulatory approvals and build successful medical businesses.
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
                      <div className="text-sm text-red-600 mb-1">📍 {story.location}</div>
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
                Get answers to common questions about virtual office services for healthcare and pharmaceutical companies.
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
        <section className="py-20 bg-gradient-to-r from-red-600 to-pink-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Launch Your Healthcare Company?
            </h2>
            <p className="text-xl mb-8 text-red-100">
              Join 400+ successful healthcare companies that chose our virtual office services. Get regulatory approvals and start building a healthier future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3">
                    Start Your Healthcare Company Today
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
            <div className="text-sm text-red-200">
              ✅ CDSCO registration support  ✅ Drug licensing  ✅ Regulatory compliance
            </div>
          </div>
        </section>
      </main>
      
      <Footer location={currentLocation} />
    </div>
  );
}