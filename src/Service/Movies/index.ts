import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const BEARER_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN;

export const TmdbApi: any = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (header) => {
      header.set("Authorization", `Bearer ${BEARER_TOKEN}`);
      return header;
    },
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query<Movie[], void>({
      query: () => "movie/popular",
    }),
    getNowPlayingMovies: builder.query<Movie[], void>({
      query: () => "movie/now_playing",
    }),
    getTopRatedMovies: builder.query<Movie[], void>({
      query: () => "movie/top_rated",
    }),
    getGenresMovies: builder.query<Genre[], void>({
      query: () => "genre/movie/list",
    }),
    getGenresTv: builder.query<Genre[], void>({
      query: () => "genre/tv/list",
    }),
    getMovies: builder.query<Movie[], { genres: number[]; page?: number }>({
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
    getTv: builder.query<Movie[], { genres: number[]; page?: number }>({
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
    getSingleMovie: builder.query<Movie, { id: string }>({
      query: (id) => {
        return {
          url: `movie/${id}`,
        };
      },
    }),
    getSingleTv: builder.query<Movie, { id: number }>({
      query: (id) => {
        return {
          url: `tv/${id}`,
        };
      },
    }),
    getSearch: builder.query<SearchResult, { query: string; page?: number }>({
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
