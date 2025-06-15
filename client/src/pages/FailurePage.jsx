import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function FailurePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl border border-red-100 p-12 shadow-lg">
            {/* Error Icon */}
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-8 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Payment Failed
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              There was an issue with your payment. Please try again.
            </p>
            
            <Link 
              to="/checkout" 
              className="inline-flex items-center justify-center w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </Link>
            
            <Link 
              to="/" 
              className="inline-block mt-4 text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200"
            >
              or go back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}