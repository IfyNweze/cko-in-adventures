require('dotenv').config(); 

const axios = require('axios');
const bodyParser = require('body-parser');
const { DateTime } = require('luxon');
const express = require('express');
const uuid = require('uuid');

const app = express();


// Middleware to parse JSON body for payment session endpoint
app.use(express.json());

let CKO_SECRET_KEY;

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


// if (product.paymentOptions.includes('recurring')) {
//   item.recurring = {
//     interval: product.recurring.interval,
//     interval_count: product.recurring.intervalCount,
//   };
// }
