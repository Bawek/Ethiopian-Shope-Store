import React, {useState} from "react";
import {
	
	AiFillLayout,
	AiOutlineFileImage,
	AiOutlineFileText,
	AiTwotoneLayout,
} from "react-icons/ai";
import {PiCaretUpBold,PiCaretDownBold} from "react-icons/pi";

import {FaAlignLeft, FaAlignRight} from "react-icons/fa";
import SubscriptionTitle from "../Footer/SubscriptionTitle";
import Subscription from "../Footer/Subscription";
import { SwitchFooter } from "../Footer/Switch";

const DropdownNavbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isLogoOpen, setIsLogoOpen] = useState(true);
	const [isNavigationOpen, setIsNavigationOpen] = useState(false);
	const [isSubscriptionTitleOpen, setIsSubscriptionTitleOpen] = useState(false);
	const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
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
					
				</div>
			)}
		</div>
	);
};

export default DropdownNavbar;
