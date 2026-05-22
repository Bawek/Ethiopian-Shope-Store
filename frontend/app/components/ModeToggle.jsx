"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
    const { setTheme, theme } = useTheme()
console.log(theme, 'theme')
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={`p-2 rounded-full relative hover:bg-opacity-20 hover:bg-gray-500`}
                >
                    {
                        theme === 'light' ?

                            <Sun className="h-6 w-6  scale-100 transition-all  dark:text-white" />
                            :
                            <Moon className="h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-white" />
                    }
                </button>

            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-400" onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-400" onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-400" onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
