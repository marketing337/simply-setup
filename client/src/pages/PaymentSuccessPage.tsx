import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>

            {/* Success Message */}
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Your virtual office setup is now in progress. We'll contact you
              shortly.
            </p>

            {/* How It Works Section */}
            <div className="bg-green-50 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-lg font-semibold text-green-800 mb-4 text-center">
                What happens next?
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800">
                      Document Verification
                    </h3>
                    <p className="text-green-700 text-sm">
                      We'll verify your documents and setup your virtual office
                      address
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800">
                      Account Activation
                    </h3>
                    <p className="text-green-700 text-sm">
                      Your virtual office will be activated within 24-48 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800">Welcome Kit</h3>
                    <p className="text-green-700 text-sm">
                      You'll receive login credentials and welcome materials via
                      email
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800">
                      Ongoing Support
                    </h3>
                    <p className="text-green-700 text-sm">
                      Our team will be available to assist you with any
                      questions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-sm">
                <strong>Need immediate assistance?</strong>
                <br />
                Call us at <span className="font-mono">+91 81498 49501</span>
                <br />
                Email: <span className="font-mono">hello@simplysetup.co</span>
              </p>
            </div>

            {/* Return to Home Button */}
            <Button
              onClick={() => setLocation("/")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
