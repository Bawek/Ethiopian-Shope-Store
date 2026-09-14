import { NextResponse } from "next/server";

export default function middleware(req) {
  const url = req.nextUrl;

  // Redirect root path "/" to "/customers"
  if (url.pathname === "/") {
    return NextResponse.redirect(new URL("/customers", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
