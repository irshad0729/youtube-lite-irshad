import { createSlice } from "@reduxjs/toolkit";
import { fetchDataFromApi } from "../utils/api";

const initialState = {
  loading: false,
  searchResults: false,
  selectCategories: "New",
  mobileMenu: false,
};

export const youtubeApiSlice = createSlice({
  name: "youtubeApi",
  initialState,
  reducers: {
    updateApi: (state, action) => {
      //   state.value = action.payload;
      console.log("redux store action.payload", action.payload);
      const { query, mobileMenu, contents, loading } = action.payload;
      state.loading = loading;
      state.searchResults = contents;
      state.selectCategories = query;
      state.mobileMenu = mobileMenu;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMobileMenu: (state, action) => {
      state.mobileMenu = action.payload;
    },
    setSelectCatergories: (state, action) => {
      state.selectCategories = action.payload;
        
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, updateApi, setMobileMenu, setSelectCatergories } =
  youtubeApiSlice.actions;

export default youtubeApiSlice.reducer;
