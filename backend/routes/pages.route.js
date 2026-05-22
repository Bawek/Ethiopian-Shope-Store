const express = require('express');
const { registerPage, getAllPage, updatePage, getById, deletePageById, getPagesByTemplate, getAllCustomPage } = require('../controllers/pages.controller');

const router = express.Router()

// Account routes
router.post('/register', registerPage) 
router.get('/get-all', getAllPage)
router.get('/get-all-custom', getAllCustomPage)
router.put('/update/:pageId', updatePage)   
router.get('/get/:pageId', getById)   
router.get('/get-by-template/:templateId', getPagesByTemplate)  
router.delete('/delete/:pageId', deletePageById)  
module.exports = router 
