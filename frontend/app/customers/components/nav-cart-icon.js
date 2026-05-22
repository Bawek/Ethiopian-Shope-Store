'use client'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useSelector } from 'react-redux'

const CartIcon = () => {
    // Get cart data from Redux store
    const { totalItems } = useSelector((state) => state.cart)
    console.log(totalItems, 'toal items of that')

    return (
        <Link
            href="/customers/cart"
            className="relative flex items-center text-sm no-underline text-black dark:text-white"
            aria-label="Shopping Cart"
        >
            <ShoppingCart className="h-8 w-8 mr-2" />
            {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-red-600 text-white text-xs font-bold rounded-full">
                    {totalItems > 9 ? '9+' : totalItems}
                </span>
            )}
        </Link>
    )
}

export default CartIcon