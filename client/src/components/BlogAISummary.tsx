import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Clock, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface BlogSummary {
  summary: string;
  keyPoints: string[];
  readingTime: number;
}

interface BlogAISummaryProps {
  slug: string;
  className?: string;
}

export default function BlogAISummary({ slug, className = "" }: BlogAISummaryProps) {
  const [summary, setSummary] = useState<BlogSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSummary = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiRequest('POST', `/api/blog/${slug}/summary`);
      
      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }
      
      const summaryData = await response.json();
      setSummary(summaryData);
      setIsExpanded(true);
    } catch (err) {
      setError('Unable to generate AI summary. Please try again.');
      console.error('Error generating summary:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={`border-2 border-dashed border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-purple-900">
          <Sparkles className="w-5 h-5" />
          AI Summary
        </CardTitle>
        <CardDescription className="text-purple-700">
          Get a concise 100-word summary powered by AI
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        {!summary && !isLoading && (
          <Button 
            onClick={generateSummary}
            disabled={isLoading}
            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Generate AI Summary
          </Button>
        )}
        
        {isLoading && (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="w-6 h-6 animate-spin text-purple-600 mr-2" />
            <span className="text-purple-700">Generating summary...</span>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
            {error}
            <Button 
              onClick={generateSummary}
              variant="outline"
              size="sm"
              className="mt-2 text-red-600 border-red-300 hover:bg-red-50"
            >
              Try Again
            </Button>
          </div>
        )}
        
        {summary && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  <Clock className="w-3 h-3 mr-1" />
                  {summary.readingTime} min read
                </Badge>
                <Badge variant="outline" className="border-purple-300 text-purple-700">
                  100 words
                </Badge>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-purple-600 hover:text-purple-800"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-1" />
                    Collapse
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-1" />
                    Expand
                  </>
                )}
              </Button>
            </div>
            
            {isExpanded && (
              <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">Summary</h4>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {summary.summary}
                  </p>
                </div>
                
                {summary.keyPoints.length > 0 && (
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-3">Key Points</h4>
                    <ul className="space-y-2">
                      {summary.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                          <span className="text-gray-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}