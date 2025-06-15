import { useCart } from '../contexts/CartContext';

export default function CartSummary({ editable = false }) {
  const { cartItems, updateQuantity, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l1.5-6M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </div>
        <p className="text-gray-500 font-medium">Your cart is empty</p>
      </div>
    );
  }

  const total = cartItems.reduce(
    (sum, item) => sum + (item.product.price / 100) * item.quantity,
    0
  );

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
      <div className="bg-blue-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white">Order Summary</h2>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {cartItems.map(({ product, quantity }) => {
            const unitPrice = product.price / 100;
            const lineTotal = unitPrice * quantity;

            return (
              <div key={product.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600">{unitPrice.toFixed(2)} each</p>
                  
                  {editable ? (
                    <div className="flex items-center gap-1 mt-3">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
                      >
                        −
                      </button>
                      <span className="mx-3 font-medium text-gray-900">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 mt-1">Qty: {quantity}</p>
                  )}
                </div>
                
                <div className="text-right ml-4">
                  <p className="font-bold text-gray-900">{lineTotal.toFixed(2)}</p>
                </div>
              </div>
            );
          })}
        </div>

        {editable && (
          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:text-red-600 transition-colors mt-4 font-medium"
          >
            Clear Cart
          </button>
        )}

        <div className="border-t border-gray-200 mt-6 pt-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-blue-600">
              {total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}