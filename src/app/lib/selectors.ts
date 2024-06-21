import { createSelector } from "reselect";

const selectMovieFilter = (state: RootState) => state.movieFilter;

export const selectFavorites = createSelector(
  [selectMovieFilter],
  (movieFilter) => movieFilter.favorites
);

export const selectFavoriteById = (favoriteId: number) =>
  createSelector([selectFavorites], (favorites) =>
    favorites.find((fav) => fav.id === favoriteId)
  );
