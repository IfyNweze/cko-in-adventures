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

  const isDisabled = !cartItems || cartItems.length === 0;

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`
        w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
        ${isDisabled 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
        }
      `}
    >
      <div className="flex items-center justify-center space-x-2">
        <span>Proceed to Checkout</span>
        {!isDisabled && (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        )}
      </div>
    </button>
  );
}