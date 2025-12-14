import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { db } from '../server/db.ts';
import { companies } from '../shared/schema.ts';
import { generateSlug } from '../server/utils/slug-generator.ts';

async function continueImport() {
  const csvFilePath = './attached_assets/4dbe5667-7b6b-41d7-82af-211562424d9a_dff39c000aa72a24e9277a4913efcc74_1751125765649.csv';
  
  console.log('Continuing CSV import to complete all remaining records...');
  
  // Get current state
  const startCount = await db.select().from(companies).then(result => result.length);
  console.log(`Starting with ${startCount} existing companies`);
  
  // Load existing CINs efficiently in chunks
  const existingCins = new Set();
  let offset = 0;
  const chunkSize = 5000;
  
  while (true) {
    const chunk = await db.select({ cin: companies.cin })
      .from(companies)
      .limit(chunkSize)
      .offset(offset);
    
    if (chunk.length === 0) break;
    
    chunk.forEach(record => existingCins.add(record.cin));
    offset += chunkSize;
  }
  
  console.log(`Loaded ${existingCins.size} existing CINs`);
  
  let totalProcessed = 0;
  let newRecords = 0;
  let duplicates = 0;
  let batchCount = 0;
  const batchSize = 200;
  const records = [];
  
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
        
        if (!cin || !companyName) return;
        
        if (existingCins.has(cin)) {
          duplicates++;
          return;
        }
        
        try {
          // Generate unique slug with CIN suffix
          const baseSlug = generateSlug(companyName);
          const cinSuffix = cin.replace(/[^A-Z0-9]/g, '').slice(-8);
          const slug = `${baseSlug}-${cinSuffix}`.toLowerCase();
          
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
            newRecords += inserted;
            batchCount++;
            
            if (batchCount % 100 === 0) {
              const currentTotal = startCount + newRecords;
              const progress = ((totalProcessed / 194736) * 100).toFixed(1);
              console.log(`${progress}% | Total: ${currentTotal} | New: ${newRecords} | Processed: ${totalProcessed}`);
            }
          }
          
        } catch (error) {
          // Skip invalid records
        }
      })
      .on('end', async () => {
        try {
          if (records.length > 0) {
            const inserted = await processBatch(records);
            newRecords += inserted;
          }
          
          const finalCount = await db.select().from(companies).then(result => result.length);
          const completion = ((finalCount / 194736) * 100).toFixed(2);
          
          console.log('\n=== IMPORT COMPLETED ===');
          console.log(`CSV rows processed: ${totalProcessed.toLocaleString()}`);
          console.log(`New records added: ${newRecords.toLocaleString()}`);
          console.log(`Duplicates skipped: ${duplicates.toLocaleString()}`);
          console.log(`Final database count: ${finalCount.toLocaleString()}`);
          console.log(`Completion rate: ${completion}% of 194,736 target`);
          console.log('========================');
          
          resolve({
            processed: totalProcessed,
            newRecords: newRecords,
            finalCount: finalCount,
            completion: completion
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
    // Fallback to individual processing
    let count = 0;
    for (const record of batch) {
      try {
        await db.insert(companies)
          .values(record)
          .onConflictDoNothing({ target: companies.cin });
        count++;
      } catch (e) {
        // Skip problematic records
      }
    }
    return count;
  }
}

continueImport()
  .then(result => {
    console.log('\nContinued import successful:', result);
    process.exit(0);
  })
  .catch(error => {
    console.error('\nContinued import failed:', error);
    process.exit(1);
  });