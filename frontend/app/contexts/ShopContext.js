"use client"

import React from "react"

// Minimal placeholder ShopContext to satisfy imports during build.
// Expand this provider if you need real runtime behavior.
export const ShopContext = React.createContext({
  products: [],
  productsData: [],
  cartItems: {},
  currency: "$",
  isLoading: false,
  isError: false,
  clearCart: () => {},
})

export default ShopContext
