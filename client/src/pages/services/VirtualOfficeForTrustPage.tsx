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
  Scale, 
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
  Building
} from "lucide-react";

export default function VirtualOfficeForTrustPage() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const benefits = [
    {
      icon: <Scale className="w-6 h-6 text-blue-600" />,
      title: "Trust Deed Registration",
      description: "Professional address for trust deed registration with registrar and complete legal documentation support."
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "Tax Exemption Benefits",
      description: "Eligible for 12A, 80G tax exemptions and various charitable trust benefits for donors and beneficiaries."
    },
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: "Trustee Coordination",
      description: "Centralized address for multiple trustees with professional meeting facilities for trust administration."
    },
    {
      icon: <Building className="w-6 h-6 text-orange-600" />,
      title: "Property & Asset Management",
      description: "Professional address for trust property registration, asset management, and legal compliance requirements."
    },
    {
      icon: <Clock className="w-6 h-6 text-red-600" />,
      title: "Quick Registration Process",
      description: "Fast-track trust registration with registrar and complete documentation support within 15-21 days."
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-600" />,
      title: "Charitable Activities Support",
      description: "Complete support for charitable, religious, educational, and philanthropic activities under trust structure."
    }
  ];

  const painPoints = [
    {
      problem: "Trust formation requires registered address and complex legal documentation",
      solution: "Professional virtual office address with complete trust deed preparation and registration support"
    },
    {
      problem: "Multiple trustees across different locations need centralized coordination",
      solution: "Central business address accessible to all trustees with meeting facilities and communication support"
    },
    {
      problem: "High costs for establishing physical office for charitable trust operations",
      solution: "Cost-effective virtual office solution specifically designed for trust and charitable organizations"
    },
    {
      problem: "Complex compliance requirements for trust tax exemptions and regulatory filings",
      solution: "Complete compliance support for income tax, charity commissioner, and regulatory requirements"
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Trust Deed Preparation",
      description: "Draft comprehensive trust deed with objects, trustee powers, and beneficiary details"
    },
    {
      step: 2,
      title: "Registration & Stamp Duty",
      description: "Register trust deed with appropriate registrar and complete stamp duty requirements"
    },
    {
      step: 3,
      title: "PAN & TAN Application",
      description: "Apply for trust PAN card and TAN for tax deduction requirements"
    },
    {
      step: 4,
      title: "Tax Exemption Setup",
      description: "Apply for 12A, 80G registrations and setup compliance framework for trust operations"
    }
  ];

  const features = [
    "Trust Deed Registration",
    "Registrar Filing Support",
    "Tax Exemption Assistance",
    "Trustee Meeting Facilities",
    "Property Registration Address",
    "Charitable Compliance Support",
    "Banking Account Setup",
    "Professional Trust Presence"
  ];

  const successStories = [
    {
      business: "Mumbai Religious Trust",
      challenge: "Religious trust needed registered address for temple management and donation tax exemptions",
      solution: "Trust registration with Dadar virtual office and complete 80G exemption setup",
      result: "Achieved 80G status enabling ₹2 crore annual donations with tax benefits for devotees"
    },
    {
      business: "Delhi Educational Trust",
      challenge: "Educational trust required professional presence for school management and funding",
      solution: "Trust registration with CP virtual office and educational sector compliance",
      result: "Established 3 schools and secured ₹5 crore government funding for rural education"
    },
    {
      business: "Bangalore Healthcare Trust",
      challenge: "Medical trust needed structure for hospital operations and charitable healthcare services",
      solution: "Trust registration with Koramangala address and healthcare compliance support",
      result: "Operating 2 charitable hospitals providing free healthcare to 10,000+ patients annually"
    }
  ];

  const faqs = [
    {
      question: "What is the difference between Trust and Section 8 Company?",
      answer: "Trust is simpler to establish with trustee-based management, while Section 8 Company has corporate structure with directors. Trust is better for religious/charitable activities, Section 8 for structured operations."
    },
    {
      question: "Can I register a Trust with virtual office address?",
      answer: "Yes, virtual office addresses are accepted for trust registration. We provide registered office services with complete documentation support for trust deed registration."
    },
    {
      question: "What documents are required for Trust registration?",
      answer: "Trust deed, trustee identity proofs, address proof, PAN cards of trustees, and registered office address verification. We assist with complete documentation preparation."
    },
    {
      question: "What are the tax benefits available for Trusts?",
      answer: "Trusts are eligible for 12A (income tax exemption), 80G (donor tax benefits), and various other exemptions based on charitable activities. We assist with all exemption applications."
    },
    {
      question: "Can Trust own property and assets?",
      answer: "Yes, trusts can own properties, investments, and assets for charitable purposes. We provide address verification support for property registrations and asset management."
    },
    {
      question: "What are the compliance requirements for Trusts?",
      answer: "Annual income tax filing, charity commissioner reporting (if applicable), and maintaining proper books of accounts. We provide complete compliance management services."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Virtual Office for Trust Registration | Charitable Trust Professional Address"
        description="Register Trust with professional virtual office address. Get trust deed support, tax exemption assistance, and trustee coordination for charitable organizations."
        keywords="virtual office for trust registration, charitable trust address, trust deed registration, 12A 80G exemption, religious trust registration, educational trust setup"
        pageType="purpose"
        industry="trust"
        canonicalUrl="/purpose/virtual-office-for-trust"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-indigo-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                  <Scale className="w-4 h-4 mr-1" />
                  For Trust Registration
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Virtual Office for Trust Registration
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Register your Trust with professional virtual office address. Get complete trust deed support, tax exemption assistance, and trustee coordination for charitable, religious, and educational organizations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    Register Trust Now
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
                    Trust Deed Ready
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Tax Exemption Support
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Legal Compliance
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center">
                      <Scale className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Trust Ready</h3>
                      <p className="text-gray-600 mb-6">Complete Trust registration and setup support</p>
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
                Why Choose Our Virtual Office for Trust Registration?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complete trust formation support with legal compliance and tax exemption benefits
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
                Trust Formation Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Common challenges in trust formation and our comprehensive solutions
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
                Trust Registration Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process for Trust registration with complete legal support
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
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
                Trust Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Charitable organizations that achieved their mission through trust structure
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-indigo-600">{story.business}</CardTitle>
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
                Everything you need to know about Trust registration with virtual office
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
                Connect with our specialists for personalized guidance on Trust registration
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