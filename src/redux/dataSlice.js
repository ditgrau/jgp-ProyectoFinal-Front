import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: "auth",
    initialState: {
        data: null, 
        token: null,
    },

    reducers: {
        saveUser: (state, action) => {
            state.data = action.payload;
        },
        saveToken: (state, action) => {
            state.token = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.data = null
        }
    }
})

export const userData = (state) => state.auth;
export const { saveUser , saveToken , logout } = dataSlice.actions;
export default dataSlice.reducer;