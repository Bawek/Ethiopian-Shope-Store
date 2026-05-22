const express = require('express')
const merchantRouter = require('./routes/merchant/merchant.route')
const accountRouter = require('./routes/account.route')
const cors = require('cors')
const shopRouter = require('./routes/shop.route')
const imageRouter = require('./routes/image.route')
const pagesRouter = require('./routes/pages.route')
const templateRouter = require('./routes/template.route')
const paymentRouter = require('./routes/payment.route')
const cookieParser = require('cookie-parser')
const handleRefreshToken = require('./controllers/refreshToken.controller')
const locationRouter = require('./routes/location.route')
require('dotenv').config()
const http = require('http');
const { initialize } = require('./utils/socket')
const { testIo } = require('./controllers/merchant.controller')
const merchantTemplatesRouter = require('./routes/merchantTemplates.route')
const customizedPageRouter = require('./routes/customizedPage.route')
const productRouter = require('./routes/product.route')
const cartRouter = require('./routes/user/cart.route.js')
const orderRouter = require('./routes/user/order.route.js')
const contactRoute = require('./routes/contact.route');
const notificationRouter = require('./routes/notifications.route.js')
const { getDashboardMetrics } = require('./controllers/dashboard.controller.js')
const { getMerchantAnalytics } = require('./controllers/analytics.controller.js')
// constants  
const PORT = process.env.PORT || 8000
//start the server 
const app = express()
const server = http.createServer(app) 
initialize(server);

// Enable CORS 
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://checkout.chapa.co',
    'https://smart-scalable-e-commerce-platform-for-ethiopian-entrepreneurs-and-smse.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.urlencoded({ extended: true }))
app.use(express.static('uploads'))
app.use(cookieParser())
app.use(express.json())

// chapa payment route
app.use('/api', paymentRouter);
app.use('/api/merchant', merchantRouter)

app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);
app.get('/api/refresh-token', handleRefreshToken)
app.use('/api/accounts', accountRouter)
app.use('/api/location', locationRouter)
app.use('/api/shops', shopRouter)
app.use('/api/image', imageRouter)
app.use('/api/notifications', notificationRouter)
app.use('/api/pages', pagesRouter)
app.use('/api/products', productRouter)
app.use('/api/templates', templateRouter)
app.use('/api/merchantTemplates', merchantTemplatesRouter)
app.use('/api/customized-pages', customizedPageRouter)
app.post('/iopost', testIo)
// dashbaord analytics
app.get('/api/merchant-analytics/:accountId', getMerchantAnalytics)
app.get('/api/merchant-dashboard/:accountId', getDashboardMetrics)
// Routes
app.use('/api', contactRoute);
// handling errors
app.use((err, req, res, next) => {
  if (err.isOperational) {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    console.log(err, 'http Error')
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  } else {
    res.status(500).json({
      status: 'error',
      message: err.message || 'Something went seriously wrong'
    })
  }
})

//start the server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})
