require('dotenv').config();
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const generateOrderId = require('./utils/generateOrderID');

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5173' }));

const CHECKOUT_SECRET_KEY = process.env.CHECKOUT_SECRET_KEY;

app.post('/api/create-payment-session', async (req, res) => {
  try {
    const { products, currency = 'GBP', address } = req.body;

    // Log incoming data for debugging
    console.log('Received products:', products);
    console.log('Received currency:', currency);
    console.log('Received address:', address);

    if (!products || !Array.isArray(products) || products.length === 0) {
      console.log('Error: No products found in request');
      return res.status(400).json({ error: 'Missing or empty products array' });
    }

    if (!address || !address.address || !address.city || !address.postalCode) {
      console.log('Error: Invalid or missing address');
      return res.status(400).json({ error: 'Missing or invalid address' });
    }

    // Calculate total amount (in minor units e.g. pence)
    const amount = products.reduce((total, item) => {
      if (!item.price || !item.quantity) {
        throw new Error('Each product must have price and quantity');
      }
      return total + item.price * item.quantity;
    }, 0);

    console.log(`Total amount to charge: ${amount} ${currency}`);

    const reference = generateOrderId();

    const response = await axios.post(
      'https://api.sandbox.checkout.com/payment-sessions',
      {
        amount,
        currency,
        reference,
        processing_channel_id: 'pc_nqrgzedskjyenbz7jra5jgpu7e',
        "3ds": {
          enabled: true,
        },
        billing: {
          address: {
            address_line1: address.address,
            city: address.city,
            zip: address.postalCode,
            country: address.country || 'GB',
          },
        },
        customer: {
          email: address.email || 'customer@example.com',
          name: address.name || 'Guest User',
        },
        success_url: 'http://localhost:5173/success',
        failure_url: 'http://localhost:5173/failure',
      },
      {
        headers: {
          Authorization: `Bearer ${CHECKOUT_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Payment session created successfully');
    res.json(response.data);
  } catch (error) {
    console.error('Error creating payment session:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create payment session' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
