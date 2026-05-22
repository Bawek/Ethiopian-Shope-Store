"use client";

import { useState } from "react";
import Image from "next/image";
import stripeLogo from "@/public/stripe.png";      // Upload logos to /public
import razorpayLogo from "@/public/razorpay.png";  // Upload logos to /public

export default function CheckoutPage() {
  // const amount=useSelector(state=>state.cart.totalAmount)
  // const quantity=useSelector(state=>state.cart.totalQuantity)
  // const quantity=useSelector(state=>state.cart.totalQuantity)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", form, paymentMethod);
    // send to backend here
  };

  return (
    <div className="min-h-screen px-4 py-8 md:px-20 bg-white dark:bg-zinc-900 text-black dark:text-white">
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-10">
        {/* Delivery Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
            DELIVERY <span className="font-bold text-black dark:text-white">INFORMATION</span>
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <input name="firstName" placeholder="First name" onChange={handleChange} className="input" />
            <input name="lastName" placeholder="Last name" onChange={handleChange} className="input" />
            <input name="email" placeholder="Email address" onChange={handleChange} className="input col-span-2" />
            <input name="street" placeholder="Street" onChange={handleChange} className="input col-span-2" />
            <input name="city" placeholder="City" onChange={handleChange} className="input" />
            <input name="state" placeholder="State" onChange={handleChange} className="input" />
            <input name="zipcode" placeholder="Zipcode" onChange={handleChange} className="input" />
            <input name="country" placeholder="Country" onChange={handleChange} className="input" />
            <input name="phone" placeholder="Phone" onChange={handleChange} className="input col-span-2" />
          </div>
        </div>

        {/* Cart & Payment */}
        <div>
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
            CART <span className="font-bold">TOTALS</span>
          </h2>
          <div className="text-sm border border-gray-200 dark:border-zinc-700 rounded-md overflow-hidden">
            <div className="flex justify-between p-3 border-b border-gray-200 dark:border-zinc-700">
              <span>Subtotal</span>
              <span>$114.00</span>
            </div>
            <div className="flex justify-between p-3 border-b border-gray-200 dark:border-zinc-700">
              <span>Shipping Fee</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between p-3 font-semibold">
              <span>Total</span>
              <span>$124.00</span>
            </div>
          </div>

          {/* Payment Method */}
          <h3 className="mt-6 mb-2 font-semibold border-b border-gray-300 pb-1">PAYMENT METHOD</h3>
          <div className="flex flex-wrap gap-3">
            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="stripe"
                checked={paymentMethod === "stripe"}
                onChange={() => setPaymentMethod("stripe")}
              />
              <Image src={stripeLogo} alt="Stripe" width={80} />
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="razorpay"
                checked={paymentMethod === "razorpay"}
                onChange={() => setPaymentMethod("razorpay")}
              />
              <Image src={razorpayLogo} alt="Razorpay" width={80} />
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              <span className="text-green-600 font-semibold">CASH ON DELIVERY</span>
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-black text-white py-2 text-sm font-semibold hover:bg-gray-800 transition"
          >
            PLACE ORDER
          </button>
        </div>
      </form>
    </div>
  );
}
