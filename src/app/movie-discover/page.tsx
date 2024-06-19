"use client";
import React from "react";
import styles from "movie-app/app/movie-discover/style.module.css";
import {
  useGetGenresMoviesQuery,
  useGetGenresTvQuery,
  useGetMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetTvQuery,
} from "movie-app/Service/Movies";
import MovieSection from "movie-app/components/MovieSection";
import Select from "movie-app/components/Inputs/Select";
import { Option } from "movie-app/types/components";
import useGenreIdByName from "movie-app/hooks/useGenreIdByName";
import { Button } from "movie-app/components/Button";
import Pagination from "movie-app/components/Pagination";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPageMovies,
  setCurrentPageTv,
  setMovieType,
  setSelectedGenresMovie,
  setSelectedGenresTv,
} from "../lib/movieFilter";

const MovieDiscover = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    movieTypes,
    selectedGenresMovie,
    selectedGenresTv,
    currentPageMovies,
    currentPageTv,
  } = useSelector((state: any) => ({
    movieTypes: state.movieFilter.movieType,
    selectedGenresMovie: state.selectedGenresMovie,
    selectedGenresTv: state.selectedGenresTv,
    currentPageMovies: state.currentPageMovies,
    currentPageTv: state.currentPageTv,
  }));

  const genreStringMovie =
    selectedGenresMovie.length > 0 ? selectedGenresMovie : "";
  const genreStringTv = selectedGenresTv.length > 0 ? selectedGenresTv : "";

  const { data: MovieGenres } = useGetGenresMoviesQuery();
  const { data: TvShowsGenres } = useGetGenresTvQuery();
  const { data: TopRatedMovies } = useGetTopRatedMoviesQuery();
  const { data: PopularMovies } = useGetPopularMoviesQuery();
  const { data: NowPlayingMovies } = useGetNowPlayingMoviesQuery();
  const isMovie = movieTypes.includes("movie");
  const isSerie = movieTypes.includes("tv");

  const { data: AllMovies, isFetching: isFetchingMovies } = useGetMoviesQuery(
    { genres: genreStringMovie, page: currentPageMovies },
    { skip: !isMovie }
  );

  const { data: AllTvShows, isFetching: isFetchingTvShows } = useGetTvQuery(
    { genres: genreStringTv, page: currentPageTv },
    { skip: !isSerie }
  );

  const horrorGenreId = useGenreIdByName("Horror");
  const actionGenreId = useGenreIdByName("Action");
  const crimeGenreId = useGenreIdByName("Crime");

  const { data: HorrorMovies, isLoading: horrorLoading } = useGetMoviesQuery(
    { genres: [horrorGenreId] },
    { skip: !horrorGenreId }
  );
  const { data: ActionMovies, isLoading: actionLoading } = useGetMoviesQuery(
    { genres: [actionGenreId] },
    { skip: !actionGenreId }
  );
  const { data: CrimeMovies, isLoading: crimeLoading } = useGetMoviesQuery(
    { genres: [crimeGenreId] },
    { skip: !crimeGenreId }
  );

  const optionsMovie: Option<number>[] =
    MovieGenres?.genres.map((genre: Genre) => ({
      value: genre.id,
      label: genre.name,
    })) || [];

  const optionsTvShow: Option<number>[] =
    TvShowsGenres?.genres.map((genre: Genre) => ({
      value: genre.id,
      label: genre.name,
    })) || [];

  const handleGenreChange = (
    value: number | number[],
    type: "movies" | "tvShows"
  ) => {
    if (type === "movies") {
      if (typeof value === "number") {
        dispatch(setSelectedGenresMovie([value]));
      } else {
        dispatch(setSelectedGenresMovie(value));
      }
    } else if (type === "tvShows") {
      if (typeof value === "number") {
        dispatch(setSelectedGenresTv([value]));
      } else {
        dispatch(setSelectedGenresTv(value));
      }
    }
  };

  const handleHeaderButtonClick = (type: string) => {
    switch (type) {
      case "home":
        dispatch(setMovieType({}));
        break;
      case "movies":
        dispatch(setMovieType({ type: "MOVIE" }));
        break;
      case "tv":
        dispatch(setMovieType({ type: "TV" }));
        break;
      default:
        break;
    }
  };

  const handlePageChangeMovies = (page: number) => {
    dispatch(setCurrentPageMovies(page));
  };

  const handlePageChangeTv = (page: number) => {
    dispatch(setCurrentPageTv(page));
  };

  const handleMovieClick = (id: number, type: string) => {
    router.push(`/movie-discover/${type}/${id}`);
  };

  const isLoading =
    isFetchingMovies &&
    isFetchingTvShows &&
    horrorLoading &&
    actionLoading &&
    crimeLoading;

  return (
    <div className={styles.container}>
      <Button onClick={() => handleHeaderButtonClick("home")} variant="clear">
        Home
      </Button>
      <div className={styles.moviesGenres}>
        <Button
          onClick={() => handleHeaderButtonClick("movies")}
          variant="clear"
        >
          Movies
        </Button>
        <Button onClick={() => handleHeaderButtonClick("tv")} variant="clear">
          Series
        </Button>
        {isMovie || isSerie ? (
          <Select<number>
            options={isMovie ? optionsMovie : optionsTvShow}
            value={isMovie ? selectedGenresMovie : selectedGenresTv}
            onChange={(value) =>
              handleGenreChange(value, isMovie ? "movies" : "tvShows")
            }
            placeholder={isMovie ? "Movies" : "Tv Shows"}
            multiSelect
          />
        ) : null}
      </div>
      {isLoading ? (
        <div className={styles.loader}>Loading...</div>
      ) : (
        <>
          {isMovie && (
            <div className={`${styles.listBox} ${styles.fadeIn}`}>
              <MovieSection
                type="movie"
                onClick={handleMovieClick}
                title="All movies:"
                movies={AllMovies?.results || []}
                isCompactLayout
              />
              <Pagination
                currentPage={currentPageMovies}
                totalPages={AllMovies?.total_pages || 1}
                onPageChange={handlePageChangeMovies}
              />
            </div>
          )}
          {isSerie && (
            <div className={`${styles.listBox} ${styles.fadeIn}`}>
              <MovieSection
                type="tv"
                onClick={handleMovieClick}
                title="All series:"
                movies={AllTvShows?.results || []}
                isCompactLayout
              />
              <Pagination
                currentPage={currentPageTv}
                totalPages={AllTvShows?.total_pages || 1}
                onPageChange={handlePageChangeTv}
              />
            </div>
          )}
          {!isSerie && !isMovie && (
            <div className={styles.fadeIn}>
              <MovieSection
                onClick={handleMovieClick}
                title="Now playing:"
                movies={NowPlayingMovies?.results || []}
              />
              <MovieSection
                onClick={handleMovieClick}
                title="Top Rated:"
                movies={TopRatedMovies?.results || []}
              />
              <MovieSection
                onClick={handleMovieClick}
                title="Popular:"
                movies={PopularMovies?.results || []}
              />
              <MovieSection
                title="Action:"
                movies={ActionMovies?.results || []}
                onClick={handleMovieClick}
              />
              <MovieSection
                title="Crime:"
                movies={CrimeMovies?.results || []}
                onClick={handleMovieClick}
              />
              <MovieSection
                title="Horror:"
                movies={HorrorMovies?.results || []}
                onClick={handleMovieClick}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MovieDiscover;
