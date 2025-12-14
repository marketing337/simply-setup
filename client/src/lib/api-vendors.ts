import { useQuery, useMutation } from "@tanstack/react-query";
import { Vendor, InsertVendor, Workspace } from "@shared/schema";
import { apiRequest, queryClient } from "./queryClient";

// Vendor-related hooks

// Get all vendors
export const useAllVendors = () => {
  return useQuery<Vendor[]>({
    queryKey: ['/api/vendors'],
  });
};

// Get all vendors (admin only)
export const useAdminVendors = () => {
  return useQuery<Vendor[]>({
    queryKey: ['/api/admin/vendors'],
  });
};

// Get a vendor by ID
export const useVendorById = (id: number | undefined) => {
  return useQuery<Vendor>({
    queryKey: [id ? `/api/vendors/${id}` : null],
    enabled: !!id,
  });
};

// Get a vendor by slug
export const useVendorBySlug = (slug: string | undefined) => {
  return useQuery<Vendor>({
    queryKey: [slug ? `/api/vendors/slug/${slug}` : null],
    enabled: !!slug,
  });
};

// Get workspaces by vendor ID
export const useWorkspacesByVendorId = (vendorId: number | undefined) => {
  return useQuery<Workspace[]>({
    queryKey: [vendorId ? `/api/vendors/${vendorId}/workspaces` : null],
    enabled: !!vendorId,
  });
};

// Create a new vendor (admin only)
export const useCreateVendor = () => {
  return useMutation({
    mutationFn: async (data: Partial<InsertVendor>) => {
      const res = await apiRequest("POST", "/api/admin/vendors", data);
      return await res.json();
    },
    onSuccess: () => {
      // Invalidate vendor queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/vendors'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/vendors'] });
    }
  });
};

// Update a vendor (admin only)
export const useUpdateVendor = () => {
  return useMutation({
    mutationFn: async ({ 
      id, 
      data 
    }: { 
      id: number; 
      data: Partial<InsertVendor>; 
    }) => {
      const res = await apiRequest("PATCH", `/api/admin/vendors/${id}`, data);
      return await res.json();
    },
    onSuccess: (data) => {
      // Invalidate vendor queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/vendors'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/vendors'] });
      
      // Also invalidate the specific vendor
      if (data && data.id) {
        queryClient.invalidateQueries({ queryKey: [`/api/vendors/${data.id}`] });
        queryClient.invalidateQueries({ queryKey: [`/api/vendors/slug/${data.slug}`] });
      }
    }
  });
};

// Delete a vendor (admin only)
export const useDeleteVendor = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/vendors/${id}`);
    },
    onSuccess: () => {
      // Invalidate vendor queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/vendors'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/vendors'] });
    }
  });
};