"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import CardLineChart from "../components/Cards/CardLineChart";
import CardBarChart from "../components/Cards/CardBarChart";
import CardPageVisits from "../components/Cards/CardPageVisits";
import CardSocialTraffic from "../components/Cards/CardSocialTraffic";
import { SectionCards } from "./components/dashbard-cards";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    stats: null,
    revenue: null,
    orders: null,
    visits: null,
    traffic: null,
    loading: true
  });

  useEffect(() => {
    const fetchSingle = async (url) => {
      try {
        const res = await axios.get(url);
        return res.data.data;
      } catch {
        return null;
      }
    };

    const fetchDashboardData = async () => {
      const [stats, revenue, orders, visits, traffic] = await Promise.all([
        fetchSingle('http://localhost:8000/api/admin/dashboard/stats'),
        fetchSingle('http://localhost:8000/api/admin/dashboard/revenue'),
        fetchSingle('http://localhost:8000/api/admin/dashboard/orders'),
        fetchSingle('http://localhost:8000/api/admin/dashboard/visits'),
        fetchSingle('http://localhost:8000/api/admin/dashboard/traffic')
      ]);

      const toLineChart = (items, labelKey, valueKey, label, color) =>
        items ? {
          performance: {
            labels: items.map(d => d[labelKey]?.trim()),
            datasets: [{ label, data: items.map(d => Number(d[valueKey])), borderColor: color, backgroundColor: color.replace(')', ', 0.8)') }]
          }
        } : null;

      const toBarChart = (items, labelKey, valueKey, label, color) =>
        items ? {
          labels: items.map(d => d[labelKey]?.trim()),
          datasets: [{ label, data: items.map(d => Number(d[valueKey])), backgroundColor: color }]
        } : null;

      setDashboardData({
        stats: stats?.metrics,
        revenue: toLineChart(revenue?.revenueData, 'month', 'current_year', 'Revenue', '#4c51bf'),
        orders: toBarChart(orders?.orderData, 'month', 'order_count', 'Orders', '#4c51bf'),
        visits: visits?.pageVisits,
        traffic: traffic?.socialTraffic,
        loading: false
      });
    };

    fetchDashboardData();
  }, []);

  if (dashboardData.loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full text-foreground flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center text-primary">
          Admin Dashboard Overview
        </h1>
      </div>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="flex flex-col gap-4 md:gap-6">
          <SectionCards stats={dashboardData.stats} />
          <div className="px-4 lg:px-6">
            <CardLineChart data={dashboardData.revenue} />
          </div>
          <CardBarChart data={dashboardData.orders} />
        </div>
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardPageVisits visitsData={dashboardData.visits} />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <CardSocialTraffic trafficData={dashboardData.traffic} />
          </div>
        </div>
      </div>
    </div>
  );
}


// import React from "react";
// import CardLineChart from "../components/Cards/CardLineChart";
// import CardBarChart from "../components/Cards/CardBarChart";
// import CardPageVisits from "../components/Cards/CardPageVisits";
// import CardSocialTraffic from "../components/Cards/CardSocialTraffic";
// import { SectionCards } from "./components/dashbard-cards";

// export default function Dashboard() {
//   return (
//     <div className="min-h-screen w-full text-foreground flex flex-col">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8  space-y-6">

//         {/* Dashboard Title */}
//         <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center text-primary">
//           Admin Dashboard Overview
//         </h1>
//       </div>
//       <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
//         <div className="flex flex-col gap-4  md:gap-6">
//           <SectionCards />
//           <div className="px-4 lg:px-6">
//             <CardLineChart />
//           </div>
//           <CardBarChart />
//         </div>
//         <div className="flex flex-wrap mt-4">
//           <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
//             <CardPageVisits />
//           </div>
//           <div className="w-full xl:w-4/12 px-4">
//             <CardSocialTraffic />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
