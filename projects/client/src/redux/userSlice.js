import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: null,
    email: "",
  },
};

export const userSlice = createSlice({
  name: "counterSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      // state.value.id = action.payload.id;
      state.value.email = action.payload.id;
    },
    logout: (state) => {
      // state.value.id = null;
      state.value.email = "";
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
