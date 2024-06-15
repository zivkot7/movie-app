import axios from "axios";


export const TMDB_BASE_URL = "https://www.themoviedb.org";
export const TMDB_API_BASE_URL = "https://api.themoviedb.org";
export const TMDB_API_KEY = process.env.MOVIE_APP_TMDB_API_KEY;
export const TMDB_API_READ_ACCESS_TOKEN =
  process.env.MOVIE_APP_TMDB_API_READ_ACCESS_TOKEN;

const axiosInstance = axios.create({
  baseURL: TMDB_API_BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: `Bearer ${TMDB_API_READ_ACCESS_TOKEN}`,
    "x-api-key": "b95c2ea53705babcc9f6121ef8f248ad",
  },
});

export default axiosInstance;
