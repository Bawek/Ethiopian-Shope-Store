import React from "react";

// components

import CardLineChart from "@/app/components/Cards/CardLineChart.js";
import CardBarChart from "@/app/components/Cards/CardBarChart.js";
import CardPageVisits from "@/app/components/Cards/CardPageVisits.js";
import CardSocialTraffic from "@/app/components/Cards/CardSocialTraffic.js";

// layout for page

import AdminWithOutStat from "@/app/layouts/adminWithOutStat";
import Alert from "../components/Alert";

export default function Dashboard() {
  return (
    <AdminWithOutStat>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </AdminWithOutStat>
  );
}
