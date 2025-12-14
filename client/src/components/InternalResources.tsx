import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkIcon, ArrowRight } from "lucide-react";

interface InternalLink {
  anchor: string;
  url: string;
}

interface InternalResourcesData {
  relatedResources: InternalLink[];
}

interface InternalResourcesProps {
  citySlug: string;
  areaSlug?: string;
}

export default function InternalResources({ citySlug, areaSlug }: InternalResourcesProps) {
  const [resources, setResources] = useState<InternalResourcesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInternalResources = async () => {
      if (!citySlug) return;

      setIsLoading(true);
      setError(null);

      try {
        const endpoint = areaSlug 
          ? `/api/internal-links/${citySlug}/${areaSlug}`
          : `/api/internal-links/${citySlug}`;
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch internal resources: ${response.statusText}`);
        }

        const data = await response.json();
        setResources(data);
      } catch (err) {
        console.error("Error fetching internal resources:", err);
        setError(err instanceof Error ? err.message : "Failed to load internal resources");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInternalResources();
  }, [citySlug, areaSlug]);

  if (isLoading) {
    return (
      <section className="mt-6 space-y-4" id="internal-resources">
        <h2 className="text-xl font-semibold text-gray-900">Related resources</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded flex-1 animate-pulse" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-6 space-y-4" id="internal-resources">
        <h2 className="text-xl font-semibold text-gray-900">Related resources</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-red-600">Unable to load related resources at this time.</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (!resources || !resources.relatedResources || resources.relatedResources.length === 0) {
    return null; // Don't render anything if no internal links are available
  }

  return (
    <section className="mt-6 space-y-4" id="internal-resources">
      {/* AI-INTERNAL-LINKS */}
      <h2 className="text-xl font-semibold text-gray-900">Related resources</h2>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-blue-600" />
            Helpful SimplySetup guides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {resources.relatedResources.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors group"
                >
                  <ArrowRight className="h-4 w-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                  <span className="text-sm">{link.anchor}</span>
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      {/* /AI-INTERNAL-LINKS */}
    </section>
  );
}