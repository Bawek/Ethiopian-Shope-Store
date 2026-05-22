import React, {useState} from "react";
import {AiFillLayout, AiTwotoneLayout} from "react-icons/ai";
import {FaAlignLeft, FaAlignRight} from "react-icons/fa";
import {PiCaretUpBold, PiCaretDownBold} from "react-icons/pi";
import { SwitchFooter } from "../Footer/Switch";
const DropdownNavbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isColorOpen, setIsColorOpen] = useState(true);
    const [isNavigationOpen, setIsNavigationOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="dropdown border-b-4 pb-3 mb-3">
			<p
				onClick={toggleDropdown}
				className=" flex mb-5 justify-between focus:border-0 hover:cursor-pointer w-full border-0 hover:text-blue-300 "
			>
				<p className=" font-bold text-xl ">Customize</p>
				{isOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
			</p>
			{isOpen && (
				<div className=" ">
					<p
						onClick={() => setIsColorOpen((pr) => !pr)}
						className=" flex justify-between focus:border-0 hover:cursor-pointer w-full border-0 hover:text-blue-300 "
					>
						<p className=" text-gray-300 font-semibold text-md  mb-2">
							Layout and Color
						</p>
						{isColorOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
					</p>
					{isColorOpen && (
						<div>
							<div>
								<p>layout</p>
								<div className=" flex  gap-x-4 mt-2">
									<p className=" hover:cursor-pointer w-20 bg-white h-12 rounded-md flex  justify-center items-center">
										<FaAlignLeft color="black" size={25} />
									</p>
									<p className=" hover:cursor-pointer w-20 bg-white h-12 rounded-md flex justify-center items-center border-4 border-blue-700">
										<FaAlignRight color="black" size={25} />
									</p>
								</div>
							</div>
							<div>
								<p className=" my-3">color style</p>
								<div className=" flex flex-wrap gap-3 w-full ">
									<button className=" bg-white text-black px-6 font-extrabold text-xl py-3 rounded-md">
										Aa
									</button>
									<button className=" bg-white text-black px-6 font-extrabold text-xl py-3 rounded-md">
										Aa
									</button>
									<button className=" bg-black text-white px-6 font-extrabold text-xl py-3 rounded-md">
										Aa
									</button>
									<button className=" bg-black text-white px-6 font-extrabold text-xl py-3 rounded-md">
										Aa
									</button>
								</div>
							</div>
                            <div
							onClick={() => setIsNavigationOpen((pr) => !pr)}
							className=" flex justify-between items-center hover:cursor-pointer hover:text-blue-300 mt-4 "
						>
							<p className=" text-gray-300 font-semibold text-md  mb-2">
                            Sticky header
							</p>
							<div className="flex">
								<SwitchFooter />
								
							</div>
						</div>
						</div>
                        
					)}
				</div>
			)}
		</div>
	);
};

export default DropdownNavbar;