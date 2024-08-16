import { createSlice } from "@reduxjs/toolkit";

const chatsSlice = createSlice({
  name: "chats",
  initialState: [
    {
      id: 1,
      sender: "rahul",
      reciver: "anish",
      msg: "hey anish",
      time: "yesterday 12:05",
    },
    {
      id: 2,
      sender: "anish",
      reciver: "rahul",
      msg: "hey rahul",
      time: "yesterday 12:05",
    },
  ],
  reducers: {
    addInitialChats: (store, action) => {
      return action.payload;
    },
    addChats: (store, action) => {
    //   store.push(action.payload)
    return [...store,action.payload]
    }
  },
});

export const chatsSliceAction = chatsSlice.actions;
export default chatsSlice;
