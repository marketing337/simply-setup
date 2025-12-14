import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

interface MiniNavbarProps {
  locationSlug?: string | null;
}

export default function MiniNavbar({ locationSlug }: MiniNavbarProps) {
  const [activeSection, setActiveSection] = useState<string>("benefits");
  const [isSticky, setIsSticky] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  // Handle scrolling behavior
  useEffect(() => {
    const handleScroll = () => {
      const navbarElement = navbarRef.current;
      if (navbarElement) {
        const navbarPosition = navbarElement.getBoundingClientRect().top;
        setIsSticky(navbarPosition <= 0);
      }

      // Determine active section based on scroll position
      const sections = ["benefits", "how-it-works", "documents", "faq"];
      let currentSection = "benefits";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            currentSection = section;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to section smoothly
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -70; // Offset to account for the navbar height
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const baseRoute = locationSlug ? `/${locationSlug}` : "";

  return (
    <div ref={navbarRef} className="w-full bg-white border-b border-gray-200 relative z-50">
      <div
        className={cn(
          "transition-all duration-300 ease-in-out w-full bg-white/95 backdrop-blur-sm z-50",
          isSticky && "fixed top-0 left-0 shadow-md"
        )}
      >
        <div className="container max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-14 px-4 md:px-6">
            <nav className="flex items-center space-x-1 sm:space-x-4 md:space-x-8">
              <button
                onClick={() => scrollToSection("benefits")}
                className={cn(
                  "px-2 sm:px-3 py-2 text-sm sm:text-base font-medium transition-colors relative",
                  activeSection === "benefits"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Benefits
                {activeSection === "benefits" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </button>
              
              <button
                onClick={() => scrollToSection("how-it-works")}
                className={cn(
                  "px-2 sm:px-3 py-2 text-sm sm:text-base font-medium transition-colors relative",
                  activeSection === "how-it-works"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                How It Works
                {activeSection === "how-it-works" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </button>
              
              <button
                onClick={() => scrollToSection("documents")}
                className={cn(
                  "px-2 sm:px-3 py-2 text-sm sm:text-base font-medium transition-colors relative",
                  activeSection === "documents"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Documents
                {activeSection === "documents" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </button>
              
              <button
                onClick={() => scrollToSection("faq")}
                className={cn(
                  "px-2 sm:px-3 py-2 text-sm sm:text-base font-medium transition-colors relative",
                  activeSection === "faq"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                FAQ
                {activeSection === "faq" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}