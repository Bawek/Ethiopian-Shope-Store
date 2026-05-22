import React from "react";
import Image from 'next/image'
const NavBar = ({ onButtonClick }) => {
  const handleClick = (view) => {
    onButtonClick(view);
  };
  return (
    <>
      <div className="flex items-center  mb-5 h-10 px-5">
        <button
          type="button"
          className="mx-4 "
          onClick={() => handleClick("desktop")}
        >
          <Image
            src="/computer.png"
            alt="desktop"
            width={30}
            height={20}
            className="   "
          />
        </button>
        <button className="mx-4 " onClick={() => handleClick("mobile")}>
          <Image
            src="/mobile-phone.png"
            alt="desktop"
            width={30}
            height={15}
            className=" "
          />
        </button>
        <button
          className="mx-4"
        >
          <img
            src="undo.png"
            alt="undo"
            width={30}
            height={20}
            className="   "
          />
        </button>
        <button>
          <img
            src="redo.png"
            alt="redo"
            width={30}
            height={20}
            className=" "
          />
        </button>
        <div className="flex ml-auto space-x-4">
          <button className="bg-blueGray-800 text-white hover:bg-blue-200  text-sm font-bold uppercase rounded shadow hover:shadow-lg ml-auto  py-2 px-2 ease-linear transition-all duration-150">
            Preview
          </button>
          <button className="bg-blueGray-800 text-white hover:bg-blue-200  text-sm font-bold uppercase py-2 px-2 rounded shadow hover:shadow-lg ml-auto">
            Publish
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
