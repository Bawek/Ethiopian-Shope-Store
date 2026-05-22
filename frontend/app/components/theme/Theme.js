"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Card, CardHeader, CardFooter, CardContent } from "@/components/ui/card";
import { imageViewer } from "../../system-admin/lib/imageViewer";
import { useState } from "react";
import { useEffect } from "react";

const Theme = ({ theme }) => {
  console.log(theme);
  const [image, setImage] = useState([])
  useEffect(() => {
    setImage(theme.PreviewImage)
  }, [])

  return (
    <Card className="w-80 bg-white border border-gray-300 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
      <CardHeader className="relative overflow-hidden rounded-t-lg">
        <Link href={`/site-builder/${theme.id}`}>
          <Image
            src={imageViewer(image[0])}
            alt={theme.name}
            width={300}
            height={270}
            className="w-full h-full object-cover"
          />
        </Link>
      </CardHeader>

      {/* Card Body (Theme Name, Description) */}
      <CardContent className="flex flex-col p-3">
        <p className="text-gray-700 text-sm font-semibold capitalize truncate max-w-[150px]">
          {theme.name}
        </p>
        <p className="text-gray-500 text-xs mt-1">By Suk Bederete</p>
        <p className="text-gray-500 text-xs mt-1">{theme.description}</p>
      </CardContent>

      {/* Card Footer (Select Button) */}
      <CardFooter className="flex justify-between items-center px-3 py-2">
        <Link
          href={`/site-builder/${theme.id}`}
          className="bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 text-sm font-bold uppercase px-4 py-1 rounded-md shadow-md transition-all duration-200"
        >
          Select
        </Link>
      </CardFooter>
    </Card>
  );
}

export default Theme;
