import { createSlice } from "@reduxjs/toolkit";

const detailEventSlice = createSlice({
    name: "eventDetail",
    initialState: {
        id: null, 
    },

    reducers: {
        saveId: (state, action) => {
            state.data = action.payload;
        },
    }
})

export const eventDetail = (state) => state.eventDetail;
export const { saveId } = detailEventSlice.actions;
export default detailEventSlice.reducer;