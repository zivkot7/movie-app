import React from "react";
import Image from "next/image";
import styles from "./MovieCard.module.css";

interface MovieCardProps {
  type: "movie" | "tv";
  movie: {
    title: string;
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
  console.log("first", movie);
  return (
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
          <p className={styles.sectionTitle}>Runtime</p>
          <p className={styles.runtimeTxt}>{movie?.runtime} min</p>
        </div>
      </div>
      <div className={styles.detailsColumn}>
        <div>
          <h2 className={styles.title}>
            {type === "movie" ? movie?.title : movie?.name} (
            {movie?.release_date})
          </h2>
          <p className={styles.originalTitle}>
            Original title: {movie?.original_title}
          </p>

          <p className={styles.overview}>Description:</p>
          <p className={styles.overviewTxt}>{movie?.overview}</p>

          <div className={styles.votesBox}>
            <p className={styles.rightSectionTitle}>Vote:</p>
            <p className={styles.voteTxt}>{movie?.vote_average.toFixed(1)}</p>
            <p className={styles.rightSectionTitle}>Vote count:</p>
            <p className={styles.voteTxt}>{movie?.vote_count}</p>
          </div>
        </div>
        <div>
          <p className={styles.rightSectionTitle}>Production countries</p>
          <p className={styles.voteTxt}>
            {movie?.production_countries
              .map((country) => country.name)
              .join(", ")}
          </p>
        </div>
        <div>
          <p className={styles.rightSectionTitle}>Status</p>
          <p className={styles.sectionTxt}>{movie?.status}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
