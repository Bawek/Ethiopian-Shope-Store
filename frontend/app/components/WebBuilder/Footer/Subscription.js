import React from "react";

function Subscription() {
	return (
		<div className=" px-3 flex flex-col">
			<div className=" flex flex-col mb-4">
				<label htmlFor="place-holder">Place Holder</label>
				<input
					type="email"
					id="place-holder"
					placeholder="Email"
					className=" rounded-lg mt-2 px-3 py-1 "
				/>
			</div>
			<div className=" flex flex-col mb-4">
				<label htmlFor="Label">Label</label>
				<input
					type="text"
					id="Label"
					placeholder="Sign Up"
					className=" rounded-lg mt-2 px-3 py-1 "
				/>
			</div>
			<p className=" font-bold mb-4">Button</p>
			<div className=" flex flex-col mb-4">
				<label htmlFor="Label">Style</label>
				<select
					name="style"
					id=""
					className=" rounded-lg mt-2 text-black px-3 py-1 "
				>
					<option value="filled" selected>
						Filled
					</option>
					<option value="Outline">Outline</option>
				</select>
			</div>
			<div className=" flex flex-col mb-4">
				<label htmlFor="color">Color</label>
				<input
					type="color"
					id="color"
					className=" w-16 h-10 rounded-lg mt-2 bg-black  "
				/>
            </div>
            <div className=" flex flex-col mb-4">
				<label htmlFor="Form-Name">Form Name</label>
				<input
					type="text"
					id="Form-Name"
					placeholder="Subscription"
					className=" rounded-lg mt-2 px-3 py-1 "
				/>
			</div>
            <div className=" flex flex-col mb-4">
				<label htmlFor="Form-Name">Confirmation Message</label>
				<textarea rows={4}
					type="text"
					id="Form-Name"
					placeholder="Subscription"
					className=" rounded-lg mt-2 px-3 py-1 "
				>Thank you for your Subscription</textarea>
			</div>
		</div>
	);
}

export default Subscription;
