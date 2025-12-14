import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams, Link } from "wouter";
import { Helmet } from "react-helmet-async";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function extractGstinFromSlug(slug: string): string | null {
  if (!slug) return null;
  const upperSlug = slug.toUpperCase();
  const gstinMatch = upperSlug.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}/);
  return gstinMatch ? gstinMatch[0] : null;
}
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Building2,
  MapPin,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Briefcase,
  Globe,
  Shield,
  Hash,
  User,
  Clock,
  ChevronRight,
  Copy,
  Check,
  Phone,
  Mail,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { GSTINDetails, GSTINSearchResponse } from "@shared/schema";

const STATE_CODES = [
  { code: "01", name: "Jammu & Kashmir" }, { code: "02", name: "Himachal Pradesh" },
  { code: "03", name: "Punjab" }, { code: "04", name: "Chandigarh" },
  { code: "05", name: "Uttarakhand" }, { code: "06", name: "Haryana" },
  { code: "07", name: "Delhi" }, { code: "08", name: "Rajasthan" },
  { code: "09", name: "Uttar Pradesh" }, { code: "10", name: "Bihar" },
  { code: "11", name: "Sikkim" }, { code: "12", name: "Arunachal Pradesh" },
  { code: "13", name: "Nagaland" }, { code: "14", name: "Manipur" },
  { code: "15", name: "Mizoram" }, { code: "16", name: "Tripura" },
  { code: "17", name: "Meghalaya" }, { code: "18", name: "Assam" },
  { code: "19", name: "West Bengal" }, { code: "20", name: "Jharkhand" },
  { code: "21", name: "Odisha" }, { code: "22", name: "Chhattisgarh" },
  { code: "23", name: "Madhya Pradesh" }, { code: "24", name: "Gujarat" },
  { code: "26", name: "Dadra & Nagar Haveli" }, { code: "27", name: "Maharashtra" },
  { code: "28", name: "Andhra Pradesh (Old)" }, { code: "29", name: "Karnataka" },
  { code: "30", name: "Goa" }, { code: "31", name: "Lakshadweep" },
  { code: "32", name: "Kerala" }, { code: "33", name: "Tamil Nadu" },
  { code: "34", name: "Puducherry" }, { code: "35", name: "Andaman & Nicobar" },
  { code: "36", name: "Telangana" }, { code: "37", name: "Andhra Pradesh" },
  { code: "38", name: "Ladakh" }
];

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200";
    case "suspended":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

function getStatusIcon(status: string) {
  switch (status.toLowerCase()) {
    case "active":
      return <CheckCircle className="h-4 w-4" />;
    case "suspended":
      return <AlertTriangle className="h-4 w-4" />;
    case "cancelled":
      return <XCircle className="h-4 w-4" />;
    default:
      return <Info className="h-4 w-4" />;
  }
}

interface ContactInfo {
  phone: string | null;
  email: string | null;
  additionalInfo?: {
    legalName: string | null;
    status: string | null;
  };
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function GSTINResultCard({ data }: { data: GSTINDetails }) {
  const { toast } = useToast();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isLoadingContact, setIsLoadingContact] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('thank-you') === '1') {
      const stored = sessionStorage.getItem("gstContactData");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.gstin === data.gstin) {
            setContactInfo({
              phone: parsed.phone,
              email: parsed.email,
              additionalInfo: {
                legalName: parsed.companyName,
                status: null
              }
            });
            sessionStorage.removeItem("gstContactData");
          }
        } catch (e) {
          console.error("Failed to parse contact data");
        }
      }
    }
  }, [data.gstin]);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast({ title: "Copied!", description: `${field} copied to clipboard` });
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast({ title: "Failed to copy", variant: "destructive" });
    }
  };

  const initiatePayment = async () => {
    setIsLoadingContact(true);
    setContactError(null);
    
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load payment gateway");
      }

      const orderResponse = await fetch("/api/gstin/contact/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          gstin: data.gstin,
          companyName: data.legalName
        })
      });

      const orderData = await orderResponse.json();
      
      if (!orderData.success) {
        throw new Error(orderData.error || "Failed to create payment order");
      }

      setIsPaymentProcessing(true);
      setIsLoadingContact(false);

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "GST Co",
        description: `Contact Details for ${data.gstin}`,
        order_id: orderData.orderId,
        handler: async (response: any) => {
          setIsLoadingContact(true);
          setIsPaymentProcessing(false);
          
          try {
            const verifyResponse = await fetch("/api/gstin/contact/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                gstin: data.gstin,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            const result = await verifyResponse.json();
            
            if (result.success && result.data) {
              setContactInfo(result.data);
              sessionStorage.setItem("gstContactData", JSON.stringify({
                phone: result.data.phone,
                email: result.data.email,
                gstin: data.gstin,
                companyName: data.legalName
              }));
              window.location.href = window.location.pathname + "?thank-you=1";
            } else {
              throw new Error(result.error || "Payment verification failed");
            }
          } catch (err: any) {
            setContactError(err.message || "Payment verification failed");
            toast({
              title: "Verification failed",
              description: err.message || "Please contact support with your payment ID",
              variant: "destructive"
            });
          } finally {
            setIsLoadingContact(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsPaymentProcessing(false);
            setIsLoadingContact(false);
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: ""
        },
        theme: {
          color: "#10b981"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (err: any) {
      setContactError(err.message || "Failed to initiate payment");
      toast({
        title: "Payment failed",
        description: err.message || "Could not initiate payment. Please try again.",
        variant: "destructive"
      });
      setIsLoadingContact(false);
      setIsPaymentProcessing(false);
    }
  };


  return (
    <Card className="border shadow-sm" data-testid="gstin-result-card">
      <CardContent className="p-4">
        {/* Header - Company Name and Status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-primary truncate" data-testid="text-legal-name">
              {data.legalName}
            </h2>
            {data.tradeName && data.tradeName !== data.legalName && (
              <p className="text-sm text-muted-foreground truncate" data-testid="text-trade-name">
                Trade: {data.tradeName}
              </p>
            )}
          </div>
          <Badge 
            className={`${getStatusColor(data.registrationStatus)} shrink-0 flex items-center gap-1 text-xs`}
            data-testid="badge-status"
          >
            {getStatusIcon(data.registrationStatus)}
            {data.registrationStatus}
          </Badge>
        </div>
        
        {/* GSTIN Display - Compact */}
        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded mb-4">
          <Hash className="h-4 w-4 text-muted-foreground" />
          <code className="font-mono font-semibold text-sm" data-testid="text-gstin">
            {data.gstin}
          </code>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto h-6 w-6 p-0"
            onClick={() => copyToClipboard(data.gstin, "GSTIN")}
            data-testid="button-copy-gstin"
          >
            {copiedField === "GSTIN" ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
          </Button>
        </div>

        {/* Two Column Layout - Business Info & Registration Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Business Information */}
          <div className="space-y-2">
            <h3 className="font-semibold text-xs uppercase tracking-wide text-muted-foreground flex items-center gap-1.5 pb-1 border-b">
              <Building2 className="h-3.5 w-3.5" /> Business Information
            </h3>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Constitution</span>
                <span className="font-medium text-right max-w-[55%] truncate" data-testid="text-constitution">{data.constitutionOfBusiness}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxpayer Type</span>
                <span className="font-medium" data-testid="text-taxpayer-type">{data.taxpayerType}</span>
              </div>
            </div>
          </div>
          
          {/* Registration Details */}
          <div className="space-y-2">
            <h3 className="font-semibold text-xs uppercase tracking-wide text-muted-foreground flex items-center gap-1.5 pb-1 border-b">
              <Calendar className="h-3.5 w-3.5" /> Registration Details
            </h3>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Registration Date</span>
                <span className="font-medium" data-testid="text-reg-date">
                  {new Date(data.registrationDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-medium" data-testid="text-last-updated">{data.lastUpdated}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">State Jurisdiction</span>
                <span className="font-medium text-right max-w-[55%] truncate" data-testid="text-state-jurisdiction">{data.stateJurisdiction}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Center Jurisdiction</span>
                <span className="font-medium text-right max-w-[55%] truncate" data-testid="text-center-jurisdiction">{data.centerJurisdiction}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Address - Compact */}
        <div className="mb-4">
          <h3 className="font-semibold text-xs uppercase tracking-wide text-muted-foreground flex items-center gap-1.5 pb-1 border-b mb-2">
            <MapPin className="h-3.5 w-3.5" /> Principal Place of Business
          </h3>
          <p className="text-sm leading-relaxed" data-testid="text-address">
            {data.address.fullAddress}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            <Badge variant="outline" className="text-xs h-5" data-testid="badge-state">{data.address.stateName}</Badge>
            <Badge variant="outline" className="text-xs h-5" data-testid="badge-pincode">PIN: {data.address.pincode}</Badge>
          </div>
        </div>
        
        {/* Nature of Business - Compact */}
        {data.natureOfBusinessActivities && data.natureOfBusinessActivities.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold text-xs uppercase tracking-wide text-muted-foreground flex items-center gap-1.5 pb-1 border-b mb-2">
              <Briefcase className="h-3.5 w-3.5" /> Nature of Business Activities
            </h3>
            <div className="flex flex-wrap gap-1.5" data-testid="container-activities">
              {data.natureOfBusinessActivities.map((activity, index) => (
                <Badge key={index} variant="secondary" className="text-[10px] h-5" data-testid={`badge-activity-${index}`}>
                  {activity}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Separator className="my-4" />
        
        {/* Contact Information - Premium Feature */}
        <div className="relative">
          {!contactInfo && !isLoadingContact && !contactError && !isPaymentProcessing && (
            <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 via-transparent to-primary/10">
              {/* Blurred preview hint */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <div className="text-center space-y-1 blur-[6px] select-none opacity-40">
                  <div className="text-lg font-medium">+91 98XXX XXXXX</div>
                  <div className="text-sm">contact@company.com</div>
                </div>
              </div>
              
              {/* CTA Overlay */}
              <div className="relative z-10 p-6 sm:p-8 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">
                    Get Direct Contact Details of {data.legalName}
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-md mx-auto">
                    Unlock verified phone number and email address registered with GST authorities
                  </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground" data-testid="contact-value-props">
                  <span className="flex items-center gap-1" data-testid="badge-verified">
                    <CheckCircle className="h-3.5 w-3.5 text-green-500" /> Government Verified
                  </span>
                  <span className="flex items-center gap-1" data-testid="badge-secure">
                    <Shield className="h-3.5 w-3.5 text-blue-500" /> Secure Payment
                  </span>
                  <span className="flex items-center gap-1" data-testid="badge-instant">
                    <Clock className="h-3.5 w-3.5 text-orange-500" /> Instant Access
                  </span>
                </div>
                
                <Button 
                  onClick={initiatePayment}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all duration-300"
                  data-testid="button-get-contact"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Unlock Contact @ Just ₹299
                </Button>
                
                <p className="text-xs text-muted-foreground">
                  One-time payment • No subscription required
                </p>
              </div>
            </div>
          )}
          
          {isLoadingContact && (
            <div className="p-8 rounded-xl border-2 border-primary/20 bg-primary/5 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">Fetching contact details...</p>
              <p className="text-xs text-muted-foreground mt-1">This usually takes a few seconds</p>
            </div>
          )}
          
          {contactError && !contactInfo && (
            <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl text-center">
              <XCircle className="h-10 w-10 text-red-500 mx-auto mb-3" />
              <p className="text-red-600 dark:text-red-400 font-medium mb-2">Unable to fetch contact details</p>
              <p className="text-sm text-red-500/80 dark:text-red-400/80 mb-4">{contactError}</p>
              <Button 
                onClick={initiatePayment}
                variant="outline"
                className="border-red-300 hover:bg-red-50 dark:hover:bg-red-900/30"
                data-testid="button-retry-contact"
              >
                Try Again @ ₹299
              </Button>
            </div>
          )}
          
          {contactInfo && (
            <div className="rounded-xl border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 overflow-hidden">
              <div className="px-4 py-2 bg-green-100 dark:bg-green-900/40 border-b border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Contact Details Unlocked</span>
                </div>
              </div>
              
              <div className="p-5 space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-900/50 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Phone Number</span>
                    <div className="flex items-center gap-2 mt-1">
                      {contactInfo.phone ? (
                        <>
                          <span className="text-lg font-bold text-foreground" data-testid="text-phone">{contactInfo.phone}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-3 text-xs"
                            onClick={() => copyToClipboard(contactInfo.phone!, "Phone")}
                            data-testid="button-copy-phone"
                          >
                            {copiedField === "Phone" ? (
                              <><Check className="h-3 w-3 mr-1 text-green-600" /> Copied</>
                            ) : (
                              <><Copy className="h-3 w-3 mr-1" /> Copy</>
                            )}
                          </Button>
                        </>
                      ) : (
                        <span className="text-muted-foreground italic" data-testid="text-phone-na">Not registered with GST</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-900/50 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Email Address</span>
                    <div className="flex items-center gap-2 mt-1">
                      {contactInfo.email ? (
                        <>
                          <span className="text-lg font-bold text-foreground break-all" data-testid="text-email">{contactInfo.email}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-3 text-xs flex-shrink-0"
                            onClick={() => copyToClipboard(contactInfo.email!, "Email")}
                            data-testid="button-copy-email"
                          >
                            {copiedField === "Email" ? (
                              <><Check className="h-3 w-3 mr-1 text-green-600" /> Copied</>
                            ) : (
                              <><Copy className="h-3 w-3 mr-1" /> Copy</>
                            )}
                          </Button>
                        </>
                      ) : (
                        <span className="text-muted-foreground italic" data-testid="text-email-na">Not registered with GST</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// SEO Content Component - Programmatic content for better rankings
function SEOContentSection({ data }: { data: GSTINDetails }) {
  const stateCode = data.gstin.substring(0, 2);
  const stateName = data.address.stateName;
  
  // Generate state-specific insights
  const getStateInsights = () => {
    const stateInsights: Record<string, { economy: string; gstNote: string }> = {
      "Maharashtra": { 
        economy: "India's largest state economy contributing over 14% to national GDP",
        gstNote: "Maharashtra has the highest number of GST registrations in India"
      },
      "Gujarat": { 
        economy: "Major industrial hub with strong manufacturing and petrochemical sectors",
        gstNote: "Gujarat is among the top 5 states for GST revenue collection"
      },
      "Karnataka": { 
        economy: "IT capital of India with a thriving startup ecosystem",
        gstNote: "Bangalore-based businesses form a significant portion of Karnataka's GST base"
      },
      "Tamil Nadu": { 
        economy: "Second largest state economy with strong automotive and textile industries",
        gstNote: "Tamil Nadu is a major contributor to India's manufacturing GST revenue"
      },
      "Delhi": { 
        economy: "National capital region with diverse service and trade sectors",
        gstNote: "Delhi NCR is a key hub for trading businesses under GST"
      },
      "Uttar Pradesh": { 
        economy: "Largest state by population with growing industrial presence",
        gstNote: "UP has seen significant growth in GST registrations post-2017"
      },
      "West Bengal": { 
        economy: "Eastern India's commercial hub with strong MSME presence",
        gstNote: "Kolkata-centric businesses drive West Bengal's GST collections"
      },
      "Telangana": { 
        economy: "Fastest growing state economy with IT and pharma sectors",
        gstNote: "Hyderabad is emerging as a major GST revenue contributor"
      },
      "Rajasthan": { 
        economy: "Growing tourism and mineral-based economy",
        gstNote: "Rajasthan has simplified GST processes for tourism businesses"
      },
      "Kerala": { 
        economy: "Strong remittance-based economy with high consumption",
        gstNote: "Kerala has high GST compliance rates among registered businesses"
      }
    };
    return stateInsights[stateName] || { 
      economy: `${stateName} is an important contributor to India's economic landscape`,
      gstNote: `Businesses in ${stateName} are required to comply with GST regulations`
    };
  };

  // Generate constitution-specific content
  const getConstitutionInsights = () => {
    const constitution = data.constitutionOfBusiness.toLowerCase();
    if (constitution.includes("private limited")) {
      return {
        type: "Private Limited Company",
        description: "A Private Limited Company is a separately registered legal entity with limited liability protection for shareholders. It requires minimum 2 directors and can have up to 200 shareholders.",
        compliance: "Must file annual returns with MCA, conduct AGMs, and maintain statutory registers."
      };
    } else if (constitution.includes("llp") || constitution.includes("limited liability partnership")) {
      return {
        type: "Limited Liability Partnership",
        description: "An LLP combines the benefits of a partnership with limited liability. Partners' personal assets are protected from business liabilities.",
        compliance: "Must file Form 11 (Annual Return) and Form 8 (Statement of Accounts) with MCA annually."
      };
    } else if (constitution.includes("proprietorship")) {
      return {
        type: "Sole Proprietorship",
        description: "A sole proprietorship is the simplest business structure owned and operated by one person. The owner is personally liable for all business obligations.",
        compliance: "Simplified compliance requirements with income tax filing under individual PAN."
      };
    } else if (constitution.includes("partnership")) {
      return {
        type: "Partnership Firm",
        description: "A partnership is formed when two or more people agree to share profits and losses of a business. It can be registered or unregistered.",
        compliance: "Should register with Registrar of Firms for legal benefits and file partnership returns."
      };
    } else if (constitution.includes("public")) {
      return {
        type: "Public Limited Company",
        description: "A Public Limited Company can offer shares to the general public and is listed on stock exchanges. It requires minimum 3 directors.",
        compliance: "Extensive compliance including quarterly filings, audit committee, and SEBI regulations if listed."
      };
    }
    return {
      type: data.constitutionOfBusiness,
      description: `This business is registered as ${data.constitutionOfBusiness} under GST.`,
      compliance: "Standard GST compliance including monthly/quarterly returns and annual filings."
    };
  };

  // Generate business activity insights
  const getActivityInsights = () => {
    const activities = data.natureOfBusinessActivities || [];
    const activityLower = activities.join(" ").toLowerCase();
    
    if (activityLower.includes("manufacturer") || activityLower.includes("factory")) {
      return "Manufacturing businesses typically deal with input materials, production processes, and output goods. They can claim ITC on raw materials, capital goods, and input services.";
    } else if (activityLower.includes("trader") || activityLower.includes("wholesale") || activityLower.includes("retail")) {
      return "Trading businesses buy and sell goods without manufacturing. They need to maintain proper invoices and can claim ITC on purchases meant for resale.";
    } else if (activityLower.includes("service") || activityLower.includes("consultant")) {
      return "Service providers offer intangible services and are liable for GST on the service value. They can claim ITC on inputs used in providing services.";
    } else if (activityLower.includes("export")) {
      return "Exporters can claim refund of GST paid on inputs or opt for LUT to export without paying GST. Zero-rated supplies attract 0% GST.";
    } else if (activityLower.includes("e-commerce") || activityLower.includes("online")) {
      return "E-commerce operators have specific GST compliance requirements including TCS (Tax Collected at Source) on supplies made through their platform.";
    }
    return "This business operates under GST regulations applicable to their specific industry and nature of operations.";
  };

  const stateInsights = getStateInsights();
  const constitutionInsights = getConstitutionInsights();
  const activityInsight = getActivityInsights();

  // Generate dynamic FAQs based on company data
  const dynamicFAQs = [
    {
      question: `Is ${data.legalName} a registered GST taxpayer?`,
      answer: `Yes, ${data.legalName} is a ${data.registrationStatus.toLowerCase()} GST taxpayer with GSTIN ${data.gstin}. The business was registered on ${data.registrationDate} and is classified as a ${data.taxpayerType} taxpayer.`
    },
    {
      question: `What type of business is ${data.legalName}?`,
      answer: `${data.legalName} is registered as a ${data.constitutionOfBusiness}${data.natureOfBusinessActivities?.length ? ` engaged in ${data.natureOfBusinessActivities.slice(0, 2).join(", ")}` : ""}. The business is located in ${data.address.stateName}, India.`
    },
    {
      question: `Where is ${data.legalName} located?`,
      answer: `${data.legalName} is registered at ${data.address.fullAddress}. The business operates in ${data.address.stateName} (State Code: ${stateCode}).`
    },
    {
      question: `Can I claim Input Tax Credit from ${data.legalName}?`,
      answer: data.registrationStatus.toLowerCase() === "active" 
        ? `Yes, since ${data.legalName}'s GSTIN ${data.gstin} is currently active, you can claim Input Tax Credit on purchases made from this business, provided you have valid tax invoices.`
        : `Caution is advised as ${data.legalName}'s GST registration status is ${data.registrationStatus}. Verify the current status before claiming ITC.`
    }
  ];

  return (
    <div className="space-y-8 mt-8" data-testid="seo-content-section">
      {/* Company Profile Summary */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            About {data.legalName}
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            <strong>{data.legalName}</strong> is a <strong>{data.registrationStatus.toLowerCase()}</strong> GST-registered 
            {" "}{constitutionInsights.type.toLowerCase()} based in <strong>{data.address.stateName}</strong>, India. 
            The business was registered under GST on <strong>{data.registrationDate}</strong> and operates as a 
            {" "}<strong>{data.taxpayerType}</strong> taxpayer.
            {data.tradeName && data.tradeName !== data.legalName && (
              <> The business also operates under the trade name <strong>{data.tradeName}</strong>.</>
            )}
          </p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            {activityInsight}
          </p>
        </CardContent>
      </Card>

      {/* Constitution & Compliance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Business Structure: {constitutionInsights.type}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{constitutionInsights.description}</p>
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" /> Compliance Requirements
            </h4>
            <p className="text-sm text-muted-foreground">{constitutionInsights.compliance}</p>
          </div>
        </CardContent>
      </Card>

      {/* State-Specific Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            GST in {stateName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <h4 className="font-semibold text-sm mb-2 text-blue-700 dark:text-blue-300">State Economy</h4>
              <p className="text-sm text-muted-foreground">{stateInsights.economy}</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
              <h4 className="font-semibold text-sm mb-2 text-green-700 dark:text-green-300">GST Landscape</h4>
              <p className="text-sm text-muted-foreground">{stateInsights.gstNote}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dynamic FAQs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Frequently Asked Questions about {data.legalName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dynamicFAQs.map((faq, index) => (
              <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                <h4 className="font-semibold text-sm mb-2">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Related Searches & Internal Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Related GST Searches
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
              GST verification {stateName}
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
              {data.constitutionOfBusiness} GST registration
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
              {data.taxpayerType} taxpayer search
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
              GSTIN lookup {data.address.district || stateName}
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
              {stateName} business registration
            </Badge>
            {data.natureOfBusinessActivities?.slice(0, 2).map((activity, i) => (
              <Badge key={i} variant="outline" className="cursor-pointer hover:bg-primary/10">
                {activity} GST
              </Badge>
            ))}
          </div>
          
          {/* Internal Links */}
          <div className="pt-4 border-t">
            <h4 className="font-semibold text-sm mb-3 text-muted-foreground">Explore More GST Tools & Services</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Link href="/gst-number-search/" className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors" data-testid="link-search-gstin">
                <Search className="h-4 w-4 text-primary" />
                <span className="text-sm">Search Another GSTIN</span>
              </Link>
              <Link href="/services/gst-registration/" className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors" data-testid="link-gst-registration">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm">GST Registration Service</span>
              </Link>
              <Link href="/virtual-office/" className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors" data-testid="link-virtual-office">
                <Building2 className="h-4 w-4 text-primary" />
                <span className="text-sm">Virtual Office for GST</span>
              </Link>
              <Link href={`/virtual-office/${stateName.toLowerCase().replace(/\s+/g, '-')}/`} className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors" data-testid="link-virtual-office-state">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm">Virtual Office in {stateName}</span>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Need GST Registration?</h3>
          <p className="text-muted-foreground mb-4">
            Get your business GST registered with our expert assistance. Virtual office addresses available across India.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/services/gst-registration/" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors" data-testid="cta-gst-registration">
              <FileText className="h-4 w-4" /> Start GST Registration
            </Link>
            <Link href="/virtual-office/" className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors" data-testid="cta-virtual-office">
              <Building2 className="h-4 w-4" /> Get Virtual Office
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SearchSkeleton() {
  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-7 w-64" />
            <Skeleton className="h-5 w-40" />
          </div>
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-12 w-full mt-4" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <Skeleton className="h-4 w-32" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-32" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>
        <Skeleton className="h-24 w-full" />
      </CardContent>
    </Card>
  );
}

export default function GSTNumberSearchPage() {
  const [location, setLocation] = useLocation();
  const params = useParams<{ slug?: string }>();
  const [searchInput, setSearchInput] = useState("");
  const [searchGstin, setSearchGstin] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (params.slug) {
      const extractedGstin = extractGstinFromSlug(params.slug);
      if (extractedGstin) {
        setSearchInput(extractedGstin);
        setSearchGstin(extractedGstin);
      }
    }
  }, [params.slug]);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast({ title: "Copied!", description: `${field} copied to clipboard` });
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast({ title: "Failed to copy", variant: "destructive" });
    }
  };

  const { data: searchResult, isLoading, error, isFetching } = useQuery<GSTINSearchResponse>({
    queryKey: ['/api/gstin/search', searchGstin],
    queryFn: async () => {
      const response = await fetch(`/api/gstin/search?gstin=${encodeURIComponent(searchGstin!)}`, {
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch GSTIN details");
      }
      return response.json();
    },
    enabled: !!searchGstin,
  });

  useEffect(() => {
    if (searchResult?.success && searchResult.data) {
      const companySlug = slugify(searchResult.data.legalName);
      const seoUrl = `/gst-number-search/${companySlug}-${searchResult.data.gstin}/`;
      const currentSearch = window.location.search;
      const fullUrl = seoUrl + currentSearch;
      if (!window.location.pathname.endsWith(seoUrl.replace(/\/$/, '') + '/')) {
        window.history.replaceState({}, '', fullUrl);
      }
    }
  }, [searchResult, location]);

  const validateGSTIN = (gstin: string): { valid: boolean; message?: string } => {
    const normalized = gstin.toUpperCase().trim();
    if (normalized.length !== 15) {
      return { valid: false, message: "GSTIN must be exactly 15 characters" };
    }
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
    if (!gstinRegex.test(normalized)) {
      return { valid: false, message: "Invalid GSTIN format" };
    }
    const stateCode = normalized.substring(0, 2);
    const validState = STATE_CODES.find(s => s.code === stateCode);
    if (!validState) {
      return { valid: false, message: `Invalid state code: ${stateCode}` };
    }
    return { valid: true };
  };

  const handleSearch = useCallback(() => {
    const validation = validateGSTIN(searchInput);
    if (!validation.valid) {
      toast({
        title: "Invalid GSTIN",
        description: validation.message,
        variant: "destructive"
      });
      return;
    }
    const normalized = searchInput.toUpperCase().trim();
    setSearchGstin(normalized);
  }, [searchInput, toast]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const pageTitle = searchResult?.data 
    ? `${searchResult.data.legalName} - GSTIN ${searchResult.data.gstin} | GST Number Search`
    : "GST Number Search | Verify GSTIN Details Online | SimplySetup";
  
  const pageDescription = searchResult?.data
    ? `View GST details for ${searchResult.data.legalName}. GSTIN: ${searchResult.data.gstin}. Status: ${searchResult.data.registrationStatus}. Registered in ${searchResult.data.address.stateName}.`
    : "Free GST Number Search tool to verify GSTIN details online. Check business registration status, taxpayer type, address, and compliance information instantly.";

  const canonicalUrl = searchResult?.data 
    ? `https://simplysetup.in/gst-number-search/${slugify(searchResult.data.legalName)}-${searchResult.data.gstin}/`
    : "https://simplysetup.in/gst-number-search/";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "GST Number Search Tool",
    "description": "Free online tool to search and verify GSTIN details including business name, registration status, and address.",
    "url": canonicalUrl,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "provider": {
      "@type": "Organization",
      "name": "SimplySetup",
      "url": "https://simplysetup.in"
    }
  };

  // Organization schema for the searched company
  const companyStructuredData = searchResult?.data ? {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": searchResult.data.legalName,
    "alternateName": searchResult.data.tradeName !== searchResult.data.legalName ? searchResult.data.tradeName : undefined,
    "taxID": searchResult.data.gstin,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": searchResult.data.address.fullAddress,
      "addressLocality": searchResult.data.address.district,
      "addressRegion": searchResult.data.address.stateName,
      "postalCode": searchResult.data.address.pincode,
      "addressCountry": "IN"
    },
    "foundingDate": searchResult.data.registrationDate,
    "legalName": searchResult.data.legalName,
    "areaServed": {
      "@type": "Country",
      "name": "India"
    }
  } : null;

  // Dynamic FAQs based on search result
  const faqStructuredData = searchResult?.data ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Is ${searchResult.data.legalName} a registered GST taxpayer?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, ${searchResult.data.legalName} is a ${searchResult.data.registrationStatus.toLowerCase()} GST taxpayer with GSTIN ${searchResult.data.gstin}. The business was registered on ${searchResult.data.registrationDate}.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the GST number of ${searchResult.data.legalName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The GSTIN (GST Number) of ${searchResult.data.legalName} is ${searchResult.data.gstin}. This is a ${searchResult.data.constitutionOfBusiness} registered in ${searchResult.data.address.stateName}.`
        }
      },
      {
        "@type": "Question",
        "name": `Where is ${searchResult.data.legalName} located?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${searchResult.data.legalName} is located at ${searchResult.data.address.fullAddress}, ${searchResult.data.address.stateName} - ${searchResult.data.address.pincode}.`
        }
      },
      {
        "@type": "Question",
        "name": `Can I claim ITC from ${searchResult.data.legalName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": searchResult.data.registrationStatus.toLowerCase() === "active" 
            ? `Yes, ${searchResult.data.legalName}'s GSTIN is active, so you can claim Input Tax Credit on valid invoices from this business.`
            : `Exercise caution as ${searchResult.data.legalName}'s GST status is ${searchResult.data.registrationStatus}. Verify before claiming ITC.`
        }
      }
    ]
  } : {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a GSTIN?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "GSTIN (Goods and Services Tax Identification Number) is a unique 15-digit number assigned to every registered taxpayer under GST in India."
        }
      },
      {
        "@type": "Question",
        "name": "How to verify a GST number?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Enter the 15-digit GSTIN in our search tool to get business name, registration status, address, and compliance details."
        }
      },
      {
        "@type": "Question",
        "name": "What does each digit in GSTIN represent?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "First 2 digits = State Code, Next 10 = PAN, 13th = Entity number, 14th = Z (default), 15th = Check digit."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={searchResult?.data 
          ? `${searchResult.data.legalName}, ${searchResult.data.gstin}, GST number search, GSTIN verification, ${searchResult.data.address.stateName} GST, ${searchResult.data.constitutionOfBusiness} GST registration`
          : "GST number search, GSTIN verification, GST search by number, verify GST, check GSTIN, GST number lookup, GST India, taxpayer search"
        } />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content={searchResult?.data ? "profile" : "website"} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="SimplySetup" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:site" content="@simplysetup" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {companyStructuredData ? JSON.stringify(companyStructuredData) : "{}"}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </Helmet>

      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                GST Number Search
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Instantly verify any GSTIN and get complete business details including registration status, 
                taxpayer type, and registered address.
              </p>
            </div>

            <Card className="mb-8 shadow-lg border-2" data-testid="card-search">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      placeholder="Enter 15-digit GSTIN (e.g., 27AABCU9603R1ZM)"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
                      onKeyDown={handleKeyDown}
                      maxLength={15}
                      className="h-12 text-lg font-mono tracking-wider uppercase pl-4"
                      data-testid="input-gstin"
                    />
                    {searchInput.length > 0 && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        {searchInput.length}/15
                      </span>
                    )}
                  </div>
                  <Button 
                    onClick={handleSearch}
                    disabled={isLoading || isFetching}
                    className="h-12 px-8 text-base"
                    data-testid="button-search"
                  >
                    {(isLoading || isFetching) ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-5 w-5" />
                        Search
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-3 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Enter a valid 15-character GSTIN to search for business details
                </p>
              </CardContent>
            </Card>

            {(isLoading || isFetching) && <SearchSkeleton />}

            {error && !isLoading && (
              <Alert variant="destructive" data-testid="alert-error">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Search Failed</AlertTitle>
                <AlertDescription>
                  Unable to fetch GSTIN details. Please check the number and try again.
                </AlertDescription>
              </Alert>
            )}

            {searchResult && !isLoading && !isFetching && (
              searchResult.success && searchResult.data ? (
                <>
                  <GSTINResultCard data={searchResult.data} />
                  <SEOContentSection data={searchResult.data} />
                </>
              ) : (
                <Alert variant="destructive" data-testid="alert-not-found">
                  <XCircle className="h-4 w-4" />
                  <AlertTitle>GSTIN Not Found</AlertTitle>
                  <AlertDescription>
                    {searchResult.error || "No business found with this GSTIN. Please verify the number."}
                  </AlertDescription>
                </Alert>
              )
            )}
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Understanding GSTIN Format</h2>
            
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">27</div>
                    <div className="text-xs text-muted-foreground mt-1">State Code</div>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="text-2xl font-mono font-bold text-green-600 dark:text-green-400">AABCU</div>
                    <div className="text-xs text-muted-foreground mt-1">PAN (First 5)</div>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <div className="text-2xl font-mono font-bold text-purple-600 dark:text-purple-400">9603</div>
                    <div className="text-xs text-muted-foreground mt-1">PAN (Numbers)</div>
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                    <div className="text-2xl font-mono font-bold text-orange-600 dark:text-orange-400">R1Z</div>
                    <div className="text-xs text-muted-foreground mt-1">Entity + Default</div>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                    <div className="text-2xl font-mono font-bold text-red-600 dark:text-red-400">M</div>
                    <div className="text-xs text-muted-foreground mt-1">Check Digit</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="h-5 w-5 text-primary" />
                    Verify Authenticity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Confirm if a business is GST registered and check their current compliance status before transactions.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-primary" />
                    Input Tax Credit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Verify supplier GSTIN before claiming ITC. Invalid or cancelled GSTINs can lead to ITC rejection.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Globe className="h-5 w-5 text-primary" />
                    Due Diligence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Perform background checks on business partners by verifying their GST registration details.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">State Codes Reference</h2>
            
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {STATE_CODES.map((state) => (
                    <div 
                      key={state.code}
                      className="flex items-center gap-2 p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <span className="font-mono font-bold text-primary">{state.code}</span>
                      <span className="text-xs text-muted-foreground truncate">{state.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What is a GSTIN?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    GSTIN (Goods and Services Tax Identification Number) is a unique 15-digit alphanumeric code 
                    assigned to every registered taxpayer under GST in India. It serves as a unique identifier 
                    for tax purposes and is required for filing returns, claiming input tax credit, and 
                    conducting business transactions.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How to verify a GST number online?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Enter the 15-digit GSTIN in the search box above and click "Search". Our tool will 
                    instantly fetch and display the business details including legal name, trade name, 
                    registration status, registered address, and taxpayer type.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What do the different GSTIN statuses mean?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong className="text-green-600">Active:</strong> The GSTIN is valid and the business is compliant with GST regulations.</li>
                    <li><strong className="text-yellow-600">Suspended:</strong> The GSTIN has been temporarily suspended, usually due to non-compliance.</li>
                    <li><strong className="text-red-600">Cancelled:</strong> The GSTIN has been cancelled and is no longer valid for transactions.</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Why should I verify GSTIN before business transactions?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Verifying GSTIN is essential for claiming Input Tax Credit (ITC). If you transact with 
                    a business having an invalid, suspended, or cancelled GSTIN, your ITC claim may be 
                    rejected. Regular verification also helps prevent fraud and ensures you're dealing 
                    with legitimate, tax-compliant businesses.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Need a Virtual Office for GST Registration?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get a professional business address for your GST registration. We provide compliant 
              virtual office solutions with rent agreement and NOC documents.
            </p>
            <Button 
              size="lg" 
              className="gap-2"
              onClick={() => setLocation('/virtual-office-for-gst-registration')}
              data-testid="button-cta-gst"
            >
              Explore Virtual Office <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      
      <Footer location={null} />
    </>
  );
}