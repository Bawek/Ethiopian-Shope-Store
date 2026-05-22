'use client';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { useProcessPayment } from "@/service/payment.service";
import axios from "axios";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/util/currency";
import { baseUrl } from "@/lib/features/cart/cartSlice";
import { useGetAccountAndLocationQuery } from "@/lib/features/auth/accountApi";
import { toast } from "react-toastify";

// Validation utility functions
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^\+[0-9]{7,15}$/.test(phone);
const validateRequired = (value) => value.trim() !== "";
const shipping = 19;

export default function CheckoutPage() {
  const router = useRouter();
  const account = useSelector((state) => state.account)
  const { items, totalPrice: totalAmount, totalItems: totalQuantity } = useSelector((state) => state.cart);
  const { processPayment, isLoading: paymentLoading } = useProcessPayment();
  const { data: accountData } = useGetAccountAndLocationQuery(account.id)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    town: "",
    country: "",
    region: "",
    kebele: "",
    woreda: ""
  });
  // Populate form when accountData is available
  useEffect(() => {
    if (accountData?.account) {
      setForm((prev) => ({
        ...prev,
        firstName: accountData.account.firstName || "",
        lastName: accountData.account.lastName || "",
        email: accountData.account.email || "",
        phone: "",
        town: "",
        country: "",
        region: ""
      }));
    }
  }, [accountData]);

  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("chapa");

  // Validate form on mount and when cart changes
  useEffect(() => {
    if (items.length === 0) {
      toast.warn('Your cart is empty. Please add items before checkout.')
      router.push("/customers/cart");
    }
  }, [items, router, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    // Required fields validation
    const requiredFields = [
      "firstName", "lastName", "email", "phone",
      "town", "country", "region", "kebele", "woreda"
    ];

    requiredFields.forEach(field => {
      if (!validateRequired(form[field])) {
        newErrors[field] = "This field is required";
        isValid = false;
      }
    });
    // Specific validations
    if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!validatePhone(form.phone)) {
      newErrors.phone = "Phone must start with '+' followed by 7-15 digits";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
    try {
      // 1. First create the order
      const orderPayload = {
        ...form,
        accountId: account.id,
        shopId: localStorage.getItem('shopId'),
        items: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: totalAmount + shipping, // Include shipping
        paymentMethod
      };

      const orderResponse = await axios.post(
        `${baseUrl}/orders`,
        orderPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        }
      );
      // 2. Process payment if order creation succeeded
      const paymentData = {
        amount: totalAmount + shipping,
        email: form.email,
        first_name: form.firstName,
        last_name: form.lastName,
        phone_number: form.phone,
        town: form.town,
        country: form.country,
        region: form.region,
        kebele: form.kebele,
        woreda: form.woreda,
        accountId: account.id,
        orderId: orderResponse?.data?.order?.id,
        FRONTEND_BASE_URL: `${window.location.origin}/customers/order-confirmation`,
        callback_url: "http://localhost:8000/api/orders/payment/callback",
      };

      const paymentResponse = await processPayment(paymentData);
      if (paymentResponse?.data?.success) {
        // Redirect user to Chapa's payment page
        window.location.href = paymentResponse.checkout_url;
      }
    } catch (error) {
      console.error("Checkout Error:", error);

      let errorMessage = "An error occurred during checkout";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      toast.error(errorMessage || 'Sorry something went wrong try agian')
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Redirecting to cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-4 py-10 md:px-20">
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-10">
        {/* Delivery Info */}
        <div>
          <h2 className="text-2xl font-bold mb-6 border-b border-orange-600 pb-2">
            DELIVERY <span className="text-orange-600">INFORMATION</span>
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "firstName", placeholder: "First name", type: "text" },
              { name: "lastName", placeholder: "Last name", type: "text" },
              { name: "email", placeholder: "Email", type: "email", colSpan: true },
              { name: "phone", placeholder: "Phone number (+251...)", type: "tel", colSpan: true },
              { name: "town", placeholder: "Town/City", type: "text" },
              { name: "country", placeholder: "Country", type: "text" },
              { name: "region", placeholder: "Region", type: "text" },
              { name: "kebele", placeholder: "Kebele", type: "text" },
              { name: "woreda", placeholder: "Woreda", type: "text", colSpan: true },
            ].map(({ name, placeholder, type, colSpan }) => (
              <div key={name} className={colSpan ? "col-span-2" : ""}>
                <input
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  value={form[name]}
                  onChange={handleChange}
                  className={`w-full border ${errors[name] ? "border-red-500" : "border-black dark:border-white"
                    } bg-transparent rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-orange-600 transition-all duration-200`}
                />
                {errors[name] && (
                  <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary & Payment */}
        <div>
          <h2 className="text-2xl font-bold mb-6 border-b border-orange-600 pb-2">
            ORDER <span className="text-orange-600">SUMMARY</span>
          </h2>

          <div className="text-sm border border-black dark:border-white rounded-lg overflow-hidden mb-6">
            <div className="flex justify-between p-4 border-b border-black dark:border-white">
              <span>Subtotal ({totalQuantity} items)</span>
              <span>{formatCurrency(totalAmount)}</span>
            </div>
            <div className="flex justify-between p-4 border-b border-black dark:border-white">
              <span>Shipping</span>
              <span>{formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between p-4 font-bold text-lg">
              <span>Total</span>
              <span>{formatCurrency(totalAmount + shipping)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <h3 className="mb-3 font-semibold text-lg border-b border-orange-600 pb-1">
            PAYMENT METHOD
          </h3>
          <div className="flex flex-col gap-4 mb-6">
            <label className="flex items-center gap-4 border border-black dark:border-white rounded-md px-4 py-3 cursor-pointer transition-all hover:border-orange-600">
              <input
                type="radio"
                name="payment"
                value="chapa"
                checked={paymentMethod === "chapa"}
                onChange={() => setPaymentMethod("chapa")}
                className="accent-orange-600 w-5 h-5"
              />
              <FaMoneyCheckAlt className="text-orange-600 text-2xl" />
              <span className="text-black dark:text-white font-medium">
                Pay with Chapa
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-md font-bold transition disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={paymentLoading || isSubmitting || items.length === 0}
          >
            {paymentLoading || isSubmitting ? "Processing..." : "PLACE ORDER"}
          </button>
        </div>
      </form>
    </div>
  );
}