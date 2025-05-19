import { useCart } from '../contexts/CartContext';

export default function CartSummary({ editable = false }) {
  const { cartItems, updateQuantity, clearCart } = useCart();

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  const total = cartItems.reduce(
    (sum, item) => sum + (item.product.price / 100) * item.quantity,
    0
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      {cartItems.map(({ product, quantity }) => {
        const unitPrice = product.price / 100;
        const lineTotal = unitPrice * quantity;

        return (
          <div key={product.id} className="mb-4 border-b pb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">{product.name}</span>
              <span>£{unitPrice.toFixed(2)}</span>
            </div>

            {editable ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            ) : (
              <p className="text-gray-600">Quantity: {quantity}</p>
            )}
          </div>
        );
      })}

      {editable && (
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:underline mb-4"
        >
          Clear Cart
        </button>
      )}

      <hr className="my-4" />
      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>£{total.toFixed(2)}</span>
      </div>
    </div>
  );
}
