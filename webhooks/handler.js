const loadEnv = require('./utils/loadEnv');
const checkAuth = require('./utils/checkAuth');
const verifySignature = require('./utils/verifySignature');
const writeToDynamoDB = require('./utils/writeToDynamoDB');

exports.handler = async (event) => {
    try {

        const headers = event.headers || {};
        const authHeader = headers['authorization'] || headers['Authorization'];
        const signatureHeader = headers['cko-signature'];

        console.log('Headers from CKO: ', event.headers);

        // Globally cached for reuse during deployments
        const { CKO_WEBHOOK_AUTH_TOKEN } = await loadEnv();


        // 1. Authorization check

        if (!checkAuth(authHeader, CKO_WEBHOOK_AUTH_TOKEN)) {
            return {
              statusCode: 401,
              body: JSON.stringify({ error: 'Unauthorized' }),
            };
          }

        // 2. Event Check 

        if (!event.body) {
            return {
              statusCode: 400,
              body: JSON.stringify({ error: 'Missing body' }),
            };
          }

        const rawBody = event.isBase64Encoded
        ? Buffer.from(event.body, 'base64')
        : Buffer.from(event.body, 'utf-8');

        // 3. Signature verification
        // Unique per request

        if (!(await verifySignature(rawBody, signatureHeader))) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid signature' }),
            };
        }

        // 4. Process the webhook data and write to DDB

        const webhookData = JSON.parse(rawBody.toString());
        await writeToDynamoDB(webhookData);
    
        // 5. Return 'OK' 
    
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'OK' }),
        };

    } catch (err) {
        console.error('Handler error:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Server error' }),
        };
    }
};
