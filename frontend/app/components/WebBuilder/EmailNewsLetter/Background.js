import React, {useState} from 'react'
import {PiCaretUpBold,PiCaretDownBold} from "react-icons/pi";
import { SwitchFooter } from '../Footer/Switch';
import {
	
	AiFillLayout,
	AiOutlineFileImage,
	AiOutlineFileText,
	AiTwotoneLayout,
} from "react-icons/ai";
const Background = () => {
    const [isOpen, setIsOpen] = useState(false);
	const [isLogoOpen, setIsLogoOpen] = useState(true);
    const [isText, setIsText] = useState(true);
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

  return (
    <div className="dropdown mb-4">
        <p
				onClick={toggleDropdown}
				className=" flex mb-5 justify-between focus:border-0 hover:cursor-pointer w-full border-0 hover:text-blue-300 "
			>
				<p className=" font-bold text-xl ">Background</p>
				{isOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
			</p>
            {isOpen && (
				<div className=" ">
					<div className=" flex flex-col justify-between focus:border-0 hover:cursor-pointer w-full border-0 hover:text-blue-300 ">
						
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
											<AiOutlineFileText /> Image
										</option>
										<option value="image">Custom Color</option>
										<option value="image">Gradient</option>
									</select>
								</div>
								<div>
									{isText ? (
										<div className=" flex justify-between items-center w-full h-16 mt-3 rounded-lg border px-2">
										<p>
											<AiOutlineFileImage size={50} />
										</p>
										<p>Image</p>
										<button className=" text-blue-600 bg-gray-600 rounded-md  px-3 py-2">
										Add Image
										</button>
									</div>
										
									) : (
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
									)}
									
									
								</div>
							</div>
						)}
					</div>
					
					
					
					
					
					
				</div>
			)}
      
    </div>
  )
}

export default Background
