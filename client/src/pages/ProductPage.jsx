import product from '../data/products.json';
import ProductCard from '../components/ProductCard';
import ProceedToCheckout from '../components/ProceedToCheckout';
import Header from '../components/Header';

export default function ProductPage() {
  return (
  <div className="min-h-screen bg-white">
    <Header />
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {product.map(p => (
          <div key={p.id} className="transform hover:scale-105 transition-transform duration-200">
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      {/* Checkout Section Full Width */}
      <div className="bg-blue-50 rounded-2xl border border-gray-100 p-6 shadow-sm w-full">
        <div className="flex justify-center">
          <ProceedToCheckout />
        </div>
      </div>

    </div>
  </div>
);
}