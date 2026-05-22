import React, { useState } from "react";
import { PiCaretUpBold, PiCaretDownBold } from "react-icons/pi";

const SectionContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSectionTemplateOpen, setIsSectionTemplateOpen] = useState(true);
  const [isSectionStyleOpen, setIsSectionStyleOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isTestimonialsOpen, setIsTestimonialsOpen] = useState(false);
  const [isBlogPostOpen, setIsBlogPostOpen] = useState(false);

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
          <div>
            <p
              onClick={() => setIsSectionTemplateOpen((pr) => !pr)}
              className=" flex justify-between focus:border-0 hover:cursor-pointer w-full border-0 hover:text-blue-300 "
            >
              <p className=" text-gray-600 font-semibold text-md  mb-2">
                Section Templates
              </p>
              {isSectionTemplateOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
            </p>
            {isSectionTemplateOpen && (
              <div>
                <div className="bg-zinc-700 hover:bg-zinc-600 hover:shadow-md hover:text-blue-300 px-4 py-1 rounded my-1">
                  <p
                    onClick={() => setIsGalleryOpen((pr) => !pr)}
                    className=" flex justify-between focus:border-0 hover:cursor-pointer w-full border-0 hover:text-gray-200 "
                  >
                    <p className=" text-gray-200  font-semibold text-md  mb-2">
                      Gallery
                    </p>
                    {isGalleryOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
                  </p>
                </div>
                <div className="bg-zinc-700  hover:text-blue-300 px-4 py-1 rounded my-1 hover:bg-zinc-600 hover:shadow-md">
                  <p
                    onClick={() => setIsContactOpen((pr) => !pr)}
                    className=" flex justify-between focus:border-0 hover:cursor-pointer w-full border-0 hover:text-gray-200 "
                  >
                    <p className=" text-gray-200 font-semibold text-md  mb-2">
                      Contact
                    </p>
                    {isContactOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
                  </p>
                </div>
                <div className="bg-zinc-700  hover:text-blue-300 px-4 py-1 rounded my-1 hover:bg-zinc-600 hover:shadow-md">
                  <p
                    onClick={() => setIsBlogPostOpen((pr) => !pr)}
                    className=" flex justify-between focus:border-0 hover:cursor-pointer w-full border-0 hover:text-gray-200 "
                  >
                    <p className=" text-gray-200 font-semibold text-md  mb-2">
                      Blog Post
                    </p>
                    {isBlogPostOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
                  </p>
                </div>
                <div className="bg-zinc-700  hover:text-blue-300 px-4 py-1 rounded my-1 hover:bg-zinc-600 hover:shadow-md">
                  <p
                    onClick={() => setIsTestimonialsOpen((pr) => !pr)}
                    className=" flex justify-between focus:border-0 hover:cursor-pointer w-full border-0 hover:text-gray-200 "
                  >
                    <p className=" text-gray-200 font-semibold text-md  mb-2">
                      Testimonials
                    </p>
                    {isTestimonialsOpen ? (
                      <PiCaretUpBold />
                    ) : (
                      <PiCaretDownBold />
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="h-1 rounded w-full bg-slate-200 my-4"> </div>
          <div>
            <p
              onClick={() => setIsSectionStyleOpen((pr) => !pr)}
              className=" flex justify-between focus:border-0 hover:cursor-pointer w-full border-0 hover:text-blue-300 "
            >
              <p className=" text-gray-300 font-semibold text-md  mb-2">
                Customize Sections
              </p>
              {isSectionStyleOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionContent;
