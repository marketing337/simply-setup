import { useParams } from "wouter";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ZohoForm from "@/components/ZohoForm";
import { useLocation } from "@/hooks/useLocation";
import { getStateBySlug, formatCurrency, stateGovtFeesData } from "@/lib/stateGovtFees";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  CheckCircle,
  Building,
  Shield,
  MapPin,
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
  IndianRupee,
  Briefcase,
  Building2,
  Scale,
  Landmark,
  CircleCheck
} from "lucide-react";

export default function StateVirtualOfficePage() {
  const params = useParams();
  const { currentLocation } = useLocation();
  const stateSlug = params.state as string;
  const stateData = getStateBySlug(stateSlug);

  if (!stateData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">State Not Found</h1>
          <p className="text-gray-600 mb-8">The requested state page could not be found.</p>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
        <Footer location={currentLocation} />
      </div>
    );
  }

  const totalFees = stateData.govtFees + stateData.dscCharges;

  const feesBreakdown = [
    {
      item: "Government Fees (ROC)",
      amount: stateData.govtFees,
      description: "State-specific ROC filing and registration charges"
    },
    {
      item: "Digital Signature Certificate (DSC)",
      amount: stateData.dscCharges,
      description: "Class 3 DSC for 2 directors required for MCA filing"
    }
  ];

  const benefits = [
    {
      icon: <Building2 className="w-6 h-6 text-blue-600" />,
      title: "MCA Compliant Address",
      description: `Professional registered office address in ${stateData.state} accepted by Ministry of Corporate Affairs`
    },
    {
      icon: <FileText className="w-6 h-6 text-green-600" />,
      title: "Complete ROC Filing",
      description: "End-to-end company registration with all statutory filings and compliance documentation"
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-600" />,
      title: "Legal Compliance",
      description: "NOC, utility bills, and all documents required for Section 12 compliance"
    },
    {
      icon: <Mail className="w-6 h-6 text-orange-600" />,
      title: "Mail & Notice Handling",
      description: "Professional handling of government correspondence and legal notices"
    }
  ];

  const registrationTypes = [
    {
      type: "Private Limited Company",
      govtFees: stateData.govtFees,
      dscFees: stateData.dscCharges,
      timeline: "15-20 working days",
      directors: "2 Directors"
    },
    {
      type: "One Person Company (OPC)",
      govtFees: stateData.govtFees,
      dscFees: Math.round(stateData.dscCharges / 2),
      timeline: "10-15 working days",
      directors: "Single Director"
    },
    {
      type: "Limited Liability Partnership",
      govtFees: stateData.govtFees,
      dscFees: stateData.dscCharges,
      timeline: "12-18 working days",
      directors: "2 Partners"
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Submit Your Details",
      description: "Fill the form with your company name, director details, and business activity"
    },
    {
      step: 2,
      title: "Document Preparation",
      description: "We prepare MOA, AOA, and all required incorporation documents"
    },
    {
      step: 3,
      title: "DSC & DIN Procurement",
      description: "Digital Signature and Director Identification Number obtained for all directors"
    },
    {
      step: 4,
      title: "MCA Filing",
      description: "Complete SPICe+ filing with ROC for company incorporation"
    },
    {
      step: 5,
      title: "Company Registered",
      description: "Receive Certificate of Incorporation, PAN, and TAN within timeline"
    }
  ];

  const faqs = [
    {
      question: `What are the government fees for company registration in ${stateData.state}?`,
      answer: `The government fees for company registration in ${stateData.state} is ${formatCurrency(stateData.govtFees)}. This includes ROC filing fees and stamp duty. Additionally, Digital Signature Certificate (DSC) costs ${formatCurrency(stateData.dscCharges)} for 2 directors.`
    },
    {
      question: `Can I use virtual office address for company registration in ${stateData.state}?`,
      answer: `Yes, virtual office addresses are legally valid for company registration in ${stateData.state} under Section 12 of Companies Act 2013. Our virtual office addresses come with all required documentation including NOC, utility bills, and rental agreement for MCA compliance.`
    },
    {
      question: `How long does company registration take in ${stateData.state}?`,
      answer: `Company registration in ${stateData.state} typically takes 15-20 working days for Private Limited Company, 10-15 days for OPC, and 12-18 days for LLP. Timeline depends on document completeness and MCA processing.`
    },
    {
      question: `What documents are needed for company registration in ${stateData.state}?`,
      answer: `Required documents include: PAN and Aadhaar of all directors, passport-size photographs, address proof (utility bill/bank statement), NOC from property owner for registered office, and proposed MOA & AOA. Foreign directors need passport copies and overseas address proof.`
    },
    {
      question: `Is ${stateData.state} a good state for company registration?`,
      answer: `${stateData.state} offers ${stateData.govtFees <= 2500 ? 'competitive' : 'standard'} government fees at ${formatCurrency(stateData.govtFees)}. Key business hubs include ${stateData.businessHub}. The state provides good infrastructure for businesses with access to skilled workforce and growing markets.`
    },
    {
      question: `What is included in the DSC charges of ${formatCurrency(stateData.dscCharges)}?`,
      answer: `The DSC charges of ${formatCurrency(stateData.dscCharges)} covers Class 3 Digital Signature Certificates for 2 directors, valid for 2 years each. This is mandatory for all directors to sign MCA documents electronically. The fee includes procurement, USB tokens, and delivery.`
    }
  ];

  const nearbyStates = stateGovtFeesData
    .filter(s => s.slug !== stateSlug)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`Virtual Office for Company Registration in ${stateData.state} | Govt Fees ${formatCurrency(stateData.govtFees)}`}
        description={`Register your company in ${stateData.state} with virtual office address. Government fees: ${formatCurrency(stateData.govtFees)}, DSC: ${formatCurrency(stateData.dscCharges)}. Complete MCA filing, ROC compliance & post-registration support.`}
        pageType="purpose"
        service="company-registration"
        canonicalUrl={`/virtual-office-company-registration/${stateData.slug}`}
      />

      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-12 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left Column - Content */}
              <div>
                <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200" data-testid="badge-state">
                  <MapPin className="w-4 h-4 mr-1" />
                  {stateData.state}
                </Badge>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight" data-testid="heading-main">
                  Virtual Office for Company Registration in {stateData.state}
                </h1>

                <p className="text-lg text-gray-600 mb-6 leading-relaxed" data-testid="text-description">
                  {stateData.description}
                </p>

                {/* Fee Display Card */}
                <Card className="mb-6 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50" data-testid="card-fees">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                      <IndianRupee className="w-5 h-5 mr-2 text-blue-600" />
                      Transparent Fee Structure
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {feesBreakdown.map((fee, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-blue-100 last:border-0">
                          <div>
                            <p className="font-medium text-gray-900" data-testid={`text-fee-item-${index}`}>{fee.item}</p>
                            <p className="text-sm text-gray-500">{fee.description}</p>
                          </div>
                          <span className="text-xl font-bold text-blue-600" data-testid={`text-fee-amount-${index}`}>
                            {formatCurrency(fee.amount)}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-3 mt-2 border-t-2 border-blue-300">
                        <span className="font-bold text-gray-900">Total (per director)</span>
                        <span className="text-2xl font-bold text-green-600" data-testid="text-total-fees">
                          {formatCurrency(totalFees)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2" data-testid="trust-indicator-1">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>MCA Compliant</span>
                  </div>
                  <div className="flex items-center space-x-2" data-testid="trust-indicator-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>15-20 Days Registration</span>
                  </div>
                  <div className="flex items-center space-x-2" data-testid="trust-indicator-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Expert Support</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Zoho Form */}
              <div className="lg:sticky lg:top-4">
                <Card className="shadow-xl border-0" data-testid="card-form">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                    <CardTitle className="text-xl font-bold text-center">
                      Get Free Consultation
                    </CardTitle>
                    <p className="text-blue-100 text-center text-sm">
                      Start your company registration in {stateData.state} today
                    </p>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ZohoForm height="500px" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" data-testid="heading-benefits">
                Why Choose Virtual Office for Company Registration in {stateData.state}?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Get all the benefits of a registered office address without the overhead of physical office space.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow" data-testid={`card-benefit-${index}`}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Types with Fees */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" data-testid="heading-registration-types">
                Company Registration Types in {stateData.state}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Choose the right business structure for your needs. All government fees are specific to {stateData.state}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {registrationTypes.map((reg, index) => (
                <Card key={index} className="p-6 border-2 hover:border-blue-400 transition-colors" data-testid={`card-registration-${index}`}>
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <Badge className="mb-2 bg-blue-100 text-blue-800">{reg.type}</Badge>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Govt Fees:</span>
                          <span className="font-semibold">{formatCurrency(reg.govtFees)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">DSC Charges:</span>
                          <span className="font-semibold">{formatCurrency(reg.dscFees)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 mt-2">
                          <span className="font-medium">Total:</span>
                          <span className="font-bold text-blue-600">{formatCurrency(reg.govtFees + reg.dscFees)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-auto space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {reg.timeline}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {reg.directors}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800 text-center">
                <strong>Note:</strong> Above fees are government charges only. Professional service fees and virtual office charges are additional. Contact us for complete pricing.
              </p>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" data-testid="heading-process">
                Company Registration Process in {stateData.state}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Simple 5-step process to get your company registered with a virtual office address.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {processSteps.map((step, index) => (
                <div key={index} className="relative" data-testid={`step-${index}`}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-blue-200" style={{ transform: 'translateX(50%)' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* State-specific Info */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6" data-testid="heading-state-info">
                  Why Register Your Company in {stateData.state}?
                </h2>
                <div className="space-y-4">
                  <Card className="p-4">
                    <div className="flex items-start space-x-3">
                      <Landmark className="w-6 h-6 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">State Capital</h3>
                        <p className="text-gray-600">{stateData.capital}</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-start space-x-3">
                      <Building className="w-6 h-6 text-green-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Business Hubs</h3>
                        <p className="text-gray-600">{stateData.businessHub}</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-start space-x-3">
                      <IndianRupee className="w-6 h-6 text-purple-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Government Fees</h3>
                        <p className="text-gray-600">
                          {formatCurrency(stateData.govtFees)} - {stateData.govtFees <= 2000 ? 'One of the lowest in India' : stateData.govtFees >= 10000 ? 'Higher due to stamp duty' : 'Competitive rates'}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Benefits of {stateData.state}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CircleCheck className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Access to {stateData.businessHub} business ecosystem</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CircleCheck className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Professional virtual office addresses in prime locations</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CircleCheck className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Complete MCA and ROC compliance support</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CircleCheck className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">GST registration and VPOB services available</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CircleCheck className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Post-registration compliance and annual filing support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" data-testid="heading-faqs">
                Frequently Asked Questions - Company Registration in {stateData.state}
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border rounded-lg px-4" data-testid={`faq-${index}`}>
                  <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-blue-600">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Other States */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" data-testid="heading-other-states">
                Virtual Office Company Registration in Other States
              </h2>
              <p className="text-lg text-gray-600">
                Compare government fees across different states in India
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {nearbyStates.map((state, index) => (
                <Link key={index} href={`/virtual-office-company-registration/${state.slug}`}>
                  <Card className="p-4 hover:shadow-lg transition-all hover:border-blue-400 cursor-pointer h-full" data-testid={`link-state-${index}`}>
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">{state.state}</h3>
                      <p className="text-blue-600 font-bold">{formatCurrency(state.govtFees)}</p>
                      <p className="text-xs text-gray-500 mt-1">Govt Fees</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/virtual-office-company-registration-all-states">
                <Button variant="outline" className="px-6" data-testid="button-view-all-states">
                  View All States
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" data-testid="heading-cta">
              Ready to Register Your Company in {stateData.state}?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Get started today with transparent pricing: Govt Fees {formatCurrency(stateData.govtFees)} + DSC {formatCurrency(stateData.dscCharges)}
            </p>
            <div className="flex justify-center">
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <Button size="lg" variant="secondary" className="px-8 py-4 text-lg" data-testid="button-get-started">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer location={currentLocation} />
    </div>
  );
}
