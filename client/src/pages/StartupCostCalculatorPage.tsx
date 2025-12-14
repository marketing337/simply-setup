import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Calculator, Download, Share2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

interface CostCategory {
  name: string;
  items: {
    name: string;
    cost: number;
    required: boolean;
    description: string;
  }[];
}

export default function StartupCostCalculatorPage() {
  const [businessType, setBusinessType] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [customCosts, setCustomCosts] = useState<{ name: string; cost: number }[]>([]);
  const [selectedCosts, setSelectedCosts] = useState<Record<string, boolean>>({});
  const [customItemCosts, setCustomItemCosts] = useState<Record<string, number>>({});

  // Predefined cost categories
  const costCategories: CostCategory[] = [
    {
      name: "Legal & Registration",
      items: [
        { name: "Company Registration", cost: 15000, required: true, description: "ROC filing and incorporation fees" },
        { name: "GST Registration", cost: 0, required: true, description: "Free GST registration online" },
        { name: "PAN Card", cost: 110, required: true, description: "Company PAN application" },
        { name: "TAN Registration", cost: 0, required: true, description: "Tax deduction account number" },
        { name: "Legal Consultation", cost: 25000, required: false, description: "Initial legal advice and documentation" },
        { name: "Trademark Registration", cost: 9000, required: false, description: "Brand protection and trademark filing" }
      ]
    },
    {
      name: "Virtual Office Setup",
      items: [
        { name: "Virtual Office Address", cost: 3000, required: true, description: "Monthly virtual office rental (premium location)" },
        { name: "Mail Handling Service", cost: 1500, required: false, description: "Monthly mail forwarding and management" },
        { name: "Phone Answering Service", cost: 2000, required: false, description: "Professional call handling service" },
        { name: "Meeting Room Access", cost: 2500, required: false, description: "Monthly meeting room booking credits" }
      ]
    },
    {
      name: "Banking & Finance",
      items: [
        { name: "Current Account Opening", cost: 5000, required: true, description: "Business current account setup" },
        { name: "Digital Banking Setup", cost: 1000, required: false, description: "Online banking and payment gateway" },
        { name: "Accounting Software", cost: 2000, required: true, description: "Monthly subscription for accounting tools" },
        { name: "Insurance Premium", cost: 15000, required: false, description: "Business liability and asset insurance" }
      ]
    },
    {
      name: "Technology & Operations",
      items: [
        { name: "Website Development", cost: 50000, required: false, description: "Professional website design and development" },
        { name: "Domain & Hosting", cost: 5000, required: false, description: "Annual domain registration and web hosting" },
        { name: "Business Email Setup", cost: 3600, required: false, description: "Professional email accounts (annual)" },
        { name: "Office Software Licenses", cost: 8000, required: false, description: "MS Office, Adobe, or similar software" }
      ]
    },
    {
      name: "Marketing & Branding",
      items: [
        { name: "Logo & Brand Design", cost: 15000, required: false, description: "Professional logo and brand identity" },
        { name: "Business Cards & Stationery", cost: 5000, required: false, description: "Printed marketing materials" },
        { name: "Digital Marketing Setup", cost: 20000, required: false, description: "Initial marketing campaigns and setup" },
        { name: "Social Media Setup", cost: 8000, required: false, description: "Professional social media account setup" }
      ]
    }
  ];

  // Initialize selected costs with required items
  useEffect(() => {
    const initialSelected: Record<string, boolean> = {};
    costCategories.forEach(category => {
      category.items.forEach(item => {
        const key = `${category.name}-${item.name}`;
        if (item.required) {
          initialSelected[key] = true;
        }
      });
    });
    setSelectedCosts(initialSelected);
  }, []);

  const toggleCostItem = (categoryName: string, itemName: string) => {
    const key = `${categoryName}-${itemName}`;
    const item = costCategories
      .find(cat => cat.name === categoryName)
      ?.items.find(item => item.name === itemName);
    
    if (item?.required) return; // Can't toggle required items
    
    setSelectedCosts(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const updateCustomCost = (categoryName: string, itemName: string, newCost: number) => {
    const key = `${categoryName}-${itemName}`;
    setCustomItemCosts(prev => ({
      ...prev,
      [key]: newCost
    }));
  };

  const addCustomCost = () => {
    setCustomCosts(prev => [...prev, { name: "", cost: 0 }]);
  };

  const updateCustomCostItem = (index: number, field: "name" | "cost", value: string | number) => {
    setCustomCosts(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const removeCustomCost = (index: number) => {
    setCustomCosts(prev => prev.filter((_, i) => i !== index));
  };

  // Calculate totals
  const calculateTotal = () => {
    let total = 0;
    
    // Add selected predefined costs
    costCategories.forEach(category => {
      category.items.forEach(item => {
        const key = `${category.name}-${item.name}`;
        if (selectedCosts[key]) {
          const customCost = customItemCosts[key];
          total += customCost !== undefined ? customCost : item.cost;
        }
      });
    });
    
    // Add custom costs
    customCosts.forEach(item => {
      if (item.name && item.cost > 0) {
        total += item.cost;
      }
    });
    
    return total;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const totalCost = calculateTotal();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Startup Cost Calculator - Calculate Business Setup Costs in India | SimplySetup</title>
        <meta name="description" content="Free startup cost calculator to estimate total business setup costs in India. Calculate legal fees, virtual office costs, registration expenses and more." />
        <meta name="keywords" content="startup cost calculator, business setup cost, company registration cost, virtual office cost, startup expenses calculator, business startup budget, GST registration cost, legal fees calculator" />
        <link rel="canonical" href="https://simplysetup.com/calculators/startup-cost" />
        
        <meta property="og:title" content="Startup Cost Calculator - Estimate Your Business Setup Costs" />
        <meta property="og:description" content="Calculate total startup costs including registration, legal fees, virtual office, and operational expenses. Free calculator for Indian businesses." />
        <meta property="og:url" content="https://simplysetup.com/calculators/startup-cost" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Startup Cost Calculator",
            "description": "Calculate total business startup costs including legal, registration, and operational expenses",
            "url": "https://simplysetup.com/calculators/startup-cost",
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
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                <Calculator className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Cost to Startup Calculator</h1>
                <p className="text-gray-600">Calculate the total investment needed to start your business in India</p>
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
                <CardDescription>Tell us about your business to get personalized estimates</CardDescription>
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
                      <SelectItem value="tech-startup">Tech Startup</SelectItem>
                      <SelectItem value="consulting">Consulting Services</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="retail">Retail Business</SelectItem>
                      <SelectItem value="services">Service Business</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Cost Categories */}
            {costCategories.map((category) => (
              <Card key={category.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.items.map((item) => {
                      const key = `${category.name}-${item.name}`;
                      const isSelected = selectedCosts[key];
                      const customCost = customItemCosts[key];
                      const displayCost = customCost !== undefined ? customCost : item.cost;
                      
                      return (
                        <div key={item.name} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3 flex-1">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleCostItem(category.name, item.name)}
                              disabled={item.required}
                              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{item.name}</span>
                                {item.required && (
                                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Required</span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500">{item.description}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {isSelected && (
                              <Input
                                type="number"
                                value={displayCost}
                                onChange={(e) => updateCustomCost(category.name, item.name, parseInt(e.target.value) || 0)}
                                className="w-24 text-right"
                                min="0"
                              />
                            )}
                            {!isSelected && (
                              <span className="text-gray-400 w-24 text-right">{formatCurrency(item.cost)}</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Custom Costs */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Costs</CardTitle>
                <CardDescription>Add any specific costs not covered above</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {customCosts.map((cost, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Input
                        placeholder="Cost description"
                        value={cost.name}
                        onChange={(e) => updateCustomCostItem(index, "name", e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        placeholder="Amount"
                        value={cost.cost || ""}
                        onChange={(e) => updateCustomCostItem(index, "cost", parseInt(e.target.value) || 0)}
                        className="w-32"
                        min="0"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeCustomCost(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  
                  <Button
                    variant="outline"
                    onClick={addCustomCost}
                    className="w-full"
                  >
                    Add Custom Cost
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    {companyName ? `${companyName} Startup Costs` : "Startup Cost Summary"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cost Breakdown */}
                  <div className="space-y-2">
                    {costCategories.map((category) => {
                      const categoryTotal = category.items.reduce((sum, item) => {
                        const key = `${category.name}-${item.name}`;
                        if (selectedCosts[key]) {
                          const customCost = customItemCosts[key];
                          return sum + (customCost !== undefined ? customCost : item.cost);
                        }
                        return sum;
                      }, 0);
                      
                      if (categoryTotal === 0) return null;
                      
                      return (
                        <div key={category.name} className="flex justify-between text-sm">
                          <span className="text-gray-600">{category.name}</span>
                          <span className="font-medium">{formatCurrency(categoryTotal)}</span>
                        </div>
                      );
                    })}
                    
                    {customCosts.some(cost => cost.name && cost.cost > 0) && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Additional Costs</span>
                        <span className="font-medium">
                          {formatCurrency(customCosts.reduce((sum, cost) => sum + (cost.cost || 0), 0))}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  {/* Total */}
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Total Startup Cost</div>
                    <div className="text-3xl font-bold text-primary">
                      {formatCurrency(totalCost)}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Quick Tips */}
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• These are estimated costs and may vary based on location and specific requirements</p>
                    <p>• Consider keeping 20-30% additional budget for unexpected expenses</p>
                    <p>• Virtual office solutions can significantly reduce initial investment</p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="space-y-2 pt-4">
                    <Button className="w-full" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Results
                    </Button>
                  </div>
                  
                  {/* CTA */}
                  <div className="text-center pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-2">Ready to start your business?</p>
                    <Button asChild className="w-full">
                      <Link href="/contact">
                        Get Virtual Office Quote
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