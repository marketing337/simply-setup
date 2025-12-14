import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User, Phone, Mail, CheckCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import type { SalesPerson } from "@shared/schema";

interface SalesPersonCardsProps {
  locationId: number;
}

export default function SalesPersonCards({
  locationId,
}: SalesPersonCardsProps) {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Fetch sales persons for this location
  const { data: salesPersons = [], isLoading } = useQuery<SalesPerson[]>({
    queryKey: [`/api/locations/${locationId}/salesPersons`],
    enabled: !!locationId,
  });

  if (isLoading) {
    return (
      <div className="mb-8">
        <div className="text-center py-6">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  if (!salesPersons || salesPersons.length === 0) {
    return null;
  }

  // Select one random sales person for this location
  const selectedSalesPerson = salesPersons[Math.floor(Math.random() * salesPersons.length)];

  return (
    <>
      <div className="mb-6">
        <Card className="bg-gray-50 border border-gray-200">
          <CardContent className="p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              Need help with your Virtual Office setup?
            </h3>

            {/* Mobile: Stack vertically, Desktop: Side by side */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                {selectedSalesPerson.avatar ? (
                  <img
                    src={selectedSalesPerson.avatar}
                    alt={selectedSalesPerson.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                    {selectedSalesPerson.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {selectedSalesPerson.designation}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => setIsContactFormOpen(true)}
                className="border-blue-600 text-blue-600 hover:bg-blue-50 w-full sm:w-auto text-sm sm:text-base"
              >
                Get in Touch
              </Button>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              {selectedSalesPerson.bio ? (
                <p className="text-xs sm:text-sm text-blue-800 mb-3">{selectedSalesPerson.bio}</p>
              ) : (
                <p className="text-xs sm:text-sm text-blue-800 mb-3">
                  Get expert guidance for your virtual office requirements from
                  our dedicated team.
                </p>
              )}

              <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Our services include:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 mr-1.5 sm:mr-2" />
                  Price Negotiation
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 mr-1.5 sm:mr-2" />
                  GST / MCA Consultancy
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 mr-1.5 sm:mr-2" />
                  Business Setup Support
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 mr-1.5 sm:mr-2" />
                  Free Consultation
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Form Dialog */}
      <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
        <DialogContent className="max-w-lg p-6">
          <DialogHeader className="sr-only">
            <DialogTitle>Contact Form</DialogTitle>
          </DialogHeader>
          <ContactForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
