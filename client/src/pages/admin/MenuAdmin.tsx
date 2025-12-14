import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Menu as MenuIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { MenuSection, MenuItem } from "@shared/schema";

export default function MenuAdmin() {
  const [selectedSection, setSelectedSection] = useState<MenuSection | null>(null);
  const [showSectionDialog, setShowSectionDialog] = useState(false);
  const [showItemDialog, setShowItemDialog] = useState(false);
  const [editingSection, setEditingSection] = useState<MenuSection | null>(null);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [sectionForm, setSectionForm] = useState({
    title: "",
    countryCode: "IN",
    displayOrder: 0,
    isActive: true
  });
  const [itemForm, setItemForm] = useState({
    sectionId: 0,
    title: "",
    description: "",
    url: "",
    displayOrder: 0,
    isActive: true
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all menu sections
  const { data: sections = [], isLoading: sectionsLoading } = useQuery({
    queryKey: ["/api/admin/menu-sections"],
    queryFn: () => apiRequest("/api/admin/menu-sections")
  });

  // Fetch menu items for selected section
  const { data: items = [], isLoading: itemsLoading } = useQuery({
    queryKey: ["/api/menu-items", selectedSection?.id],
    queryFn: () => apiRequest(`/api/menu-items/${selectedSection?.id}`),
    enabled: !!selectedSection
  });

  // Section mutations
  const createSectionMutation = useMutation({
    mutationFn: (data: any) => apiRequest("/api/admin/menu-sections", {
      method: "POST",
      body: JSON.stringify(data)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/menu-sections"] });
      setShowSectionDialog(false);
      resetSectionForm();
      toast({ title: "Section created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create section", variant: "destructive" });
    }
  });

  const updateSectionMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => 
      apiRequest(`/api/admin/menu-sections/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/menu-sections"] });
      setShowSectionDialog(false);
      resetSectionForm();
      setEditingSection(null);
      toast({ title: "Section updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update section", variant: "destructive" });
    }
  });

  const deleteSectionMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/admin/menu-sections/${id}`, {
      method: "DELETE"
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/menu-sections"] });
      if (selectedSection?.id === arguments[0]) {
        setSelectedSection(null);
      }
      toast({ title: "Section deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete section", variant: "destructive" });
    }
  });

  // Item mutations
  const createItemMutation = useMutation({
    mutationFn: (data: any) => apiRequest("/api/admin/menu-items", {
      method: "POST",
      body: JSON.stringify(data)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu-items", selectedSection?.id] });
      setShowItemDialog(false);
      resetItemForm();
      toast({ title: "Menu item created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create menu item", variant: "destructive" });
    }
  });

  const updateItemMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => 
      apiRequest(`/api/admin/menu-items/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu-items", selectedSection?.id] });
      setShowItemDialog(false);
      resetItemForm();
      setEditingItem(null);
      toast({ title: "Menu item updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update menu item", variant: "destructive" });
    }
  });

  const deleteItemMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/admin/menu-items/${id}`, {
      method: "DELETE"
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu-items", selectedSection?.id] });
      toast({ title: "Menu item deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete menu item", variant: "destructive" });
    }
  });

  const resetSectionForm = () => {
    setSectionForm({
      title: "",
      countryCode: "IN",
      displayOrder: 0,
      isActive: true
    });
  };

  const resetItemForm = () => {
    setItemForm({
      sectionId: selectedSection?.id || 0,
      title: "",
      description: "",
      url: "",
      displayOrder: 0,
      isActive: true
    });
  };

  const handleSectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSection) {
      updateSectionMutation.mutate({ id: editingSection.id, data: sectionForm });
    } else {
      createSectionMutation.mutate(sectionForm);
    }
  };

  const handleItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...itemForm, sectionId: selectedSection?.id };
    if (editingItem) {
      updateItemMutation.mutate({ id: editingItem.id, data });
    } else {
      createItemMutation.mutate(data);
    }
  };

  const editSection = (section: MenuSection) => {
    setEditingSection(section);
    setSectionForm({
      title: section.title,
      countryCode: section.countryCode,
      displayOrder: section.displayOrder,
      isActive: section.isActive
    });
    setShowSectionDialog(true);
  };

  const editItem = (item: MenuItem) => {
    setEditingItem(item);
    setItemForm({
      sectionId: item.sectionId,
      title: item.title,
      description: item.description || "",
      url: item.url,
      displayOrder: item.displayOrder,
      isActive: item.isActive
    });
    setShowItemDialog(true);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Menu Management</h1>
        <p className="text-gray-600">Manage navigation menus for different countries</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Menu Sections */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MenuIcon className="h-5 w-5" />
              Menu Sections
            </CardTitle>
            <Dialog open={showSectionDialog} onOpenChange={setShowSectionDialog}>
              <DialogTrigger asChild>
                <Button onClick={() => { resetSectionForm(); setEditingSection(null); }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Section
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingSection ? "Edit Section" : "Create New Section"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSectionSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={sectionForm.title}
                      onChange={(e) => setSectionForm({ ...sectionForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="countryCode">Country</Label>
                    <Select
                      value={sectionForm.countryCode}
                      onValueChange={(value) => setSectionForm({ ...sectionForm, countryCode: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IN">India</SelectItem>
                        <SelectItem value="SG">Singapore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="displayOrder">Display Order</Label>
                    <Input
                      id="displayOrder"
                      type="number"
                      value={sectionForm.displayOrder}
                      onChange={(e) => setSectionForm({ ...sectionForm, displayOrder: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={sectionForm.isActive}
                      onChange={(e) => setSectionForm({ ...sectionForm, isActive: e.target.checked })}
                    />
                    <Label htmlFor="isActive">Active</Label>
                  </div>
                  <Button type="submit" className="w-full">
                    {editingSection ? "Update" : "Create"} Section
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {sectionsLoading ? (
              <div>Loading sections...</div>
            ) : (
              <div className="space-y-2">
                {sections.map((section: MenuSection) => (
                  <div
                    key={section.id}
                    className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                      selectedSection?.id === section.id ? "bg-blue-50 border-blue-200" : ""
                    }`}
                    onClick={() => setSelectedSection(section)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{section.title}</h3>
                        <p className="text-sm text-gray-500">
                          {section.countryCode} • Order: {section.displayOrder}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            editSection(section);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSectionMutation.mutate(section.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              Menu Items
              {selectedSection && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  for {selectedSection.title}
                </span>
              )}
            </CardTitle>
            {selectedSection && (
              <Dialog open={showItemDialog} onOpenChange={setShowItemDialog}>
                <DialogTrigger asChild>
                  <Button onClick={() => { resetItemForm(); setEditingItem(null); }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingItem ? "Edit Menu Item" : "Create New Menu Item"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleItemSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="itemTitle">Title</Label>
                      <Input
                        id="itemTitle"
                        value={itemForm.title}
                        onChange={(e) => setItemForm({ ...itemForm, title: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={itemForm.description}
                        onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                        placeholder="Optional description"
                      />
                    </div>
                    <div>
                      <Label htmlFor="url">URL</Label>
                      <Input
                        id="url"
                        value={itemForm.url}
                        onChange={(e) => setItemForm({ ...itemForm, url: e.target.value })}
                        placeholder="/page-url"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="itemDisplayOrder">Display Order</Label>
                      <Input
                        id="itemDisplayOrder"
                        type="number"
                        value={itemForm.displayOrder}
                        onChange={(e) => setItemForm({ ...itemForm, displayOrder: parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="itemIsActive"
                        checked={itemForm.isActive}
                        onChange={(e) => setItemForm({ ...itemForm, isActive: e.target.checked })}
                      />
                      <Label htmlFor="itemIsActive">Active</Label>
                    </div>
                    <Button type="submit" className="w-full">
                      {editingItem ? "Update" : "Create"} Menu Item
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </CardHeader>
          <CardContent>
            {!selectedSection ? (
              <div className="text-center text-gray-500 py-8">
                Select a menu section to view and manage items
              </div>
            ) : itemsLoading ? (
              <div>Loading items...</div>
            ) : (
              <div className="space-y-2">
                {items.map((item: MenuItem) => (
                  <div
                    key={item.id}
                    className="p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.url}</p>
                        {item.description && (
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                          Order: {item.displayOrder} • {item.isActive ? "Active" : "Inactive"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => editItem(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteItemMutation.mutate(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    No menu items found. Add the first item to get started.
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}