import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { SiWhatsapp } from 'react-icons/si';
import { Location } from '@shared/schema';
import ContactForm from './ContactForm';

interface DesktopWhatsAppButtonProps {
  location?: Location;
}

export default function DesktopWhatsAppButton({ location }: DesktopWhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Only show on desktop devices
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Floating WhatsApp Button - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50 hidden md:block">
        <Button 
          onClick={() => setIsOpen(true)} 
          className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full p-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        >
          <SiWhatsapp className="h-7 w-7" />
        </Button>
      </div>

      {/* Contact Form Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="sr-only">
            <DialogTitle>Desktop WhatsApp Contact Form</DialogTitle>
          </DialogHeader>
          <ContactForm />
        </DialogContent>
      </Dialog>
    </>
  );
}