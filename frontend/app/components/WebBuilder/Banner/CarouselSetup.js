import { useState } from "react";
import { PiCaretUpBold, PiCaretDownBold } from "react-icons/pi";

const CarouselSetup = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState([]);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };
  const handleImageSubmit = (e) => {
    e.preventDefault();
    setImages([...images, imageUrl]);
    setImageUrl("");
  };

  return (
    <div>
      {" "}
      <p
        onClick={() => setIsCarouselOpen((pr) => !pr)}
        className=" flex justify-between focus:border-0 hover:cursor-pointer w-full border-0 hover:text-blue-300 "
      >
        <p className=" text-gray-900 font-semibold text-md  mb-2">
          Carousel set up
        </p>
        {isCarouselOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
      </p>
      {isCarouselOpen && (
        <div>
          {" "}
          <form onSubmit={handleImageSubmit}>
            <input
              type="text"
              value={imageUrl}
              onChange={handleImageUrlChange}
              placeholder="Enter Image URL"
              className="focus:border-gray-900 border-2  border-gray-300 p-2 rounded-md mt-4"
            />
            <button
              onClick=""
              className="my-4 ml-4 bg-gray-900 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
            >
              Add Image
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CarouselSetup;
