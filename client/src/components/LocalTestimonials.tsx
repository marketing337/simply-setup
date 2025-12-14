import { Location, Testimonial } from "@shared/schema";
import { useTestimonialsByLocationId } from "@/lib/api";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Quote } from "lucide-react";

interface LocalTestimonialsProps {
  location: Location;
}

export default function LocalTestimonials({ location }: LocalTestimonialsProps) {
  const { data: testimonials, isLoading } = useTestimonialsByLocationId(location?.id);

  // If there are no testimonials or they're still loading, don't render anything
  if ((testimonials?.length === 0 && !isLoading) || (isLoading && !testimonials)) {
    return null;
  }

  return (
    <div className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 lg:px-6">
        <header className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight leading-tight"
          >
            What Clients Say About Our {location.name} Offices
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed tracking-wide"
          >
            Trusted by businesses of all sizes for their virtual office needs in {location.name}
          </motion.p>
        </header>

        {isLoading ? (
          <TestimonialSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials && testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow relative border border-gray-100"
    >
      <Quote className="absolute top-5 left-5 h-9 w-9 text-primary/10" />
      <div className="relative">
        <blockquote>
          <p className="text-gray-700 mb-6 italic text-sm md:text-base leading-relaxed tracking-wide pl-4 py-1">
            "{testimonial.content}"
          </p>
        </blockquote>
        <footer className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
            {testimonial.name.substring(0, 1)}
          </div>
          <div className="ml-4">
            <h4 className="font-bold text-gray-900 text-sm md:text-base tracking-wide">{testimonial.name}</h4>
            <p className="text-gray-600 text-xs md:text-sm tracking-wide">{testimonial.company}</p>
          </div>
        </footer>
      </div>
    </motion.article>
  );
}

function TestimonialSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg p-6 border border-gray-100">
          <Skeleton className="h-24 w-full mb-6" />
          <div className="flex items-center">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="ml-4 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}