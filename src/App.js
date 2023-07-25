import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Feed from "./components/Feed";
import SearchResult from "./components/SearchResult";
import VideoDetails from "./components/VideoDetails";
import { useState, useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { updateApi } from "./redux/youtubeApiSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const options = {
  method: "GET",

  params: {
    hl: "en",
    gl: "US",
  },
  headers: {
    "X-RapidAPI-Key": "f70e1e7469msh3e57ab355fde6aep16616djsn4859caafc631",
    "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
  },
};
function App() {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(false);
  const [selectCategories, SetSelectCatergories] = useState("New");
  const [mobileMenu, setMobileMenu] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchSelectedCategoriesData(selectCategories);
  }, [selectCategories]);

  const fetchSelectedCategoriesData = (query) => {
    console.log({ query });
    setLoading(true);
    fetchDataFromApi(`search/?q=${query}`).then(({ contents }) => {
      setSearchResults(contents);
      setLoading(false);
      dispatch(
        updateApi({
          query,
          mobileMenu,
          contents,
          loading,
        })
      );
    });
  };

  return (
      <BrowserRouter>
        <div className="flex flex-col h-full">
          <Header />
          <Routes>
            <Route path="/" exact element={<Feed />} />
            <Route
              path="searchResult/:searchQuery"
              element={<SearchResult />}
            />
            <Route path="/video/:id" element={<VideoDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
