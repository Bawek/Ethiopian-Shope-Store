"use client"

import { MailIcon, PlusCircleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSelector } from "react-redux"
import { DashboardCustomizeTwoTone } from "@mui/icons-material"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function MerchantSideNav({ items }) {
    const account = useSelector((state) => state.account)
    const pathname = usePathname();
    console.log(pathname)
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center gap-2">
                        <SidebarMenuButton
                            tooltip="Merchant Dashbaord"
                            className="min-w-8 bg-orange-600 text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
                        >
                            <DashboardCustomizeTwoTone />
                            <span> {account?.firestName} Dashboard</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
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
