"use client";
import React, { useState } from "react";

const MerchantForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    bankAccountNumber: "",
    hasPhysicalStore: false,
    physicalShopName: "",
    physicalShopAddress: "",
    physicalShopCity: "",
    physicalShopPhoneNumber: "",
    onlineShopType: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          htmlFor="bankAccountNumber"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Bank Account Number
        </label>
        <input
          type="text"
          name="bankAccountNumber"
          id="bankAccountNumber"
          value={formData.bankAccountNumber}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter bank account number"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          <input
            type="checkbox"
            name="hasPhysicalStore"
            checked={formData.hasPhysicalStore}
            onChange={handleChange}
            className="mr-2 leading-tight"
          />
          <span className="text-sm">Has Physical Store</span>
        </label>
      </div>
      {formData.hasPhysicalStore && (
        <>
          <div className="mb-4">
            <label
              htmlFor="physicalShopName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Physical Shop Name
            </label>
            <input
              type="text"
              name="physicalShopName"
              id="physicalShopName"
              value={formData.physicalShopName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter physical shop name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="physicalShopAddress"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Physical Shop Address
            </label>
            <textarea
              name="physicalShopAddress"
              id="physicalShopAddress"
              value={formData.physicalShopAddress}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter physical shop address"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="physicalShopCity"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Physical Shop City
            </label>
            <input
              type="text"
              name="physicalShopCity"
              id="physicalShopCity"
              value={formData.physicalShopCity}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter physical shop city"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="physicalShopPhoneNumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Physical Shop Phone Number
            </label>
            <input
              type="text"
              name="physicalShopPhoneNumber"
              id="physicalShopPhoneNumber"
              value={formData.physicalShopPhoneNumber}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter physical shop phone number"
            />
          </div>
        </>
      )}
      <div className="mb-4">
        <label
          htmlFor="onlineShopType"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Online Shop Type
        </label>
        <select
          name="onlineShopType"
          id="onlineShopType"
          value={formData.onlineShopType}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a type</option>
          <option value="electronics">Electronics Shop</option>
          <option value="household">Household Shop</option>
          <option value="clothing">Clothing Shop</option>
          {/* Add other options as needed */}
        </select>
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default MerchantForm;
