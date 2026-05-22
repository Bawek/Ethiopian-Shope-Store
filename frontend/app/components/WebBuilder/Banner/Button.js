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

export const Button = () => {
  const [isButtonOpen, setIsButtonOpen] = useState(false);

  return (
    <div>
      <p
        onClick={() => setIsButtonOpen((pr) => !pr)}
        className=" flex justify-between focus:border-0 hover:cursor-pointer w-full border-0 hover:text-blue-300 "
      >
        <p className=" text-gray-900 font-semibold text-md  mb-2">Button</p>
        {isButtonOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
      </p>
      {isButtonOpen && (
        <div>
          <label htmlFor="buttonText" className="text-gray-500">
            Button text:{" "}
          </label>
          <input
            id="buttonText"
            placeholder="Button text"
            type="text"
            onChange=""
            className="focus:border-gray-900 border-2 border-gray-300 p-2 rounded-md"
          />
          <div className="flex items-center mt-4">
            <label htmlFor="colorPicker" className="mr-2">
              Background Color:
            </label>
            <input
              id="colorPicker"
              type="color"
              onChange=""
              className="border-2 border-gray-300 p-2 rounded-md my-4"
            />
          </div>
          <div className="flex items-center mt-4">
            <label htmlFor="btnHoverBackgroundColor" className="mr-2">
              Hover background Color:
            </label>
            <input
              id="btnHoverBackgroundColor"
              type="color"
              onChange=""
              className="border-2 border-gray-300 p-2 rounded-md my-4"
            />
          </div>
          <div className="flex items-center mt-4">
            <label htmlFor="btnBorderRadius" className="mr-2">
              Button border radius
            </label>
            <input
              id="colorPicker"
              type="number"
              onChange=""
              min="1"
              className="w-1/3 focus:border-gray-900 border-2 border-gray-300 p-2 rounded-md my-4"
            />
          </div>
          <p>Button layout</p>
          <div className="flex space-x-5 mt-4 text-gray-600">
            <button className="p-2 hover:bg-gray-200 rounded-md">
              <FaAlignLeft />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-md">
              <FaAlignCenter />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-md">
              <FaAlignRight />
            </button>
          </div>
          <div className="flex items-center mt-2">
            <label htmlFor="colorPicker" className="mr-2">
              Text Color:
            </label>
            <input
              id="colorPicker"
              type="color"
              onChange=""
              className="border-2 border-gray-300 p-2 rounded-md my-2"
            />
          </div>
          <div className="flex space-x-2 mt-4 text-gray-600">
            <button className="p-2 hover:bg-gray-200 rounded-md">
              <FaBold />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-md">
              <FaItalic />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-md">
              <FaUnderline />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-md ">
              <FaStrikethrough />
            </button>

            <button className="p-2 hover:bg-gray-200 rounded-md">
              <FaUnderline />
            </button>
          </div>
          <div className="flex space-x-2 mt-4">
            <button className="text-gray-600 p-2 hover:bg-gray-200 rounded-md">
              <FaTextHeight />
            </button>
            <input
              id="colorPicker"
              type="number"
              min="1"
              max="50"
              step="1"
              onChange=""
              className="border-2 border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="flex space-x-2 mt-4">
            <label htmlFor="btnFontFamily">Font family</label>
            <input
              id="btnFontFamily"
              type="text"
              placeholder="Font family"
              onChange=""
              className="border-2 border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="flex space-x-5 my-4">
            <Tooltip text="Link">
              <FaLink className="mr-2 cursor-pointer" />
            </Tooltip>
            <input
              type="text"
              value=""
              onChange=""
              placeholder="Button link"
              className="focus:border-gray-900 border-2 w-[70%] border-gray-300 p-2 rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};
