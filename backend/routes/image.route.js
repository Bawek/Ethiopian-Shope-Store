const express = require('express');
const { uploadImage } = require('../controllers/image.controller');
const upload = require('../config/multer.config');

const router = express.Router()

// Account routes
router.post('/upload', upload.fields([{ name: 'files', maxCount: 1 }]), uploadImage)
module.exports = router 
