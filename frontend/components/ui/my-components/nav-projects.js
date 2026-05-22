"use client"


import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,

} from "@/components/ui/sidebar"
import Link from "next/link"

export function NavProjects({
    projects,
}) {
    const { isMobile } = useSidebar()

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Templates</SidebarGroupLabel>
            <SidebarMenu className="m-0 p-0">
                {projects.map((item) => (
                    <SidebarMenuItem className="dark:text-white" key={item.name}>
                        <SidebarMenuButton asChild>
                            <Link className="no-underline text-black dark:text-white" href={'/merchant/manage-your-templates'}>
                                <item.logo />
                                <span>{item.name}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
