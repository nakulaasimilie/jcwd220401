import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    value: {},
  },
  reducers: {
    syncLocation: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { syncLocation } = locationSlice.actions;

export default locationSlice.reducer;
