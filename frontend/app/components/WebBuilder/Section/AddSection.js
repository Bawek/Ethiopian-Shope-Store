import React from "react";
import SectionContent from "./SectionContents";

function AddSection() {
  return (
    <div className=" flex flex-col">
      <div className=" flex justify-between items-center">
        <h1 className=" mt-4 mb-2  text-2xl font-bold">Add Section</h1>{" "}
        <button className="bg-blueGray-800 text-white hover:bg-blue-200 active:bg-blueGray-600  active:bg-opacity-100 text-sm font-bold uppercase px-3 py-2 rounded shadow hover:shadow-lg outline-none  focus:outline-none mr-1 mb-1 mt-2 ease-linear transition-all duration-150">
          Done
        </button>
      </div>
      <div className=" bg-slate-950  mb-4 h-[1px] w-full "></div>
      <p className=" text-sm mb-3">Set up this Section</p>
      <SectionContent></SectionContent>
    </div>
  );
}

export default AddSection;
