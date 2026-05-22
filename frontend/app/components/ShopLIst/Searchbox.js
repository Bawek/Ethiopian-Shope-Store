import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";

const Searchbox = ({ shops, onSearch, onCategorySelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isFocused, setIsFocused] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category);
    setIsDropdownOpen(false);
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="relative flex items-center gap-3 w-full">
        {/* Category Dropdown */}
        <motion.div
          className="relative z-10"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center justify-between gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200
              ${isDropdownOpen
                ? "bg-amber-100 text-amber-900 border-amber-300"
                : "bg-amber-800 hover:bg-amber-700 text-white border-amber-900"
              } border-2 shadow-md min-w-[180px]`}
            aria-expanded={isDropdownOpen}
            aria-label="Category dropdown"
          >
            <span>{selectedCategory}</span>
            <motion.span
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ▼
            </motion.span>
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-20"
              >
                {["All Categories", ...new Set(shops?.map(shop => shop?.category))].map((category) => (
                  <div
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`px-4 py-2 cursor-pointer hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors ${selectedCategory === category
                      ? "bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200"
                      : "text-gray-800 dark:text-gray-200"
                      }`}
                  >
                    {category}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Search Input */}
        <motion.div
          className={`relative flex-1 flex items-center border-2 rounded-full shadow-md overflow-hidden ${isFocused
            ? "border-amber-500 dark:border-amber-600"
            : "border-gray-300 dark:border-gray-600"
            }`}
          whileHover={{ scale: 1.01 }}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search for your favorite store..."
            className="w-full pl-12 pr-10 py-3 bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 text-lg"
            aria-label="Search stores"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Clear search"
            >
              <FiX size={20} />
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Searchbox;