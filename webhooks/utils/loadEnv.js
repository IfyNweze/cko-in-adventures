const getAWSParameter = require('./getAWSParameter');

let cachedEnv = null;

/**
 * Loads and caches necessary environment secrets from AWS SSM.
 * Only runs once per cold start.
 * @returns {Promise<Object>} Object with the required secrets
 */
async function loadEnv() {
  if (cachedEnv) return cachedEnv;

  const [
    CKO_WEBHOOK_AUTH_TOKEN,
    CKO_WEBHOOK_SIGNATURE,
    CKO_SECRET_KEY,
  ] = await Promise.all([
    getAWSParameter('CKO_WEBHOOK_AUTH_TOKEN'),
    getAWSParameter('CKO_WEBHOOK_SIGNATURE'),
    getAWSParameter('CKO_SECRET_KEY'),
  ]);

  cachedEnv = {
    CKO_WEBHOOK_AUTH_TOKEN,
    CKO_WEBHOOK_SIGNATURE,
    CKO_SECRET_KEY,
  };

  return cachedEnv;
}

module.exports = loadEnv;
