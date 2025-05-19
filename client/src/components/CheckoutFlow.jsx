import { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAddress } from '../contexts/AddressContext';

export default function CheckoutFlow() {
  const { cartItems } = useCart();
  const { address } = useAddress();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Cart items:', cartItems);
    console.log('Address:', address);

    const createPaymentSession = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/create-payment-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            products: cartItems.map(({ product, quantity }) => ({
              id: product.id,
              name: product.name,
              description: product.description,
              price: product.price,      // price in minor units (e.g., pence)
              quantity,
              type: product.type || 'physical', // optional, can omit if you want
            })),
            currency: 'GBP',
            address,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Payment session failed');

        const checkout = await window.CheckoutWebComponents({
          publicKey: import.meta.env.VITE_CKO_PUBLIC_KEY,
          environment: 'sandbox',
          locale: 'en-GB',
          paymentSession: data,
          onReady: () => console.log('Flow ready'),
          onPaymentCompleted: (_component, paymentResponse) => {
            console.log('Payment ID:', paymentResponse.id);
            window.location.href = '/success';
          },
          onChange: (component) => {
            console.log(`onChange() → isValid: ${component.isValid()} for ${component.type}`);
          },
          onError: (component, error) => {
            console.error('onError', error, 'Component', component.type);
            window.location.href = '/failure';
          },
        });

        const flowComponent = checkout.create('flow');
        flowComponent.mount('#checkout-container');

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (cartItems.length > 0 && address) {
      createPaymentSession();
    } else {
      setError('Cart or address info missing.');
      setLoading(false);
    }
  }, [cartItems, address]);

  return (
    <div>
      {loading && <p>Loading payment session...</p>}
      {error && <p>Error: {error}</p>}

      <div id="checkout-container" className="min-h-[300px]"></div>
    </div>
  );
}
