import { useCart } from '../contexts/CartContext';

export default function ProductCard({ product }) {
  const { cartItems, addToCart, updateQuantity } = useCart();

  const currentItem = cartItems.find(item => item.product?.id === product.id);
  const currentQty = currentItem?.quantity || 0;
  const priceInPounds = ((product?.price ?? 0) / 100).toFixed(2);

  const increment = () => addToCart(product, 1);
  const decrement = () => {
    const newQty = currentQty - 1;
    updateQuantity(product.id, Math.max(0, newQty));
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full h-auto flex flex-col">
      <div className="w-full aspect-[4/3] bg-gray-100 flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4 flex-grow">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h2>
          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-blue-600">
            {priceInPounds}
          </span>
        </div>

        {currentQty > 0 ? (
          <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
            <div className="flex items-center space-x-3">
              <button
                onClick={decrement}
                aria-label="Decrease quantity"
                className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:border-red-300 hover:text-red-600 transition-colors text-sm"
              >
                −
              </button>
              <span className="font-bold text-lg text-gray-900">{currentQty}</span>
              <button
                onClick={increment}
                aria-label="Increase quantity"
                className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors text-sm"
              >
                +
              </button>
            </div>
            <span className="text-xs font-medium text-gray-600">In Cart</span>
          </div>
        ) : (
          <button
            onClick={() => addToCart(product, 1)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            aria-label={`Add ${product.name} to cart`}
          >
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l1.5-6" />
              </svg>
              <span>Add to Cart</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}