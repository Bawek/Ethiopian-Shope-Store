const express = require('express');
const { changeTemplate, getAllMerchantTemplates, getMerchantTemplateByDomain, getMerchantTemplateByAccount, getMerchantTemplateById } = require('../controllers/merchantTemplates.controller');


const router = express.Router()
router.get('/change-template/:id', changeTemplate)
router.get('/get-all', getAllMerchantTemplates)
router.get('/merchant-template/:domain', getMerchantTemplateByDomain)
router.get('/merchant-by-account/:accountId', getMerchantTemplateByAccount)
router.get('/get-merchantTemplates-byId/:id', getMerchantTemplateById)    

// Account routes
module.exports = router 
