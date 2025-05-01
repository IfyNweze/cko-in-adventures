import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import SuccessPage from './pages/SuccessPage';
import FailurePage from './pages/FailurePage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/checkout/success" element={<SuccessPage />} />
            <Route path="/checkout/failure" element={<FailurePage />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;