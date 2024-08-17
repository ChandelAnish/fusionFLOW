import { configureStore} from "@reduxjs/toolkit";
import blurbsSlice from "./Blurbs";
import chatsSlice from "./Chats";
import palsSlice from "./Pals";

const store = configureStore({
    reducer:{
        blurbs:blurbsSlice.reducer,
        chats:chatsSlice.reducer,
        pals:palsSlice.reducer
    }
})

export default store