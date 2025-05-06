import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const { state } = useLocation();
  const { orderId, items } = state || {};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Thank you for your order!</h1>
      <p className="mt-2">Your order has been successfully processed.</p>
      <p className="mt-4">Order ID: {orderId}</p>

      <h3 className="mt-6 font-semibold">Items Purchased:</h3>
      <ul className="mt-2">
        {items && items.map(item => (
          <li key={item.id}>{item.name} - {item.quantity} x ${item.price}</li>
        ))}
      </ul>

      <div className="mt-6">
        <button onClick={() => history.push('/products')} className="btn-primary">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
