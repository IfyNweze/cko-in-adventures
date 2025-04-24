import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CheckoutItem from '../components/CheckoutItem';

const CheckoutPage = () => {
  const { cart } = useCart();
  const { user } = useAuth();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row">
      <div className="lg:w-2/3 pr-4">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => <CheckoutItem key={item.id} item={item} />)
        )}
        <p className="text-xl font-semibold mt-4">Total: ${total.toFixed(2)}</p>
      </div>
      <div className="lg:w-1/3 bg-gray-100 p-4 rounded mt-4 lg:mt-0">
        <h2 className="text-xl font-bold mb-4">Checkout Flow</h2>
        {user ? (
          <>
            <p>Logged in as: {user.username}</p>
            <p>Saved Card: {user.savedCard}</p>
            <p className="text-gray-500">Placeholder for payment form</p>
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
              Proceed to Payment
            </button>
          </>
        ) : (
          <p>Please <a href="/login" className="text-blue-500">log in</a> to use saved card details.</p>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;