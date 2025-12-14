import { useState, useEffect } from 'react';
import { Location } from '@shared/schema';
import axios from 'axios';

interface VernacularSalutationProps {
  location: Location;
}

interface SalutationData {
  vernacularSalutation: string;
  vernacularLanguage: string;
  vernacularTranslation: string;
}

export default function VernacularSalutation({ location }: VernacularSalutationProps) {
  const [salutation, setSalutation] = useState<SalutationData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchSalutation = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/locations/${location.slug}/salutation`);
        
        if (response.data && response.data.vernacularSalutation) {
          setSalutation(response.data);
        }
      } catch (error) {
        console.error('Error fetching vernacular salutation:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSalutation();
  }, [location.slug]);
  
  if (loading) {
    return null; // Don't show anything while loading
  }
  
  if (!salutation || !salutation.vernacularSalutation) {
    return null; // Don't show if no salutation available
  }
  
  return (
    <div className="text-center mb-3">
      <span className="inline-block bg-gray-50 px-4 py-1.5 rounded-full text-lg md:text-xl font-medium text-gray-800">
        {salutation.vernacularSalutation}
      </span>
    </div>
  );
}