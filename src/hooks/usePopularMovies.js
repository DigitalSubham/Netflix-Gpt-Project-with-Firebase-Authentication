import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addpopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const popularMovies = useSelector((store) => store.movies.popularMovies);

  useEffect(() => {
    if (!popularMovies) {
      getNowPlayingMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log("popular", json.results);
    dispatch(addpopularMovies(json.results));
  };
};

export default usePopularMovies;
