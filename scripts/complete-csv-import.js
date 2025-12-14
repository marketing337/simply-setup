import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { db } from '../server/db.ts';
import { companies } from '../shared/schema.ts';
import { generateSlug } from '../server/utils/slug-generator.ts';

async function completeCsvImport() {
  const csvFilePath = './attached_assets/4dbe5667-7b6b-41d7-82af-211562424d9a_dff39c000aa72a24e9277a4913efcc74_1751125765649.csv';
  
  console.log('Starting complete CSV import to process all 194,736 records...');
  
  const startCount = await db.select().from(companies).then(result => result.length);
  console.log(`Starting count: ${startCount} companies`);
  
  // Build efficient CIN lookup
  const existingCins = new Set();
  const cinQuery = await db.execute(`SELECT cin FROM companies`);
  cinQuery.rows.forEach(row => existingCins.add(row.cin));
  console.log(`Existing CINs: ${existingCins.size}`);
  
  let rowsProcessed = 0;
  let newRecordsAdded = 0;
  let duplicatesSkipped = 0;
  const batchSize = 300;
  const records = [];
  let batchCount = 0;
  
  return new Promise((resolve, reject) => {
    const parser = parse({ 
      columns: true, 
      skip_empty_lines: true,
      trim: true,
      relax_quotes: true,
      escape: '"'
    });
    
    parser.on('data', async (row) => {
      rowsProcessed++;
      
      const cin = row.CIN?.trim();
      const companyName = row.CompanyName?.trim();
      
      if (!cin || !companyName) return;
      
      if (existingCins.has(cin)) {
        duplicatesSkipped++;
        return;
      }
      
      // Generate guaranteed unique slug
      const baseSlug = generateSlug(companyName);
      const cinCode = cin.replace(/[^A-Z0-9]/g, '').slice(-12);
      const timestamp = Date.now().toString().slice(-3);
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
      
      records.push(companyData);
      existingCins.add(cin);
      
      if (records.length >= batchSize) {
        const insertedCount = await processBatch(records.splice(0, batchSize));
        newRecordsAdded += insertedCount;
        batchCount++;
        
        if (batchCount % 200 === 0) {
          const currentTotal = startCount + newRecordsAdded;
          const progressPct = ((rowsProcessed / 194736) * 100).toFixed(1);
          console.log(`${progressPct}% | DB Total: ${currentTotal} | New: ${newRecordsAdded} | Processed: ${rowsProcessed}`);
        }
      }
    });
    
    parser.on('end', async () => {
      try {
        if (records.length > 0) {
          const insertedCount = await processBatch(records);
          newRecordsAdded += insertedCount;
        }
        
        const finalCount = await db.select().from(companies).then(result => result.length);
        const completionRate = ((finalCount / 194736) * 100).toFixed(2);
        
        console.log('\n=== COMPLETE CSV IMPORT FINISHED ===');
        console.log(`Total CSV rows processed: ${rowsProcessed.toLocaleString()}`);
        console.log(`New companies imported: ${newRecordsAdded.toLocaleString()}`);
        console.log(`Duplicates skipped: ${duplicatesSkipped.toLocaleString()}`);
        console.log(`Final database count: ${finalCount.toLocaleString()}`);
        console.log(`Completion rate: ${completionRate}% of target 194,736`);
        console.log('====================================');
        
        resolve({
          processed: rowsProcessed,
          imported: newRecordsAdded,
          finalCount: finalCount,
          completionRate: completionRate
        });
        
      } catch (error) {
        reject(error);
      }
    });
    
    parser.on('error', reject);
    
    createReadStream(csvFilePath).pipe(parser);
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
    console.log(`Batch error, processing individually...`);
    let successCount = 0;
    
    for (const record of batch) {
      try {
        await db.insert(companies)
          .values(record)
          .onConflictDoNothing({ target: companies.cin });
        successCount++;
      } catch (e) {
        // Skip problematic individual records
      }
    }
    
    return successCount;
  }
}

completeCsvImport()
  .then(result => {
    console.log('\nComplete CSV import successful:', result);
    process.exit(0);
  })
  .catch(error => {
    console.error('\nComplete CSV import failed:', error);
    process.exit(1);
  });