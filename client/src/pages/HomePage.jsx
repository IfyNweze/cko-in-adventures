import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ProductCard from "../components/ProductCard"; // Import the ProductCard component
import products from "../data/products"; // Import the static data

const Home = () => {
  const [cart, setCart] = useState([]); // State to store cart items
  const history = useHistory();

  // Add product to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Proceed to checkout page
  const proceedToCheckout = () => {
    history.push("/checkout"); // Redirect to checkout page
  };

  return (
    <div>
      <h1>Welcome to Our Store</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => addToCart(product)} // Handle adding product to cart
          />
        ))}
      </div>

      {/* Cart Summary Button */}
      <button onClick={proceedToCheckout}>Go to Checkout</button>
    </div>
  );
};

export default Home;