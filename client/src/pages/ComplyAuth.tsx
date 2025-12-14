import { useState, useEffect } from "react";
import { useComplyAuth } from "@/hooks/useComplyAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { FileText, Shield, TrendingUp, Clock } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function ComplyAuth() {
  const { login, register, isAuthenticated, user, token } = useComplyAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    console.log("ComplyAuth useEffect triggered - isAuthenticated:", isAuthenticated, "user:", user);
    if (isAuthenticated && user) {
      console.log("Redirecting to dashboard via useEffect");
      // Use window.location for proper redirect
      window.location.href = "/comply/dashboard";
    }
  }, [isAuthenticated, user]);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    companyName: "",
    gstin: "",
    panNumber: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await login(loginData.email, loginData.password);
    
    if (result.success) {
      toast({
        title: "Login Successful",
        description: result.message,
      });
      // Use setTimeout to ensure state is updated before navigation
      setTimeout(() => {
        try {
          setLocation("/dashboard");
        } catch (error) {
          console.log("Manual redirect failed, using window.location");
          window.location.href = "/comply/dashboard";
        }
      }, 100);
    } else {
      setError(result.message);
    }
    
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (registerData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    const { confirmPassword, ...userData } = registerData;
    const result = await register(userData);
    
    if (result.success) {
      toast({
        title: "Registration Successful",
        description: result.message,
      });
    } else {
      setError(result.message);
    }
    
    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>SimplySetup Comply - Secure GST Compliance Login | Official Authentication</title>
        <meta name="description" content="Secure login to SimplySetup Comply - Your trusted GST compliance management platform. Official authentication portal for registered users." />
        <meta name="robots" content="noindex, nofollow" />
        
        {/* Security and authenticity meta tags */}
        <meta name="application-name" content="SimplySetup Comply" />
        <meta name="company" content="SimplySetup" />
        <meta name="website" content="https://simplysetup.com" />
        <meta name="security-policy" content="This is an official SimplySetup authentication page. Always verify the URL contains simplysetup.com" />
        
        {/* Open Graph for security */}
        <meta property="og:title" content="SimplySetup Comply - Secure Login" />
        <meta property="og:description" content="Official authentication portal for SimplySetup Comply GST management platform" />
        <meta property="og:site_name" content="SimplySetup" />
        <meta property="og:type" content="website" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://simplysetup.com/comply/auth" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding and Features */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              SimplySetup <span className="text-blue-600">Comply</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your complete GST compliance management platform. Upload certificates, track filings, and never miss a deadline.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Certificate Management</h3>
                <p className="text-sm text-gray-600">Upload and verify your GST certificates securely</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Filing Tracking</h3>
                <p className="text-sm text-gray-600">Track all your GST returns and tax payments</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Smart Reminders</h3>
                <p className="text-sm text-gray-600">Never miss filing deadlines with automated alerts</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Secure & Compliant</h3>
                <p className="text-sm text-gray-600">Bank-grade security for your sensitive data</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Authentication Form */}
        <div className="w-full max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Get Started</CardTitle>
              <CardDescription className="text-center">
                Sign in to your account or create a new one
              </CardDescription>
              <div className="text-xs text-center text-gray-500 mt-2">
                🔒 Secure authentication powered by SimplySetup
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="register">Create Account</TabsTrigger>
                </TabsList>

                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4" autoComplete="on" method="post" action="/comply/auth"  data-form-type="login" role="form">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        name="email"
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                        autoComplete="email"
                        placeholder="your@email.com"
                        aria-describedby="login-email-help"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        name="password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                        autoComplete="current-password"
                        placeholder="••••••••"
                        aria-describedby="login-password-help"
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4" autoComplete="on" method="post" action="/comply/register" data-form-type="registration" role="form">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="given-name"
                          value={registerData.firstName}
                          onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                          required
                          autoComplete="given-name"
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="family-name"
                          value={registerData.lastName}
                          onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                          required
                          autoComplete="family-name"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        name="email"
                        type="email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        required
                        autoComplete="email"
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <Input
                        id="phone"
                        name="tel"
                        type="tel"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                        autoComplete="tel"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name (Optional)</Label>
                      <Input
                        id="companyName"
                        name="organization"
                        value={registerData.companyName}
                        onChange={(e) => setRegisterData({ ...registerData, companyName: e.target.value })}
                        autoComplete="organization"
                        placeholder="Your Company Ltd."
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gstin">GSTIN (Optional)</Label>
                        <Input
                          id="gstin"
                          name="gstin"
                          value={registerData.gstin}
                          onChange={(e) => setRegisterData({ ...registerData, gstin: e.target.value })}
                          placeholder="22AAAAA0000A1Z5"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="panNumber">PAN (Optional)</Label>
                        <Input
                          id="panNumber"
                          name="pan"
                          value={registerData.panNumber}
                          onChange={(e) => setRegisterData({ ...registerData, panNumber: e.target.value })}
                          placeholder="AAAAA0000A"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input
                        id="register-password"
                        name="new-password"
                        type="password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        required
                        autoComplete="new-password"
                        placeholder="••••••••"
                        minLength={6}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirm-password"
                        type="password"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        required
                        autoComplete="new-password"
                        placeholder="••••••••"
                        minLength={6}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <div className="p-4 bg-green-50 border-t">
              <div className="flex items-center space-x-2 text-sm text-green-700">
                <Shield className="h-4 w-4" />
                <span>Secure login powered by SimplySetup.com</span>
              </div>
              <p className="text-xs text-green-600 mt-1">
                Your data is protected with bank-grade encryption
              </p>
            </div>
          </Card>
        </div>
      </div>
      </div>
    </>
  );
}