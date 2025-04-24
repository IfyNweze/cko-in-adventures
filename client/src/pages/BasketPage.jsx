import React from 'react';
import { useBasket } from '../context/CartContext';
import { Link } from 'react-router-dom'; // For navigation to the checkout page

const BasketPage = () => {
  const { basket, removeFromBasket } = useBasket();

  const handleRemoveItem = (productId) => {
    removeFromBasket(productId);
  };

  const calculateTotal = () => {
    return basket.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0).toFixed(2);
  };

  return (
    <div className="basket-page">
      <h1>Your Basket</h1>
      {basket.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        <div>
          <ul>
            {basket.map((item) => (
              <li key={item.id} className="basket-item">
                <div>
                  <h4>{item.name}</h4>
                  <p>{item.price}</p>
                </div>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="basket-total">
            <h3>Total: ${calculateTotal()}</h3>
            <Link to="/checkout">
              <button className="checkout-button">Proceed to Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasketPage;
