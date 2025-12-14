import ZohoForm from './ZohoForm';

interface ContactFormProps {
  locationName?: string;
}

export default function ContactForm({ locationName }: ContactFormProps) {
  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      <ZohoForm 
        className="w-full"
        height="600px"
        width="100%"
      />
    </div>
  );
}