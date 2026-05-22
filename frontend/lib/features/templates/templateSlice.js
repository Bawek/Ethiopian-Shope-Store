const { createSlice } = require("@reduxjs/toolkit");

const templateSlice = createSlice({
    name: 'selectedTemplate',
    initialState: {
        template: null,
    },
    reducers: {
        setSelectedTemplate: (state, action) => {
            state.template = action.payload;
        }
    }
});

export const { setSelectedTemplate } = templateSlice.actions;
export default templateSlice.reducer;
