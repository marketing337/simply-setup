import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Building2, 
  Users, 
  FileText, 
  Globe, 
  Briefcase, 
  Target,
  MapPin,
  ArrowRight,
  Check,
  Calculator,
  CreditCard
} from "lucide-react";
import { useComplyAuth } from "@/hooks/useComplyAuth";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { apiRequest } from "@/lib/queryClient";

interface BusinessType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  popular?: boolean;
}

interface Purpose {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  pricing?: string;
}

const businessTypes: BusinessType[] = [
  {
    id: "startup",
    name: "Startup",
    description: "Early stage business with innovative ideas",
    icon: <Target className="h-6 w-6" />,
    popular: true
  },
  {
    id: "pvt_ltd",
    name: "Private Limited Company",
    description: "Established company with multiple shareholders",
    icon: <Building2 className="h-6 w-6" />,
    popular: true
  },
  {
    id: "sole_proprietorship",
    name: "Sole Proprietorship",
    description: "Individual business owner",
    icon: <Users className="h-6 w-6" />
  },
  {
    id: "partnership",
    name: "Partnership",
    description: "Business owned by two or more partners",
    icon: <Briefcase className="h-6 w-6" />
  },
  {
    id: "llp",
    name: "Limited Liability Partnership",
    description: "Partnership with limited liability protection",
    icon: <Globe className="h-6 w-6" />
  },
  {
    id: "freelancer",
    name: "Freelancer/Consultant",
    description: "Independent professional services",
    icon: <FileText className="h-6 w-6" />
  }
];

const purposes: Purpose[] = [
  {
    id: "gst_registration",
    name: "GST Registration",
    description: "Get your business registered for GST compliance",
    icon: <FileText className="h-6 w-6" />,
    pricing: "₹2,999"
  },
  {
    id: "company_registration",
    name: "Company Registration",
    description: "Register your company with ROC",
    icon: <Building2 className="h-6 w-6" />,
    pricing: "₹8,999"
  },
  {
    id: "business_address",
    name: "Business Address",
    description: "Professional address for your business",
    icon: <MapPin className="h-6 w-6" />,
    pricing: "₹1,999/month"
  },
  {
    id: "mail_handling",
    name: "Mail Handling",
    description: "Receive and forward business mail",
    icon: <Globe className="h-6 w-6" />,
    pricing: "₹999/month"
  },
  {
    id: "phone_number",
    name: "Business Phone",
    description: "Dedicated business phone number",
    icon: <Users className="h-6 w-6" />,
    pricing: "₹799/month"
  },
  {
    id: "meeting_rooms",
    name: "Meeting Rooms",
    description: "Access to professional meeting spaces",
    icon: <Briefcase className="h-6 w-6" />,
    pricing: "₹500/hour"
  }
];

export default function CustomerOnboarding() {
  const { user } = useComplyAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>("");
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);

  // Fetch locations for city selection
  const { data: locations = [] } = useQuery({
    queryKey: ["/api/locations"],
  });

  // Generate quotes mutation
  const generateQuotesMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("/api/quotes/generate", "POST", data);
    },
    onSuccess: (data: any) => {
      setQuotes(data?.quotes || []);
      setCurrentStep(4);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate quotes. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleBusinessTypeSelect = (typeId: string) => {
    setSelectedBusinessType(typeId);
  };

  const handlePurposeToggle = (purposeId: string) => {
    setSelectedPurposes(prev => 
      prev.includes(purposeId) 
        ? prev.filter(id => id !== purposeId)
        : [...prev, purposeId]
    );
  };

  const handleCityToggle = (cityId: string) => {
    setSelectedCities(prev => 
      prev.includes(cityId) 
        ? prev.filter(id => id !== cityId)
        : [...prev, cityId]
    );
  };

  const handleNext = () => {
    if (currentStep === 1 && selectedBusinessType) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedPurposes.length > 0) {
      setCurrentStep(3);
    } else if (currentStep === 3 && selectedCities.length > 0) {
      // Generate quotes
      generateQuotesMutation.mutate({
        businessType: selectedBusinessType,
        purposes: selectedPurposes,
        cities: selectedCities,
        customerId: user?.id
      });
    }
  };

  const handleSkipOnboarding = () => {
    setLocation("/customer/dashboard");
  };

  const handleCheckout = (quote: any) => {
    toast({
      title: "Redirecting to checkout",
      description: "Taking you to secure payment...",
    });
    // TODO: Implement actual checkout flow
    setTimeout(() => {
      setLocation("/customer/dashboard");
    }, 1500);
  };

  const progress = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to Virtual Offices</h1>
            <p className="text-gray-600 mt-2">Let's set up your virtual office in just a few steps</p>
            <Progress value={progress} className="w-full mt-4 max-w-md mx-auto" />
            <p className="text-sm text-gray-500 mt-2">Step {currentStep} of 4</p>
          </div>

          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  What type of business are you starting?
                </CardTitle>
                <CardDescription>
                  This helps us recommend the best virtual office package for you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {businessTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedBusinessType === type.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleBusinessTypeSelect(type.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-blue-600 mt-1">{type.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{type.name}</h3>
                            {type.popular && (
                              <Badge variant="secondary" className="text-xs">Popular</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                        </div>
                        {selectedBusinessType === type.id && (
                          <Check className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handleSkipOnboarding}>
                    Skip for now
                  </Button>
                  <Button 
                    onClick={handleNext} 
                    disabled={!selectedBusinessType}
                    className="flex items-center gap-2"
                  >
                    Next Step <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  What services do you need?
                </CardTitle>
                <CardDescription>
                  Select all services you're interested in (you can change this later)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {purposes.map((purpose) => (
                    <div
                      key={purpose.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedPurposes.includes(purpose.id)
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handlePurposeToggle(purpose.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedPurposes.includes(purpose.id)}
                          onChange={() => handlePurposeToggle(purpose.id)}
                        />
                        <div className="text-blue-600 mt-1">{purpose.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{purpose.name}</h3>
                            {purpose.pricing && (
                              <Badge variant="outline">{purpose.pricing}</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{purpose.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button 
                    onClick={handleNext} 
                    disabled={selectedPurposes.length === 0}
                    className="flex items-center gap-2"
                  >
                    Next Step <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Which cities do you need virtual offices in?
                </CardTitle>
                <CardDescription>
                  Select one or more cities where you want to establish your business presence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {(locations as any[]).map((location: any) => (
                    <div
                      key={location.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md text-center ${
                        selectedCities.includes(location.id.toString())
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleCityToggle(location.id.toString())}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{location.name}</span>
                        {selectedCities.includes(location.id.toString()) && (
                          <Check className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Back
                  </Button>
                  <Button 
                    onClick={handleNext} 
                    disabled={selectedCities.length === 0 || generateQuotesMutation.isPending}
                    className="flex items-center gap-2"
                  >
                    {generateQuotesMutation.isPending ? (
                      "Generating Quotes..."
                    ) : (
                      <>Get Quotes <Calculator className="h-4 w-4" /></>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Your Instant Quotes
                </CardTitle>
                <CardDescription>
                  Based on your selections, here are your personalized packages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quotes.length > 0 ? (
                    quotes.map((quote, index) => (
                      <div key={index} className="border rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold">{quote.packageName}</h3>
                            <p className="text-gray-600">{quote.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">
                              ₹{quote.totalPrice?.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-500">{quote.billingCycle}</div>
                          </div>
                        </div>
                        <div className="space-y-2 mb-4">
                          {quote.services?.map((service: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-600" />
                              <span className="text-sm">{service.name}</span>
                            </div>
                          ))}
                        </div>
                        <Button 
                          onClick={() => handleCheckout(quote)}
                          className="w-full"
                          size="lg"
                        >
                          Get Started - ₹{quote.totalPrice?.toLocaleString()}
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="border rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-2">Virtual Office Basic Package</h3>
                        <p className="text-gray-600 mb-4">Perfect starter package for your business</p>
                        <div className="text-2xl font-bold text-blue-600 mb-4">₹1,999/month</div>
                        <div className="space-y-2 mb-6 text-left">
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Professional business address</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Mail handling and forwarding</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="text-sm">GST registration support</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Dedicated phone number</span>
                          </div>
                        </div>
                        <Button 
                          onClick={() => handleCheckout({ packageName: "Basic", totalPrice: 1999 })}
                          className="w-full"
                          size="lg"
                        >
                          Get Started - ₹1,999/month
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setCurrentStep(3)}>
                    Back to Cities
                  </Button>
                  <Button variant="outline" onClick={handleSkipOnboarding}>
                    Skip to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <Footer location={{ id: 0, name: "", slug: "", description: "", countryCode: "IN", heroImage: null, officeImage: null, mainAddress: "", phoneNumber: "", email: "", vernacularSalutation: null, vernacularName: null, vernacularDescription: null, countryName: "India" }} />
    </div>
  );
}