import {Button} from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import Prompt2 from "./Prompt2";
import PromptCard from "./PromptCard";
import Link from "next/link";

export function Prompt() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					onClick={() => alert("Hello")}
					className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
				>
					Sign In
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[800px] h-[600px]">
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className=" flex justify-center items-start">
					<PromptCard />
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Link type="button" variant="secondary">
							skip
						</Link>
					</DialogClose>
					<Button>
						<Prompt2 />
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
