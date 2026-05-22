// server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.conroller.js');
// const authMiddleware = require('../middleware/authMiddleware');
// const adminMiddleware = require('../');


// Dashboard analytics routes
router.get('/dashboard/stats',adminController.getDashboardStats);
router.get('/dashboard/revenue', adminController.getRevenueData);
router.get('/dashboard/orders', adminController.getOrderData);
router.get('/dashboard/visits', adminController.getPageVisits);
router.get('/dashboard/traffic', adminController.getSocialTraffic);

// Admin management routes
router.get('/', adminController.getAllAdmins);
router.post('/', adminController.createAdmin);

module.exports = router;