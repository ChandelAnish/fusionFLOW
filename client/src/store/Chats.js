import { createSlice } from "@reduxjs/toolkit";

const chatsSlice = createSlice({
  name: "chats",
  initialState: [
    // {
    //   id: 1,
    //   sender: "rahul",
    //   reciver: "anish",
    //   msg: "hey anish",
    //   time: "yesterday 12:05",
    // },
    // {
    //   id: 2,
    //   sender: "anish",
    //   reciver: "rahul",
    //   msg: "hey rahul",
    //   time: "yesterday 12:05",
    // },
  ],
  reducers: {
    addInitialChats: (store, action) => {
      // console.log(action.payload)
      return action.payload;
    },

    sendChat: (store, action) => {

      // const patchMessage = async (chat) => {
      //   try {
      //     const response = await fetch(
      //       `${import.meta.env.VITE_SERVER_URL}/chats`,
      //       {
      //         method: 'PATCH',
      //         headers: {
      //           'Content-type': 'application/json'
      //         },
      //         credentials:"include",
      //         body: JSON.stringify(chat)
      //       }
      //     );
      //     const data = await response.json();

      //     // for logged out user
      //     if (data.signin) {
      //       window.open("/signin", "_parent");
      //       return {};
      //     }

      //     // console.log(data);
      //   } catch (error) {
      //     console.log("error occurred : ", error);
      //     return {};
      //   }
      // };
      // patchMessage(action.payload)

      return [...store, action.payload];
    },

    receiveChat :(store,action)=>{
      return [...store, action.payload];
    }
  },
});

export const chatsSliceAction = chatsSlice.actions;
export default chatsSlice;
