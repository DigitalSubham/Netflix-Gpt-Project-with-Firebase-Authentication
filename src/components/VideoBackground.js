import React from "react";

import { useSelector } from "react-redux";
import useTrailerVideo from "../hooks/useTrailerVideo";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  const playVideo = useSelector((store) => store.movies?.play);
  useTrailerVideo(movieId);

  return (
    <div className="w-screen mt-4 md:mt-0">
      <iframe
        className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?&autoplay=" +
          playVideo +
          "&mute=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
