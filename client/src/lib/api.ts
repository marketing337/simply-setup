import { useQuery, useMutation } from "@tanstack/react-query";
import { 
  Location, Office, Testimonial, Area, BlogPost, InsertBlogPost, 
  Author, InsertAuthor, Workspace, InsertWorkspace, Vendor, InsertVendor,
  Offer, InsertOffer
} from "@shared/schema";
import { apiRequest, queryClient } from "./queryClient";

// Use the offices by location ID
export const useOfficesByLocationId = (locationId: number | undefined) => {
  return useQuery<Office[]>({
    queryKey: [locationId ? `/api/locations/${locationId}/offices` : null],
    enabled: !!locationId,
  });
};

// Use the testimonials by location ID
export const useTestimonialsByLocationId = (locationId: number | undefined) => {
  return useQuery<Testimonial[]>({
    queryKey: [locationId ? `/api/locations/${locationId}/testimonials` : null],
    enabled: !!locationId,
  });
};

// Use a specific location by slug
export const useLocationBySlug = (slug: string | undefined) => {
  return useQuery<Location>({
    queryKey: [slug ? `/api/locations/${slug}` : null],
    enabled: !!slug,
  });
};

// Use areas by location ID
export const useAreasByLocationId = (locationId: number | undefined) => {
  return useQuery<Area[]>({
    queryKey: [locationId ? `/api/locations/${locationId}/areas` : null],
    enabled: !!locationId,
  });
};

// Get an area by location slug and area slug
export const useAreaBySlug = (locationSlug: string | undefined, areaSlug: string | undefined) => {
  return useQuery<Area>({
    queryKey: [(locationSlug && areaSlug) ? `/api/locations/${locationSlug}/areas/${areaSlug}` : null],
    enabled: !!(locationSlug && areaSlug && areaSlug.length > 0),
  });
};

// Get an area by ID
export const useAreaById = (areaId: number | undefined) => {
  return useQuery<Area>({
    queryKey: [areaId ? `/api/areas/${areaId}` : null],
    enabled: !!areaId,
  });
};

// Create a new area
export const useCreateArea = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/admin/areas", data);
      return await res.json();
    },
    onSuccess: (data) => {
      // Invalidate relevant areas queries
      if (data && data.locationId) {
        queryClient.invalidateQueries({ queryKey: [`/api/locations/${data.locationId}/areas`] });
      }
    }
  });
};

// Update a location (hero image and other fields)
export const useUpdateLocation = () => {
  return useMutation({
    mutationFn: async ({ 
      id, 
      data 
    }: { 
      id: number; 
      data: Partial<Location>; 
    }) => {
      try {
        const res = await apiRequest("PUT", `/api/admin/locations/${id}`, data);
        const json = await res.json();
        console.log("Location update response:", json);
        return json;
      } catch (error) {
        console.error("Error in location update:", error);
        // Convert to a more specific error
        throw new Error(error instanceof Error ? error.message : 'Failed to update location');
      }
    },
    onSuccess: (data) => {
      console.log("Update successful, invalidating queries");
      // Invalidate locations queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/locations"] });
      // Also invalidate the specific location
      if (data && data.id) {
        queryClient.invalidateQueries({ queryKey: [`/api/locations/${data.slug}`] });
      }
      return data;
    },
    onError: (error) => {
      console.error("Error in updateLocation mutation:", error);
    }
  });
};

// Blog-related hooks

// Get all published blog posts for public consumption
export const usePublishedBlogPosts = () => {
  return useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });
};

// Get a specific blog post by slug for public consumption
export const useBlogPostBySlug = (slug: string | undefined) => {
  return useQuery<BlogPost>({
    queryKey: [slug ? `/api/blog/${slug}` : null],
    enabled: !!slug,
  });
};

// Admin hooks

// Get all blog posts for admin (including drafts)
export const useAllBlogPosts = () => {
  return useQuery<BlogPost[]>({
    queryKey: ['/api/admin/blog'],
  });
};

// Get a specific blog post by ID for admin
export const useBlogPostById = (id: number | undefined) => {
  return useQuery<BlogPost>({
    queryKey: [id ? `/api/admin/blog/${id}` : null],
    enabled: !!id,
  });
};

// Create a new blog post
export const useCreateBlogPost = () => {
  return useMutation({
    mutationFn: async (data: Partial<InsertBlogPost>) => {
      const res = await apiRequest("POST", "/api/admin/blog", data);
      return await res.json();
    },
    onSuccess: () => {
      // Invalidate blog queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/admin/blog'] });
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
    }
  });
};

// Update a blog post
export const useUpdateBlogPost = () => {
  return useMutation({
    mutationFn: async ({ 
      id, 
      data 
    }: { 
      id: number; 
      data: Partial<InsertBlogPost>; 
    }) => {
      const res = await apiRequest("PATCH", `/api/admin/blog/${id}`, data);
      return await res.json();
    },
    onSuccess: (data) => {
      // Invalidate blog queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/admin/blog'] });
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      
      // Also invalidate the specific blog post
      if (data && data.id) {
        queryClient.invalidateQueries({ queryKey: [`/api/admin/blog/${data.id}`] });
        queryClient.invalidateQueries({ queryKey: [`/api/blog/${data.slug}`] });
      }
    }
  });
};

// Delete a blog post
export const useDeleteBlogPost = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/blog/${id}`);
    },
    onSuccess: () => {
      // Invalidate blog queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/admin/blog'] });
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
    }
  });
};

// Generate AI summary for blog post
export const useGenerateBlogSummary = () => {
  return useMutation({
    mutationFn: async (slug: string) => {
      const res = await apiRequest("POST", `/api/blog/${slug}/summary`);
      return await res.json();
    }
  });
};

// Get all blog tags
export const useBlogTags = () => {
  return useQuery<string[]>({
    queryKey: ['/api/blog/tags'],
  });
};

// Get blog posts by tag
export const useBlogPostsByTag = (tag: string | undefined) => {
  return useQuery<BlogPost[]>({
    queryKey: [tag ? `/api/blog/tags/${tag}` : null],
    enabled: !!tag,
  });
};

// Author management hooks

// Get all authors
export const useAllAuthors = () => {
  return useQuery<Author[]>({
    queryKey: ['/api/admin/authors'],
  });
};

// Get author by ID
export const useAuthorById = (id: number | undefined) => {
  return useQuery<Author>({
    queryKey: [id ? `/api/admin/authors/${id}` : null],
    enabled: !!id,
  });
};

// Create a new author
export const useCreateAuthor = () => {
  return useMutation({
    mutationFn: async (data: Partial<InsertAuthor>) => {
      const res = await apiRequest("POST", "/api/admin/authors", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/authors'] });
    }
  });
};

// Update an author
export const useUpdateAuthor = () => {
  return useMutation({
    mutationFn: async ({ 
      id, 
      data 
    }: { 
      id: number; 
      data: Partial<InsertAuthor>; 
    }) => {
      const res = await apiRequest("PUT", `/api/admin/authors/${id}`, data);
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/authors'] });
      if (data && data.id) {
        queryClient.invalidateQueries({ queryKey: [`/api/admin/authors/${data.id}`] });
      }
    }
  });
};

// Delete an author
export const useDeleteAuthor = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/authors/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/authors'] });
    }
  });
};

// Workspace-related hooks

// Get all workspaces
export const useAllWorkspaces = () => {
  return useQuery<Workspace[]>({
    queryKey: ['/api/workspaces'],
  });
};

// Get workspaces by location ID
export const useWorkspacesByLocationId = (locationId: number | undefined) => {
  return useQuery<Workspace[]>({
    queryKey: [locationId ? `/api/locations/${locationId}/workspaces` : null],
    enabled: !!locationId,
  });
};

// Get workspaces by area ID
export const useWorkspacesByAreaId = (areaId: number | undefined) => {
  return useQuery<Workspace[]>({
    queryKey: [areaId ? `/api/areas/${areaId}/workspaces` : null],
    enabled: !!areaId,
  });
};

// Get a specific workspace by slug
export const useWorkspaceBySlug = (slug: string | undefined) => {
  return useQuery<Workspace>({
    queryKey: [slug ? `/api/workspaces/${slug}` : null],
    enabled: !!slug,
  });
};

// Create a new workspace (admin only)
export const useCreateWorkspace = () => {
  return useMutation({
    mutationFn: async (data: Partial<InsertWorkspace>) => {
      const res = await apiRequest("POST", "/api/admin/workspaces", data);
      return await res.json();
    },
    onSuccess: () => {
      // Invalidate workspace queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/workspaces'] });
    }
  });
};

// Update a workspace (admin only)
export const useUpdateWorkspace = () => {
  return useMutation({
    mutationFn: async ({ 
      id, 
      data 
    }: { 
      id: number; 
      data: Partial<InsertWorkspace>; 
    }) => {
      const res = await apiRequest("PATCH", `/api/admin/workspaces/${id}`, data);
      return await res.json();
    },
    onSuccess: (data) => {
      // Invalidate workspace queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/workspaces'] });
      
      // Also invalidate the specific workspace and related location workspaces
      if (data) {
        if (data.id) {
          queryClient.invalidateQueries({ queryKey: [`/api/workspaces/${data.slug}`] });
        }
        if (data.locationId) {
          queryClient.invalidateQueries({ queryKey: [`/api/locations/${data.locationId}/workspaces`] });
        }
        if (data.areaId) {
          queryClient.invalidateQueries({ queryKey: [`/api/areas/${data.areaId}/workspaces`] });
        }
      }
    }
  });
};

// Delete a workspace (admin only)
export const useDeleteWorkspace = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/workspaces/${id}`);
    },
    onSuccess: () => {
      // Invalidate workspace queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/workspaces'] });
    }
  });
};

// Bulk create workspaces from CSV (admin only)
export const useBulkCreateWorkspaces = () => {
  return useMutation({
    mutationFn: async (workspaces: Partial<InsertWorkspace>[]) => {
      const res = await apiRequest("POST", "/api/admin/workspaces/bulk", workspaces);
      return await res.json();
    },
    onSuccess: () => {
      // Invalidate workspace queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/workspaces'] });
    }
  });
};

// AI-powered workspace recommendations
type UserPreferences = {
  businessType?: string;
  teamSize?: string;
  locationName?: string;
  budget?: string;
  amenities?: string[];
  locationId?: number;
};

type WorkspaceRecommendation = {
  workspaceId: number;
  reason: string;
  matchScore: number;
  workspace: Workspace;
};

export const useWorkspaceRecommendations = () => {
  return useMutation({
    mutationFn: async (preferences: UserPreferences) => {
      const res = await apiRequest("POST", "/api/ai/workspace-recommendations", preferences);
      const data = await res.json();
      return data.recommendations as WorkspaceRecommendation[];
    }
  });
};

// ===== OFFERS API =====

// Get all active offers (public)
export const useAllOffers = () => {
  return useQuery<Offer[]>({
    queryKey: ["/api/offers"],
  });
};

// Get all offers (admin)
export const useAllOffersAdmin = () => {
  return useQuery<Offer[]>({
    queryKey: ["/api/admin/offers"],
  });
};

// Get offer by ID (admin)
export const useOfferById = (id: number | undefined) => {
  return useQuery<Offer>({
    queryKey: [id ? `/api/admin/offers/${id}` : null],
    enabled: !!id,
  });
};

// Create offer (admin)
export const useCreateOffer = () => {
  return useMutation<Offer, Error, InsertOffer>({
    mutationFn: async (offer) => {
      const res = await apiRequest("POST", "/api/admin/offers", offer);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/offers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/offers"] });
    },
  });
};

// Update offer (admin)
export const useUpdateOffer = () => {
  return useMutation<Offer, Error, { id: number; data: Partial<InsertOffer> }>({
    mutationFn: async ({ id, data }) => {
      const res = await apiRequest("PUT", `/api/admin/offers/${id}`, data);
      return await res.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/offers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/offers"] });
      queryClient.invalidateQueries({ queryKey: [`/api/admin/offers/${id}`] });
    },
  });
};

// Delete offer (admin)
export const useDeleteOffer = () => {
  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      await apiRequest("DELETE", `/api/admin/offers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/offers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/offers"] });
    },
  });
};
