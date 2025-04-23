// server.js
require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const getParameter = require('./getParameter');
const verifySignature = require('./utils/verifyWebhookSig');
const writeToDynamoDB= require('./utils/writeToDDB');

const app = express();

// Middleware to parse raw body (Buffer)
app.use('/webhooks',express.raw({ type: 'application/json' }));
// app.use(express.json());

// Webhook endpoint
app.post('/webhooks', (req, res) => {
  const authHeader = req.headers['authorization'];
  const signatureHeader = req.headers['cko-signature'];
  const timestampHeader = req.headers['x-webhook-timestamp'];

  console.log(req.headers)
  
  // 1. Authorization check
  if (!authHeader || authHeader !== `Bearer ${process.env.CKO_WEBHOOK_AUTH_TOKEN}`) {
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

  // 4. Process the webhook data and write to CSV
  const webhookData = JSON.parse(rawBody); 
  writeToDynamoDB(webhookData);

  console.log('Webhook received and logged:', webhookData);

  // Respond to Checkout.com to acknowledge receipt
  res.status(200).send('OK');
});

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Webhook listener running on port ${port}`);
});