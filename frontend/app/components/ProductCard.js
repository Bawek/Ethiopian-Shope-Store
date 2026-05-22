"use client"

import React from "react"
import ProductItem from "../customers/components/product-items"

export default function ProductCard({ product, currency }) {
  // Simple wrapper around existing ProductItem component
  return <ProductItem product={product} />
}
