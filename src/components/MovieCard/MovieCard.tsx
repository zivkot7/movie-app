import React, { useMemo } from "react";
import Image from "next/image";
import styles from "./MovieCard.module.css";
import useStarClick from "movie-app/hooks/useStarClick";
import { FaRegStar, FaStar } from "react-icons/fa";

interface MovieCardProps {
  type: "movie" | "tv";
  movie: {
    id: number;
    title: string;
    name: string;
    first_air_date: number;
    original_name: string;
    number_of_seasons: number;
    number_of_episodes: number;
    poster_path: string;
    runtime: number;
    original_title: string;
    release_date: string;
    overview: string;
    status: string;
    vote_average: number;
    vote_count: number;
    production_countries: [
      {
        name: string;
      }
    ];
    genres: [
      {
        id: number;
        name: string;
      }
    ];
  };
}

const MovieCard = ({ movie, type }: MovieCardProps) => {
  const { clicked, handleStarClick } = useStarClick();

  const movieDetails = {
    displayTitle: type === "movie" ? movie?.title : movie?.name,
    displayDate: type === "movie" ? movie?.release_date : movie?.first_air_date,
    displayOriginalTitle:
      type === "movie" ? movie?.original_title : movie?.original_name,
    displayOverview: movie?.overview,
    displayRuntime: movie?.runtime,
    displayVoteAverage: movie?.vote_average.toFixed(1),
    displayVoteCount: movie?.vote_count,
    displayProductionCountries: movie?.production_countries
      .map((country) => country.name)
      .join(", "),
    displayStatus: movie?.status,
    displayEpisodes: movie?.number_of_episodes,
    displaySeasons: movie?.number_of_seasons,
  };

  return (
    <>
      {movie ? (
        <div className={styles.movieCard}>
          <div className={styles.imageColumn}>
            <div className={styles.imageContainer}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                alt={movie?.title ?? "Movie Poster"}
                quality={100}
                width={330}
                height={350}
                layout="responsive"
              />
              {clicked.has(movie.id) ? (
                <FaStar
                  className={styles.starIcon}
                  onClick={(event) => handleStarClick(event, movie.id)}
                />
              ) : (
                <FaRegStar
                  className={styles.starIcon}
                  onClick={(event) => handleStarClick(event, movie.id)}
                />
              )}
            </div>
            <div className={styles.movieDetails}>
              <div className={styles.genres}>
                <p className={styles.genresTitle}>Genres</p>
                {movie?.genres.map((genre) => (
                  <span key={genre.id} className={styles.genre}>
                    {genre.name}
                  </span>
                ))}
              </div>
              {type === "movie" ? (
                <>
                  <p className={styles.sectionTitle}>Runtime</p>
                  <p className={styles.runtimeTxt}>
                    {movieDetails.displayRuntime} min
                  </p>
                </>
              ) : (
                <>
                  <p className={styles.sectionTitle}>Number of seasons</p>
                  <p className={styles.seasonsTxt}>
                    {movieDetails.displaySeasons}
                  </p>
                  <p className={styles.sectionTitle}>Number of episodes</p>
                  <p className={styles.episodesTxt}>
                    {movieDetails.displayEpisodes}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className={styles.detailsColumn}>
            <div>
              <h2 className={styles.title}>
                {movieDetails.displayTitle} ({movieDetails.displayDate})
              </h2>
              <p className={styles.originalTitle}>
                Original title: {movieDetails.displayOriginalTitle}
              </p>
              <p className={styles.overview}>Description:</p>
              <p className={styles.overviewTxt}>
                {movieDetails.displayOverview}
              </p>
              <div className={styles.votesBox}>
                <p className={styles.rightSectionTitle}>Vote:</p>
                <p className={styles.voteTxt}>
                  {movieDetails.displayVoteAverage}
                </p>
                <p className={styles.rightSectionTitle}>Vote count:</p>
                <p className={styles.voteTxt}>
                  {movieDetails.displayVoteCount}
                </p>
              </div>
            </div>
            <div className={styles.productionSection}>
              <p className={styles.rightSectionTitle}>Production countries</p>
              <p className={styles.voteTxt}>
                {movieDetails.displayProductionCountries}
              </p>
            </div>
            <div className={styles.statusSection}>
              <p className={styles.rightSectionTitle}>Status</p>
              <p className={styles.sectionTxt}>{movieDetails.displayStatus}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.loader}>Loading...</div>
      )}
    </>
  );
};

export default MovieCard;
