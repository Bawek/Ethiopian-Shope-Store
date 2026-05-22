const prisma = require("../config/db");
const httpError = require("../middlewares/httpError");

// Helper function to calculate totals
const calculateCartTotals = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return { totalItems, totalPrice };
};

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await prisma.cart.findUnique({
      where: { userId: userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Format the response to match frontend expectations
    const formattedItems = cart.items.map(item => ({
      id: item.id,
      productId: item.product.id,
      name: item.product.name,
      price: item.price,
      quantity: item.quantity,
      image: item.product.images
    }));

    const { totalItems, totalPrice } = calculateCartTotals(cart.items);

    res.json({
      items: formattedItems,
      totalItems,
      totalPrice
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity = 1 } = req.body;

    // Get product details
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId: userId },
      include: { items: true }
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          user: { connect: { id: userId } }
        },
        include: { items: true }
      });
    }

    // Check if item already exists in cart
    const existingItem = cart.items.find(item => item.productId === productId);

    let updatedCart;
    if (existingItem) {
      // Update quantity if item exists
      updatedCart = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + parseInt(quantity) },
        include: { product: true }
      });
    } else {
      // Add new item to cart
      updatedCart = await prisma.cartItem.create({
        data: {
          cart: { connect: { id: cart.id } },
          product: { connect: { id: productId } },
          quantity: parseInt(quantity),
          price: product.price
        },
        include: { product: true }
      });
    }

    // Get updated cart with all items
    const fullCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    const formattedItem = {
      id: updatedCart.id,
      cartId: cart.id,
      productId: updatedCart.product.id,
      name: updatedCart.product.name,
      price: updatedCart.price,
      quantity: updatedCart.quantity,
      image: updatedCart.product.images
    };

    const { totalItems, totalPrice } = calculateCartTotals(fullCart.items);

    res.status(200).json({
      ...formattedItem,
      totalItems,
      totalPrice
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.params;

    // Verify cart exists
    const cart = await prisma.cart.findUnique({
      where: { userId: userId },
      include: { items: true }
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Verify item exists in cart
    const itemToRemove = cart.items.find(item => item.id === itemId);
    if (!itemToRemove) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Remove the item
    await prisma.cartItem.delete({
      where: { id: itemId }
    });

    // Get updated cart
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    const { totalItems, totalPrice } = calculateCartTotals(updatedCart.items);

    res.status(200).json({
      itemId: itemId,
      totalItems,
      totalPrice
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    const { quantity } = req.body;
    // Verify cart exists
    const cart = await prisma.cart.findUnique({
      where: { userId: userId },
      include: { items: true }
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Verify item exists in cart
    const itemToUpdate = cart.items.find(item => item.id === itemId);
    console.log(itemToUpdate, 'update')
    if (!itemToUpdate) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    // Update quantity
    const updatedItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity: parseInt(quantity) },
      include: { product: true }
    });

    // Get updated cart
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    const { totalItems, totalPrice } = calculateCartTotals(updatedCart.items);

    res.status(200).json({
      id: updatedItem.id,
      productId: updatedItem.product.id,
      quantity: updatedItem.quantity,
      totalItems,
      totalPrice
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};