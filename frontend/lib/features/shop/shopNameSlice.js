import { createSlice } from '@reduxjs/toolkit';

const shopNameSlice = createSlice({
  name: 'shopName',
  initialState: '',
  reducers: {
    setShopName: (state, action) => {
      return action.payload; // Directly set the state to the payload
    },
  },
});

export const { setShopName } = shopNameSlice.actions;

export default shopNameSlice.reducer;