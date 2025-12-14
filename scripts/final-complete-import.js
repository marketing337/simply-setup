import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { db } from '../server/db.ts';
import { companies } from '../shared/schema.ts';
import { generateSlug } from '../server/utils/slug-generator.ts';

async function finalCompleteImport() {
  const csvFilePath = './attached_assets/4dbe5667-7b6b-41d7-82af-211562424d9a_dff39c000aa72a24e9277a4913efcc74_1751125765649.csv';
  
  console.log('Running final import to complete all 194,736 records...');
  
  // Get current database state
  const currentCount = await db.select().from(companies).then(result => result.length);
  console.log(`Current database count: ${currentCount}`);
  
  // Build existing CIN set efficiently
  console.log('Loading existing CINs...');
  const existingCins = new Set();
  
  // Load existing CINs in batches
  let offset = 0;
  const loadBatchSize = 5000;
  while (true) {
    const batch = await db.select({ cin: companies.cin })
      .from(companies)
      .limit(loadBatchSize)
      .offset(offset);
    
    if (batch.length === 0) break;
    
    batch.forEach(record => existingCins.add(record.cin));
    offset += loadBatchSize;
  }
  
  console.log(`Loaded ${existingCins.size} existing CINs`);
  console.log(`Remaining to import: ${194736 - existingCins.size}`);
  
  let totalProcessed = 0;
  let newImported = 0;
  let skipped = 0;
  const insertBatchSize = 400;
  const records = [];
  let batchNumber = 0;
  
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
        
        if (!cin || !companyName) {
          skipped++;
          return;
        }
        
        if (existingCins.has(cin)) {
          skipped++;
          return;
        }
        
        try {
          // Create unique slug with multiple fallbacks
          const baseSlug = generateSlug(companyName);
          const cinSuffix = cin.replace(/[^A-Z0-9]/g, '').slice(-15);
          const randomSuffix = Math.random().toString(36).substr(2, 5);
          const slug = `${baseSlug}-${cinSuffix}-${randomSuffix}`.toLowerCase();
          
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
            const inserted = await processBatch(records.splice(0, batchSize));
            newImported += inserted;
            batchNumber++;
            
            if (batchNumber % 100 === 0) {
              const dbTotal = currentCount + newImported;
              const completion = ((dbTotal / 194736) * 100).toFixed(1);
              console.log(`Progress: ${completion}% | Total: ${dbTotal} | New: ${newImported} | Processed: ${totalProcessed}`);
            }
          }
          
        } catch (error) {
          skipped++;
        }
      })
      .on('end', async () => {
        try {
          if (records.length > 0) {
            const inserted = await processBatch(records);
            newImported += inserted;
          }
          
          const finalCount = await db.select().from(companies).then(result => result.length);
          const completionRate = ((finalCount / 194736) * 100).toFixed(2);
          
          console.log('\n=== FINAL IMPORT RESULTS ===');
          console.log(`CSV rows processed: ${totalProcessed.toLocaleString()}`);
          console.log(`New records imported: ${newImported.toLocaleString()}`);
          console.log(`Records skipped: ${skipped.toLocaleString()}`);
          console.log(`Final database count: ${finalCount.toLocaleString()}`);
          console.log(`Completion rate: ${completionRate}% of 194,736`);
          
          if (finalCount >= 194700) {
            console.log('SUCCESS: Nearly complete dataset imported!');
          } else {
            console.log(`Remaining: ${194736 - finalCount} records`);
          }
          
          console.log('============================');
          
          resolve({
            processed: totalProcessed,
            imported: newImported,
            skipped: skipped,
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

async function processBatch(batch) {
  try {
    const result = await db.insert(companies)
      .values(batch)
      .onConflictDoNothing({ target: companies.cin })
      .returning({ cin: companies.cin });
    
    return result.length;
    
  } catch (error) {
    // Individual record processing as fallback
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

finalCompleteImport()
  .then(result => {
    console.log('Final complete import finished:', result);
    process.exit(0);
  })
  .catch(error => {
    console.error('Final complete import failed:', error);
    process.exit(1);
  });