import { createSlice } from "@reduxjs/toolkit";

const detailUserSlice = createSlice({
    name: "userDetail",
    initialState: {
        id: null, 
    },

    reducers: {
        saveId: (state, action) => {
            state.data = action.payload;
        },
    }
})

export const userDetail = (state) => state.userDetail;
export const { saveId } = detailUserSlice.actions;
export default detailUserSlice.reducer;