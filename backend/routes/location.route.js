const express = require('express');
const { locationRegistration } = require('../controllers/location.controller');

const router = express.Router()

// merchant routes
router.post('/register', locationRegistration)


module.exports = router 
