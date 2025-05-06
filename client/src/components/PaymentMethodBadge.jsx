import React from 'react';

const PaymentMethodBadge = ({ paymentOptions, selectedMethod, onSelectMethod }) => {
  return (
    <div className="payment-method-badges">
      {paymentOptions.includes('Recurring') && (
        <button
          onClick={() => onSelectMethod('Recurring')}
          className={`badge ${selectedMethod === 'recurring' ? 'selected' : ''}`}
        >
          Recurring
        </button>
      )}
      {paymentOptions.includes('Installments') && (
        <button
          onClick={() => onSelectMethod('Installments')}
          className={`badge ${selectedMethod === 'installments' ? 'selected' : ''}`}
        >
          Installments
        </button>
      )}
      {paymentOptions.includes('Unscheduled') && (
        <button
          onClick={() => onSelectMethod('Unscheduled')}
          className={`badge ${selectedMethod === 'unscheduled' ? 'selected' : ''}`}
        >
          Unscheduled
        </button>
      )}
      {paymentOptions.includes('Regular') && (
        <button
          onClick={() => onSelectMethod('Regular')}
          className={`badge ${selectedMethod === 'standard' ? 'selected' : ''}`}
        >
          Regular
        </button>
      )}
    </div>
  );
};

export default PaymentMethodBadge;
