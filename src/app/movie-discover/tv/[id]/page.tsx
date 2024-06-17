"use client";
import { useGetSingleTvQuery } from "movie-app/Service/Movies";
import { useParams } from "next/navigation";
import styles from "./style.module.css";
import Image from "next/image";
import MovieCard from "movie-app/components/MovieCard";

const MovieDetails = () => {
  const { id } = useParams();
  const { data: serie } = useGetSingleTvQuery(id);

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage}>
        <Image
          src={`https://image.tmdb.org/t/p/w500${serie?.poster_path}`}
          alt={serie?.title ?? "Serie poster"}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      <MovieCard movie={serie} type="tv" />
    </div>
  );
};

export default MovieDetails;
