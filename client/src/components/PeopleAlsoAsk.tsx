import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, HelpCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PAAQuestion {
  question: string;
  answer: string;
}

interface PAAResponse {
  questions: PAAQuestion[];
  cityName: string;
}

interface PeopleAlsoAskProps {
  cityName: string;
}

export function PeopleAlsoAsk({ cityName }: PeopleAlsoAskProps) {
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());

  const { data: paaData, isLoading, error } = useQuery<PAAResponse>({
    queryKey: ['/api/paa', cityName],
    queryFn: async () => {
      const response = await fetch(`/api/paa/${encodeURIComponent(cityName)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch PAA data');
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  const toggleQuestion = (index: number) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedQuestions(newExpanded);
  };

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <h2 className="text-2xl font-bold text-gray-900">
                Loading Common Questions...
              </h2>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Questions About Virtual Offices in {cityName}
            </h2>
            <p className="text-gray-600">
              We're currently updating our FAQ section. Please contact us directly for any questions.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!paaData?.questions?.length) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="site-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              People Also Ask
            </h2>
            <p className="text-lg text-gray-600">
              Common questions about virtual offices in {cityName}
            </p>
          </div>

          <div className="space-y-4">
            {paaData.questions.map((item, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <Button
                    variant="ghost"
                    className="w-full p-6 text-left justify-between hover:bg-gray-50 rounded-lg"
                    onClick={() => toggleQuestion(index)}
                  >
                    <span className="text-lg font-medium text-gray-900 pr-4">
                      {item.question}
                    </span>
                    {expandedQuestions.has(index) ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    )}
                  </Button>
                  
                  {expandedQuestions.has(index) && (
                    <div className="px-6 pb-6 pt-0">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-gray-700 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Have more questions? Contact our team for personalized assistance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}