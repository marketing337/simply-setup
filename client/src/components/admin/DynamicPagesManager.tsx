import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, FileText, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { Location, Area, DynamicPage } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

interface DynamicPagesManagerProps {
  locations: Location[];
}

export default function DynamicPagesManager({ locations }: DynamicPagesManagerProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [selectedCities, setSelectedCities] = useState<number[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<number[]>([]);
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const purposes = ["GST Registration", "Company Registration"];

  // Fetch all areas for selected cities
  const { data: allAreas = [] } = useQuery<Area[]>({
    queryKey: ["/api/areas", selectedCities],
    queryFn: async () => {
      if (selectedCities.length === 0) return [];
      
      const areaPromises = selectedCities.map(async (locationId) => {
        const response = await fetch(`/api/locations/${locationId}/areas`);
        if (!response.ok) return [];
        return response.json();
      });
      
      const areasArrays = await Promise.all(areaPromises);
      return areasArrays.flat();
    },
    enabled: selectedCities.length > 0,
  });

  // Fetch existing dynamic pages
  const { data: existingPages = [], isLoading } = useQuery<DynamicPage[]>({
    queryKey: ["/api/dynamic-pages"],
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest(`/api/admin/dynamic-pages/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dynamic-pages"] });
      toast({
        title: "Success",
        description: "Dynamic page deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete page",
        variant: "destructive",
      });
    },
  });

  const toggleCity = (locationId: number) => {
    setSelectedCities((prev) =>
      prev.includes(locationId)
        ? prev.filter((id) => id !== locationId)
        : [...prev, locationId]
    );
  };

  const toggleArea = (areaId: number) => {
    setSelectedAreas((prev) =>
      prev.includes(areaId)
        ? prev.filter((id) => id !== areaId)
        : [...prev, areaId]
    );
  };

  const togglePurpose = (purpose: string) => {
    setSelectedPurposes((prev) =>
      prev.includes(purpose)
        ? prev.filter((p) => p !== purpose)
        : [...prev, purpose]
    );
  };

  const generateSlug = (areaName: string, purpose: string): string => {
    const areaSlug = areaName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const purposeSlug = purpose.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `${areaSlug}-${purposeSlug}`;
  };

  const generateContent = (areaName: string, cityName: string, purpose: string) => {
    const purposeLower = purpose.toLowerCase();
    
    const overview = `Looking for a professional business address for your ${purpose} in ${areaName}, ${cityName}? Our virtual office solutions provide you with a prestigious business address without the overhead costs of a physical office. Whether you're a startup, freelancer, or established business, we offer the perfect solution to establish your professional presence in ${areaName}. Get started with ${purpose} using our verified business address and complete documentation support.`;

    let benefitsArray: string[] = [];
    
    if (purposeLower.includes('gst')) {
      benefitsArray = [
        `Get a GST-compliant business address in prime ${areaName} location`,
        `Complete documentation support for ${purpose} in ${cityName}`,
        `Expert assistance with GST filing and compliance`,
        `Professional mail handling and forwarding services`,
        `Access to meeting rooms and coworking spaces`,
        `Verified address accepted by GST department`,
        `Quick registration process - Get started in 24-48 hours`,
        `Cost-effective solution - Save up to 80% compared to physical office`,
      ];
    } else if (purposeLower.includes('company registration')) {
      benefitsArray = [
        `MCA-approved registered office address in ${areaName}, ${cityName}`,
        `Complete ${purpose} assistance with documentation`,
        `Digital Signature Certificate (DSC) procurement support`,
        `Director Identification Number (DIN) filing assistance`,
        `MOA & AOA preparation by experts`,
        `ROC filing and compliance support`,
        `Professional business address that builds credibility`,
        `Fast-track registration - Get incorporated in 15-20 days`,
      ];
    }

    const whyUsArray = [
      `Prime Location: ${areaName} is one of the most sought-after business districts in ${cityName}, providing excellent connectivity and prestigious address`,
      `Verified & Compliant: Our business addresses are verified and accepted by government authorities for ${purpose}`,
      `All-Inclusive Service: From mail handling to meeting room access, we provide everything you need to run your business professionally`,
      `Expert Support: Our team has helped 5000+ businesses with their ${purpose} and business setup requirements`,
      `Cost-Effective: Save up to 80% compared to traditional office rentals while maintaining a professional business presence`,
      `Quick Setup: Get your business address and start your ${purpose} process within 24-48 hours`,
      `Flexible Plans: Choose from multiple plans tailored for startups, SMEs, and enterprises`,
      `Pan-India Presence: Expand to multiple cities with our virtual office network across 50+ locations in India`,
    ];

    return {
      overview,
      benefits: benefitsArray.join('|||'),
      whyUs: whyUsArray.join('|||'),
    };
  };

  const handleBulkGenerate = async () => {
    if (selectedAreas.length === 0 || selectedPurposes.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select at least one area and one purpose",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const pagesToCreate = [];

      for (const areaId of selectedAreas) {
        const area = allAreas.find((a) => a.id === areaId);
        if (!area) continue;

        const location = locations.find((l) => l.id === area.locationId);
        if (!location) continue;

        for (const purpose of selectedPurposes) {
          const slug = generateSlug(area.name, purpose);
          const content = generateContent(area.name, location.name, purpose);

          pagesToCreate.push({
            areaName: area.name,
            cityName: location.name,
            purpose,
            slug,
            overviewContent: content.overview,
            benefitsContent: content.benefits,
            whyUsContent: content.whyUs,
            isActive: true,
          });
        }
      }

      const response = await apiRequest("/api/admin/dynamic-pages/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pagesToCreate),
      });

      queryClient.invalidateQueries({ queryKey: ["/api/dynamic-pages"] });

      const { created = 0, skipped = 0, message } = response as { created: number; skipped: number; message: string };

      toast({
        title: "Success",
        description: message || (skipped > 0 
          ? `Created ${created} pages, skipped ${skipped} duplicates`
          : `Successfully created ${created} dynamic pages`),
      });

      // Reset selections
      setSelectedCities([]);
      setSelectedAreas([]);
      setSelectedPurposes([]);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate pages",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const selectedCitiesNames = locations
    .filter((l) => selectedCities.includes(l.id))
    .map((l) => l.name);

  const selectedAreasData = allAreas.filter((a) => selectedAreas.includes(a.id));

  const totalPagesToGenerate = selectedAreas.length * selectedPurposes.length;

  return (
    <div className="space-y-6">
      <Alert>
        <FileText className="h-4 w-4" />
        <AlertDescription>
          Bulk generate dynamic Virtual Office pages for multiple cities, areas, and purposes.
          Each combination will create a unique page with SEO-optimized content.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cities Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">1. Select Cities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {locations.map((location) => (
              <div
                key={location.id}
                className="flex items-center space-x-2"
                data-testid={`checkbox-city-${location.id}`}
              >
                <input
                  type="checkbox"
                  id={`city-${location.id}`}
                  checked={selectedCities.includes(location.id)}
                  onChange={() => toggleCity(location.id)}
                  className="h-4 w-4"
                />
                <label htmlFor={`city-${location.id}`} className="text-sm cursor-pointer">
                  {location.name}
                </label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Areas Selection */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">2. Select Areas</CardTitle>
              {allAreas.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (selectedAreas.length === allAreas.length) {
                      setSelectedAreas([]);
                    } else {
                      setSelectedAreas(allAreas.map((a) => a.id));
                    }
                  }}
                  data-testid="button-select-all-areas"
                >
                  {selectedAreas.length === allAreas.length ? "Deselect All" : "Select All"}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {selectedCities.length === 0 ? (
              <p className="text-sm text-muted-foreground">Select cities first</p>
            ) : allAreas.length === 0 ? (
              <p className="text-sm text-muted-foreground">No areas found for selected cities</p>
            ) : (
              allAreas.map((area) => (
                <div
                  key={area.id}
                  className="flex items-center space-x-2"
                  data-testid={`checkbox-area-${area.id}`}
                >
                  <input
                    type="checkbox"
                    id={`area-${area.id}`}
                    checked={selectedAreas.includes(area.id)}
                    onChange={() => toggleArea(area.id)}
                    className="h-4 w-4"
                  />
                  <label htmlFor={`area-${area.id}`} className="text-sm cursor-pointer">
                    {area.name}
                    <span className="text-muted-foreground ml-1">
                      ({locations.find((l) => l.id === area.locationId)?.name})
                    </span>
                  </label>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Purposes Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">3. Select Purposes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {purposes.map((purpose) => (
              <div
                key={purpose}
                className="flex items-center space-x-2"
                data-testid={`checkbox-purpose-${purpose.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <input
                  type="checkbox"
                  id={`purpose-${purpose}`}
                  checked={selectedPurposes.includes(purpose)}
                  onChange={() => togglePurpose(purpose)}
                  className="h-4 w-4"
                />
                <label htmlFor={`purpose-${purpose}`} className="text-sm cursor-pointer">
                  {purpose}
                </label>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Summary and Generate */}
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <Label>Cities: {selectedCities.length}</Label>
              <p className="text-muted-foreground mt-1">
                {selectedCitiesNames.join(", ") || "None"}
              </p>
            </div>
            <div>
              <Label>Areas: {selectedAreas.length}</Label>
              <p className="text-muted-foreground mt-1">
                {selectedAreasData.map((a) => a.name).join(", ") || "None"}
              </p>
            </div>
            <div>
              <Label>Purposes: {selectedPurposes.length}</Label>
              <p className="text-muted-foreground mt-1">
                {selectedPurposes.join(", ") || "None"}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <p className="text-sm font-medium">
                Total pages to generate: <Badge variant="secondary">{totalPagesToGenerate}</Badge>
              </p>
            </div>
            <Button
              onClick={handleBulkGenerate}
              disabled={isGenerating || totalPagesToGenerate === 0}
              data-testid="button-generate-pages"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Generate {totalPagesToGenerate} Pages
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Existing Pages */}
      <Card>
        <CardHeader>
          <CardTitle>Existing Dynamic Pages ({existingPages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <Loader2 className="h-8 w-8 animate-spin mx-auto" />
            </div>
          ) : existingPages.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No dynamic pages created yet. Use the generator above to create pages.
            </p>
          ) : (
            <div className="space-y-2">
              {existingPages.map((page) => (
                <div
                  key={page.id}
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-accent"
                  data-testid={`page-item-${page.id}`}
                >
                  <div className="flex-1">
                    <p className="font-medium">{page.areaName} - {page.purpose}</p>
                    <p className="text-sm text-muted-foreground">
                      {page.cityName} • /virtual-office/{page.slug}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {page.isActive && (
                      <Badge variant="outline" className="bg-green-50">
                        Active
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteMutation.mutate(page.id)}
                      disabled={deleteMutation.isPending}
                      data-testid={`button-delete-${page.id}`}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
