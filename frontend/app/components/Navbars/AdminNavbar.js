"use client";

import React from "react";
import NotificationPop from "../Prompt/Notification";
import UserDropdown from "@/app/[locale]/components/Dropdowns/UserDropdown.js";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectAll } from "@/lib/features/auth/accountSlice";

export default function Navbar({ notification, setNotification }) {
  const user = useSelector(selectAll)
  return (
    <>
      {/* Navbar */}
      <nav className="w-full hidden md:flex sticky top-0 z-10 bg-gray-800/90 backdrop-blur-2xl shadow-md p-2">
        <div className="w-full mx-auto flex items-center justify-between px-6">
          {/* Brand */}
          <Link
            className="text-white text-lg font-semibold tracking-wide"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </Link>
          {/* Search Form */}
          <form className="hidden md:flex items-center space-x-2">
            <div className="relative flex items-center">
              <i className="fas fa-search absolute left-3 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-3 py-2 text-gray-800 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
              />
            </div>
          </form>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="hidden md:block">
              <NotificationPop
                notification={notification}
                setNotification={setNotification}
              />
            </div>

            {/* User Dropdown */}
            <UserDropdown user={user} />
          </div>
        </div>
      </nav>
    </>
  );
}
