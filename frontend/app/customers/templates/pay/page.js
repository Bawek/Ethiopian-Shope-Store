'use client';
import { useState } from 'react';
import axios from 'axios';

export default function PayPage() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    amount: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // clear error
  };

  const validate = () => {
    const newErrors = {};

    // Name validation (letters only)
    if (!form.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    } else if (!/^[A-Za-z]+$/.test(form.first_name)) {
      newErrors.first_name = 'First name must contain letters only';
    }

    if (!form.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    } else if (!/^[A-Za-z]+$/.test(form.last_name)) {
      newErrors.last_name = 'Last name must contain letters only';
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Phone number (digits only, 9–15 digits)
    if (!form.phone_number.trim()) {
      newErrors.phone_number = 'Phone number is required';
    } else if (!/^\d+$/.test(form.phone_number)) {
      newErrors.phone_number = 'Phone must contain numbers only';
    } else if (form.phone_number.length < 9 || form.phone_number.length > 15) {
      newErrors.phone_number = 'Phone number must be between 9 and 15 digits';
    }

    // Amount (number, range)
    const amount = parseFloat(form.amount);
    if (!form.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(amount)) {
      newErrors.amount = 'Amount must be a number';
    } else if (amount < 10 || amount > 100000) {
      newErrors.amount = 'Amount must be between 10 and 100,000 ETB';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/api/pay', form, {
        headers: { 'Content-Type': 'application/json' },
      });

      const data = res.data;

      if (data.checkout_url) {
        localStorage.setItem('chapa_tx_ref', data.tx_ref);
        window.location.href = data.checkout_url;
      } else {
        throw new Error(data.error || 'Payment failed');
      }
    } catch (err) {
      console.error(err);
      alert(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-10">
      <div className="max-w-md mx-auto bg-white shadow-lg p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Chapa Payment</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name */}
          <div>
            <label className="block font-medium">First Name</label>
            <input
              name="first_name"
              type="text"
              value={form.first_name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label className="block font-medium">Last Name</label>
            <input
              name="last_name"
              type="text"
              value={form.last_name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              name="phone_number"
              type="tel"
              value={form.phone_number}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number}</p>}
          </div>

          {/* Amount */}
          <div>
            <label className="block font-medium">Amount (ETB)</label>
            <input
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
