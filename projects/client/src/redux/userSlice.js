import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: 0,
    name: "",
    email: "",
    phone_number: 0,
    profile_picture_url: "",
  },
};

const userSlice = createSlice({
  name: "counterSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.id = action.payload.id;
      state.value.name = action.payload.name;
      state.value.email = action.payload.email;
      state.value.phone_number = action.payload.phone_number;
      state.value.profile_picture_url = action.payload.profile_picture_url;
      state.value.cart = action.payload.cart;
    },
    logout: (state) => {
      // state.value.id = null;
      state.value.email = "";
    },
    addCart: (state) => {
      state.value.cart += 1;
    },
  },
});

export const { login, logout, addCart } = userSlice.actions;

export default userSlice.reducer;
