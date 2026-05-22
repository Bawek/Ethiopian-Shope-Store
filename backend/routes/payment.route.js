const express = require('express');
const { createPayment, verifyPaymentProcess } = require('../controllers/paymentController');
const router = express.Router();

router.post('/pay', createPayment);
router.get('/verify/:tx_ref', verifyPaymentProcess);

module.exports = router;
