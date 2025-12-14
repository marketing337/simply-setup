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
  TrendingUp, 
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
  Globe
} from "lucide-react";

export default function VirtualOfficeForPublicLimitedPage() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
      title: "Public Company Structure",
      description: "Complete public limited company setup for large-scale operations, IPO readiness, and public investment opportunities."
    },
    {
      icon: <Globe className="w-6 h-6 text-green-600" />,
      title: "Stock Exchange Listing Ready",
      description: "Corporate structure compliant with SEBI requirements for stock exchange listing and public share offerings."
    },
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: "Public Shareholding Support",
      description: "Framework for public shareholding, investor relations, and compliance with public company governance standards."
    },
    {
      icon: <Shield className="w-6 h-6 text-orange-600" />,
      title: "Enhanced Corporate Governance",
      description: "Professional governance structure with independent directors, audit committees, and regulatory compliance."
    },
    {
      icon: <FileText className="w-6 h-6 text-red-600" />,
      title: "SEBI & MCA Compliance",
      description: "Complete compliance with Securities and Exchange Board of India and Ministry of Corporate Affairs regulations."
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-600" />,
      title: "Institutional Investment Access",
      description: "Enhanced access to institutional investors, mutual funds, and large-scale funding opportunities."
    }
  ];

  const painPoints = [
    {
      problem: "Large enterprises need public company structure for growth capital and market presence",
      solution: "Public limited company provides access to public capital markets and institutional investments"
    },
    {
      problem: "High costs for establishing prestigious corporate headquarters for public companies",
      solution: "Premium virtual office addresses in financial districts at fraction of real estate costs"
    },
    {
      problem: "Complex SEBI and MCA compliance requirements for public companies",
      solution: "Complete regulatory compliance support including quarterly filings and governance requirements"
    },
    {
      problem: "Need for professional corporate presence to attract institutional investors",
      solution: "Prestigious business addresses in financial hubs with professional infrastructure"
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Name Reservation & Documentation",
      description: "Reserve company name and prepare comprehensive incorporation documents for public company"
    },
    {
      step: 2,
      title: "Capital Structure & Compliance",
      description: "Design capital structure with minimum requirements and ensure SEBI compliance framework"
    },
    {
      step: 3,
      title: "MCA Filing & Incorporation",
      description: "File incorporation documents with MCA and obtain Certificate of Incorporation for public company"
    },
    {
      step: 4,
      title: "Post-Incorporation Setup",
      description: "Corporate governance setup, compliance calendar, and preparation for public operations"
    }
  ];

  const features = [
    "Public Limited Company Setup",
    "SEBI Compliance Framework",
    "IPO Readiness Support",
    "Corporate Governance Structure",
    "Institutional Investor Access",
    "Stock Exchange Listing Support",
    "Professional Registered Office",
    "Regulatory Compliance Management"
  ];

  const successStories = [
    {
      business: "Mumbai Manufacturing Public Ltd",
      challenge: "Manufacturing company needed public structure for expansion funding and IPO preparation",
      solution: "Public limited incorporation with BKC virtual office and complete SEBI compliance setup",
      result: "Successfully raised ₹100 crores through public issue and listed on BSE within 18 months"
    },
    {
      business: "Delhi Infrastructure Public Ltd",
      challenge: "Infrastructure company required public entity for government projects and institutional funding",
      solution: "Public limited registration with CP virtual office and governance framework",
      result: "Secured ₹500 crores institutional funding and won major government infrastructure contracts"
    },
    {
      business: "Bangalore Tech Public Ltd",
      challenge: "Technology company needed public structure for international expansion and strategic partnerships",
      solution: "Public limited setup with tech corridor address and international compliance support",
      result: "Achieved $50M valuation and established strategic partnerships with Fortune 500 companies"
    }
  ];

  const faqs = [
    {
      question: "What is the difference between Private Limited and Public Limited Company?",
      answer: "Public Limited can raise capital from public, has minimum 7 shareholders, 3 directors, and ₹5 lakh minimum capital. It can list on stock exchanges and has more regulatory compliance requirements."
    },
    {
      question: "Can I use virtual office address for Public Limited Company registration?",
      answer: "Yes, virtual office addresses are accepted by MCA for public limited company registration. We provide prestigious addresses in financial districts with complete compliance support."
    },
    {
      question: "What are the minimum requirements for Public Limited Company?",
      answer: "Minimum 7 shareholders, 3 directors, ₹5 lakh authorized capital, registered office address, and compliance with enhanced governance norms including independent directors."
    },
    {
      question: "What are the compliance requirements for Public Limited Companies?",
      answer: "Quarterly financial results, annual reports, board meetings, AGM, independent director appointments, audit committee, and various SEBI/MCA filings. We provide complete compliance support."
    },
    {
      question: "Can Public Limited Company list on stock exchanges immediately?",
      answer: "No, company must meet specific criteria including track record, profitability, and SEBI approval. We assist with IPO readiness and stock exchange listing procedures."
    },
    {
      question: "What are the advantages of Public Limited Company structure?",
      answer: "Access to public capital, enhanced credibility, institutional investor access, stock exchange listing opportunities, and better valuation for business growth and expansion."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Virtual Office for Public Limited Company Registration | IPO Ready Corporate Structure"
        description="Register Public Limited Company with professional virtual office. Get SEBI compliance support, IPO readiness, and prestigious corporate address for public companies."
        keywords="virtual office for public limited company, public ltd registration, IPO ready company, SEBI compliance, stock exchange listing, public company incorporation"
        pageType="purpose"
        industry="public-limited"
        canonicalUrl="/purpose/virtual-office-for-public-limited"
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
                  For Large Enterprises
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Virtual Office for Public Limited Company Registration
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Register your Public Limited Company with prestigious virtual office address. Get SEBI compliance support, IPO readiness, and corporate governance framework for large-scale business operations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Register Public Ltd Company
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
                    IPO Ready
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    SEBI Compliant
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Public Capital Access
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center">
                      <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Public Company Ready</h3>
                      <p className="text-gray-600 mb-6">Complete Public Limited Company incorporation support</p>
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
                Why Choose Our Virtual Office for Public Limited Company?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complete public company structure with regulatory compliance and capital market access
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
                Large Enterprise Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Common challenges large enterprises face and our public company solutions
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
                Public Limited Company Registration Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive 4-step process for Public Limited Company registration with complete support
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
                Public Company Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Large enterprises that achieved market leadership with public company structure
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
                Everything you need to know about Public Limited Company registration with virtual office
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
                Connect with our specialists for personalized guidance on Public Limited Company registration
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