import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function ProceedToCheckout() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleClick = () => {
    if (cartItems && cartItems.length > 0) {
      navigate('/address');
    } else {
      alert('Add an item to the cart first!');
    }
  };

  return (
    <div className="mt-6 text-center">
      <button
        onClick={handleClick}
        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
