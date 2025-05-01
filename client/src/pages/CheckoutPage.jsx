import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CheckoutItem from '../components/CheckoutItem';
import { CheckoutWebComponents } from '@checkout.com/checkout-web-components';

const CheckoutPage = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const [sessionId, setSessionId] = useState(null);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const fetchPaymentSession = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/create-payment-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: total,
            currency: 'USD',
            reference: `ORDER-${Date.now()}`,
            customerEmail: user?.email || 'guest@example.com', // Use user email if logged in
          }),
        });
        const data = await response.json();
        setSessionId(data.id);
      } catch (error) {
        console.error('Error fetching payment session:', error);
      }
    };

    if (total > 0) fetchPaymentSession();
  }, [total, user]);

  useEffect(() => {
    if (sessionId) {
      const checkout = new CheckoutWebComponents({
        publicKey: 'your-public-key-from-checkout-dashboard', // Replace with sandbox public key
        environment: 'sandbox',
        paymentSessionId: sessionId,
        appearance: {
          colors: {
            primary: '#3b82f6', // Match Tailwind bg-blue-500
            background: '#f3f4f6', // Match Tailwind bg-gray-100
          },
          border: { radius: '0.5rem' },
        },
        onPaymentCompleted: (event) => {
          console.log('Payment completed:', event);
          // Webhook will handle order status; redirect handled by success_url
        },
        onError: (error) => {
          console.error('Payment error:', error);
          // Display error to user
        },
      });

      const flow = checkout.create('flow');
      flow.mount('#flow-container');

      return () => flow.unmount();
    }
  }, [sessionId]);

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row">
      <div className="lg:w-2/3 pr-4">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => <CheckoutItem key={item.id} item={item} />)
        )}
        <p className="text-xl font-semibold mt-4">Total: ${total.toFixed(2)}</p>
      </div>
      <div className="lg:w-1/3 bg-gray-100 p-4 rounded mt-4 lg:mt-0">
        <h2 className="text-xl font-bold mb-4">Payment</h2>
        {user ? (
          <>
            <p>Logged in as: {user.username}</p>
            <p>Saved Card: {user.savedCard}</p>
            <div id="flow-container" className="mt-4"></div>
          </>
        ) : (
          <p>
            Please <a href="/login" className="text-blue-500">log in</a> to use saved card details.
          </p>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;