import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  promptForm: {},
  prompt2Form: {},
  shopName: "",
};

const formDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    setPromptFormData: (state, action) => {
      state.promptForm = { ...state.promptForm, ...action.payload };
    },
    setPrompt2FormData: (state, action) => {
      state.prompt2Form = { ...state.prompt2Form, ...action.payload };
    },
    setShopName: (state, action) => {
      console.log(action.payload);
      state.shopName = action.payload;
    },
  },
});

export const { setPromptFormData, setPrompt2FormData, setShopName } =
  formDataSlice.actions;

export default formDataSlice.reducer;
