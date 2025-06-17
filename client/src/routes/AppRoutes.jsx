import { Routes, Route } from 'react-router-dom';
import ProductPage from '../pages/ProductPage';
import AddressPage from '../pages/AddressPage';
import CheckoutPage from '../pages/CheckoutPage';
import SuccessPage from '../pages/SuccessPage';
import FailurePage from '../pages/FailurePage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductPage />} />
      <Route path="/address" element={<AddressPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/failure" element={<FailurePage />} />
      <Route path="/.well-known/*" element={null} />
    </Routes>
  );
}

