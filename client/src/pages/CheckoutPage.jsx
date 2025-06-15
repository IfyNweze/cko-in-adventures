import { useCart } from '../contexts/CartContext';
import { useAddress } from '../contexts/AddressContext';
import Header from '../components/Header';
import CartSummary from '../components/CartSummary';
import CheckoutFlow from '../components/CheckoutFlow';

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const { address } = useAddress();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left: Payment form */}
          <div className="lg:pr-1">
              <CheckoutFlow />
          </div>
          
          {/* Right: Always-visible Order Summary */}
          <div className="lg:pl-1">
            <div className="sticky top-8">
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                <CartSummary />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}