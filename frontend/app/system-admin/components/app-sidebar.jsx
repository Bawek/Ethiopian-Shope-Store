
"use client"

import * as React from "react"
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  FolderIcon,
  LayoutDashboardIcon,
  LogsIcon,
  Settings,
  User,
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
import Link from "next/link"
import { useSidebar } from "@/components/ui/sidebar";
import { ShoppingBag } from "@mui/icons-material";
import { NavMain } from "./nav-main";
// nav data
const data = {
  navMain: [
    {
      title: "Dashboard", url: "/system-admin", icon: LayoutDashboardIcon
    },
    { title: "Manage Shops", url: "/system-admin/manage-shops", icon: ShoppingBag },
    {
      title: "Manage Templates", url: "/system-admin/manage-template", icon: FolderIcon,
    },
    { title: "Manage Merchants", url: "/system-admin/manage-merchants", icon: User },
    { title: "Analytics & Reports", url: "/system-admin/analytics", icon: BarChartIcon, },
    { title: "System Settings", url: "/system-admin/setting", icon: Settings },
    { title: "Compliance & Logs", url: "/system-admin/logs", icon: LogsIcon },
  ],
};

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
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-amber-100 text-xs px-4 py-3 border-t border-gray-300">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <span>Role:</span>
            <span className="font-semibold">System Admin</span>
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


// "use client"

// import * as React from "react"
// import {
//   Collapsible,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible"
// import {
//   Settings,
// } from "lucide-react"
// // import SidebarSearch from '@/components/nav-main'
// // import { NavMain } from "@/components/nav-main"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarHeader,
//   SidebarRail,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenu,
//   SidebarGroup} from "@/components/ui/sidebar"
// import { NavMain } from "./nav-main"
// import Logo from "@/components/ui/my-components/logo"
// const data = {
//   navMain: [
//     {
//       title: "Administration",
//       url: "#",
//       icon: Settings,
//       isActive: true,
//       items: [
//         { title: "Dashboard", url: "/system-admin" },
//         { title: "Manage Shops", url: "/system-admin/manage-shops" }, // For approval/suspension (BR-04, UC-11)
//         { title: "Manage Templates", url: "/system-admin/manage-template" }, // UC-10
//         { title: "Manage Merchants", url: "/system-admin/manage-merchants" }, // Merchants & customers (Actors section)
//         // { title: "Manage Orders", url: "/admin/manage-orders" }, // UC-05
//         // { title: "Product Categories", url: "/admin/manage-categories" }, // Implicit from product management scope
//         { title: "Analytics & Reports", url: "/system-admin" }, // Functional req: Sales/visitor stats
//         { title: "System Settings", url: "/system-admin" }, // Payment config, platform rules (Business Rules)
//         { title: "Compliance & Logs", url: "/system-admin" }, // Legal feasibility (BR-01, BR-04)
//       ],
//     },
//   ],
// };
// export function AppSidebar({
//   ...props
// }) {
//   return (
//     (<Sidebar collapsible="icon" {...props}>
//       <SidebarHeader>
//         {/* header */}
//         <SidebarGroup>
//           <SidebarMenu className="m-0 p-0">
//             <Collapsible
//               asChild
//               className="group/collapsible">
//               <SidebarMenuItem>
//                 <CollapsibleTrigger asChild>
//                   <SidebarMenuButton className="-ml-6 p-0" tooltip={'Go home page'}>
//                     <Logo />
//                     <span> Admin Dashboard</span>
//                   </SidebarMenuButton>
//                 </CollapsibleTrigger>
//               </SidebarMenuItem>
//             </Collapsible>
//           </SidebarMenu>
//         </SidebarGroup>
//       </SidebarHeader>
//       <SidebarContent>
//         <NavMain items={data.navMain} />
//       </SidebarContent>
//       <SidebarRail />
//     </Sidebar>)
//   );
// }
