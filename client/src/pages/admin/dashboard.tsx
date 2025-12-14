import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "@/hooks/useLocation";
import LocationsManager from "@/components/admin/LocationsManager";
import SalesPersonsManager from "@/components/admin/SalesPersonsManager";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LogOut, 
  Map, 
  Settings, 
  Home,
  MapPin,
  User, 
  FileText,
  Users
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("content");
  const { user, logoutMutation } = useAuth();
  const { allLocations } = useLocation();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-slate-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Settings className="h-6 w-6" />
            <h1 className="text-xl font-bold">Virtual Office Admin</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-slate-800 rounded-full px-3 py-1">
              <User className="h-4 w-4 mr-2" />
              <span className="text-sm">{user?.username}</span>
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-white hover:bg-slate-800" 
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              <LogOut className="h-4 w-4 mr-2" />
              {logoutMutation.isPending ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
            <p className="text-gray-600">
              Manage your Virtual Office locations and areas
            </p>
          </div>
          
          <div className="flex items-center bg-blue-50 rounded-lg px-4 py-2 border border-blue-200">
            <Settings className="h-4 w-4 text-blue-500 mr-2" />
            <span className="text-sm text-blue-700">
              Admin Panel
            </span>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 w-[800px]">
            <TabsTrigger value="content" className="flex items-center">
              <Map className="h-4 w-4 mr-2" />
              <span>Locations</span>
            </TabsTrigger>
            <TabsTrigger value="salespersons" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span>Sales Team</span>
            </TabsTrigger>
            <TabsTrigger value="blogs" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              <span>Blog Posts</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium mb-4">All Locations</h3>
              <LocationsManager locations={allLocations} />
            </div>
          </TabsContent>

          <TabsContent value="salespersons" className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <SalesPersonsManager />
            </div>
          </TabsContent>

          <TabsContent value="blogs" className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium mb-4">Blog Posts</h3>
              <p className="text-gray-500 mb-6">Manage blog posts and content across the website.</p>
              
              <div className="text-center py-10">
                <Button variant="outline" size="lg">
                  <MapPin className="h-4 w-4 mr-2" />
                  Go to Blog Manager
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium mb-4">General Settings</h3>
              <p className="text-gray-500 mb-6">Configure global website settings and preferences.</p>
              
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h4 className="text-sm font-medium mb-2">Site Information</h4>
                  <p className="text-xs text-gray-500">Basic information about your website</p>
                </div>
                
                <div className="border-b pb-4">
                  <h4 className="text-sm font-medium mb-2">SEO Settings</h4>
                  <p className="text-xs text-gray-500">Configure global SEO settings</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Contact Information</h4>
                  <p className="text-xs text-gray-500">Update global contact details</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8 py-4">
        <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
          <p>Virtual Offices Admin Panel © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}