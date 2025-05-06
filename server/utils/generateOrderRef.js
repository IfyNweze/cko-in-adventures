const { DateTime } = require('luxon');
const { v4: uuidv4 } = require('uuid');

module.exports = function generateOrderRef() {
  // Get the local time in ISO format with timezone offset (e.g., +01:00)
  const isoDate = DateTime.local().toISO({ suppressMilliseconds: true });

  // Generate UUID (8 characters) and convert to uppercase
  const uuid = uuidv4().split('-')[0].toUpperCase();

  // Return the formatted order reference
  return `ORD-${isoDate}-${uuid}`;
};
