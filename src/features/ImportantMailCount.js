import { createSlice } from "@reduxjs/toolkit";

const importantMailsCount = createSlice({
    name : 'importantMailsCount',
    initialState  : 0,
    reducers : {
        importantCount : (state,action) => {
            return action.payload
        }
    },
});

export const {importantCount} = importantMailsCount.actions;
export default importantMailsCount.reducer;