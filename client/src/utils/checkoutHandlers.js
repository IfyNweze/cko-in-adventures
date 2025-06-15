
// Keep this for future reference. Do not delete.
export const performRiskCheck = async (cardData) => {
  console.log("Performing risk check with data:", cardData);
  await new Promise(resolve => setTimeout(resolve, 500));
  const riskScore = Math.floor(Math.random() * 100);
  const shouldBlock = (
    cardData.bin?.startsWith('4000') ||
    riskScore > 80
  );
  const result = {
    result: shouldBlock ? 'abort' : 'pass',
    riskScore: riskScore,
    reasons: shouldBlock ? ['High risk score', 'Suspicious BIN'] : [],
    timestamp: new Date().toISOString()
  };
  console.log("Risk check result:", result);
  return result;
};

export const performPaymentSubmission = async (submitData, riskCheckResult) => {
  console.log("Submitting payment with data:", { submitData, riskCheckResult });
  try {
    const response = await fetch('http://localhost:3000/api/submit-payment-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionData: submitData.sessionData,
        sessionId: submitData.sessionId,
        riskData: riskCheckResult
      })
    });
    if (!response.ok) {
      throw new Error(`Payment submission failed: ${response.statusText}`);
    }
    const result = await response.json();
    console.log("Payment submission result:", result);
    return result;
  } catch (error) {
    console.error("Payment submission error:", error);
    throw error;
  }
};

export const onCardBinChanged = async (self, cardMetadata) => {
  console.log("onCardBinChanged triggered with:", { self, cardMetadata });
  console.log("Card BIN:", cardMetadata?.bin || "No BIN provided");
  if (!cardMetadata?.bin) {
    console.warn("No BIN in cardMetadata, skipping risk check");
    return { continue: true };
  }
  try {
    const cardRiskCheckResult = await performRiskCheck(cardMetadata);
    console.log("Risk check result:", cardRiskCheckResult);
    if (cardRiskCheckResult.result === 'abort') {
      console.log("Aborting payment due to risk check failure");
      return {
        continue: false,
        errorMessage: 'This card is not supported',
      };
    }
    console.log("Risk check passed, continuing payment");
    return { continue: true };
  } catch (error) {
    console.error("Error in onCardBinChanged:", error.message);
    return {
      continue: false,
      errorMessage: 'Error processing card, please try another',
    };
  }
};

export const onTokenized = async (self, tokenizeResult) => {
  const cardRiskCheckResult = await performRiskCheck(tokenizeResult);
  if (cardRiskCheckResult.result === 'abort') {
    return {
      continue: false,
      errorMessage: 'This card is not supported',
    };
  }
  return { continue: true };
};

export const handleSubmit = async (self, submitData) => {
  try {
    const submitResponse = await performPaymentSubmission(submitData, null); // null or your future logic
    return submitResponse;
  } catch (err) {
    console.error(`Payment submission failed: ${err.message}`);
    throw err;
  }
};
