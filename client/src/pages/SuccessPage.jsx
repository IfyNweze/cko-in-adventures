import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-green-50">
      <Header />
      <div className="max-w-xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Payment Successful!</h1>
        <p className="text-gray-700 mb-6">Thank you for your order. Your transaction was completed successfully.</p>
        <Link
          to="/"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
