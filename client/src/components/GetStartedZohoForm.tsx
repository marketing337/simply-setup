import ZohoForm from './ZohoForm';

interface GetStartedZohoFormProps {
  locationName?: string;
}

export default function GetStartedZohoForm({ locationName }: GetStartedZohoFormProps) {
  return (
    <div className="w-full">
      <ZohoForm 
        className="w-full"
        height="532px"
        width="100%"
      />
    </div>
  );
}