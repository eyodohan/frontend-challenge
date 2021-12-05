import { createSlice } from "@reduxjs/toolkit";

export const mission = createSlice({
  name: "mission",
  initialState: {
    isLoggedIn: false,
    userData: {},
  },
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      localStorage.removeItem("auth");
      state.isLoggedIn = false;
      state.userData = {};
    },
  },
});

export const { login, logout } = auth.actions;

export default auth.reducer;
