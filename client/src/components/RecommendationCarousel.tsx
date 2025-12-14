import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { useLocation } from "wouter";
import { Workspace } from "@shared/schema";
import OptimizedImage from "./OptimizedImage";

interface WorkspaceRecommendation {
  workspaceId: number;
  reason: string;
  matchScore: number;
  workspace: Workspace;
}

interface RecommendationCarouselProps {
  recommendations: WorkspaceRecommendation[];
}

export default function RecommendationCarousel({ 
  recommendations 
}: RecommendationCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();

  // Handle next/previous controls
  const goToNext = () => {
    if (activeIndex < recommendations.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0); // Loop back to the beginning
    }
  };

  const goToPrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(recommendations.length - 1); // Loop to the end
    }
  };

  // Auto scroll the carousel every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 10000);

    return () => clearInterval(interval);
  }, [activeIndex, recommendations.length]);

  // Navigate to the workspace page using wouter's setLocation
  const viewWorkspace = (slug: string) => {
    setLocation(`/${slug}`);
  };

  // If there are no recommendations, return null
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="my-8 relative">
      <h2 className="text-2xl font-medium mb-6 text-center">
        AI-Powered Workspace Recommendations
      </h2>
      
      <div 
        ref={carouselRef}
        className="relative overflow-hidden rounded-lg"
      >
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {recommendations.map((recommendation, index) => {
            const { workspace, reason, matchScore } = recommendation;
            
            return (
              <Card 
                key={workspace.id}
                className="w-full flex-shrink-0 border rounded-lg overflow-hidden"
              >
                <div className="flex flex-col md:flex-row h-full">
                  {/* Image section */}
                  <div className="md:w-2/5 h-60 md:h-auto relative">
                    {workspace.mainImage ? (
                      <OptimizedImage
                        src={workspace.mainImage}
                        alt={workspace.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <p className="text-muted-foreground">No image available</p>
                      </div>
                    )}
                    
                    {/* Match score badge */}
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-primary text-white font-bold px-3 py-1">
                        {matchScore}% Match
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Content section */}
                  <div className="md:w-3/5 p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{workspace.name}</h3>
                      
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>{workspace.address}</span>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-md font-medium mb-1">Why this workspace is recommended:</p>
                        <p className="text-muted-foreground">{reason}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {workspace.amenities && workspace.amenities.slice(0, 4).map((amenity, i) => (
                          <Badge key={i} variant="outline" className="bg-secondary/10">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button 
                        onClick={() => viewWorkspace(workspace.slug)}
                        className="w-full md:w-auto"
                      >
                        View Workspace
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      
      {/* Navigation controls */}
      <div className="flex justify-between mt-4">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevious}
          className="rounded-full"
          aria-label="Previous recommendation"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center gap-2">
          {recommendations.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full p-0 ${
                index === activeIndex ? "bg-primary" : "bg-muted"
              }`}
              aria-label={`Go to recommendation ${index + 1}`}
            />
          ))}
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={goToNext}
          className="rounded-full"
          aria-label="Next recommendation"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}