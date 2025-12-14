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
  Wheat, 
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
  Tractor
} from "lucide-react";

export default function VirtualOfficeForProducerCompanyPage() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const benefits = [
    {
      icon: <Wheat className="w-6 h-6 text-green-600" />,
      title: "Agricultural Producer Organization",
      description: "Specialized corporate structure for farmer producer organizations with collective farming and marketing benefits."
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Farmer Collective Benefits",
      description: "Enable farmers to collectively access markets, technology, credit, and better prices for agricultural produce."
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-600" />,
      title: "Government Scheme Access",
      description: "Enhanced access to government subsidies, schemes, and support programs specifically designed for producer companies."
    },
    {
      icon: <Star className="w-6 h-6 text-orange-600" />,
      title: "Supply Chain Integration",
      description: "Direct market access, value chain participation, and elimination of intermediaries for better farmer income."
    },
    {
      icon: <FileText className="w-6 h-6 text-red-600" />,
      title: "MCA & Agricultural Compliance",
      description: "Complete compliance with Ministry of Corporate Affairs and agricultural sector regulations and requirements."
    },
    {
      icon: <Clock className="w-6 h-6 text-yellow-600" />,
      title: "Fast-Track Registration",
      description: "Quick producer company registration with agricultural ministry coordination and farmer documentation support."
    }
  ];

  const painPoints = [
    {
      problem: "Farmers need collective structure for better market access and bargaining power",
      solution: "Producer company enables collective farming, processing, and marketing with corporate benefits"
    },
    {
      problem: "Individual farmers struggle with access to credit, technology, and modern farming techniques",
      solution: "Producer company structure facilitates institutional credit, technology transfer, and skill development"
    },
    {
      problem: "High intermediary costs reducing farmer income and market inefficiencies",
      solution: "Direct market access through producer company eliminates intermediaries and increases farmer income"
    },
    {
      problem: "Complex compliance and documentation requirements for agricultural cooperatives",
      solution: "Complete regulatory compliance support including MCA filings and agricultural sector requirements"
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Farmer Group Formation",
      description: "Form farmer producer organization with minimum 10 farmer members and define collective objectives"
    },
    {
      step: 2,
      title: "Producer Company Documentation",
      description: "Prepare incorporation documents, farmer member details, and agricultural activity plans"
    },
    {
      step: 3,
      title: "MCA Registration",
      description: "File producer company registration with MCA and obtain Certificate of Incorporation"
    },
    {
      step: 4,
      title: "Agricultural Compliance Setup",
      description: "Register with agricultural departments, setup banking, and enable government scheme access"
    }
  ];

  const features = [
    "Producer Company Registration",
    "Farmer Collective Organization",
    "Agricultural Compliance Support",
    "Government Scheme Access",
    "Market Linkage Facilitation",
    "Credit Access Support",
    "Value Chain Integration",
    "Professional Business Address"
  ];

  const successStories = [
    {
      business: "Maharashtra Farmer Producer Company",
      challenge: "200 farmers needed collective structure for organic farming and direct market access",
      solution: "Producer company registration with Mumbai virtual office and organic certification support",
      result: "Achieved 40% higher income through direct sales and secured ₹50 lakhs credit for modern equipment"
    },
    {
      business: "Punjab Agricultural Producer Co.",
      challenge: "Wheat farmers required collective bargaining power and processing facility access",
      solution: "Producer company setup with Chandigarh address and processing unit coordination",
      result: "Established processing facility, eliminated intermediaries, and increased farmer income by 35%"
    },
    {
      business: "Karnataka Horticulture Producer Co.",
      challenge: "Fruit growers needed cold storage access and export market linkage",
      solution: "Producer company registration with Bangalore address and export facilitation",
      result: "Accessed international markets, established cold storage network, doubled farmer income"
    }
  ];

  const faqs = [
    {
      question: "What is Producer Company and how is it different from regular company?",
      answer: "Producer Company is a hybrid structure combining features of cooperative society and company, specifically designed for agricultural producers. It's governed by special provisions in Companies Act for farmer collectives."
    },
    {
      question: "Can I register Producer Company with virtual office address?",
      answer: "Yes, virtual office addresses are accepted for producer company registration. We provide registered office services with complete agricultural sector compliance support."
    },
    {
      question: "What are the minimum requirements for Producer Company registration?",
      answer: "Minimum 10 farmer members, at least 5 directors (all must be members), minimum ₹1 lakh authorized capital, and agricultural or allied activities as main business."
    },
    {
      question: "What activities can Producer Company undertake?",
      answer: "Production, harvesting, procurement, grading, pooling, handling, marketing, selling, export of primary produce, import of agricultural equipment, and other agricultural allied activities."
    },
    {
      question: "What are the benefits of Producer Company for farmers?",
      answer: "Collective bargaining power, better market prices, access to credit and technology, elimination of intermediaries, government scheme benefits, and professional business structure."
    },
    {
      question: "What government support is available for Producer Companies?",
      answer: "Various central and state government schemes provide financial assistance, subsidies, credit guarantees, and technical support specifically for farmer producer organizations."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Virtual Office for Producer Company Registration | Farmer Producer Organization (FPO)"
        description="Register Producer Company with professional virtual office. Get farmer collective structure, agricultural compliance support, and government scheme access for agricultural producers."
        keywords="virtual office for producer company, farmer producer organization, FPO registration, agricultural cooperative, producer company incorporation, farmer collective"
        pageType="purpose"
        industry="producer-company"
        canonicalUrl="/purpose/virtual-office-for-producer-company"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-green-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
                  <Tractor className="w-4 h-4 mr-1" />
                  For Agricultural Producers
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Virtual Office for Producer Company Registration
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Register your Producer Company (FPO) with professional virtual office address. Get farmer collective structure, agricultural compliance support, and enhanced access to government schemes for agricultural producers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                    Register Producer Company
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
                    Farmer Collective
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Government Support
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Market Access
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center">
                      <Wheat className="w-16 h-16 text-green-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Agricultural Ready</h3>
                      <p className="text-gray-600 mb-6">Complete Producer Company incorporation support</p>
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
                Why Choose Our Virtual Office for Producer Company?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complete farmer producer organization setup with agricultural compliance and market access
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
                Agricultural Producer Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Common challenges farmers face and our producer company solutions
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
                Producer Company Registration Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process for Producer Company registration with agricultural compliance
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
                Producer Company Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Farmer collectives that transformed agricultural income with producer company structure
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
                Everything you need to know about Producer Company registration with virtual office
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
                Connect with our specialists for personalized guidance on Producer Company registration
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