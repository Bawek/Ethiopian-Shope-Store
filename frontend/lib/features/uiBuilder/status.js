import { createSlice } from '@reduxjs/toolkit';

const pageStatusSlice = createSlice({
  name: 'pageStatus',
  initialState: {
    status: 'preview', // Default status
    pageName: '', // Page name will be empty initially
  },
  reducers: {
      setStatus: (state, action) => {
          console.log(action.payload)
      state.status = action.payload;
    },
    setPageName: (state, action) => {
      state.pageName = action.payload;
    },
  },
});

export const { setStatus, setPageName } = pageStatusSlice.actions;

export default pageStatusSlice.reducer;
