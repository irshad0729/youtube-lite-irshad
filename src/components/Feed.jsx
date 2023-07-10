import React, { useContext, useState, useEffect } from "react";
import LeftNav from "./LeftNav";
import { Context } from "../context/contextApi";
const Feed = () => {
  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
    </div>
  );
};

export default Feed;
