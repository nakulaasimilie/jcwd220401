import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import loanSlice from "./loanSlice";
import adminSlice from "./adminSlice";
import listSlice from "./listSlice";
import nameSlice from "./nameSlice";
import addressSlice from "./addressSlice";
import loanAdminSlice from "./loanAdminSlice";
import categorySlice from "./categorySlice";
import locationSlice from "./location";

export const store = configureStore({
  reducer: {
    userSlice,
    productSlice,
    cartSlice,
    adminSlice,
    loanSlice,
    addressSlice,
    listSlice,
    nameSlice,
    loanAdminSlice,
    categorySlice,
    locationSlice,
  },
});
