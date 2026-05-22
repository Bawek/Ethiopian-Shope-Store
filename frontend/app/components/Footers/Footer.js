import { Facebook, Telegram, YouTube } from "@mui/icons-material";
import { Twitter } from "lucide-react";
import { motion } from "framer-motion";

import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="relative bg-blueGray-200 pt-8 pb-6">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-center lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <h4 className="text-3xl font-semibold">Let's keep in touch!</h4>
              <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
              </h5>
              <div className="mt-6 lg:mb-0 mb-6 flex items-center space-x-3">
                {/* Twitter Button */}
                <motion.button
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:hover:shadow-gray-700/50 h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300"
                  type="button"
                  aria-label="Twitter"
                >
                  <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <Twitter className="text-blue-400 dark:text-blue-300 h-5 w-5 group-hover:h-6 group-hover:w-6 transition-all" />
                </motion.button>

                {/* Facebook Button */}
                <motion.button
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:hover:shadow-gray-700/50 h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300"
                  type="button"
                  aria-label="Facebook"
                >
                  <div className="absolute inset-0 rounded-full bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <Facebook className="text-blue-600 dark:text-blue-400 h-5 w-5 group-hover:h-6 group-hover:w-6 transition-all" />
                </motion.button>

                {/* Telegram Button */}
                <motion.button
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:hover:shadow-gray-700/50 h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300"
                  type="button"
                  aria-label="Telegram"
                >
                  <div className="absolute inset-0 rounded-full bg-pink-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <Telegram className="text-pink-400 dark:text-pink-300 h-5 w-5 group-hover:h-6 group-hover:w-6 transition-all" />
                </motion.button>

                {/* YouTube Button */}
                <motion.button
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:hover:shadow-gray-700/50 h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300"
                  type="button"
                  aria-label="YouTube"
                >
                  <div className="absolute inset-0 rounded-full bg-red-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <YouTube className="text-red-600 dark:text-red-400 h-5 w-5 group-hover:h-6 group-hover:w-6 transition-all" />
                </motion.button>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Useful Links
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="/customers/company/about"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="/customers/company/contact"
                      >
                        Contact us
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="/customers/company/contact"
                      >
                        support
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-blueGray-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © {new Date().getFullYear()} Ecommerce platform by{" "}
                <a
                  href=""
                  className="text-blueGray-500 hover:text-blueGray-800"
                >
                  Scalable E-Commerece Platform
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
