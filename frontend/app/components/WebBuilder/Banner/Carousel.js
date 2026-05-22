import React from "react";
import Slider from "react-slick";

const CarouselComponent = ({ images, autoplay, slideDuration }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: slideDuration || 500,
    autoplay: autoplay || false,
    autoplaySpeed: slideDuration || 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Slide ${index}`} />
        </div>
      ))}
    </Slider>
  );
};

export default CarouselComponent;
