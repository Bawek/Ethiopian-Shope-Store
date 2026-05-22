const express = require('express');
const { registerTemplate, getAllTemplate, getTemplateById, updateTempalate, deleteById, buyTemplate, getCustomeTemplateById, getAllMerchantTemplate, getMerchantTemplateByAccount, verifyTemplatePayment, verifyTemplaterPaymentForFrontend } = require('../controllers/template.controller');
const upload = require('../config/multer.config')
const router = express.Router()

// Account routes 
router.post('/register', upload.single('previewUrls'), registerTemplate)
router.get('/get-all', getAllTemplate) 
router.get('/get-all-merchant', getAllMerchantTemplate) 
router.get('/get/:templateId', getTemplateById)
router.get('/get-merchant-by-account/:accountId', getMerchantTemplateByAccount)
router.delete('/delete/:templateId', deleteById)
router.post('/buy', buyTemplate)
router.post('/get-merchant-template/:templateId', getCustomeTemplateById) 
router.put('/update/:templateId', upload.single('previewUrls'), updateTempalate)
// payment routes
router.get('/payment/callback', verifyTemplatePayment)
router.get('/payment/frontend-check', verifyTemplaterPaymentForFrontend)

module.exports = router 
