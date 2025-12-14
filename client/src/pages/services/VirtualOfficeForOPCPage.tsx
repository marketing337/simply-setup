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
  User, 
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
  Crown
} from "lucide-react";

export default function VirtualOfficeForOPCPage() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const benefits = [
    {
      icon: <User className="w-6 h-6 text-blue-600" />,
      title: "Single Member Company Setup",
      description: "Perfect solution for individual entrepreneurs to establish a corporate entity with limited liability protection."
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "Limited Liability Protection",
      description: "Personal assets protection with corporate structure benefits while maintaining complete control as sole member."
    },
    {
      icon: <Building className="w-6 h-6 text-purple-600" />,
      title: "MCA Compliance Support",
      description: "Complete Ministry of Corporate Affairs compliance including annual filings, board resolutions, and statutory requirements."
    },
    {
      icon: <FileText className="w-6 h-6 text-orange-600" />,
      title: "Digital Signature & DIN",
      description: "Director Identification Number (DIN) and Digital Signature Certificate (DSC) arrangement for MCA filings."
    },
    {
      icon: <Clock className="w-6 h-6 text-red-600" />,
      title: "Quick Incorporation",
      description: "Fast-track OPC registration within 10-15 days with SPICe+ form and complete documentation support."
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-600" />,
      title: "Corporate Banking Setup",
      description: "Corporate bank account opening support with enhanced credibility for business loans and financial services."
    }
  ];

  const painPoints = [
    {
      problem: "Solo entrepreneurs lack corporate credibility for business growth",
      solution: "OPC provides corporate structure with professional business address for enhanced credibility"
    },
    {
      problem: "Personal liability concerns in business operations",
      solution: "Limited liability protection separates personal assets from business liabilities"
    },
    {
      problem: "Complex MCA compliance and annual filing requirements",
      solution: "Complete compliance support including annual returns, board meetings, and statutory filings"
    },
    {
      problem: "Difficulty in obtaining business loans and corporate banking services",
      solution: "Corporate entity status enables better access to business loans and corporate banking facilities"
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Name Reservation",
      description: "Reserve unique company name through RUN (Reserve Unique Name) with MCA"
    },
    {
      step: 2,
      title: "Digital Signatures & DIN",
      description: "Obtain Digital Signature Certificate and Director Identification Number for the sole director"
    },
    {
      step: 3,
      title: "SPICe+ Filing",
      description: "File SPICe+ form with MCA including incorporation documents and registered office address"
    },
    {
      step: 4,
      title: "Post-Incorporation Setup",
      description: "Corporate banking, PAN, TAN registration and compliance calendar setup for ongoing requirements"
    }
  ];

  const features = [
    "Single Member Corporate Entity",
    "Limited Liability Protection",
    "MCA Compliance Management",
    "Digital Signature Support",
    "Corporate Banking Assistance",
    "Annual Filing Services",
    "Board Resolution Support",
    "Professional Registered Office"
  ];

  const successStories = [
    {
      business: "Mumbai Tech Consultant",
      challenge: "Solo IT consultant needed corporate structure for enterprise clients",
      solution: "OPC registration with Andheri virtual office and complete MCA compliance",
      result: "Secured 3 enterprise contracts worth ₹50 lakhs with enhanced corporate credibility"
    },
    {
      business: "Delhi Design Studio",
      challenge: "Freelance designer wanted limited liability and professional presence",
      solution: "OPC incorporation with South Delhi virtual office and corporate banking",
      result: "Expanded client base by 200% with corporate entity status and professional address"
    },
    {
      business: "Bangalore App Developer",
      challenge: "Individual developer needed corporate structure for funding opportunities",
      solution: "OPC registration in tech park with investor-ready documentation",
      result: "Raised ₹25 lakhs seed funding and converted to private limited company for growth"
    }
  ];

  const faqs = [
    {
      question: "What is a One Person Company (OPC) and who can incorporate it?",
      answer: "OPC is a corporate entity with only one shareholder/director. Only Indian citizens and residents can incorporate OPC. It provides limited liability protection while maintaining complete control for solo entrepreneurs."
    },
    {
      question: "Can I use a virtual office address as registered office for OPC?",
      answer: "Yes, virtual office addresses are fully accepted by MCA for OPC registration. We provide registered office services with complete MCA compliance and address verification support."
    },
    {
      question: "What are the annual compliance requirements for OPC?",
      answer: "OPC must file annual returns, financial statements, conduct board meetings, and maintain statutory registers. We provide complete compliance support including filing services and documentation."
    },
    {
      question: "Can OPC be converted to Private Limited Company later?",
      answer: "Yes, OPC can be converted to Private Limited Company when it crosses ₹2 crore turnover or ₹50 lakh paid-up capital. We assist with the conversion process and documentation."
    },
    {
      question: "What is the minimum capital requirement for OPC?",
      answer: "There's no minimum capital requirement for OPC incorporation. You can start with ₹1,000 as authorized capital and increase as your business grows."
    },
    {
      question: "How long does OPC registration take with virtual office?",
      answer: "With our documentation support and virtual office address, OPC registration typically takes 10-15 days from SPICe+ filing to Certificate of Incorporation."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Virtual Office for One Person Company (OPC) Registration | Solo Entrepreneur Corporate Structure"
        description="Register One Person Company (OPC) with professional virtual office. Get limited liability protection, MCA compliance support, and corporate credibility for solo entrepreneurs."
        keywords="virtual office for OPC, one person company registration, OPC incorporation, solo entrepreneur company, OPC MCA compliance, single member company, OPC registered office"
        pageType="purpose"
        industry="opc"
        canonicalUrl="/purpose/virtual-office-for-opc"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-purple-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200">
                  <Crown className="w-4 h-4 mr-1" />
                  For Solo Entrepreneurs
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Virtual Office for One Person Company (OPC)
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Register your One Person Company with professional virtual office address. Get limited liability protection, corporate credibility, and complete MCA compliance support for solo entrepreneurs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                    Register OPC Now
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
                      <User className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">OPC Ready</h3>
                      <p className="text-gray-600 mb-6">Complete One Person Company incorporation support</p>
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
                Why Choose Our Virtual Office for OPC Registration?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complete One Person Company incorporation support with MCA compliance and corporate benefits
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
                Solo Entrepreneur Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Common challenges solo entrepreneurs face and how OPC with virtual office solves them
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
                OPC Registration Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process for One Person Company registration with complete support
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
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
                OPC Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Solo entrepreneurs who transformed their business with OPC registration
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-600">{story.business}</CardTitle>
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
                Everything you need to know about OPC registration with virtual office
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
                Connect with our specialists for personalized guidance on One Person Company registration
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