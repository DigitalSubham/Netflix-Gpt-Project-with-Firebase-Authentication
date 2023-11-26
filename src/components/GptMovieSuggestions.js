import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const gptMovieSuggestion = useSelector((store) => store.gpt);
  const { movieNames, movieResults } = gptMovieSuggestion;
  if (!movieNames) return null;
  return (
    <div className="p-4 m-4 bg-black bg-opacity-90">
      <div>
        {movieNames.map((movieName, i) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[i]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
