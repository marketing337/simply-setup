import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiRequest } from "@/lib/queryClient";
import {
  Users,
  Eye,
  FileText,
  Phone,
  Mail,
  Building,
  MapPin,
  CreditCard,
  MessageCircle,
  Download,
  RefreshCw,
  Search,
  Filter,
} from "lucide-react";

interface Lead {
  id: number;
  sessionId: string;
  entityType: string | null;
  legalName: string | null;
  tradeName: string | null;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  stateOfRegistration: string | null;
  city: string | null;
  hasOwnOffice: boolean | null;
  needsVirtualOffice: boolean | null;
  virtualOfficeLocation: string | null;
  natureOfBusiness: string | null;
  platforms: string[] | null;
  approxTurnover: string | null;
  gstScheme: string | null;
  selectedPackage: string | null;
  packagePrice: string | null;
  paymentStatus: string;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  summary: string | null;
  status: string;
  assignedTo: string | null;
  notes: string | null;
  conversationHistory: string | null;
  currentStep: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Document {
  id: number;
  leadId: number;
  documentType: string;
  fileName: string;
  fileUrl: string;
  status: string;
}

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  qualified: "bg-purple-100 text-purple-800",
  documents_pending: "bg-yellow-100 text-yellow-800",
  documents_uploaded: "bg-green-100 text-green-800",
  payment_pending: "bg-orange-100 text-orange-800",
  payment_complete: "bg-emerald-100 text-emerald-800",
  handed_off: "bg-indigo-100 text-indigo-800",
  completed: "bg-gray-100 text-gray-800",
};

const PAYMENT_STATUS_COLORS: Record<string, string> = {
  pending: "bg-gray-100 text-gray-800",
  paid: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  refunded: "bg-blue-100 text-blue-800",
};

export default function SimplySetupLeadsAdmin() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedDocuments, setSelectedDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: leads, isLoading, refetch } = useQuery<Lead[]>({
    queryKey: ["/api/admin/simplysetup/leads"],
  });

  const updateLeadMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Lead> }) => {
      const response = await apiRequest("PATCH", `/api/admin/simplysetup/leads/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/simplysetup/leads"] });
    },
  });

  const viewLeadDetails = async (lead: Lead) => {
    const response = await fetch(`/api/admin/simplysetup/leads/${lead.id}`);
    const data = await response.json();
    setSelectedLead(data.lead);
    setSelectedDocuments(data.documents || []);
    setIsDetailOpen(true);
  };

  const filteredLeads = leads?.filter((lead) => {
    const matchesSearch =
      !searchTerm ||
      lead.legalName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatConversation = (history: string | null) => {
    if (!history) return [];
    try {
      return JSON.parse(history);
    } catch {
      return [];
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">SimplySetup AI Leads</h1>
          <p className="text-gray-500">Manage leads from the AI chatbot</p>
        </div>
        <Button onClick={() => refetch()} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{leads?.length || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Payments Complete</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {leads?.filter((l) => l.paymentStatus === "paid").length || 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">
              {leads?.filter((l) => l.status === "documents_pending").length || 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">New Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">
              {leads?.filter((l) => {
                const created = new Date(l.createdAt);
                const today = new Date();
                return created.toDateString() === today.toDateString();
              }).length || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Leads</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="documents_pending">Docs Pending</SelectItem>
                  <SelectItem value="documents_uploaded">Docs Uploaded</SelectItem>
                  <SelectItem value="payment_pending">Payment Pending</SelectItem>
                  <SelectItem value="payment_complete">Payment Complete</SelectItem>
                  <SelectItem value="handed_off">Handed Off</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Entity Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads?.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{lead.legalName || "Not provided"}</p>
                        <p className="text-sm text-gray-500">{lead.tradeName || lead.sessionId}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {lead.email && (
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="w-3 h-3" />
                            {lead.email}
                          </div>
                        )}
                        {lead.phone && (
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="w-3 h-3" />
                            {lead.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{lead.entityType || "-"}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={STATUS_COLORS[lead.status]}>
                        {lead.status.replace(/_/g, " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={PAYMENT_STATUS_COLORS[lead.paymentStatus]}>
                        {lead.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {formatDate(lead.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewLeadDetails(lead)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Lead Details - {selectedLead?.legalName || selectedLead?.sessionId}
            </DialogTitle>
          </DialogHeader>

          {selectedLead && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Business Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Entity Type:</span>
                      <span className="font-medium">{selectedLead.entityType || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Legal Name:</span>
                      <span className="font-medium">{selectedLead.legalName || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Trade Name:</span>
                      <span className="font-medium">{selectedLead.tradeName || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Nature:</span>
                      <span className="font-medium">{selectedLead.natureOfBusiness || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Platforms:</span>
                      <span className="font-medium">
                        {selectedLead.platforms?.join(", ") || "-"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">GST Scheme:</span>
                      <span className="font-medium">{selectedLead.gstScheme || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Turnover:</span>
                      <span className="font-medium">{selectedLead.approxTurnover || "-"}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Contact & Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email:</span>
                      <span className="font-medium">{selectedLead.email || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Phone:</span>
                      <span className="font-medium">{selectedLead.phone || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">WhatsApp:</span>
                      <span className="font-medium">{selectedLead.whatsapp || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">State:</span>
                      <span className="font-medium">{selectedLead.stateOfRegistration || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">City:</span>
                      <span className="font-medium">{selectedLead.city || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Own Office:</span>
                      <span className="font-medium">
                        {selectedLead.hasOwnOffice ? "Yes" : selectedLead.needsVirtualOffice ? "Needs VO" : "-"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">VO Location:</span>
                      <span className="font-medium">{selectedLead.virtualOfficeLocation || "-"}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Payment & Package
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Package:</span>
                      <p className="font-medium">{selectedLead.selectedPackage || "-"}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Price:</span>
                      <p className="font-medium">
                        {selectedLead.packagePrice ? `₹${selectedLead.packagePrice}` : "-"}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Payment Status:</span>
                      <Badge className={`mt-1 ${PAYMENT_STATUS_COLORS[selectedLead.paymentStatus]}`}>
                        {selectedLead.paymentStatus}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-gray-500">Payment ID:</span>
                      <p className="font-medium text-xs">{selectedLead.razorpayPaymentId || "-"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {selectedDocuments.length > 0 && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Uploaded Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {selectedDocuments.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="text-sm font-medium">{doc.documentType}</p>
                            <p className="text-xs text-gray-500">{doc.fileName}</p>
                          </div>
                          <a
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Conversation History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {formatConversation(selectedLead.conversationHistory).map(
                        (msg: any, idx: number) => (
                          <div
                            key={idx}
                            className={`p-2 rounded-lg ${
                              msg.role === "user"
                                ? "bg-sky-50 ml-8"
                                : "bg-gray-50 mr-8"
                            }`}
                          >
                            <p className="text-xs text-gray-500 mb-1">
                              {msg.role === "user" ? "Customer" : "SimplySetup AI"}
                            </p>
                            <p className="text-sm">{msg.content}</p>
                          </div>
                        )
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Update Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Select
                      value={selectedLead.status}
                      onValueChange={(value) => {
                        updateLeadMutation.mutate({
                          id: selectedLead.id,
                          data: { status: value as any },
                        });
                        setSelectedLead({ ...selectedLead, status: value });
                      }}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                        <SelectItem value="documents_pending">Docs Pending</SelectItem>
                        <SelectItem value="documents_uploaded">Docs Uploaded</SelectItem>
                        <SelectItem value="payment_pending">Payment Pending</SelectItem>
                        <SelectItem value="payment_complete">Payment Complete</SelectItem>
                        <SelectItem value="handed_off">Handed Off</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Assigned to..."
                      value={selectedLead.assignedTo || ""}
                      onChange={(e) =>
                        setSelectedLead({ ...selectedLead, assignedTo: e.target.value })
                      }
                      onBlur={() => {
                        if (selectedLead.assignedTo) {
                          updateLeadMutation.mutate({
                            id: selectedLead.id,
                            data: { assignedTo: selectedLead.assignedTo },
                          });
                        }
                      }}
                      className="w-48"
                    />
                  </div>
                  <Textarea
                    placeholder="Internal notes..."
                    value={selectedLead.notes || ""}
                    onChange={(e) =>
                      setSelectedLead({ ...selectedLead, notes: e.target.value })
                    }
                    onBlur={() => {
                      updateLeadMutation.mutate({
                        id: selectedLead.id,
                        data: { notes: selectedLead.notes },
                      });
                    }}
                    className="mt-4"
                    rows={3}
                  />
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
