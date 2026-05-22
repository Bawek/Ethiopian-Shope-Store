const { subDays, startOfDay, endOfDay, eachDayOfInterval, format } = require('date-fns')
const httpError = require('../middlewares/httpError')
const prisma = require('../config/db')

const getMerchantAnalytics = async (req, res, next) => {
    const { accountId } = req.params
    const { period = '30d', compare = true } = req.query

    try {
        // Validate accountId
        if (!accountId) {
            throw new httpError('Account ID is required', 400)
        }

        // Get merchant by accountId with shops
        const merchant = await prisma.merchant.findFirst({
            where: { accountId },
            include: {
                shops: {
                    select: {
                        id: true,
                        Analytics: {
                            where: {
                                date: {
                                    gte: subDays(new Date(), 90) // Only get recent analytics
                                }
                            },
                            orderBy: {
                                date: 'desc'
                            }
                        }
                    }
                }
            }
        })

        if (!merchant) {
            throw new httpError('Merchant not found', 404)
        }

        const shopIds = merchant.shops.map(shop => shop.id)
        const now = new Date()

        // Calculate date ranges based on period
        let startDate, endDate = now
        switch (period) {
            case '7d':
                startDate = subDays(now, 7)
                break
            case '30d':
                startDate = subDays(now, 30)
                break
            case '90d':
                startDate = subDays(now, 90)
                break
            default:
                if (period.includes(',')) {
                    const [start, end] = period.split(',')
                    startDate = new Date(start)
                    endDate = new Date(end)
                } else {
                    startDate = subDays(now, 30)
                }
        }

        // Get all days in the period for complete data
        const dateRange = eachDayOfInterval({
            start: startOfDay(startDate),
            end: endOfDay(endDate)
        })

        // Helper function to aggregate analytics data
        const getAnalyticsData = async (start, end) => {
            const results = await prisma.analytics.findMany({
                where: {
                    shopId: { in: shopIds },
                    date: { gte: start, lte: end }
                },
                orderBy: { date: 'asc' }
            })

            // Group by date and sum metrics across all shops
            const analyticsMap = new Map()
            results.forEach(item => {
                const dateKey = format(item.date, 'yyyy-MM-dd')
                const existing = analyticsMap.get(dateKey) || {
                    date: dateKey,
                    visitors: 0,
                    pageViews: 0,
                    orders: 0,
                    revenue: 0
                }

                analyticsMap.set(dateKey, {
                    date: dateKey,
                    visitors: existing.visitors + item.visitors,
                    pageViews: existing.pageViews + item.pageViews,
                    orders: existing.orders + item.orders,
                    revenue: existing.revenue + item.revenue
                })
            })

            // Fill in all dates in the range
            return dateRange.map(date => {
                const dateKey = format(date, 'yyyy-MM-dd')
                return analyticsMap.get(dateKey) || {
                    date: dateKey,
                    visitors: 0,
                    pageViews: 0,
                    orders: 0,
                    revenue: 0
                }
            })
        }

        // Get comparison period data if requested
        const getComparisonData = async () => {
            if (!compare) return []
            const comparisonDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
            return getAnalyticsData(
                subDays(startDate, comparisonDays),
                subDays(endDate, comparisonDays)
            )
        }

        // Execute all queries in parallel
        const [
            currentPeriodAnalytics,
            previousPeriodAnalytics,
            totalRevenue,
            totalOrders,
            totalCustomers,
            topProducts
        ] = await Promise.all([
            getAnalyticsData(startDate, endDate),
            getComparisonData(),
            // Get total revenue from orders (double verification)
            prisma.order.aggregate({
                where: {
                    shopId: { in: shopIds },
                    // status: 'DELIVERED',
                    createdAt: { gte: startDate, lte: endDate }
                },
                _sum: { totalAmount: true }
            }),
            // Get total orders count
            prisma.order.count({
                where: {
                    shopId: { in: shopIds },
                    // status: 'DELIVERED',
                    createdAt: { gte: startDate, lte: endDate }
                }
            }),
            // Get unique customers
            prisma.customer.count({
                where: {
                    orders: {
                        some: {
                            shopId: { in: shopIds },
                            // status: 'DELIVERED',
                            createdAt: { gte: startDate, lte: endDate }
                        }
                    }
                }
            }),
            // Get top performing products
            prisma.orderItem.groupBy({
                by: ['productId'],
                where: {
                    order: {
                        shopId: { in: shopIds },
                        // status: 'DELIVERED',
                        createdAt: { gte: startDate, lte: endDate }
                    }
                },
                _sum: { price: true, quantity: true },
                orderBy: { _sum: { price: 'desc' } },
                take: 5
            })
        ])

        // Calculate metrics from analytics data
        const totalVisitors = currentPeriodAnalytics.reduce((sum, day) => sum + day.visitors, 0)
        const totalPageViews = currentPeriodAnalytics.reduce((sum, day) => sum + day.pageViews, 0)
        const analyticsOrders = currentPeriodAnalytics.reduce((sum, day) => sum + day.orders, 0)
        const analyticsRevenue = currentPeriodAnalytics.reduce((sum, day) => sum + day.revenue, 0)

        // Use analytics data where available, fall back to direct queries
        const finalRevenue = analyticsRevenue > 0 ? analyticsRevenue : (totalRevenue._sum.totalAmount || 0)
        const finalOrders = analyticsOrders > 0 ? analyticsOrders : totalOrders

        // Calculate derived metrics
        const conversionRate = totalVisitors > 0
            ? (finalOrders / totalVisitors * 100).toFixed(2)
            : 0
        const avgOrderValue = finalOrders > 0
            ? (finalRevenue / finalOrders).toFixed(2)
            : 0
        const bounceRate = totalVisitors > 0
            ? ((totalVisitors - totalPageViews) / totalVisitors * 100).toFixed(2)
            : 0

        // Format product performance data
        const products = await Promise.all(
            topProducts.map(async item => {
                const product = await prisma.product.findUnique({
                    where: { id: item.productId },
                    select: {
                        name: true,
                        images: true,
                        category: true
                    }
                })
                return {
                    id: item.productId,
                    name: product?.name || 'Unknown Product',
                    image: product?.images?.[0] || null,
                    category: product?.category || 'Uncategorized',
                    unitsSold: item._sum.quantity || 0,
                    revenue: item._sum.price || 0
                }
            })
        )

        // Get customer segmentation by location
        const customerLocations = await prisma.customer.groupBy({
            by: ['locationId'],
            where: {
                orders: {
                    some: {
                        shopId: { in: shopIds },
                        // status: 'DELIVERED',
                        createdAt: { gte: startDate, lte: endDate }
                    }
                }
            },
            _count: true,
            orderBy: { _count: { locationId: 'desc' } },
            take: 5
        })

        const locations = await Promise.all(
            customerLocations.map(async loc => {
                const location = await prisma.location.findUnique({
                    where: { id: loc.locationId }
                })
                return {
                    id: loc.locationId,
                    name: location ? `${location.town}, ${location.region}` : 'Unknown',
                    count: loc._count
                }
            })
        )

        res.status(200).json({
            success: true,
            data: {
                metrics: {
                    totalRevenue: parseFloat(finalRevenue),
                    totalOrders: finalOrders,
                    totalCustomers,
                    totalVisitors,
                    conversionRate: parseFloat(conversionRate),
                    avgOrderValue: parseFloat(avgOrderValue),
                    bounceRate: parseFloat(bounceRate)
                },
                trends: {
                    currentPeriod: currentPeriodAnalytics,
                    previousPeriod: previousPeriodAnalytics
                },
                products,
                customerSegmentation: {
                    locations,
                    totalCustomers: customerLocations.reduce((sum, loc) => sum + loc._count, 0)
                }
            }
        })

    } catch (error) {
        console.error('Error in getMerchantAnalytics:', error)
        next(error instanceof httpError ? error : new httpError('Failed to fetch analytics', 500))
    }
}

module.exports = {
    getMerchantAnalytics
}