import React from "react";
import Image from "next/image";
import styles from "./MovieSection.module.css";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  isCompactLayout?: boolean;
  onClick: (id: number, type: string) => void;
  type?: "movie" | "tv";
}

export const MovieSection = ({
  type = "movie",
  title,
  movies,
  onClick,
  isCompactLayout = false,
}: MovieSectionProps) => {
  const containerClassName = isCompactLayout
    ? styles.containerCompact
    : styles.container;
  return (
    <div className={containerClassName}>
      <h3>{title}</h3>
      <div className={styles.movieList}>
        {movies.slice(0, 10).map((movie: Movie) => (
          <div
            key={movie.id}
            className={styles.movie}
            onClick={() => onClick(movie.id, type)}
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
              alt={movie?.title}
              width={200}
              height={270}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSection;
