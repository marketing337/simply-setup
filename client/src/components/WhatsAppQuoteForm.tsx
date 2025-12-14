import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhatsAppQuoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function WhatsAppQuoteForm({ isOpen, onClose, className }: WhatsAppQuoteFormProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    yourName: "",
    phoneNumber: "",
    emailId: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create WhatsApp message with form data
      const message = `Hi! I'm interested in your virtual office services.

*Company Details:*
Company Name: ${formData.companyName}
Contact Person: ${formData.yourName}
Phone: ${formData.phoneNumber}
Email: ${formData.emailId}

Please send me a detailed quote for virtual office services.`;

      // Encode the message for WhatsApp URL
      const encodedMessage = encodeURIComponent(message);
      const whatsappNumber = "919999999999"; // Replace with actual WhatsApp business number
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');

      // Reset form and close dialog
      setFormData({
        companyName: "",
        yourName: "",
        phoneNumber: "",
        emailId: ""
      });
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.companyName && formData.yourName && formData.phoneNumber && formData.emailId;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className={cn("w-full max-w-md bg-white shadow-2xl", className)}>
        <CardHeader className="pb-4">
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-0 text-sm"
              />
            </div>
            
            <div>
              <Input
                name="yourName"
                placeholder="Your Name"
                value={formData.yourName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-gray-400 focus:ring-0 text-sm"
              />
            </div>
            
            <div>
              <Input
                name="phoneNumber"
                type="tel"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-gray-400 focus:ring-0 text-sm"
              />
            </div>
            
            <div>
              <Input
                name="emailId"
                type="email"
                placeholder="Email ID"
                value={formData.emailId}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-gray-400 focus:ring-0 text-sm"
              />
            </div>
            
            <Button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}