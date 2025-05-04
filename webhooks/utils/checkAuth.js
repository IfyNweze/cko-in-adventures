const loadEnv = require('./loadEnv');

/**
 * Verifies the Authorization header against the expected token.
 * @param {string} authHeader - The value from the request's Authorization header
 * @returns {Promise<boolean>} - Whether the token is valid
 */
async function checkAuth(authHeader) {
  const { CKO_WEBHOOK_AUTH_TOKEN } = await loadEnv();

  return authHeader && authHeader === CKO_WEBHOOK_AUTH_TOKEN;
}

module.exports = checkAuth;
