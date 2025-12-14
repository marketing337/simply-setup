const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch');
const path = require('path');

async function uploadCsvFile() {
  const csvPath = path.join(__dirname, 'attached_assets', '4dbe5667-7b6b-41d7-82af-211562424d9a_dff39c000aa72a24e9277a4913efcc74_1751199290233.csv');
  
  console.log('Starting bulk CSV upload...');
  
  // Check if file exists
  if (!fs.existsSync(csvPath)) {
    console.error('CSV file not found at:', csvPath);
    return;
  }
  
  const fileStats = fs.statSync(csvPath);
  console.log('File size:', (fileStats.size / 1024 / 1024).toFixed(2), 'MB');
  
  try {
    // Create form data
    const form = new FormData();
    form.append('file', fs.createReadStream(csvPath));
    
    console.log('Uploading CSV file to server...');
    
    // Upload to validation endpoint first
    const validateResponse = await fetch('http://localhost:5000/api/admin/companies/validate-csv', {
      method: 'POST',
      body: form,
      headers: {
        'Cookie': 'connect.sid=admin-session' // You'll need to get the actual session cookie
      }
    });
    
    const validateResult = await validateResponse.json();
    console.log('Validation result:', validateResult);
    
    if (validateResult.valid) {
      console.log('CSV validation successful. Proceeding with bulk upload...');
      
      // Now upload for processing
      const form2 = new FormData();
      form2.append('file', fs.createReadStream(csvPath));
      
      const uploadResponse = await fetch('http://localhost:5000/api/admin/companies/bulk-upload', {
        method: 'POST',
        body: form2,
        headers: {
          'Cookie': 'connect.sid=admin-session'
        }
      });
      
      const uploadResult = await uploadResponse.json();
      console.log('Upload result:', uploadResult);
    }
    
  } catch (error) {
    console.error('Upload failed:', error);
  }
}

// Run the upload
uploadCsvFile();