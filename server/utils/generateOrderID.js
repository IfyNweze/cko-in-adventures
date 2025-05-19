const { v4: uuidv4 } = require('uuid');
const { format } = require('date-fns');

function generateOrderId() {
  const timestamp = format(new Date(), 'ddMMyyHHmmss'); // Format: DDMMYYHHMMSS
  const uuid = uuidv4().replace(/-/g, '').slice(0, 8);   // First 8 chars of UUID
  return `${timestamp}-${uuid}`;
}

module.exports = generateOrderId;
