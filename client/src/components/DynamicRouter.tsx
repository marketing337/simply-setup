import { useEffect, useState } from "react";
import { useWorkspaceBySlug, useLocationBySlug } from "@/lib/api";
import WorkspacePage from "@/pages/WorkspacePage";
import LocationPage from "@/pages/LocationPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface DynamicRouterProps {
  slug: string;
}

export default function DynamicRouter({ slug }: DynamicRouterProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isVirtualOffice, setIsVirtualOffice] = useState<boolean | null>(null);

  // Try to fetch both virtual office and location data
  useEffect(() => {
    const checkIfVirtualOffice = async () => {
      try {
        // Check if the slug matches a virtual office (using workspace API endpoint)
        const wsResponse = await fetch(`/api/workspaces/${slug}`);
        if (wsResponse.ok) {
          setIsVirtualOffice(true);
          setIsLoading(false);
          return;
        }

        // Check if the slug matches a location
        const locResponse = await fetch(`/api/locations/${slug}`);
        if (locResponse.ok) {
          setIsVirtualOffice(false);
          setIsLoading(false);
          return;
        }

        // If neither matches, default to location (which will show not found)
        setIsVirtualOffice(false);
        setIsLoading(false);
      } catch (error) {
        console.error("Error checking slug:", error);
        setIsVirtualOffice(false);
        setIsLoading(false);
      }
    };

    checkIfVirtualOffice();
  }, [slug]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Loading</h1>
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="mb-8">
            Please wait while we retrieve the information...
          </p>
        </div>
        <Footer location={null} />
      </>
    );
  }

  if (isVirtualOffice === true) {
    // This is a virtual office solution, so render the virtual office details page
    return <WorkspacePage />;
  } else {
    // This is a location (or not found), so render the location page
    return <LocationPage />;
  }
}