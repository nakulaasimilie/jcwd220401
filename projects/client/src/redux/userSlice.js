import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: 0,
    name: "",
    email: "",
    password: "",
    phone_number: "",
    RoleId: "",
    profile_picture_url: "",
    gender: "",
    birthdate: "",
    addressFill: "",
    city: "",
    province: "",
    detail: "",
    district: "",
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
      state.value.RoleId = action.payload.RoleId;
      state.value.profile_picture_url = action.payload.profile_picture_url;
      state.value.gender = action.payload.gender;
      state.value.birthdate = action.payload.birthdate;
      state.value.addressFill = action.payload.addressFill;
      state.value.city = action.payload.city;
      state.value.province = action.payload.province;
      state.value.detail = action.payload.detail;
      state.value.district = action.payload.district;
      state.value.cart = action.payload.cart;
    },
    logout: state => {
      state.value.id = "";
      state.value.name = "";
      state.value.email = "";
      state.value.phone_number = "";
      state.value.RoleId = "";
      state.value.profile_picture_url = "";
      state.value.gender = "";
      state.value.birthdate = "";
    },
    addCart: state => {
      state.value.cart += 1;
    },
    deleteCart: state => {
      state.value.cart -= 1;
    },
    updateUser: (state, action) => {
      state.value.email = action.payload.email;
      state.value.name = action.payload.email;
      state.value.gender = action.payload.gender;
      state.value.birthdate = action.payload.birthdate;
    },
  },
});

export const { login, logout, addCart, deleteCart, updateUser } =
  userSlice.actions;

export default userSlice.reducer;
