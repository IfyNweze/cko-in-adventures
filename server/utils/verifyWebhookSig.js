const crypto = require('crypto');

// HMAC sig verfication 

/**
 * Verifies the HMAC signature to ensure the webhook's integrity.
 * @param {Buffer} rawBody - The raw body of the webhook request.
 * @param {string} receivedSignature - The signature received in the webhook header.
 * @returns {boolean} - Returns true if signatures match, otherwise false.
 */

function verifySignature(rawBody, recievedSig) {
    const hmac = crypto.createHmac('sha256',CKO_WEBHOOK_SIGNATURE);
    hmac.update(rawBody);
    const expectedSignature = hmac.digest('hex');
    return expectedSignature === recievedSignature;
}

module.exports = verifySignature; 