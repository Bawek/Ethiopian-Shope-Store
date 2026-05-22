"use client";
import React, { useState, useEffect } from "react";
import ShopItem from "./Shopitem";
import Searchbox from "./Searchbox";
import Banner from "./Banner";
import Footer from "../Footers/Footer";
import { useGetAllShopsQuery, useGetShopQuery } from "@/lib/features/shop/shop";

const ShopList = () => {
  const { data, error, isLoading } = useGetAllShopsQuery();
  const [filteredShops, setFilteredShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  useEffect(() => {
    if (data?.shops) {
      setFilteredShops(data.shops.map(shop => ({
        ...shop,
        category: shop?.category
      })));
    }
  }, [data]);
  useEffect(() => {
    if (!data?.shops) return;

    let results = data.shops;

    // Apply category filter
    if (selectedCategory !== "All Categories") {
      results = results.filter(shop =>
        shop?.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(shop =>
        shop.name?.toLowerCase().includes(term) ||
        shop.description?.toLowerCase().includes(term) ||
        shop?.category?.toLowerCase().includes(term) ||
        shop.merchant?.ownerName?.toLowerCase().includes(term)
      );
    }

    setFilteredShops(results);
  }, [data, searchTerm, selectedCategory]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen flex flex-col m-0 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex-grow">
        <Banner />

        {/* Search Section */}
        <div className="max-w-[90vw] mx-auto">
          <div className="w-full">
            <Searchbox
              shops={data?.shops}
              onSearch={handleSearch}
              onCategorySelect={handleCategorySelect}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="group flex md:text-2xl items-center justify-center text-gray-800 dark:text-gray-200 sm:text-xl font-normal">
          <span className="w-[30%] border-gray-300 dark:border-gray-600 border-t-[1px]">
            <hr className="border-none" />
          </span>
          <span className="w-[30%] border-gray-300 dark:border-gray-600 border-t-[1px]">
            <hr className="border-none" />
          </span>
        </div>

        {/* Main Shops Section */}
        <div className="max-w-[90vw] mx-auto my-14">
          {/* Section Title with result count */}
          <div className="flex items-center justify-center my-10">
            <span className="w-[30%] border-gray-300 dark:border-gray-600 border-t-[1px]">
              <hr className="border-none" />
            </span>
            <span className="border border-gray-300 dark:border-gray-600 py-2 px-6 rounded-full text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 shadow-sm dark:shadow-md dark:shadow-gray-800/50">
              {selectedCategory} ({filteredShops.length} shops)
            </span>
            <span className="w-[30%] border-gray-300 dark:border-gray-600 border-t-[1px]">
              <hr />
            </span>
          </div>

          {/* Shops Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-500 dark:text-red-400">
              Error loading shops. Please try again later.
            </div>
          ) : filteredShops.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
                No shops found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                {searchTerm
                  ? `No results for "${searchTerm}" in ${selectedCategory}`
                  : `No shops available in ${selectedCategory}`}
              </p>
            </div>
          ) : (
            <div className="w-full flex justify-center flex-1 flex-wrap gap-2">
              {filteredShops.map((shop) => (
                <ShopItem
                  key={shop.id}
                  shop={shop}
                  fullWidth={false}
                  className="hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default ShopList;