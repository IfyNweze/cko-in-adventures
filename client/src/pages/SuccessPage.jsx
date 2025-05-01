import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const SuccessPage = () => {
  const { clearCart } = useCart(); 
  const location = useLocation();

  useEffect(() => {
    const paymentId = new URLSearchParams(location.search).get('cko-payment-id');
    if (paymentId) {
      console.log('Payment ID:', paymentId);
      // Optionally verify payment status via backend
      clearCart(); // Clear cart after successful payment
    }
  }, [location, clearCart]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Payment Successful</h1>
      <p>Thank you for your purchase!</p>
      <a href="/" className="text-blue-500">Return to Products</a>
    </div>
  );
};

export default SuccessPage;