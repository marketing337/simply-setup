import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { 
  MessageCircle, 
  Send, 
  Upload, 
  CreditCard, 
  CheckCircle2, 
  Loader2,
  Bot,
  User,
  X,
  Minimize2,
  Maximize2,
  ArrowRight
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface ChatState {
  sessionId: string | null;
  messages: Message[];
  currentStep: string;
  isLoading: boolean;
  requiresDocumentUpload: boolean;
  requiresPayment: boolean;
  pricing: { package: string; price: number; description: string } | null;
}

interface LeadForm {
  name: string;
  email: string;
  phone: string;
}

const DOCUMENT_TYPES = [
  { id: "pan", label: "PAN Card", required: true },
  { id: "aadhaar", label: "Aadhaar Card", required: true },
  { id: "bank_proof", label: "Bank Proof (Cancelled Cheque/Statement)", required: true },
  { id: "photo", label: "Passport Photo", required: true },
  { id: "rent_agreement", label: "Rent Agreement / NOC", required: false },
];

export default function SimplySetupChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState<LeadForm>({ name: "", email: "", phone: "" });
  const [formErrors, setFormErrors] = useState<Partial<LeadForm>>({});
  const [inputValue, setInputValue] = useState("");
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);
  const [chatState, setChatState] = useState<ChatState>({
    sessionId: null,
    messages: [],
    currentStep: "greeting",
    isLoading: false,
    requiresDocumentUpload: false,
    requiresPayment: false,
    pricing: null,
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedDocType, setSelectedDocType] = useState<string>("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  const validateForm = (): boolean => {
    const errors: Partial<LeadForm> = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    
    if (!formData.phone.trim()) {
      errors.phone = "Phone is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = "Invalid phone number";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitLeadForm = useMutation({
    mutationFn: async (data: LeadForm) => {
      const response = await apiRequest("POST", "/api/simplysetup/start-with-lead", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        websiteLink: window.location.href
      });
      return response.json();
    },
    onSuccess: (data) => {
      setShowForm(false);
      setChatState(prev => ({
        ...prev,
        sessionId: data.sessionId,
        messages: [{
          role: "assistant",
          content: data.message,
          timestamp: new Date().toISOString()
        }],
        currentStep: data.currentStep,
        isLoading: false,
      }));
    },
    onError: () => {
      setChatState(prev => ({
        ...prev,
        isLoading: false,
      }));
    }
  });

  const sendMessage = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/simplysetup/message", {
        sessionId: chatState.sessionId,
        message
      });
      return response.json();
    },
    onSuccess: (data) => {
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, {
          role: "assistant",
          content: data.message,
          timestamp: new Date().toISOString()
        }],
        currentStep: data.currentStep,
        isLoading: false,
        requiresDocumentUpload: data.requiresDocumentUpload,
        requiresPayment: data.requiresPayment,
        pricing: data.pricing,
      }));
    },
    onError: () => {
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        messages: [...prev.messages, {
          role: "assistant",
          content: "I apologize, I'm having trouble processing that. Could you please try again?",
          timestamp: new Date().toISOString()
        }]
      }));
    }
  });

  const uploadDocument = useMutation({
    mutationFn: async ({ file, docType }: { file: File; docType: string }) => {
      const formData = new FormData();
      formData.append("document", file);
      formData.append("documentType", docType);
      
      const response = await fetch(`/api/simplysetup/upload/${chatState.sessionId}`, {
        method: "POST",
        body: formData,
      });
      return response.json();
    },
    onSuccess: (data) => {
      setUploadedDocs(data.uploadedDocs);
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, {
          role: "assistant",
          content: `Document uploaded successfully! ${data.allDocsUploaded ? "All required documents are uploaded. You can now proceed to payment." : `Uploaded: ${data.uploadedDocs.join(", ")}`}`,
          timestamp: new Date().toISOString()
        }]
      }));
      if (data.allDocsUploaded) {
        setChatState(prev => ({
          ...prev,
          requiresPayment: true,
          requiresDocumentUpload: false,
        }));
      }
    }
  });

  const createPaymentOrder = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/simplysetup/create-order/${chatState.sessionId}`);
      return response.json();
    },
    onSuccess: async (data) => {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount * 100,
        currency: data.currency,
        name: "TheGSTCo - SimplySetup",
        description: data.description,
        order_id: data.orderId,
        handler: async (response: any) => {
          const verifyResponse = await apiRequest("POST", "/api/simplysetup/verify-payment", {
            sessionId: chatState.sessionId,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
          const result = await verifyResponse.json();
          
          if (result.success) {
            setChatState(prev => ({
              ...prev,
              currentStep: "complete",
              requiresPayment: false,
              messages: [...prev.messages, {
                role: "assistant",
                content: "Payment successful! Our team will start processing your GST registration. You'll receive an email shortly.",
                timestamp: new Date().toISOString()
              }]
            }));
          } else {
            setChatState(prev => ({
              ...prev,
              messages: [...prev.messages, {
                role: "assistant",
                content: "Payment verification failed. Please try again or contact support.",
                timestamp: new Date().toISOString()
              }]
            }));
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#0ea5e9"
        }
      };
      
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    }
  });

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setChatState(prev => ({ ...prev, isLoading: true }));
      submitLeadForm.mutate(formData);
    }
  };

  const handleSend = () => {
    if (!inputValue.trim() || chatState.isLoading) return;
    
    const userMessage = inputValue.trim();
    setInputValue("");
    
    setChatState(prev => ({
      ...prev,
      isLoading: true,
      messages: [...prev.messages, {
        role: "user",
        content: userMessage,
        timestamp: new Date().toISOString()
      }]
    }));
    
    sendMessage.mutate(userMessage);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedDocType) {
      uploadDocument.mutate({ file, docType: selectedDocType });
      setSelectedDocType("");
    }
  };

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
        return <li key={i} className="ml-4">{line.replace(/^[•\-*]\s*/, '')}</li>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-semibold">{line.replace(/\*\*/g, '')}</p>;
      }
      return <p key={i}>{line}</p>;
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={handleOpen}
        className="hidden md:flex fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 items-center justify-center group"
        data-testid="simplysetup-chat-button"
      >
        <MessageCircle className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
        <span className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
        </span>
      </button>
    );
  }

  if (isMinimized) {
    return (
      <div
        className="fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-900 rounded-lg shadow-xl border cursor-pointer hover:shadow-2xl transition-shadow"
        onClick={() => setIsMinimized(false)}
        data-testid="simplysetup-chat-minimized"
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <Bot className="w-5 h-5 text-sky-500" />
          <span className="font-medium">SimplySetup AI</span>
          <Badge variant="secondary" className="ml-2">Active</Badge>
          <Maximize2 className="w-4 h-4 ml-2 text-gray-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[400px] max-h-[600px] flex flex-col" data-testid="simplysetup-chat-container">
      <Card className="flex flex-col h-[600px] shadow-2xl border-2">
        <CardHeader className="py-3 px-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-t-lg flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              <div>
                <CardTitle className="text-lg font-semibold">SimplySetup AI</CardTitle>
                <p className="text-xs text-sky-100">Your GST Registration Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={() => setIsMinimized(true)}
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          {showForm ? (
            <div className="flex-1 p-6 flex flex-col">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Let's get started!
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Share your details to begin GST registration
                </p>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-4 flex-1">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={formErrors.name ? "border-red-500" : ""}
                    data-testid="lead-form-name"
                  />
                  {formErrors.name && (
                    <p className="text-xs text-red-500">{formErrors.name}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className={formErrors.email ? "border-red-500" : ""}
                    data-testid="lead-form-email"
                  />
                  {formErrors.email && (
                    <p className="text-xs text-red-500">{formErrors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className={formErrors.phone ? "border-red-500" : ""}
                    data-testid="lead-form-phone"
                  />
                  {formErrors.phone && (
                    <p className="text-xs text-red-500">{formErrors.phone}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full mt-6 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700"
                  disabled={submitLeadForm.isPending}
                  data-testid="lead-form-submit"
                >
                  {submitLeadForm.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Please wait...
                    </>
                  ) : (
                    <>
                      Start Chat
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
              
              <p className="text-xs text-center text-gray-400 mt-4">
                Your information is secure and will not be shared
              </p>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {chatState.messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                          msg.role === "user"
                            ? "bg-sky-500 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        <div className="space-y-1">{formatMessage(msg.content)}</div>
                      </div>
                      {msg.role === "user" && (
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {chatState.isLoading && (
                    <div className="flex gap-2 justify-start">
                      <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center">
                        <Loader2 className="w-4 h-4 text-sky-600 animate-spin" />
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
                        <span className="text-sm text-gray-500">Thinking...</span>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              {chatState.requiresDocumentUpload && (
                <div className="border-t p-3 bg-gray-50 dark:bg-gray-900">
                  <p className="text-xs font-medium mb-2 text-gray-600 dark:text-gray-400">
                    Upload Documents
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {DOCUMENT_TYPES.map(doc => (
                      <Button
                        key={doc.id}
                        variant={uploadedDocs.includes(doc.id) ? "secondary" : "outline"}
                        size="sm"
                        className="text-xs h-7"
                        disabled={uploadedDocs.includes(doc.id)}
                        onClick={() => {
                          setSelectedDocType(doc.id);
                          fileInputRef.current?.click();
                        }}
                      >
                        {uploadedDocs.includes(doc.id) ? (
                          <CheckCircle2 className="w-3 h-3 mr-1 text-green-500" />
                        ) : (
                          <Upload className="w-3 h-3 mr-1" />
                        )}
                        {doc.label}
                      </Button>
                    ))}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileUpload}
                  />
                </div>
              )}
              
              {chatState.requiresPayment && chatState.pricing && (
                <div className="border-t p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {chatState.pricing.package}
                      </p>
                      <p className="text-xs text-gray-500">{chatState.pricing.description}</p>
                    </div>
                    <p className="text-lg font-bold text-green-600">
                      ₹{chatState.pricing.price.toLocaleString()}
                    </p>
                  </div>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => createPaymentOrder.mutate()}
                    disabled={createPaymentOrder.isPending}
                  >
                    {createPaymentOrder.isPending ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <CreditCard className="w-4 h-4 mr-2" />
                    )}
                    Pay Now
                  </Button>
                </div>
              )}
              
              {chatState.currentStep !== "complete" && (
                <div className="border-t p-3">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      disabled={chatState.isLoading}
                      data-testid="simplysetup-chat-input"
                    />
                    <Button 
                      onClick={handleSend} 
                      disabled={chatState.isLoading || !inputValue.trim()}
                      size="icon"
                      data-testid="simplysetup-send-button"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
