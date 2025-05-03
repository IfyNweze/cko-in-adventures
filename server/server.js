require('dotenv').config(); 
const express = require('express');
const axios = require('axios');
const getParameter = require('./utils/getAWSParameter');
const verifySignature = require('./utils/verifyWebhookSig');
const writeToDynamoDB = require('./utils/writeToDDB');

const app = express();


// Middleware to parse raw body (Buffer) for webhooks
app.use('/webhooks', express.raw({ type: 'application/json' }));
// Middleware to parse JSON body for payment session endpoint
app.use(express.json());

let CKO_WEBHOOK_AUTH_TOKEN, CKO_WEBHOOK_SIGNATURE, REGION_AWS, CKO_SECRET_KEY;

// Function to load parameters from Systems Manager
async function fetchEnvVariables() {
  try {
    // Fetch values from SSM
    CKO_WEBHOOK_AUTH_TOKEN = await getParameter('CKO_WEBHOOK_AUTH_TOKEN');
    CKO_WEBHOOK_SIGNATURE = await getParameter('CKO_WEBHOOK_SIGNATURE');
    REGION_AWS = await getParameter('REGION_AWS');
    CKO_SECRET_KEY = await getParameter('CKO_SECRET_KEY');

    console.log('Environment variables loaded successfully!');
  } catch (err) {
    console.error('Error loading environment variables', err);
    process.exit(1); // Exit if we fail to load params
  }
}

// Payment session endpoint
app.post('/api/create-payment-session', async (req, res) => {
  try {
    const { amount, currency, reference, customerEmail } = req.body;
    if (!amount || !currency || !reference) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const response = await axios.post(
      'https://api.sandbox.checkout.com/payment-sessions',
      {
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        reference,
        billing: {
          address: {
            country: 'US', // Adjust dynamically if needed
          },
        },
        customer: {
          email: customerEmail || 'customer@example.com',
        },
        remember_me: true, // Enable saved card details
        success_url: 'http://localhost:5173/checkout/success',
        failure_url: 'http://localhost:5173/checkout/failure',
      },
      {
        headers: {
          Authorization: `Bearer ${CKO_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error creating payment session:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create payment session' });
  }
});

// Webhook endpoint
app.post('/webhooks', (req, res) => {
  const authHeader = req.headers['authorization'];
  console.log('authHeader: ', authHeader);
  const signatureHeader = req.headers['cko-signature'];
  const timestampHeader = req.headers['x-webhook-timestamp'];

  console.log('headers');
  console.log(req.headers);

  // 1. Authorization check
  if (!authHeader || authHeader !== CKO_WEBHOOK_AUTH_TOKEN) {
    console.log('cko: ', CKO_WEBHOOK_AUTH_TOKEN);
    return res.status(401).send('Unauthorized');
  }

  // 2. Get raw body (Buffer)
  const rawBody = req.body;

  // 3. Signature verification
  if (!verifySignature(rawBody, signatureHeader)) {
    return res.status(400).send('Invalid signature');
  }

  //   // Optional: Timestamp verification for replay protection
  //   const now = Date.now();
  //   if (Math.abs(now - timestampHeader) > 5 * 60 * 1000) {
  //     return res.status(400).send('Stale request');
  //   }

  // 4. Process the webhook data and write to DDB
  const webhookData = JSON.parse(rawBody);
  writeToDynamoDB(webhookData);

  console.log('Webhook received and logged:', webhookData);

  // Respond to Checkout.com to acknowledge receipt
  res.status(200).send('OK');
});

// Start the Express server after loading environment variables
fetchEnvVariables().then(() => {
  const port = 80;
  app.listen(port, () => {
    console.log(`Webhook listener running on port ${port}`);
  });
});