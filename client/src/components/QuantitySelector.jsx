import { useCart } from '../contexts/CartContext';

export default function QuantitySelector() {
  const { cart, updateQuantity } = useCart();

  if (!cart.product) return null;

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => updateQuantity(cart.quantity - 1)}
        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
      >
        −
      </button>
      <span className="text-md">{cart.quantity}</span>
      <button
        onClick={() => updateQuantity(cart.quantity + 1)}
        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
      >
        +
      </button>
    </div>
  );
}
