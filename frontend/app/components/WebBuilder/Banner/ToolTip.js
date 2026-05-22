import React from "react";

const Tooltip = ({ children, text }) => {
  return (
    <div className="relative my-4">
      {children}
      <div className="absolute top-0 left-0 mt-2 p-2 bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
