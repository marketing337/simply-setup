import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocation } from "@/hooks/useLocation";
import SEO from "@/components/SEO";
import ContactForm from "@/components/ContactForm";
import SalesPersonCards from "@/components/SalesPersonCards";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent,  DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  CheckCircle, 
  Building, 
  Shield, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Globe, 
  Zap, 
  TrendingUp, 
  Star,
  ArrowRight,
  Calculator,
  FileText,
  Clock,
  Award,
  Target,
  CheckSquare,
  MessageCircle,
  Briefcase,
  Calendar
} from "lucide-react";

export default function VirtualOfficeForCompanyRegistrationPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Expensive Office Rent for Registration",
      solution: "Professional business address at 90% lower cost than traditional office space"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Complex MCA Filing Requirements",
      solution: "Complete ROC filing support with expert guidance through entire process"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Lengthy Registration Timeline",
      solution: "Fast-track company registration completed within 15-20 working days"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      problem: "Document Security Concerns",
      solution: "Secure document handling and compliance management by certified professionals"
    }
  ];

  const keyBenefits = [
    {
      icon: <Building className="w-8 h-8 text-blue-600" />,
      title: "Complete ROC Registration Support",
      description: "End-to-end company registration with Ministry of Corporate Affairs (MCA) filing assistance",
      features: ["MCA portal filing", "Digital signature procurement", "Director identification number", "Certificate of incorporation"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Regulatory Compliance Management", 
      description: "Stay compliant with all corporate regulations and annual filing requirements",
      features: ["Annual return filing", "Board resolution drafting", "Statutory compliance tracking", "ROC correspondence handling"]
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: "Professional Business Presence",
      description: "Establish credibility with premium registered office addresses in business districts",
      features: ["Registered office address", "Correspondence handling", "Professional reception", "Meeting room access"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Business Growth Infrastructure",
      description: "Scale your business operations with flexible corporate services and support",
      features: ["Multi-location presence", "Corporate banking assistance", "Investor meeting facilities", "Legal document storage"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Document Preparation",
      description: "Gather required documents including director details, PAN cards, address proofs, and memorandum of association",
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "Name Reservation & Filing",
      description: "Reserve company name with ROC and file incorporation documents through MCA portal with digital signatures",
      icon: <CheckSquare className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "Registration Completion",
      description: "Receive certificate of incorporation, PAN, TAN, and complete company registration within 15-20 days",
      icon: <Award className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "Post-Registration Setup",
      description: "Set up corporate banking, compliance calendar, and ongoing regulatory support for smooth operations",
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />
    }
  ];

  const registrationTypes = [
    {
      type: "Private Limited Company",
      timeline: "15-20 working days",
      requirements: "Minimum 2 directors, 1 shareholder",
      benefits: ["Limited liability protection", "Separate legal entity", "Easy fund raising", "Perpetual succession"],
      idealFor: "Startups, SMEs, businesses seeking investment"
    },
    {
      type: "One Person Company (OPC)",
      timeline: "10-15 working days", 
      requirements: "Single director and shareholder",
      benefits: ["Individual ownership", "Limited liability", "Corporate benefits", "Simplified compliance"],
      idealFor: "Solo entrepreneurs, consultants, freelancers"
    },
    {
      type: "Limited Liability Partnership",
      timeline: "12-18 working days",
      requirements: "Minimum 2 partners",
      benefits: ["Flexible management", "Lower compliance", "Professional credibility", "Tax benefits"],
      idealFor: "Professional services, partnerships, consultancies"
    }
  ];

  const faqs = [
    {
      question: "What documents are required for company registration in India?",
      answer: "Essential documents include: PAN cards of all directors and shareholders, Aadhaar cards or passport for identity proof, address proof (utility bills, bank statements), passport-size photographs, digital signature certificates (DSC), registered office address proof with NOC from property owner, memorandum and articles of association (MOA & AOA), and Form DIR-3 for Director Identification Number. For foreign directors, additional documents like passport copies and overseas address proof are required."
    },
    {
      question: "Can virtual office address be used as registered office for company registration?",
      answer: "Yes, virtual office addresses are legally valid for registered office requirements under Section 12 of Companies Act 2013. The address must be used exclusively for correspondence and legal notices. Virtual office providers must furnish proper documentation including No Objection Certificate (NOC), utility bills, property tax receipts, and rental agreements. The registered office can be changed later by filing Form INC-22 with MCA within 15 days of shifting."
    },
    {
      question: "How long does company registration take in India and what affects the timeline?",
      answer: "Standard timelines: Private Limited Company (15-20 working days), One Person Company (10-15 working days), Limited Liability Partnership (12-18 working days). Factors affecting timeline include document completeness, name availability, MCA processing load, DSC procurement time, and response time for query clarifications. Fast-track processing is available for additional fees. Delays commonly occur due to incomplete documentation or name rejection."
    },
    {
      question: "What is the minimum capital requirement for different types of companies?",
      answer: "Private Limited Company: No minimum paid-up capital required (previously ₹1 lakh), but authorized capital must be declared. One Person Company: No minimum capital requirement. Limited Liability Partnership: No minimum capital requirement. Public Limited Company: ₹5 lakh minimum paid-up capital. The authorized capital determines stamp duty and registration fees payable to the government."
    },
    {
      question: "What ongoing compliance requirements exist after company registration?",
      answer: "Annual compliances include: Filing Annual Return (Form MGT-7) and Financial Statements (Form AOC-4) within 60 days of AGM, conducting Annual General Meeting within 15 months of previous AGM, maintaining statutory registers and minutes books, filing income tax returns by September 30th, GST return filing if registered, director KYC through Form DIR-3 KYC annually, and board meeting at least 4 times per year with proper documentation."
    },
    {
      question: "How much does company registration cost in India including all fees?",
      answer: "Government fees: ₹4,000 for authorized capital up to ₹1 lakh (additional ₹300 for every ₹10,000 above). Professional service fees: ₹5,000-15,000 depending on complexity. Additional costs include DSC procurement (₹1,500-2,500 per director), registered office virtual address (₹3,000-8,000 annually), name reservation fee (₹1,000), and post-registration services like GST registration, bank account opening assistance. Total cost typically ranges from ₹15,000-30,000."
    },
    {
      question: "What is the difference between Private Limited Company and One Person Company?",
      answer: "Private Limited Company requires minimum 2 directors and can have up to 200 members, allows foreign investment, easier to raise capital, and suitable for scaling businesses. One Person Company requires only 1 director-cum-member, has restrictions on paid-up capital (₹50 lakh) and turnover (₹2 crore), cannot convert to public company directly, but offers limited liability with sole ownership. OPC is ideal for individual entrepreneurs while Pvt Ltd suits partnership ventures."
    },
    {
      question: "Can foreign nationals register a company in India?",
      answer: "Yes, foreign nationals can register companies in India. Requirements include: valid passport, overseas address proof, foreign currency bank account details for investment, adherence to FDI policy limits (automatic route allows 100% FDI in most sectors), appointment of Indian resident director if required, and compliance with FEMA regulations. Foreign companies can also establish liaison offices, branch offices, or project offices with RBI approval."
    },
    {
      question: "What happens if company registration is rejected by MCA?",
      answer: "Common rejection reasons include unavailable company name, incomplete documentation, non-compliance with naming guidelines, or technical errors in filing. Upon rejection, applicants receive detailed reasons via email. You can rectify issues and resubmit within prescribed timelines, choose alternative names, or file appeals with Regional Director within 30 days. The application fee is typically not refunded, but corrected applications can be filed with fresh fees."
    },
    {
      question: "Is it mandatory to have a physical office for company registration?",
      answer: "No, physical office space is not mandatory. Companies can use virtual office addresses, co-working spaces, or residential addresses as registered office (with proper permissions). The key requirement is that the address should be available for official correspondence and legal notices. However, certain regulated businesses may require physical presence as per sectoral guidelines. The registered office can be residential property of directors with proper documentation."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Virtual Office for Company Registration in India | Complete ROC Filing & MCA Compliance"
        description="Register your Private Limited Company, OPC, or LLP with professional virtual office address. Complete ROC filing, MCA compliance, post-registration support, and corporate banking assistance in India."
        keywords="virtual office company registration, ROC filing, MCA compliance, private limited company registration, OPC registration, LLP registration, registered office address, corporate registration India"
        pageType="purpose"
        service="company-registration"
        canonicalUrl="/purpose/virtual-office-for-company-registration"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Virtual Office for Company Registration",
          "description": "Complete company registration services with virtual office address including ROC filing, MCA compliance, and post-registration support",
          "provider": {
            "@type": "Organization",
            "name": "Virtual Office Solutions",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IN"
            }
          },
          "areaServed": "India",
          "serviceType": "Business Registration",
          "offers": [
            {
              "@type": "Offer",
              "name": "Private Limited Company Registration",
              "description": "Complete Pvt Ltd company registration with virtual office address",
              "price": "Starting from ₹15,000",
              "priceCurrency": "INR"
            },
            {
              "@type": "Offer", 
              "name": "One Person Company Registration",
              "description": "OPC registration for solo entrepreneurs",
              "price": "Starting from ₹12,000",
              "priceCurrency": "INR"
            },
            {
              "@type": "Offer",
              "name": "LLP Registration", 
              "description": "Limited Liability Partnership registration",
              "price": "Starting from ₹10,000",
              "priceCurrency": "INR"
            }
          ]
        }}
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                  <Building className="w-4 h-4 mr-1" />
                  Company Registration
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Virtual Office for Company Registration in India
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Register your Private Limited Company, One Person Company (OPC), or Limited Liability Partnership (LLP) with MCA-compliant virtual office address. Get complete ROC filing assistance, digital signature procurement, and post-registration corporate banking support across 500+ cities in India.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Start Company Registration
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader className="sr-only">
                        <DialogTitle>Contact Form</DialogTitle>
                      </DialogHeader>
                      <ContactForm />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>15-20 day registration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>ROC compliant address</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>MCA filing support</span>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-blue-100 to-purple-100 p-12">
                    <Building className="w-48 h-48 text-blue-600 mx-auto" />
                  </div>
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-purple-100 rounded-full opacity-60"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sales Person Card */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {currentLocation && (
              <SalesPersonCards locationId={currentLocation.id} />
            )}
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Company Registration Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Streamline your company registration process with professional support and compliant infrastructure.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {painPoints.map((point, index) => (
                <Card key={index} className="p-6 border-l-4 border-red-500 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">{point.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-red-600 mb-2">{point.problem}</h3>
                        <div className="flex items-center space-x-2 text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          <p className="font-medium">{point.solution}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comprehensive Guide Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Complete Guide to Company Registration in India 2025
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Everything you need to know about registering a company in India, from choosing the right business structure to completing MCA compliance and post-registration requirements.
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">What is Company Registration?</h3>
                  <p className="text-gray-700 mb-4">
                    Company registration is the legal process of incorporating a business entity under the Companies Act 2013 in India. This process involves filing necessary documents with the Ministry of Corporate Affairs (MCA) through the Registrar of Companies (ROC) to obtain a Certificate of Incorporation.
                  </p>
                  <p className="text-gray-700 mb-6">
                    A registered company becomes a separate legal entity with perpetual succession, limited liability protection, and the ability to enter contracts, own property, and raise capital from investors. The registration process requires a registered office address, which can be fulfilled through virtual office services.
                  </p>
                  
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Requirements for Company Registration:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Minimum 2 directors for Private Limited Company (1 for OPC)</li>
                    <li>• Digital Signature Certificate (DSC) for all directors</li>
                    <li>• Director Identification Number (DIN) for all directors</li>
                    <li>• Registered office address with supporting documents</li>
                    <li>• Memorandum and Articles of Association (MOA & AOA)</li>
                    <li>• Name availability and reservation through RUN portal</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Benefits of Virtual Office for Registration</h3>
                  <p className="text-gray-700 mb-4">
                    Virtual office addresses provide a cost-effective solution for company registration while ensuring full MCA compliance. These addresses are legally valid for registered office requirements and offer professional credibility without the overhead of physical office space.
                  </p>
                  
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Advantages Include:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 90% cost savings compared to traditional office rent</li>
                    <li>• Prime business district addresses for enhanced credibility</li>
                    <li>• MCA-compliant documentation and NOC provision</li>
                    <li>• Professional mail handling and forwarding services</li>
                    <li>• Meeting room access for client presentations</li>
                    <li>• Flexibility to change business location without affecting registration</li>
                  </ul>
                  
                  <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                    <h4 className="text-lg font-semibold text-blue-900 mb-3">Legal Compliance Note</h4>
                    <p className="text-blue-800 text-sm">
                      As per Section 12 of Companies Act 2013, every company must have a registered office address for correspondence and legal notices. Virtual offices fulfill this requirement while providing operational flexibility and cost efficiency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Complete Company Registration Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need for hassle-free company registration and ongoing compliance management.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {keyBenefits.map((benefit, index) => (
                <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="mb-6">{benefit.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{benefit.description}</p>
                    <div className="space-y-3">
                      {benefit.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Process Guide Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Step-by-Step Company Registration Process in India
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Detailed walkthrough of the complete company registration process with MCA requirements, documentation, and timeline for each step.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Pre-Registration Requirements</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">1. Digital Signature Certificate (DSC)</h4>
                    <p className="text-gray-700">All directors must obtain Class II DSC from authorized certifying agencies like NIC, SafeScrypt, or eMudhra. Cost: ₹1,500-2,500 per director. Validity: 2 years.</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">2. Director Identification Number (DIN)</h4>
                    <p className="text-gray-700">Apply through MCA portal with Form DIR-3. Required documents: PAN, Aadhaar, address proof, photograph. Processing time: 3-5 working days.</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">3. Company Name Reservation</h4>
                    <p className="text-gray-700">Check availability through RUN portal, submit 2 name options with justification. Approval within 24-48 hours. Reserved name valid for 20 days.</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">MCA Filing Process</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">4. Form SPICe+ Filing</h4>
                    <p className="text-gray-700">Integrated form for company incorporation, PAN, TAN allocation, EPFO, and ESIC registration. Government fee: ₹4,000 for authorized capital up to ₹1 lakh.</p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">5. MOA & AOA Preparation</h4>
                    <p className="text-gray-700">Draft Memorandum and Articles of Association defining company objectives, share structure, and internal governance. Must comply with Schedule I of Companies Act 2013.</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">6. Registered Office Documentation</h4>
                    <p className="text-gray-700">Provide NOC from property owner, utility bill, and rental agreement. Virtual office providers supply all compliant documentation.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Post-Registration Compliance Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Annual Compliance</h4>
                  <p className="text-gray-600 text-sm">File AOC-4, MGT-7 within 60 days of AGM. Maintain statutory registers and board resolutions.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Tax Compliance</h4>
                  <p className="text-gray-600 text-sm">GST registration if turnover exceeds ₹20 lakhs. Income tax return filing by September 30th annually.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Operational Setup</h4>
                  <p className="text-gray-600 text-sm">Open corporate bank account, obtain necessary licenses, implement accounting systems.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Types Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Types of Company Registration Available in India
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive comparison of business structures with detailed requirements, benefits, and suitability for different business models.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {registrationTypes.map((type, index) => (
                <Card key={index} className="p-6 border-t-4 border-blue-500 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl font-bold text-gray-900">{type.type}</CardTitle>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div><strong>Timeline:</strong> {type.timeline}</div>
                      <div><strong>Requirements:</strong> {type.requirements}</div>
                      <div><strong>Ideal for:</strong> {type.idealFor}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Benefits:</h4>
                    <div className="space-y-2">
                      {type.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                How Company Registration Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process to get your company registered and operational within 15-20 working days.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="p-6 text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      {step.icon}
                    </div>
                    <div className="bg-blue-600 text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Cost Breakdown Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Government Fees for Company Registration in India 2025
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Official MCA government fees for different types of company registration in India.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                *We provide virtual office address services only. Professional services and registration assistance available through our partners.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <Card className="border-2 border-blue-200 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-blue-600">Private Limited Company</CardTitle>
                  <p className="text-gray-600">Most Popular Choice</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900">₹4,000 - ₹8,000</div>
                    <p className="text-sm text-gray-600">Government Fees Only</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Up to ₹1 Lakh Authorized Capital</span>
                      <span className="font-medium">₹4,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">₹1-5 Lakh Authorized Capital</span>
                      <span className="font-medium">₹5,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">₹5-10 Lakh Authorized Capital</span>
                      <span className="font-medium">₹6,500</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Above ₹10 Lakh</span>
                      <span className="font-medium">₹8,000+</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold text-gray-900 mb-2">Government Filing Includes:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• SPICe+ Form filing</li>
                      <li>• Certificate of incorporation</li>
                      <li>• PAN & TAN allocation</li>
                      <li>• EPFO & ESIC registration</li>
                      <li>• Name reservation fees</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-green-200 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-green-600">One Person Company</CardTitle>
                  <p className="text-gray-600">For Solo Entrepreneurs</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900">₹4,000 - ₹6,000</div>
                    <p className="text-sm text-gray-600">Government Fees Only</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Up to ₹1 Lakh Authorized Capital</span>
                      <span className="font-medium">₹4,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">₹1-5 Lakh Authorized Capital</span>
                      <span className="font-medium">₹5,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Above ₹5 Lakh</span>
                      <span className="font-medium">₹6,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Name reservation</span>
                      <span className="font-medium">Included</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold text-gray-900 mb-2">Government Filing Includes:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• OPC incorporation form</li>
                      <li>• Single director filing</li>
                      <li>• Nominee appointment</li>
                      <li>• PAN & TAN allocation</li>
                      <li>• Certificate of incorporation</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-purple-200 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-purple-600">Limited Liability Partnership</CardTitle>
                  <p className="text-gray-600">For Partnerships</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900">₹500 - ₹1,000</div>
                    <p className="text-sm text-gray-600">Government Fees Only</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">LLP Registration Fee</span>
                      <span className="font-medium">₹500</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Name reservation</span>
                      <span className="font-medium">₹200</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Stamp duty (varies by state)</span>
                      <span className="font-medium">₹200-300</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Government Fees</span>
                      <span className="font-medium">₹900-1,000</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold text-gray-900 mb-2">Government Filing Includes:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• LLP incorporation form</li>
                      <li>• Partnership agreement filing</li>
                      <li>• Certificate of incorporation</li>
                      <li>• PAN allocation</li>
                      <li>• Designated partner filing</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
              <h3 className="text-xl font-bold text-blue-800 mb-4">Important Note About Our Services</h3>
              <div className="text-sm text-blue-700">
                <p className="mb-2">
                  <strong>Virtual Office Services:</strong> We provide MCA-compliant registered office addresses with all necessary documentation including NOC, utility bills, and address verification letters.
                </p>
                <p className="mb-2">
                  <strong>Government Fees:</strong> The fees shown above are official MCA charges that you pay directly to the government during registration.
                </p>
                <p>
                  <strong>Professional Services:</strong> For company registration assistance, digital signature procurement, and legal documentation, we work with certified partners who can provide these services separately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Company Registration FAQ - Complete Guide 2025
              </h2>
              <p className="text-xl text-gray-600">
                Comprehensive answers to all questions about company registration process, requirements, costs, and compliance in India.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Register Your Company?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get your business registered with complete compliance support and professional infrastructure. Start your entrepreneurial journey today.
            </p>
            <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  Get Started with Registration
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader className="sr-only">

                  <DialogTitle>Contact Form</DialogTitle>

                </DialogHeader>
                <ContactForm />
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>
      
      <Footer location={currentLocation} />
    </div>
  );
}