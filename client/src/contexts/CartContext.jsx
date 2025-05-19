import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
const [cartItems, setCartItems] = useState([]);

const addToCart = (product, qty = 1) => {
  setCartItems(prevItems => {
    const existing = prevItems.find(item => item.product.id === product.id);
    if (existing) {
      return prevItems.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + qty }
          : item
      );
    } else {
      return [...prevItems, { product, quantity: qty }];
    }
  });
};

const updateQuantity = (productId, qty) => {
  setCartItems(prevItems =>
    prevItems.map(item =>
      item.product.id === productId
        ? { ...item, quantity: qty }
        : item
    ).filter(item => item.quantity > 0)
  );
};

const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}