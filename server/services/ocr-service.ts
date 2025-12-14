import { createWorker } from 'tesseract.js';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

interface ExtractedGSTData {
  gstin?: string;
  legalName?: string;
  tradeName?: string;
  registrationDate?: string;
  constitutionOfBusiness?: string;
  address?: string;
  state?: string;
  pinCode?: string;
}

export class OCRService {
  private worker: any = null;

  async initializeWorker() {
    if (!this.worker) {
      this.worker = await createWorker('eng');
    }
    return this.worker;
  }

  async cleanup() {
    if (this.worker) {
      await this.worker.terminate();
      this.worker = null;
    }
  }

  async extractTextFromImage(imagePath: string): Promise<string> {
    const worker = await this.initializeWorker();
    
    try {
      // Optimize image for OCR
      const optimizedBuffer = await sharp(imagePath)
        .resize({ width: 2000, height: 2000, fit: 'inside' })
        .greyscale()
        .normalize()
        .sharpen()
        .png()
        .toBuffer();

      const { data: { text } } = await worker.recognize(optimizedBuffer);
      return text;
    } catch (error) {
      console.error('OCR processing error:', error);
      throw new Error('Failed to extract text from image');
    }
  }

  async extractTextFromPDF(pdfPath: string): Promise<string> {
    try {
      // Dynamic import to avoid initialization issues
      const pdfParse = (await import('pdf-parse')).default;
      const dataBuffer = await fs.readFile(pdfPath);
      const data = await pdfParse(dataBuffer);
      return data.text;
    } catch (error) {
      console.error('PDF processing error:', error);
      throw new Error('Failed to extract text from PDF');
    }
  }

  extractGSTDataFromText(text: string): ExtractedGSTData {
    const extractedData: ExtractedGSTData = {};

    // Extract GSTIN (15-character alphanumeric code)
    const gstinPattern = /\b[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}\b/g;
    const gstinMatch = text.match(gstinPattern);
    if (gstinMatch && gstinMatch[0]) {
      extractedData.gstin = gstinMatch[0];
    }

    // Extract Legal Name (usually after "Legal Name" or "Name of the Taxpayer")
    const legalNamePatterns = [
      /(?:legal\s*name|name\s*of\s*the\s*taxpayer|taxpayer\s*name)[:\s]*([A-Za-z\s&.,()'-]+?)(?:\n|$|(?=\b(?:trade|constitution|address|gstin|registration)\b))/i,
      /name\s*:\s*([A-Za-z\s&.,()'-]+?)(?:\n|$)/i
    ];
    
    for (const pattern of legalNamePatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        extractedData.legalName = match[1].trim().replace(/\s+/g, ' ');
        break;
      }
    }

    // Extract Trade Name
    const tradeNamePattern = /(?:trade\s*name|trading\s*as)[:\s]*([A-Za-z\s&.,()'-]+?)(?:\n|$|(?=\b(?:legal|constitution|address|gstin|registration)\b))/i;
    const tradeNameMatch = text.match(tradeNamePattern);
    if (tradeNameMatch && tradeNameMatch[1]) {
      extractedData.tradeName = tradeNameMatch[1].trim().replace(/\s+/g, ' ');
    }

    // Extract Registration Date
    const datePatterns = [
      /(?:registration\s*date|date\s*of\s*registration|effective\s*date)[:\s]*(\d{1,2}[\/-]\d{1,2}[\/-]\d{4})/i,
      /(?:registration\s*date|date\s*of\s*registration|effective\s*date)[:\s]*(\d{1,2}\s+[A-Za-z]+\s+\d{4})/i
    ];
    
    for (const pattern of datePatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        extractedData.registrationDate = match[1].trim();
        break;
      }
    }

    // Extract Constitution of Business
    const constitutionPattern = /(?:constitution\s*of\s*business|nature\s*of\s*business)[:\s]*([A-Za-z\s&.,()'-]+?)(?:\n|$|(?=\b(?:address|gstin|registration|date)\b))/i;
    const constitutionMatch = text.match(constitutionPattern);
    if (constitutionMatch && constitutionMatch[1]) {
      extractedData.constitutionOfBusiness = constitutionMatch[1].trim().replace(/\s+/g, ' ');
    }

    // Extract Address
    const addressPattern = /(?:address|principal\s*place)[:\s]*([A-Za-z0-9\s,.-]+?)(?:\n.*?)*?(?=\b(?:state|pin|gstin|constitution)\b)/i;
    const addressMatch = text.match(addressPattern);
    if (addressMatch && addressMatch[1]) {
      extractedData.address = addressMatch[1].trim().replace(/\s+/g, ' ');
    }

    // Extract State
    const statePattern = /(?:state|state\s*name)[:\s]*([A-Za-z\s]+?)(?:\n|$|(?=\b(?:pin|code|gstin)\b))/i;
    const stateMatch = text.match(statePattern);
    if (stateMatch && stateMatch[1]) {
      extractedData.state = stateMatch[1].trim().replace(/\s+/g, ' ');
    }

    // Extract PIN Code
    const pinPattern = /(?:pin|pincode|postal\s*code)[:\s]*(\d{6})/i;
    const pinMatch = text.match(pinPattern);
    if (pinMatch && pinMatch[1]) {
      extractedData.pinCode = pinMatch[1];
    }

    return extractedData;
  }

  async processGSTCertificate(filePath: string, mimeType: string): Promise<ExtractedGSTData> {
    try {
      let text: string;

      if (mimeType === 'application/pdf') {
        text = await this.extractTextFromPDF(filePath);
      } else if (mimeType.startsWith('image/')) {
        text = await this.extractTextFromImage(filePath);
      } else {
        throw new Error('Unsupported file type for OCR processing');
      }

      const extractedData = this.extractGSTDataFromText(text);
      
      console.log('OCR Extracted Data:', extractedData);
      console.log('Full OCR Text (first 500 chars):', text.substring(0, 500));
      
      return extractedData;
    } catch (error) {
      console.error('GST certificate processing error:', error);
      throw error;
    }
  }
}

// Singleton instance
export const ocrService = new OCRService();

// Cleanup on process termination
process.on('SIGINT', async () => {
  await ocrService.cleanup();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await ocrService.cleanup();
  process.exit(0);
});