import { createSlice } from "@reduxjs/toolkit";

const getMailsSlice = createSlice({
    name : 'getMailsCall',
    initialState : null,
    reducers : {
        getMailsApi : (state,action) =>{
            if(action.payload === true){
                return action.payload
            }
        }
    }
})

export const {getMailsApi} = getMailsSlice.actions
export default getMailsSlice.reducer