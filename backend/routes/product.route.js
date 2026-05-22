const express = require('express');
const { createProduct, getProductById, getAllProducts, updateProductById, deleteProductById, getAllProductsForSale, getProductByShopId } = require('../controllers/product.controller');
const upload = require('../config/multer.config');

const router = express.Router()

// Account routes
router.post('/create', upload.array('images', 5), createProduct);
router.get('/get-all-products', getAllProducts)
router.get('/get-all-products-for-sale', getAllProductsForSale)
router.get('/product-get-by-id/:id', getProductById)
router.get('/product-get-by-ShopId/:shopId', getProductByShopId)
router.delete('/delete/:id', deleteProductById)
router.put('/update', upload.array('images', 5), updateProductById)

module.exports = router 
