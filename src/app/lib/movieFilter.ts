import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieType: ["film", "tv"],
  selectedGenresMovie: [],
  selectedGenresTv: [],
  currentPageMovies: 1,
  currentPageTv: 1,
  favorites: JSON.parse(localStorage.getItem("favorites") as string) ?? [],
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
    setFavorites: (state, { payload }) => {
      const exists = state.favorites.some(
        (movie: Movie) => movie.id === payload.id
      );

      if (exists) {
        state.favorites = state.favorites.filter(
          (movie: Movie) => movie.id !== payload.id
        );
      } else {
        state.favorites.push(payload);
      }

      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});

export const {
  setMovieType,
  setSelectedGenresMovie,
  setSelectedGenresTv,
  setCurrentPageMovies,
  setCurrentPageTv,
  setFavorites,
} = movieFilterSlice.actions;
export default movieFilterSlice.reducer;
