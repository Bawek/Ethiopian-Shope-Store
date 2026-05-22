'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import useCart from '@/hooks/use-cart';
import Loader from '@/app/components/Prompt/Loader';
import { imageViewer } from '@/app/system-admin/lib/imageViewer';
import { formatCurrency } from '@/util/currency';

const CartPage = () => {
  const router = useRouter();
  const {
    cart,
    totalItems,
    totalPrice,
    isLoading,
    error,
    loadCart,
    removeItemFromCart,
    updateItemQuantity } = useCart();

  const account = useSelector((state) => state.account);
  const [isProcessing, setIsProcessing] = useState(false);
  // Shipping cost (could be dynamic based on location)
  const shippingCost = 19.0;
  const estimatedTotal = totalPrice + shippingCost;
  // Fetch cart data on component mount
  useEffect(() => {
    loadCart();
  }, []);

  const handleIncreaseQuantity = async (itemId) => {

    setIsProcessing(true);
    try {
      const item = cart.find(item => item.id === itemId);
      if (!item) return;
      await updateItemQuantity(itemId, item.quantity + 1);
    } catch (err) {
      toast.error('Failed to update quantity');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecreaseQuantity = async (itemId) => {

    setIsProcessing(true);
    try {
      const item = cart.find(item => item.id === itemId);
      if (!item) return;

      if (item.quantity <= 1) {
        await removeItemFromCart(itemId);
      } else {
        await updateItemQuantity(itemId, item.quantity - 1);
      }
    } catch (err) {
      toast.error('Failed to update quantity');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveFromCart = async (itemId) => {

    setIsProcessing(true);
    try {
      await removeItemFromCart(itemId);
      toast.success('Item removed from cart');
    } catch (err) {
      toast.error('Failed to remove item');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCheckout = () => {
    if (!account?.id) {
      localStorage.setItem('linked', 'order')
      return router.push('/customers/auth/login?ic=order')
    }

    if (cart.length === 0) {
      toast.warning('Your cart is empty');
      return;
    }
    router.push('/customers/placeOrder');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold text-red-600">Error Loading Cart</h2>
        <p className="text-gray-600 mt-2">{error}</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 md:p-8 lg:p-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Details Section */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Your Shopping Cart</CardTitle>
              <CardDescription>
                {cart.length > 0 ? (
                  <span>Expected delivery within 3-5 business days</span>
                ) : (
                  <span>Your cart is currently empty</span>
                )}
              </CardDescription>

              {cart.length > 0 && (
                <div className="hidden md:flex justify-between p-4 border-b font-semibold text-gray-600">
                  <p className="w-2/5">Product</p>
                  <p className="w-1/5 text-center">Price</p>
                  <p className="w-1/5 text-center">Quantity</p>
                  <p className="w-1/5 text-center">Total</p>
                  <p className="w-1/5"></p>
                </div>
              )}
            </CardHeader>

            <CardContent className="space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-lg font-semibold text-gray-600 mb-4">
                    No items in your cart
                  </p>
                  <Link href={`/customers/explore-shops`}>
                    <Button>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row items-center gap-4 p-4 border-b"
                  >
                    {
                      item.image &&
                      <img
                        src={imageViewer(item?.image[0]) || '/placeholder-product.jpg'}
                        alt={item.name}
                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded"
                      />
                    }

                    <div className="flex-grow md:w-2/5">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      {item.brand && (
                        <p className="text-sm text-gray-500">Brand: {item.brand}</p>
                      )}
                    </div>

                    <div className="md:w-1/5 text-center">
                      <p className="font-bold">
                        {formatCurrency(
                          Math.round(item.discountPrice) > 0
                            ? item.price - (item.price * Math.round(item.discountPrice)) / 100
                            : item.price
                        )}
                      </p>
                    </div>

                    <div className="md:w-1/5 flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDecreaseQuantity(item.id)}
                        disabled={isProcessing || item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </Button>
                      <p className="text-center min-w-[2rem]">{item.quantity}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleIncreaseQuantity(item.id)}
                        disabled={isProcessing || item.quantity >= (item.stock || 99)}
                      >
                        <Plus size={16} />
                      </Button>
                    </div>

                    <div className="md:w-1/5 text-center font-bold">
                      {formatCurrency(
                        Math.round(item.discountPrice) > 0
                          ? item.price - ((item.price * Math.round(item.discountPrice)) / 100) * item.quantity
                          : item.price * item.quantity
                      )}
                    </div>

                    <div className="md:w-1/5 text-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveFromCart(item.id)}
                        disabled={isProcessing}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {cart.length > 0 && (
            <div className="mt-4">
              <Link href={`/customers/explore-shops`} className="flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Continue Shopping
              </Link>
            </div>
          )}
        </div>

        {/* Order Summary Section */}
        {cart.length > 0 && (
          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Items ({totalItems}):</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>

                  <div className="border-t pt-4 flex justify-between font-bold text-lg">
                    <span>Estimated Total:</span>
                    <span>${estimatedTotal.toFixed(2)}</span>
                  </div>

                  <Button
                    className="w-full mt-6 py-6 text-lg"
                    onClick={handleCheckout}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;