import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse';
import { storage } from './storage';
import { generateSlug } from './utils/slug-generator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface CsvRow {
  CIN?: string;
  CompanyName?: string;
  CompanyROCcode?: string;
  CompanyCategory?: string;
  CompanySubCategory?: string;
  CompanyClass?: string;
  AuthorizedCapital?: string;
  PaidupCapital?: string;
  CompanyRegistrationdate_date?: string;
  Registered_Office_Address?: string;
  Listingstatus?: string;
  CompanyStatus?: string;
  CompanyStateCode?: string;
  'CompanyIndian/Foreign Company'?: string;
  nic_code?: string;
  CompanyIndustrialClassification?: string;
}

async function processCsvFile() {
  const csvPath = path.join(__dirname, '..', 'attached_assets', '4dbe5667-7b6b-41d7-82af-211562424d9a_dff39c000aa72a24e9277a4913efcc74_1751199290233.csv');
  
  console.log('🚀 Starting bulk CSV processing...');
  console.log('📁 File path:', csvPath);
  
  // Check if file exists
  if (!fs.existsSync(csvPath)) {
    console.error('❌ CSV file not found at:', csvPath);
    return;
  }
  
  const fileStats = fs.statSync(csvPath);
  console.log('📊 File size:', (fileStats.size / 1024 / 1024).toFixed(2), 'MB');
  
  // Get existing CINs to avoid duplicates
  console.log('🔍 Loading existing companies for duplicate detection...');
  const existingCompanies = await storage.getAllCompanies();
  const existingCins = new Set(existingCompanies.map(c => c.cin));
  console.log('📋 Found', existingCins.size, 'existing companies in database');
  
  let processed = 0;
  let created = 0;
  let skipped = 0;
  const errors: string[] = [];
  
  // Parse CSV and process records
  return new Promise<void>((resolve, reject) => {
    const records: CsvRow[] = [];
    
    fs.createReadStream(csvPath)
      .pipe(parse({ 
        columns: true, 
        skip_empty_lines: true,
        trim: true 
      }))
      .on('data', (row: CsvRow) => {
        records.push(row);
      })
      .on('end', async () => {
        console.log('📋 CSV parsing complete. Total records:', records.length);
        
        try {
          // Process records in batches for better performance with large datasets
          const BATCH_SIZE = 1000; // Process 1000 companies at a time
          
          for (let i = 0; i < records.length; i += BATCH_SIZE) {
            const batch = records.slice(i, i + BATCH_SIZE);
            
            for (const row of batch) {
              processed++;
              
              const cin = row.CIN?.trim();
              const companyName = row.CompanyName?.trim();
              
              if (!cin || !companyName) {
                skipped++;
                continue;
              }

              if (existingCins.has(cin)) {
                skipped++;
                continue;
              }

              try {
                // Generate unique slug for company
                const baseSlug = generateSlug(companyName);
                const uniqueId = cin.slice(-8) + '-' + Date.now().toString().slice(-6);
                const slug = `${baseSlug}-${uniqueId}`.toLowerCase();

                const companyData = {
                  cin,
                  companyName,
                  slug,
                  companyROCcode: row.CompanyROCcode?.trim() || undefined,
                  companyCategory: row.CompanyCategory?.trim() || undefined,
                  companySubCategory: row.CompanySubCategory?.trim() || undefined,
                  companyClass: row.CompanyClass?.trim() || undefined,
                  authorizedCapital: row.AuthorizedCapital ? row.AuthorizedCapital.toString() : undefined,
                  paidupCapital: row.PaidupCapital ? row.PaidupCapital.toString() : undefined,
                  registrationDate: row.CompanyRegistrationdate_date?.trim() || null,
                  registeredOfficeAddress: row.Registered_Office_Address?.trim() || undefined,
                  listingStatus: row.Listingstatus?.trim() || undefined,
                  companyStatus: row.CompanyStatus?.trim() || undefined,
                  companyStateCode: row.CompanyStateCode?.trim() || undefined,
                  companyType: row['CompanyIndian/Foreign Company']?.trim() || undefined,
                  nicCode: row.nic_code?.trim() || undefined,
                  companyIndustrialClassification: row.CompanyIndustrialClassification?.trim() || undefined
                };

                await storage.createCompany(companyData);
                existingCins.add(cin);
                created++;

              } catch (error) {
                errors.push(`Failed to create company ${companyName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
                skipped++;
              }
            }
            
            // Log progress for large datasets
            if (i % (BATCH_SIZE * 10) === 0) {
              console.log(`📊 Progress: ${processed} processed, ${created} created, ${skipped} skipped`);
            }
          }
          
          console.log('✅ Bulk upload completed!');
          console.log('📊 Final stats:');
          console.log('  - Total processed:', processed);
          console.log('  - New companies created:', created);
          console.log('  - Skipped (duplicates/invalid):', skipped);
          console.log('  - Errors:', errors.length);
          
          if (errors.length > 0) {
            console.log('❌ First 10 errors:');
            errors.slice(0, 10).forEach(error => console.log('  -', error));
          }
          
          resolve();
          
        } catch (error) {
          console.error('❌ Processing failed:', error);
          reject(error);
        }
      })
      .on('error', (error) => {
        console.error('❌ CSV parsing error:', error);
        reject(error);
      });
  });
}

// Run the processing if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  processCsvFile()
    .then(() => {
      console.log('🎉 Processing complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Processing failed:', error);
      process.exit(1);
    });
}

export { processCsvFile };