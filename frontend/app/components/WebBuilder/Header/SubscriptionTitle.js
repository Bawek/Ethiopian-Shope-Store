import React from "react";
import {AiOutlineFontColors, AiOutlineItalic} from "react-icons/ai";

function SubscriptionTitle() {
	return (
		<div className=" px-3">
			<div className=" w-full  mb-3 rounded-md border ">
				<select
					name="style"
					id="style"
					className=" text-black w-full  focus:border-0 border-2  rounded-md "
				>
					<option value="title 1">Title 1</option>
					<option value="title 2">Title 2</option>
					<option value="title 3">Title 3</option>
					<option value="title 4">Title 4</option>
					<option value="paragraph 1">paragraph 1</option>
					<option value="paragraph 2">paragraph 2</option>
					<option value="paragraph 3">paragraph 3</option>
					<option value="paragraph 4">paragraph 4</option>
				</select>
			</div>
			<div>
				<button className=" bg-gray-300 rounded-md px-3 py-2 mr-2">
					<AiOutlineItalic size={24} />
				</button>
				<button className=" bg-gray-300 rounded-md px-3 py-2 mr-2">
					<AiOutlineItalic size={24} />
				</button>
				<button className=" bg-gray-300 rounded-md px-3 py-2 mr-2">
					<AiOutlineFontColors size={24} />
				</button>
			</div>
			<div className=" flex mt-3 justify-between">
				<p>All Caps</p>
				<input
					type="checkbox"
					className="toggle  mr-2 bg-blue-500 hover:bg-blue-700 border-blue-500"
					checked
				/>
			</div>
		</div>
	);
}

export default SubscriptionTitle;
