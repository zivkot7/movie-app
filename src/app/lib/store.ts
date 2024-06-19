import { configureStore } from "@reduxjs/toolkit";
import { TmdbApi } from "movie-app/Service/Movies";
import { movieFilterSlice } from "./movieFilter";

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
