import { configureStore} from "@reduxjs/toolkit";
import blurbsSlice from "./Blurbs";

const store = configureStore({
    reducer:{
        blurbs:blurbsSlice.reducer
    }
})

export default store