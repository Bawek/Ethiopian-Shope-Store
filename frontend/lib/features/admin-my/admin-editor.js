import { createSlice } from '@reduxjs/toolkit';

const AdminEditorSlice = createSlice({
    name: 'AdminEditor',
    initialState: {
        name: 'Default Sample',
        id: "section-1",
        html: "<p>This is a default section. You can add more sections.</p>",
        css: "body{color:red}",
        js: ''
    },
    reducers: {
        setAdminEditor: (state, action) => {
            state = action.payload
        },
    },
});

export const { setAdminEditor } = AdminEditorSlice.actions;

export default AdminEditorSlice.reducer;