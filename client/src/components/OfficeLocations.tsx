import { Location, Office } from "@shared/schema";
import { useOfficesByLocationId } from "@/lib/api";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, ArrowRight } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";

interface OfficeLocationsProps {
  location: Location;
}

export default function OfficeLocations({ location }: OfficeLocationsProps) {
  const { data: offices, isLoading } = useOfficesByLocationId(location?.id);

  // If there are no offices or they're still loading, don't render anything
  if ((offices?.length === 0 && !isLoading) || (isLoading && !offices)) {
    return null;
  }

  const getOfficeImage = (office: Office) => {
    if (office.image) {
      return office.image;
    }
    
    // Fall back to location's office image or a default
    return location.officeImage || "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80";
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Our Office Locations in {location.name}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Premium addresses in the most prestigious areas of {location.name}
          </motion.p>
        </div>

        {isLoading ? (
          <OfficesSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offices && offices.map((office, index) => (
              <OfficeCard 
                key={office.id} 
                office={office} 
                getImage={getOfficeImage} 
                index={index}
                location={location}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function OfficeCard({ 
  office, 
  getImage, 
  index,
  location
}: { 
  office: Office; 
  getImage: (office: Office) => string; 
  index: number;
  location: Location;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="h-64 relative overflow-hidden">
        <OptimizedImage 
          src={getImage(office)} 
          alt={`${office.name} - Virtual office location in ${location.name}`} 
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{office.name}</h3>
        <div className="space-y-4 mb-6">
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <span className="text-gray-700">{office.address}</span>
          </div>
          <div className="flex items-start space-x-3">
            <Mail className="h-5 w-5 text-primary mt-0.5" />
            <span className="text-gray-700">hello@simplysetup.co</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500">Starting from</span>
            <div className="text-2xl font-bold text-gray-900">₹999<span className="text-sm font-normal text-gray-500">/month</span></div>
          </div>
          <Button className="gap-1">
            View Details <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function OfficesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[1, 2].map((i) => (
        <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
          <Skeleton className="h-64 w-full" />
          <div className="p-8">
            <Skeleton className="h-8 w-48 mb-3" />
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-full" />
              </div>
              <div className="flex items-start space-x-3">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-32" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-7 w-32" />
              </div>
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}