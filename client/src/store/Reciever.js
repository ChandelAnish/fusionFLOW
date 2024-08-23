import { createSlice } from "@reduxjs/toolkit";

const receiverSlice = createSlice({
  name: "receiver",
  initialState: null,
  reducers: {
    setReceiver: (store, action) => {
      return action.payload;
    },
  },
});

export const receiverSliceAction = receiverSlice.actions;
export default receiverSlice;