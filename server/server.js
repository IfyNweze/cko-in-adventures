require('dotenv').config();

const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const path = require('path');

const createPaymentSessionRoute = require('./routes/create-payment-session');
const generateOrderId = require('./utils/generateOrderID');
const validCountryCodes = require('./utils/validCountryCodes');

// Configuration
const config = {
  app: express(),
  CHECKOUT_SECRET_KEY: process.env.CHECKOUT_SECRET_KEY,
  API_ENDPOINT: 'https://api.sandbox.checkout.com/payment-sessions',
  SUCCESS_URL: process.env.SUCCESS_URL || 'http://localhost:5173/success',
  FAILURE_URL: process.env.FAILURE_URL || 'http://localhost:5173/failure',
  PROCESSING_CHANNEL_ID: 'pc_nqrgzedskjyenbz7jra5jgpu7e',
};

config.app.use(bodyParser.json());
config.app.use(cors({ 
  origin:process.env.CLIENT_ORIGIN || 'http://localhost:5173' 
}));

// Utility Functions
// Error Formating 
const handleError = (res, error, message) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(`${message}:`, error.response?.data || error.message);
  }
  res.status(500).json({ error: message });
};

// Route Registrations
createPaymentSessionRoute(config.app, config, handleError, generateOrderId, validCountryCodes, axios);

config.app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

config.app.get('/.well-known/apple-developer-merchantid-domain-association', (req, res) => {
  const filePath = path.join(__dirname, 'public', '.well-known', 'apple-developer-merchantid-domain-association');

  if (fs.existsSync(filePath)) {
    res.download(filePath, 'apple-developer-merchantid-domain-association.txt', (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).send('Failed to download file');
      }
    });
  } else {
    res.status(404).send('Verification file not found');
  }
});

//
const PORT = process.env.PORT || 3000;
config.app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Server running on port ${PORT}`);
  }
});