import { NextResponse } from "next/server";

export default function middleware(req) {
  const url = req.nextUrl;

  // Redirect root path "/" to "/customers"
  if (url.pathname === "/") {
    url.pathname = "/customers";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/(api|trpc)(.*)",
  ],
};
