import { useLocation } from 'react-router-dom';

const FailurePage = () => {
  const { state } = useLocation();
  const { error } = state || {};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
      <p className="mt-2">Unfortunately, your payment could not be processed.</p>
      <p className="mt-4 text-red-500">{error || 'Please try again later.'}</p>

      <div className="mt-6">
        <button onClick={() => history.push('/cart')} className="btn-primary">
          Go Back to Cart
        </button>
      </div>
    </div>
  );
};

export default FailurePage;
