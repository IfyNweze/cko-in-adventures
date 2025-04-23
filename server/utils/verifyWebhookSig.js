const crypto = require('crypto');
const getParameter = require('./getAWSParameter');

let CKO_WEBHOOK_SIGNATURE = null;

/**
 * Verifies the HMAC signature to ensure the webhook's integrity.
 * @param {Buffer} rawBody - The raw body of the webhook request.
 * @param {string} receivedSignature - The signature received in the webhook header.
 * @returns {Promise<boolean>} - Resolves true if signatures match, otherwise false.
 */
async function verifySignature(rawBody, receivedSignature) {
    if (!CKO_WEBHOOK_SIGNATURE) {
        CKO_WEBHOOK_SIGNATURE = await getParameter('CKO_WEBHOOK_SIGNATURE');
    }

    const hmac = crypto.createHmac('sha256', CKO_WEBHOOK_SIGNATURE);
    hmac.update(rawBody);
    const expectedSignature = hmac.digest('hex');
    return expectedSignature === receivedSignature;
}

module.exports = verifySignature;
