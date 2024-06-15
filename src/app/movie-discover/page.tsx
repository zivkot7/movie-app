"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
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

const MovieDiscover = () => {
  const router = useRouter();
  const { data: MovieGenres } = useGetGenresMoviesQuery();
  const { data: TvShowsGenres } = useGetGenresTvQuery();
  const { data: TopRatedMovies } = useGetTopRatedMoviesQuery();
  const { data: PopularMovies } = useGetPopularMoviesQuery();
  const { data: NowPlayingMovies } = useGetNowPlayingMoviesQuery();
  const [isMoviesActive, setIsMoviesActive] = useState(true);
  const [isSeriesActive, setIsSeriesActive] = useState(true);
  const [selectedGenresMovie, setSelectedGenresMovie] = useState<number[]>([]);
  const [selectedGenresTv, setSelectedGenresTv] = useState<number[]>([]);
  const [currentPageMovies, setCurrentPageMovies] = useState(1);
  const [currentPageTv, setCurrentPageTv] = useState(1);

  const genreStringMovie =
    selectedGenresMovie.length > 0 ? selectedGenresMovie : "";
  const genreStringTv = selectedGenresTv.length > 0 ? selectedGenresTv : "";

  const { data: AllMovies } = useGetMoviesQuery(
    { genres: genreStringMovie, page: currentPageMovies },
    { skip: isMoviesActive }
  );

  const { data: AllTvShows } = useGetTvQuery(
    { genres: genreStringTv, page: currentPageTv },
    { skip: isSeriesActive }
  );

  const horrorGenreId = useGenreIdByName("Horror");
  const actionGenreId = useGenreIdByName("Action");
  const crimeGenreId = useGenreIdByName("Crime");

  const { data: HorrorMovies } = useGetMoviesQuery(horrorGenreId);
  const { data: ActionMovies } = useGetMoviesQuery(actionGenreId);
  const { data: CrimeMovies } = useGetMoviesQuery(crimeGenreId);

  const optionsMovie: Option[] =
    MovieGenres?.genres.map((genre: Genre) => ({
      value: genre.id,
      label: genre.name,
    })) || [];

  const optionsTvShow: Option[] =
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
        setSelectedGenresMovie([value]);
      } else {
        setSelectedGenresMovie(value);
      }
    } else if (type === "tvShows") {
      if (typeof value === "number") {
        setSelectedGenresTv([value]);
      } else {
        setSelectedGenresTv(value);
      }
    }
  };

  const handleMoviesBtnClick = () => {
    setIsMoviesActive(false);
    setIsSeriesActive(true);
    setSelectedGenresTv([]);
  };

  const handleSeriesBtnClick = () => {
    setIsSeriesActive(false);
    setIsMoviesActive(true);
    setSelectedGenresMovie([]);
  };

  const handleHomeBtnClick = () => {
    setIsSeriesActive(true);
    setIsMoviesActive(true);
    setSelectedGenresTv([]);
    setSelectedGenresMovie([]);
  };

  const handlePageChangeMovies = (newPage: number) => {
    setCurrentPageMovies(newPage);
  };

  const handlePageChangeTv = (newPage: number) => {
    setCurrentPageTv(newPage);
  };

  const handleMovieClick = (id: number, type: string) => {
    router.push(`/movie-discover/${type}/${id}`);
  };

  return (
    <div className={styles.container}>
      <Button onClick={handleHomeBtnClick} variant="clear">
        Home
      </Button>
      <div className={styles.moviesGenres}>
        <Button onClick={handleMoviesBtnClick} variant="clear">
          Movies
        </Button>
        <Button onClick={handleSeriesBtnClick} variant="clear">
          Series
        </Button>
        {!isMoviesActive || !isSeriesActive ? (
          <Select
            options={!isMoviesActive ? optionsMovie : optionsTvShow}
            value={!isMoviesActive ? selectedGenresMovie : selectedGenresTv}
            onChange={(value) =>
              handleGenreChange(value, !isMoviesActive ? "movies" : "tvShows")
            }
            placeholder={!isMoviesActive ? "Movies" : "Tv Shows"}
            multiSelect
          />
        ) : null}
      </div>
      {!isMoviesActive && (
        <>
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
        </>
      )}
      {!isSeriesActive && (
        <>
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
        </>
      )}
      {isMoviesActive && isSeriesActive && (
        <>
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
        </>
      )}

      <Link href="/movie-details" className={styles.button}>
        Select movie
      </Link>
    </div>
  );
};

export default MovieDiscover;
