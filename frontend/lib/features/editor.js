// editorSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Grapesjs from "grapesjs";
// import dynamicConfig from "../../app/[locale]/components/sitebuilder/WithGrapesjs"; // Ensure this path is correct
import dynamicConfig from '../../app/components/sitebuilder/WithGrapesjs'
// Async thunk for initializing the GrapesJS editor
export const initEditor = createAsyncThunk(
  "editor/init",
  async (_, { rejectWithValue }) => {
    try {
      const editor = await Grapesjs.init(dynamicConfig());
      return editor;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const editorSlice = createSlice({
  name: "editor",
  initialState: {
    editorInstance: null,
    status: "idle",
    error: null,
  },
  reducers: {
    // Additional reducers can be defined here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(initEditor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(initEditor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.editorInstance = action.payload;
      })
      .addCase(initEditor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { actions, reducer } = editorSlice;

export default reducer;
