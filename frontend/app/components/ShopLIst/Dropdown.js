import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetAllShopsQuery, useGetShopQuery } from "@/lib/features/shop/shop";
const { useRouter } = require("next/navigation");

const Dropdown = ({ name, shops }) => {
  const { data: categoryData, error: categoryError, isLoading: categoryLoading } = useGetAllShopsQuery();
  console.log()
  const router = useRouter();
  return (
    <DropdownMenu className="focus:outline-none">
      <DropdownMenuTrigger className="focus:outline-none focus:border-red-500 px-2">
        <span>
          <svg
            fill="white"
            className="w-10 h-10 inline-block "
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0" fill="none" width="24" height="24" />

            <g>
              <path d="M7 10l5 5 5-5" />
            </g>
          </svg>
          {name}{" "}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-[#FCD34D] min-w-52 px-9 mt-1 border-[#78350F]  text-[#78350F] font-light">
        {categoryData?.shops &&

          categoryData?.shops?.map((category, index) => (
            <React.Fragment key={index}>
              {/* <DropdownMenuLabel className="text-xl">{shop.id}</DropdownMenuLabel> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-xl transition-all duration-700 bg-[#FCD34D] hover:text-white hover:bg-transparent ease-in-out font-bold ">
                {category.category}
              </DropdownMenuItem>
            </React.Fragment>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
