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
import { Button } from "./Button";
import Logo from "./Logo";
import OverlayEffect from "./OverlayEffect";
import CarouselSetup from "./CarouselSetup";
import Text from "./Text";

const DropdownNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown border-b-4 pb-3 mb-3">
      <p
        onClick={toggleDropdown}
        className=" flex mb-5 justify-between focus:border-0 hover:cursor-pointer w-full border-0 hover:text-blue-300 "
      >
        <p className=" font-bold text-xl ">Customize</p>
        {isOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
      </p>
      {isOpen && (
        <div className=" ">
          <Text />
          <div className="h-1 rounded w-full bg-slate-200 my-4"> </div>
          <Logo />
          <div className="h-1 rounded w-full bg-slate-200 my-4"> </div>
          <Button />
          <div className="h-1 rounded w-full bg-slate-200 my-4"> </div>
          <OverlayEffect />
          <div className="h-1 rounded w-full bg-slate-200 my-4"> </div>
          <CarouselSetup></CarouselSetup>
        </div>
      )}
    </div>
  );
};

export default DropdownNavbar;
