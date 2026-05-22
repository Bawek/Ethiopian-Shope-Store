import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { AddItemForm } from "../WebBuilder/AddPage/AddItemForm";

export function AddProduct() {
	return (
		<Dialog className="overflow-y-auto">
			<DialogTrigger asChild>
				<Button variant="outline" className="flex gap-10">
					{" "}
					Add Item
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[900px] h-screen  overflow-y-auto overflow-x-auto">
				<DialogHeader>
					<DialogTitle>Add Item</DialogTitle>
					{/* <DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription> */}
				</DialogHeader>
				<AddItemForm />
				<DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
