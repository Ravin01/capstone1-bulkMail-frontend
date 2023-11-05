import { createSlice } from '@reduxjs/toolkit';

const reduxSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    mailsCount : (state,action) => {
        return action.payload
    }
  },
});

export const { mailsCount } = reduxSlice.actions;
export default reduxSlice.reducer;


