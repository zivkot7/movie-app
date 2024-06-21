import React, { useRef } from "react";
import Image from "next/image";
import styles from "./MovieSection.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "movie-app/app/lib/movieFilter";
import { selectFavorites } from "movie-app/app/lib/selectors";

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
  const movieListRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const scrollLeft = () => {
    if (movieListRef.current) {
      movieListRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (movieListRef.current) {
      movieListRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const movieList = isCompactLayout
    ? styles.movieListCompact
    : styles.movieList;

  const onFavoriteClick = (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    movie: Movie
  ) => {
    event?.stopPropagation();
    dispatch(setFavorites({ ...movie, type }));
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.scrollContainer}>
        {!isCompactLayout && (
          <button className={styles.scrollButton} onClick={scrollLeft}>
            {"<"}
          </button>
        )}
        <div className={movieList} ref={movieListRef}>
          {isCompactLayout
            ? movies.slice(0, 20).map((movie: Movie) => (
                <div
                  key={movie.id}
                  className={styles.movie}
                  onClick={() => onClick(movie.id, type)}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                    alt={"Movie poster"}
                    width={200}
                    height={270}
                    style={{ borderRadius: 8 }}
                  />
                  {favorites.some((fav: Favorite) => fav.id === movie.id) ? (
                    <FaStar
                      className={styles.starIcon}
                      onClick={(event) => onFavoriteClick(event, movie)}
                    />
                  ) : (
                    <FaRegStar
                      className={styles.starIcon}
                      onClick={(event) => onFavoriteClick(event, movie)}
                    />
                  )}
                </div>
              ))
            : movies.slice(0, 10).map((movie: Movie) => (
                <div
                  key={movie.id}
                  className={styles.movie}
                  onClick={() => onClick(movie.id, type)}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                    alt={"Movie poster"}
                    width={200}
                    height={270}
                    style={{ borderRadius: 8 }}
                  />
                  {favorites.some((fav: Favorite) => fav.id === movie.id) ? (
                    <FaStar
                      className={styles.starIcon}
                      onClick={(event) => onFavoriteClick(event, movie)}
                    />
                  ) : (
                    <FaRegStar
                      className={styles.starIcon}
                      onClick={(event) => onFavoriteClick(event, movie)}
                    />
                  )}
                </div>
              ))}
        </div>
        {!isCompactLayout && (
          <button className={styles.scrollButton} onClick={scrollRight}>
            {">"}
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieSection;
