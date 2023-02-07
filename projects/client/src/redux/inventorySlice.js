import { createSlice } from "@reduxjs/toolkit";

export const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    value: [],
  },
  reducers: {
    syncInventory: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { syncInventory } = inventorySlice.actions;

export default inventorySlice.reducer;
