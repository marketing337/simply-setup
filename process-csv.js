const fs = require('fs');
const { parse } = require('csv-parse');
const path = require('path');

// Import the CSV file and process it
async function processCsvFile() {
  const csvPath = path.join(__dirname, 'attached_assets', '4dbe5667-7b6b-41d7-82af-211562424d9a_dff39c000aa72a24e9277a4913efcc74_1751199290233.csv');
  
  console.log('Starting CSV processing...');
  console.log('File path:', csvPath);
  
  // Check if file exists
  if (!fs.existsSync(csvPath)) {
    console.error('CSV file not found at:', csvPath);
    return;
  }
  
  const fileStats = fs.statSync(csvPath);
  console.log('File size:', (fileStats.size / 1024 / 1024).toFixed(2), 'MB');
  
  // Read and parse CSV
  const records = [];
  let recordCount = 0;
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(parse({ 
        columns: true, 
        skip_empty_lines: true,
        trim: true 
      }))
      .on('data', (row) => {
        records.push(row);
        recordCount++;
        
        // Log progress every 10,000 records
        if (recordCount % 10000 === 0) {
          console.log(`Parsed ${recordCount} records...`);
        }
      })
      .on('end', () => {
        console.log(`CSV parsing complete. Total records: ${records.length}`);
        resolve(records);
      })
      .on('error', (error) => {
        console.error('Error parsing CSV:', error);
        reject(error);
      });
  });
}

// Run the processing
processCsvFile()
  .then(records => {
    console.log('Sample record:', records[0]);
    console.log('Ready to upload', records.length, 'company records');
  })
  .catch(error => {
    console.error('Processing failed:', error);
  });