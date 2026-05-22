import React from "react";

const Backdrop = () => {
  return (
    <div
      style={{ opacity: 0.3 }}
      className="absolute z-10 bg-black bg-opacity-30 w-full h-full"
    />
  );
};

export default Backdrop;
