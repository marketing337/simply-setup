import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { db } from '../server/db.ts';
import { companies } from '../shared/schema.ts';
import { generateSlug } from '../server/utils/slug-generator.ts';

async function importLargeCompaniesFromCSV() {
  const csvFilePath = './attached_assets/4dbe5667-7b6b-41d7-82af-211562424d9a_dff39c000aa72a24e9277a4913efcc74_1751125765649.csv';
  
  console.log('Starting large company data import...');
  console.log('Expected records: ~194,738');
  
  const records = [];
  let processedCount = 0;
  let errorCount = 0;
  let batchNumber = 1;
  const batchSize = 500; // Increased batch size for better performance
  
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
            console.log(`Skipping row with missing CIN or Company Name`);
            return;
          }

          // Generate slug for SEO-friendly URLs
          const slug = generateSlug(companyName);
          
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
          
          // Process in batches to avoid memory issues
          if (records.length >= batchSize) {
            await processBatch(records.splice(0, batchSize), batchNumber);
            batchNumber++;
          }
          
          // Progress logging every 10,000 records
          if (processedCount % 10000 === 0) {
            console.log(`✓ Processed ${processedCount} records so far...`);
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
            await processBatch(records, batchNumber);
          }
          
          console.log(`\n🎉 Import completed!`);
          console.log(`📊 Total processed: ${processedCount} records`);
          console.log(`❌ Errors: ${errorCount} records`);
          console.log(`✅ Success rate: ${((processedCount - errorCount) / processedCount * 100).toFixed(2)}%`);
          
          resolve({ 
            totalProcessed: processedCount, 
            errors: errorCount,
            successRate: ((processedCount - errorCount) / processedCount * 100).toFixed(2)
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
    
    await db.insert(companies)
      .values(batch)
      .onConflictDoUpdate({
        target: companies.cin,
        set: {
          companyName: batch[0].companyName,
          slug: batch[0].slug,
          companyROCcode: batch[0].companyROCcode,
          companyCategory: batch[0].companyCategory,
          companySubCategory: batch[0].companySubCategory,
          companyClass: batch[0].companyClass,
          authorizedCapital: batch[0].authorizedCapital,
          paidupCapital: batch[0].paidupCapital,
          registrationDate: batch[0].registrationDate,
          registeredOfficeAddress: batch[0].registeredOfficeAddress,
          listingStatus: batch[0].listingStatus,
          companyStatus: batch[0].companyStatus,
          companyStateCode: batch[0].companyStateCode,
          companyType: batch[0].companyType,
          nicCode: batch[0].nicCode,
          companyIndustrialClassification: batch[0].companyIndustrialClassification
        }
      });
      
    console.log(`✅ Batch ${batchNumber} completed successfully`);
    
  } catch (error) {
    console.error(`❌ Error processing batch ${batchNumber}:`, error.message);
    
    // Try inserting records one by one to identify problematic records
    for (const record of batch) {
      try {
        await db.insert(companies)
          .values(record)
          .onConflictDoUpdate({
            target: companies.cin,
            set: {
              companyName: record.companyName,
              slug: record.slug,
              companyROCcode: record.companyROCcode,
              companyCategory: record.companyCategory,
              companySubCategory: record.companySubCategory,
              companyClass: record.companyClass,
              authorizedCapital: record.authorizedCapital,
              paidupCapital: record.paidupCapital,
              registrationDate: record.registrationDate,
              registeredOfficeAddress: record.registeredOfficeAddress,
              listingStatus: record.listingStatus,
              companyStatus: record.companyStatus,
              companyStateCode: record.companyStateCode,
              companyType: record.companyType,
              nicCode: record.nicCode,
              companyIndustrialClassification: record.companyIndustrialClassification
            }
          });
      } catch (recordError) {
        console.error(`Failed to insert company ${record.cin}: ${recordError.message}`);
      }
    }
  }
}

// Execute the import
importLargeCompaniesFromCSV()
  .then(result => {
    console.log('\n🚀 Import process completed successfully:', result);
    process.exit(0);
  })
  .catch(error => {
    console.error('\n💥 Import process failed:', error);
    process.exit(1);
  });