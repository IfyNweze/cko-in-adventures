import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import CartSummary from '../components/CartSummary';
import Header from '../components/Header';
import { useAddress } from '../contexts/AddressContext'; 

export default function AddressPage() {
  const navigate = useNavigate();
  const { setAddress } = useAddress();

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setAddress(form);

    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
          <InputField name="name" label="Full Name" value={form.name} onChange={handleChange} />
          <InputField name="email" label="Email Address" value={form.email} onChange={handleChange} />
          <InputField name="address" label="Street Address" value={form.address} onChange={handleChange} />
          <InputField name="city" label="City" value={form.city} onChange={handleChange} />
          <InputField name="postalCode" label="Postal Code" value={form.postalCode} onChange={handleChange} />
          <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Continue to Checkout
          </button>
        </form>
        <CartSummary editable />
      </div>
    </div>
  );
}
