import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl border border-green-100 p-12 shadow-lg">
            {/* Success Icon */}
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-8 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Payment Successful!
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Thank you for your order. Your transaction was completed successfully.
            </p>
            
            <Link 
              to="/" 
              className="inline-flex items-center justify-center w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </Link>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-2">Order confirmation sent to your email</p>
              <p className="text-xs text-gray-400">Transaction ID: #TXN-{Date.now()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}