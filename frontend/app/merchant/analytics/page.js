'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Download, Filter, RefreshCw } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { subDays, format } from 'date-fns'
import { useGetMerchantAnalyticsQuery } from '@/lib/features/merchant/registrationApi'
import { useSelector } from 'react-redux'
import MerchantAnalyticsOverview from '../components/AnalyticsOverView'
import ProductPerformance from '../components/product-performance'
import SalesTrendChart from '../components/sales-trend'
import CustomerSegmentation from '../components/customers'

export default function MerchantAnalyticsPage() {
  const account = useSelector((state) => state.account)
  const [dateRange, setDateRange] = useState({
    start: subDays(new Date(), 30),
    end: new Date()
  })
  const [activeTab, setActiveTab] = useState('overview')

  const { data, isLoading, isError, refetch } = useGetMerchantAnalyticsQuery(
    account.id,
    format(dateRange.start, 'yyyy-MM-dd'),
    format(dateRange.end, 'yyyy-MM-dd')
  )
  console.log('Analytics Data:', data)
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
        <h2 className="text-2xl font-bold text-destructive">
          Failed to load analytics data
        </h2>
        <Button onClick={refetch} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header with controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Insights and performance metrics for your business
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={refetch}
              disabled={isLoading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>

        {isLoading ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-lg" />
              ))}
            </div>
            <Skeleton className="h-96 rounded-lg" />
          </div>
        ) : (
          <>
            <TabsContent value="overview" className="space-y-4">
              <MerchantAnalyticsOverview data={data?.data?.metrics} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sales Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SalesTrendChart
                      data={{
                        currentPeriod: data?.data?.trends?.currentPeriod,
                        previousPeriod: data?.data?.trends?.previousPeriod
                      }}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Top Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ProductPerformance data={data?.data} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sales" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <SalesTrendChart
                    data={{
                      currentPeriod: data?.data?.trends?.currentPeriod,
                      previousPeriod: data?.data?.trends?.previousPeriod
                    }}
                    showComparison={true}
                  />
                </CardContent>
              </Card>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Total Orders:</span>
                        <span className="font-medium">{data?.data?.metrics?.totalOrders}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Order Value:</span>
                        <span className="font-medium">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD'
                          }).format(data?.data?.metrics?.avgOrderValue || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conversion Rate:</span>
                        <span className="font-medium">{data?.data?.metrics?.conversionRate}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="customers" className="space-y-4">
              <CustomerSegmentation data={data?.data} />
            </TabsContent>

            <TabsContent value="products">
              <ProductPerformance data={data?.data?.products} detailed={true} />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  )
}