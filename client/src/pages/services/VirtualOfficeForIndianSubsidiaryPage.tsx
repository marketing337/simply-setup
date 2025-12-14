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
  Globe, 
  FileText, 
  Clock, 
  Users, 
  Shield, 
  ArrowRight,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Building2
} from "lucide-react";

export default function VirtualOfficeForIndianSubsidiaryPage() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const benefits = [
    {
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      title: "Foreign Company Indian Operations",
      description: "Establish Indian subsidiary for multinational companies with complete FEMA compliance and RBI approval support."
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "FEMA & RBI Compliance",
      description: "Complete Foreign Exchange Management Act compliance and Reserve Bank of India approval for foreign investments."
    },
    {
      icon: <Building2 className="w-6 h-6 text-purple-600" />,
      title: "Local Market Entry Strategy",
      description: "Strategic Indian market entry with professional presence in key business hubs and commercial centers."
    },
    {
      icon: <Users className="w-6 h-6 text-orange-600" />,
      title: "Local Director Arrangement",
      description: "Professional local director services and nominee director arrangements for regulatory compliance requirements."
    },
    {
      icon: <FileText className="w-6 h-6 text-red-600" />,
      title: "Complete Documentation Support",
      description: "Comprehensive documentation including board resolutions, FIPB approvals, and international compliance requirements."
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-600" />,
      title: "Banking & Financial Setup",
      description: "Indian banking account setup, FCRA compliance, and financial infrastructure for seamless operations."
    }
  ];

  const painPoints = [
    {
      problem: "Foreign companies need Indian legal entity for local business operations and market entry",
      solution: "Indian subsidiary registration provides complete legal framework for foreign company operations"
    },
    {
      problem: "Complex FEMA, RBI, and regulatory compliance requirements for foreign investments",
      solution: "Complete regulatory compliance support including FEMA approval and RBI documentation"
    },
    {
      problem: "High setup costs for establishing physical presence in Indian market",
      solution: "Professional virtual office in prime locations providing prestigious business address"
    },
    {
      problem: "Need for local directors and understanding of Indian business regulations",
      solution: "Local director services and comprehensive regulatory guidance for smooth operations"
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "FEMA & RBI Approvals",
      description: "Obtain necessary approvals for foreign investment and subsidiary establishment in India"
    },
    {
      step: 2,
      title: "Company Registration",
      description: "Register Indian subsidiary with MCA including foreign parent company documentation"
    },
    {
      step: 3,
      title: "Compliance Setup",
      description: "Establish complete compliance framework including local directors and statutory requirements"
    },
    {
      step: 4,
      title: "Operational Infrastructure",
      description: "Setup banking, taxation, and operational infrastructure for business commencement"
    }
  ];

  const features = [
    "Indian Subsidiary Registration",
    "FEMA & RBI Compliance",
    "Foreign Investment Support",
    "Local Director Services",
    "Market Entry Strategy",
    "Banking Setup Assistance",
    "Professional Business Address",
    "Regulatory Compliance Management"
  ];

  const successStories = [
    {
      business: "Singapore Tech Company India Subsidiary",
      challenge: "Software company needed Indian subsidiary for local operations and client servicing",
      solution: "Subsidiary registration with Bangalore tech park virtual office and complete FEMA compliance",
      result: "Successfully established operations, hired 50 employees, and achieved $2M revenue in first year"
    },
    {
      business: "German Manufacturing India Sub.",
      challenge: "Manufacturing company required Indian entity for production and distribution setup",
      solution: "Subsidiary incorporation with Chennai virtual office and industrial compliance support",
      result: "Established manufacturing facility, secured government contracts worth ₹100 crores annually"
    },
    {
      business: "US Healthcare India Operations",
      challenge: "Healthcare company needed Indian subsidiary for medical device distribution and services",
      solution: "Subsidiary registration with Mumbai virtual office and healthcare sector compliance",
      result: "Launched medical device operations, partnered with 200 hospitals, achieved market leadership"
    }
  ];

  const faqs = [
    {
      question: "What is Indian Subsidiary and why do foreign companies need it?",
      answer: "Indian Subsidiary is an Indian company owned by foreign parent company. It's required for local business operations, hiring employees, opening bank accounts, and establishing legal presence in India."
    },
    {
      question: "Can I register Indian Subsidiary with virtual office address?",
      answer: "Yes, virtual office addresses are accepted for Indian subsidiary registration. We provide registered office services with complete FEMA and RBI compliance support."
    },
    {
      question: "What approvals are required for Indian Subsidiary registration?",
      answer: "FEMA approval, RBI permission (if required), MCA incorporation, and various sector-specific approvals depending on business activities. We assist with all regulatory approvals."
    },
    {
      question: "What is the minimum capital requirement for Indian Subsidiary?",
      answer: "No minimum capital requirement, but must comply with FEMA regulations for foreign investment limits in specific sectors. We provide guidance on sectoral caps and investment routes."
    },
    {
      question: "Can foreign nationals be directors in Indian Subsidiary?",
      answer: "Yes, but at least one director must be Indian resident. We provide local director services and nominee director arrangements for compliance requirements."
    },
    {
      question: "How long does Indian Subsidiary registration take?",
      answer: "With our support, registration typically takes 30-45 days including FEMA approvals and MCA incorporation. Complex cases may take longer depending on sector and investment structure."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Virtual Office for Indian Subsidiary Registration | Foreign Company India Operations"
        description="Register Indian Subsidiary with professional virtual office. Get FEMA compliance support, RBI approval assistance, and local market entry for foreign companies."
        keywords="virtual office for indian subsidiary, foreign company registration india, FEMA compliance, RBI approval, multinational subsidiary, foreign investment india"
        pageType="purpose"
        industry="indian-subsidiary"
        canonicalUrl="/purpose/virtual-office-for-indian-subsidiary"
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
                  For Foreign Companies
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Virtual Office for Indian Subsidiary Registration
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Register your Indian Subsidiary with professional virtual office address. Get complete FEMA compliance support, RBI approval assistance, and strategic market entry for foreign companies establishing operations in India.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Register Indian Subsidiary
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
                    FEMA Compliant
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    RBI Approved
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Market Entry Ready
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center">
                      <Globe className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">India Entry Ready</h3>
                      <p className="text-gray-600 mb-6">Complete Indian Subsidiary incorporation support</p>
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
                Why Choose Our Virtual Office for Indian Subsidiary?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complete foreign company India entry support with regulatory compliance and market strategy
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
                Foreign Company India Entry Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Common challenges foreign companies face entering Indian market and our solutions
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
                Indian Subsidiary Registration Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive 4-step process for Indian Subsidiary registration with complete compliance
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
                Indian Subsidiary Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Foreign companies that successfully established and scaled operations in India
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
                Everything you need to know about Indian Subsidiary registration with virtual office
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
                Connect with our specialists for personalized guidance on Indian Subsidiary registration
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