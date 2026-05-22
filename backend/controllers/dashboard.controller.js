const prisma = require("../config/db");
const HttpError = require("../middlewares/httpError");
const { subMonths, startOfMonth, endOfMonth, eachMonthOfInterval, format } = require('date-fns');

const getDashboardMetrics = async (req, res, next) => {
    const { accountId } = req.params;
    try {
        if (!accountId) {
            return next(new HttpError('Account ID is required', 400));
        }
        const merchant = await prisma.merchant.findFirst({
            where: { accountId },
            include: {
                shops: {
                    select: { id: true }
                }
            }
        });

        if (!merchant) {
            return next(new HttpError('Merchant not found', 404));
        }

        const merchantId = merchant.id;
        const shopIds = merchant.shops.map(shop => shop.id);
        const currentDate = new Date();
        console.log('merchant id', shopIds)
        // Date ranges for calculations
        const dateRanges = {
            currentPeriod: {
                start: startOfMonth(subMonths(currentDate, 1)),
                end: endOfMonth(currentDate)
            },
            previousPeriod: {
                start: startOfMonth(subMonths(currentDate, 2)),
                end: endOfMonth(subMonths(currentDate, 1))
            },
            sixMonths: {
                start: startOfMonth(subMonths(currentDate, 6)),
                end: endOfMonth(currentDate)
            },
            twelveMonths: {
                start: startOfMonth(subMonths(currentDate, 12)),
                end: endOfMonth(currentDate)
            }
        };

        // Prepare all database queries
        const queries = {
            // Revenue metrics
            currentRevenue: getRevenueData(shopIds, dateRanges.currentPeriod),
            previousRevenue: getRevenueData(shopIds, dateRanges.previousPeriod),

            // Order metrics
            currentOrders: getOrderCount(shopIds, dateRanges.currentPeriod),
            previousOrders: getOrderCount(shopIds, dateRanges.previousPeriod),

            // Customer metrics
            activeCustomers: getActiveCustomerCount(shopIds, dateRanges.currentPeriod),

            // Conversion metrics
            visitorData: getVisitorData(shopIds, dateRanges.currentPeriod),

            // Time series data for charts
            monthlyRevenue: getMonthlyRevenueData(shopIds, dateRanges.twelveMonths),
            monthlyOrders: getMonthlyOrderData(shopIds, dateRanges.twelveMonths),

            // Recent orders for the table
            recentOrders: getRecentOrders(shopIds, 10)
        };

        // Execute all queries in parallel
        const results = await Promise.all(Object.values(queries));

        // Destructure results
        const [
            currentRevenue,
            previousRevenue,
            currentOrders,
            previousOrders,
            activeCustomers,
            visitorData,
            monthlyRevenue,
            monthlyOrders,
            recentOrders
        ] = results;

        // Calculate all metrics
        const metrics = {
            totalRevenue: currentRevenue.totalAmount,
            revenueChange: calculateChange(currentRevenue.totalAmount, previousRevenue.totalAmount),

            totalOrders: currentOrders.count,
            ordersChange: calculateChange(currentOrders.count, previousOrders.count),

            activeCustomers: activeCustomers.count,

            conversionRate: calculateConversionRate(currentOrders.count, visitorData.totalVisitors),

            averageOrderValue: currentOrders.count > 0
                ? currentRevenue.totalAmount / currentOrders.count
                : 0
        };

        // Prepare chart data
        const performanceData = preparePerformanceData(monthlyRevenue, monthlyOrders);
        const salesGraphData = prepareSalesGraphData(monthlyRevenue);

        // Format recent orders for display
        const formattedRecentOrders = recentOrders.map(order => ({
            id: order.id,
            customerName: `${order.customer.account.firstName} ${order.customer.account.lastName}`,
            amount: order.totalAmount,
            status: order.status,
            date: order.createdAt,
            items: order.items.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price
            }))
        }));

        res.status(200).json({
            success: true,
            data: {
                stats: [
                    {
                        title: "Total Revenue",
                        value: metrics.totalRevenue,
                        change: metrics.revenueChange.percentage,
                        trend: metrics.revenueChange.trend,
                        isCurrency: true,
                        footerTitle: "Revenue Growth",
                        footerSubtitle: "vs previous period"
                    },
                    {
                        title: "Total Orders",
                        value: metrics.totalOrders,
                        change: metrics.ordersChange.percentage,
                        trend: metrics.ordersChange.trend,
                        footerTitle: "Order Growth",
                        footerSubtitle: "vs previous period"
                    },
                    {
                        title: "Recent Orders",
                        value: formattedRecentOrders.length,
                        change: 0,
                        trend: "up",
                        isPercentage: false,
                        footerTitle: "Recent Orders",
                        footerSubtitle: "last 30 days"
                    },
                    {
                        title: "Avg. Order Value",
                        value: metrics.averageOrderValue,
                        change: 0, // Would need previous period data to calculate
                        trend: "up", // Would need comparison
                        isCurrency: true,
                        footerTitle: "AOV Trend",
                        footerSubtitle: "vs previous period"
                    }
                ],
                performance: performanceData,
                salesGraph: salesGraphData,
                recentOrders: formattedRecentOrders,

            }
        });

    } catch (error) {
        console.error('Dashboard metrics error:', error);
        next(new HttpError('Failed to load dashboard metrics', 500));
    }
};

// Helper functions for database queries
function getRevenueData(shopIds, dateRange) {
    return prisma.order.aggregate({
        where: {
            shopId: { in: shopIds },
            // status: 'DELIVERED',
            createdAt: {
                gte: dateRange.start,
                lte: dateRange.end
            }
        },
        _sum: {
            totalAmount: true
        }
    });
}

function getOrderCount(shopIds, dateRange) {
    return prisma.order.aggregate({
        where: {
            shopId: { in: shopIds },
            // status: 'DELIVERED',
            createdAt: {
                gte: dateRange.start,
                lte: dateRange.end
            }
        },
        _count: true
    });
}

function getActiveCustomerCount(shopIds, dateRange) {
    return prisma.customer.count({
        where: {
            orders: {
                some: {
                    shopId: { in: shopIds },
                    // status: 'DELIVERED',
                    createdAt: {
                        gte: dateRange.start,
                        lte: dateRange.end
                    }
                }
            }
        }
    });
}

function getVisitorData(shopIds, dateRange) {
    return prisma.analytics.aggregate({
        where: {
            shopId: { in: shopIds },
            date: {
                gte: dateRange.start,
                lte: dateRange.end
            }
        },
        _sum: {
            visitors: true
        }
    });
}

function getMonthlyRevenueData(shopIds, dateRange) {
    const months = eachMonthOfInterval({
        start: dateRange.start,
        end: dateRange.end
    });

    return Promise.all(months.map(monthStart => {
        const monthEnd = endOfMonth(monthStart);
        return prisma.order.aggregate({
            where: {
                shopId: { in: shopIds },
                // status: 'DELIVERED',
                createdAt: {
                    gte: monthStart,
                    lte: monthEnd
                }
            },
            _sum: {
                totalAmount: true
            }
        }).then(result => ({
            month: format(monthStart, 'yyyy-MM'),
            revenue: result._sum.totalAmount || 0
        }));
    }));
}

function getMonthlyOrderData(shopIds, dateRange) {
    const months = eachMonthOfInterval({
        start: dateRange.start,
        end: dateRange.end
    });

    return Promise.all(months.map(monthStart => {
        const monthEnd = endOfMonth(monthStart);
        return prisma.order.count({
            where: {
                shopId: { in: shopIds },
                // status: 'DELIVERED',
                createdAt: {
                    gte: monthStart,
                    lte: monthEnd
                }
            }
        }).then(count => ({
            month: format(monthStart, 'yyyy-MM'),
            orders: count
        }));
    }));
}

function getRecentOrders(shopIds, limit) {
    return prisma.order.findMany({
        where: {
            shopId: { in: shopIds },
            // status: 'DELIVERED'
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: limit,
        include: {
            items: true,
            customer: {
                include: {
                    account: true
                }
            }
        }
    });
}

// Calculation helpers
function calculateChange(current, previous) {
    if (previous === 0) {
        return {
            percentage: current > 0 ? 100 : 0,
            trend: current > 0 ? 'up' : 'neutral'
        };
    }

    const percentage = ((current - previous) / previous * 100).toFixed(1);
    return {
        percentage: Math.abs(parseFloat(percentage)),
        trend: percentage >= 0 ? 'up' : 'down'
    };
}

function calculateConversionRate(orders, visitors) {
    if (visitors === 0) return 0;
    return ((orders / visitors) * 100).toFixed(2);
}

function preparePerformanceData(revenueData, ordersData) {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;

    const performance = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: `Revenue ${currentYear}`,
                data: Array(12).fill(0),
                backgroundColor: 'rgba(79, 70, 229, 0.8)',
                borderColor: 'rgba(79, 70, 229, 1)',
                tension: 0.3
            },
            {
                label: `Orders ${currentYear}`,
                data: Array(12).fill(0),
                backgroundColor: 'rgba(16, 185, 129, 0.8)',
                borderColor: 'rgba(16, 185, 129, 1)',
                tension: 0.3,
                yAxisID: 'y1'
            }
        ]
    };

    // Fill in the data
    revenueData.forEach(({ month, revenue }) => {
        const [year, monthNum] = month.split('-');
        if (year === currentYear.toString()) {
            performance.datasets[0].data[parseInt(monthNum) - 1] = revenue;
        }
    });

    ordersData.forEach(({ month, orders }) => {
        const [year, monthNum] = month.split('-');
        if (year === currentYear.toString()) {
            performance.datasets[1].data[parseInt(monthNum) - 1] = orders;
        }
    });

    return performance;
}

function prepareSalesGraphData(monthlyRevenue) {
    return monthlyRevenue.map(({ month, revenue }) => ({
        month: format(new Date(`${month}-01`), 'MMM yyyy'),
        value: revenue
    }));
}



module.exports = {
    getDashboardMetrics,
};