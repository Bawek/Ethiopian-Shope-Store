"use client";

import React, { useState } from "react";

import UserDropdown from "@/app/[locale]/components/Dropdowns/UserDropdown.js";
import styles from "./NavBar.module.css";
export default function TemplateNavbar() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <>
      {/* Navbar */}
      <nav
        className={`absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4 ${isHovered ? styles.hovered : ""
          }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Gebeya
          </a>
          <div>
            <i className="fas fa-search mr-3"></i>
            <i className="fas fa-shopping-cart"></i>
          </div>
        </div>
        {/* Header indicator box */}
        {isHovered && (
          <div className="absolute top-0 left-0 bg-white text-gray-800 text-sm py-1 px-2 rounded-tl-md rounded-br-md">
            Header
          </div>
        )}
      </nav>
      {/* End Navbar */}
    </>
  );
}
