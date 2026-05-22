const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validationResult } = require('express-validator');

const adminController = {
  // Dashboard Stats
  getDashboardStats: async (req, res) => {
    console.log('error log before try')
    try {
      // Validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }
console.log('exsperment')
      // Calculate date ranges
      const now = new Date();
      const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
      const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

      const [
        totalRevenue,
        newCustomers,
        activeAccounts,
        recentOrders,
        totalOrders,
        pendingOrders,
        completedOrders,
        merchants,
        shops
      ] = await Promise.all([
        prisma.order.aggregate({
          _sum: { 
            product: { 
              price: true 
            } 
          },
          where: { 
            status: 'DELIVERED',
            createdAt: { gte: oneYearAgo }
          }
        }),
        prisma.account.count({
          where: { 
            createdAt: { gte: thirtyDaysAgo },
            role: 'CUSTOMER'
          }
        }),
        prisma.account.count({ 
          where: { 
            NOT: { refreshToken: null },
            lastActiveAt: { gte: thirtyDaysAgo }
          } 
        }),
        prisma.order.count({
          where: { createdAt: { gte: thirtyDaysAgo } }
        }),
        prisma.order.count(),
        prisma.order.count({ where: { status: 'PENDING' } }),
        prisma.order.count({ where: { status: 'DELIVERED' } }),
        prisma.merchant.count(),
        prisma.shop.count({ where: { status: 'ACTIVE' } })
      ]);

      console.log("hey error is not happen")

      // Calculate growth rate safely
      const previousPeriodOrders = totalOrders - recentOrders;
      const growthRate = previousPeriodOrders > 0 
        ? ((recentOrders - previousPeriodOrders) / previousPeriodOrders * 100).toFixed(1)
        : recentOrders > 0 ? '100.0' : '0.0';

      res.status(200).json({
        success: true,
        data: {
          metrics: {
            totalRevenue: totalRevenue._sum?.product?.price || 0,
            newCustomers,
            activeAccounts,
            growthRate,
            totalOrders,
            pendingOrders,
            completedOrders,
            totalMerchants: merchants,
            activeShops: shops
          },
          timeframes: {
            recent: '30 days',
            comparison: 'previous period'
          },
          updatedAt: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Dashboard stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch dashboard statistics',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        code: 'DASHBOARD_STATS_ERROR'
      });
    }
  },

  // Revenue Data
  getRevenueData: async (req, res) => {
    try {
      // Validate query params
      const { year = new Date().getFullYear(), compareYear = true } = req.query;
      
      if (isNaN(year)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid year parameter',
          code: 'INVALID_YEAR_PARAM'
        });
      }

      // Get revenue data
      let query;
      if (compareYear) {
        query = prisma.$queryRaw`
          SELECT 
            TO_CHAR(date_trunc('month', o."createdAt"), 'Month') as month,
            EXTRACT(MONTH FROM o."createdAt") as month_num,
            SUM(p.price) as current_year,
            (SELECT SUM(p2.price) 
             FROM "Order" o2
             JOIN "Product" p2 ON o2."productId" = p2.id
             WHERE EXTRACT(YEAR FROM o2."createdAt") = ${year - 1}
             AND EXTRACT(MONTH FROM o2."createdAt") = EXTRACT(MONTH FROM o."createdAt")
             AND o2.status = 'DELIVERED'
             GROUP BY EXTRACT(MONTH FROM o2."createdAt")) as previous_year
          FROM "Order" o
          JOIN "Product" p ON o."productId" = p.id
          WHERE EXTRACT(YEAR FROM o."createdAt") = ${year}
          AND o.status = 'DELIVERED'
          GROUP BY month, month_num
          ORDER BY month_num
        `;
      } else {
        query = prisma.$queryRaw`
          SELECT 
            TO_CHAR(date_trunc('month', o."createdAt"), 'Month') as month,
            EXTRACT(MONTH FROM o."createdAt") as month_num,
            SUM(p.price) as current_year
          FROM "Order" o
          JOIN "Product" p ON o."productId" = p.id
          WHERE EXTRACT(YEAR FROM o."createdAt") = ${year}
          AND o.status = 'DELIVERED'
          GROUP BY month, month_num
          ORDER BY month_num
        `;
      }

      const revenueData = await query;

      if (!revenueData || revenueData.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No revenue data found for the specified period',
          code: 'NO_REVENUE_DATA'
        });
      }

      res.status(200).json({
        success: true,
        data: {
          revenueData,
          timeframe: {
            year: parseInt(year),
            compareWith: compareYear ? parseInt(year) - 1 : null
          },
          currency: 'USD',
          updatedAt: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Revenue data error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch revenue data',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        code: 'REVENUE_DATA_ERROR'
      });
    }
  },

  // Order Data
  getOrderData: async (req, res) => {
    try {
      // Validate query params
      const { year = new Date().getFullYear(), status } = req.query;
      
      if (isNaN(year)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid year parameter',
          code: 'INVALID_YEAR_PARAM'
        });
      }

      // Build where clause based on status
      let whereClause = `WHERE EXTRACT(YEAR FROM "createdAt") = ${year}`;
      if (status && ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].includes(status)) {
        whereClause += ` AND status = '${status}'`;
      }

      const orderData = await prisma.$queryRaw`
        SELECT 
          TO_CHAR(date_trunc('month', "createdAt"), 'Month') as month,
          EXTRACT(MONTH FROM "createdAt") as month_num,
          COUNT(*) as order_count,
          SUM(p.price) as total_value
        FROM "Order" o
        JOIN "Product" p ON o."productId" = p.id
        ${whereClause}
        GROUP BY month, month_num
        ORDER BY month_num
      `;

      if (!orderData || orderData.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No order data found for the specified period',
          code: 'NO_ORDER_DATA'
        });
      }

      res.status(200).json({
        success: true,
        data: {
          orderData,
          filters: {
            year: parseInt(year),
            status: status || 'all'
          },
          updatedAt: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Order data error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch order data',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        code: 'ORDER_DATA_ERROR'
      });
    }
  },

  // Page Visits
  getPageVisits: async (req, res) => {
    try {
      // Validate query params
      const { days = 30 } = req.query;
      
      if (isNaN(days) || days < 1 || days > 365) {
        return res.status(400).json({
          success: false,
          message: 'Days parameter must be between 1 and 365',
          code: 'INVALID_DAYS_PARAM'
        });
      }

      // In a real implementation, you would query your analytics database here
      // This is a simulation with mock data
      const pages = ['/dashboard', '/products', '/orders', '/customers', '/settings'];
      const baseVisits = [4500, 4000, 3500, 2000, 1800];
      const simulationFactor = days / 30; // Scale based on days parameter

      const pageVisits = pages.map((page, index) => {
        const base = baseVisits[index] * simulationFactor;
        const visitors = Math.round(base * (0.9 + Math.random() * 0.2)); // Random variation
        const uniqueUsers = Math.round(visitors * (0.07 + Math.random() * 0.03));
        const bounceRate = Number((30 + Math.random() * 30).toFixed(2)); // 30-60% bounce rate
        
        return {
          page,
          visitors,
          uniqueUsers,
          bounceRate
        };
      });

      res.status(200).json({
        success: true,
        data: {
          pageVisits,
          timeframe: `${days} days`,
          updatedAt: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Page visits error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch page visits data',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        code: 'PAGE_VISITS_ERROR'
      });
    }
  },

  // Social Traffic
  getSocialTraffic: async (req, res) => {
    try {
      // Validate query params
      const { days = 30 } = req.query;
      
      if (isNaN(days) || days < 1 || days > 365) {
        return res.status(400).json({
          success: false,
          message: 'Days parameter must be between 1 and 365',
          code: 'INVALID_DAYS_PARAM'
        });
      }

      // Simulation with mock data
      const sources = ['Facebook', 'Google', 'Instagram', 'Twitter', 'Direct'];
      const baseTraffic = [5000, 4500, 3500, 2500, 1500];
      const simulationFactor = days / 30;

      const socialTraffic = sources.map((source, index) => {
        const base = baseTraffic[index] * simulationFactor;
        const visitors = Math.round(base * (0.9 + Math.random() * 0.2));
        const percentage = Math.round((visitors / (baseTraffic.reduce((a, b) => a + b) * simulationFactor)) * 100);
        
        return {
          source,
          visitors,
          percentage
        };
      });

      // Sort by visitors descending
      socialTraffic.sort((a, b) => b.visitors - a.visitors);

      res.status(200).json({
        success: true,
        data: {
          socialTraffic,
          timeframe: `${days} days`,
          updatedAt: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Social traffic error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch social traffic data',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        code: 'SOCIAL_TRAFFIC_ERROR'
      });
    }
  },

  // Admin management functions
  getAllAdmins: async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * limit;

      const [admins, total] = await Promise.all([
        prisma.admin.findMany({
          skip,
          take: parseInt(limit),
          include: {
            account: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                role: true,
                createdAt: true
              }
            }
          },
          orderBy: {
            account: {
              createdAt: 'desc'
            }
          }
        }),
        prisma.admin.count()
      ]);

      res.status(200).json({
        success: true,
        data: {
          admins,
          pagination: {
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit)
          }
        }
      });
    } catch (error) {
      console.error('Get admins error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch admin accounts',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        code: 'ADMIN_FETCH_ERROR'
      });
    }
  },

  createAdmin: async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const { firstName, lastName, email, password } = req.body;

      // Check if email already exists
      const existingAccount = await prisma.account.findUnique({
        where: { email }
      });

      if (existingAccount) {
        return res.status(409).json({
          success: false,
          message: 'Email already in use',
          code: 'EMAIL_IN_USE'
        });
      }

      // In a real app, you would hash the password here
      const hashedPassword = password; // Replace with actual hashing

      // Create account and admin in a transaction
      const newAdmin = await prisma.$transaction(async (prisma) => {
        const account = await prisma.account.create({
          data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: 'ADMIN'
          }
        });

        return await prisma.admin.create({
          data: {
            accountId: account.id
          },
          include: {
            account: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                role: true
              }
            }
          }
        });
      });

      res.status(201).json({
        success: true,
        message: 'Admin account created successfully',
        data: newAdmin
      });
    } catch (error) {
      console.error('Create admin error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create admin account',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        code: 'ADMIN_CREATE_ERROR'
      });
    }
  },

  // Additional admin management functions
  getAdminById: async (req, res) => {
    try {
      const { id } = req.params;

      const admin = await prisma.admin.findUnique({
        where: { id },
        include: {
          account: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              role: true,
              createdAt: true,
              updatedAt: true
            }
          }
        }
      });

      if (!admin) {
        return res.status(404).json({
          success: false,
          message: 'Admin not found',
          code: 'ADMIN_NOT_FOUND'
        });
      }

      res.status(200).json({
        success: true,
        data: admin
      });
    } catch (error) {
      console.error('Get admin by ID error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch admin details',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        code: 'ADMIN_FETCH_ERROR'
      });
    }
  },

  updateAdmin: async (req, res) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, email } = req.body;

      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      // Check if admin exists
      const admin = await prisma.admin.findUnique({
        where: { id },
        include: { account: true }
      });

      if (!admin) {
        return res.status(404).json({
          success: false,
          message: 'Admin not found',
          code: 'ADMIN_NOT_FOUND'
        });
      }

      // Check if email is being changed and if new email is available
      if (email && email !== admin.account.email) {
        const emailExists = await prisma.account.findUnique({
          where: { email },
          select: { id: true }
        });

        if (emailExists) {
          return res.status(409).json({
            success: false,
            message: 'Email already in use',
            code: 'EMAIL_IN_USE'
          });
        }
      }

      // Update admin account
      const updatedAdmin = await prisma.admin.update({
        where: { id },
        data: {
          account: {
            update: {
              firstName,
              lastName,
              ...(email && { email })
            }
          }
        },
        include: {
          account: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              role: true
            }
          }
        }
      });

      res.status(200).json({
        success: true,
        message: 'Admin updated successfully',
        data: updatedAdmin
      });
    } catch (error) {
      console.error('Update admin error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update admin',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        code: 'ADMIN_UPDATE_ERROR'
      });
    }
  },

  deleteAdmin: async (req, res) => {
    try {
      const { id } = req.params;

      // Check if admin exists
      const admin = await prisma.admin.findUnique({
        where: { id },
        include: { account: true }
      });

      if (!admin) {
        return res.status(404).json({
          success: false,
          message: 'Admin not found',
          code: 'ADMIN_NOT_FOUND'
        });
      }

      // Prevent deleting own account
      if (admin.accountId === req.user.accountId) {
        return res.status(403).json({
          success: false,
          message: 'Cannot delete your own admin account',
          code: 'SELF_DELETE_FORBIDDEN'
        });
      }

      // Delete admin and associated account in a transaction
      await prisma.$transaction([
        prisma.admin.delete({ where: { id } }),
        prisma.account.delete({ where: { id: admin.accountId } })
      ]);

      res.status(200).json({
        success: true,
        message: 'Admin deleted successfully'
      });
    } catch (error) {
      console.error('Delete admin error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete admin',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        code: 'ADMIN_DELETE_ERROR'
      });
    }
  }
};

module.exports = adminController;