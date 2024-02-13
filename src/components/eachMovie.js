import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_OPTIONS, IMG_CDN_URL } from "../utils/constants";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { play } from "../utils/moviesSlice";

const EachMovie = () => {
  const [eachMovieData, setEachMovieData] = useState("");
  const playVideo = useSelector((store) => store.movies?.play);
  const dispatch = useDispatch();
  const [video, setVideo] = useState("");
  const params = useParams();
  const { movieId } = params;

  const handleSound = () => {
    dispatch(play());
  };

  useEffect(() => {
    async function getEachMovieData() {
      const data = await fetch(
        ` https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        API_OPTIONS
      );
      const json = await data.json();
      console.log(json);
      setEachMovieData(json);
    }
    getEachMovieData();
    fetchMovieVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMovieVideo = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          movieId +
          "/videos?language=en-US",
        API_OPTIONS
      );
      const json = await data.json();
      console.log(json);

      const filterData = json.results.filter(
        (video) =>
          video.type === "Trailer" ||
          video.type === "Official Trailer" ||
          video.type === "Teaser" ||
          video.type === "Featurette" ||
          video.type.toLowerCase().includes("trailer")
      );

      console.log(filterData);

      setVideo(json.results[0]);
      // setVideo(filterData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="hidden md:mt-[10px]  md:block">
        <Navbar />
        <div className="w-screen -mt-24 absolute aspect-video hidden md:block">
          <iframe
            className=""
            width="100%"
            height="100%"
            src={
              "https://www.youtube.com/embed/" +
              video?.key +
              `?autoplay=${playVideo}&mute=0`
            } //
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="absolute hidden md:block top-[0px] h-screen w-screen bg-gradient-to-r from-black">
        <div className="text-white absolute ml-14 top-[250px] ">
          <h1 className="font-semiboldbold text-6xl">{eachMovieData.title}</h1>
          <p className="mt-2 w-[60%]">{eachMovieData.overview}</p>
          <p className="mt-2 w-[60%]">{eachMovieData.release_date}</p>
          <p className="mt-2 w-[60%]">{eachMovieData.status}</p>
          <div className="flex ml-[-15px] mt-6">
            {eachMovieData?.genres?.map((genre) => {
              return (
                <p
                  key={genre?.id}
                  className="rounded-full ml-2 px-4 py-2 bg-brand-charcoal text-white"
                >
                  {genre?.name}
                </p>
              );
            })}
          </div>
          <button
            onClick={handleSound}
            className="bg-white text-black py-1 md:py-4 px-3 md:px-12 text-xl font-bold rounded-lg hover:opacity-75 hidden md:inline-block "
          >
            ▶️ Play
          </button>
        </div>
      </div>
      {/* MOBILE VIEW */}
      <div className="md:hidden ">
        <img
          className=" w-[90%] border-[1px] border-brand-beige mt-8 mx-auto rounded-xl"
          src={IMG_CDN_URL + eachMovieData?.poster_path}
          alt="movie poster"
        />

        <p className="text-sm text-left px-4 py-2 w-[90%] ml-5 mt-8  border-[1px] border-teal-200 rounded-lg text-white">
          {eachMovieData?.overview}
        </p>
        <div className="flex flex-wrap left-4 absolute top-5  mt-6">
          {eachMovieData?.genres?.map((genre) => {
            return (
              <p
                key={genre?.id}
                className="rounded-full m-2 px-4 py-2 bg-black text-white"
              >
                {genre?.name}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default EachMovie;
