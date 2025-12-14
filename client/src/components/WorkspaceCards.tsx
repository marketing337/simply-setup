import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  MapPin,
  ArrowRight,
  CheckSquare,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Location, Workspace } from "@shared/schema";
import { formatCurrency } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { Container } from "@/components/ui/container";

interface WorkspaceCardsProps {
  location: Location;
}

export default function WorkspaceCards({ location }: WorkspaceCardsProps) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 3 },
      "(min-width: 1024px)": { slidesToScroll: 4 },
      "(min-width: 1280px)": { slidesToScroll: 5 },
    },
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await fetch(
          `/api/locations/${location.id}/workspaces`,
        );
        if (response.ok) {
          const data = await response.json();
          // Show more workspaces for the featured section
          setWorkspaces(data.slice(0, 12));
        }
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkspaces();
  }, [location.id]);

  const updateScrollButtons = () => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  };

  useEffect(() => {
    if (!emblaApi) return;
    updateScrollButtons();
    emblaApi.on("select", updateScrollButtons);
    emblaApi.on("reInit", updateScrollButtons);
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Workspaces in {location.name}
            </h2>
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!workspaces.length) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="site-container">
        <div className="text-center mb-12">
          <span className="text-primary text-xs font-semibold uppercase tracking-wider">
            Premium Workspaces
          </span>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-2">
            Top Coworking Spaces in {location.name}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore premium coworking spaces and flexible office solutions in{" "}
            {location.name}. Professional environments designed for productivity
            and growth.
          </p>
        </div>

        <div className="relative">
          {/* Navigation buttons */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-500">
              Swipe or use arrows to browse
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className="h-10 w-10 p-0 rounded-full border-2 hover:bg-primary hover:text-white hover:border-primary transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous workspaces</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={scrollNext}
                disabled={!canScrollNext}
                className="h-10 w-10 p-0 rounded-full border-2 hover:bg-primary hover:text-white hover:border-primary transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next workspaces</span>
              </Button>
            </div>
          </div>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {workspaces.map((workspace) => (
                <div
                  key={workspace.id}
                  className="flex-none w-full md:w-1/3 lg:w-1/4 xl:w-1/5"
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
                    <div className="relative h-40 bg-gradient-to-br from-blue-500 to-purple-600">
                      {workspace.images && workspace.images.length > 0 ? (
                        <img
                          src={workspace.images[0]}
                          alt={`${workspace.name} workspace`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
                          <Building2 className="h-20 w-20 text-white opacity-70" />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/20"></div>
                    </div>

                    <CardContent className="p-4">
                      <div className="mb-3">
                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                          {workspace.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <MapPin className="h-4 w-4 mr-1 text-primary" />
                          <span className="line-clamp-1">
                            {workspace.address}
                          </span>
                        </div>
                      </div>

                      {workspace.amenities &&
                        workspace.amenities.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {workspace.amenities
                              .slice(0, 3)
                              .map((amenity, index) => (
                                <div
                                  key={index}
                                  className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded-full"
                                >
                                  <CheckSquare className="h-3 w-3 mr-1 text-primary" />
                                  <span className="text-gray-700 font-medium">
                                    {amenity}
                                  </span>
                                </div>
                              ))}
                            {workspace.amenities.length > 3 && (
                              <span className="text-xs text-gray-500 px-2 py-1">
                                +{workspace.amenities.length - 3} more
                              </span>
                            )}
                          </div>
                        )}

                      <Button
                        asChild
                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-9 flex items-center justify-center"
                        size="sm"
                      >
                        <Link
                          href={`/workspaces/${workspace.slug}`}
                          className="flex items-center justify-center gap-2"
                        >
                          <span>View Details</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="px-8 py-3 border-2 hover:bg-primary hover:text-white hover:border-primary transition-colors"
          >
            <Link href={`/workspaces?location=${location.slug}`}>
              Browse All Spaces in {location.name}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
