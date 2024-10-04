import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: null
};

export const roleSlice = createSlice({
    name : "role",
    initialState,
    reducers : {
        changeRole : (state,action)=>{
            state.role = action.payload;
        }
    }
})
export default roleSlice.reducer;
export const {changeRole} = roleSlice.actions;
