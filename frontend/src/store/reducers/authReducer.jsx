// authReducer.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state for authentication
const initialState = {
  isLoggedIn: false,  // Track if a user or admin is logged in
  userType:null,       // "user" or "admin"
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userType = action.payload;  // "user" or "admin"
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userType = null
    },
  },
});

// Export the actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
