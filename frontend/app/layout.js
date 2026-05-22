import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppProvider from "./AppProvider";
import { ThemeProvider } from "./components/ThemeProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-commerce platform",
  description: "ecommerce application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
          
              <div className="flex flex-col w-full min-h-screen">
                <div id="page-transition"></div>
                <Toaster />
                {children}
                <ToastContainer />
              </div>
           
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
