const express = require('express');
const { registerShop, getAllShop, getById, getShopByAccount, updateshopById } = require('../controllers/shop.controller');
const upload = require('../config/multer.config');

const router = express.Router()

// Account routes
router.post('/register', upload.single('logoImageUrl'), registerShop)
router.get('/get-all', getAllShop)
router.get('/get/:shopId', getById)
router.put('/update/:shopId', updateshopById)
router.get('/getby-account/:accountId', getShopByAccount)
module.exports = router

