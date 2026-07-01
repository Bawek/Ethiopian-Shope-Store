"use client";
import React from "react";

// components

import CardSettings from "@/app/components/Cards/CardSettings.js";
// layout for page

import AdminWithOutStat from "@/app/layouts/adminWithOutStat";
export default function Settings() {
  return (
    <AdminWithOutStat>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
        </div>
        <div className="w-full lg:w-4/12 px-4">{/* <CardProfile /> */}</div>
      </div>
    </AdminWithOutStat>
  );
}
