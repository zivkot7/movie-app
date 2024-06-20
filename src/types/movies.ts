interface Movie {
  adult: boolean;
  media_type: string;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Genre {
  id: number;
  name: string;
}

interface MoviesResponse {
  results: Movie[];
}

interface GenresResponse {
  genres: Genre[];
}

interface Favorite {
  value: number;
  id: number;
  title: string;
  original_name?: string;
  type?: string;
  media_type?: string;
  poster_path: string;
  original_title?: string;
}

interface RootState {
  tmdbApi: {
    queries: {
      [key: string]: {
        status: string;
        data: {
          total_pages: number;
        };
      };
    };
  };
  movieFilter: {
    favorites: any[];
  };
}

interface SearchResult {
  id: number;
  title?: string;
  original_title?: string;
  original_name?: string;
  poster_path?: string;
  media_type: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
}
interface CachedData {
  status: string;
  data?: {
    total_pages: number;
  };
}
