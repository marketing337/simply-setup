import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { MapPin, Star, CreditCard, CheckCircle, Check } from "lucide-react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VirtualOfficeComparison from "@/components/VirtualOfficeComparison";

declare global {
  interface Window {
    Razorpay: any;
    loadRazorpay: () => Promise<any>;
  }
}

// Types
interface Location {
  id: number;
  name: string;
  slug: string;
}

interface PricingCatalog {
  id: number;
  locationId: number;
  serviceName: string;
  serviceDescription: string;
  price: string;
  currency: string;
  duration: string;
  features: string[];
  isActive: boolean;
}

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  company: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function ThankYouPage() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [selectedService, setSelectedService] = useState<PricingCatalog | null>(
    null,
  );
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showStickyProgress, setShowStickyProgress] = useState(false);
  const { toast } = useToast();
  const currentLocation = null;

  // Determine current step based on user progress
  const getCurrentStep = () => {
    if (!selectedLocation) return 1;
    if (!selectedService) return 2;
    if (isProcessingPayment) return 3;
    return selectedLocation && selectedService ? 3 : 1;
  };

  // Handle scroll to show/hide sticky progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const shouldShow = scrollPosition > 400; // Show after scrolling 400px
      setShowStickyProgress(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Form setup
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
    },
  });

  // Fetch locations
  const { data: locations, isLoading: locationsLoading } = useQuery({
    queryKey: ["/api/locations"],
  });

  // Fetch pricing catalog for selected location
  const { data: pricingCatalog, isLoading: catalogLoading } = useQuery({
    queryKey: [`/api/pricing-catalog/${selectedLocation?.id}`],
    enabled: !!selectedLocation?.id,
  });

  // Create order mutation
  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const response = await apiRequest(
        "POST",
        "/api/create-razorpay-order",
        orderData,
      );
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!selectedService || !selectedLocation) {
      toast({
        title: "Selection Required",
        description: "Please select a city and service package.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessingPayment(true);

    try {
      const orderData = {
        locationId: selectedLocation.id,
        pricingCatalogId: selectedService.id,
        customerName: data.name,
        customerEmail: data.email,
        customerPhone: data.phone,
        customerCompany: data.company || "",
        amount: parseFloat(selectedService.price),
        currency: selectedService.currency,
      };

      const result = await createOrderMutation.mutateAsync(orderData);

      const options = {
        key: result.keyId,
        amount: result.amount,
        currency: result.currency,
        name: "SimplySetup",
        description: `${selectedService.serviceName} - ${selectedLocation.name}`,
        order_id: result.razorpayOrderId,
        handler: async function (response: any) {
          try {
            console.log("Razorpay response:", response);
            const verifyResponse = await apiRequest(
              "POST",
              "/api/verify-payment",
              {
                razorpay_order_id:
                  response.razorpay_order_id || result.razorpayOrderId,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
            );

            if (verifyResponse.ok) {
              // Redirect to payment success page
              window.location.href = "/payment-success";
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (error) {
            toast({
              title: "Payment Verification Failed",
              description: "Please contact support with your payment details.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: "#3B82F6",
        },
      };

      // Ensure Razorpay script is loaded before creating instance
      try {
        if (!window.Razorpay) {
          await window.loadRazorpay();
        }
        
        if (!window.Razorpay) {
          throw new Error("Failed to load Razorpay payment gateway");
        }
        
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (razorpayError: any) {
        console.error("Razorpay loading error:", razorpayError);
        throw new Error("Payment gateway not available. Please try again or contact support.");
      }
    } catch (error: any) {
      toast({
        title: "Order Creation Failed",
        description:
          error.message || "Failed to create order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Render compact sticky progress bar
  const renderStickyProgress = () => {
    const currentStep = getCurrentStep();
    const steps = ["Select City", "Select Plan", "Make Payment", "Get Office"];
    
    return (
      <div className={`fixed top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-40 transition-transform duration-300 ${
        showStickyProgress ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              {steps.map((stepName, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted = stepNumber < currentStep;
                
                return (
                  <div key={index} className="flex items-center">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-colors ${
                          isActive
                            ? "bg-green-500 text-white"
                            : isCompleted
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {stepNumber}
                      </div>
                      <span className={`hidden sm:block text-xs sm:text-sm font-medium ${
                        isActive ? "text-green-700" : "text-gray-600"
                      }`}>
                        {stepName}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-4 sm:w-8 h-px mx-1 sm:mx-2 transition-colors ${
                        isCompleted ? "bg-green-200" : "bg-gray-200"
                      }`}></div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="text-xs text-gray-500">
              Step {currentStep} of 4
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Thank You | SimplySetup"
        description="Thank you for contacting SimplySetup. Complete your virtual office setup with our secure checkout."
      />
      <Navbar />
      {renderStickyProgress()}

      {/* Virtual Office Comparison Section */}
      <VirtualOfficeComparison />

      <main className={`max-w-6xl mx-auto px-4 py-8 sm:py-16 sm:px-6 lg:px-8 transition-all duration-300 ${
        showStickyProgress ? 'pt-20' : ''
      }`}>


        {/* Thank You Message */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-700 mb-2">Thank you for your interest!</p>
          <p className="text-gray-600">An expert advisor will reach out to you in a while.</p>
        </div>

        {/* How It Works Process */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-900">
            Complete Your Setup in 4 Simple Steps
          </h2>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-4 gap-6 mb-8">
            {[
              {
                step: 1,
                title: "Select City",
                description: "Choose your preferred business location",
              },
              {
                step: 2,
                title: "Select Plan",
                description: "Pick the service package that fits your needs",
              },
              {
                step: 3,
                title: "Make Payment",
                description: "Secure payment via Razorpay",
              },
              {
                step: 4,
                title: "Get Virtual Office",
                description: "Receive documents & start operating",
              },
            ].map((item, index) => {
              const currentStep = getCurrentStep();
              const isActive = item.step === currentStep;
              const isCompleted = item.step < currentStep;
              
              return (
                <div key={index} className="text-center relative">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-bold transition-colors ${
                      isActive
                        ? "bg-green-500 text-white"
                        : isCompleted
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {item.step}
                  </div>
                  <h3 className={`font-semibold mb-2 ${isActive ? "text-green-700" : "text-gray-900"}`}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  {index < 3 && (
                    <div className="absolute top-8 left-full w-full">
                      <div className={`w-full h-px relative transition-colors ${isCompleted ? "bg-green-200" : "bg-gray-200"}`}>
                        <div className={`absolute right-0 top-0 w-2 h-2 rounded-full transform translate-x-1 -translate-y-0.5 ${isCompleted ? "bg-green-200" : "bg-gray-200"}`}></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile/Tablet Slider */}
          <div className="lg:hidden">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 pb-4" style={{ width: "max-content" }}>
                {[
                  {
                    step: 1,
                    title: "Select City",
                    description: "Choose your preferred business location",
                  },
                  {
                    step: 2,
                    title: "Select Plan",
                    description: "Pick the service package that fits your needs",
                  },
                  {
                    step: 3,
                    title: "Make Payment",
                    description: "Secure payment via Razorpay",
                  },
                  {
                    step: 4,
                    title: "Get Virtual Office",
                    description: "Receive documents & start operating",
                  },
                ].map((item, index) => {
                  const currentStep = getCurrentStep();
                  const isActive = item.step === currentStep;
                  const isCompleted = item.step < currentStep;
                  
                  return (
                    <div key={index} className="text-center flex-shrink-0 w-48">
                      <div
                        className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center text-lg font-bold transition-colors ${
                          isActive
                            ? "bg-green-500 text-white"
                            : isCompleted
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {item.step}
                      </div>
                      <h3 className={`font-semibold mb-2 text-sm ${isActive ? "text-green-700" : "text-gray-900"}`}>
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((stepNum, index) => {
                  const currentStep = getCurrentStep();
                  const isActive = stepNum === currentStep;
                  const isCompleted = stepNum < currentStep;
                  
                  return (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        isActive ? "bg-green-500" : isCompleted ? "bg-green-300" : "bg-gray-300"
                      }`}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* City Selection */}
        <Card className="mb-6 sm:mb-8 border-2 border-green-200 bg-green-50/30">
          <CardHeader className="bg-green-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl text-green-800">
                  <MapPin className="h-6 w-6" />
                  Select Your City
                </CardTitle>
                <CardDescription className="text-green-600">
                  Choose where you want to establish your virtual office
                  presence. All locations offer premium business addresses.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Select
              disabled={locationsLoading}
              onValueChange={(value) => {
                const location = (locations as Location[])?.find(
                  (loc: Location) => loc.id.toString() === value,
                );
                setSelectedLocation(location || null);
                setSelectedService(null);
                // Scroll to service packages section after a brief delay
                setTimeout(() => {
                  const serviceSection = document.querySelector('[data-service-section]');
                  if (serviceSection) {
                    serviceSection.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }, 300);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    locationsLoading ? "Loading cities..." : "Select a city"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {(locations as Location[])?.map((location: Location) => (
                  <SelectItem key={location.id} value={location.id.toString()}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedLocation && (
              <div className="mt-4 p-4 bg-green-100 rounded-lg">
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">
                    Great choice! {selectedLocation.name} is selected for your
                    virtual office.
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Service Packages */}
        {selectedLocation && (
          <Card className="mb-6 sm:mb-8 border-2 border-blue-200 bg-blue-50/30" data-service-section>
            <CardHeader className="bg-blue-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl text-blue-800">
                    <Star className="h-6 w-6" />
                    Select Service Package
                  </CardTitle>
                  <CardDescription className="text-blue-600">
                    Choose the virtual office package for{" "}
                    {selectedLocation.name}. All packages include GST
                    registration and premium address.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {catalogLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
                </div>
              ) : (pricingCatalog as PricingCatalog[])?.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No services available for this city yet. Please contact
                  support.
                </div>
              ) : (
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                  {(pricingCatalog as PricingCatalog[])?.map(
                    (service: PricingCatalog, index) => (
                      <div
                        key={service.id}
                        className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                          selectedService?.id === service.id
                            ? "border-blue-500 bg-blue-50 shadow-lg transform scale-105"
                            : "border-gray-200 hover:border-blue-300 bg-white"
                        }`}
                        onClick={() => {
                        setSelectedService(service);
                        // Scroll to checkout section after a short delay
                        setTimeout(() => {
                          const checkoutSection = document.querySelector('[data-checkout-section]');
                          if (checkoutSection) {
                            checkoutSection.scrollIntoView({ 
                              behavior: 'smooth', 
                              block: 'start',
                              inline: 'nearest'
                            });
                          }
                        }, 300);
                      }}
                      >
                        <div className="flex flex-col h-full">
                          {/* Service Title */}
                          <div className="text-center mb-6">
                            <h3 className="font-bold text-xl mb-2 text-gray-900">
                              {service.serviceName}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {service.serviceDescription}
                            </p>
                          </div>

                          {/* Price */}
                          <div className="text-center mb-6">
                            <div className="flex items-baseline justify-center gap-1 mb-2">
                              <span className="text-4xl font-bold text-blue-600">
                                ₹
                                {parseFloat(service.price).toLocaleString(
                                  "en-IN",
                                )}
                              </span>
                              <span className="text-gray-500 text-sm">
                                /{service.duration}
                              </span>
                            </div>
                          </div>

                          {/* Features */}
                          {service.features?.length > 0 && (
                            <div className="space-y-3 flex-grow">
                              {service.features.map((feature, featureIndex) => (
                                <div
                                  key={featureIndex}
                                  className="flex items-start gap-3"
                                >
                                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Check className="h-3 w-3 text-green-600" />
                                  </div>
                                  <span className="text-sm text-gray-700 leading-relaxed">
                                    {feature}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Selection Indicator */}
                          <div className="mt-6 pt-4">
                            {selectedService?.id === service.id ? (
                              <div className="bg-blue-500 text-white py-3 px-4 rounded-lg text-center font-medium">
                                <div className="flex items-center justify-center gap-2">
                                  <Check className="h-4 w-4" />
                                  Selected
                                </div>
                              </div>
                            ) : (
                              <div className="border-2 border-gray-300 text-gray-600 py-3 px-4 rounded-lg text-center font-medium hover:border-blue-500 hover:text-blue-600 transition-colors">
                                Select Plan
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Customer Information & Checkout */}
        {selectedService && (
          <Card data-checkout-section>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <CreditCard className="h-5 w-5" />
                Complete Your Order
              </CardTitle>
              <CardDescription>
                Fill in your details to complete the purchase for{" "}
                {selectedService.serviceName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your email"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your phone number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter company name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Order Summary Section */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <h3 className="font-semibold text-lg mb-3">
                      Order Summary
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Service:</span>
                        <span className="font-medium">
                          {selectedService.serviceName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Location:</span>
                        <span className="font-medium">
                          {selectedLocation?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-medium">
                          {selectedService.duration}
                        </span>
                      </div>
                      <div className="border-t pt-2 mt-3">
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total Amount:</span>
                          <span className="text-primary">
                            ₹
                            {parseFloat(selectedService.price).toLocaleString(
                              "en-IN",
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isProcessingPayment}
                  >
                    {isProcessingPayment ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pay ₹
                        {parseFloat(selectedService.price).toLocaleString(
                          "en-IN",
                        )}{" "}
                        with Razorpay
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* Trust Indicators */}
        <div className="bg-blue-50 rounded-xl p-6 sm:p-8 mb-12">
          <h3 className="text-xl font-semibold text-center mb-6 text-gray-900">
            Why 10,000+ Businesses Trust SimplySetup
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">✓</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                GST / MCA Compliant
              </h4>
              <p className="text-sm text-gray-600">
                Fully compliant with Indian regulations
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">24h</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Quick Setup</h4>
              <p className="text-sm text-gray-600">
                Virtual office ready within 24 hours
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">🏆</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Premium Locations
              </h4>
              <p className="text-sm text-gray-600">
                Prime business addresses across India
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-gray-50 rounded-xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
            What Our Customers Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">{"★".repeat(5)}</div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "SimplySetup made it incredibly easy to establish our virtual
                office in Mumbai. The process was seamless and we received all
                documents within 24 hours as promised."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  R
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">Rajesh Kumar</p>
                  <p className="text-sm text-gray-500">Tech Startup Founder</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">{"★".repeat(5)}</div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Professional service and excellent support. The GST
                registration was handled perfectly and we're now operating
                smoothly from our Bangalore virtual office."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  P
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">Priya Sharma</p>
                  <p className="text-sm text-gray-500">E-commerce Business</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">{"★".repeat(5)}</div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "The premium address in Delhi has given our business instant
                credibility. Highly recommend SimplySetup for anyone looking to
                establish business presence in India."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">Amit Patel</p>
                  <p className="text-sm text-gray-500">Consulting Firm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security and Support Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🔒</span>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Secure Payments
            </h4>
            <p className="text-sm text-gray-600">
              All payments are processed securely through Razorpay with 256-bit
              SSL encryption
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">📞</span>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">24/7 Support</h4>
            <p className="text-sm text-gray-600">
              Our dedicated support team is available round the clock to assist
              you
            </p>
          </div>
        </div>
      </main>

      <Footer location={currentLocation} />
    </div>
  );
}
