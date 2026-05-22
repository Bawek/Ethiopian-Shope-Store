"use client";
import React from "react";

// components

import CardTable from "@/app/[locale]/components/Cards/CardTable.js";

// layout for page

import { Admin } from "@/app/[locale]/layouts/Admin";
import { useGetShopsQuery } from "@/lib/features/shop/publicShopSlice";
import EnhancedTable from "../../components/Tables/ShopList";
export default function Tables() {
  const { data: shops, isLoading } = useGetShopsQuery();
  console.log(shops);

  return (
    <Admin>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable />
        </div>
        <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div>
        <div className="w-full mb-12 px-4   ">
          {shops ? (
            <EnhancedTable rows={shops} />
          ) : (
            <div className=" w-full h-full flex justify-center items-center">
              Loading
            </div>
          )}
        </div>
      </div>
    </Admin>
  );
}
