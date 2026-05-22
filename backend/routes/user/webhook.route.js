const express = require('express');
const { saveUserToDatabase } = require('../../controllers/users.controller');
const { verifyWebhook } = require('../../middlewares/verifyWebhook');
const router = express.Router()

router.post('/webhooks', verifyWebhook,saveUserToDatabase)

module.exports = router 