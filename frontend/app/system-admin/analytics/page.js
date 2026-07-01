"use client";

import { useEffect, useState } from "react";
import { BarChartIcon, TrendingUpIcon, UsersIcon, ShoppingCartIcon } from "lucide-react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [statsRes, ordersRes, revenueRes, visitsRes, trafficRes] = await Promise.all([
          axios.get('http://localhost:8000/api/admin/dashboard/stats'),
          axios.get('http://localhost:8000/api/admin/dashboard/orders'),
          axios.get('http://localhost:8000/api/admin/dashboard/revenue'),
          axios.get('http://localhost:8000/api/admin/dashboard/visits'),
          axios.get('http://localhost:8000/api/admin/dashboard/traffic'),
        ]);

        setData({
          stats: statsRes.data.data.metrics,
          orders: ordersRes.data.data.orderData,
          revenue: revenueRes.data.data.revenueData,
          visits: visitsRes.data.data.pageVisits,
          traffic: trafficRes.data.data.socialTraffic,
        });
      } catch (err) {
        console.error('Failed to fetch analytics data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const metrics = data?.stats;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <BarChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics?.totalRevenue?.toFixed(2) || '0.00'}</div>
            <p className="text-xs text-muted-foreground">From delivered orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.newCustomers || 0}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.totalOrders || 0}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.growthRate || '0.0'}%</div>
            <p className="text-xs text-muted-foreground">Period over period</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Orders</CardTitle>
            <CardDescription>Order count by month</CardDescription>
          </CardHeader>
          <CardContent>
            {data?.orders?.length ? (
              <div className="space-y-2">
                {data.orders.map((o, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-1">
                    <span className="text-sm">{o.month?.trim()}</span>
                    <span className="font-semibold">{o.order_count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No order data available</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Month</CardTitle>
            <CardDescription>Current year revenue</CardDescription>
          </CardHeader>
          <CardContent>
            {data?.revenue?.length ? (
              <div className="space-y-2">
                {data.revenue.map((r, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-1">
                    <span className="text-sm">{r.month?.trim()}</span>
                    <span className="font-semibold">${Number(r.current_year).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No revenue data available</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Page Visits</CardTitle>
            <CardDescription>Most visited pages</CardDescription>
          </CardHeader>
          <CardContent>
            {data?.visits?.length ? (
              <div className="space-y-2">
                {data.visits.map((v, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-1">
                    <span className="text-sm">{v.page}</span>
                    <span className="font-semibold">{v.visitors?.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No visit data available</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Traffic</CardTitle>
            <CardDescription>Traffic by referral source</CardDescription>
          </CardHeader>
          <CardContent>
            {data?.traffic?.length ? (
              <div className="space-y-2">
                {data.traffic.map((t, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-1">
                    <span className="text-sm">{t.source}</span>
                    <span className="font-semibold">{t.visitors?.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No traffic data available</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
