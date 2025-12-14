import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { SiWhatsapp } from 'react-icons/si';
import { Location } from '@shared/schema';
import ContactForm from './ContactForm';

interface MobileContactButtonProps {
  location?: Location;
}

export default function MobileContactButton({ location }: MobileContactButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Only show on mobile devices
  if (!isMobile) {
    return null;
  }

  return (
    <>
      {/* Sticky Footer Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-50 md:hidden">
        <Button 
          onClick={() => setIsOpen(true)} 
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 flex items-center justify-center gap-2"
        >
          <SiWhatsapp className="h-5 w-5" />
          Get Quote on WhatsApp
        </Button>
      </div>

      {/* Contact Form Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="sr-only">
            <DialogTitle>Mobile Contact Form</DialogTitle>
          </DialogHeader>
          <ContactForm />
        </DialogContent>
      </Dialog>
    </>
  );
}