'use client'

import Link from "next/link";

export default function FooterSmall(props) {
  // Handle sticky footer on scroll
  return (
    <footer
      className={
        (props.absolute
          ? "absolute w-full bottom-0"
          : "fixed bottom-0 left-0 w-full z-50") + " pb-6"
      }
    >
      <hr className="min-w-full w-full mb-6 border-b-1 border-blueGray-600" />
      <div
        className={`container mx-auto px-4  ? 'fixed bottom-0 left-0 z-50' : 'absolute w-full bg-blueGray-800'}`}
      >
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4">
            <div className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
              Copyright © {new Date().getFullYear()}{" "}
              <Link
                href="https://www.creative-tim.com?ref=nnjs-footer-small"
                className="no-underline text-slate-600 hover:text-blueGray-300 text-sm font-semibold py-1"
              >
                Creative Tim
              </Link>
            </div>
          </div>
          <div className="w-full md:w-8/12 px-4">
            <ul className="flex flex-wrap list-none md:justify-end justify-center">
              <li>
                <Link
                  href="https://www.creative-tim.com?ref=nnjs-footer-small"
                  className=" no-underline text-slate-600 hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                >
                  Creative Tim
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.creative-tim.com/presentation?ref=nnjs-footer-small"
                  className="no-underline text-slate-600 hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="http://blog.creative-tim.com?ref=nnjs-footer-small"
                  className="no-underline text-slate-600  hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/creativetimofficial/notus-nextjs/blob/main/LICENSE.md?ref=nnjs-footer-small"
                  className=" no-underline text-slate-600 hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                >
                  MIT License
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
