import { TrendingUp, TrendingDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/util/currency"

const MerchantStatsCards = ({ statsData }) => {
  if (!statsData || statsData.length === 0) {
    return (
      <div className="col-span-full py-12 text-center text-muted-foreground">
        No dashboard metrics available
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((item, index) => {
        const isUp = item.trend === "up"
        const TrendIcon = isUp ? TrendingUp : TrendingDown
        
        // Format values based on type
        const formattedValue = () => {
          if (item.isCurrency) {
            return formatCurrency(item.value ? item.value : 0)
          }
          if (item.isPercentage) {
            return `${parseFloat(item.value ? item.value : 0).toFixed(2)}%`
          }
          return item?.value ? item?.value?.toLocaleString() : 0
        }

        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.title}
              </CardTitle>
              <Badge 
                variant={isUp ? "positive" : "negative"} 
                className="flex items-center gap-1 text-xs"
              >
                <TrendIcon className="h-3 w-3" />
                {item.change}%
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formattedValue()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {item.footerSubtitle}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default MerchantStatsCards