'use client';
import Link from 'next/link';
import React, { useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/util/currency';
import { ShoppingCart, Eye, Minus, Plus, Loader2 } from 'lucide-react';
import { imageViewer } from '@/app/system-admin/lib/imageViewer';
import { toast } from 'react-toastify';
import useCart from '@/hooks/use-cart';
import Rating from './Rating';
import { Badge } from '@/components/ui/badge';
import { useSearchParams } from 'next/navigation';

const ProductItem = ({ product }) => {
    const {
        id,
        name,
        description,
        price,
        discountPrice,
        brand,
        images = [],
        quantity: stockQuantity
    } = product;
    const searchParams = useSearchParams();

    const shopId = useMemo(() => searchParams.get('id'), [searchParams]);
    const {
        cart,
        isLoading,
        addItemToCart,
        updateItemQuantity,
        removeItemFromCart,
        loadCart
    } = useCart();
    useEffect(() => {
        loadCart();
    }, []);

    // Find the cart item if it exists
    const cartItem = cart.find(item => item.productId === id);
    const currentQuantity = cartItem?.quantity || 0;
    const isInCart = currentQuantity > 0;

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        console.log(cart, 'this id')
        localStorage.setItem('shopId', shopId)
        if (stockQuantity <= 0) {
            toast.warning('This product is out of stock');
            return;
        }

        try {
            await addItemToCart({
                productId: id,
                name,
                price: discountPrice > 0 ? price - (price * Math.round(discountPrice)) / 100 : price,
                quantity: 1,
                discountPrice,
                image: images[0],
                stock: stockQuantity
            });
            console.log(cart, 'this id')

        } catch (error) {
            console.error('Add to cart failed:', error);
            toast.error(error.message || 'Could not add to cart.');
        }
    };

    const handleIncreaseQuantity = async () => {
        if (currentQuantity >= stockQuantity) {
            toast.warning(`Only ${stockQuantity} items available`);
            return;
        }

        try {
            await updateItemQuantity(cartItem?.id, currentQuantity + 1);
        } catch (error) {
            console.error('Failed to increase quantity:', error);
            toast.error('Failed to update quantity');
        }
    };

    const handleDecreaseQuantity = async (e) => {
        e.stopPropagation();
        console.log(id, 'id of the items')
        if (currentQuantity <= 1) {
            console.log('current id less', id)
            try {
                await removeItemFromCart(cartItem?.id);
            } catch (error) {
                console.error('Failed to remove item:', error);
                toast.error('Failed to remove item');
            }
            return;
        }

        try {
            await updateItemQuantity(cartItem?.id, currentQuantity - 1);
        } catch (error) {
            console.error('Failed to decrease quantity:', error);
            toast.error('Failed to update quantity');
        }
    };

    return (
        <div className="group relative transition-all duration-300 hover:shadow-xl rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-[420px] flex flex-col hover:border-primary/30 hover:scale-[1.02] overflow-hidden">
            {/* Product Image with Hover Effect */}
            <Link
                href={`/customers/products/detail/${id}`}
                className="flex-1 flex items-center justify-center relative overflow-hidden"
            >
                <div className="relative h-48 w-full overflow-hidden">
                    <img
                        src={imageViewer(images[0]) || '/placeholder-product.jpg'}
                        alt={name}
                        className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                    {Math.round(discountPrice) > 0 && (
                        <div className="absolute top-3 right-3 rotate-0 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg transform transition-all group-hover:-translate-y-1">
                            {Math.round(discountPrice)}% OFF
                        </div>
                    )}
                </div>
            </Link>

            {/* Product Info */}
            <div className="flex-1 flex flex-col px-4 pt-4 pb-2 gap-2">
                {/* Brand and Name */}
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                        {name}
                    </h3>
                    {brand && (
                        <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
                            {brand}
                        </span>
                    )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 min-h-[40px]">
                    {description}
                </p>
                {/* Price Section */}
                <div className="">
                    <div className="flex items-end justify-between gap-2">
                        <div className="flex flex-col">
                            <span className="text-xl font-extrabold text-gray-900 dark:text-white">
                                {formatCurrency(
                                    Math.round(discountPrice) > 0
                                        ? price - (price * Math.round(discountPrice)) / 100
                                        : price
                                )}
                            </span>
                            {Math.round(discountPrice) > 0 && (
                                <s className="text-sm text-gray-500 dark:text-gray-400">
                                    {formatCurrency(price)}
                                </s>
                            )}
                        </div>

                        {Math.round(discountPrice) > 0 ? (
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                                You save {formatCurrency((price * Math.round(discountPrice)) / 100)}
                            </span>
                        ) : (
                            <span className="text-xs text-gray-500">Standard price</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Add to Cart Section */}
            <div className="px-4 pb-4">
                {isInCart ? (
                    <div className="flex items-center justify-between gap-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
                        <button
                            onClick={handleDecreaseQuantity}
                            disabled={isLoading}
                            className="p-2 rounded-full bg-white dark:bg-gray-600 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors disabled:opacity-50"
                        >
                            <Minus className="h-4 w-4 text-orange-600" />
                        </button>
                        <p className="flex-1 text-center font-medium text-gray-900 dark:text-white">
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                            ) : (
                                `${currentQuantity} in cart`
                            )}
                        </p>
                        <button
                            onClick={handleIncreaseQuantity}
                            disabled={isLoading || currentQuantity >= stockQuantity}
                            className="p-2 rounded-full bg-white dark:bg-gray-600 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors disabled:opacity-50"
                        >
                            <Plus className="h-4 w-4 text-orange-600" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleAddToCart}
                        disabled={stockQuantity <= 0 || isLoading}
                        className={`w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${stockQuantity <= 0
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-md hover:shadow-lg'
                            }`}
                    >
                        <ShoppingCart className="w-5 h-5" />
                        {stockQuantity <= 0
                            ? 'Sold Out'
                            : isLoading
                                ? 'Adding...'
                                : 'Add to Cart'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductItem;