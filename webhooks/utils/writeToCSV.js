// naming CSV or Csv in title 
// move to DDB

// utils/writeToCsv.js
const fs = require('fs');
const path = require('path');
const { parse } = require('json2csv');

/**
 * Writes the webhook data to a CSV file.
 * @param {Object} webhookData - The parsed webhook data.
 */
function writeToCsv(webhookData) {
  const filePath = path.join(__dirname, '../webhooks.csv');

  // Check if the file exists, if not, write headers
  if (!fs.existsSync(filePath)) {
    const headers = Object.keys(webhookData).join(',') + '\n';
    fs.writeFileSync(filePath, headers);
  }

  // Convert data to CSV and append it to the file
  const csvData = parse(webhookData);
  fs.appendFileSync(filePath, csvData + '\n');
}

module.exports = writeToCsv;
