import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../dropdown-menu'

const CustomDropDown = ({trigger,label,items:[]}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>profile</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>my profile</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Firest</DropdownMenuItem>
                <DropdownMenuItem>Firest</DropdownMenuItem>
                <DropdownMenuItem>Firest</DropdownMenuItem>
                <DropdownMenuItem>Firest</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CustomDropDown
