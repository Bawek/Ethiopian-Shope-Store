import { createSlice } from '@reduxjs/toolkit';

const currentPageIdSlice = createSlice({
    name: 'PageId',
    initialState: {
        id: '1'
    },
    reducers: {
        setCurrentPage: (state, action) => {
            return { ...action.payload }; // Ensures state is properly updated
        },
    },
});

export const { setCurrentIdPage } = currentPageIdSlice.actions;
export default currentPageIdSlice.reducer;
