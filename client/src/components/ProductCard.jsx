import { useCart } from '../contexts/CartContext';

export default function ProductCard({ product }) {
  const { cartItems, addToCart, updateQuantity, clearCart } = useCart();

  const currentItem = cartItems.find(item => item.product.id === product.id);
  const currentQty = currentItem ? currentItem.quantity : 0;
  const priceInPounds = (product.price / 100).toFixed(2);

  const increment = () => addToCart(product, 1);
  const decrement = () => {
    if (currentQty > 1) {
      updateQuantity(product.id, currentQty - 1);
    } else {
      updateQuantity(product.id, 0); // will remove the item
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-6">
      <img src={product.image} alt={product.name} className="w-full md:w-1/2 rounded-lg" />
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-700 mt-2">{product.description}</p>
          <p className="text-lg font-semibold mt-4">£{priceInPounds}</p>

          {currentQty > 0 ? (
            <div className="flex items-center gap-2 mt-4">
              <button onClick={decrement} className="px-2 py-1 bg-gray-200 rounded text-lg">−</button>
              <span>{currentQty}</span>
              <button onClick={increment} className="px-2 py-1 bg-gray-200 rounded text-lg">+</button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product, 1)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
