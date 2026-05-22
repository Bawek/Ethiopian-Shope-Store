// pages/404.js

import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-gray-500 mt-4">The page you are looking for does not exist.</p>
      <Link href="/">
        <a className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Go to Home
        </a>
      </Link>
    </div>
  );
};

export default NotFound;
