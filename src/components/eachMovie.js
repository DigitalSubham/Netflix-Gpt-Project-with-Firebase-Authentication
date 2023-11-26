import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_OPTIONS, IMG_CDN_URL } from "../utils/constants";

const EachMovie = () => {
  const [eachMovieData, setEachMovieData] = useState("");
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    async function getEachMovieData() {
      const data = await fetch(
        ` https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        API_OPTIONS
      );
      const json = await data.json();
      console.log(json);
      setEachMovieData(json);
    }
    getEachMovieData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl">{eachMovieData.title}</h1>
      <p>{eachMovieData.tagline}</p>
      <p>{eachMovieData.overview}</p>
      <p>{eachMovieData.release_date}</p>
      <p>{eachMovieData.status}</p>
      <img src={IMG_CDN_URL + eachMovieData.poster_path} />
    </div>
  );
};

export default EachMovie;
