import { configureStore } from "@reduxjs/toolkit";
import { movieFilterSlice } from "./movieFilter";
import { TmdbApi } from "movie-app/Service/Movies";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [TmdbApi.reducerPath]: TmdbApi.reducer,
      [movieFilterSlice.reducerPath]: movieFilterSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(TmdbApi.middleware),
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
