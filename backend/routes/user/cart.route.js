// routes/cartRoutes.js

const express = require('express');
const { getCart, addToCart, removeFromCart, updateCartItem } = require('../../controllers/cart.controller');
const router = express.Router();

// Get user's cart
router.get('/:userId', getCart);

// Add item to cart 
router.post('/:userId/add', addToCart);

// Remove item from cart
router.delete('/:userId/remove/:itemId', removeFromCart);

// Update cart item quantity
router.post('/:userId/update/:itemId', updateCartItem);

module.exports = router;