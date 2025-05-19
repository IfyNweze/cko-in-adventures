import product from '../data/products.json';
import ProductCard from '../components/ProductCard';
import ProceedToCheckout from '../components/ProceedToCheckout';
import Header from '../components/Header';

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6 max-w-4xl mx-auto">
        <ProductCard product={product} />
        <ProceedToCheckout />
      </main>
    </div>
  );
}
