import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./components/app-sidebar";
import AdminNotificationProvider from "./AdminNotificationProvider";
import AdminTopNav from "./components/adminTopNav";
export const metadata = {
    title: "System Admin",
    description: "ecommerce application",
};
export default function RootLayout({ children }) {
    return (
        <AdminNotificationProvider>
            <div className="flex min-h-screen">
                {/* This will be rendered by the client component wrapper */}
                <AdminLayoutClient>{children}</AdminLayoutClient>
            </div>
        </AdminNotificationProvider>
    );
}


function AdminLayoutClient({ children }) {
    return (
        <SidebarProvider className='overflow-x-hidden'>
            {/* Sidebar on the left */}
            <AppSidebar />

            {/* Main Content */}
            <SidebarInset className="flex-1 flex flex-col">
                <AdminTopNav />

                {/* Main Content */}
                <main className="flex-1 px-4 overflow-y-auto overflow-x-hidden">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}