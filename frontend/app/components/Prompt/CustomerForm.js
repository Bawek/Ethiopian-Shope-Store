"use client";
// components/DeliveryForm.js
import { useState } from "react";

const CustomerForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    city: "",
    zip: "",
    address1: "",
    phone_number: "",
    state: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex bg-gradient-to-r from-blue-700 to-blue-500 text-white p-6 rounded-lg">
      <div className="flex-1 flex flex-col justify-center items-center bg-blue-700 p-6 rounded-l-lg">
        <h1 className="text-2xl font-bold">Welcome</h1>
        <p className="mt-2">
          You are 30 seconds away from completing your order!
        </p>
        <button className="mt-4 py-2 px-4 bg-white text-blue-700 rounded-lg">
          GO BACK
        </button>
      </div>
      <div className="flex-2 bg-white text-black p-6 rounded-r-lg">
        <h2 className="text-xl font-bold mb-4">Delivery Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              name="first_name"
              placeholder="First name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-1/2 p-2 border rounded-lg"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-1/2 p-2 border rounded-lg"
            />
          </div>
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-1/2 p-2 border rounded-lg"
            />
            <input
              type="text"
              name="zip"
              placeholder="Zip"
              value={formData.zip}
              onChange={handleChange}
              className="w-1/2 p-2 border rounded-lg"
            />
          </div>
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              name="phone_number"
              placeholder="phone number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-1/2 p-2 border rounded-lg"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="w-1/2 p-2 border rounded-lg"
            />
          </div>
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              name="address1"
              placeholder="Address"
              value={formData.address1}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            PLACE ORDER
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
