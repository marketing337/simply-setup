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
  Briefcase
} from "lucide-react";

export default function VirtualOfficeForLLPPage() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const benefits = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Professional Partnership Structure",
      description: "Combine benefits of partnership flexibility with corporate limited liability protection for professional services."
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "Limited Liability Protection",
      description: "Partners' personal assets protected from business liabilities while maintaining operational flexibility."
    },
    {
      icon: <Building className="w-6 h-6 text-purple-600" />,
      title: "ROC Compliance Support",
      description: "Complete Registrar of Companies compliance including annual filings, partner changes, and statutory requirements."
    },
    {
      icon: <FileText className="w-6 h-6 text-orange-600" />,
      title: "LLP Agreement & Documentation",
      description: "Professional LLP agreement drafting and all incorporation documents with legal compliance support."
    },
    {
      icon: <Clock className="w-6 h-6 text-red-600" />,
      title: "Quick Incorporation Process",
      description: "Fast-track LLP registration within 10-15 days with FiLLiP form and complete documentation support."
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-600" />,
      title: "Professional Services Ready",
      description: "Ideal structure for CA firms, law firms, consulting services, and other professional service businesses."
    }
  ];

  const painPoints = [
    {
      problem: "Professional service providers need flexible partnership with liability protection",
      solution: "LLP provides partnership flexibility with corporate-style limited liability protection"
    },
    {
      problem: "Complex compliance requirements for professional service businesses",
      solution: "Complete ROC compliance support including annual returns and statutory filings"
    },
    {
      problem: "Multiple partners across different locations need centralized business address",
      solution: "Professional virtual office address accessible to all partners with meeting facilities"
    },
    {
      problem: "Professional credibility required for client acquisition and business growth",
      solution: "LLP structure with premium business address enhances professional credibility"
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Name Reservation",
      description: "Reserve unique LLP name through RUN (Reserve Unique Name) with Ministry of Corporate Affairs"
    },
    {
      step: 2,
      title: "DIN & DSC for Partners",
      description: "Obtain Director Identification Number and Digital Signature Certificate for designated partners"
    },
    {
      step: 3,
      title: "FiLLiP Form Filing",
      description: "File FiLLiP form with ROC including LLP agreement and registered office address proof"
    },
    {
      step: 4,
      title: "Post-Incorporation Setup",
      description: "PAN, TAN registration, banking setup, and ongoing compliance calendar establishment"
    }
  ];

  const features = [
    "Limited Liability Partnership Setup",
    "ROC Compliance Management",
    "LLP Agreement Drafting",
    "Partner DIN & DSC Support",
    "Professional Business Address",
    "Annual Filing Services",
    "Banking Account Support",
    "Multi-Partner Coordination"
  ];

  const successStories = [
    {
      business: "Mumbai CA Firm LLP",
      challenge: "Three CAs across different locations needed professional LLP structure",
      solution: "LLP registration with Nariman Point virtual office and complete compliance setup",
      result: "Enhanced client credibility, 150% revenue growth, and successful expansion to 5 partners"
    },
    {
      business: "Delhi Legal Services LLP",
      challenge: "Law firm partners needed limited liability with professional presence",
      solution: "LLP incorporation with Connaught Place address and legal compliance support",
      result: "Secured high-value corporate clients and expanded practice areas significantly"
    },
    {
      business: "Bangalore Tech Consulting LLP",
      challenge: "IT consultants needed corporate structure for enterprise client acquisition",
      solution: "LLP registration in tech corridor with professional meeting facilities",
      result: "Won government contracts worth ₹2 crores and established enterprise credibility"
    }
  ];

  const faqs = [
    {
      question: "What is the difference between LLP and Partnership firm?",
      answer: "LLP provides limited liability protection to partners (personal assets protected), has perpetual succession, and requires ROC compliance. Partnership firms have unlimited liability and simpler compliance but less protection."
    },
    {
      question: "Can I register LLP with virtual office address?",
      answer: "Yes, virtual office addresses are fully accepted by ROC for LLP registration. We provide registered office services with complete compliance support and address verification."
    },
    {
      question: "What are the minimum requirements for LLP registration?",
      answer: "Minimum 2 partners (individuals or companies), 2 designated partners who are individuals and Indian residents, and a registered office address in India. No minimum capital requirement."
    },
    {
      question: "What is LLP Agreement and is it mandatory?",
      answer: "LLP Agreement defines rights, duties, and obligations of partners. It's mandatory and must be filed with ROC within 30 days of incorporation. We provide professional drafting services."
    },
    {
      question: "What are the annual compliance requirements for LLP?",
      answer: "LLP must file annual returns (Form 11), statement of accounts and solvency (Form 8), and maintain statutory registers. We provide complete compliance support."
    },
    {
      question: "Can foreign nationals be partners in Indian LLP?",
      answer: "Yes, foreign nationals can be partners but at least 2 designated partners must be Indian residents. We assist with documentation for foreign partner inclusion."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Virtual Office for Limited Liability Partnership (LLP) Registration | Professional Services LLP"
        description="Register Limited Liability Partnership (LLP) with professional virtual office. Get ROC compliance support, LLP agreement drafting, and professional credibility for service businesses."
        keywords="virtual office for LLP, limited liability partnership registration, LLP incorporation, professional services LLP, LLP ROC compliance, LLP agreement, LLP registered office"
        pageType="purpose"
        industry="llp"
        canonicalUrl="/purpose/virtual-office-for-llp"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-green-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
                  <Briefcase className="w-4 h-4 mr-1" />
                  For Professional Services
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Virtual Office for Limited Liability Partnership (LLP)
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Register your Limited Liability Partnership with professional virtual office address. Get ROC compliance support, LLP agreement drafting, and enhanced credibility for professional service businesses.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                    Register LLP Now
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
                    Limited Liability
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    ROC Compliant
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Professional Structure
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center">
                      <Users className="w-16 h-16 text-green-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">LLP Ready</h3>
                      <p className="text-gray-600 mb-6">Complete Limited Liability Partnership incorporation support</p>
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
                Why Choose Our Virtual Office for LLP Registration?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complete Limited Liability Partnership setup with professional credibility and compliance support
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
                Professional Service Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Common challenges professional service providers face and our LLP solutions
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
                LLP Registration Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process for Limited Liability Partnership registration with complete support
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
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
                LLP Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professional service businesses that grew with LLP structure and virtual office
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600">{story.business}</CardTitle>
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
                Everything you need to know about LLP registration with virtual office
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
                Connect with our specialists for personalized guidance on LLP registration
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