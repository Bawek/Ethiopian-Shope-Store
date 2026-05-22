import { useState } from "react";
import { PiCaretUpBold, PiCaretDownBold } from "react-icons/pi";

const OverlayEffect = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div>
      <p
        onClick={() => setIsOverlayOpen((pr) => !pr)}
        className=" flex justify-between focus:border-0 hover:cursor-pointer w-full border-0 hover:text-blue-300 "
      >
        <p className=" text-gray-900 font-semibold text-md  mb-2">
          Overlay Effect
        </p>
        {isOverlayOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
      </p>
      {isOverlayOpen && (
        <div>
          <div className="flex items-center mt-2">
            <label htmlFor="backDropColor" className="mr-2">
              Backdrop Color:
            </label>
            <input
              id="backDropColor"
              type="color"
              onChange=""
              className="border-2 border-gray-300 p-2 rounded-md my-2"
            />
          </div>
          <div className="flex space-x-10 my-4">
            <label htmlFor="overlayOpacity">Opacity:</label>
            <input
              id="overlayOpacity"
              type="number"
              value=""
              min="1"
              max="100"
              onChange=""
              placeholder="1"
              className="focus:border-gray-900 border-2 w-1/4 border-gray-300 p-2 rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OverlayEffect;
