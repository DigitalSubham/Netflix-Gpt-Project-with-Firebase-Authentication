import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    upcomingMovies: null,
    trailerVideo: null,
    play: 0,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addpopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    play: (state) => {
      state.play = state.play === 0 ? 1 : 0; // Toggle between 0 and 1
    },
  },
});

export default moviesSlice.reducer;
export const {
  addNowPlayingMovies,
  addpopularMovies,
  addUpcomingMovies,
  addTrailerVideo,
  play,
} = moviesSlice.actions;
