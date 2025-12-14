import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, SendIcon, MessageSquare } from "lucide-react";
import { Location } from "@shared/schema";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

// Define the workspace recommendation schema
const workspaceRecommendationSchema = z.object({
  businessType: z.string().min(2, { message: "Please enter your business type" }),
  teamSize: z.string().min(1, { message: "Please enter your team size" }),
  requirements: z.string().optional(),
});

type WorkspaceRecommendationFormValues = z.infer<typeof workspaceRecommendationSchema>;

// Define the question answer schema
const questionSchema = z.object({
  question: z.string().min(2, { message: "Please enter your question" }),
});

type QuestionFormValues = z.infer<typeof questionSchema>;

interface WorkspaceAdvisorProps {
  location: Location;
}

export default function WorkspaceAdvisor({ location }: WorkspaceAdvisorProps) {
  const [activeTab, setActiveTab] = useState<"recommendation" | "question">("recommendation");
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Recommendation form
  const recommendationForm = useForm<WorkspaceRecommendationFormValues>({
    resolver: zodResolver(workspaceRecommendationSchema),
    defaultValues: {
      businessType: "",
      teamSize: "",
      requirements: "",
    },
  });

  // Question form
  const questionForm = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: "",
    },
  });

  // Function to handle workspace recommendation submission
  const onRecommendationSubmit = async (data: WorkspaceRecommendationFormValues) => {
    setIsLoading(true);
    setRecommendation(null);

    try {
      const response = await axios.post("/api/workspace-recommendation", {
        ...data,
        locationName: location.name,
      });

      if (response.data && response.data.recommendation) {
        setRecommendation(response.data.recommendation);
      } else {
        setRecommendation("Sorry, I couldn't generate a recommendation at this time. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching workspace recommendation:", error);
      setRecommendation("Sorry, there was an error processing your request. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle question submission
  const onQuestionSubmit = async (data: QuestionFormValues) => {
    setIsLoading(true);
    setAnswer(null);

    try {
      const response = await axios.post("/api/workspace-question", {
        question: data.question,
      });

      if (response.data && response.data.answer) {
        setAnswer(response.data.answer);
      } else {
        setAnswer("Sorry, I couldn't answer your question at this time. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching answer:", error);
      setAnswer("Sorry, there was an error processing your request. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
      {/* Left side - Input */}
      <div className="w-full md:w-1/2">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex space-x-4 mb-2">
              <Button
                variant={activeTab === "recommendation" ? "default" : "outline"}
                onClick={() => setActiveTab("recommendation")}
                className="flex-1"
              >
                Get Recommendation
              </Button>
              <Button
                variant={activeTab === "question" ? "default" : "outline"}
                onClick={() => setActiveTab("question")}
                className="flex-1"
              >
                Ask a Question
              </Button>
            </div>
            <CardTitle>
              {activeTab === "recommendation" 
                ? "Workspace Recommendations" 
                : "Ask About Workspaces"}
            </CardTitle>
            <CardDescription>
              {activeTab === "recommendation"
                ? `Get personalized workspace recommendations for ${location.name} based on your business needs.`
                : "Have questions about our workspaces? Ask our AI assistant for help."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activeTab === "recommendation" ? (
              <form
                onSubmit={recommendationForm.handleSubmit(onRecommendationSubmit)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Input
                    id="businessType"
                    placeholder="e.g., Tech Startup, Marketing Agency, Law Firm"
                    {...recommendationForm.register("businessType")}
                  />
                  {recommendationForm.formState.errors.businessType && (
                    <p className="text-red-500 text-sm">
                      {recommendationForm.formState.errors.businessType.message}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Input
                    id="teamSize"
                    placeholder="e.g., 1-5, 10-20, 50+"
                    {...recommendationForm.register("teamSize")}
                  />
                  {recommendationForm.formState.errors.teamSize && (
                    <p className="text-red-500 text-sm">
                      {recommendationForm.formState.errors.teamSize.message}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="requirements">
                    Special Requirements (Optional)
                  </Label>
                  <Textarea
                    id="requirements"
                    placeholder="e.g., Meeting rooms, high-speed internet, 24/7 access"
                    className="min-h-[100px]"
                    {...recommendationForm.register("requirements")}
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Getting Recommendations...
                    </>
                  ) : (
                    <>
                      <SendIcon className="mr-2 h-4 w-4" />
                      Get Recommendations
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <form
                onSubmit={questionForm.handleSubmit(onQuestionSubmit)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="question">Your Question</Label>
                  <Textarea
                    id="question"
                    placeholder="e.g., What amenities are included in a virtual office? What's the difference between hot desks and dedicated desks?"
                    className="min-h-[150px]"
                    {...questionForm.register("question")}
                  />
                  {questionForm.formState.errors.question && (
                    <p className="text-red-500 text-sm">
                      {questionForm.formState.errors.question.message}
                    </p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Finding Answer...
                    </>
                  ) : (
                    <>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Ask Question
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-between flex-col text-xs text-muted-foreground pt-0">
            <Separator className="my-4" />
            <p>Powered by OpenAI GPT-4o</p>
          </CardFooter>
        </Card>
      </div>
      
      {/* Right side - Results */}
      <div className="w-full md:w-1/2">
        <Card className="shadow-lg h-full">
          <CardHeader>
            <CardTitle>
              {activeTab === "recommendation" 
                ? "Your Workspace Recommendation" 
                : "Answer"}
            </CardTitle>
            <CardDescription>
              {activeTab === "recommendation"
                ? `Personalized suggestions for workspaces in ${location.name}`
                : "AI-generated response to your question"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activeTab === "recommendation" ? (
              isLoading ? (
                <div className="flex items-center justify-center h-[300px]">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : recommendation ? (
                <div className="prose prose-sm max-w-none">
                  {recommendation.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground h-[300px] flex flex-col items-center justify-center">
                  <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
                  <p>Fill out the form to get personalized workspace recommendations.</p>
                </div>
              )
            ) : (
              isLoading ? (
                <div className="flex items-center justify-center h-[300px]">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : answer ? (
                <div className="prose prose-sm max-w-none">
                  {answer.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground h-[300px] flex flex-col items-center justify-center">
                  <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
                  <p>Ask a question to get started.</p>
                </div>
              )
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}