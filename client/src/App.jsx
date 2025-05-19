import AppRoutes from './routes/AppRoutes';
import { AddressProvider } from './contexts/AddressContext';
import { CartProvider } from './contexts/CartContext';

export default function App() {
  return (
    <CartProvider>
      <AddressProvider>
        <AppRoutes />
      </AddressProvider>
    </CartProvider>
  );
}
