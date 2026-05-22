const express = require('express');
const { registerMerchant, getAllMerchant, getMerchantById, changeMerchantStatus, deleteMerchantById, getMerchantByAccountId } = require('../../controllers/merchant.controller');
const upload = require('../../config/multer.config');

const router = express.Router()

// merchant routes
router.post('/register', upload.single('identityCard'), registerMerchant)
router.get('/get-all', getAllMerchant)
router.get('/get/:merchantId', getMerchantById)
router.delete('/delete/:merchantId', deleteMerchantById)
router.put('/updateStatus/:merchantId', changeMerchantStatus)
router.get('/getby-account/:accountId', getMerchantByAccountId)


module.exports = router 
