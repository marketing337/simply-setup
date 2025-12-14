import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { db } from './server/db.ts';
import { companies } from './shared/schema.ts';

async function importCompanies() {
  const csvFilePath = './attached_assets/4dbe5667-7b6b-41d7-82af-211562424d9a_1bbd2f6da617b1b3b16cafa28383a029_1751122993062.csv';
  
  console.log('Starting company data import...');
  
  const records = [];
  let processedCount = 0;
  let errorCount = 0;
  
  return new Promise((resolve, reject) => {
    createReadStream(csvFilePath)
      .pipe(parse({ 
        columns: true, 
        skip_empty_lines: true,
        trim: true
      }))
      .on('data', async (row) => {
        try {
          // Map CSV columns to database schema
          const companyData = {
            cin: row.CIN?.trim(),
            companyName: row.CompanyName?.trim(),
            companyROCcode: row.CompanyROCcode?.trim(),
            companyCategory: row.CompanyCategory?.trim(),
            companySubCategory: row.CompanySubCategory?.trim(),
            companyClass: row.CompanyClass?.trim(),
            authorizedCapital: row.AuthorizedCapital ? parseFloat(row.AuthorizedCapital) : null,
            paidupCapital: row.PaidupCapital ? parseFloat(row.PaidupCapital) : null,
            registrationDate: row.CompanyRegistrationdate_date?.trim(),
            registeredOfficeAddress: row.Registered_Office_Address?.trim(),
            listingStatus: row.Listingstatus?.trim(),
            companyStatus: row.CompanyStatus?.trim(),
            companyStateCode: row.CompanyStateCode?.trim(),
            companyType: row['CompanyIndian/Foreign Company']?.trim(),
            nicCode: row.nic_code?.trim(),
            companyIndustrialClassification: row.CompanyIndustrialClassification?.trim()
          };
          
          // Skip empty rows or rows without CIN
          if (!companyData.cin || !companyData.companyName) {
            console.log(`Skipping row with missing CIN or Company Name`);
            return;
          }
          
          records.push(companyData);
          
        } catch (error) {
          errorCount++;
          console.error(`Error processing row: ${error.message}`);
        }
      })
      .on('end', async () => {
        try {
          console.log(`Parsed ${records.length} records from CSV`);
          
          // Insert records in batches of 100
          const batchSize = 100;
          let insertedCount = 0;
          
          for (let i = 0; i < records.length; i += batchSize) {
            const batch = records.slice(i, i + batchSize);
            
            try {
              await db.insert(companies).values(batch).onConflictDoUpdate({
                target: companies.cin,
                set: {
                  companyName: batch[0].companyName,
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
                  companyIndustrialClassification: batch[0].companyIndustrialClassification,
                  updatedAt: new Date()
                }
              });
              
              insertedCount += batch.length;
              console.log(`Inserted batch ${Math.ceil((i + batchSize) / batchSize)} - Total: ${insertedCount} companies`);
              
            } catch (insertError) {
              console.error(`Error inserting batch starting at index ${i}:`, insertError.message);
              
              // Try inserting records individually if batch fails
              for (const record of batch) {
                try {
                  await db.insert(companies).values(record).onConflictDoUpdate({
                    target: companies.cin,
                    set: {
                      companyName: record.companyName,
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
                      companyIndustrialClassification: record.companyIndustrialClassification,
                      updatedAt: new Date()
                    }
                  });
                  insertedCount++;
                } catch (singleError) {
                  errorCount++;
                  console.error(`Error inserting company ${record.cin}: ${singleError.message}`);
                }
              }
            }
          }
          
          console.log(`\n=== Import Summary ===`);
          console.log(`Total records processed: ${records.length}`);
          console.log(`Successfully imported: ${insertedCount}`);
          console.log(`Errors: ${errorCount}`);
          console.log(`Import completed successfully!`);
          
          resolve({
            totalRecords: records.length,
            insertedCount,
            errorCount
          });
          
        } catch (error) {
          console.error('Error during import:', error);
          reject(error);
        }
      })
      .on('error', (error) => {
        console.error('CSV parsing error:', error);
        reject(error);
      });
  });
}

// Run the import
importCompanies()
  .then((result) => {
    console.log('Import completed:', result);
    process.exit(0);
  })
  .catch((error) => {
    console.error('Import failed:', error);
    process.exit(1);
  });