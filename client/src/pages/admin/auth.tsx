import { useLocation } from "wouter";
import { Redirect } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { LockKeyhole, Shield } from "lucide-react";
import { Helmet } from "react-helmet-async";

// Form schema
const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function AuthPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { user, loginMutation } = useAuth();

  // Login form
  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Login function
  const onLogin = async (values: LoginValues) => {
    try {
      await loginMutation.mutateAsync(values);
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard!",
      });
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      // Error handling is done in the mutation itself
    }
  };

  // Redirect if user is already logged in
  if (user) {
    return <Redirect to="/admin/dashboard" />;
  }

  return (
    <>
      <Helmet>
        <title>SimplySetup Admin Portal - Secure Authentication | Official Login</title>
        <meta name="description" content="Secure admin portal login for SimplySetup. Official authentication page for authorized administrative personnel only." />
        <meta name="robots" content="noindex, nofollow" />
        
        {/* Security and authenticity meta tags */}
        <meta name="application-name" content="SimplySetup Admin Portal" />
        <meta name="company" content="SimplySetup" />
        <meta name="website" content="https://simplysetup.com" />
        <meta name="security-policy" content="This is an official SimplySetup admin authentication page. Always verify the URL contains simplysetup.com" />
        
        {/* Open Graph for security */}
        <meta property="og:title" content="SimplySetup Admin Portal - Secure Login" />
        <meta property="og:description" content="Official admin authentication portal for SimplySetup management platform" />
        <meta property="og:site_name" content="SimplySetup" />
        <meta property="og:type" content="website" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://simplysetup.com/admin/auth" />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 container max-w-6xl p-6">
        {/* Login Form */}
        <Card className="w-full shadow-lg">
          <CardHeader className="space-y-1">
            <div className="mx-auto bg-primary/10 p-2 rounded-full w-12 h-12 flex items-center justify-center mb-2">
              <LockKeyhole className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Admin Access
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your username" 
                          {...field} 
                          autoComplete="username"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Enter your password" 
                          {...field} 
                          autoComplete="current-password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full mt-6"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Authenticating..." : "Login to Dashboard"}
                </Button>
              </form>
            </Form>
            <div className="mt-6 p-3 bg-green-50 rounded-lg border">
              <div className="flex items-center space-x-2 text-sm text-green-700">
                <Shield className="h-4 w-4" />
                <span>Official SimplySetup Admin Portal</span>
              </div>
              <p className="text-xs text-green-600 mt-1">
                Secure admin area - Authorized personnel only
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Hero Section */}
        <div className="hidden md:flex flex-col justify-center p-8 bg-blue-600 text-white rounded-lg">
          <h1 className="text-3xl font-bold mb-6">Virtual Office Admin Portal</h1>
          <p className="mb-4">
            Welcome to the admin portal for Virtual Offices. This is where you can:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Manage location content for cities across India</li>
            <li>Create and edit area pages for specific neighborhoods</li>
            <li>Customize hero images, descriptions, and features</li>
            <li>Control which areas appear as popular destinations</li>
          </ul>
          <p className="italic">
            Your changes will be immediately reflected on the public-facing website.
          </p>
        </div>
      </div>
      </div>
    </>
  );
}