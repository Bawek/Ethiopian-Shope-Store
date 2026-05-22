import {AiOutlineUpload} from "react-icons/ai";
function EditImage() {
	return (
		<div className="w-full ">
			<div className="flex flex-col gap-2  w-full">
				<h2 className=" text-center font-bold">Image</h2>
				<label
					htmlFor="file"
					className="border w-full flex flex-col items-center justify-center my-2 rounded-md h-24 "
				>
					{" "}
					<p>Upload image</p>
					<p>
						<AiOutlineUpload size={25} />
					</p>
				</label>
				<input type="file" id="file" className=" w-0 h-0" />
				<div className=" flex mt-1 justify-between items-center">
					<label htmlFor="url" className=" mr-2">
						Image Url
					</label>
					<input type="text" className=" rounded-md text-black ml-3 w-24" />
				</div>
				<div className=" flex mt-1 justify-between items-center">
					<label htmlFor="url" className=" mr-2">
						Height
					</label>
					<input type="number" className=" rounded-md text-black ml-3 w-24" />
				</div>
				<div className=" flex mt-1 justify-between items-center">
					<label htmlFor="url" className=" mr-2 ">
						Width
					</label>
					<input type="number" className=" rounded-md text-black ml-3 w-24" />
				</div>
			</div>
		</div>
	);
}

export default EditImage;