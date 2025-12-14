import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { db } from '../server/db.ts';
import { companies } from '../shared/schema.ts';
import { generateSlug } from '../server/utils/slug-generator.ts';

async function finalBulkComplete() {
  const csvFilePath = './attached_assets/4dbe5667-7b6b-41d7-82af-211562424d9a_dff39c000aa72a24e9277a4913efcc74_1751125765649.csv';
  
  console.log('Final bulk import to complete all 194,736 records...');
  
  const startingCount = await db.select().from(companies).then(result => result.length);
  console.log(`Starting count: ${startingCount}`);
  
  // Get existing CINs with simple query
  const existingResult = await db.execute(`SELECT cin FROM companies`);
  const existingCins = new Set(existingResult.rows.map(row => row.cin));
  console.log(`Existing CINs: ${existingCins.size}`);
  console.log(`Remaining to process: ${194736 - existingCins.size}`);
  
  let rowsProcessed = 0;
  let newlyAdded = 0;
  let duplicatesFound = 0;
  const pendingRecords = [];
  const BATCH_SIZE = 100;
  let batchCount = 0;
  
  return new Promise((resolve) => {
    createReadStream(csvFilePath)
      .pipe(parse({ 
        columns: true, 
        skip_empty_lines: true,
        trim: true,
        relax_quotes: true,
        escape: '"'
      }))
      .on('data', async (row) => {
        rowsProcessed++;
        
        const cin = row.CIN?.trim();
        const companyName = row.CompanyName?.trim();
        
        if (!cin || !companyName) return;
        
        if (existingCins.has(cin)) {
          duplicatesFound++;
          return;
        }
        
        const baseSlug = generateSlug(companyName);
        const timestamp = Date.now().toString().slice(-6);
        const cinCode = cin.replace(/[^A-Z0-9]/g, '').slice(-8);
        const slug = `${baseSlug}-${cinCode}-${timestamp}`.toLowerCase();
        
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
        
        pendingRecords.push(companyData);
        existingCins.add(cin);
        
        if (pendingRecords.length >= BATCH_SIZE) {
          const inserted = await processBatch(pendingRecords.splice(0, BATCH_SIZE));
          newlyAdded += inserted;
          batchCount++;
          
          if (batchCount % 100 === 0) {
            const currentTotal = startingCount + newlyAdded;
            const progress = ((currentTotal / 194736) * 100).toFixed(1);
            console.log(`${progress}% | Total: ${currentTotal} | Added: ${newlyAdded} | Processed: ${rowsProcessed}`);
          }
        }
      })
      .on('end', async () => {
        if (pendingRecords.length > 0) {
          const inserted = await processBatch(pendingRecords);
          newlyAdded += inserted;
        }
        
        const finalTotal = await db.select().from(companies).then(result => result.length);
        const completionPercent = ((finalTotal / 194736) * 100).toFixed(2);
        
        console.log('\n=== FINAL RESULTS ===');
        console.log(`CSV rows processed: ${rowsProcessed.toLocaleString()}`);
        console.log(`New companies added: ${newlyAdded.toLocaleString()}`);
        console.log(`Duplicates found: ${duplicatesFound.toLocaleString()}`);
        console.log(`Total companies in DB: ${finalTotal.toLocaleString()}`);
        console.log(`Completion rate: ${completionPercent}% of 194,736`);
        
        if (finalTotal >= 190000) {
          console.log('SUCCESS: Major portion of dataset imported!');
        }
        
        console.log('=====================');
        
        resolve({
          processed: rowsProcessed,
          added: newlyAdded,
          duplicates: duplicatesFound,
          finalTotal: finalTotal,
          completionPercent: completionPercent
        });
      })
      .on('error', (error) => {
        console.error('Import error:', error);
        resolve({ error: error.message });
      });
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

finalBulkComplete()
  .then(result => {
    console.log('Final bulk import result:', result);
    process.exit(0);
  })
  .catch(error => {
    console.error('Final bulk import error:', error);
    process.exit(1);
  });