'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetMerchantDashboardInfoQuery } from '@/lib/features/merchant/registrationApi'
import { useSelector } from 'react-redux'
import CardLineChart from '../components/Cards/CardLineChart'
import MerchantStatsCards from './components/merchantDaBoxs'
const MerchantDashboard = () => {
  const account = useSelector((state) => state.account)
  const router = useRouter()
  const { data: dashboardData, isLoading, isError } = useGetMerchantDashboardInfoQuery(account?.id)
  console.log('dashboardData', dashboardData)
  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-background p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-lg" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Skeleton className="h-80 rounded-lg" />
          <Skeleton className="h-80 rounded-lg" />
        </div>
        <Skeleton className="h-96 rounded-lg" />
      </div>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  if (isError) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">
            Failed to load dashboard data
          </h2>
          <p className="text-muted-foreground">
            Please try refreshing the page or contact support
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Dashboard Header */}
        <div className="pt-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Merchant Dashboard Overview
          </h1>
      
        </div>

        {/* Stats Cards Section */}
        <div className="grid grid-cols-1 gap-4">
          <MerchantStatsCards statsData={dashboardData?.data?.stats} />
        </div>

        {/* Charts Section */}
        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Revenue & Orders</h2>
          <CardLineChart data={dashboardData?.data} />
        </div>
      </div>
    </div>
  )
}

export default MerchantDashboard
// 'use client'

// import React from 'react'
// import CardLineChart from '../components/Cards/CardLineChart'
// import CardBarChart from '../components/Cards/CardBarChart'
// import { SectionCards } from './components/merchantDaBoxs'
// import { useGetMerchantDashboardInfoQuery } from '@/lib/features/merchant/registrationApi'
// import { useSelector } from 'react-redux'
// const statsData = [
//   {
//     title: "Total Revenue",
//     value: "$1,250.00",
//     trend: "up",
//     change: "+12.5%",
//     footerTitle: "Trending up this month",
//     footerSubtitle: "Compared to last month",
//   },
//   {
//     title: "Total Orders",
//     value: "356",
//     trend: "up",
//     change: "+8.2%",
//     footerTitle: "Order volume increasing",
//     footerSubtitle: "Avg. order value: $45.00",
//   },
//   {
//     title: "Average Order Value (AOV)",
//     value: "$45.00",
//     trend: "down",
//     change: "-5.3%",
//     footerTitle: "Slightly lower than last month",
//     footerSubtitle: "Promotions may help boost AOV",
//   },
//   {
//     title: "Inventory Alert",
//     value: "12 items",
//     trend: "up",
//     change: "+3",
//     footerTitle: "Low stock items",
//     footerSubtitle: "Replenish soon",
//   },
//   {
//     title: "Top Selling Product",
//     value: "Premium Headphones",
//     trend: "up",
//     change: "+42%",
//     footerTitle: "High demand item",
//     footerSubtitle: "Restock recommended",
//   },

// ];

// const MerchantDashboard = () => {
//   const accountId = useSelector((state) => state.account.id)
//   const { data: DashboardStatus } = useGetMerchantDashboardInfoQuery(accountId)
//   console.log("DashboardStatus", DashboardStatus)
//   return (
//     <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8  space-y-6">

//         {/* Dashboard Title */}
//         <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center text-primary">
//           Merchant Dashboard Overview
//         </h1>
//       </div>
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

//         {/* Section: Summary Cards */}
//         <SectionCards statsData={DashboardStatus?.metrics} />

//         {/* Section: Charts */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <CardLineChart data={DashboardStatus?.salesGraph} />
//           <CardBarChart data={DashboardStatus?.performance} />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MerchantDashboard
