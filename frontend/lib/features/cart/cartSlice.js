import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '@/lib/apiConfig';
export const baseUrl = API_URL;
// Async Thunks for API operations
export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId) => {
  const response = await axios.get(`${baseUrl}/cart/${userId}`);
  return response.data;
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ userId, product }) => {
  console.log('✅ Database connected successfully')
  if (userId) {
    const response = await axios.post(`${baseUrl}/cart/${userId}/add`, product);
    console.log(response, 'add cart response')
    return response.data;
  }
  return product
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async ({ userId, itemId }) => {
  console.log(itemId, 'deleted one ')
  if (userId) {
    await axios.delete(`${baseUrl}/cart/${userId}/remove/${itemId}`);
    return itemId;
  }

  return itemId
});

export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ userId, itemId, quantity }) => {
  console.log(userId, quantity, itemId, 'seekkk it')
  if (userId) {
    const response = await axios.post(`${baseUrl}/cart/${userId}/update/${itemId}`, { quantity });
    console.log(response, 'on the update')
    return { itemId: response.data.id ,quantity:response.data.quantity,cartId:response.data.cartId};
  }
  return {
    itemId,
    quantity
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearCart(state) {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
        state.totalItems = action.payload.totalItems;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const existingItem = state.items.find(item => item.productId === action.payload.productId);
        if (existingItem) {
          existingItem.quantity += action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
        state.totalItems += action.payload.quantity;
        state.totalPrice += action.payload.price * action.payload.quantity;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const removedItem = state.items.find(item => item.id === action.payload);
        if (removedItem) {

          state.totalItems -= removedItem.quantity;
          state.totalPrice -= removedItem.price * removedItem.quantity;
          state.items = state.items.filter(item => item.id !== action.payload);
        }

      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const item = state.items.find(item => item.id === action.payload.itemId);
        if (item) {
          state.totalItems += action.payload.quantity - item.quantity;
          state.totalPrice += (action.payload.quantity - item.quantity) * item.price;
          item.quantity = action.payload.quantity;
        }
      })

  }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;