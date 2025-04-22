import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "./authAsync";

const initialState = {
  currentUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    loginSuccess(state, action) {
      state.currentUser = action.payload;
    },
    logoutSuccess(state) {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});

export const { setCurrentUser, logoutSuccess, loginSuccess } =
  authSlice.actions;

export default authSlice.reducer;
