import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle, Phone, Mail, Copy, Check, ArrowLeft, Building2, Shield, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

interface ContactData {
  phone: string | null;
  email: string | null;
  gstin: string;
  companyName: string;
}

export default function GSTContactThankYouPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("gstContactData");
    if (stored) {
      try {
        setContactData(JSON.parse(stored));
        sessionStorage.removeItem("gstContactData");
      } catch (e) {
        console.error("Failed to parse contact data");
      }
    }
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <SEO
        title="Payment Successful - GST Contact Details | GST Co"
        description="Your payment was successful. Access the verified contact details for the GST registered business."
      />
      <Navbar />
      
      <main className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
        <Card className="border-0 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 sm:p-8 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2" data-testid="text-payment-success">
              Payment Successful!
            </h1>
            <p className="text-green-100">
              Your contact details have been unlocked
            </p>
          </div>
          
          <CardContent className="p-6 sm:p-8">
            {contactData ? (
              <>
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <h2 className="font-bold text-lg text-gray-900" data-testid="text-company-name">
                      {contactData.companyName}
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground font-mono" data-testid="text-gstin">
                    GSTIN: {contactData.gstin}
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg border-2 border-blue-100 shadow-sm">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Phone Number</span>
                      <div className="flex items-center gap-2 mt-1">
                        {contactData.phone ? (
                          <>
                            <span className="text-lg font-bold text-foreground" data-testid="text-phone">{contactData.phone}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-3 text-xs"
                              onClick={() => copyToClipboard(contactData.phone!, "Phone")}
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
                  
                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg border-2 border-purple-100 shadow-sm">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Email Address</span>
                      <div className="flex items-center gap-2 mt-1">
                        {contactData.email ? (
                          <>
                            <span className="text-lg font-bold text-foreground break-all" data-testid="text-email">{contactData.email}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-3 text-xs flex-shrink-0"
                              onClick={() => copyToClipboard(contactData.email!, "Email")}
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

                <div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground mb-8">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5 text-green-500" /> Government Verified
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Shield className="h-3.5 w-3.5 text-blue-500" /> Secure Payment
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-orange-500" /> Instant Access
                  </Badge>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  Contact details not found. They may have expired from your session.
                </p>
              </div>
            )}

            <div className="bg-emerald-50 rounded-lg p-5 mb-6 border border-emerald-200">
              <h3 className="font-semibold text-emerald-800 mb-3 text-center">
                Thank you for using GST Co!
              </h3>
              <p className="text-emerald-700 text-sm text-center">
                You can now use these verified contact details to reach out to the business directly.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
              <p className="text-blue-800 text-sm text-center">
                <strong>Need help?</strong><br />
                Call us at <span className="font-mono">+91 81498 49501</span><br />
                Email: <span className="font-mono">hello@simplysetup.co</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => setLocation("/gst-number-search")}
                variant="outline"
                className="flex-1"
                data-testid="button-search-another"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Search Another GSTIN
              </Button>
              <Button
                onClick={() => setLocation("/")}
                className="flex-1 bg-primary hover:bg-primary/90"
                data-testid="button-home"
              >
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer location={null} />
    </div>
  );
}
