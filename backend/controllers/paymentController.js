const { initializePayment, verifyPayment } = require("../services/chapaService");

// Generate unique transaction reference without uuid
const generateTxRef = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

const createPayment = async (req, res) => {
  console.log('hi ihs ', 'payment data');
  const { amount, email, first_name, last_name, phone_number, currency, FRONTEND_BASE_URL, callback_url, orderId, accountId } = req.body;

  // Generate tx_ref manually
  const tx_ref = generateTxRef();

  const paymentData = {
    amount,
    currency: currency || 'ETB',
    email,
    first_name,
    last_name,
    phone_number: parseInt(phone_number),
    tx_ref,
    callback_url: `${callback_url}?tx_ref=${tx_ref}`,
    return_url: `${FRONTEND_BASE_URL}?tx_ref=${tx_ref}`,
    customization: {
      title: "E-Commerce",
      description: "Order Payment",
    },
    meta: {
      orderId,
      tx_ref,
      accountId
    }
  };

  try {
    const chapaRes = await initializePayment(paymentData);
    if (chapaRes.status === 'success') {
      // Send back the checkout URL to the frontend
      res.json({ checkout_url: chapaRes.data.checkout_url });
    } else {
      // Return error if payment initialization failed
      res.status(400).json({ error: chapaRes.message || 'Failed to initialize payment' });
    }
  } catch (err) {
    console.log(err, 'error in payment controller');
    // Handle server-side errors
    res.status(500).json({ error: err.message });
  }
};


const verifyPaymentProcess = async (req, res) => {
  const { tx_ref } = req.params;

  try {
    const chapaRes = await verifyPayment(tx_ref);

    // Check if payment is successful
    const isSuccess = chapaRes.status === 'success' && chapaRes.data.status === 'success';

    if (isSuccess) {
      res.status(200).json({
        success: true,
        status: 'success',
        tx_ref,
        amount: chapaRes.data.amount,
        currency: chapaRes.data.currency || 'ETB',
        payment_date: chapaRes.data.created_at,
        message: 'Payment verified successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        status: 'failed',
        tx_ref,
        reason: chapaRes.message || 'Payment verification failed',
        data: chapaRes.data || null
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 'error',
      error: err.message,
      message: 'Internal server error during verification'
    });
  }
};


module.exports = {
  createPayment,
  verifyPaymentProcess,
  generateTxRef
};