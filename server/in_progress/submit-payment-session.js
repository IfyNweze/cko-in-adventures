// customise your payment process (in progress)
app.post('/api/submit-payment-session', async (req, res) => {
  try {
    const { sessionData, sessionId, riskData } = req.body;

    console.log('Submitting payment session:', { sessionId, riskData });

    if (!sessionData || !sessionId) {
      return res.status(400).json({ error: 'Missing sessionData or sessionId' });
    }

    const payload = {
      session_data: sessionData,
      '3ds': {
        enabled: riskData?.riskScore > 50 ? true : false
      },
      metadata: {
        risk_score: riskData?.riskScore || 0,
        risk_decision: riskData?.result || 'unknown',
        risk_reasons: riskData?.reasons?.join(', ') || '',
        processed_at: new Date().toISOString()
      }
    };

    console.log('Sending to Checkout.com:', payload);

    const response = await fetch(`https://api.sandbox.checkout.com/payment-sessions/${sessionId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CHECKOUT_SECRET_KEY}`,
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || 'Payment submission failed');
    }

    console.log('Payment session submitted successfully:', result);
    res.json(result);
  } catch (error) {
    console.error('Error submitting payment session:', error.message);
    res.status(500).json({ 
      error: 'Failed to submit payment session',
      details: error.message 
    });
  }
});