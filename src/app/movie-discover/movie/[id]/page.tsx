"use client";
import { useParams } from "next/navigation";
import styles from "./style.module.css";
import Image from "next/image";
import MovieCard from "movie-app/components/MovieCard";
import { useGetSingleMovieQuery } from "movie-app/Service/Movies";

const MovieDetails = () => {
  const { id } = useParams();
  const { data: Movie } = useGetSingleMovieQuery(id);

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage}>
        <Image
          src={`https://image.tmdb.org/t/p/w500${Movie?.poster_path}`}
          alt={'Movie poster'}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className={styles.content}>
        <MovieCard movie={Movie} type="movie" />
      </div>
    </div>
  );
};

export default MovieDetails;
