"use client";
import React from "react";
import { Admin } from "@/app/[locale]/layouts/Admin";
import AdminWithOutStat from "@/app/[locale]/layouts/adminWithOutStat";
import EnhancedTable from "@/app/[locale]/components/Tables/product";
import { productHeadCells } from "@/util/headCells";
import { useGetProductsQuery } from "@/lib/features/products/products";

export default function InventoryPage() {
  const merchant_id = localStorage.getItem("unique_id");
  const { data, isLoading, isError } = useGetProductsQuery(merchant_id);

  return (
    <Admin
      subtitle1="Total Product"
      subtitle2="total Store "
      subtitle3="out of Stock"
      subtitle4="All catagories"
    >
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          {/* <CardLineChart /> */}
        </div>
        <div className="w-full xl:w-4/12 px-4">{/* <CardBarChart /> */}</div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          {/* <CardPageVisits /> */}
        </div>
        <div className="w-full xl:w-4/12 px-4">
          {/* <CardSocialTraffic /> */}
        </div>
      </div>
      <div className="flex flex-wrap mt-32">
        {data?.all_products?.length ? (
          <EnhancedTable
            rows={data?.all_products}
            title={"Inventory Item"}
            headCells={productHeadCells}
            onButtonClick={(event, data) =>
              console.log("Button clicked", data?.all_products)
            } // Placeholder for button click handler
          />
        ) : (
          <h1 className=" flex justify-center items-center">No Products</h1>
        )}
      </div>
    </Admin>
  );
}
