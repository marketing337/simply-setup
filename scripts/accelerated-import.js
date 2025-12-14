import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { db } from '../server/db.ts';
import { companies } from '../shared/schema.ts';
import { generateSlug } from '../server/utils/slug-generator.ts';

async function acceleratedImport() {
  const csvFilePath = './attached_assets/4dbe5667-7b6b-41d7-82af-211562424d9a_dff39c000aa72a24e9277a4913efcc74_1751125765649.csv';
  
  console.log('Running accelerated import for remaining records...');
  
  const startCount = await db.select().from(companies).then(result => result.length);
  console.log(`Current count: ${startCount}`);
  
  // Quick CIN lookup using a more efficient approach
  const existingCinsResult = await db.execute(`SELECT cin FROM companies`);
  const existingCins = new Set(existingCinsResult.rows.map(row => row.cin));
  console.log(`Existing CINs loaded: ${existingCins.size}`);
  
  let processed = 0;
  let added = 0;
  let skipped = 0;
  const batchSize = 500;
  const records = [];
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
        
        if (!cin || !companyName || existingCins.has(cin)) {
          skipped++;
          return;
        }
        
        // Simple slug generation to avoid conflicts
        const baseSlug = generateSlug(companyName);
        const uniqueSlug = `${baseSlug}-${cin.slice(-10)}`.toLowerCase();
        
        const companyData = {
          cin,
          companyName,
          slug: uniqueSlug,
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
          const insertedCount = await processBatch(records.splice(0, batchSize));
          added += insertedCount;
          batchNum++;
          
          if (batchNum % 50 === 0) {
            const total = startCount + added;
            const percentage = ((total / 194736) * 100).toFixed(1);
            console.log(`${percentage}% - Total: ${total} (+${added} new)`);
          }
        }
      })
      .on('end', async () => {
        if (records.length > 0) {
          const insertedCount = await processBatch(records);
          added += insertedCount;
        }
        
        const finalCount = await db.select().from(companies).then(result => result.length);
        const completionPercentage = ((finalCount / 194736) * 100).toFixed(2);
        
        console.log('\n=== ACCELERATED IMPORT COMPLETE ===');
        console.log(`CSV rows processed: ${processed.toLocaleString()}`);
        console.log(`New companies added: ${added.toLocaleString()}`);
        console.log(`Records skipped: ${skipped.toLocaleString()}`);
        console.log(`Total companies in database: ${finalCount.toLocaleString()}`);
        console.log(`Completion: ${completionPercentage}% of 194,736`);
        console.log('===================================');
        
        resolve({
          processed,
          added,
          finalCount,
          completionPercentage
        });
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
    let successCount = 0;
    for (const record of batch) {
      try {
        await db.insert(companies).values(record).onConflictDoNothing({ target: companies.cin });
        successCount++;
      } catch (e) {}
    }
    return successCount;
  }
}

acceleratedImport()
  .then(result => {
    console.log('Accelerated import completed:', result);
    process.exit(0);
  })
  .catch(error => {
    console.error('Accelerated import failed:', error);
    process.exit(1);
  });