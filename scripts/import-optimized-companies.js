import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { db } from '../server/db.ts';
import { companies } from '../shared/schema.ts';
import { generateSlug } from '../server/utils/slug-generator.ts';

async function importOptimizedCompaniesFromCSV() {
  const csvFilePath = './attached_assets/4dbe5667-7b6b-41d7-82af-211562424d9a_dff39c000aa72a24e9277a4913efcc74_1751125765649.csv';
  
  console.log('Starting optimized large company data import...');
  console.log('Expected records: ~194,738');
  
  const records = [];
  let processedCount = 0;
  let successCount = 0;
  let errorCount = 0;
  let batchNumber = 1;
  const batchSize = 1000; // Larger batch size for better performance
  const slugTracker = new Set(); // Track slugs to avoid duplicates
  
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
          // Clean and validate data
          const cin = row.CIN?.trim();
          const companyName = row.CompanyName?.trim();
          
          // Skip empty rows or rows without essential data
          if (!cin || !companyName) {
            errorCount++;
            return;
          }

          // Generate unique slug
          let baseSlug = generateSlug(companyName);
          let slug = baseSlug;
          let counter = 1;
          
          // Ensure unique slug by adding counter if needed
          while (slugTracker.has(slug)) {
            slug = `${baseSlug}-${counter}`;
            counter++;
          }
          slugTracker.add(slug);
          
          // Map CSV columns to database schema
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
          processedCount++;
          
          // Process in batches
          if (records.length >= batchSize) {
            const batchResult = await processBatch(records.splice(0, batchSize), batchNumber);
            successCount += batchResult.success;
            errorCount += batchResult.errors;
            batchNumber++;
          }
          
          // Progress logging every 25,000 records
          if (processedCount % 25000 === 0) {
            console.log(`Progress: ${processedCount} processed, ${successCount} imported, ${errorCount} errors`);
          }
          
        } catch (error) {
          errorCount++;
          console.error(`Error processing row: ${error.message}`);
        }
      })
      .on('end', async () => {
        try {
          // Process any remaining records
          if (records.length > 0) {
            const batchResult = await processBatch(records, batchNumber);
            successCount += batchResult.success;
            errorCount += batchResult.errors;
          }
          
          console.log(`\nImport completed!`);
          console.log(`Total processed: ${processedCount} records`);
          console.log(`Successfully imported: ${successCount} records`);
          console.log(`Errors: ${errorCount} records`);
          console.log(`Success rate: ${((successCount) / processedCount * 100).toFixed(2)}%`);
          
          resolve({ 
            totalProcessed: processedCount, 
            successful: successCount,
            errors: errorCount,
            successRate: ((successCount) / processedCount * 100).toFixed(2)
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
    console.log(`Processing batch ${batchNumber} with ${batch.length} records...`);
    
    // Use INSERT with ON CONFLICT for better handling
    const result = await db.insert(companies)
      .values(batch)
      .onConflictDoNothing({ target: companies.cin })
      .returning({ cin: companies.cin });
      
    console.log(`Batch ${batchNumber}: ${result.length} records inserted`);
    
    return { success: result.length, errors: batch.length - result.length };
    
  } catch (error) {
    console.error(`Error processing batch ${batchNumber}:`, error.message);
    
    // Try individual inserts for failed batch
    let successCount = 0;
    let errorCount = 0;
    
    for (const record of batch) {
      try {
        await db.insert(companies)
          .values(record)
          .onConflictDoNothing({ target: companies.cin });
        successCount++;
      } catch (recordError) {
        errorCount++;
      }
    }
    
    return { success: successCount, errors: errorCount };
  }
}

// Execute the import
importOptimizedCompaniesFromCSV()
  .then(result => {
    console.log('\nImport process completed:', result);
    process.exit(0);
  })
  .catch(error => {
    console.error('\nImport process failed:', error);
    process.exit(1);
  });