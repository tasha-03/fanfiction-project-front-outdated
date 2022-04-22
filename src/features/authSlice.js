import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.token = action.payload.token;
    },
    logout: (state) => {
      state.user = {};
      state.token = null;
      localStorage.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
