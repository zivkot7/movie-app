import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieType: ["film", "tv"],
  selectedGenresMovie: [],
  selectedGenresTv: [],
  currentPageMovies: 1,
  currentPageTv: 1,
};

export const movieFilterSlice = createSlice({
  name: "movieFilter",
  initialState,

  reducers: {
    setMovieType: (state, { payload }) => {
      switch (payload.type) {
        case "MOVIE":
          state.movieType = ["movie"];
          break;
        case "TV":
          state.movieType = ["tv"];
          break;
        default:
          state.movieType = [];
          break;
      }
    },
    setSelectedGenresMovie: (state, { payload }) => {
      state.selectedGenresMovie = payload;
    },
    setSelectedGenresTv: (state, { payload }) => {
      state.selectedGenresTv = payload;
    },
    setCurrentPageMovies: (state, { payload }) => {
      state.currentPageMovies = payload;
    },
    setCurrentPageTv: (state, { payload }) => {
      state.currentPageTv = payload;
    },
  },
});

export const {
  setMovieType,
  setSelectedGenresMovie,
  setSelectedGenresTv,
  setCurrentPageMovies,
  setCurrentPageTv,
} = movieFilterSlice.actions;
export default movieFilterSlice.reducer;
