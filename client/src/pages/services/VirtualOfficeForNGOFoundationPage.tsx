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
  HandHeart,
  TreePine,
  GraduationCap
} from "lucide-react";
import heroImage from "@assets/ChatGPT Image Jun 7, 2025, 01_48_00 PM_1749296051817.png";

export default function VirtualOfficeForNGOFoundationPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Government Registration & Compliance",
      solution: "Professional address for Section 8 company, Society, or Trust registration with government departments"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Donor Trust & Credibility",
      solution: "Professional presence that builds confidence with individual donors, corporate CSR, and funding agencies"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      problem: "Tax Exemption & 80G Registration",
      solution: "Registered address support for 12A, 80G, and FCRA registrations with income tax department"
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Volunteer & Team Coordination",
      solution: "Professional meeting spaces for board meetings, volunteer training, and donor presentations"
    }
  ];

  const keyBenefits = [
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: "NGO Registration Support",
      description: "Complete assistance with Section 8, Society, Trust registration and statutory compliance",
      features: ["Section 8 company registration", "Society registration under local acts", "Trust deed documentation"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Tax Exemption Assistance",
      description: "Professional address and documentation support for 12A, 80G, and FCRA registrations",
      features: ["80G tax exemption support", "12A registration assistance", "FCRA application documentation"]
    },
    {
      icon: <HandHeart className="w-8 h-8 text-blue-600" />,
      title: "Donor Confidence Building",
      description: "Professional infrastructure that builds trust with donors, CSR departments, and grant agencies",
      features: ["Professional meeting spaces", "Donor presentation facilities", "Corporate CSR credibility"]
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: "Program Coordination Hub",
      description: "Coordinate multiple programs, volunteers, and beneficiaries from professional locations",
      features: ["Volunteer coordination spaces", "Program planning facilities", "Beneficiary meeting areas"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "NGO Structure Setup",
      description: "Choose appropriate legal structure (Section 8/Society/Trust) and complete registration with professional address",
      icon: <Building className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "Tax Exemption Filing",
      description: "Apply for 12A, 80G tax exemptions and FCRA registration with proper documentation support",
      icon: <Shield className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "Donor Outreach Setup",
      description: "Establish professional presence for donor meetings, presentations, and fundraising activities",
      icon: <HandHeart className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "Program Implementation",
      description: "Launch social programs with professional coordination and volunteer management support",
      icon: <Users className="w-6 h-6 text-blue-600" />
    }
  ];

  const successStories = [
    {
      company: "Education First Foundation",
      founder: "Dr. Meera Sharma",
      sector: "Education & Child Development",
      location: "Delhi - Connaught Place",
      achievement: "₹5Cr raised for rural education",
      timeline: "Scaled to serve 50,000 students in 3 years",
      testimonial: "The professional Delhi address was crucial for corporate CSR partnerships. Government registration and 80G exemption process was smooth with their support.",
      metrics: ["₹5Cr funds raised", "50,000 students impacted", "80G exemption secured"]
    },
    {
      company: "Green Earth Initiative",
      founder: "Rohit Gupta",
      sector: "Environmental Conservation",
      location: "Mumbai - Bandra", 
      achievement: "FCRA approval for international funding",
      timeline: "Received approval within 18 months",
      testimonial: "Having a Mumbai presence helped with government relations and international donor confidence. The meeting spaces were perfect for stakeholder presentations.",
      metrics: ["FCRA approval received", "₹2Cr international funding", "500+ volunteer network"]
    },
    {
      company: "Health for All Trust",
      founder: "Dr. Priya Nair",
      sector: "Healthcare & Wellness",
      location: "Bangalore - Koramangala",
      achievement: "Partnership with 10 corporate CSR programs",
      timeline: "Established partnerships within 2 years",
      testimonial: "The professional infrastructure helped us gain trust from corporate CSR teams. Board meetings and donor presentations became much more impactful.",
      metrics: ["10 CSR partnerships", "₹3Cr program funding", "25,000 beneficiaries served"]
    }
  ];

  const faqs = [
    {
      question: "Can you assist with Section 8 company registration for NGOs?",
      answer: "Yes, we provide registered office address for Section 8 company registration and assist with MCA filings. We also support Society and Trust registrations under respective state laws."
    },
    {
      question: "Do you help with 80G and 12A tax exemption applications?",
      answer: "We provide the registered address and documentation support required for 80G and 12A applications. For specialized tax advice, we connect you with CAs experienced in NGO taxation."
    },
    {
      question: "Can you support FCRA registration for international funding?",
      answer: "Yes, we provide the registered address and basic documentation support for FCRA applications. For complex FCRA compliance, we recommend specialized FCRA consultants."
    },
    {
      question: "Do you have meeting spaces suitable for board meetings and donor presentations?",
      answer: "Absolutely. Our meeting rooms are equipped with presentation facilities, professional ambiance, and can accommodate board meetings, volunteer training, and donor presentations."
    },
    {
      question: "How do you support ongoing NGO compliance requirements?",
      answer: "We provide continuous address and mail handling services. For annual filings, audit support, and compliance tracking, we can connect you with specialized NGO compliance experts."
    },
    {
      question: "Can multiple NGO programs be coordinated from the same address?",
      answer: "Yes, you can coordinate multiple social programs and initiatives from the same registered address. We provide flexible workspace access for different program teams."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Virtual Office for NGO Foundation | Section 8 Registration | 80G Tax Exemption Support"
        description="Register your NGO/Foundation with professional virtual office. Get Section 8 registration, 80G tax exemption, FCRA support, and donor credibility in Delhi, Mumbai, Bangalore."
        keywords="virtual office for NGO, Section 8 registration, 80G tax exemption, FCRA registration, NGO registration, foundation registration, charity registration, donor credibility"
        pageType="usecase"
        industry="ngo-foundation"
        canonicalUrl="/usecase/virtual-office-for-ngo-foundation"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-red-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-red-100 text-red-800 hover:bg-red-200">
                  <Heart className="w-4 h-4 mr-1" />
                  For NGOs & Foundations
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Virtual Office for NGO & Foundation
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Register your NGO or Foundation with professional virtual office solutions. Get Section 8 registration, 80G tax exemption, FCRA support, and build donor credibility with premium addresses in Delhi, Mumbai, Bangalore.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Start Your NGO Journey
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
                    <span>Section 8 registration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>80G tax exemption</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Donor credibility</span>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={heroImage} 
                      alt="NGO foundation team working with professional virtual office"
                      className="w-full h-auto max-w-lg object-cover"
                      loading="eager"
                    />
                  </div>
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
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                NGO & Foundation Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Focus on your social mission while we handle the professional infrastructure needed for registration, compliance, and donor trust.
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
                Complete NGO Infrastructure Package
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything your NGO or Foundation needs to register, operate legally, and build trust with donors and beneficiaries.
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
                Your NGO Setup Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Establish your NGO or Foundation with proper registration and compliance in 4 steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
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
                NGO & Foundation Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Social organizations that created meaningful impact with our virtual office support.
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
                    <Badge className="mb-4 bg-red-100 text-red-800">{story.sector}</Badge>
                    
                    <div className="mb-6">
                      <div className="text-lg font-bold text-red-600 mb-1">{story.achievement}</div>
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
                Everything you need to know about virtual offices for NGOs and Foundations.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-red-600">
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
        <section className="py-20 bg-gradient-to-br from-red-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Start Your Social Mission?
            </h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Join impactful NGOs and Foundations that built credible organizations with our professional infrastructure support.
            </p>
            
            <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  Register Your NGO Today
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