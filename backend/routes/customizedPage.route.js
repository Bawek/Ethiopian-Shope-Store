const express = require('express');
const { createCustomPage, getCustomPagesByTemplate, getCustomPageById, updateCustomPage, deleteCustomPage } = require('../controllers/customizedPage');
const router = express.Router();

// Create a new custom page
router.post('/create', createCustomPage);

// Get all custom pages for a template
router.get('/get-by-template/:merchantTemplateId', getCustomPagesByTemplate);

// Get a single custom page
router.get('/get-by-id/:id', getCustomPageById); 

// Update a custom page
router.put('/update/:id', updateCustomPage);

// Delete a custom page
router.delete('/delete/:id', deleteCustomPage);

module.exports = router;