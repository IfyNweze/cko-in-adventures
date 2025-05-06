import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import PaymentMethodBadge from './PaymentMethodBadge';

const ProductCard = ({ product }) => {
  const { addToCart, cart } = useContext(CartContext);
  const [selectedMethod, setSelectedMethod] = useState(null);

  const isAdded = cart.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    const productWithMethod = {
      ...product,
      selectedPaymentMethod: selectedMethod || 'standard',
    };
    addToCart(productWithMethod);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p><strong>{formatCurrency(product.price)}</strong></p>

      <PaymentMethodBadge
        paymentOptions={product.paymentOptions}
        selectedMethod={selectedMethod}
        onSelectMethod={setSelectedMethod}
      />

      <button 
        onClick={handleAddToCart} 
        disabled={isAdded}
      >
        {isAdded ? 'Added to Basket' : 'Add to Basket'}
      </button>
    </div>
  );
};

export default ProductCard;
