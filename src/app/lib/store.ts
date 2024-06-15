import { configureStore } from "@reduxjs/toolkit";
import { TmdbApi } from "movie-app/Service/Movies";

export const makeStore = () => {
  return configureStore({
    reducer: { [TmdbApi.reducerPath]: TmdbApi.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(TmdbApi.middleware),
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
