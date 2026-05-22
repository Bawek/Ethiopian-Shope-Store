'use client';
import { useState } from "react";
import { useEffect } from "react";
import ShopLayout from "../../components/shopLayout";
import Products from "../../components/products";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ShopLayout>
      {/* Product Grid */}
      <Products products={products} />
    </ShopLayout>
  );
};

export default ShopPage;
