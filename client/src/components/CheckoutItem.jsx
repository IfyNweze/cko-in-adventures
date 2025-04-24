import { useCart } from '../context/CartContext';

const CheckoutItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center border-b py-2">
      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
      <div className="flex-1 ml-4">
        <h3 className="text-lg">{item.name}</h3>
        <p>${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center">
        <button
          className="px-2 py-1 bg-gray-200"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span className="px-4">{item.quantity}</span>
        <button
          className="px-2 py-1 bg-gray-200"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
        <button
          className="ml-4 text-red-500"
          onClick={() => removeFromCart(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CheckoutItem;