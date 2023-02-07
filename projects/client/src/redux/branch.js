import { createSlice } from "@reduxjs/toolkit";

export const branchSlice = createSlice({
  name: "branch",
  initialState: {
    value: [],
  },
  reducers: {
    syncBranch: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { syncBranch } = branchSlice.actions;

export default branchSlice.reducer;
