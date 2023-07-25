import { configureStore } from "@reduxjs/toolkit";
import youtubeApiReducer from "./youtubeApiSlice";

export const store = configureStore({
  reducer: {
    youtubeApi: youtubeApiReducer,
  },
});