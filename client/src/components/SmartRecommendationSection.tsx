import React, { useState } from "react";
import RecommendationForm from "./RecommendationForm";
import RecommendationCarousel from "./RecommendationCarousel";
import { Workspace } from "@shared/schema";

interface WorkspaceRecommendation {
  workspaceId: number;
  reason: string;
  matchScore: number;
  workspace: Workspace;
}

interface SmartRecommendationSectionProps {
  locationId?: number;
  locationName?: string;
}

export default function SmartRecommendationSection({
  locationId,
  locationName
}: SmartRecommendationSectionProps) {
  const [recommendations, setRecommendations] = useState<WorkspaceRecommendation[]>([]);
  const [hasRecommendations, setHasRecommendations] = useState(false);

  const handleRecommendationsReceived = (newRecommendations: WorkspaceRecommendation[]) => {
    setRecommendations(newRecommendations);
    setHasRecommendations(newRecommendations.length > 0);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl md:text-2xl font-medium mb-4 text-center">
          Find Your Perfect Workspace
        </h2>

        {!hasRecommendations && (
          <p className="text-muted-foreground text-center mb-5 text-sm md:text-base">
            Our AI-powered recommendation engine will help you discover workspaces that match your unique business needs.
          </p>
        )}

        <RecommendationForm
          locationId={locationId}
          locationName={locationName}
          onRecommendationsReceived={handleRecommendationsReceived}
        />

        {hasRecommendations && (
          <RecommendationCarousel recommendations={recommendations} />
        )}
      </div>
    </div>
  );
}