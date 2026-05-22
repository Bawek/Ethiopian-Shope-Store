import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {useState} from "react";

export function SwitchFooter() {
	const [isSwitchOn, setIsSwitchOn] = useState(false);
	return (
		<div
			onClick={(event) => {
				event.stopPropagation();
				setIsSwitchOn((pr) => !pr);
			}}
			className="flex items-center justify-between mr-2  text-black"
		>
			<Switch
				id="logo"
				checked={true}
				className={isSwitchOn ? "bg-blue-800" : "bg-black"}
			/>
		</div>
	);
}
