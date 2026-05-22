import { Label } from "@radix-ui/react-context-menu";
import React, { useState } from "react";
import Tooltip from "./ToolTip";
import {
  FaAlignLeft,
  FaAlignRight,
  FaAlignCenter,
  FaFileImage,
  FaUpload,
  FaLink,
} from "react-icons/fa";
import { PiCaretUpBold, PiCaretDownBold } from "react-icons/pi";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaPalette,
  FaFont,
  FaTextHeight,
  FaSubscript,
  FaSuperscript,
  FaStrikethrough,
} from "react-icons/fa";
const Logo = () => {
  const [logoType, setLogoType] = useState("text");
  const [isLogoOpen, setIsLogoOpen] = useState(false);

  const handleLogoTypeChange = (event) => {
    setLogoType(event.target.value);
  };
  return (
    <div>
      <p
        onClick={() => setIsLogoOpen((pr) => !pr)}
        className=" flex justify-between focus:border-0 hover:cursor-pointer w-full border-0 hover:text-blue-300 "
      >
        <p className=" text-gray-900 font-semibold text-md  mb-2">Logo</p>
        {isLogoOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
      </p>
      {isLogoOpen && (
        <div>
          <label htmlFor="logoType" className="text-gray-600">
            Logo Type:{" "}
          </label>
          <select
            id="logoType"
            onChange={handleLogoTypeChange}
            className="border-2 border-gray-300 px-10 rounded-md mb-5 focus:border-gray-900"
          >
            <option value="text" className="hover:bg-red-50">
              Text
            </option>
            <option value="image">Image</option>
          </select>
          {logoType == "image" && (
            <div>
              <div className="flex items-center mt-5">
                <input
                  type="file"
                  id="imageUpload"
                  onChange=""
                  className="hidden"
                />
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer flex items-center"
                >
                  <FaFileImage
                    size={24}
                    className="text-gray-900 hover:text-blue-300 mr-2"
                  />
                  <FaUpload
                    size={24}
                    className="text-gray-900 hover:text-blue-300"
                  />
                </label>
                <button
                  onClick=""
                  className="ml-4 bg-gray-900 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
                >
                  Upload
                </button>
              </div>
              <div className="flex space-x-5 my-4">
                <Tooltip text="Link">
                  <FaLink className="mr-2 cursor-pointer" />
                </Tooltip>
                <input
                  type="text"
                  value=""
                  onChange=""
                  placeholder="Enter logo link"
                  className="focus:border-gray-900 border-2 w-[70%] border-gray-300 p-2 rounded-md"
                />
              </div>
              <label htmlFor="logoWidth" className="mr-2">
                Width:
              </label>
              <input
                id="logoWidth"
                type="number"
                onChange=""
                className="focus:border-gray-900 border-2 border-gray-300 p-2 rounded-md"
              />
              <label htmlFor="logoHeight" className="mr-2 m">
                Height:
              </label>
              <input
                id="logoHeight"
                type="number"
                onChange=""
                className="focus:border-gray-900 border-2 border-gray-300 p-2 rounded-md"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
