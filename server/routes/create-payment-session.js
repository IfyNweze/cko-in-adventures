module.exports = (app, config, handleError, generateOrderId, validCountryCodes, axios) => {
  // Helper Functions
  const validateRequest = (items, address) => {
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('Missing or empty products array');
    }
    const billing = address?.billing || {};
    if (!billing.address_line1 || !billing.city || !billing.zip || !billing.country) {
      throw new Error('Missing or invalid billing address');
    }
    if (!validCountryCodes.includes(billing.country.toUpperCase())) {
      throw new Error('Invalid billing address country code');
    }
    if (!address?.customer?.email) {
      throw new Error('Missing customer email');
    }
  };

  const calculateAmount = (items) => {
    return items.reduce((total, item) => {
      if (!item.unit_price || !item.quantity) {
        throw new Error('Each item must have unit_price and quantity');
      }
      return total + item.unit_price * item.quantity;
    }, 0);
  };

  const buildPhone = (phone) => {
    if (!phone?.country_code && !phone?.number) return undefined;
    return {
      country_code: phone?.country_code || undefined,
      number: phone?.number || undefined
    };
  };

  const buildBasePayload = (amount, currency, reference, billing, items) => ({
    amount,
    currency,
    reference,
    processing_channel_id: config.PROCESSING_CHANNEL_ID,
    '3ds': { enabled: true },
    // disabled_payment_methods: ["klarna"],
    billing: {
      address: {
        address_line1: billing.address_line1,
        address_line2: billing.address_line2 || undefined,
        city: billing.city,
        state: billing.state || undefined,
        zip: billing.zip,
        country: billing.country
      },
      phone: buildPhone(billing.phone)
    },
    items: items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_amount: item.unit_price * item.quantity,
      reference: item.reference
    })),
    success_url: config.SUCCESS_URL,
    failure_url: config.FAILURE_URL
  });

  const buildCustomer = (customer) => {
    if (!customer.email && !customer.name && !customer.id && !customer.tax_number && !customer.phone?.country_code && !customer.phone?.number) {
      return undefined;
    }
    return {
      email: customer.email,
      ...(customer.name && { name: customer.name }),
      ...(customer.id && { id: customer.id }),
      ...(customer.tax_number && { tax_number: customer.tax_number }),
      ...(customer.phone?.country_code || customer.phone?.number) && { phone: buildPhone(customer.phone) }
    };
  };

  const buildShipping = (shipping) => {
    if (!shipping.address_line1) return undefined;
    return {
      address: {
        address_line1: shipping.address_line1,
        ...(shipping.address_line2 && { address_line2: shipping.address_line2 }),
        ...(shipping.city && { city: shipping.city }),
        ...(shipping.state && { state: shipping.state }),
        ...(shipping.zip && { zip: shipping.zip }),
        ...(shipping.country && { country: shipping.country })
      },
      ...(shipping.phone?.country_code || shipping.phone?.number) && { phone: buildPhone(shipping.phone) }
    };
  };

  // Route Handler
  app.post('/api/create-payment-session', async (req, res) => {
    try {
      const { items, currency = 'GBP', address } = req.body;

      validateRequest(items, address);

      const amount = calculateAmount(items);
      const reference = generateOrderId();
      let payload = buildBasePayload(amount, currency, reference, address.billing, items);

      const customer = buildCustomer(address.customer);
      if (customer) payload.customer = customer;

      const shipping = buildShipping(address.shipping);
      if (shipping) payload.shipping = shipping;

      const cleanPayload = JSON.parse(JSON.stringify(payload));

      if (process.env.NODE_ENV !== 'production') {
        console.log('Sending payload:', cleanPayload);
      }

      const response = await axios.post(
        config.API_ENDPOINT,
        cleanPayload,
        {
          headers: {
            Authorization: `Bearer ${config.CHECKOUT_SECRET_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (process.env.NODE_ENV !== 'production') {
        console.log('Payment session created successfully');
      }
      res.json(response.data);
      console.log(response.data);
    } catch (error) {
      handleError(res, error, 'Failed to create payment session');
    }
  });
};