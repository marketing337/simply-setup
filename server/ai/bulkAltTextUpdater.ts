import { generateWorkspaceAltText } from './seoAltTextGenerator.js';
import { db } from '../db.js';
import { workspaces, locations, areas, vendors } from '../../shared/schema.js';
import { eq } from 'drizzle-orm';

interface WorkspaceWithRelations {
  id: number;
  name: string;
  images: string[];
  imageAltTexts: string[];
  locationId: number;
  areaId: number | null;
  vendorId: number | null;
  features: string[];
  amenities: string[];
  location?: { name: string };
  area?: { name: string };
  vendor?: { name: string };
}

interface BulkUpdateProgress {
  stage: string;
  current: number;
  total: number;
  percentage: number;
  message: string;
  errors: string[];
  processed: Array<{
    workspaceId: number;
    workspaceName: string;
    altTextsGenerated: number;
    success: boolean;
    error?: string;
  }>;
}

export class BulkAltTextUpdater {
  private onProgress?: (progress: BulkUpdateProgress) => void;

  constructor(onProgress?: (progress: BulkUpdateProgress) => void) {
    this.onProgress = onProgress;
  }

  private reportProgress(progress: Partial<BulkUpdateProgress>) {
    if (this.onProgress) {
      const fullProgress: BulkUpdateProgress = {
        stage: progress.stage || 'Processing',
        current: progress.current || 0,
        total: progress.total || 0,
        percentage: progress.total ? Math.round(((progress.current || 0) / progress.total) * 100) : 0,
        message: progress.message || '',
        errors: progress.errors || [],
        processed: progress.processed || []
      };
      this.onProgress(fullProgress);
    }
  }

  async updateAllWorkspaces(): Promise<BulkUpdateProgress> {
    const finalProgress: BulkUpdateProgress = {
      stage: 'Starting',
      current: 0,
      total: 0,
      percentage: 0,
      message: 'Initializing bulk alt text update...',
      errors: [],
      processed: []
    };

    try {
      // Step 1: Fetch all workspaces with their relations
      this.reportProgress({
        stage: 'Fetching Data',
        message: 'Loading all workspaces...'
      });

      const allWorkspaces = await this.fetchWorkspacesWithRelations();
      
      if (allWorkspaces.length === 0) {
        finalProgress.message = 'No workspaces found to update';
        return finalProgress;
      }

      finalProgress.total = allWorkspaces.length;
      this.reportProgress({
        ...finalProgress,
        message: `Found ${allWorkspaces.length} workspaces to process`
      });

      // Step 2: Process each workspace with batch processing
      const batchSize = 5; // Process 5 workspaces at a time
      
      for (let i = 0; i < allWorkspaces.length; i += batchSize) {
        const batch = allWorkspaces.slice(i, i + batchSize);
        
        // Process batch in parallel
        const batchPromises = batch.map(async (workspace, batchIndex) => {
          const currentIndex = i + batchIndex + 1;
          
          this.reportProgress({
            ...finalProgress,
            current: currentIndex,
            stage: 'Processing Workspaces',
            message: `Processing ${workspace.name} (${currentIndex}/${finalProgress.total})`
          });

          try {
            await this.updateWorkspaceAltTexts(workspace);
            
            return {
              workspaceId: workspace.id,
              workspaceName: workspace.name,
              altTextsGenerated: workspace.images.length,
              success: true as const
            };

          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            finalProgress.errors.push(`Error updating ${workspace.name}: ${errorMessage}`);
            
            return {
              workspaceId: workspace.id,
              workspaceName: workspace.name,
              altTextsGenerated: 0,
              success: false as const,
              error: errorMessage
            };
          }
        });

        // Wait for batch to complete
        const batchResults = await Promise.allSettled(batchPromises);
        
        // Process results
        batchResults.forEach((result, batchIndex) => {
          if (result.status === 'fulfilled') {
            finalProgress.processed.push(result.value);
          } else {
            const workspace = batch[batchIndex];
            finalProgress.errors.push(`Failed to process ${workspace.name}: ${result.reason}`);
            finalProgress.processed.push({
              workspaceId: workspace.id,
              workspaceName: workspace.name,
              altTextsGenerated: 0,
              success: false,
              error: String(result.reason)
            });
          }
        });

        finalProgress.current = Math.min(i + batchSize, allWorkspaces.length);
        
        // Add delay between batches to avoid overwhelming the API
        if (i + batchSize < allWorkspaces.length) {
          await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay between batches
        }
      }

      // Step 3: Complete
      finalProgress.stage = 'Complete';
      finalProgress.message = `Bulk update completed. ${finalProgress.processed.filter(p => p.success).length} workspaces updated successfully, ${finalProgress.errors.length} errors`;
      
      this.reportProgress(finalProgress);
      return finalProgress;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      finalProgress.stage = 'Error';
      finalProgress.message = `Bulk update failed: ${errorMessage}`;
      finalProgress.errors.push(errorMessage);
      
      this.reportProgress(finalProgress);
      return finalProgress;
    }
  }

  private async fetchWorkspacesWithRelations(): Promise<WorkspaceWithRelations[]> {
    const workspacesData = await db
      .select({
        id: workspaces.id,
        name: workspaces.name,
        images: workspaces.images,
        imageAltTexts: workspaces.imageAltTexts,
        locationId: workspaces.locationId,
        areaId: workspaces.areaId,
        vendorId: workspaces.vendorId,
        features: workspaces.features,
        amenities: workspaces.amenities,
        locationName: locations.name,
        areaName: areas.name,
        vendorName: vendors.name
      })
      .from(workspaces)
      .leftJoin(locations, eq(workspaces.locationId, locations.id))
      .leftJoin(areas, eq(workspaces.areaId, areas.id))
      .leftJoin(vendors, eq(workspaces.vendorId, vendors.id));

    return workspacesData.map(ws => ({
      id: ws.id,
      name: ws.name,
      images: ws.images || [],
      imageAltTexts: ws.imageAltTexts || [],
      locationId: ws.locationId,
      areaId: ws.areaId,
      vendorId: ws.vendorId,
      features: ws.features || [],
      amenities: ws.amenities || [],
      location: ws.locationName ? { name: ws.locationName } : undefined,
      area: ws.areaName ? { name: ws.areaName } : undefined,
      vendor: ws.vendorName ? { name: ws.vendorName } : undefined
    }));
  }

  private async updateWorkspaceAltTexts(workspace: WorkspaceWithRelations): Promise<void> {
    if (!workspace.images || workspace.images.length === 0) {
      // No images to process
      return;
    }

    // Check if alt texts already exist and match the number of images
    if (workspace.imageAltTexts && workspace.imageAltTexts.length === workspace.images.length) {
      // Alt texts already exist for all images, skip
      return;
    }

    const newAltTexts: string[] = [];

    // Generate alt text for each image with rate limiting
    for (let i = 0; i < workspace.images.length; i++) {
      const imageUrl = workspace.images[i];
      
      try {
        // Add a small delay between requests to avoid rate limiting
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, 250)); // 250ms delay
        }

        const altTextData = await generateWorkspaceAltText({
          workspaceName: workspace.name,
          cityName: workspace.location?.name || 'Unknown City',
          areaName: workspace.area?.name || '',
          imageDescription: `Workspace image ${i + 1}`,
          imageIndex: i,
          totalImages: workspace.images.length,
          workspaceFeatures: workspace.features,
          workspaceAmenities: workspace.amenities
        });

        // Use the primary alt text (the SEO-optimized one)
        newAltTexts.push(altTextData.primary);

      } catch (error) {
        console.error(`Error generating alt text for image ${i + 1} of workspace ${workspace.name}:`, error);
        // Use fallback alt text
        const fallbackAltText = `Virtual Office in ${workspace.location?.name || 'Unknown City'}, Virtual Office in ${workspace.name}`;
        newAltTexts.push(fallbackAltText);
      }
    }

    // Update the workspace with new alt texts
    await db
      .update(workspaces)
      .set({ 
        imageAltTexts: newAltTexts,
        updatedAt: new Date()
      })
      .where(eq(workspaces.id, workspace.id));
  }

  async updateSingleWorkspace(workspaceId: number): Promise<{
    success: boolean;
    altTextsGenerated: number;
    error?: string;
  }> {
    try {
      const workspaceData = await this.fetchWorkspacesWithRelations();
      const workspace = workspaceData.find(ws => ws.id === workspaceId);
      
      if (!workspace) {
        throw new Error('Workspace not found');
      }

      await this.updateWorkspaceAltTexts(workspace);
      
      return {
        success: true,
        altTextsGenerated: workspace.images.length
      };

    } catch (error) {
      return {
        success: false,
        altTextsGenerated: 0,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  async getUpdateStatus(): Promise<{
    totalWorkspaces: number;
    workspacesWithAltTexts: number;
    workspacesNeedingUpdate: number;
  }> {
    const allWorkspaces = await this.fetchWorkspacesWithRelations();
    
    const workspacesWithAltTexts = allWorkspaces.filter(ws => 
      ws.imageAltTexts && 
      ws.imageAltTexts.length > 0 && 
      ws.imageAltTexts.length === ws.images.length
    ).length;

    return {
      totalWorkspaces: allWorkspaces.length,
      workspacesWithAltTexts,
      workspacesNeedingUpdate: allWorkspaces.length - workspacesWithAltTexts
    };
  }
}