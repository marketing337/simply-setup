import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, TrendingUp, Download, Share2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

export default function VirtualOfficeROICalculatorPage() {
  const [companyName, setCompanyName] = useState<string>("");
  const [businessType, setBusinessType] = useState<string>("");
  const [teamSize, setTeamSize] = useState<number>(5);
  const [currentOfficeRent, setCurrentOfficeRent] = useState<number>(50000);
  const [utilityBills, setUtilityBills] = useState<number>(8000);
  const [maintenanceCosts, setMaintenanceCosts] = useState<number>(5000);
  const [internetCosts, setInternet] = useState<number>(3000);
  const [parkingCosts, setParking] = useState<number>(2000);
  const [cleaningCosts, setCleaning] = useState<number>(4000);
  const [securityCosts, setSecurity] = useState<number>(6000);
  const [virtualOfficePackage, setVirtualOfficePackage] = useState<string>("company");

  // Virtual office package costs
  const virtualOfficePackages = {
    mailing: { cost: 499, name: "Mailing Address", features: ["Business Mailing Address", "Mail Forwarding"] },
    gst: { cost: 999, name: "GST Registration Plan", features: ["Business Address", "GST Registration Support", "Compliance Assistance"] },
    company: { cost: 1199, name: "Company Registration Plan", features: ["Business Address", "Company Registration Support", "GST Registration", "Legal Documentation"] }
  };

  const calculateTraditionalOfficeCosts = () => {
    const monthlyCost = currentOfficeRent + utilityBills + maintenanceCosts + internetCosts + parkingCosts + cleaningCosts + securityCosts;
    return {
      monthly: monthlyCost,
      annual: monthlyCost * 12
    };
  };

  const calculateVirtualOfficeCosts = () => {
    const selectedPackage = virtualOfficePackages[virtualOfficePackage as keyof typeof virtualOfficePackages];
    return {
      monthly: selectedPackage.cost,
      annual: selectedPackage.cost * 12
    };
  };

  const calculateSavings = () => {
    const traditional = calculateTraditionalOfficeCosts();
    const virtual = calculateVirtualOfficeCosts();
    
    return {
      monthly: traditional.monthly - virtual.monthly,
      annual: traditional.annual - virtual.annual
    };
  };

  const calculateROI = () => {
    const savings = calculateSavings();
    const virtualCosts = calculateVirtualOfficeCosts();
    
    return {
      monthly: ((savings.monthly / virtualCosts.monthly) * 100),
      annual: ((savings.annual / virtualCosts.annual) * 100)
    };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const traditionalCosts = calculateTraditionalOfficeCosts();
  const virtualCosts = calculateVirtualOfficeCosts();
  const savings = calculateSavings();
  const roi = calculateROI();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Virtual Office ROI Calculator - Compare Traditional vs Virtual Office Costs | SimplySetup</title>
        <meta name="description" content="Calculate ROI of virtual office vs traditional office space. Compare costs, savings, and return on investment for your business in India." />
        <meta name="keywords" content="virtual office ROI calculator, office cost comparison, virtual office savings, traditional office vs virtual office, office space ROI, business cost calculator, virtual office benefits calculator" />
        <link rel="canonical" href="https://simplysetup.co/calculators/roi" />
        
        <meta property="og:title" content="Virtual Office ROI Calculator - Calculate Your Office Savings" />
        <meta property="og:description" content="Compare traditional office costs vs virtual office solutions. Calculate potential savings and ROI for your business." />
        <meta property="og:url" content="https://simplysetup.co/calculators/roi" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Virtual Office ROI Calculator",
            "description": "Calculate return on investment for virtual office vs traditional office space",
            "url": "https://simplysetup.co/calculators/roi",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            }
          })}
        </script>
      </Helmet>
      <Navbar />
      
      {/* Header */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/calculators">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Calculators
              </Link>
            </Button>
          </div>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Virtual Office ROI Calculator</h1>
                <p className="text-gray-600">Calculate your return on investment from switching to a virtual office</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Details */}
            <Card>
              <CardHeader>
                <CardTitle>Business Details</CardTitle>
                <CardDescription>Tell us about your current business setup</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="company-name">Company Name (Optional)</Label>
                  <Input
                    id="company-name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter your company name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="business-type">Business Type</Label>
                  <Select value={businessType} onValueChange={setBusinessType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">Startup</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="tech">Technology Company</SelectItem>
                      <SelectItem value="services">Service Business</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="team-size">Team Size</Label>
                  <Input
                    id="team-size"
                    type="number"
                    value={teamSize}
                    onChange={(e) => setTeamSize(parseInt(e.target.value) || 0)}
                    min="1"
                    max="100"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Current Office Costs */}
            <Card>
              <CardHeader>
                <CardTitle>Current Office Expenses (Monthly)</CardTitle>
                <CardDescription>Enter your current traditional office costs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="office-rent">Office Rent</Label>
                  <Input
                    id="office-rent"
                    type="number"
                    value={currentOfficeRent}
                    onChange={(e) => setCurrentOfficeRent(parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="utilities">Utility Bills (Electricity, Water, Gas)</Label>
                  <Input
                    id="utilities"
                    type="number"
                    value={utilityBills}
                    onChange={(e) => setUtilityBills(parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="maintenance">Maintenance & Repairs</Label>
                  <Input
                    id="maintenance"
                    type="number"
                    value={maintenanceCosts}
                    onChange={(e) => setMaintenanceCosts(parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="internet">Internet & Communication</Label>
                  <Input
                    id="internet"
                    type="number"
                    value={internetCosts}
                    onChange={(e) => setInternet(parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="parking">Parking Charges</Label>
                  <Input
                    id="parking"
                    type="number"
                    value={parkingCosts}
                    onChange={(e) => setParking(parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="cleaning">Cleaning Services</Label>
                  <Input
                    id="cleaning"
                    type="number"
                    value={cleaningCosts}
                    onChange={(e) => setCleaning(parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="security">Security Services</Label>
                  <Input
                    id="security"
                    type="number"
                    value={securityCosts}
                    onChange={(e) => setSecurity(parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Virtual Office Package Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Virtual Office Package</CardTitle>
                <CardDescription>Choose the virtual office package that fits your needs</CardDescription>
              </CardHeader>
              <CardContent className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                  {Object.entries(virtualOfficePackages).map(([key, pkg]) => (
                    <div 
                      key={key}
                      className={`border rounded-lg p-4 cursor-pointer transition-all min-h-[280px] ${
                        virtualOfficePackage === key 
                          ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setVirtualOfficePackage(key)}
                    >
                      <div className="text-center mb-4">
                        <input
                          type="radio"
                          checked={virtualOfficePackage === key}
                          onChange={() => setVirtualOfficePackage(key)}
                          className="h-4 w-4 text-primary mb-3"
                        />
                        <h4 className="font-bold text-lg mb-2 break-words">{pkg.name}</h4>
                        <p className="text-2xl font-bold text-primary break-words">₹{pkg.cost}/month</p>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2 flex-shrink-0">•</span>
                            <span className="break-words">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Cost Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    {companyName ? `${companyName} ROI Analysis` : "ROI Analysis"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Monthly Comparison */}
                  <div>
                    <h3 className="font-semibold mb-3">Monthly Costs</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Traditional Office</span>
                        <span className="font-medium text-red-600">{formatCurrency(traditionalCosts.monthly)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Virtual Office</span>
                        <span className="font-medium text-green-600">{formatCurrency(virtualCosts.monthly)}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Savings */}
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Monthly Savings</div>
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(savings.monthly)}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Annual Savings</div>
                    <div className="text-3xl font-bold text-green-600">
                      {formatCurrency(savings.annual)}
                    </div>
                  </div>

                  <Separator />

                  {/* ROI */}
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">ROI (Return on Investment)</div>
                    <div className="text-2xl font-bold text-primary">
                      {roi.annual.toFixed(0)}%
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      For every ₹1 spent on virtual office, you save ₹{(roi.annual/100).toFixed(2)}
                    </p>
                  </div>

                  <Separator />

                  {/* Payback Period */}
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Payback Period</div>
                    <div className="text-lg font-bold text-blue-600">
                      {virtualCosts.monthly > 0 ? Math.ceil(virtualCosts.monthly / savings.monthly) : 0} months
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <Button className="w-full" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download ROI Report
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Analysis
                  </Button>
                  
                  <Separator />
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Ready to make the switch?</p>
                    <Button asChild className="w-full">
                      <Link href="/contact">
                        Get Virtual Office Quote
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Key Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Key Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li>• Reduce overhead costs by up to 80%</li>
                    <li>• Professional business address</li>
                    <li>• Flexible work arrangements</li>
                    <li>• No long-term lease commitments</li>
                    <li>• Access to meeting rooms when needed</li>
                    <li>• Professional call handling</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer location={null} />
    </div>
  );
}