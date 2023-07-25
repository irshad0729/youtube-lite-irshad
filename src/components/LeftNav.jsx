import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import LeftNavMenuItem from "./LeftNavMenuItem";
import { categories } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectCatergories,
  setMobileMenu,
  updateApi,
} from "../redux/youtubeApiSlice";
import { fetchDataFromApi } from "../utils/api";
const LeftNav = () => {
  const { loading, searchResults, selectCategories, mobileMenu } = useSelector(
    (state) => state.youtubeApi
  );

  console.log("feed:", loading, searchResults, selectCategories, mobileMenu);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickHandler = async (name, type) => {
    console.log("click handler leftnavbar name type", name, type);

    let query = name;
    fetchDataFromApi(`search/?q=${query}`).then(({ contents }) => {
      switch (type) {
        case "category":
          return dispatch(updateApi({ query, mobileMenu, contents, loading }));
        case "home":
          return dispatch(updateApi({ query, mobileMenu, contents, loading }));
        case "menu":
          return false;
        default:
          break;
      }
    });
  };
  return (
    <div
      className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all ${
        mobileMenu ? "translate-x-2" : ""
      }`}
    >
      <div className="flex px-5 flex-col">
        {categories.map((item) => {
          return (
            <React.Fragment key={item.name}>
              <LeftNavMenuItem
                text={item.type === "home" ? "Home" : item.name}
                icon={item.icon}
                action={() => {
                  clickHandler(item.name, item.type);
                  navigate("/");
                }}
                className={`${
                  selectCategories === item.name ? "bg-white/[0.15]" : ""
                }`}
              />
              {item.divider && <hr className="my-5 broder-white/[0.2]" />}
            </React.Fragment>
          );
        })}
      </div>

      <hr className="my-5 broder-white/[0.2]" />
      <div className="text-white/[0.5] text-[12px]">Clone By Irshad</div>
    </div>
  );
};

export default LeftNav;
