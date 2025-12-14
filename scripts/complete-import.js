import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { db } from '../server/db.ts';
import { companies } from '../shared/schema.ts';
import { generateSlug } from '../server/utils/slug-generator.ts';

async function completeImport() {
  const csvFilePath = './attached_assets/4dbe5667-7b6b-41d7-82af-211562424d9a_dff39c000aa72a24e9277a4913efcc74_1751125765649.csv';
  
  console.log('Starting complete import of all CSV records...');
  console.log('Target: 194,736 company records');
  
  let totalProcessed = 0;
  let totalInserted = 0;
  let totalSkipped = 0;
  let batchNumber = 1;
  const batchSize = 2000; // Larger batches for efficiency
  const records = [];
  
  // Get existing CINs to avoid duplicates
  console.log('Checking existing records...');
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
          
          // Skip if essential data missing
          if (!cin || !companyName) {
            totalSkipped++;
            return;
          }
          
          // Skip if already exists
          if (existingCins.has(cin)) {
            totalSkipped++;
            return;
          }
          
          // Generate unique slug
          const slug = generateSlug(companyName) + '-' + cin.slice(-6);
          
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
          existingCins.add(cin); // Track to avoid processing duplicates
          
          // Process batch when full
          if (records.length >= batchSize) {
            const insertedCount = await processBatch(records.splice(0, batchSize), batchNumber);
            totalInserted += insertedCount;
            batchNumber++;
            
            // Progress update every 10 batches
            if (batchNumber % 10 === 0) {
              console.log(`Progress: ${totalProcessed} processed, ${totalInserted} inserted, ${totalSkipped} skipped`);
            }
          }
          
        } catch (error) {
          console.error(`Error processing row ${totalProcessed}:`, error.message);
          totalSkipped++;
        }
      })
      .on('end', async () => {
        try {
          // Process remaining records
          if (records.length > 0) {
            const insertedCount = await processBatch(records, batchNumber);
            totalInserted += insertedCount;
          }
          
          console.log('\nImport completed successfully!');
          console.log(`Total processed: ${totalProcessed}`);
          console.log(`Total inserted: ${totalInserted}`);
          console.log(`Total skipped: ${totalSkipped}`);
          console.log(`Final database count should be: ${existing.length + totalInserted}`);
          
          resolve({ 
            processed: totalProcessed,
            inserted: totalInserted,
            skipped: totalSkipped,
            finalCount: existing.length + totalInserted
          });
          
        } catch (error) {
          console.error('Error in final processing:', error);
          reject(error);
        }
      })
      .on('error', (error) => {
        console.error('CSV parsing error:', error);
        reject(error);
      });
  });
}

async function processBatch(batch, batchNumber) {
  try {
    console.log(`Processing batch ${batchNumber}: ${batch.length} records...`);
    
    const result = await db.insert(companies)
      .values(batch)
      .onConflictDoNothing({ target: companies.cin })
      .returning({ cin: companies.cin });
    
    console.log(`Batch ${batchNumber}: ${result.length} records inserted`);
    return result.length;
    
  } catch (error) {
    console.error(`Error in batch ${batchNumber}:`, error.message);
    
    // Fallback: try individual inserts
    let successCount = 0;
    for (const record of batch) {
      try {
        await db.insert(companies)
          .values(record)
          .onConflictDoNothing({ target: companies.cin });
        successCount++;
      } catch (e) {
        // Silent fail for individual records
      }
    }
    
    console.log(`Batch ${batchNumber} fallback: ${successCount} records inserted`);
    return successCount;
  }
}

// Execute the complete import
completeImport()
  .then(result => {
    console.log('\nComplete import finished:', result);
    process.exit(0);
  })
  .catch(error => {
    console.error('\nComplete import failed:', error);
    process.exit(1);
  });