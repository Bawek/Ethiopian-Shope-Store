import React from "react";
import DropdownNavbar from "./DropdownNavbar";
import DropdownContent from "./DropdownContent";
import Background from "./Background";
function EmailNewsLetter() {
	return (
		<div className=" flex flex-col">
			<div className=" flex justify-between items-center">
				<h1 className=" mt-4 mb-2  text-2xl font-bold">Email Newsletter</h1>{" "}
				<button className="bg-blueGray-800 text-white hover:bg-blue-200 active:bg-blueGray-600  active:bg-opacity-100 text-sm font-bold uppercase px-3 py-2 rounded shadow hover:shadow-lg outline-none  focus:outline-none mr-1 mb-1 mt-2 ease-linear transition-all duration-150">
					Done
				</button>
			</div>
			<div className=" bg-slate-950  mb-4 h-[1px] w-full "></div>
			<p className=" text-sm mb-3">Set up this Section</p>
			<DropdownNavbar />
            <Background />
			<DropdownContent />
			 <div className='mt-10'>
              <button className='w-full bg-slate-100 p-3 rounded-md hover:bg-slate-400 flex items-center justify-between'>
                
               <p> Delete Section </p>
			   <i className="fas fa-trash-alt"></i>
				
              </button>
            </div>
		</div>
	);
}

export default EmailNewsLetter;