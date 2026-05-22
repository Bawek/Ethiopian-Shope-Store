import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name: "account",
    initialState: { email: null, firestName: null, accessToken: null, role: null, id: null, profileUrl: null },
    reducers: {
        setCredential: (state, action) => {
            const { email, firestName, accessToken, role, id } = action.payload;
            return action.payload
        },
        logOut: (state) => {
            state.email = null;
            state.accessToken = null;
            state.firestName = null
            state.role = null
            state.id = null
            state.profileUrl = null
        },
    },
});

export const { logOut, setCredential } = accountSlice.actions;

// Correct selectors to access the state
export const selectCurrentUser = (state) => state.account.userName;
export const selectCurrentToken = (state) => state.account.accessToken;
export const selectAll = (state) => (state) => state.account;

export default accountSlice.reducer;
