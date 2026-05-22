import Image from "next/image";
function SelectedTheme() {
	return (
		<div className="flex flex-col items-center  ">
			<div className="flex flex-col border rounded-b-lg p-7">
				<Image
					src="/pro4.jpg"
					alt="selected theme"
					width={800}
					height={600}
					className="rounded-lg"
				/>
				<div className=" flex justify-between mt-2">
					<div className=" mt-2">
						<div className=" flex items-center justify-center  mb-5 ">
							<p className=" mr-4">Dawn</p>
							<button className="bg-blueGray-200 text-black hover:bg-blue-200 active:bg-blueGray-600  active:bg-opacity-100 text-sm font-bold uppercase px-3  rounded shadow hover:shadow-lg outline-none  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
								current theme
							</button>
						</div>
						<p>added 18 min ago</p>
					</div>
					<button className=" bg-black text-white h-8 rounded-md px-2">
						Customize
					</button>
				</div>
			</div>
		</div>
	);
}

export default SelectedTheme;
