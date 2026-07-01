"use client"


import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavMain({ items }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link href={item.url}>
                <SidebarMenuButton
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors
                              ${pathname === item.url
                      ? 'border-l-4 border-amber-500 focus:border-none focus:outline-none bg-amber-100 dark:bg-gray-600 font-semibold'
                      : 'hover:bg-muted dark:hover:bg-gray-700'}
`}
                  tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

      </SidebarGroupContent>
    </SidebarGroup>
  )
}
