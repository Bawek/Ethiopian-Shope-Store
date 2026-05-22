"use client";

import * as React from "react";

import {Button} from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogDemo } from "./AddItem";
import { CategoryDialog } from "./AddCategory";

export function DropdownMenuRadioGroupDemo() {
	const [position, setPosition] = React.useState("bottom");
	// <RxSection size={24} /> Section
{/* <RiPagesLine size={24} /> Page */}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					{" "}
					<i className="fas fa-plus-circle fa-lg"></i>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 font-extrabold text-xl gap-2 flex flex-col">
				<DialogDemo />
				<CategoryDialog />
				<DialogDemo />
				<CategoryDialog />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
