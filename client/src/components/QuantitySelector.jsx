import { useCart } from '../contexts/CartContext';

export default function QuantitySelector() {
  const { cart, updateQuantity } = useCart();

  if (!cart.product) return null;

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => updateQuantity(cart.quantity - 1)}
        className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="font-bold text-xl text-gray-900">{cart.quantity}</span>
      <button
        onClick={() => updateQuantity(cart.quantity + 1)}
        className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}