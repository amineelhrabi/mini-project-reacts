import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
    updateColor(state, action) {
      if (state.user) {
        state.user.couleur = action.payload;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
});

export const { login, logout, updateColor } = userSlice.actions;

export default userSlice;
