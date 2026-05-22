'use client';
import React from 'react'
import ProductItem from "./product-items";

const Products = ({ products }) => {
    return (
        <div className="mx-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[700px] overflow-y-auto min-h-0">
            {products && products.length > 0 ? (
                products.map((product) => <ProductItem key={product.id} product={product} />)
            ) : (
                <div className="w-full flex justify-center mt-10">
                    <div className="text-orange-800 rounded-lg px-6 py-4 text-center w-full">
                        <h3 className="text-2xl font-semibold mb-1">Oops! No Products Found</h3>
                        <p className="text-sm text-orange-600">Please check back later or explore other categories.</p>
                    </div>
                </div>

            )}
        </div>
    )
}

export default Products
