import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function FailurePage() {
  return (
    <div className="min-h-screen bg-red-50">
      <Header />
      <div className="max-w-xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold text-red-700 mb-4">Payment Failed</h1>
        <p className="text-gray-700 mb-6">There was an issue with your payment. Please try again.</p>
        <Link
          to="/checkout"
          className="inline-block bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
