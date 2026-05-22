import {
  fetchCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart
} from '@/lib/features/cart/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const userId = useSelector((state) => state.account.id)
  // Get current user ID (you might get this from auth context or store)
  const getUserId = () => {
    // Implement your own logic to get user ID
    return userId
  };

  const loadCart = async () => {
    const userId = getUserId();
    if (userId) {
      try {
        await dispatch(fetchCart(userId)).unwrap();
      } catch (error) {
        toast.error('Failed to do the operation. sorry tray again.')
        console.error('Failed to load cart:', error);
      }
    }
  };

  const addItemToCart = async (product) => {
    const userId = getUserId();
    // if (!userId) {
    //   console.warn('User not logged in');
    //   return;
    // }
    try {
      await dispatch(addToCart({ userId, product })).unwrap();
    } catch (error) {
      toast.error('Failed to do the operation. sorry tray again.')
      console.error('Failed to add item to cart:', error);
    }
  };

  const removeItemFromCart = async (itemId) => {
    const userId = getUserId();
    console.log('itemId,', itemId)
    try {
      await dispatch(removeFromCart({ userId, itemId })).unwrap();
    } catch (error) {
      toast.error('Failed to do the operation. sorry tray again.')

      console.error('Failed to remove item from cart:', error);
    }
  };

  const updateItemQuantity = async (itemId, quantity) => {
    if (quantity < 1) {
      await removeItemFromCart(itemId);
      return;
    }
    const userId = getUserId();
    try {
      await dispatch(updateCartItem({ userId, itemId, quantity })).unwrap();
    } catch (error) {
      toast.error('Failed to do the operation. sorry tray again.')

      console.error('Failed to update item quantity:', error);
    }
  };

  const emptyCart = () => {
    dispatch(clearCart());
  };

  // Calculate cart summary
  const cartSummary = {
    totalItems: cart.totalItems,
    totalPrice: cart.totalPrice,
    itemCount: cart.items.length,
    isCartEmpty: cart.items.length === 0
  };

  return {
    cart: cart.items,
    ...cartSummary,
    isLoading: cart.status === 'loading',
    error: cart.error,
    loadCart,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    emptyCart
  };
};

export default useCart;