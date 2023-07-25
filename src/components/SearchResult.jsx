import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api";
import LeftNav from "./LeftNav";
import SearchResultVideoCard from "./SearchResultVideoCard";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/youtubeApiSlice";

const SearchResult = () => {
  const [result, setResult] = useState();
  const { searchQuery } = useParams();
  const dispatch = useDispatch();
  const { loading, searchResults, selectCategories, mobileMenu } = useSelector(
    (state) => state.youtubeApi
  );
  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    fetchSearchResults();
  }, [searchQuery]);

  const fetchSearchResults = () => {
    dispatch(setLoading(true));
    fetchDataFromApi(`search/?q=${searchQuery}`).then((res) => {
      setResult(res?.contents);
      setLoading(false);
    });
  };

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 gap-2 p-5">
          {result?.map((item) => {
            if (item?.type !== "video") return false;
            let video = item.video;
            return <SearchResultVideoCard key={video.videoId} video={video} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
