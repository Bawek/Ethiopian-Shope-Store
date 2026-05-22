import Link from "next/link";
import React, {useState} from "react";
import {
	AiOutlineFacebook,
	AiOutlineInstagram,
	AiOutlineTwitter,
} from "react-icons/ai";

function FooterPage() {
	const [footerContent, setFooterContent] = useState({
		logo: "Logo",
		subscriptionTitle: "Stay in the Loop",
		socialMediaIcons: [
			<AiOutlineFacebook size={23} />,
			<AiOutlineInstagram size={23} />,
			<AiOutlineTwitter size={23} />,
		],
		copyRight: "© 2024",
	});
	const [editFooter, setEditFooter] = useState({
		isLogoEditMode: false,
		isSubscriptionTitleEditMode: false,
		isCopyRightEditMode: false,
	});
	const handleChange = (e) => {
		const {name, value} = e.target;
		setFooterContent({...footerContent, [name]: value});
    };
    const [hoverMe,setHoverMe]=useState('')
    const hover=' bg-gray-200 w-full border-none hover:border-2  hover:border-blue-700'
    const notHover=' bg-gray-200 w-full border-none '
	return (
		<div className=" w-full  ">
			<div className=" mb-5  mt-2 flex justify-between">
				{editFooter.isLogoEditMode ? (
					<input
						type="text"
						className={hoverMe=="logo" ? hover:notHover}
						onMouseEnter={()=>setHoverMe("logo")}
						onChange={handleChange}
						name="logo"
						value={footerContent.logo}
					/>
				) : (
					<h3
						onClick={setEditFooter({...setEditFooter, isLogoEditMode: true})}
						className="hover:border-2 w-full hover:border-blue-700"
					>
						{footerContent.logo}
					</h3>
				)}
				<div className=" flex gap-2 justify-end pr-4 w-full hover:border-2 hover:border-blue-700">
					{footerContent.socialMediaIcons.map((soc) => soc)}
				</div>
			</div>
			<div className=" bg-gray-400 w-full h-[1px] "></div>

			<div className=" flex justify-between">
				<div>
                <input
						type="text"
                        className={hoverMe==="sub" ? hover:notHover}
						onMouseEnter={()=>setHoverMe("sub")}						onChange={handleChange}
						name="subscriptionTitle"
						value={footerContent.subscriptionTitle}
					/>
                    
					<div className=" mt-4 hover:border-2 w-full hover:border-blue-700 px-3 py-5">
						<input type="text" placeholder="Email" className=" rounded-l" />
						<button
							type="submit"
							className="bg-blueGray-800 text-white hover:bg-blue-200 active:bg-blueGray-600  active:bg-opacity-100 text-sm font-bold uppercase px-6 pt-[12px] pb-[11px] rounded-r shadow hover:shadow-lg outline-none  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
						>
							Submit
						</button>
						<p className=" text-xs">
							This form is protected by reCAPTCHA and the Google Privacy Policy
							and Terms of Service apply.
						</p>
					</div>
				</div>
				<div className=" flex justify-end items-end  ">
					<Link
						href="/"
						className="hover:border-2 w-36 flex justify-end hover:border-blue-700 px-2 py-1"
					>
						© 2024
					</Link>
				</div>
			</div>
		</div>
	);
}

export default FooterPage;
