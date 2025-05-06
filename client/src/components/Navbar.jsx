import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext'; 
import { formatCurrency } from '../utils/formatCurrency'; 
import './Navbar.css'; 

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const { cart, totalItems, totalPrice } = useCart()

  // const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  // const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">E-commerce</Link>
          <Link to="/" className="navbar-link">Products</Link>
          <Link to="/checkout" className="navbar-link">Checkout</Link>
        </div>

        <div className="navbar-right">
          <div
            className="navbar-cart-wrapper"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <div className="navbar-cart-total">
              Basket ({totalItems}): {formatCurrency(totalPrice)}
            </div>

            {showDropdown && cart.length > 0 && (
              <div className="navbar-cart-dropdown">
                {cart.slice(0, 3).map(item => (
                  <div key={item.id} className="navbar-cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-thumb" />
                    <div>
                      <div>{item.name}</div>
                      <div>{item.quantity} × {formatCurrency(item.price)}</div>
                    </div>
                  </div>
                ))}
                {cart.length > 3 && (
                  <div className="navbar-cart-more">
                    +{cart.length - 3} more item{cart.length > 4 ? 's' : ''}
                  </div>
                )}
                <Link to="/checkout" className="navbar-cart-link">Go to Checkout</Link>
              </div>
            )}
          </div>

          {user ? (
            <button className="navbar-button" onClick={logout}>Logout</button>
          ) : (
            <Link to="/login" className="navbar-link">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
