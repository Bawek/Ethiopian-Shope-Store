'use client'
import React, { useState } from "react";
import Link from "next/link";
const MenuBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="rounded-full">
      <div
        onClick={toggleMenu}
        className="border-none menu-button font-semibold p-3 animate-heartbeat text-3xl  text-white"
      >
        MENU
      </div>
      {isMenuOpen && (
        <div className="menu-links">
          <Link
            className="p-2.5 no-underline text-white text-xl border-t border-gray-300 text-center hover:bg-gray-300 hover:text-blueGray-800 hover:rounded-lg"
            href="/"
            passHref
          >
            Home
          </Link>
          <Link
            className="p-2.5 no-underline text-white text-xl border-t border-gray-300 text-center hover:bg-gray-300 hover:text-blueGray-800 hover:rounded-lg"
            href="/shop-list"
            passHref
          >
            Shops
          </Link>
          <Link
            className="p-2.5 no-underline text-white text-xl border-t border-gray-300 text-center hover:bg-gray-300 hover:text-blueGray-800 hover:rounded-lg"
            href="/auth/customer-login"
            passHref
          >
            Login
          </Link>
          <Link
            className="p-2.5 no-underline text-white text-xl border-t border-gray-300 text-center hover:bg-gray-300 hover:text-blueGray-800 hover:rounded-lg"
            href="/auth/customer-register"
            passHref
          >
            Register
          </Link>
        </div>
      )}
      <style jsx>{`
        .menu-button {
          display: block;
          color: white;
          padding: 10px;
          border: none;
          cursor: pointer;
          font-size: 16px;
          text-align: center;
          width: 100%;
        }
        .menu-links {
          display: flex;
          flex-direction: column;
          background-color: #508c9b;
          border-bottom-left-radius: 1rem;
          border-bottom-right-radius: 1rem;
        }

        .menu-links a:hover {
          background-color: #ddd;
          color: #134b70;
          border-radius: 15px;
        }
      `}</style>
    </div>
  );
};

export default MenuBar;
