import { configureStore} from "@reduxjs/toolkit";
import blurbsSlice from "./Blurbs";
import chatsSlice from "./Chats";

const store = configureStore({
    reducer:{
        blurbs:blurbsSlice.reducer,
        chats:chatsSlice.reducer
    }
})

export default store