import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    name: "",
    email: "",
    password: "",
    isSuper: 0,
  },
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginAdmin: (state, action) => {
      state.value.name = action.payload.name;
      state.value.email = action.payload.email;
      state.value.isSuper = action.payload.isSuper;
    },
    logoutAdmin: (state) => {
      state.value.name = "";
      state.value.email = "";
      state.value.isSuper = 0;
    },
  },
});

export const { loginAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
