'use client'
import React from 'react'
import ShopLayout from '../components/shopLayout'
import Products from '../components/products'

const MainMarketPage = ({ products }) => {
  return (
    <ShopLayout>
      <Products products={products} />
    </ShopLayout>
  )
}

export default MainMarketPage
