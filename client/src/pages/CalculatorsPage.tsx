import { Link } from "wouter";
import { Calculator, DollarSign, TrendingUp, PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

export default function CalculatorsPage() {
  const calculators = [
    {
      id: "startup-cost",
      title: "Cost to Startup Calculator",
      description: "Calculate the total cost to start your business including virtual office setup, legal requirements, and operational expenses.",
      icon: DollarSign,
      href: "/calculators/startup-cost",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: "roi",
      title: "Virtual Office ROI Calculator",
      description: "Compare the cost savings of a virtual office versus traditional office space and calculate your return on investment.",
      icon: TrendingUp,
      href: "/calculators/roi",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: "business-savings",
      title: "Business Savings Calculator",
      description: "Estimate how much you can save on overhead costs by choosing a virtual office solution for your business.",
      icon: PieChart,
      href: "/calculators/savings",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Business Calculators - Virtual Office ROI, Startup Costs & Savings Calculator | SimplySetup</title>
        <meta name="description" content="Free business calculators to estimate startup costs, virtual office ROI, and savings. Calculate your business expenses and potential savings with our professional tools." />
        <meta name="keywords" content="business calculator, startup cost calculator, virtual office ROI calculator, business savings calculator, office cost comparison, virtual office benefits, business expense calculator, startup investment calculator" />
        <link rel="canonical" href="https://simplysetup.co/calculators" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Business Calculators - Calculate Startup Costs & Virtual Office Savings" />
        <meta property="og:description" content="Professional business calculators to estimate costs, ROI, and savings. Make informed decisions with our free calculation tools." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://simplysetup.co/calculators" />
        <meta property="og:image" content="https://simplysetup.co/images/calculators-og.jpg" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Business Calculators - Startup Costs & Virtual Office ROI" />
        <meta name="twitter:description" content="Free calculators to estimate business costs and savings. Calculate startup expenses and virtual office ROI." />
        <meta name="twitter:image" content="https://simplysetup.co/images/calculators-twitter.jpg" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="SimplySetup" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Business Calculators",
            "description": "Free business calculators to estimate startup costs, virtual office ROI, and business savings",
            "url": "https://simplysetup.co/calculators",
            "mainEntity": {
              "@type": "WebApplication",
              "name": "Business Calculator Suite",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR"
              },
              "featureList": [
                "Startup Cost Calculator",
                "Virtual Office ROI Calculator", 
                "Business Savings Calculator"
              ]
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://simplysetup.co"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Calculators",
                  "item": "https://simplysetup.co/calculators"
                }
              ]
            }
          })}
        </script>
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Business Calculators
            </h1>
            <p className="text-xl text-gray-600">
              Make informed decisions with our suite of business calculation tools. 
              Estimate costs, savings, and ROI for your startup or business expansion.
            </p>
          </div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {calculators.map((calculator) => {
              const IconComponent = calculator.icon;
              
              return (
                <Card key={calculator.id} className="relative group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`inline-flex items-center justify-center w-12 h-12 ${calculator.bgColor} rounded-lg mb-4`}>
                      <IconComponent className={`h-6 w-6 ${calculator.color}`} />
                    </div>
                    <CardTitle className="text-xl">{calculator.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {calculator.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <Button asChild className="w-full">
                      <Link href={calculator.href}>
                        Use Calculator
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Why Use Our Calculators?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Data-Driven Decisions</h3>
                <p className="text-gray-600">
                  Make informed business decisions based on accurate cost calculations and projections.
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Cost Optimization</h3>
                <p className="text-gray-600">
                  Identify areas where you can reduce costs and maximize your business efficiency.
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                  <Calculator className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
                <p className="text-gray-600">
                  Simple, intuitive calculators that provide instant results without complex formulas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer location={null} />
    </div>
  );
}