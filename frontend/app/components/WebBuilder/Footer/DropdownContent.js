import React, {useState} from "react";
import {
	
	AiFillLayout,
	AiOutlineFileImage,
	AiOutlineFileText,
	AiTwotoneLayout,
} from "react-icons/ai";
import {PiCaretUpBold,PiCaretDownBold} from "react-icons/pi";

import {FaAlignLeft, FaAlignRight} from "react-icons/fa";
import SubscriptionTitle from "./SubscriptionTitle";
import Subscription from "./Subscription";
import SocialIcon from "./SocialIcon";
import {SwitchFooter} from "./Switch";

const DropdownNavbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isLogoOpen, setIsLogoOpen] = useState(true);
	const [isNavigationOpen, setIsNavigationOpen] = useState(false);
	const [isSubscriptionTitleOpen, setIsSubscriptionTitleOpen] = useState(false);
	const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
	const [isSocilIconsOpen, setIsSocilIconsOpen] = useState(false);
	const [isExternalLinkOpen, setIsExternalLinkOpen] = useState(false);
	const [isPaymentOpen, setIsPaymentOpen] = useState(false);
	const [isText, setIsText] = useState(true);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="dropdown">
			<p
				onClick={toggleDropdown}
				className=" flex mb-5 justify-between focus:border-0 hover:cursor-pointer w-full border-0 hover:text-blue-300 "
			>
				<p className=" font-bold text-xl ">Content</p>
				{isOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
			</p>
			{isOpen && (
				<div className=" ">
					<div className=" flex flex-col justify-between focus:border-0 hover:cursor-pointer w-full border-0 hover:text-blue-300 ">
						<div
							onClick={() => setIsLogoOpen((pr) => !pr)}
							className=" flex justify-between "
						>
							<p className=" text-gray-300 font-semibold text-md  mb-2">Logo</p>
							<div className=" flex gap-x-3">
								{/* <input
									type="checkbox"
									className="toggle  bg-blue-500 hover:bg-blue-700 border-blue-500"
									checked
								/> */}
								<SwitchFooter />
								{isLogoOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
							</div>
						</div>
						{isLogoOpen && (
							<div>
								<div>
									<h4 className=" font-medium text-xs">Type</h4>
									<select
										className=" w-full border-2 text-gray-900 border-blue-600 rounded-lg my-3"
										name="type"
										id="type"
										onChange={() => setIsText((pr) => !pr)}
									>
										<option value="text">
											<AiOutlineFileText /> Text
										</option>
										<option value="image">Image</option>
									</select>
								</div>
								<div>
									{isText ? (
										<>
											<div className=" flex justify-between items-center">
												<p className="font-medium text-xs">Size</p>{" "}
												<p className="font-medium text-xs my-3">Color</p>
											</div>
											<div className=" flex justify-between items-center ">
												<select
													name="type"
													id="type"
													className=" w-full border-2  text-gray-900 border-blue-600 rounded-lg mb-3"
												>
													<option value="text">Small</option>
													<option value="image">Medium</option>
													<option value="image">Large</option>
												</select>
												<div className=" ml-2 bg-black w-20 h-12 text-xl font-bold rounded-md flex justify-center items-center ">
													A
												</div>
											</div>
										</>
									) : (
										<div className=" flex justify-between items-center w-full h-16 mt-3 rounded-lg border px-2">
											<p>
												<AiOutlineFileImage size={50} />
											</p>
											<p>Logo</p>
											<button className=" text-blue-600 bg-gray-600 rounded-md  px-3 py-2">
												Edit Image
											</button>
										</div>
									)}
									<div className=" w-full h-16 mt-3 rounded-lg flex justify-between items-center border p-3 border-white">
										<div className=" flex flex-col">
											<p>Links to</p> <h2>Home</h2>
										</div>
										<button className="">Edit</button>
									</div>
									<p className=" text-xs text-gray-300 mt-2 mb-4">
										We automatically link your logo to your homepage
									</p>
								</div>
							</div>
						)}
					</div>
					<div className=" flex  flex-col mb-3  w-full   ">
						<div
							onClick={() => setIsNavigationOpen((pr) => !pr)}
							className=" flex justify-between items-center hover:cursor-pointer hover:text-blue-300 "
						>
							<p className=" text-gray-300 font-semibold text-md  mb-2">
								Navigation
							</p>
							<div className="flex">
								<SwitchFooter />
								{isNavigationOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
							</div>
						</div>
						{isNavigationOpen && (
							<div className=" px-2 mt-3">
								<div className=" flex justify-between pl-2 pr-5">
									<p className=" text-xs font-light">
										Same as header navigation{" "}
									</p>
									<SwitchFooter />
								</div>
							</div>
						)}
					</div>
					<div className=" flex flex-col justify-between  w-full ">
						<div
							onClick={() => setIsSubscriptionTitleOpen((pr) => !pr)}
							className=" flex justify-between items-center hover:cursor-pointer  border-0 hover:text-blue-300 "
						>
							<p className=" text-gray-300 font-semibold text-md  mb-2">
								Subscription title
							</p>
							<div className=" flex">
								<SwitchFooter />

								{isSubscriptionTitleOpen ? (
									<PiCaretUpBold />
								) : (
									<PiCaretDownBold />
								)}
							</div>
						</div>
						{isSubscriptionTitleOpen && <SubscriptionTitle />}
					</div>
					<div className="  flex flex-col justify-between   w-full border-0  ">
						<div
							onClick={() => setIsSubscriptionOpen((pr) => !pr)}
							className=" flex justify-between items-center hover:cursor-pointer  border-0 hover:text-blue-300 "
						>
							<p className=" text-gray-300 font-semibold text-md  mb-2">
								Subscription
							</p>
							<div className=" flex">
								<SwitchFooter />

								{isSubscriptionOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
							</div>
						</div>

						{isSubscriptionOpen && <Subscription />}
					</div>
					<div className="  flex flex-col justify-between   w-full border-0  ">
						<div
							onClick={() => setIsSocilIconsOpen((pr) => !pr)}
							className=" flex justify-between items-center hover:cursor-pointer  border-0 hover:text-blue-300 "
						>
							<p className=" text-gray-300 font-semibold text-md  mb-2">
								Social Icons
							</p>
							<div className=" flex">
								<SwitchFooter />

								{isSocilIconsOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
							</div>
						</div>

						{isSocilIconsOpen && <SocialIcon />}
					</div>
					<div className="  flex flex-col justify-between   w-full border-0  ">
						<div
							onClick={() => setIsExternalLinkOpen((pr) => !pr)}
							className=" flex justify-between items-center hover:cursor-pointer  border-0 hover:text-blue-300 "
						>
							<p className=" text-gray-300 font-semibold text-md  mb-2">
								External Links
							</p>
							<div className=" flex">
								<SwitchFooter />

								{isExternalLinkOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
							</div>
						</div>

						{isExternalLinkOpen && <SubscriptionTitle />}
					</div>
					<div
						onClick={() => setIsPaymentOpen((pr) => !pr)}
						className=" flex justify-between focus:border-0 hover:cursor-pointer w-full border-0 hover:text-blue-300 "
					>
						<p className=" text-gray-300 font-semibold text-md  mb-2">
							Payment Method
						</p>
						{isPaymentOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
					</div>
				</div>
			)}
		</div>
	);
};

export default DropdownNavbar;
