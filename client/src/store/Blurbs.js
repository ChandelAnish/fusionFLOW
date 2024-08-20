import { createSlice } from "@reduxjs/toolkit";

const blurbsSlice = createSlice({
  name: "blurbs",
  initialState: [
    // {
    //   id: 1,
    //   imgurl: "/fusionFLOW-logo.png",
    //   title: "Trip to US",
    //   description:
    //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima esse hic animi nam illum eiu adipisci quasi sapiente tenetur quisquam?",
    //   postedAt: 2,
    // }
  ],
  reducers: {
    addInitialBlurbs: (store, action) => {
      return action.payload;
    },
  },
});

export const blurbsSliceAction = blurbsSlice.actions;
export default blurbsSlice;
