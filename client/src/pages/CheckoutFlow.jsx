import React, { useState, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import CartSummary from '../components/CartSummary';

const CheckoutFlow = () => {
  const { cart } = useContext(CartContext);
  const [paymentMethods, setPaymentMethods] = useState({});

  const handleSelectPaymentMethod = (productId, method) => {
    setPaymentMethods({
      ...paymentMethods,
      [productId]: method,
    });
  };

  const handleProceedToPayment = () => {
    // Logic to proceed to payment after confirming the payment methods
  };

  return (
    <div className="checkout-flow">
      <h2>Checkout</h2>

      {/* Cart Summary */}
      <CartSummary 
        cart={cart}
        paymentMethods={paymentMethods}
        onSelectPaymentMethod={handleSelectPaymentMethod}
      />

      {/* Proceed to Payment Button */}
      <button onClick={handleProceedToPayment}>Proceed to Payment</button>
    </div>
  );
};

export default CheckoutFlow;
