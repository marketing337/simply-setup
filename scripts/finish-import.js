import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { db } from '../server/db.ts';
import { companies } from '../shared/schema.ts';
import { generateSlug } from '../server/utils/slug-generator.ts';

async function finishImport() {
  const csvFilePath = './attached_assets/4dbe5667-7b6b-41d7-82af-211562424d9a_dff39c000aa72a24e9277a4913efcc74_1751125765649.csv';
  
  console.log('Finishing CSV import to reach full 194,736 records...');
  
  let totalProcessed = 0;
  let totalInserted = 0;
  let batchNumber = 1;
  const batchSize = 50; // Very small batches for reliability
  const records = [];
  
  // Get all existing CINs in a more efficient way
  const existingCins = new Set();
  console.log('Loading existing CINs...');
  
  let offset = 0;
  const pageSize = 10000;
  while (true) {
    const batch = await db.select({ cin: companies.cin })
      .from(companies)
      .limit(pageSize)
      .offset(offset);
    
    if (batch.length === 0) break;
    
    batch.forEach(record => existingCins.add(record.cin));
    offset += pageSize;
    
    if (offset % 50000 === 0) {
      console.log(`Loaded ${offset} existing CINs...`);
    }
  }
  
  console.log(`Found ${existingCins.size} existing records`);
  
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
          
          if (!cin || !companyName || existingCins.has(cin)) {
            return;
          }
          
          // Generate unique slug with timestamp suffix
          const baseSlug = generateSlug(companyName);
          const uniqueSuffix = cin.slice(-8) + '-' + Date.now().toString().slice(-4);
          const slug = `${baseSlug}-${uniqueSuffix}`;
          
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
          existingCins.add(cin); // Track new additions
          
          if (records.length >= batchSize) {
            const insertedCount = await processBatch(records.splice(0, batchSize), batchNumber);
            totalInserted += insertedCount;
            batchNumber++;
            
            if (batchNumber % 100 === 0) {
              const progress = ((totalProcessed / 194736) * 100).toFixed(1);
              console.log(`${progress}% complete - ${totalInserted} new records added`);
            }
          }
          
        } catch (error) {
          // Continue processing
        }
      })
      .on('end', async () => {
        try {
          if (records.length > 0) {
            const insertedCount = await processBatch(records, batchNumber);
            totalInserted += insertedCount;
          }
          
          const finalCount = await db.select().from(companies).then(result => result.length);
          
          console.log(`\nImport completed!`);
          console.log(`CSV rows processed: ${totalProcessed}`);
          console.log(`New records added: ${totalInserted}`);
          console.log(`Final database count: ${finalCount}`);
          console.log(`Target was: 194,736 records`);
          console.log(`Achievement: ${((finalCount / 194736) * 100).toFixed(1)}%`);
          
          resolve({ 
            processed: totalProcessed,
            inserted: totalInserted,
            finalCount: finalCount
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
    // Fallback to individual inserts
    let successCount = 0;
    for (const record of batch) {
      try {
        await db.insert(companies)
          .values(record)
          .onConflictDoNothing({ target: companies.cin });
        successCount++;
      } catch (e) {
        // Continue
      }
    }
    return successCount;
  }
}

finishImport()
  .then(result => {
    console.log('Final import result:', result);
    process.exit(0);
  })
  .catch(error => {
    console.error('Import error:', error);
    process.exit(1);
  });