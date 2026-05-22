import React from "react";
import CustomerFooter from "./components/footer";
import  { CustomerNavigationMenu } from "./components/navBar";
// Metadata for SEO optimization and page title
export const metadata = {
    title: "Customer Page",
    description: "Customer page for managing customer-related actions and content."
};

// Main layout component for the customer page
export default function CustomerLayout({ children }) {
    return (
        <div className="min-h-screen min-w-full grid gap-6">
            {/* Header section */}
            <div className="sticky top-0 z-50">
                <CustomerNavigationMenu />
            </div>
            {/* Main content section */}
            <main className="w-full  ">
                {children}
            </main>
            {/* Footer section */}
            <CustomerFooter />
        </div>
    );
}
