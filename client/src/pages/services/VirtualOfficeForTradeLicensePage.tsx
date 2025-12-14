import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Building, 
  FileText, 
  Clock, 
  Users, 
  Shield, 
  ArrowRight,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar
} from "lucide-react";

export default function VirtualOfficeForTradeLicensePage() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const benefits = [
    {
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      title: "Trade License Ready Address",
      description: "Professional business address compliant with municipal trade license requirements across all major cities."
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "Municipal Authority Compliance",
      description: "Addresses verified by local municipal corporations for trade license applications and renewals."
    },
    {
      icon: <Building className="w-6 h-6 text-purple-600" />,
      title: "Commercial Zone Registration",
      description: "Business addresses located in designated commercial zones approved for various trade activities."
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-600" />,
      title: "Quick Setup Process",
      description: "Get your trade license application ready within 24 hours with all required documentation support."
    },
    {
      icon: <Users className="w-6 h-6 text-red-600" />,
      title: "Inspector Visit Support",
      description: "Professional representation during municipal inspector visits for trade license verification."
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-600" />,
      title: "Multi-Location Support",
      description: "Obtain trade licenses across multiple cities for business expansion with consistent virtual office support."
    }
  ];

  const painPoints = [
    {
      problem: "Residential addresses not accepted for trade license applications",
      solution: "Commercial-grade virtual office addresses in approved commercial zones"
    },
    {
      problem: "High commercial real estate costs for small businesses",
      solution: "Affordable virtual office solutions starting at ₹1,499/month with trade license support"
    },
    {
      problem: "Municipal inspection requirements and compliance issues",
      solution: "Professional inspection support and municipal authority liaison services"
    },
    {
      problem: "Documentation complexity for trade license applications",
      solution: "Complete documentation assistance and trade license application support"
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Choose Your Business Address",
      description: "Select from prime commercial locations approved for trade license registrations"
    },
    {
      step: 2,
      title: "Trade License Documentation",
      description: "We provide all necessary documents including NOC, address proof, and commercial certificates"
    },
    {
      step: 3,
      title: "Municipal Application Support",
      description: "Professional assistance with trade license application submission to relevant municipal authorities"
    },
    {
      step: 4,
      title: "Inspection Coordination",
      description: "Handle municipal inspector visits and compliance verification on your behalf"
    }
  ];

  const features = [
    "Municipal Authority Approved Addresses",
    "Trade License Documentation Support",
    "Inspector Visit Coordination",
    "Commercial Zone Compliance",
    "Multi-City Trade License Support",
    "Renewal Assistance Services",
    "NOC and Clearance Support",
    "Professional Business Presence"
  ];

  const successStories = [
    {
      business: "Mumbai Retail Store",
      challenge: "Needed trade license for electronics retail business",
      solution: "Virtual office in Andheri commercial complex with trade license support",
      result: "Trade license approved in 15 days with full municipal compliance"
    },
    {
      business: "Delhi Food Business",
      challenge: "FSSAI and trade license requirements for food business",
      solution: "Commercial kitchen-approved virtual office with dual compliance",
      result: "Both licenses obtained simultaneously with professional inspection support"
    },
    {
      business: "Bangalore Service Provider",
      challenge: "IT services trade license for government contracts",
      solution: "Tech park virtual office with specialized trade license documentation",
      result: "Government vendor registration approved with trade license compliance"
    }
  ];

  const faqs = [
    {
      question: "Can I use a virtual office address for trade license registration?",
      answer: "Yes, our virtual office addresses are located in commercial zones and are fully compliant with municipal trade license requirements. We provide all necessary documentation for successful applications."
    },
    {
      question: "What documents do you provide for trade license applications?",
      answer: "We provide commercial address proof, NOC from property owner, municipal tax receipts, commercial zone certificates, and all required documentation for trade license applications."
    },
    {
      question: "Do you handle municipal inspector visits?",
      answer: "Yes, we provide professional representation during municipal inspector visits. Our team coordinates with inspectors and ensures all compliance requirements are met."
    },
    {
      question: "Can I get trade licenses in multiple cities?",
      answer: "Absolutely! Our multi-location virtual office services allow you to obtain trade licenses across different cities for business expansion with consistent professional support."
    },
    {
      question: "How long does the trade license process take?",
      answer: "With our documentation support and municipal liaison services, most trade licenses are approved within 15-30 days, depending on the local municipal authority and business type."
    },
    {
      question: "What types of businesses can use this service?",
      answer: "All types of businesses requiring trade licenses including retail, wholesale, manufacturing, services, food businesses, and professional services can use our virtual office solutions."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Virtual Office for Trade License Registration | Municipal Authority Approved Address"
        description="Get municipal authority approved virtual office for trade license registration. Professional commercial addresses, inspector visit support, and complete documentation assistance across India."
        keywords="virtual office for trade license, trade license registration, municipal authority address, commercial zone virtual office, trade license documentation, inspector visit support"
        pageType="purpose"
        industry="trade-license"
        canonicalUrl="/purpose/virtual-office-for-trade-license"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                  <FileText className="w-4 h-4 mr-1" />
                  For Trade License
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Virtual Office for Trade License Registration
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Get municipal authority approved virtual office addresses for trade license registration. Professional commercial zone addresses with complete documentation support and inspector visit coordination.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Get Trade License Address
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Phone className="mr-2 h-5 w-5" />
                    Speak to Expert
                  </Button>
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Municipal Approved
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Quick Setup
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Inspector Support
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center">
                      <Building className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Trade License Ready</h3>
                      <p className="text-gray-600 mb-6">Municipal authority approved commercial addresses</p>
                      <div className="space-y-3">
                        {features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-center text-left">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our Virtual Office for Trade License?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Municipal authority approved addresses with complete trade license support and compliance assistance
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      {benefit.icon}
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Trade License Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Common problems businesses face with trade license registration and our solutions
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {painPoints.map((point, index) => (
                <Card key={index} className="border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-100 p-2 rounded-lg flex-shrink-0">
                        <span className="text-red-600 font-semibold">Problem</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 mb-3">{point.problem}</p>
                        <div className="flex items-start space-x-4">
                          <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                            <span className="text-green-600 font-semibold">Solution</span>
                          </div>
                          <p className="text-gray-700">{point.solution}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Trade License Process Made Simple
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our streamlined process ensures quick and compliant trade license registration
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Trade License Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real businesses that successfully obtained trade licenses with our virtual office solutions
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-600">{story.business}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <span className="font-semibold text-gray-900">Challenge:</span>
                      <p className="text-gray-600 text-sm mt-1">{story.challenge}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Solution:</span>
                      <p className="text-gray-600 text-sm mt-1">{story.solution}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Result:</span>
                      <p className="text-green-600 text-sm mt-1 font-medium">{story.result}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about virtual office for trade license registration
              </p>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>



        {/* Contact Section */}
        <section id="contact-form" className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Get Free Expert Advisory
              </h2>
              <p className="text-xl text-gray-600">
                Connect with our specialists for personalized guidance on Trade License registration
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}