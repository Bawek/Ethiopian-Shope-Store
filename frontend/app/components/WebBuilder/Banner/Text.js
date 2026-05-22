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
const Text = () => {
  const [isTextOpen, setIsTextOpen] = useState(true);
  const [isBackgroundOpen, setBackgroundOpen] = useState(false);
  const [textColor, setTextColor] = useState("#000000");

  const handleColorChange = (event) => {
    setTextColor(event.target.value);
  };

  return (
    <div>
      <p
        onClick={() => setIsTextOpen((pr) => !pr)}
        className=" flex justify-between focus:border-0 hover:cursor-pointer w-full border-0 hover:text-blue-300 "
      >
        <p className=" text-gray-900 font-semibold text-md  mb-2">Text</p>
        {isTextOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
      </p>
      {isTextOpen && (
        <div>
          <div>
            <input
              id="banner-text"
              type="text"
              placeholder="Text"
              style={{ color: textColor }}
              className="border-2 border-gray-300 p-2 rounded-md"
            />

            <div className="flex items-center mt-4">
              <label htmlFor="colorPicker" className="mr-2">
                Color:
              </label>
              <input
                id="colorPicker"
                type="color"
                onChange={handleColorChange}
                className="border-2 border-gray-300 p-2 rounded-md"
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
              <button className="p-2 hover:bg-gray-200 rounded-md">
                <FaStrikethrough />
              </button>

              <button className="p-2 hover:bg-gray-200 rounded-md">
                <FaUnderline />
              </button>
            </div>
            <div className="flex space-x-2 mt-4">
              <button className="p-2 hover:bg-gray-200 rounded-md">
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
              <select
                value="14"
                onChange=""
                className="border-2 border-gray-300 p-2 rounded-md"
              >
                <option value="12px">12px</option>
                <option value="14px">14px</option>
                <option value="16px">16px</option>
                <option value="18px">18px</option>
                <option value="20px">20px</option>
                <option value="24px">24px</option>
                <option value="30px">30px</option>
              </select>
            </div>
            <p>layout</p>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Text;
