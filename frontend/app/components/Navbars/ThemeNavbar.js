"use client";
import React from "react";
import UserDropdown from "@/app/[locale]/components/Dropdowns/UserDropdown.js";

export default function Navbar({ onSearch, onFilter }) {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    onFilter(name, checked);
  };

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          <a className="text-white text-sm uppercase hidden lg:inline-block font-semibold" href="#pablo" onClick={(e) => e.preventDefault()}>
            Theme
          </a>
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search Template here..."
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </form>
          <UserDropdown />
        </div>
      </nav>
      <nav className="w-full z-10 bg-gray-800 flex justify-center items-center py-2 mt-16">
        <ul className="flex space-x-6 text-white">
          {["Cloth", "Watch Shop", "Shoes", "Electronics", "Other"].map((category) => (
            <li key={category} className="hover:text-yellow-500 cursor-pointer">
              {category} Template
            </li>
          ))}
        </ul>
      </nav>
      <div className="w-full bg-white flex justify-center items-center py-4 shadow-md mt-2">
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 text-black">
            <input
              type="checkbox"
              name="free"
              className="form-checkbox rounded-full h-4 w-4 text-yellow-500"
              onChange={handleCheckboxChange}
            />
            <span>Free Templates</span>
          </label>
          <label className="flex items-center space-x-2 text-black">
            <input
              type="checkbox"
              name="premium"
              className="form-checkbox rounded-full h-4 w-4 text-yellow-500"
              onChange={handleCheckboxChange}
            />
            <i className="fas fa-star text-yellow-500"></i>
            <span>Premium Templates</span>
          </label>
          <div className="flex items-center space-x-2">
            <label htmlFor="sort" className="font-semibold">
              Sort by:
            </label>
            <select id="sort" className="border px-2 py-1 w-40 rounded focus:outline-none focus:ring text-black font-semibold">
              <option value="popularity">Popularity</option>
              <option value="rating">Rating</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
