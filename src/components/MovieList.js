import React from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6">
      <h2 className="text-lg md:text-3xl text-white py-4">{title}</h2>
      <div className="flex overflow-x-hidden hover:overflow-x-scroll scrollbar-hide">
        <div className="flex">
          {movies?.map((movie) => {
            return (
              <Link key={movie.id} to={"/" + movie.id}>
                <MovieCard posterPath={movie.poster_path} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
