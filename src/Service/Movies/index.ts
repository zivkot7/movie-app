import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TMDB_API_BASE_URL } from "../axois";

export const TmdbApi: any = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${TMDB_API_BASE_URL}/3/`,
    prepareHeaders: (header) => {
      header.set(
        "Authorization",
        `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTVjMmVhNTM3MDViYWJjYzlmNjEyMWVmOGYyNDhhZCIsInN1YiI6IjY2NjVhYzdlMjEyNDA4ZjYxZjUzMWQ3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2vdFfulYyDdGjauBpqnH7fVtH6T2sZ3fuE-3wldOrFA`
      );
      return header;
    },
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query<any, void>({
      query: () => "movie/popular",
    }),
    getNowPlayingMovies: builder.query<any, void>({
      query: () => "movie/now_playing",
    }),
    getTopRatedMovies: builder.query<any, void>({
      query: () => "movie/top_rated",
    }),
    getGenresMovies: builder.query<any, void>({
      query: () => "genre/movie/list",
    }),
    getGenresTv: builder.query<any, void>({
      query: () => "genre/tv/list",
    }),
    getMovies: builder.query<any, { genres: number[]; page?: number }>({
      query: ({ genres, page = 1 }) => {
        let params: any = { page };

        if (genres.length) {
          params.with_genres = genres.join(",");
        }
        return {
          url: "discover/movie",
          params,
        };
      },
    }),
    getTv: builder.query<any, { genres: number[]; page?: number }>({
      query: ({ genres, page = 1 }) => {
        let params: any = { page };

        if (genres.length) {
          params.with_genres = genres.join(",");
        }

        return {
          url: "discover/tv",
          params,
        };
      },
    }),
    getSingleMovie: builder.query<any, { id: string }>({
      query: (id) => {
        return {
          url: `movie/${id}`,
        };
      },
    }),
    getSingleTv: builder.query<any, { id: number }>({
      query: (id) => {
        return {
          url: `tv/${id}`,
        };
      },
    }),
    getSearch: builder.query<any, { query: string; page?: number }>({
      query: ({ query, page = 1 }) => {
        return {
          url: `search/multi?query=${query}&language=en-US&page=${page}`,
        };
      },
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetGenresMoviesQuery,
  useGetGenresTvQuery,
  useGetMoviesQuery,
  useGetTvQuery,
  useGetSingleMovieQuery,
  useGetSingleTvQuery,
  useGetSearchQuery,
} = TmdbApi;
