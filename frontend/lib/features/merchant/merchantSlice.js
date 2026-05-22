import { createSlice } from "@reduxjs/toolkit";

// merchantSlice.js
const initialState = {
    currentMerchant: null,
};

const merchantSlice = createSlice({
    name: 'merchant',
    initialState,
    reducers: {
        setCurrentMerchant: (state, action) => {
            state.currentMerchant = action.payload;
        },
    },
});

export const { setCurrentMerchant } = merchantSlice.actions;
export default merchantSlice.reducer;
