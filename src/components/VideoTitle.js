import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { play } from "../utils/moviesSlice";

const VideoTitle = ({ title, overview }) => {
  const [showdes, setShowDes] = useState(false);
  const dispatch = useDispatch();

  const handleShowDes = () => {
    setShowDes(!showdes);
  };
  const handlePlay = () => {
    dispatch(play());
  };

  return (
    <div className=" w-screen aspect-video pt-[15%] px-6 md:px-24  absolute bg-gradient-to-r from-transparent text-white">
      <h1 className="hidden md:block text-2xl md:text-6xl mb-6 font-bold">
        {title}
      </h1>
      {showdes && <p className=" pb-4 text-lg w-1/3">{overview}</p>}
      <div className="my-4 md:m-0">
        <button
          onClick={handlePlay}
          className="bg-white text-black py-1 md:py-4 px-3 md:px-12 text-xl font-bold rounded-lg hover:opacity-75 hidden md:inline-block "
        >
          ▶️ Play
        </button>
        <button
          onClick={handleShowDes}
          className="bg-gray-400 text-white p-4 px-12 text-xl font-bold rounded-lg bg-opacity-75 mx-2 hidden md:inline-block"
        >
          ⌽ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
