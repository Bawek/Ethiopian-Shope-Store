"use client";

import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards({ stats }) {
  if (!stats) return null;

  return (
    <div className="*:data-[slot=card]:shadow-xs grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            ${stats.totalRevenue.toFixed(2)}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Revenue from delivered orders
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>New Customers</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {stats.newCustomers}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              {stats.newCustomers > 0 ? (
                <>
                  <TrendingUpIcon className="size-3" />
                  +20%
                </>
              ) : (
                <>
                  <TrendingDownIcon className="size-3" />
                  -20%
                </>
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats.newCustomers > 0 ? (
              <>
                Growing customer base <TrendingUpIcon className="size-4" />
              </>
            ) : (
              <>
                Acquisition needs attention <TrendingDownIcon className="size-4" />
              </>
            )}
          </div>
          <div className="text-muted-foreground">
            Last 30 days
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {stats.activeAccounts}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +{stats.growthRate}%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Currently logged in users</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {stats.growthRate}%
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +{stats.growthRate}%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Monthly growth rate</div>
        </CardFooter>
      </Card>
    </div>
  );
}









// import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"

// import { Badge } from "@/components/ui/badge"
// import {
//     Card,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"

// export function SectionCards() {
//     return (
//         <div className="*:data-[slot=card]:shadow-xs grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
//             <Card className="@container/card">
//                 <CardHeader className="relative">
//                     <CardDescription>Total Revenue</CardDescription>
//                     <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
//                         $1,250.00
//                     </CardTitle>
//                     <div className="absolute right-4 top-4">
//                         <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
//                             <TrendingUpIcon className="size-3" />
//                             +12.5%
//                         </Badge>
//                     </div>
//                 </CardHeader>
//                 <CardFooter className="flex-col items-start gap-1 text-sm">
//                     <div className="line-clamp-1 flex gap-2 font-medium">
//                         Trending up this month <TrendingUpIcon className="size-4" />
//                     </div>
//                     <div className="text-muted-foreground">
//                         Visitors for the last 6 months
//                     </div>
//                 </CardFooter>
//             </Card>
//             <Card className="@container/card">
//                 <CardHeader className="relative">
//                     <CardDescription>New Customers</CardDescription>
//                     <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
//                         1,234
//                     </CardTitle>
//                     <div className="absolute right-4 top-4">
//                         <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
//                             <TrendingDownIcon className="size-3" />
//                             -20%
//                         </Badge>
//                     </div>
//                 </CardHeader>
//                 <CardFooter className="flex-col items-start gap-1 text-sm">
//                     <div className="line-clamp-1 flex gap-2 font-medium">
//                         Down 20% this period <TrendingDownIcon className="size-4" />
//                     </div>
//                     <div className="text-muted-foreground">
//                         Acquisition needs attention
//                     </div>
//                 </CardFooter>
//             </Card>
//             <Card className="@container/card">
//                 <CardHeader className="relative">
//                     <CardDescription>Active Accounts</CardDescription>
//                     <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
//                         45,678
//                     </CardTitle>
//                     <div className="absolute right-4 top-4">
//                         <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
//                             <TrendingUpIcon className="size-3" />
//                             +12.5%
//                         </Badge>
//                     </div>
//                 </CardHeader>
//                 <CardFooter className="flex-col items-start gap-1 text-sm">
//                     <div className="line-clamp-1 flex gap-2 font-medium">
//                         Strong user retention <TrendingUpIcon className="size-4" />
//                     </div>
//                     <div className="text-muted-foreground">Engagement exceed targets</div>
//                 </CardFooter>
//             </Card>
//             <Card className="@container/card">
//                 <CardHeader className="relative">
//                     <CardDescription>Growth Rate</CardDescription>
//                     <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
//                         4.5%
//                     </CardTitle>
//                     <div className="absolute right-4 top-4">
//                         <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
//                             <TrendingUpIcon className="size-3" />
//                             +4.5%
//                         </Badge>
//                     </div>
//                 </CardHeader>
//                 <CardFooter className="flex-col items-start gap-1 text-sm">
//                     <div className="line-clamp-1 flex gap-2 font-medium">
//                         Steady performance <TrendingUpIcon className="size-4" />

//                         hay
//                     </div>
//                     <div className="text-muted-foreground">Meets growth projections</div>
//                 </CardFooter>
//             </Card>
//         </div>
//     )
// }
