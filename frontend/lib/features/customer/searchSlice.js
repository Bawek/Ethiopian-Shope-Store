import { createSlice } from "@reduxjs/toolkit";
const searchSlice = createSlice({
    name: 'search',
    initialState: {
        name: '',
        location: '',
        price: '',
        shopName: ''
    },
    reducers: {
        setSearchedText: (state, action) => {
            // Update the search state with the provided payload
            return { ...state, ...action.payload };
        }
    }
});

export const { setSearchedText } = searchSlice.actions;
export const selectSearchedText = (state) => state.search; // Corrected selector to access 'search' from state
export default searchSlice.reducer;
