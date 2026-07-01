require('dotenv').config()

const express = require('express')
const http = require('http')
const cors = require('cors')
const cookieParser = require('cookie-parser')

// Configuration & Validation
const { validateEnvironment, getConfig } = require('./config/environment')
const { Logger, requestLogger, errorLogger } = require('./config/logger')

// Routes
const merchantRouter = require('./routes/merchant/merchant.route')
const accountRouter = require('./routes/account.route')
const shopRouter = require('./routes/shop.route')
const imageRouter = require('./routes/image.route')
const pagesRouter = require('./routes/pages.route')
const templateRouter = require('./routes/template.route')
const paymentRouter = require('./routes/payment.route')
const locationRouter = require('./routes/location.route')
const handleRefreshToken = require('./controllers/refreshToken.controller')
const merchantTemplatesRouter = require('./routes/merchantTemplates.route')
const customizedPageRouter = require('./routes/customizedPage.route')
const productRouter = require('./routes/product.route')
const cartRouter = require('./routes/user/cart.route.js')
const orderRouter = require('./routes/user/order.route.js')
const contactRoute = require('./routes/contact.route')
const notificationRouter = require('./routes/notifications.route.js')
const adminRouter = require('./routes/admin.route')

// Controllers
const { getDashboardMetrics } = require('./controllers/dashboard.controller.js')
const { getMerchantAnalytics } = require('./controllers/analytics.controller.js')
const { testIo } = require('./controllers/merchant.controller')

// Socket.io
const { initialize } = require('./utils/socket')

// ============================================================================
// STARTUP VALIDATION
// ============================================================================

const logger = new Logger('STARTUP')

try {
  validateEnvironment()
} catch (error) {
  logger.error('Environment validation failed', error)
  process.exit(1)
}

const config = getConfig()

// ============================================================================
// EXPRESS APP SETUP
// ============================================================================

const app = express()
const server = http.createServer(app)

// Initialize Socket.io
initialize(server)

// ============================================================================
// MIDDLEWARE
// ============================================================================

// Request logging
app.use(requestLogger)

// CORS Configuration
app.use(cors({
  origin: config.security.corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400
}))

// Body parsing
app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: true, limit: '20mb' }))
app.use(cookieParser())

// Static files
app.use(express.static('uploads'))

// ============================================================================
// HEALTH CHECK ENDPOINT
// ============================================================================

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.nodeEnv,
    version: config.deployment.version
  })
})

app.get('/ready', async (req, res) => {
  try {
    // Check database connectivity
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient()
    await prisma.$queryRaw`SELECT 1`
    await prisma.$disconnect()
    
    res.status(200).json({
      status: 'ready',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    logger.error('Readiness check failed', error)
    res.status(503).json({
      status: 'not_ready',
      error: error.message
    })
  }
})

// ============================================================================
// API ROUTES
// ============================================================================

// Payment
app.use('/api', paymentRouter)

// Merchant
app.use('/api/merchant', merchantRouter)

// User
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRouter)

// Authentication
app.get('/api/refresh-token', handleRefreshToken)

// Account & Location
app.use('/api/accounts', accountRouter)
app.use('/api/location', locationRouter)

// Shop & Products
app.use('/api/shops', shopRouter)
app.use('/api/products', productRouter)

// Media
app.use('/api/image', imageRouter)

// Pages & Templates
app.use('/api/pages', pagesRouter)
app.use('/api/templates', templateRouter)
app.use('/api/merchantTemplates', merchantTemplatesRouter)
app.use('/api/customized-pages', customizedPageRouter)

// Notifications
app.use('/api/notifications', notificationRouter)

// Contact
app.use('/api', contactRoute)

// Analytics & Dashboard
app.get('/api/merchant-analytics/:accountId', getMerchantAnalytics)
app.get('/api/merchant-dashboard/:accountId', getDashboardMetrics)

// Admin routes
app.use('/api/admin', adminRouter)

// Socket.io Test
app.post('/iopost', testIo)

// ============================================================================
// ERROR HANDLING MIDDLEWARE
// ============================================================================

// Error logging
app.use(errorLogger)

// Global error handler
app.use((err, req, res, next) => {
  const logger = new Logger('ERROR_HANDLER')
  
  if (err.isOperational) {
    const statusCode = err.statusCode || 500
    const status = err.status || 'error'
    
    logger.error(`${req.method} ${req.path}`, err, {
      statusCode,
      userId: req.user?.id
    })
    
    res.status(statusCode).json({
      status,
      message: err.message,
      timestamp: new Date().toISOString()
    })
  } else {
    logger.error(`${req.method} ${req.path}`, err, {
      statusCode: 500,
      userId: req.user?.id
    })
    
    res.status(500).json({
      status: 'error',
      message: config.isDevelopment ? err.message : 'Internal server error',
      timestamp: new Date().toISOString()
    })
  }
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
    path: req.path
  })
})

// ============================================================================
// GRACEFUL SHUTDOWN
// ============================================================================

const gracefulShutdown = () => {
  logger.info('Received shutdown signal, closing gracefully...')
  
  server.close(() => {
    logger.info('HTTP server closed')
    process.exit(0)
  })
  
  // Force shutdown after 30 seconds
  setTimeout(() => {
    logger.error('Forced shutdown after 30 seconds')
    process.exit(1)
  }, 30000)
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)

// ============================================================================
// START SERVER
// ============================================================================

server.listen(config.port, config.host, () => {
  logger.info(`Server running on ${config.host}:${config.port}`)
  logger.info(`Environment: ${config.nodeEnv}`)
  logger.info(`Version: ${config.deployment.version}`)
})
