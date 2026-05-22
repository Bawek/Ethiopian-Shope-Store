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
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
   

        const [stats, revenue, orders, visits, traffic] = await Promise.all([
          axios.get('http://localhost:8000/api/admin/dashboard/stats'),
          axios.get('http://localhost:8000/api/admin/dashboard/revenue'),
          axios.get('http://localhost:8000/api/admin/dashboard/orders'),
          axios.get('http://localhost:8000/api/admin/dashboard/visits'),
          axios.get('http://localhost:8000/api/admin/dashboard/traffic')
        ]);

        setDashboardData({
          stats: stats.data,
          revenue: revenue.data,
          orders: orders.data,
          visits: visits.data,
          traffic: traffic.data,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setDashboardData(prev => ({
          ...prev,
          loading: false,
          error: error.response?.data?.error || error.message
        }));
      }
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

  if (dashboardData.error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {dashboardData.error}
        </div>
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
            <CardLineChart revenueData={dashboardData.revenue} />
          </div>
          <CardBarChart orderData={dashboardData.orders} />
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
