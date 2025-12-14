import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import {
  Building,
  FileText,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Building2,
  Mail,
  Phone,
  Users,
  Globe,
  Award,
} from "lucide-react";

export default function BusinessRegistrationPage() {
  const registrationTypes = [
    {
      icon: Building,
      title: "Private Limited Company",
      description: "Most popular choice for startups and growing businesses with limited liability protection."
    },
    {
      icon: Users,
      title: "Partnership Firm",
      description: "Ideal for businesses with multiple partners sharing profits and responsibilities."
    },
    {
      icon: FileText,
      title: "Limited Liability Partnership",
      description: "Combines benefits of partnership and company with limited liability for partners."
    },
    {
      icon: Award,
      title: "One Person Company",
      description: "Perfect for solo entrepreneurs wanting corporate structure with single ownership."
    },
    {
      icon: Building2,
      title: "Proprietorship",
      description: "Simplest business structure for individual entrepreneurs starting their business."
    },
    {
      icon: Globe,
      title: "Section 8 Company",
      description: "For non-profit organizations and NGOs with social or charitable objectives."
    }
  ];

  const benefits = [
    "Legal business entity status",
    "Limited liability protection",
    "Easier access to funding and loans",
    "Professional credibility",
    "Tax benefits and deductions",
    "Perpetual business existence",
    "Separate legal identity",
    "Better vendor and client relationships"
  ];

  const process = [
    {
      step: "1",
      title: "Business Structure Selection",
      description: "Choose the right business structure based on your needs and goals."
    },
    {
      step: "2",
      title: "Name Reservation",
      description: "Reserve your preferred business name with ROC after availability check."
    },
    {
      step: "3",
      title: "Document Preparation",
      description: "Prepare and file all required documents including MOA, AOA, and forms."
    },
    {
      step: "4",
      title: "Registration Complete",
      description: "Receive your Certificate of Incorporation and start operations legally."
    }
  ];

  const documents = [
    "PAN Cards of Directors/Partners",
    "Aadhaar Cards of all parties",
    "Address Proof (provided by us)",
    "Passport size photographs",
    "Bank account statements",
    "Property documents (if applicable)",
    "NOC from property owner",
    "Professional degree certificates (if required)"
  ];

  const plans = [
    {
      name: "Basic Registration",
      price: "₹4,999",
      period: "one-time",
      description: "Essential business registration package",
      features: [
        "Business address for registration",
        "Name search & reservation",
        "Document preparation",
        "ROC filing & follow-up",
        "Certificate of Incorporation",
        "Basic compliance guidance",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Complete Business Setup",
      price: "₹9,999",
      period: "one-time",
      description: "Comprehensive business setup solution",
      features: [
        "Everything in Basic Registration",
        "GST registration included",
        "Business PAN & TAN",
        "Digital signature certificate",
        "Current account opening help",
        "First year compliance calendar",
        "Dedicated consultant support",
        "Phone & email support"
      ],
      popular: true
    },
    {
      name: "Premium Business Package",
      price: "₹19,999",
      period: "one-time",
      description: "All-inclusive business launch package",
      features: [
        "Everything in Complete Setup",
        "Multiple state registrations",
        "Professional website design",
        "Business logo & branding",
        "Legal agreement templates",
        "First year accounting support",
        "Monthly compliance assistance",
        "Dedicated account manager",
        "Priority support hotline"
      ],
      popular: false
    }
  ];

  const compliance = [
    "Annual ROC filings",
    "Board meeting requirements",
    "Statutory register maintenance",
    "Annual general meetings",
    "Director appointment/resignation",
    "Share capital compliance",
    "Audit requirements",
    "Tax filing obligations"
  ];

  return (
    <>
      <Helmet>
        <title>Business Registration Services | Company Registration | SimplySetup</title>
        <meta name="description" content="Complete business registration services including Private Limited Company, LLP, Partnership, and Proprietorship registration with business address and expert support." />
        <meta name="keywords" content="business registration, company registration, private limited company, LLP registration, business address, ROC filing" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                <Building className="h-4 w-4 mr-2" />
                Business Registration Services
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Register Your Business
                <span className="text-primary block">The Right Way</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Complete business registration services with verified business addresses. 
                From company incorporation to compliance support, we handle everything 
                so you can focus on building your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8 py-3">
                  Start Business Registration
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-3">
                  Free Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Types Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Choose Your Business Structure
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We help you register all types of business entities with complete legal compliance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {registrationTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <CardTitle className="text-xl">{type.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 mb-4">
                        {type.description}
                      </CardDescription>
                      <Button variant="outline" className="w-full">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Why Register Your Business?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Business registration provides legal recognition, credibility, and numerous 
                  benefits that help your business grow and succeed in the competitive market.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Expert Guidance</h3>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-5 w-5 mr-3 text-primary" />
                    <span>business@simplysetup.com</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-3 text-primary" />
                    <span>+91 88888 88888</span>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Free Business Consultation:</strong> Our experts will help you 
                      choose the right business structure for your specific needs.
                    </p>
                  </div>
                  <Button className="w-full mt-6">
                    Schedule Free Consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Simple Registration Process
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our streamlined process makes business registration quick and hassle-free.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <Card key={index} className="border-0 shadow-lg relative">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      {step.step}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-center">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Documents Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Required Documents
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We provide a complete checklist and help you prepare all necessary documents.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {documents.map((document, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="font-medium text-gray-900 text-sm">{document}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Business Registration Packages
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose the package that best suits your business registration needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-xl scale-105' : 'border-gray-200'}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-white px-4 py-1">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 ml-1">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className={`w-full mt-8 ${plan.popular ? 'bg-primary' : ''}`}>
                      Choose Package
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ongoing Compliance Support
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We don't just register your business - we help you stay compliant with ongoing requirements.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {compliance.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                  <span className="font-medium text-gray-900 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Register Your Business?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of entrepreneurs who have successfully registered their businesses with our help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="px-8 py-3">
                Start Registration Today
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 text-white border-white hover:bg-white hover:text-primary">
                Talk to Business Expert
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer location={null} />
    </>
  );
}