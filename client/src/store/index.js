import { configureStore} from "@reduxjs/toolkit";
import blurbsSlice from "./Blurbs";
import chatsSlice from "./Chats";
import palsSlice from "./Pals";
import userDetailsSlice from "./UserDetails";

const store = configureStore({
    reducer:{
        blurbs:blurbsSlice.reducer,
        chats:chatsSlice.reducer,
        pals:palsSlice.reducer,
        userDetails:userDetailsSlice.reducer
    }
})

export default store