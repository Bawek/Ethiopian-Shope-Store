const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/order.controller');

// Create a new order
router.post('/', orderController.createOrder);
router.get('/payment/callback', orderController.verifyOrderPayment)
router.get('/payment/frontend-check', orderController.verifyOrderPaymentForFrontend)

// Get all orders
router.get('/get-all', orderController.getAllOrders);
router.get('/get-by-account/:accountId', orderController.getOrdersByCustomerId);

// // Get a single order by ID
router.get('/get/:id', orderController.getOrderById);

// // Update order status
router.put('/update/:id/status', orderController.updateOrderStatus);

// // Delete an order
router.delete('/delete/:id', orderController.deleteOrder);

module.exports = router;
