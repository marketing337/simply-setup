import { useState, useEffect } from "react";
import { ExternalLink, LinkIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExternalResourceLink {
  anchor: string;
  url: string;
}

interface ExternalResourcesData {
  coreResources: ExternalResourceLink[];
  localResources: ExternalResourceLink[];
}

interface ExternalResourcesProps {
  citySlug: string;
  areaSlug?: string;
}

export default function ExternalResources({ citySlug, areaSlug }: ExternalResourcesProps) {
  const [resources, setResources] = useState<ExternalResourcesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExternalResources = async () => {
      if (!citySlug) return;

      setIsLoading(true);
      setError(null);

      try {
        const endpoint = areaSlug 
          ? `/api/external-links/${citySlug}/${areaSlug}`
          : `/api/external-links/${citySlug}`;
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch external resources: ${response.statusText}`);
        }

        const data = await response.json();
        setResources(data);
      } catch (err) {
        console.error("Error fetching external resources:", err);
        setError(err instanceof Error ? err.message : "Failed to load external resources");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExternalResources();
  }, [citySlug, areaSlug]);

  if (isLoading) {
    return (
      <section className="mt-8 space-y-4">
        <div className="h-6 bg-muted rounded animate-pulse w-48"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(2)].map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardHeader>
                <div className="h-5 bg-muted rounded w-32"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[...Array(4)].map((_, linkIndex) => (
                    <div key={linkIndex} className="h-4 bg-muted rounded w-full"></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (error || !resources) {
    return null; // Fail silently to not disrupt the page experience
  }

  return (
    <section className="mt-8 space-y-4" id="external-resources">
      <h2 className="text-xl font-semibold text-gray-900">Helpful compliance links</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Core Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-blue-600" />
              Core Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {resources.coreResources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors group"
                  >
                    <ExternalLink className="h-4 w-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{link.anchor}</span>
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Local Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-green-600" />
              Local Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            {resources.localResources.length > 0 ? (
              <ul className="space-y-3">
                {resources.localResources.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors group"
                    >
                      <ExternalLink className="h-4 w-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-sm">{link.anchor}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                Local compliance resources are being generated...
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}