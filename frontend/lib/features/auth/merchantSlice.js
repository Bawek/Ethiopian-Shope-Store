//create merchant slice
import { createSlice } from "@reduxjs/toolkit";
import { authSlice } from "./authMerchant";

export const merchantSlice = createSlice({
  name: "merchant",
  initialState: { merchant: null },
  reducers: {
    setMerchant: (state, action) => {
      state.merchant = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authSlice.endpoints.login.matchFulfilled,
      (state, action) => {
        state.merchant = action.payload;
      }
    );
    builder.addMatcher(
      authSlice.endpoints.register.matchFulfilled,
      (state, action) => {
        state.merchant = action.payload;
      }
    );
  },
});

export default merchantSlice.reducer;
export const { setMerchant } = merchantSlice.actions;
