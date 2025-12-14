import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Calendar, CheckCircle, Clock, FileText, IndianRupee, Wallet } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';

interface GSPFilingRecord {
  returnType: string;
  taxPeriod: string;
  filingDate?: string;
  status: 'filed' | 'not_filed' | 'late_filed' | 'overdue';
  dueDate: string;
  grossTurnover?: number;
  taxLiability?: number;
  penalties?: number;
  interestAmount?: number;
  arn?: string;
  acknowledgmentNumber?: string;
}

interface GSPUpcomingDue {
  returnType: string;
  taxPeriod: string;
  dueDate: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  daysRemaining: number;
}

interface GSPData {
  success: boolean;
  data?: {
    filingHistory: GSPFilingRecord[];
    upcomingDues: GSPUpcomingDue[];
    gstin: string;
    businessName: string;
    registrationDate: string;
    status: 'active' | 'cancelled' | 'suspended';
  };
  error?: string;
}

interface GSPFilingHistoryProps {
  gstin: string;
}

export function GSPFilingHistory({ gstin }: GSPFilingHistoryProps) {
  const [activeTab, setActiveTab] = useState('history');

  const { data: gspData, isLoading, error } = useQuery<GSPData>({
    queryKey: ['/api/comply/gsp/comprehensive', gstin],
    enabled: !!gstin
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            GST Filing History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !gspData?.success) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            GST Filing History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <p className="text-gray-600">Unable to fetch filing history</p>
            <p className="text-sm text-gray-500 mt-1">
              {gspData?.error || 'Please check your GSTIN and try again'}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { filingHistory, upcomingDues, businessName, status } = gspData.data!;

  const getStatusBadge = (status: GSPFilingRecord['status']) => {
    const variants = {
      'filed': 'default',
      'not_filed': 'destructive',
      'late_filed': 'secondary',
      'overdue': 'destructive'
    } as const;

    const labels = {
      'filed': 'Filed',
      'not_filed': 'Not Filed',
      'late_filed': 'Late Filed',
      'overdue': 'Overdue'
    };

    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: GSPUpcomingDue['priority']) => {
    const variants = {
      'high': 'destructive',
      'medium': 'secondary',
      'low': 'outline'
    } as const;

    return (
      <Badge variant={variants[priority]}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
      </Badge>
    );
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const urgentDues = upcomingDues.filter(due => due.priority === 'high' || due.daysRemaining <= 7);

  return (
    <div className="space-y-6">
      {/* Business Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            GST Registration Status
          </CardTitle>
          <CardDescription>GSTIN: {gstin}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Business Name</p>
              <p className="text-lg font-semibold">{businessName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Registration Status</p>
              <Badge variant={status === 'active' ? 'default' : 'secondary'}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Filings</p>
              <p className="text-lg font-semibold">{filingHistory.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Urgent Dues Alert */}
      {urgentDues.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              Urgent Action Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {urgentDues.map((due, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                  <div>
                    <p className="font-medium">{due.returnType} - {due.taxPeriod}</p>
                    <p className="text-sm text-gray-600">{due.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-red-700">{due.daysRemaining} days left</p>
                    <p className="text-xs text-gray-500">Due: {format(new Date(due.dueDate), 'MMM dd, yyyy')}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filing History & Upcoming Dues Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="history">Filing History</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Dues</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent Filing History
              </CardTitle>
              <CardDescription>
                Last {filingHistory.length} filed returns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filingHistory.map((filing, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{filing.returnType}</h3>
                        {getStatusBadge(filing.status)}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{filing.taxPeriod}</p>
                        {filing.filingDate && (
                          <p className="text-xs text-gray-500">
                            Filed: {format(new Date(filing.filingDate), 'MMM dd, yyyy')}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                      {filing.grossTurnover && (
                        <div>
                          <p className="text-gray-600">Gross Turnover</p>
                          <p className="font-medium">{formatCurrency(filing.grossTurnover)}</p>
                        </div>
                      )}
                      {filing.taxLiability && (
                        <div>
                          <p className="text-gray-600">Tax Liability</p>
                          <p className="font-medium">{formatCurrency(filing.taxLiability)}</p>
                        </div>
                      )}
                      {filing.penalties && filing.penalties > 0 && (
                        <div>
                          <p className="text-gray-600">Penalties</p>
                          <p className="font-medium text-red-600">{formatCurrency(filing.penalties)}</p>
                        </div>
                      )}
                      {filing.interestAmount && filing.interestAmount > 0 && (
                        <div>
                          <p className="text-gray-600">Interest</p>
                          <p className="font-medium text-orange-600">{formatCurrency(filing.interestAmount)}</p>
                        </div>
                      )}
                    </div>

                    {filing.arn && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs text-gray-500">ARN: {filing.arn}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Due Dates
              </CardTitle>
              <CardDescription>
                Next {upcomingDues.length} filing due dates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDues.map((due, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{due.returnType}</h3>
                        {getPriorityBadge(due.priority)}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{due.taxPeriod}</p>
                        <p className="text-xs text-gray-500">
                          Due: {format(new Date(due.dueDate), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{due.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span className={`font-medium ${
                          due.daysRemaining <= 7 ? 'text-red-600' : 
                          due.daysRemaining <= 15 ? 'text-orange-600' : 'text-green-600'
                        }`}>
                          {due.daysRemaining} days remaining
                        </span>
                      </div>
                      
                      <Button size="sm" variant="outline">
                        Set Reminder
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}