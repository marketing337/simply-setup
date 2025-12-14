import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface LeadData {
  entityType?: string;
  legalName?: string;
  tradeName?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  stateOfRegistration?: string;
  city?: string;
  hasOwnOffice?: boolean;
  needsVirtualOffice?: boolean;
  virtualOfficeLocation?: string;
  natureOfBusiness?: string;
  platforms?: string[];
  approxTurnover?: string;
  gstScheme?: string;
  currentStep?: string;
}

const SYSTEM_PROMPT = `You are SimplySetup AI, a GST registration assistant for TheGSTCo. Always respond in JSON format.

## CRITICAL: Keep ALL responses SHORT (1-2 sentences max)
- Be direct and to the point
- No unnecessary pleasantries or filler words
- Ask ONE thing at a time
- No long explanations unless user asks

## Conversation Flow
Collect information in this order:

1. **ENTITY TYPE** (currentStep: entity_type) - Ask entity type: Proprietorship, Partnership, LLP, Private Limited, OPC, Public Limited
2. **BUSINESS NAMES** (currentStep: business_names) - Get Legal Name only (set tradeName same as legalName automatically)
3. **LOCATION** (currentStep: location) - State and City
4. **OFFICE DETAILS** (currentStep: office_details) - Own office or need Virtual Office?
5. **BUSINESS DETAILS** (currentStep: business_details) - Nature of business, platforms (if e-commerce), turnover, GST scheme
6. **SUMMARY** (currentStep: summary) - Show brief summary, confirm details
7. **DOCUMENTS** (currentStep: documents) - List required docs: PAN, Aadhaar, Bank Proof, Photo, Address Proof
8. **PAYMENT** (currentStep: payment) - Show pricing, guide to pay

## JSON Response Format
{"message": "Short response", "extractedData": {"legalName": "value", "tradeName": "value", "email": "value", "phone": "value", "entityType": "value", "stateOfRegistration": "value", "city": "value", "hasOwnOffice": true/false, "needsVirtualOffice": true/false, "virtualOfficeLocation": "value", "natureOfBusiness": "value", "platforms": [], "approxTurnover": "value", "gstScheme": "value"}, "nextStep": "step_name", "isComplete": false, "requiresDocumentUpload": false, "requiresPayment": false, "summary": null}

IMPORTANT: Use EXACT field names in extractedData: legalName, tradeName (set same as legalName), email, phone, entityType, stateOfRegistration, city, etc.

## Rules
1. MAX 1-2 sentences per response
2. ALWAYS ask the next question - never end without a question (except at payment step)
3. No fluff, no filler, no excessive thank yous
4. Pricing: Regular ₹2,999-₹4,999, With VO ₹7,999-₹12,999
5. Normalize platforms to: amazon, flipkart, meesho, myntra, own_website, other
6. Example good response: "Got it, LLP. What's your business name?"
7. Example bad response: "Got it, you're registering an LLP." (missing next question)`;

export async function processSimplySetupMessage(
  userMessage: string,
  conversationHistory: ChatMessage[],
  currentData: LeadData
): Promise<{
  message: string;
  extractedData: Partial<LeadData>;
  nextStep: string;
  isComplete: boolean;
  requiresDocumentUpload: boolean;
  requiresPayment: boolean;
  summary: string | null;
}> {
  const contextMessage = `
Current collected data:
${JSON.stringify(currentData, null, 2)}

Current step: ${currentData.currentStep || 'greeting'}
`;

  const messages: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "system", content: contextMessage },
    ...conversationHistory,
    { role: "user", content: userMessage }
  ];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages as any,
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    const parsed = JSON.parse(content);
    
    return {
      message: parsed.message || "I apologize, I'm having trouble processing that. Could you please try again?",
      extractedData: parsed.extractedData || {},
      nextStep: parsed.nextStep || currentData.currentStep || "greeting",
      isComplete: parsed.isComplete || false,
      requiresDocumentUpload: parsed.requiresDocumentUpload || false,
      requiresPayment: parsed.requiresPayment || false,
      summary: parsed.summary || null
    };
  } catch (error) {
    console.error("SimplySetup AI Error:", error);
    return {
      message: "I apologize for the technical difficulty. Let me try again. Could you please repeat what you said?",
      extractedData: {},
      nextStep: currentData.currentStep || "greeting",
      isComplete: false,
      requiresDocumentUpload: false,
      requiresPayment: false,
      summary: null
    };
  }
}

export async function generateLeadSummary(leadData: LeadData): Promise<string> {
  const prompt = `Generate a professional summary of this GST registration lead:

${JSON.stringify(leadData, null, 2)}

Format it nicely with sections for:
1. Business Information
2. Contact Details
3. Office Requirements
4. Business Nature & Details
5. Recommended Package

Keep it concise but complete. Use simple formatting with bullet points.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a helpful assistant that generates professional business summaries." },
        { role: "user", content: prompt }
      ],
      temperature: 0.5
    });

    return response.choices[0]?.message?.content || "Summary generation failed.";
  } catch (error) {
    console.error("Summary generation error:", error);
    return "Unable to generate summary at this time.";
  }
}

export function getInitialGreeting(name?: string): string {
  const greeting = name ? `Hi ${name}!` : `Hi!`;
  return `${greeting} What type of business entity are you registering? (Proprietorship, Partnership, LLP, Private Limited, OPC, or Public Limited)`;
}

export function getPricingInfo(leadData: LeadData): { package: string; price: number; description: string } {
  const needsVO = leadData.needsVirtualOffice;
  const entityType = leadData.entityType?.toLowerCase();
  
  let basePrice = 2999;
  let packageName = "GST Registration - Basic";
  let description = "Standard GST Registration";
  
  if (entityType === "private limited" || entityType === "pvt_ltd") {
    basePrice = 4999;
    packageName = "GST Registration - Company";
    description = "GST Registration for Private Limited Company";
  } else if (entityType === "llp") {
    basePrice = 3999;
    packageName = "GST Registration - LLP";
    description = "GST Registration for LLP";
  }
  
  if (needsVO) {
    basePrice += 6000;
    packageName += " + Virtual Office";
    description += " with Virtual Office Address";
  }
  
  return { package: packageName, price: basePrice, description };
}
