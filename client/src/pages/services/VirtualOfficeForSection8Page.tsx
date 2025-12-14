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
  Heart, 
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

export default function VirtualOfficeForSection8Page() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const benefits = [
    {
      icon: <Heart className="w-6 h-6 text-red-600" />,
      title: "Non-Profit Corporate Structure",
      description: "Section 8 company provides corporate benefits for charitable, educational, scientific, and social welfare activities."
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "Tax Exemption Benefits",
      description: "Eligible for 80G, 12A tax exemptions and various government grants for non-profit activities and social causes."
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Donor Credibility & Trust",
      description: "Enhanced credibility with donors, funding agencies, and international organizations for charitable contributions."
    },
    {
      icon: <FileText className="w-6 h-6 text-purple-600" />,
      title: "MCA & Income Tax Compliance",
      description: "Complete compliance support for Ministry of Corporate Affairs and Income Tax Department requirements."
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-600" />,
      title: "Fast-Track Registration",
      description: "Quick Section 8 company registration with MCA approval and all necessary documentation support."
    },
    {
      icon: <Globe className="w-6 h-6 text-indigo-600" />,
      title: "International Funding Access",
      description: "Corporate structure enables access to international grants, CSR funding, and institutional donor support."
    }
  ];

  const painPoints = [
    {
      problem: "NGOs and charities need corporate structure for credibility and funding access",
      solution: "Section 8 company provides corporate benefits specifically designed for non-profit activities"
    },
    {
      problem: "Difficulty in obtaining tax exemptions and donor trust for charitable activities",
      solution: "Section 8 status enables 80G, 12A exemptions and enhanced donor confidence"
    },
    {
      problem: "High overhead costs for establishing registered office for non-profit organizations",
      solution: "Professional virtual office address at affordable rates specifically for Section 8 companies"
    },
    {
      problem: "Complex compliance requirements for non-profit corporate entities",
      solution: "Complete MCA and Income Tax compliance support specialized for Section 8 companies"
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Name Approval & Objects",
      description: "Reserve company name with charitable objects and obtain MCA approval for Section 8 status"
    },
    {
      step: 2,
      title: "Director Documentation",
      description: "Prepare DIN, DSC for directors and draft Memorandum & Articles with charitable objectives"
    },
    {
      step: 3,
      title: "MCA Filing & License",
      description: "File incorporation documents with MCA and obtain Section 8 license for non-profit operations"
    },
    {
      step: 4,
      title: "Tax Exemptions Setup",
      description: "Apply for 80G, 12A registrations and setup compliance framework for ongoing operations"
    }
  ];

  const features = [
    "Section 8 Company Registration",
    "MCA License for Non-Profit",
    "80G & 12A Tax Exemption Support",
    "Donor Credibility Enhancement",
    "International Funding Access",
    "CSR Partnership Facilitation",
    "Compliance Management",
    "Professional Registered Office"
  ];

  const successStories = [
    {
      business: "Mumbai Education Foundation",
      challenge: "Educational NGO needed corporate structure for international funding and tax exemptions",
      solution: "Section 8 company registration with Andheri virtual office and complete tax exemption setup",
      result: "Secured ₹50 lakhs international grant and achieved 80G status for enhanced donor contributions"
    },
    {
      business: "Delhi Healthcare Initiative",
      challenge: "Healthcare charity required corporate credibility for hospital partnerships and CSR funding",
      solution: "Section 8 incorporation with CP virtual office and healthcare sector compliance",
      result: "Partnered with 5 corporate hospitals and received ₹1 crore CSR funding for rural healthcare"
    },
    {
      business: "Bangalore Environmental Trust",
      challenge: "Environmental organization needed structure for government projects and international collaborations",
      solution: "Section 8 company with tech corridor address and environmental clearance support",
      result: "Won government environmental projects worth ₹75 lakhs and established international partnerships"
    }
  ];

  const faqs = [
    {
      question: "What is Section 8 Company and how is it different from NGO/Trust?",
      answer: "Section 8 Company is a corporate entity for charitable purposes with limited liability, perpetual succession, and better credibility. Unlike trusts, it provides corporate benefits while maintaining non-profit status."
    },
    {
      question: "Can I use virtual office address for Section 8 Company registration?",
      answer: "Yes, virtual office addresses are accepted by MCA for Section 8 company registration. We provide registered office services with complete compliance support for non-profit organizations."
    },
    {
      question: "What are the tax benefits available for Section 8 Companies?",
      answer: "Section 8 companies are eligible for 80G (donor tax exemption), 12A (income tax exemption), and various government grants. We assist with all tax exemption applications and compliance."
    },
    {
      question: "What activities can Section 8 Company undertake?",
      answer: "Charitable, educational, scientific, research, social welfare, religion, environment protection, and other activities for public benefit. No profit distribution to members is allowed."
    },
    {
      question: "What are the compliance requirements for Section 8 Companies?",
      answer: "Annual filing with MCA, income tax returns, activity reports, and compliance with charitable objectives. We provide complete compliance management services."
    },
    {
      question: "Can Section 8 Company receive foreign funding?",
      answer: "Yes, with proper FCRA registration, Section 8 companies can receive foreign contributions. We assist with FCRA applications and international funding compliance."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Virtual Office for Section 8 Company Registration | NGO Corporate Structure"
        description="Register Section 8 Company with professional virtual office. Get non-profit corporate structure, tax exemption support, and donor credibility for charitable organizations."
        keywords="virtual office for section 8 company, NGO corporate structure, section 8 registration, charitable company registration, 80G 12A exemption, non-profit company"
        pageType="purpose"
        industry="section-8"
        canonicalUrl="/purpose/virtual-office-for-section-8"
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
                  For Non-Profit Organizations
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Virtual Office for Section 8 Company Registration
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Register your Section 8 Company with professional virtual office address. Get non-profit corporate structure, tax exemption support, and enhanced donor credibility for charitable organizations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                    Register Section 8 Company
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
                    Tax Exemption Ready
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Donor Credibility
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    MCA Compliant
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center">
                      <Heart className="w-16 h-16 text-red-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Non-Profit Ready</h3>
                      <p className="text-gray-600 mb-6">Complete Section 8 Company incorporation support</p>
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
                Why Choose Our Virtual Office for Section 8 Company?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complete non-profit corporate structure with tax benefits and donor credibility
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
                Non-Profit Organization Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Common challenges charitable organizations face and our Section 8 solutions
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
                Section 8 Company Registration Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process for Section 8 Company registration with complete support
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
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
                Section 8 Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Non-profit organizations that achieved their mission with Section 8 structure
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-600">{story.business}</CardTitle>
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
                Everything you need to know about Section 8 Company registration with virtual office
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
                Connect with our specialists for personalized guidance on Section 8 Company registration
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