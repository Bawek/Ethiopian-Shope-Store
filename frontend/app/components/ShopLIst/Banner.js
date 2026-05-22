import React from "react";

const Banner = () => {
  return (
    <div
      className="relative w-full h-[300px] min-h-[200px]  max-h-[400px] flex items-center justify-center text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `
          linear-gradient(0deg, 
            rgba(124, 90, 7, 0.59) 19%, 
            rgba(26, 27, 20, 0.56) 52%
          ),
          url(https://images.unsplash.com/photo-1484807352052-23338990c6c6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)
        `,
      }}
    >
      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white drop-shadow-lg">
            SHOP HUB
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
            List of shops at your{" "}
            <span className="font-normal text-gray-900 dark:text-gray-100 bg-white/70 dark:bg-gray-800/70 px-2 rounded-lg">
              finger tips
            </span>
          </h2>
        </div>
      </div>

      {/* Bottom SVG Wave */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-16 overflow-hidden pointer-events-none">
        <svg
          className="absolute bottom-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
        >
          <polygon
            className="fill-current text-white dark:text-gray-900"
            points="2560 0 2560 100 0 100"
          />
        </svg>
      </div>
    </div>
  );
};

export default Banner;