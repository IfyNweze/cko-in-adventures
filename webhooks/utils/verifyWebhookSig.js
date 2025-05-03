const crypto = require('crypto');
const loadEnv = require('./loadEnv');

/**
 * Verifies the webhook's HMAC signature to ensure integrity.
 * @param {Buffer} rawBody - The raw body of the webhook request (not parsed)
 * @param {string} receivedSignature - The signature from the 'cko-signature' header
 * @returns {Promise<boolean>} - True if the signature is valid
 */
async function verifyWebhookSig(rawBody, receivedSignature) {
  const { CKO_WEBHOOK_SIGNATURE } = await loadEnv();

  const hmac = crypto.createHmac('sha256', CKO_WEBHOOK_SIGNATURE);
  hmac.update(rawBody);

  const expectedSignature = hmac.digest('hex');
  return expectedSignature === receivedSignature;
}

module.exports = verifyWebhookSig;
