import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { db } from '../server/db.ts';
import { companies } from '../shared/schema.ts';
import { generateSlug } from '../server/utils/slug-generator.ts';

async function completeRemainingImport() {
  const csvFilePath = './attached_assets/4dbe5667-7b6b-41d7-82af-211562424d9a_dff39c000aa72a24e9277a4913efcc74_1751125765649.csv';
  
  console.log('Completing import of all remaining CSV records...');
  
  const currentCount = await db.select().from(companies).then(result => result.length);
  console.log(`Starting with ${currentCount} companies`);
  
  // Load all existing CINs
  const existingRecords = await db.select({ cin: companies.cin }).from(companies);
  const existingCins = new Set(existingRecords.map(r => r.cin));
  console.log(`Found ${existingCins.size} existing CINs`);
  
  let processed = 0;
  let imported = 0;
  let duplicates = 0;
  const records = [];
  const BATCH_SIZE = 200;
  let batchNum = 0;
  
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
        processed++;
        
        const cin = row.CIN?.trim();
        const companyName = row.CompanyName?.trim();
        
        if (!cin || !companyName) return;
        
        if (existingCins.has(cin)) {
          duplicates++;
          return;
        }
        
        const baseSlug = generateSlug(companyName);
        const uniqueId = cin.slice(-12) + '-' + Math.random().toString(36).substr(2, 4);
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
        
        if (records.length >= BATCH_SIZE) {
          const insertedCount = await insertBatch(records.splice(0, BATCH_SIZE));
          imported += insertedCount;
          batchNum++;
          
          if (batchNum % 50 === 0) {
            const total = currentCount + imported;
            const completion = ((total / 194736) * 100).toFixed(1);
            console.log(`${completion}% complete | Total: ${total} | New: ${imported}`);
          }
        }
      })
      .on('end', async () => {
        if (records.length > 0) {
          const insertedCount = await insertBatch(records);
          imported += insertedCount;
        }
        
        const finalCount = await db.select().from(companies).then(result => result.length);
        const completionRate = ((finalCount / 194736) * 100).toFixed(2);
        
        console.log('\n=== IMPORT COMPLETE ===');
        console.log(`Total processed: ${processed.toLocaleString()}`);
        console.log(`New imported: ${imported.toLocaleString()}`);
        console.log(`Duplicates: ${duplicates.toLocaleString()}`);
        console.log(`Final count: ${finalCount.toLocaleString()}`);
        console.log(`Completion: ${completionRate}%`);
        console.log('=======================');
        
        resolve({ processed, imported, finalCount, completionRate });
      })
      .on('error', reject);
  });
}

async function insertBatch(batch) {
  try {
    const result = await db.insert(companies)
      .values(batch)
      .onConflictDoNothing({ target: companies.cin })
      .returning({ cin: companies.cin });
    
    return result.length;
  } catch (error) {
    let count = 0;
    for (const record of batch) {
      try {
        await db.insert(companies).values(record).onConflictDoNothing({ target: companies.cin });
        count++;
      } catch (e) {}
    }
    return count;
  }
}

completeRemainingImport()
  .then(result => {
    console.log('Import completed:', result);
    process.exit(0);
  })
  .catch(error => {
    console.error('Import failed:', error);
    process.exit(1);
  });