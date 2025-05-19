import { useCart } from '../contexts/CartContext';
import { useAddress } from '../contexts/AddressContext';
import Header from '../components/Header';
import CartSummary from '../components/CartSummary';
import CheckoutFlow from '../components/CheckoutFlow';

export default function CheckoutPage() {
  const { cart } = useCart();
  const { address } = useAddress();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <CartSummary />
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Payment</h2>
          <CheckoutFlow cart={cart} address={address} />
        </div>
      </div>
    </div>
  );
}