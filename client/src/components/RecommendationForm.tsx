import React, { useState } from "react";
import { useWorkspaceRecommendations } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface RecommendationFormProps {
  locationId?: number;
  locationName?: string;
  onRecommendationsReceived: (recommendations: any[]) => void;
}

export default function RecommendationForm({
  locationId,
  locationName,
  onRecommendationsReceived,
}: RecommendationFormProps) {
  const [businessType, setBusinessType] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);

  const { mutateAsync: getRecommendations } = useWorkspaceRecommendations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const preferences = {
        businessType,
        teamSize,
        budget,
        locationId,
        locationName
      };
      
      const recommendations = await getRecommendations(preferences);
      
      // Pass recommendations to parent component
      onRecommendationsReceived(recommendations);
    } catch (error) {
      console.error("Error getting workspace recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-md mb-8">
      <CardContent className="pt-6">
        <h3 className="text-xl font-medium mb-4">
          Get Smart Workspace Recommendations
        </h3>
        <p className="text-muted-foreground mb-5">
          Tell us a bit about your business needs and our AI will suggest workspaces that match your requirements.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="businessType" className="text-sm font-medium">
                Business Type
              </label>
              <Select
                value={businessType}
                onValueChange={setBusinessType}
              >
                <SelectTrigger id="businessType">
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Legal">Legal</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Consulting">Consulting</SelectItem>
                  <SelectItem value="Real Estate">Real Estate</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="teamSize" className="text-sm font-medium">
                Team Size
              </label>
              <Select
                value={teamSize}
                onValueChange={setTeamSize}
              >
                <SelectTrigger id="teamSize">
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5">1-5 people</SelectItem>
                  <SelectItem value="6-10">6-10 people</SelectItem>
                  <SelectItem value="11-25">11-25 people</SelectItem>
                  <SelectItem value="26-50">26-50 people</SelectItem>
                  <SelectItem value="50+">50+ people</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="budget" className="text-sm font-medium">
                Monthly Budget (₹)
              </label>
              <Select
                value={budget}
                onValueChange={setBudget}
              >
                <SelectTrigger id="budget">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Under ₹5,000">Under ₹5,000</SelectItem>
                  <SelectItem value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</SelectItem>
                  <SelectItem value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</SelectItem>
                  <SelectItem value="₹20,000 - ₹50,000">₹20,000 - ₹50,000</SelectItem>
                  <SelectItem value="₹50,000+">₹50,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={loading || (!businessType && !teamSize && !budget)}
              className="w-full md:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finding workspaces...
                </>
              ) : (
                "Get Recommendations"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}