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
  Users, 
  FileText, 
  Clock, 
  Building, 
  Shield, 
  ArrowRight,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Handshake
} from "lucide-react";

export default function VirtualOfficeForPartnershipPage() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const benefits = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Partnership Deed Registration",
      description: "Professional business address for partnership deed registration with registrar of firms across all states."
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "Legal Compliance Support",
      description: "Complete documentation assistance for partnership registration including partnership deed and firm registration."
    },
    {
      icon: <Building className="w-6 h-6 text-purple-600" />,
      title: "Multi-Partner Coordination",
      description: "Centralized business address for multiple partners with professional meeting facilities for partnership decisions."
    },
    {
      icon: <FileText className="w-6 h-6 text-orange-600" />,
      title: "Banking and Financial Setup",
      description: "Partnership firm banking account opening support with current account and business loan facilities."
    },
    {
      icon: <Clock className="w-6 h-6 text-red-600" />,
      title: "Quick Registration Process",
      description: "Fast-track partnership registration within 7-14 days with complete documentation and legal support."
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-600" />,
      title: "GST Registration Ready",
      description: "Partnership firm GST registration support with proper business address verification and compliance."
    }
  ];

  const painPoints = [
    {
      problem: "Partners located in different cities requiring common business address",
      solution: "Centralized virtual office location accessible to all partners with professional meeting facilities"
    },
    {
      problem: "High overhead costs for partnership firm office setup",
      solution: "Cost-effective virtual office starting at ₹1,499/month with all partnership registration benefits"
    },
    {
      problem: "Complex partnership deed documentation and registration process",
      solution: "Complete legal documentation support and registrar of firms liaison services"
    },
    {
      problem: "Banking requirements for partnership firm account opening",
      solution: "Address verification support and banking documentation assistance for smooth account setup"
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Choose Partnership Address",
      description: "Select professional business address suitable for partnership deed registration"
    },
    {
      step: 2,
      title: "Partnership Documentation",
      description: "Prepare partnership deed, partner identification documents, and address proof"
    },
    {
      step: 3,
      title: "Registrar of Firms Filing",
      description: "Submit partnership registration application with registrar of firms in chosen state"
    },
    {
      step: 4,
      title: "Banking and Compliance",
      description: "Open partnership firm bank account and complete GST registration if applicable"
    }
  ];

  const features = [
    "Partnership Deed Registration Support",
    "Registrar of Firms Documentation",
    "Multi-Partner Meeting Facilities",
    "Banking Account Opening Assistance",
    "GST Registration for Partnership",
    "Legal Compliance Management",
    "Partner Coordination Services",
    "Professional Business Presence"
  ];

  const successStories = [
    {
      business: "Mumbai Trading Partnership",
      challenge: "Two partners from different states needed common business address",
      solution: "Central Mumbai virtual office with partnership registration support",
      result: "Partnership deed registered successfully with banking facilities established"
    },
    {
      business: "Delhi Consulting Partners",
      challenge: "Professional services partnership requiring client credibility",
      solution: "Premium virtual office in Connaught Place with meeting rooms",
      result: "Enhanced client trust and successful partnership firm GST registration"
    },
    {
      business: "Bangalore Tech Partnership",
      challenge: "IT services partnership with multiple funding requirements",
      solution: "Tech park virtual office with banking and compliance support",
      result: "Partnership firm registered with business loans and investor credibility"
    }
  ];

  const faqs = [
    {
      question: "Can I register a partnership firm with a virtual office address?",
      answer: "Yes, virtual office addresses are fully accepted for partnership firm registration with registrar of firms. We provide all necessary documentation including address proof and NOC for successful registration."
    },
    {
      question: "What documents are required for partnership firm registration?",
      answer: "Partnership deed, partner PAN cards, address proof, identity proof of all partners, and business address verification. We assist with preparing all required documentation."
    },
    {
      question: "Do all partners need to be present for registration?",
      answer: "Not necessarily. We can coordinate with partners located in different cities and handle the registration process with proper authorization and documentation from all partners."
    },
    {
      question: "Can I open a bank account for partnership firm with virtual office address?",
      answer: "Yes, we provide complete banking documentation support including address verification, partnership deed, and all required certificates for partnership firm bank account opening."
    },
    {
      question: "Is GST registration mandatory for partnership firms?",
      answer: "GST registration is mandatory if annual turnover exceeds ₹20 lakhs (₹10 lakhs for special category states). We provide GST registration support with proper address verification."
    },
    {
      question: "How long does partnership firm registration take?",
      answer: "With our documentation support, partnership firm registration typically takes 7-14 days depending on the state registrar of firms processing time and document completeness."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Virtual Office for Partnership Firm Registration | Partnership Deed Support"
        description="Professional virtual office for partnership firm registration. Get partnership deed registration, banking support, and legal compliance assistance across India."
        keywords="virtual office for partnership, partnership firm registration, partnership deed registration, registrar of firms, partnership business address, partnership GST registration"
        pageType="purpose"
        industry="partnership"
        canonicalUrl="/purpose/virtual-office-for-partnership"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                  <Handshake className="w-4 h-4 mr-1" />
                  For Partnership Firms
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Virtual Office for Partnership Firm Registration
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Professional business address for partnership firm registration with registrar of firms. Complete partnership deed support, banking assistance, and multi-partner coordination facilities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Register Partnership Firm
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Phone className="mr-2 h-5 w-5" />
                    Speak to Legal Expert
                  </Button>
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Partnership Deed Ready
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Banking Support
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Multi-Partner Coordination
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center">
                      <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Partnership Ready</h3>
                      <p className="text-gray-600 mb-6">Complete partnership firm registration support</p>
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
                Why Choose Our Virtual Office for Partnership Firms?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complete partnership registration support with legal compliance and multi-partner coordination
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
                Partnership Registration Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Common challenges partnership firms face and our comprehensive solutions
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
                Partnership Registration Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process for partnership firm registration with complete support
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
                Partnership Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real partnership firms that successfully registered with our virtual office solutions
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
                Everything you need to know about virtual office for partnership firm registration
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
                Connect with our specialists for personalized guidance on Partnership registration
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