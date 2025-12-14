import { useState } from "react";
import { useLocation as useWouterLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useLocation } from "@/hooks/useLocation";
import LocationsManager from "@/components/admin/LocationsManager";
import AreasManager from "@/components/admin/AreasManager";
import BlogManager from "@/components/admin/BlogManager";
import WorkspacesManager from "@/components/admin/WorkspacesManager";
import VendorsManager from "@/components/admin/VendorsManager";
import SalesPersonsManager from "@/components/admin/SalesPersonsManager";
import PricingCatalogManager from "@/components/admin/PricingCatalogManager";
import OrdersManager from "@/components/admin/OrdersManager";
import CompanyManager from "@/components/admin/CompanyManager";
import AlertManager from "@/components/admin/AlertManager";
import { OffersManager } from "@/components/admin/OffersManager";
import AltTextManager from "@/components/admin/AltTextManager";
import ServicesManager from "@/components/admin/ServicesManager";
import DynamicPagesManager from "@/components/admin/DynamicPagesManager";
import { 
  ShoppingCart, 
  Building2, 
  MapPin, 
  Briefcase, 
  Store, 
  IndianRupee, 
  Globe, 
  Users, 
  PenTool, 
  Bell, 
  Tag, 
  Home,
  ChevronLeft,
  ChevronRight,
  Filter,
  Settings,
  FileText,
  Layers
} from "lucide-react";

const adminSections = [
  { 
    id: "orders", 
    label: "Orders", 
    icon: ShoppingCart, 
    description: "Manage customer orders and payments",
    requiresLocation: false 
  },
  { 
    id: "companies", 
    label: "Companies", 
    icon: Building2, 
    description: "Company database management",
    requiresLocation: false 
  },
  { 
    id: "areas", 
    label: "Area Pages", 
    icon: MapPin, 
    description: "Manage area pages within cities",
    requiresLocation: true 
  },
  { 
    id: "workspaces", 
    label: "Workspaces", 
    icon: Briefcase, 
    description: "Manage workspace listings",
    requiresLocation: false 
  },
  { 
    id: "vendors", 
    label: "Vendors", 
    icon: Store, 
    description: "Workspace providers and partners",
    requiresLocation: false 
  },
  { 
    id: "pricing", 
    label: "Pricing", 
    icon: IndianRupee, 
    description: "Service packages and pricing",
    requiresLocation: true 
  },
  { 
    id: "locations", 
    label: "Locations", 
    icon: Globe, 
    description: "Manage cities and locations",
    requiresLocation: false 
  },
  { 
    id: "salespersons", 
    label: "Sales Team", 
    icon: Users, 
    description: "Sales team management",
    requiresLocation: false 
  },
  { 
    id: "blog", 
    label: "Blog", 
    icon: PenTool, 
    description: "Create and manage blog posts",
    requiresLocation: false 
  },
  { 
    id: "alerts", 
    label: "Alerts", 
    icon: Bell, 
    description: "Site announcements and updates",
    requiresLocation: false 
  },
  { 
    id: "offers", 
    label: "Offers", 
    icon: Tag, 
    description: "Deals and promotional content",
    requiresLocation: false 
  },
  { 
    id: "services", 
    label: "Services", 
    icon: FileText, 
    description: "Country-specific service pages and orders",
    requiresLocation: false 
  },
  { 
    id: "seo-alttext", 
    label: "AI-SEO Alt Text", 
    icon: Settings, 
    description: "Generate and manage SEO-optimized image alt text",
    requiresLocation: false 
  },
  { 
    id: "dynamic-pages", 
    label: "Dynamic Pages", 
    icon: Layers, 
    description: "Bulk create virtual office pages for areas and purposes",
    requiresLocation: false 
  }
];

export default function AdminPage() {
  const { allLocations } = useLocation();
  const [, navigate] = useWouterLocation();
  const [activeSection, setActiveSection] = useState("companies");
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);

  // Auto-select first location if available
  const currentLocation = selectedLocationId 
    ? allLocations?.find(loc => loc.id === selectedLocationId) 
    : allLocations?.[0];

  const activeConfig = adminSections.find(section => section.id === activeSection);

  if (!allLocations || allLocations.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="p-8 max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle>Loading Admin Dashboard</CardTitle>
            <CardDescription>Initializing admin interface...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!currentLocation && activeConfig?.requiresLocation) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="p-8 max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle>No locations available</CardTitle>
            <CardDescription>Please create a location to continue.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case "orders":
        return <OrdersManager />;
      case "companies":
        return (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h1 className="text-2xl font-semibold">Company Database Management</h1>
              <p className="text-muted-foreground mt-2">
                Bulk upload CSV files to add companies and automatically generate company pages
              </p>
            </div>
            <CompanyManager />
          </div>
        );
      case "areas":
        return (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h1 className="text-2xl font-semibold">Manage Area Pages</h1>
              <p className="text-muted-foreground mt-2">
                Create and edit area pages within cities like Mumbai/Nariman Point
              </p>
            </div>
            <AreasManager currentLocation={currentLocation!} />
          </div>
        );
      case "workspaces":
        return (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h1 className="text-2xl font-semibold">Manage Workspaces</h1>
              <p className="text-muted-foreground mt-2">
                Create and manage workspace listings for each location
              </p>
            </div>
            <WorkspacesManager />
          </div>
        );
      case "locations":
        return (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h1 className="text-2xl font-semibold">Manage Locations</h1>
              <p className="text-muted-foreground mt-2">
                Manage cities and their content
              </p>
            </div>
            <LocationsManager locations={allLocations} />
          </div>
        );
      case "vendors":
        return (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h1 className="text-2xl font-semibold">Manage Workspace Vendors</h1>
              <p className="text-muted-foreground mt-2">
                Create and manage workspace providers like WeWork, Awfis, etc.
              </p>
            </div>
            <VendorsManager />
          </div>
        );
      case "pricing":
        return (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h1 className="text-2xl font-semibold">Manage Service Pricing</h1>
              <p className="text-muted-foreground mt-2">
                Create and manage virtual office service packages and pricing for this location
              </p>
            </div>
            <PricingCatalogManager currentLocation={currentLocation!} />
          </div>
        );
      case "salespersons":
        return (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h1 className="text-2xl font-semibold">Manage Sales Team</h1>
              <p className="text-muted-foreground mt-2">
                Add and manage sales team members who will appear on workspace pages
              </p>
            </div>
            <SalesPersonsManager />
          </div>
        );
      case "blog":
        return (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h1 className="text-2xl font-semibold">Manage Blog Posts</h1>
              <p className="text-muted-foreground mt-2">
                Create, edit, and publish blog articles
              </p>
            </div>
            <BlogManager />
          </div>
        );
      case "alerts":
        return (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h1 className="text-2xl font-semibold">Manage Updates & Alerts</h1>
              <p className="text-muted-foreground mt-2">
                Create and manage homepage alerts and announcements for users
              </p>
            </div>
            <AlertManager />
          </div>
        );
      case "offers":
        return (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h1 className="text-2xl font-semibold">Manage Offers & Deals</h1>
              <p className="text-muted-foreground mt-2">
                Create and manage special offers, deals, and promotional content for the offers page
              </p>
            </div>
            <OffersManager />
          </div>
        );
      case "services":
        return (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h1 className="text-2xl font-semibold">Services Management</h1>
              <p className="text-muted-foreground mt-2">
                Create and manage country-specific service pages like GST Registration (India) or Company Registration (Singapore)
              </p>
            </div>
            <ServicesManager />
          </div>
        );
      case "seo-alttext":
        return (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h1 className="text-2xl font-semibold">AI-SEO Alt Text Generator</h1>
              <p className="text-muted-foreground mt-2">
                Generate and manage SEO-optimized image alt text for workspace pages using AI
              </p>
            </div>
            <AltTextManager />
          </div>
        );
      case "dynamic-pages":
        return (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h1 className="text-2xl font-semibold">Dynamic Virtual Office Pages</h1>
              <p className="text-muted-foreground mt-2">
                Bulk create virtual office landing pages for specific areas and purposes (GST Registration, Company Registration)
              </p>
            </div>
            <DynamicPagesManager locations={allLocations} />
          </div>
        );
      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50/50">
      {/* Left Sidebar - Navigation */}
      <div className={`${leftSidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {!leftSidebarCollapsed && (
            <div className="flex items-center space-x-2">
              <Home className="h-6 w-6 text-blue-600" />
              <h2 className="font-semibold text-lg">Admin Panel</h2>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
            className="p-2"
          >
            {leftSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-2 py-4">
          <div className="space-y-2">
            {adminSections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <Button
                  key={section.id}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full ${leftSidebarCollapsed ? 'px-2' : 'justify-start px-3'} h-10 transition-all`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <Icon className={`h-4 w-4 ${leftSidebarCollapsed ? '' : 'mr-2'}`} />
                  {!leftSidebarCollapsed && <span>{section.label}</span>}
                </Button>
              );
            })}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            className={`w-full ${leftSidebarCollapsed ? 'px-2' : 'justify-start px-3'} h-10`}
            onClick={() => navigate("/")}
          >
            <Home className={`h-4 w-4 ${leftSidebarCollapsed ? '' : 'mr-2'}`} />
            {!leftSidebarCollapsed && <span>Return to Site</span>}
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-xl font-semibold">{activeConfig?.label}</h1>
                <p className="text-sm text-muted-foreground">{activeConfig?.description}</p>
              </div>
              {activeConfig?.requiresLocation && currentLocation && (
                <Badge variant="secondary" className="ml-4">
                  <Globe className="h-3 w-3 mr-1" />
                  {currentLocation.name}
                </Badge>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
              className="md:hidden"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Content */}
          <div className="flex-1 p-6 overflow-auto">
            {renderContent()}
          </div>

          {/* Right Sidebar - Context & Filters */}
          <div className={`${rightSidebarCollapsed ? 'w-0' : 'w-80'} transition-all duration-300 bg-white border-l border-gray-200 overflow-hidden`}>
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-medium">Context & Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
                className="p-2"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-6">
                {/* Location Selector - shown only for location-dependent sections */}
                {activeConfig?.requiresLocation && (
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Current Location</Label>
                    <Select
                      value={currentLocation?.id.toString() || ""}
                      onValueChange={(value) => setSelectedLocationId(parseInt(value))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {allLocations.map((location) => (
                          <SelectItem key={location.id} value={location.id.toString()}>
                            {location.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Quick Stats */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Quick Stats</Label>
                  <Card className="p-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Locations</span>
                        <span className="font-medium">{allLocations.length}</span>
                      </div>
                      {currentLocation && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Current Location</span>
                          <Badge variant="outline" className="text-xs">{currentLocation.name}</Badge>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Quick Actions</Label>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => setActiveSection("companies")}>
                      <Building2 className="h-4 w-4 mr-2" />
                      Companies
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => setActiveSection("workspaces")}>
                      <Briefcase className="h-4 w-4 mr-2" />
                      Workspaces
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => setActiveSection("orders")}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Orders
                    </Button>
                  </div>
                </div>

                {/* Help & Support */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Help & Support</Label>
                  <Card className="p-3">
                    <div className="text-xs text-muted-foreground space-y-2">
                      <p>Need help with the admin panel? Check the documentation or contact support.</p>
                      <Button variant="link" className="h-auto p-0 text-xs">
                        View Documentation
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}