"use client";
import React from "react";
import ShopItem from "./Shopitem";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const ProductSlider = () => {
  return (
    <div>
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <ShopItem />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {/* <ShopItem fullWidth={true} />
      <ShopItem fullWidth={true} />
      <ShopItem fullWidth={true} />
      <ShopItem fullWidth={true} />
      <ShopItem fullWidth={true} />
      <ShopItem fullWidth={true} />
      <ShopItem fullWidth={true} /> */}
    </div>
  );
};

export default ProductSlider;
