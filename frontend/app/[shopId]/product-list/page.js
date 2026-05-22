// pages/products/index.js
"use client";
import React, { useContext } from "react";
import { ShopContext } from "../../contexts/ShopContext";
import ProductCard from "../../components/ProductCard";

const ProductsPage = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} currency={currency} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;