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

interface GSPResponse {
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

export class GSPAPIService {
  private apiKey: string;
  private baseUrl: string = 'https://api.gsp.gov.in/v1'; // Stubbed endpoint

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.GSP_API_KEY || 'STUB_GSP_KEY_12345';
  }

  private async makeRequest(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    // This is a stubbed implementation since we don't have real GSP API access
    console.log(`GSP API Request: ${endpoint}`, params);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    return this.generateStubResponse(params.gstin);
  }

  private generateStubResponse(gstin: string): GSPResponse {
    // Generate realistic stub data based on GSTIN
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const filingHistory: GSPFilingRecord[] = [];
    const upcomingDues: GSPUpcomingDue[] = [];

    // Generate filing history for past 12 months
    for (let i = 1; i <= 12; i++) {
      const monthDate = new Date(currentYear, currentMonth - i, 1);
      const monthStr = monthDate.toISOString().substring(0, 7); // YYYY-MM format
      
      // GSTR-1 (Monthly)
      filingHistory.push({
        returnType: 'GSTR-1',
        taxPeriod: monthStr,
        filingDate: Math.random() > 0.2 ? new Date(monthDate.getFullYear(), monthDate.getMonth(), 10 + Math.floor(Math.random() * 10)).toISOString() : undefined,
        status: Math.random() > 0.2 ? 'filed' : 'not_filed',
        dueDate: new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 11).toISOString(),
        grossTurnover: Math.floor(Math.random() * 5000000) + 500000,
        taxLiability: Math.floor(Math.random() * 90000) + 10000,
        arn: Math.random() > 0.2 ? `ARN${gstin.substring(0, 8)}${Date.now()}` : undefined
      });

      // GSTR-3B (Monthly)
      filingHistory.push({
        returnType: 'GSTR-3B',
        taxPeriod: monthStr,
        filingDate: Math.random() > 0.15 ? new Date(monthDate.getFullYear(), monthDate.getMonth(), 18 + Math.floor(Math.random() * 5)).toISOString() : undefined,
        status: Math.random() > 0.15 ? 'filed' : 'not_filed',
        dueDate: new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 20).toISOString(),
        grossTurnover: Math.floor(Math.random() * 5000000) + 500000,
        taxLiability: Math.floor(Math.random() * 90000) + 10000,
        penalties: Math.random() > 0.7 ? Math.floor(Math.random() * 5000) : 0,
        interestAmount: Math.random() > 0.7 ? Math.floor(Math.random() * 2000) : 0,
        arn: Math.random() > 0.15 ? `ARN${gstin.substring(0, 8)}${Date.now()}` : undefined
      });
    }

    // Generate upcoming due dates for next 3 months
    for (let i = 0; i < 3; i++) {
      const futureDate = new Date(currentYear, currentMonth + i + 1, 1);
      const monthStr = futureDate.toISOString().substring(0, 7);
      
      // GSTR-1 due
      const gstr1Due = new Date(futureDate.getFullYear(), futureDate.getMonth() + 1, 11);
      const gstr1DaysRemaining = Math.ceil((gstr1Due.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (gstr1DaysRemaining > 0) {
        upcomingDues.push({
          returnType: 'GSTR-1',
          taxPeriod: monthStr,
          dueDate: gstr1Due.toISOString(),
          description: `GSTR-1 return for ${monthStr}`,
          priority: gstr1DaysRemaining <= 7 ? 'high' : gstr1DaysRemaining <= 15 ? 'medium' : 'low',
          daysRemaining: gstr1DaysRemaining
        });
      }

      // GSTR-3B due
      const gstr3bDue = new Date(futureDate.getFullYear(), futureDate.getMonth() + 1, 20);
      const gstr3bDaysRemaining = Math.ceil((gstr3bDue.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (gstr3bDaysRemaining > 0) {
        upcomingDues.push({
          returnType: 'GSTR-3B',
          taxPeriod: monthStr,
          dueDate: gstr3bDue.toISOString(),
          description: `GSTR-3B return for ${monthStr}`,
          priority: gstr3bDaysRemaining <= 7 ? 'high' : gstr3bDaysRemaining <= 15 ? 'medium' : 'low',
          daysRemaining: gstr3bDaysRemaining
        });
      }
    }

    // Sort by due date
    upcomingDues.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    return {
      success: true,
      data: {
        filingHistory: filingHistory.filter(f => f.status === 'filed').slice(0, 20), // Last 20 filed returns
        upcomingDues: upcomingDues.slice(0, 10), // Next 10 due dates
        gstin: gstin,
        businessName: `Business Entity ${gstin.substring(2, 7)}`,
        registrationDate: new Date(2020, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
        status: 'active'
      }
    };
  }

  async getFilingHistory(gstin: string): Promise<GSPResponse> {
    try {
      const response = await this.makeRequest('/filing-history', { gstin });
      return response;
    } catch (error) {
      console.error('GSP API Error:', error);
      return {
        success: false,
        error: 'Failed to fetch filing history from GSP API'
      };
    }
  }

  async getUpcomingDues(gstin: string): Promise<GSPResponse> {
    try {
      const response = await this.makeRequest('/upcoming-dues', { gstin });
      return response;
    } catch (error) {
      console.error('GSP API Error:', error);
      return {
        success: false,
        error: 'Failed to fetch upcoming dues from GSP API'
      };
    }
  }

  async getGSTINDetails(gstin: string): Promise<GSPResponse> {
    try {
      const response = await this.makeRequest('/gstin-details', { gstin });
      return response;
    } catch (error) {
      console.error('GSP API Error:', error);
      return {
        success: false,
        error: 'Failed to fetch GSTIN details from GSP API'
      };
    }
  }

  async getComprehensiveData(gstin: string): Promise<GSPResponse> {
    try {
      // Combine all data sources
      const response = await this.makeRequest('/comprehensive-data', { gstin });
      return response;
    } catch (error) {
      console.error('GSP API Error:', error);
      return {
        success: false,
        error: 'Failed to fetch comprehensive GST data'
      };
    }
  }

  validateGSTIN(gstin: string): boolean {
    // GSTIN format: 2 digits state code + 10 characters PAN + 1 character entity number + 1 character 'Z' + 1 character check digit
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
    return gstinRegex.test(gstin);
  }
}

// Singleton instance
export const gspApiService = new GSPAPIService();