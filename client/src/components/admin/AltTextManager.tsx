import { useState, useEffect } from 'react';
import { useAllWorkspaces } from '@/lib/api';
import { useAltTextGenerator } from '@/hooks/useAltTextGenerator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loader2, Sparkles, Copy, CheckCircle, RefreshCw, Database, AlertCircle, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import type { GeneratedAltText } from '@/hooks/useAltTextGenerator';

interface TestAltTextForm {
  workspaceName: string;
  cityName: string;
  areaName: string;
  imageDescription: string;
  imageIndex: number;
  totalImages: number;
  workspaceFeatures: string[];
  workspaceAmenities: string[];
}

export default function AltTextManager() {
  const { data: workspaces, isLoading: workspacesLoading } = useAllWorkspaces();
  const {
    generateAltText,
    generateBulkAltText,
    isGenerating,
    error,
    generateSEOAltText,
    clearCache,
    cacheSize
  } = useAltTextGenerator();
  const { toast } = useToast();

  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>('');
  const [testForm, setTestForm] = useState<TestAltTextForm>({
    workspaceName: 'Premium Business Center',
    cityName: 'Mumbai',
    areaName: 'Andheri East',
    imageDescription: 'Modern conference room with glass walls',
    imageIndex: 1,
    totalImages: 5,
    workspaceFeatures: ['High-speed WiFi', 'Meeting rooms', '24/7 access'],
    workspaceAmenities: ['Reception', 'Coffee machine', 'Parking']
  });
  const [generatedResults, setGeneratedResults] = useState<GeneratedAltText | null>(null);
  const [bulkResults, setBulkResults] = useState<any>(null);
  
  // Bulk update states
  const [isUpdatingAll, setIsUpdatingAll] = useState(false);
  const [updateProgress, setUpdateProgress] = useState<{
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
  } | null>(null);
  const [updateStatus, setUpdateStatus] = useState<{
    totalWorkspaces: number;
    workspacesWithAltTexts: number;
    workspacesNeedingUpdate: number;
  } | null>(null);

  // Handle workspace selection for bulk generation
  const selectedWorkspace = workspaces?.find(w => w.id.toString() === selectedWorkspaceId);

  // Fetch update status on component mount
  useEffect(() => {
    fetchUpdateStatus();
  }, []);

  const fetchUpdateStatus = async () => {
    try {
      const response = await fetch('/api/ai/bulk-update-status');
      if (response.ok) {
        const status = await response.json();
        setUpdateStatus(status);
      }
    } catch (error) {
      console.error('Error fetching update status:', error);
    }
  };

  // Handle bulk update of all workspaces
  const handleBulkUpdate = async () => {
    setIsUpdatingAll(true);
    setUpdateProgress(null);

    try {
      const response = await fetch('/api/ai/bulk-update-alt-text', {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Failed to start bulk update');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                setUpdateProgress(data);
                
                if (data.final) {
                  // Refresh status after completion
                  setTimeout(() => {
                    fetchUpdateStatus();
                  }, 1000);
                  break;
                }
              } catch (e) {
                console.error('Error parsing progress data:', e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error during bulk update:', error);
      toast({
        title: "Error",
        description: "Failed to start bulk update",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingAll(false);
    }
  };

  // Update single workspace
  const handleUpdateSingleWorkspace = async (workspaceId: number) => {
    try {
      const response = await fetch(`/api/ai/update-workspace-alt-text/${workspaceId}`, {
        method: 'POST'
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Success",
          description: `Generated ${result.altTextsGenerated} alt texts for workspace`,
        });
        fetchUpdateStatus(); // Refresh status
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to update workspace",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error updating workspace:', error);
      toast({
        title: "Error",
        description: "Failed to update workspace alt text",
        variant: "destructive",
      });
    }
  };

  // Test single alt text generation
  const handleTestGeneration = async () => {
    try {
      const result = await generateAltText({
        workspaceName: testForm.workspaceName,
        cityName: testForm.cityName,
        areaName: testForm.areaName,
        imageDescription: testForm.imageDescription,
        imageIndex: testForm.imageIndex,
        totalImages: testForm.totalImages,
        workspaceFeatures: testForm.workspaceFeatures,
        workspaceAmenities: testForm.workspaceAmenities
      });

      if (typeof result.altText === 'object') {
        setGeneratedResults(result.altText as GeneratedAltText);
      } else {
        // Handle string response
        setGeneratedResults({
          primary: result.altText as string,
          secondary: generateSEOAltText(testForm.workspaceName, testForm.cityName),
          descriptive: `${testForm.imageDescription} at ${testForm.workspaceName}`,
          seoOptimized: result.altText as string
        });
      }

      toast({
        title: "Alt text generated successfully",
        description: "Multiple variations have been created for testing.",
      });
    } catch (error) {
      console.error('Error generating alt text:', error);
      toast({
        title: "Generation failed",
        description: "Please check your inputs and try again.",
        variant: "destructive",
      });
    }
  };

  // Test bulk alt text generation
  const handleBulkGeneration = async () => {
    if (!selectedWorkspaceId) {
      toast({
        title: "No workspace selected",
        description: "Please select a workspace for bulk generation.",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await generateBulkAltText(parseInt(selectedWorkspaceId));
      setBulkResults(result);

      toast({
        title: "Bulk generation completed",
        description: `Generated ${result.altTextVariations.length} alt text variations.`,
      });
    } catch (error) {
      console.error('Error generating bulk alt text:', error);
      toast({
        title: "Bulk generation failed",
        description: "Please try again or check the workspace data.",
        variant: "destructive",
      });
    }
  };

  // Copy text to clipboard
  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: `${type} alt text copied successfully.`,
      });
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Update features/amenities arrays
  const updateArrayField = (field: 'workspaceFeatures' | 'workspaceAmenities', value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item.length > 0);
    setTestForm(prev => ({ ...prev, [field]: items }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI-SEO Alt Text Manager</h2>
          <p className="text-muted-foreground">
            Generate and test SEO-optimized alt text for workspace images
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            Cache: {cacheSize} items
          </Badge>
          <Button variant="outline" size="sm" onClick={clearCache}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Clear Cache
          </Button>
        </div>
      </div>

      {/* Bulk Update Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Bulk Alt Text Update
          </CardTitle>
          <CardDescription>
            Generate and update alt text for all workspace images in the database
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status Overview */}
          {updateStatus && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{updateStatus.totalWorkspaces}</div>
                <div className="text-sm text-muted-foreground">Total Workspaces</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{updateStatus.workspacesWithAltTexts}</div>
                <div className="text-sm text-muted-foreground">With Alt Texts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{updateStatus.workspacesNeedingUpdate}</div>
                <div className="text-sm text-muted-foreground">Need Update</div>
              </div>
            </div>
          )}

          {/* Bulk Update Progress */}
          {updateProgress && (
            <Alert>
              <TrendingUp className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{updateProgress.stage}</span>
                    <span>{updateProgress.current}/{updateProgress.total}</span>
                  </div>
                  <Progress value={updateProgress.percentage} className="w-full" />
                  <p className="text-sm text-muted-foreground">{updateProgress.message}</p>
                  
                  {updateProgress.errors.length > 0 && (
                    <div className="mt-2">
                      <details className="text-sm">
                        <summary className="text-red-600 cursor-pointer">
                          {updateProgress.errors.length} errors occurred
                        </summary>
                        <ul className="mt-2 space-y-1 text-red-600">
                          {updateProgress.errors.map((error, index) => (
                            <li key={index}>• {error}</li>
                          ))}
                        </ul>
                      </details>
                    </div>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              onClick={handleBulkUpdate}
              disabled={isUpdatingAll || isGenerating}
              className="flex-1"
            >
              {isUpdatingAll ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating All Workspaces...
                </>
              ) : (
                <>
                  <Database className="h-4 w-4 mr-2" />
                  Update All Workspaces
                </>
              )}
            </Button>
            
            <Button 
              variant="outline"
              onClick={fetchUpdateStatus}
              disabled={isUpdatingAll}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Status
            </Button>
          </div>

          {updateStatus && updateStatus.workspacesNeedingUpdate > 0 && !isUpdatingAll && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {updateStatus.workspacesNeedingUpdate} workspaces need alt text updates. 
                Click "Update All Workspaces" to generate SEO-optimized alt text for all workspace images.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Test Generation Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Test Alt Text Generation
            </CardTitle>
            <CardDescription>
              Test the AI-powered alt text generation with custom inputs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="workspaceName">Workspace Name</Label>
                <Input
                  id="workspaceName"
                  value={testForm.workspaceName}
                  onChange={(e) => setTestForm(prev => ({ ...prev, workspaceName: e.target.value }))}
                  placeholder="Premium Business Center"
                />
              </div>
              <div>
                <Label htmlFor="cityName">City Name</Label>
                <Input
                  id="cityName"
                  value={testForm.cityName}
                  onChange={(e) => setTestForm(prev => ({ ...prev, cityName: e.target.value }))}
                  placeholder="Mumbai"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="areaName">Area Name (Optional)</Label>
              <Input
                id="areaName"
                value={testForm.areaName}
                onChange={(e) => setTestForm(prev => ({ ...prev, areaName: e.target.value }))}
                placeholder="Andheri East"
              />
            </div>

            <div>
              <Label htmlFor="imageDescription">Image Description (Optional)</Label>
              <Textarea
                id="imageDescription"
                value={testForm.imageDescription}
                onChange={(e) => setTestForm(prev => ({ ...prev, imageDescription: e.target.value }))}
                placeholder="Describe what the image shows..."
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="imageIndex">Image Index</Label>
                <Input
                  id="imageIndex"
                  type="number"
                  min="1"
                  value={testForm.imageIndex}
                  onChange={(e) => setTestForm(prev => ({ ...prev, imageIndex: parseInt(e.target.value) || 1 }))}
                />
              </div>
              <div>
                <Label htmlFor="totalImages">Total Images</Label>
                <Input
                  id="totalImages"
                  type="number"
                  min="1"
                  value={testForm.totalImages}
                  onChange={(e) => setTestForm(prev => ({ ...prev, totalImages: parseInt(e.target.value) || 1 }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="features">Workspace Features (comma-separated)</Label>
              <Input
                id="features"
                value={testForm.workspaceFeatures.join(', ')}
                onChange={(e) => updateArrayField('workspaceFeatures', e.target.value)}
                placeholder="High-speed WiFi, Meeting rooms, 24/7 access"
              />
            </div>

            <div>
              <Label htmlFor="amenities">Workspace Amenities (comma-separated)</Label>
              <Input
                id="amenities"
                value={testForm.workspaceAmenities.join(', ')}
                onChange={(e) => updateArrayField('workspaceAmenities', e.target.value)}
                placeholder="Reception, Coffee machine, Parking"
              />
            </div>

            <Button 
              onClick={handleTestGeneration} 
              disabled={isGenerating || !testForm.workspaceName || !testForm.cityName}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Alt Text
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Bulk Generation */}
        <Card>
          <CardHeader>
            <CardTitle>Bulk Alt Text Generation</CardTitle>
            <CardDescription>
              Generate alt text for all images in a workspace
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="workspace-select">Select Workspace</Label>
              <Select value={selectedWorkspaceId} onValueChange={setSelectedWorkspaceId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a workspace..." />
                </SelectTrigger>
                <SelectContent>
                  {workspaces?.map((workspace) => (
                    <SelectItem key={workspace.id} value={workspace.id.toString()}>
                      {workspace.name} ({workspace.images?.length || 0} images)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedWorkspace && (
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium">{selectedWorkspace.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedWorkspace.images?.length || 0} images • {selectedWorkspace.features?.length || 0} features
                </p>
              </div>
            )}

            <Button 
              onClick={handleBulkGeneration} 
              disabled={isGenerating || !selectedWorkspaceId}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating Bulk...
                </>
              ) : (
                'Generate Bulk Alt Text'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Generated Results */}
      {generatedResults && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Alt Text Variations</CardTitle>
            <CardDescription>
              Multiple SEO-optimized variations for your workspace image
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(generatedResults).map(([type, text]) => (
                <div key={type} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="capitalize">
                      {type.replace(/([A-Z])/g, ' $1').trim()}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(text, type)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm">{text}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {text.length} characters
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bulk Results */}
      {bulkResults && (
        <Card>
          <CardHeader>
            <CardTitle>Bulk Generation Results</CardTitle>
            <CardDescription>
              Alt text variations for {bulkResults.workspace.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image #</TableHead>
                  <TableHead>Primary (SEO Format)</TableHead>
                  <TableHead>Secondary</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bulkResults.altTextVariations.map((variation: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{variation.imageIndex + 1}</TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm truncate" title={variation.primary}>
                        {variation.primary}
                      </p>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm truncate" title={variation.secondary}>
                        {variation.secondary}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(variation.primary, 'Primary')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">Error: {error.message}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}