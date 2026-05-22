import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { formatCurrency } from '@/util/currency'

const MerchantAnalyticsOverview = ({ data }) => {
    if (!data) return null
    const metrics = [
        {
            title: "Total Revenue",
            value: data.totalRevenue,
            change: data.revenueChange,
            isCurrency: true
        },
        {
            title: "Total Orders",
            value: data.totalOrders,
            change: data.orderChange
        },,
        {
            title: "Avg. Order Value",
            value: data.avgOrderValue,
            change: data.aovChange,
            isCurrency: true
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => {
                const isPositive = metric.change >= 0
                const TrendIcon = isPositive ? TrendingUp : TrendingDown
                const formattedValue = metric.isCurrency
                    ? formatCurrency(metric?.value)
                    : metric?.isPercentage
                        ? `${metric?.value?.toFixed(2)}%` || '0%'
                        : metric?.value?.toLocaleString() || '0'

                const formattedChange = `${isPositive ? '+' : ''}${metric?.change ? metric.change?.toFixed(1) : '0'}%`

                return (
                    <Card key={index}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {metric.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formattedValue}</div>
                            <Badge
                                variant={isPositive ? 'positive' : 'negative'}
                                className="mt-2 flex items-center gap-1"
                            >
                                <TrendIcon className="h-3 w-3" />
                                {formattedChange}
                            </Badge>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}

export default MerchantAnalyticsOverview