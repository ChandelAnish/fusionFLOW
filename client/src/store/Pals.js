import { createSlice } from "@reduxjs/toolkit";

const palsSlice = createSlice({
  name: "pals",
  initialState: [],
  reducers: {
    addInitialPals: (store, action) => {
      return action.payload;
    },
  },
});

export const palsSliceAction = palsSlice.actions;
export default palsSlice;
