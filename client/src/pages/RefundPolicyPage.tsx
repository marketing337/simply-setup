import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import {
  Shield,
  RefreshCw,
  FileText,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Mail,
  Phone,
  Clock,
  Building2,
} from "lucide-react";

export default function RefundPolicyPage() {
  const refundConditions = [
    {
      icon: FileText,
      title: "GST Application Rejection",
      description: "If your GST registration is rejected more than 3 times due to PPOB/Virtual Office documentation issues"
    },
    {
      icon: Building2,
      title: "MCA Application Rejection", 
      description: "If your MCA (Ministry of Corporate Affairs) application is rejected more than 3 times due to PPOB/Virtual Office documentation"
    },
    {
      icon: Shield,
      title: "Documentation Issues Only",
      description: "Refund applies specifically to rejections caused by our virtual office or PPOB documentation, not other application issues"
    }
  ];

  const refundProcess = [
    {
      step: "1",
      title: "Document Rejection",
      description: "Receive official rejection notice from GST/MCA authorities citing PPOB/Virtual Office documentation issues"
    },
    {
      step: "2", 
      title: "Third Rejection",
      description: "After the third rejection for the same documentation issues, contact our refund team"
    },
    {
      step: "3",
      title: "Verification Process",
      description: "Our team verifies the rejection reasons and documentation issues with official records"
    },
    {
      step: "4",
      title: "Complete Refund",
      description: "100% refund processed within 7-10 business days without any deductions or charges"
    }
  ];

  const importantNotes = [
    "Refund policy applies only to rejections specifically due to PPOB/Virtual Office documentation",
    "Other application issues (incorrect forms, missing documents, etc.) are not covered",
    "Official rejection notices must be provided as proof",
    "Refund processing takes 7-10 business days after verification",
    "No hidden charges or deductions will be made from the refund amount",
    "This policy covers both GST and MCA application rejections"
  ];

  return (
    <>
      <Helmet>
        <title>Refund Policy - GST & MCA Applications | SimplySetup</title>
        <meta name="description" content="Our refund policy for GST and MCA applications. Complete refund if application is rejected more than 3 times due to PPOB/Virtual Office documentation issues." />
        <meta name="keywords" content="refund policy, GST refund, MCA refund, virtual office refund, PPOB documentation refund" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Link href="/">
                <Button variant="outline" className="mb-6">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                <Shield className="h-4 w-4 mr-2" />
                Refund Policy
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                GST & MCA Application
                <span className="text-primary block">Refund Policy</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We stand behind our virtual office services. If your GST or MCA application 
                is rejected more than 3 times due to our PPOB/Virtual Office documentation, 
                we provide a complete refund without any deductions.
              </p>
            </div>
          </div>
        </section>

        {/* Main Refund Policy */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-8 rounded-r-lg mb-12">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Complete Refund Guarantee
                  </h2>
                  <p className="text-lg text-gray-700 mb-4">
                    <strong>If your GST or MCA Application is rejected more than 3 times due to 
                    PPOB / Virtual Office Documentation, we will issue a complete refund without 
                    deducting any charges.</strong>
                  </p>
                  <p className="text-gray-600">
                    This guarantee demonstrates our confidence in our virtual office documentation 
                    and our commitment to your business registration success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Refund Conditions */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Refund Conditions
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our refund policy applies under specific conditions related to documentation issues.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {refundConditions.map((condition, index) => {
                const Icon = condition.icon;
                return (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <CardTitle className="text-xl">{condition.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">
                        {condition.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Refund Process */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How the Refund Process Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Simple and transparent process to claim your refund when eligible.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {refundProcess.map((step, index) => (
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
                  {index < refundProcess.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <RefreshCw className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Important Notes
              </h2>
              <p className="text-lg text-gray-600">
                Please read these important details about our refund policy.
              </p>
            </div>
            
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center">
                  <AlertCircle className="h-6 w-6 text-amber-500 mr-3" />
                  <CardTitle className="text-xl">Terms & Conditions</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {importantNotes.map((note, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{note}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>



        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Confident in Our Services
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Our refund policy reflects our confidence in providing reliable virtual office 
              documentation for your business registration needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/virtual-office">
                <Button variant="secondary" size="lg" className="px-8 py-3">
                  Explore Virtual Offices
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="px-8 py-3 text-white border-white hover:bg-white hover:text-primary">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer location={null} />
    </>
  );
}