import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, PieChart, Download, Share2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

export default function BusinessSavingsCalculatorPage() {
  const [companyName, setCompanyName] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [employeeCount, setEmployeeCount] = useState<number>(10);
  const [currentOfficeSize, setCurrentOfficeSize] = useState<number>(2000);
  const [officeRentPerSqFt, setOfficeRentPerSqFt] = useState<number>(50);
  const [utilityBills, setUtilityBills] = useState<number>(15000);
  const [internetCosts, setInternetCosts] = useState<number>(5000);
  const [cleaningCosts, setCleaningCosts] = useState<number>(8000);
  const [securityCosts, setSecurityCosts] = useState<number>(10000);
  const [maintenanceCosts, setMaintenanceCosts] = useState<number>(12000);
  const [parkingCosts, setParkingCosts] = useState<number>(5000);
  const [receptionistCosts, setReceptionistCosts] = useState<number>(25000);
  const [officeFurniture, setOfficeFurniture] = useState<number>(100000);
  const [equipmentCosts, setEquipmentCosts] = useState<number>(75000);
  const [remoteWorkPercentage, setRemoteWorkPercentage] = useState<number[]>([80]);

  // Virtual office costs
  const virtualOfficeCost = 15000; // Hybrid solution cost
  const meetingRoomUsage = 5; // Times per month
  const meetingRoomCost = 2000; // Per usage

  const calculateTraditionalOfficeCosts = () => {
    const monthlyRent = currentOfficeSize * officeRentPerSqFt;
    const monthlyOperational = utilityBills + internetCosts + cleaningCosts + securityCosts + maintenanceCosts + parkingCosts + receptionistCosts;
    const oneTimeSetup = officeFurniture + equipmentCosts;
    
    return {
      monthlyRent,
      monthlyOperational,
      monthlyTotal: monthlyRent + monthlyOperational,
      annualTotal: (monthlyRent + monthlyOperational) * 12,
      oneTimeSetup,
      totalFirstYear: (monthlyRent + monthlyOperational) * 12 + oneTimeSetup
    };
  };

  const calculateHybridOfficeCosts = () => {
    const remotePercent = remoteWorkPercentage[0] / 100;
    const officeUsage = 1 - remotePercent;
    
    // Reduced office space needed
    const reducedOfficeSize = currentOfficeSize * officeUsage;
    const monthlyRent = reducedOfficeSize * officeRentPerSqFt;
    
    // Reduced operational costs
    const reducedOperational = (utilityBills + cleaningCosts + securityCosts + maintenanceCosts) * officeUsage;
    const fixedCosts = internetCosts + parkingCosts; // Some costs remain fixed
    
    // Virtual office solution
    const virtualOffice = virtualOfficeCost;
    
    // Meeting rooms for collaboration
    const meetingRooms = meetingRoomUsage * meetingRoomCost;
    
    const monthlyTotal = monthlyRent + reducedOperational + fixedCosts + virtualOffice + meetingRooms;
    
    return {
      monthlyRent,
      reducedOperational,
      virtualOffice,
      meetingRooms,
      monthlyTotal,
      annualTotal: monthlyTotal * 12,
      oneTimeSetup: (officeFurniture + equipmentCosts) * officeUsage,
      totalFirstYear: monthlyTotal * 12 + (officeFurniture + equipmentCosts) * officeUsage
    };
  };

  const calculateSavings = () => {
    const traditional = calculateTraditionalOfficeCosts();
    const hybrid = calculateHybridOfficeCosts();
    
    return {
      monthly: traditional.monthlyTotal - hybrid.monthlyTotal,
      annual: traditional.annualTotal - hybrid.annualTotal,
      setupSavings: traditional.oneTimeSetup - hybrid.oneTimeSetup,
      firstYearSavings: traditional.totalFirstYear - hybrid.totalFirstYear,
      savingsPercentage: ((traditional.annualTotal - hybrid.annualTotal) / traditional.annualTotal) * 100
    };
  };

  const calculateProductivityGains = () => {
    const remotePercent = remoteWorkPercentage[0] / 100;
    
    // Estimated productivity improvements
    const reducedCommute = employeeCount * 2 * 22 * remotePercent; // 2 hours saved per day, 22 working days
    const focusTime = reducedCommute * 0.5; // 50% of saved time becomes productive work
    const monthlyProductiveHours = focusTime;
    
    // Assume average hourly rate of ₹500 for knowledge workers
    const hourlyRate = 500;
    const monthlyProductivityValue = monthlyProductiveHours * hourlyRate;
    
    return {
      hourseSavedPerMonth: reducedCommute,
      additionalProductiveHours: focusTime,
      monthlyProductivityValue,
      annualProductivityValue: monthlyProductivityValue * 12
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
  const hybridCosts = calculateHybridOfficeCosts();
  const savings = calculateSavings();
  const productivityGains = calculateProductivityGains();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Business Savings Calculator - Calculate Hybrid Work & Virtual Office Savings | SimplySetup</title>
        <meta name="description" content="Calculate potential business savings from hybrid work models and virtual office solutions. Estimate cost reductions and productivity gains for your company." />
        <meta name="keywords" content="business savings calculator, hybrid work savings, virtual office savings, overhead cost calculator, remote work cost savings, office expense reduction, productivity gains calculator" />
        <link rel="canonical" href="https://simplysetup.com/calculators/savings" />
        
        <meta property="og:title" content="Business Savings Calculator - Hybrid Work & Virtual Office Savings" />
        <meta property="og:description" content="Calculate potential savings from adopting hybrid work models and virtual office solutions. Free calculator for businesses in India." />
        <meta property="og:url" content="https://simplysetup.com/calculators/savings" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Business Savings Calculator",
            "description": "Calculate potential savings from hybrid work models and virtual office solutions",
            "url": "https://simplysetup.com/calculators/savings",
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
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                <PieChart className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Business Savings Calculator</h1>
                <p className="text-gray-600">Calculate potential savings from adopting hybrid work and virtual office solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Information */}
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Tell us about your business to get accurate savings estimates</CardDescription>
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
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="finance">Finance & Banking</SelectItem>
                      <SelectItem value="marketing">Marketing & Advertising</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="employee-count">Number of Employees</Label>
                  <Input
                    id="employee-count"
                    type="number"
                    value={employeeCount}
                    onChange={(e) => setEmployeeCount(parseInt(e.target.value) || 0)}
                    min="1"
                    max="500"
                  />
                </div>

                <div>
                  <Label>Remote Work Percentage: {remoteWorkPercentage[0]}%</Label>
                  <div className="px-2 py-4">
                    <Slider
                      value={remoteWorkPercentage}
                      onValueChange={setRemoteWorkPercentage}
                      max={100}
                      min={0}
                      step={10}
                      className="w-full"
                    />
                  </div>
                  <p className="text-sm text-gray-500">How much of your work can be done remotely?</p>
                </div>
              </CardContent>
            </Card>

            {/* Current Office Costs */}
            <Card>
              <CardHeader>
                <CardTitle>Current Office Setup</CardTitle>
                <CardDescription>Enter details about your current office space and costs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="office-size">Office Size (sq ft)</Label>
                    <Input
                      id="office-size"
                      type="number"
                      value={currentOfficeSize}
                      onChange={(e) => setCurrentOfficeSize(parseInt(e.target.value) || 0)}
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="rent-per-sqft">Rent per sq ft (₹/month)</Label>
                    <Input
                      id="rent-per-sqft"
                      type="number"
                      value={officeRentPerSqFt}
                      onChange={(e) => setOfficeRentPerSqFt(parseInt(e.target.value) || 0)}
                      min="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="utilities">Utility Bills (₹/month)</Label>
                    <Input
                      id="utilities"
                      type="number"
                      value={utilityBills}
                      onChange={(e) => setUtilityBills(parseInt(e.target.value) || 0)}
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="internet">Internet & Communication (₹/month)</Label>
                    <Input
                      id="internet"
                      type="number"
                      value={internetCosts}
                      onChange={(e) => setInternetCosts(parseInt(e.target.value) || 0)}
                      min="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cleaning">Cleaning Services (₹/month)</Label>
                    <Input
                      id="cleaning"
                      type="number"
                      value={cleaningCosts}
                      onChange={(e) => setCleaningCosts(parseInt(e.target.value) || 0)}
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="security">Security Services (₹/month)</Label>
                    <Input
                      id="security"
                      type="number"
                      value={securityCosts}
                      onChange={(e) => setSecurityCosts(parseInt(e.target.value) || 0)}
                      min="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maintenance">Maintenance (₹/month)</Label>
                    <Input
                      id="maintenance"
                      type="number"
                      value={maintenanceCosts}
                      onChange={(e) => setMaintenanceCosts(parseInt(e.target.value) || 0)}
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="parking">Parking (₹/month)</Label>
                    <Input
                      id="parking"
                      type="number"
                      value={parkingCosts}
                      onChange={(e) => setParkingCosts(parseInt(e.target.value) || 0)}
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="receptionist">Receptionist/Admin Staff (₹/month)</Label>
                  <Input
                    id="receptionist"
                    type="number"
                    value={receptionistCosts}
                    onChange={(e) => setReceptionistCosts(parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="furniture">Office Furniture (One-time)</Label>
                    <Input
                      id="furniture"
                      type="number"
                      value={officeFurniture}
                      onChange={(e) => setOfficeFurniture(parseInt(e.target.value) || 0)}
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="equipment">Equipment & Tech (One-time)</Label>
                    <Input
                      id="equipment"
                      type="number"
                      value={equipmentCosts}
                      onChange={(e) => setEquipmentCosts(parseInt(e.target.value) || 0)}
                      min="0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Savings Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    {companyName ? `${companyName} Savings Analysis` : "Savings Analysis"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Monthly Comparison */}
                  <div>
                    <h3 className="font-semibold mb-3">Monthly Costs</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Traditional Office</span>
                        <span className="font-medium">{formatCurrency(traditionalCosts.monthlyTotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hybrid Solution</span>
                        <span className="font-medium">{formatCurrency(hybridCosts.monthlyTotal)}</span>
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

                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Savings Percentage</div>
                    <div className="text-xl font-bold text-purple-600">
                      {savings.savingsPercentage.toFixed(1)}%
                    </div>
                  </div>

                  <Separator />

                  {/* Productivity Gains */}
                  <div>
                    <h3 className="font-semibold mb-2">Productivity Gains</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hours Saved/Month</span>
                        <span className="font-medium">{productivityGains.hourseSavedPerMonth.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Productivity Value</span>
                        <span className="font-medium text-blue-600">{formatCurrency(productivityGains.annualProductivityValue)}/year</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Total Impact */}
                  <div className="text-center bg-green-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Total Annual Impact</div>
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(savings.annual + productivityGains.annualProductivityValue)}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cost Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Hybrid Solution Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Reduced Office Rent</span>
                    <span>{formatCurrency(hybridCosts.monthlyRent)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Virtual Office Solution</span>
                    <span>{formatCurrency(hybridCosts.virtualOffice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Meeting Rooms</span>
                    <span>{formatCurrency(hybridCosts.meetingRooms)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <Button className="w-full" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download Savings Report
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Analysis
                  </Button>
                  
                  <Separator />
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Start saving today!</p>
                    <Button asChild className="w-full">
                      <Link href="/contact">
                        Get Hybrid Office Solution
                      </Link>
                    </Button>
                  </div>
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