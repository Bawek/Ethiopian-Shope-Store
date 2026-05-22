"use client"

import * as React from "react"
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  FolderIcon,
  LayoutDashboardIcon,
  ListIcon,
  ListOrderedIcon,
  Settings,
  UsersIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { MerchantSideNav } from "@/app/merchant/components/sidebar-nav";
import Link from "next/link"
import { useSidebar } from "@/components/ui/sidebar";


// Sample data
const data = {

  navMain: [
    {
      title: "Dashboard",
      url: "/merchant",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Analytics",
      url: "/merchant/analytics",
      icon: BarChartIcon,
    },
    {
      title: "Manage Products",
      url: "/merchant/product",
      icon: ListIcon,
    },
    {
      title: "Buyed Templates",
      url: "/merchant/manage-your-templates",
      icon: FolderIcon,
    },
    // {
    //   title: "Users",
    //   url: "/merchant/manage-users",
    //   icon: UsersIcon,
    // },
    {
      title: "Manage Orders",
      url: "/merchant/order",
      icon: ListOrderedIcon,
    },
    {
      title: "Settings",
      url: "/merchant/business-setting",
      icon: Settings,
    },
  ],
}

export function AppSidebar(props) {
  const { open, toggleSidebar } = useSidebar();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/merchant">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">EE-platform</span>
              </Link>

            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <MerchantSideNav items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-amber-100 text-xs px-4 py-3 border-t border-gray-300">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <span>Role:</span>
            <span className="font-semibold">Merchant</span>
          </div>
          <div className="text-center text-gray-500">
            © 2025 EE-platform Inc.
          </div>
          <div className="text-center text-gray-500">
            v1.0.0 | Powered by Mebrat
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
