// app/merchant/layout.tsx
import { AppSidebar } from "@/components/ui/my-components/my-appsidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import React from "react"
import MerchantNavBar from "./components/nav"

export const metadata = {
  title: "Merchant page",
  description: "Ecommerce application",
}

export default function MerchantLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <MerchantLayoutClient>{children}</MerchantLayoutClient>
    </div>
  )
}

function MerchantLayoutClient({ children }) {
  return (
    <SidebarProvider className='overflow-x-hidden'>
      {/* Sidebar on the left */}
      <AppSidebar />

      {/* Main Content */}
      <SidebarInset className="flex-1 flex flex-col">
        <MerchantNavBar />

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}