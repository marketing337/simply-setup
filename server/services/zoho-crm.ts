import axios from 'axios';

const ZOHO_CLIENT_ID = process.env.ZOHO_CLIENT_ID;
const ZOHO_CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET;
const ZOHO_REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN;

const ZOHO_ACCOUNTS_URL = 'https://accounts.zoho.in';
const ZOHO_API_URL = 'https://www.zohoapis.in';

let cachedAccessToken: string | null = null;
let tokenExpiry: number = 0;

export async function getAccessToken(): Promise<string> {
  if (cachedAccessToken && Date.now() < tokenExpiry) {
    return cachedAccessToken;
  }

  if (!ZOHO_REFRESH_TOKEN) {
    throw new Error('ZOHO_REFRESH_TOKEN not configured. Please complete OAuth setup first.');
  }

  try {
    const response = await axios.post(`${ZOHO_ACCOUNTS_URL}/oauth/v2/token`, null, {
      params: {
        refresh_token: ZOHO_REFRESH_TOKEN,
        client_id: ZOHO_CLIENT_ID,
        client_secret: ZOHO_CLIENT_SECRET,
        grant_type: 'refresh_token'
      }
    });

    cachedAccessToken = response.data.access_token;
    tokenExpiry = Date.now() + (response.data.expires_in - 60) * 1000;
    
    return cachedAccessToken as string;
  } catch (error: any) {
    console.error('Error getting Zoho access token:', error.response?.data || error.message);
    throw new Error('Failed to get Zoho access token');
  }
}

export async function generateAuthUrl(): Promise<string> {
  const redirectUri = 'https://simplysetup.replit.app/api/zoho/callback';
  const scope = 'ZohoCRM.modules.ALL,ZohoCRM.settings.ALL';
  
  return `${ZOHO_ACCOUNTS_URL}/oauth/v2/auth?scope=${scope}&client_id=${ZOHO_CLIENT_ID}&response_type=code&access_type=offline&redirect_uri=${encodeURIComponent(redirectUri)}`;
}

export async function exchangeCodeForTokens(code: string): Promise<{ access_token: string; refresh_token: string }> {
  const redirectUri = 'https://simplysetup.replit.app/api/zoho/callback';
  
  try {
    const response = await axios.post(`${ZOHO_ACCOUNTS_URL}/oauth/v2/token`, null, {
      params: {
        grant_type: 'authorization_code',
        client_id: ZOHO_CLIENT_ID,
        client_secret: ZOHO_CLIENT_SECRET,
        code: code,
        redirect_uri: redirectUri
      }
    });

    return {
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token
    };
  } catch (error: any) {
    console.error('Error exchanging code for tokens:', error.response?.data || error.message);
    throw new Error('Failed to exchange authorization code');
  }
}

export interface ZohoLeadData {
  name: string;
  phone: string;
  email: string;
  websiteLink?: string;
}

export async function createSalesDeal(leadData: ZohoLeadData): Promise<{ success: boolean; recordId?: string; error?: string }> {
  try {
    const accessToken = await getAccessToken();
    
    const response = await axios.post(
      `${ZOHO_API_URL}/crm/v2/Sales_Deals`,
      {
        data: [{
          Name: leadData.name,
          Phone: leadData.phone,
          Email: leadData.email,
          Lead_Source: 'SimplySetup AI Chatbot',
          Stage: 'Lead Generated',
          Website_Link: leadData.websiteLink || ''
        }]
      },
      {
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data?.data?.[0]?.status === 'success') {
      console.log('Successfully created Zoho Sales Deal:', response.data.data[0].details.id);
      return {
        success: true,
        recordId: response.data.data[0].details.id
      };
    } else {
      console.error('Zoho API returned error:', response.data);
      return {
        success: false,
        error: response.data?.data?.[0]?.message || 'Unknown error'
      };
    }
  } catch (error: any) {
    console.error('Error creating Zoho Sales Deal:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
}

export async function pushLeadToZoho(leadId: number, name: string, phone: string, email: string, websiteLink?: string): Promise<{ success: boolean; zohoRecordId?: string; error?: string }> {
  if (!name || !phone || !email) {
    return { success: false, error: 'Missing required fields (name, phone, email)' };
  }

  const result = await createSalesDeal({ name, phone, email, websiteLink });
  
  if (result.success) {
    console.log(`Lead ${leadId} successfully pushed to Zoho CRM as Sales Deal ${result.recordId}`);
  } else {
    console.error(`Failed to push lead ${leadId} to Zoho:`, result.error);
  }

  return {
    success: result.success,
    zohoRecordId: result.recordId,
    error: result.error
  };
}
