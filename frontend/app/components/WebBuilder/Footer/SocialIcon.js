import React from "react";

function SocialIcon() {
	return (
		<div className=" px-3 flex flex-col">
			<div className=" flex flex-col">
				<label htmlFor="social-color">Icon color</label>
				<select
					className=" rounded-lg h-16 mt-2 text-black w-40"
					name="social-color"
					id="social-color"
				>
					<option value="social-icon"> Social icon</option>
					<option value="main"> Main</option>
					<option value="light text"> light text</option>
					<option value="dark text"> dark text</option>
				</select>
			</div>
			<div className=" flex w-full justify-between items-center my-4 border px-4 py-3">
				<div className=" flex flex-col">
					<p>links to</p> <p className=" text-xs">icons not connected</p>
				</div>
				<button className=" bg-blue-200 px-3 py-2 rounded-md">connect</button>
			</div>
		</div>
	);
}

export default SocialIcon;
