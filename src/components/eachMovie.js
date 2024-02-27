import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_OPTIONS } from "../utils/constants";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import MovieReviews from "./MovieReviews";
import MovieStory from "./movieStory";

const EachMovie = () => {
  const [eachMovieData, setEachMovieData] = useState("");
  const playVideo = useSelector((store) => store.movies?.play);
  const [video, setVideo] = useState("");
  const params = useParams();
  const { movieId } = params;

  useEffect(() => {
    async function getEachMovieData() {
      const data = await fetch(
        ` https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        API_OPTIONS
      );
      const json = await data.json();
      // console.log(json);
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
      // console.log(json);

      // const filterData = json.results.filter(
      //   (video) =>
      //     video.type === "Trailer" ||
      //     video.type === "Official Trailer" ||
      //     video.type === "Teaser" ||
      //     video.type === "Featurette" ||
      //     video.type.toLowerCase().includes("trailer")
      // );

      // console.log(filterData);

      setVideo(json.results[0]);
      // setVideo(filterData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" bg-black text-white ">
        <Navbar />
        <div className="w-screen aspect-video flex pt-16 pl-3  ">
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
        <div className="mx-6 ">
          <div className="flex">
            <h1 className="font-semiboldbold text-6xl">
              {eachMovieData.title}
            </h1>
            <div className="flex ml-5">
              {" "}
              <p className="px-2 mt-4 w-fit">{eachMovieData.status} on -</p>
              <p className=" px-2 mt-4 w-fit">{eachMovieData.release_date}</p>
            </div>
          </div>
          <div className="flex ml-[-15px] mt-6">
            {eachMovieData?.genres?.map((genre) => {
              return (
                <p
                  key={genre?.id}
                  className="rounded-full ml-2 px-4 py-2 bg-brand-charcoal "
                >
                  {genre?.name}
                </p>
              );
            })}
          </div>
          <p className="mt-2 w-[50%]">{eachMovieData.overview}</p>
        </div>
        <h2 className="text-2xl mx-6 mt-7 text-red-200">
          {" "}
          {eachMovieData.title} Movie Reviews form Youtube
        </h2>
        <MovieReviews movieName={eachMovieData.title} />
        <div className=" ">
          <h2 className="text-2xl mx-6 my-7 text-red-200">
            Movie Story - (Every info about movie {eachMovieData.title})
          </h2>
          <MovieStory movieName={eachMovieData.title} />
        </div>
      </div>
    </>
  );
};

export default EachMovie;
