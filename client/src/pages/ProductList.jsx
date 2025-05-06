import React, { useContext } from 'react';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../contexts/CartContext';
import products from '../data/products'; 

const ProductList = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="product-list">
      <h1>Our Products</h1>
      
      <div className="products">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="cart-summary">
        <p>Items in Cart: {cart.length}</p>
        <button onClick={() => window.location.href = '/checkout'}>Go to Checkout</button>
      </div>
    </div>
  );
};

export default ProductList;
