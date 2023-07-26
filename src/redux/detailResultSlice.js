import { createSlice } from "@reduxjs/toolkit";

const detailResultSlice = createSlice({
    name: "resultDetail",
    initialState: {
        id: null, 
    },

    reducers: {
        saveId: (state, action) => {
            state.data = action.payload;
        },
    }
})

export const resultDetail = (state) => state.resultDetail;
export const { saveId } = detailResultSlice.actions;
export default detailResultSlice.reducer;