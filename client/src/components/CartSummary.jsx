import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import PaymentMethodBadge from './PaymentMethodBadge';

const CartSummary = ({ paymentMethods, onSelectPaymentMethod }) => {
  const { cart } = useContext(CartContext);

  const formatPrice = (amount) => `£${(amount / 100).toFixed(2)}`;
  
  const totalPrice = cart.reduce((acc, product) => acc + product.price, 0);

  return (
    <div className="cart-summary">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.map((product) => (
          <div key={product.id} className="cart-item">
            <img src={product.image} alt={product.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{product.name}</h3>
              <p>{formatPrice(product.price)}</p>
              <PaymentMethodBadge
                paymentOptions={product.paymentOptions}
                selectedMethod={paymentMethods[product.id]}
                onSelectMethod={(method) => onSelectPaymentMethod(product.id, method)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <p><strong>Total: {formatPrice(totalPrice)}</strong></p>
      </div>
    </div>
  );
};

export default CartSummary;
