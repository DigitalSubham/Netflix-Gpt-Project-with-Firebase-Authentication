import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6">
      <h2 className="text-lg md:text-3xl text-white py-4">{title}</h2>
      <div className="flex overflow-x-hidden hover:overflow-x-scroll scrollbar-hide">
        <div className="flex">
          {movies?.map((movie) => {
            return (
              <MovieCard
                key={movie?.id}
                id={movie?.id}
                posterPath={movie.poster_path}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
