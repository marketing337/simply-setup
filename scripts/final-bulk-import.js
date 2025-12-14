import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { db } from '../server/db.ts';
import { companies } from '../shared/schema.ts';
import { generateSlug } from '../server/utils/slug-generator.ts';

async function finalBulkImport() {
  const csvFilePath = './attached_assets/4dbe5667-7b6b-41d7-82af-211562424d9a_dff39c000aa72a24e9277a4913efcc74_1751125765649.csv';
  
  console.log('Running final bulk import to complete all 194,736 records...');
  
  // Get current database state
  const currentCount = await db.select().from(companies).then(result => result.length);
  console.log(`Current database count: ${currentCount}`);
  
  // Read all existing CINs efficiently
  const existingCins = new Set();
  const existingRecords = await db.select({ cin: companies.cin }).from(companies);
  existingRecords.forEach(record => existingCins.add(record.cin));
  
  let totalProcessed = 0;
  let totalInserted = 0;
  let invalidRecords = 0;
  const batchSize = 250;
  const records = [];
  let batchNumber = 1;
  
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
        totalProcessed++;
        
        const cin = row.CIN?.trim();
        const companyName = row.CompanyName?.trim();
        
        // Skip if missing essential data or already exists
        if (!cin || !companyName || existingCins.has(cin)) {
          return;
        }
        
        try {
          // Create guaranteed unique slug
          const baseSlug = generateSlug(companyName);
          const uniqueId = cin.replace(/[^A-Z0-9]/g, '').slice(-10);
          const slug = `${baseSlug}-${uniqueId}`.toLowerCase();
          
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
          
          // Process batch
          if (records.length >= batchSize) {
            const insertedCount = await processBatch(records.splice(0, batchSize), batchNumber);
            totalInserted += insertedCount;
            batchNumber++;
            
            // Progress reporting every 200 batches
            if (batchNumber % 200 === 0) {
              const progress = Math.min(((totalProcessed / 194736) * 100), 100).toFixed(1);
              const currentTotal = currentCount + totalInserted;
              console.log(`${progress}% - Database now has ${currentTotal} companies (+${totalInserted} new)`);
            }
          }
          
        } catch (error) {
          invalidRecords++;
        }
      })
      .on('end', async () => {
        try {
          // Process remaining records
          if (records.length > 0) {
            const insertedCount = await processBatch(records, batchNumber);
            totalInserted += insertedCount;
          }
          
          // Get final count
          const finalCount = await db.select().from(companies).then(result => result.length);
          const completionRate = ((finalCount / 194736) * 100).toFixed(1);
          
          console.log('\n=== FINAL IMPORT RESULTS ===');
          console.log(`CSV rows processed: ${totalProcessed.toLocaleString()}`);
          console.log(`Valid new records found: ${totalInserted.toLocaleString()}`);
          console.log(`Invalid/duplicate records: ${invalidRecords.toLocaleString()}`);
          console.log(`Final database count: ${finalCount.toLocaleString()}`);
          console.log(`Completion rate: ${completionRate}% of target 194,736`);
          console.log('===========================');
          
          resolve({ 
            processed: totalProcessed,
            inserted: totalInserted,
            finalCount: finalCount,
            completionRate: completionRate
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
    console.log(`Batch ${batchNumber} failed, processing individually...`);
    
    let successCount = 0;
    for (const record of batch) {
      try {
        await db.insert(companies)
          .values(record)
          .onConflictDoNothing({ target: companies.cin });
        successCount++;
      } catch (e) {
        // Skip problematic records
      }
    }
    
    return successCount;
  }
}

finalBulkImport()
  .then(result => {
    console.log('\nBulk import completed successfully:', result);
    process.exit(0);
  })
  .catch(error => {
    console.error('\nBulk import failed:', error);
    process.exit(1);
  });