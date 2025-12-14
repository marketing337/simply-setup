import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { db } from '../server/db.ts';
import { companies } from '../shared/schema.ts';
import { generateSlug } from '../server/utils/slug-generator.ts';

async function finalImport() {
  const csvFilePath = './attached_assets/4dbe5667-7b6b-41d7-82af-211562424d9a_dff39c000aa72a24e9277a4913efcc74_1751125765649.csv';
  
  console.log('Starting final import with optimized batch size...');
  
  let totalProcessed = 0;
  let totalInserted = 0;
  let totalSkipped = 0;
  let batchNumber = 1;
  const batchSize = 100; // Smaller batch size to avoid serialization errors
  const records = [];
  
  // Get existing CINs
  console.log('Loading existing records...');
  const existingCins = new Set();
  const existing = await db.select({ cin: companies.cin }).from(companies);
  existing.forEach(record => existingCins.add(record.cin));
  console.log(`Found ${existing.length} existing records`);
  
  return new Promise((resolve, reject) => {
    createReadStream(csvFilePath)
      .pipe(parse({ 
        columns: true, 
        skip_empty_lines: true,
        trim: true,
        relax_quotes: true,
        escape: '"'
      }))
      .on('data', async (row) => {
        try {
          totalProcessed++;
          
          const cin = row.CIN?.trim();
          const companyName = row.CompanyName?.trim();
          
          if (!cin || !companyName) {
            totalSkipped++;
            return;
          }
          
          if (existingCins.has(cin)) {
            totalSkipped++;
            return;
          }
          
          // Create unique slug with CIN suffix to avoid conflicts
          const baseSlug = generateSlug(companyName);
          const slug = `${baseSlug}-${cin.slice(-8)}`;
          
          const companyData = {
            cin,
            companyName,
            slug,
            companyROCcode: row.CompanyROCcode?.trim() || null,
            companyCategory: row.CompanyCategory?.trim() || null,
            companySubCategory: row.CompanySubCategory?.trim() || null,
            companyClass: row.CompanyClass?.trim() || null,
            authorizedCapital: row.AuthorizedCapital ? parseFloat(row.AuthorizedCapital) : null,
            paidupCapital: row.PaidupCapital ? parseFloat(row.PaidupCapital) : null,
            registrationDate: row.CompanyRegistrationdate_date?.trim() || null,
            registeredOfficeAddress: row.Registered_Office_Address?.trim() || null,
            listingStatus: row.Listingstatus?.trim() || null,
            companyStatus: row.CompanyStatus?.trim() || null,
            companyStateCode: row.CompanyStateCode?.trim() || null,
            companyType: row['CompanyIndian/Foreign Company']?.trim() || null,
            nicCode: row.nic_code?.trim() || null,
            companyIndustrialClassification: row.CompanyIndustrialClassification?.trim() || null
          };
          
          records.push(companyData);
          existingCins.add(cin);
          
          if (records.length >= batchSize) {
            const insertedCount = await processBatch(records.splice(0, batchSize), batchNumber);
            totalInserted += insertedCount;
            batchNumber++;
            
            if (batchNumber % 50 === 0) {
              const progress = ((totalProcessed / 194736) * 100).toFixed(1);
              console.log(`Progress: ${progress}% - ${totalProcessed} processed, ${totalInserted} new records`);
            }
          }
          
        } catch (error) {
          totalSkipped++;
        }
      })
      .on('end', async () => {
        try {
          if (records.length > 0) {
            const insertedCount = await processBatch(records, batchNumber);
            totalInserted += insertedCount;
          }
          
          console.log('\nFinal import completed!');
          console.log(`Total processed: ${totalProcessed}`);
          console.log(`New records inserted: ${totalInserted}`);
          console.log(`Skipped (duplicates/invalid): ${totalSkipped}`);
          console.log(`Total companies in database: ${existing.length + totalInserted}`);
          
          resolve({ 
            processed: totalProcessed,
            inserted: totalInserted,
            skipped: totalSkipped,
            finalCount: existing.length + totalInserted
          });
          
        } catch (error) {
          reject(error);
        }
      })
      .on('error', reject);
  });
}

async function processBatch(batch, batchNumber) {
  try {
    const result = await db.insert(companies)
      .values(batch)
      .onConflictDoNothing({ target: companies.cin })
      .returning({ cin: companies.cin });
    
    return result.length;
    
  } catch (error) {
    console.error(`Batch ${batchNumber} error, trying individual inserts...`);
    
    let successCount = 0;
    for (const record of batch) {
      try {
        await db.insert(companies)
          .values(record)
          .onConflictDoNothing({ target: companies.cin });
        successCount++;
      } catch (e) {
        // Continue with next record
      }
    }
    
    return successCount;
  }
}

finalImport()
  .then(result => {
    console.log('\nImport successful:', result);
    process.exit(0);
  })
  .catch(error => {
    console.error('\nImport failed:', error);
    process.exit(1);
  });