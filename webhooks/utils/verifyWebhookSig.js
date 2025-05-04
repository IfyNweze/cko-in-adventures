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

  if (!CKO_WEBHOOK_SIGNATURE) {
    throw new Error('CKO_WEBHOOK_SIGNATURE is missing from environment');
  }

  const hmac = crypto.createHmac('sha256', CKO_WEBHOOK_SIGNATURE);
  hmac.update(rawBody);

  const expectedSignature = Buffer.from(hmac.digest('hex'), 'utf8');
  const receivedSigBuffer = Buffer.from(receivedSignature || '', 'utf8');

  // Constant-time comparison to prevent timing attacks
  
  const isValid =
    expectedSignature.length === receivedSigBuffer.length &&
    crypto.timingSafeEqual(expectedSignature, receivedSigBuffer);
  
  return isValid;
  
}

module.exports = verifyWebhookSig;
