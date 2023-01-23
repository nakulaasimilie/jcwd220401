import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import loanSlice from "./loanSlice";
import adminSlice from "./adminSlice";

export const store = configureStore({
  reducer: {
    userSlice,
    productSlice,
    cartSlice,
    adminSlice,
    loanSlice,
  },
});
