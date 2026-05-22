'use client'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
const CustomSelect = ({ data, onChange, value, title, width }) => {
    return (
        <Select className="m-0 p-0" onValueChange={onChange} value={value || ""}>
            <SelectTrigger className={`w-[${width}]`}>
                <SelectValue placeholder="select status" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {data.map((d, index) => (
                        <SelectItem key={index} value={d.toLowerCase().replace(/ & /g, "-")}>{d}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default CustomSelect
