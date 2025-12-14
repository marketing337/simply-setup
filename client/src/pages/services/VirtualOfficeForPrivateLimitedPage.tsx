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
  Calendar,
  TrendingUp
} from "lucide-react";

export default function VirtualOfficeForPrivateLimitedPage() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const benefits = [
    {
      icon: <Building className="w-6 h-6 text-blue-600" />,
      title: "Corporate Structure Benefits",
      description: "Complete corporate entity with limited liability, perpetual succession, and enhanced credibility for business growth."
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "Investor-Ready Structure",
      description: "Perfect structure for raising funds, equity investments, and scaling business operations with investor confidence."
    },
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: "Professional Management",
      description: "Board of directors structure with clear roles, responsibilities, and professional governance framework."
    },
    {
      icon: <FileText className="w-6 h-6 text-orange-600" />,
      title: "Complete MCA Compliance",
      description: "Full Ministry of Corporate Affairs compliance including annual filings, board meetings, and statutory requirements."
    },
    {
      icon: <Clock className="w-6 h-6 text-red-600" />,
      title: "Quick Incorporation",
      description: "Fast-track private limited company registration within 7-10 days with SPICe+ form and digital documentation."
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-600" />,
      title: "Banking & Financial Benefits",
      description: "Enhanced access to corporate banking, business loans, credit facilities, and financial services."
    }
  ];

  const painPoints = [
    {
      problem: "Entrepreneurs need corporate structure for serious business growth and investments",
      solution: "Private limited company provides complete corporate framework with investor appeal"
    },
    {
      problem: "High commercial real estate costs for establishing corporate presence",
      solution: "Professional virtual office provides prestigious corporate address at fraction of the cost"
    },
    {
      problem: "Complex MCA compliance and annual filing requirements",
      solution: "Complete compliance support including annual returns, board meetings, and statutory filings"
    },
    {
      problem: "Difficulty in accessing business loans and corporate banking facilities",
      solution: "Corporate entity status enables better access to financial services and credit facilities"
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Name Reservation & DIN",
      description: "Reserve company name through RUN and obtain Director Identification Numbers for all directors"
    },
    {
      step: 2,
      title: "Digital Signatures",
      description: "Obtain Digital Signature Certificates for all directors and authorized signatories"
    },
    {
      step: 3,
      title: "SPICe+ Filing",
      description: "File SPICe+ form with MCA including incorporation documents and registered office address"
    },
    {
      step: 4,
      title: "Post-Incorporation",
      description: "Corporate banking, compliance calendar setup, and ongoing MCA compliance management"
    }
  ];

  const features = [
    "Corporate Entity Registration",
    "MCA Compliance Management",
    "Board Meeting Support",
    "Annual Filing Services",
    "Corporate Banking Assistance",
    "Investor-Ready Documentation",
    "Professional Registered Office",
    "Statutory Compliance Calendar"
  ];

  const successStories = [
    {
      business: "Mumbai Tech Startup",
      challenge: "Needed corporate structure for Series A funding and investor credibility",
      solution: "Private limited incorporation with BKC virtual office and investor documentation",
      result: "Successfully raised ₹5 crores Series A funding with professional corporate structure"
    },
    {
      business: "Delhi Manufacturing Company",
      challenge: "Required corporate entity for government contracts and business expansion",
      solution: "Pvt Ltd registration with Connaught Place address and compliance support",
      result: "Won government contracts worth ₹10 crores and expanded to 3 manufacturing units"
    },
    {
      business: "Bangalore SaaS Company",
      challenge: "International clients required Indian corporate entity for service agreements",
      solution: "Private limited company with tech park virtual office and compliance management",
      result: "Acquired 15 international clients and achieved $1M ARR within 18 months"
    }
  ];

  const faqs = [
    {
      question: "What is the minimum requirement for Private Limited Company registration?",
      answer: "Minimum 2 directors, 2 shareholders (can be same persons), minimum paid-up capital ₹1 lakh, and registered office address in India. We provide complete registration support."
    },
    {
      question: "Can I use virtual office address for Private Limited Company?",
      answer: "Yes, virtual office addresses are fully accepted by MCA for private limited company registration. We provide registered office services with complete compliance support."
    },
    {
      question: "What are the annual compliance requirements for Private Limited Company?",
      answer: "Annual filing of financial statements, annual returns, board meetings, AGM conduct, and various MCA forms. We provide complete compliance management services."
    },
    {
      question: "How much does it cost to maintain a Private Limited Company annually?",
      answer: "Annual compliance costs include MCA filing fees, professional fees, and virtual office charges. Total costs typically range from ₹15,000-25,000 annually with our support."
    },
    {
      question: "Can foreign nationals be directors in Indian Private Limited Company?",
      answer: "Yes, foreign nationals can be directors but company must have at least one Indian resident director. We assist with foreign director appointment documentation."
    },
    {
      question: "What is the difference between Private Limited and LLP?",
      answer: "Private Limited offers better investment opportunities, corporate credibility, and growth potential. LLP is suitable for professional services. We help choose the right structure."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Virtual Office for Private Limited Company Registration | Corporate Structure Setup"
        description="Register Private Limited Company with professional virtual office. Get MCA compliance support, corporate banking assistance, and investor-ready structure for business growth."
        keywords="virtual office for private limited company, pvt ltd registration, corporate structure setup, MCA compliance, private limited company incorporation, corporate registered office"
        pageType="purpose"
        industry="private-limited"
        canonicalUrl="/purpose/virtual-office-for-private-limited"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  For Business Growth
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Virtual Office for Private Limited Company Registration
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Register your Private Limited Company with professional virtual office address. Get complete MCA compliance support, investor-ready structure, and corporate credibility for serious business growth.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Register Pvt Ltd Company
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
                    Investor Ready
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    MCA Compliant
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Corporate Benefits
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center">
                      <Building className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Corporate Ready</h3>
                      <p className="text-gray-600 mb-6">Complete Private Limited Company incorporation support</p>
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
                Why Choose Our Virtual Office for Private Limited Company?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complete corporate structure setup with investor appeal and professional credibility
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
                Business Growth Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Common challenges businesses face while scaling and our corporate solutions
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
                Private Limited Company Registration Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process for Private Limited Company registration with complete support
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
                Corporate Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Businesses that achieved remarkable growth with Private Limited Company structure
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
                Everything you need to know about Private Limited Company registration with virtual office
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
                Connect with our specialists for personalized guidance on Private Limited Company registration
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