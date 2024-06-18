"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./style.module.css";
import { useGetSearchQuery } from "movie-app/Service/Movies";
import { Button } from "movie-app/components/Button";
import { FaRegStar, FaStar } from "react-icons/fa";
import useStarClick from "movie-app/hooks/useStarClick";

export const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const { clicked, handleStarClick } = useStarClick();
  const [currentPage, setCurrentPage] = useState(1);

  const cachedData = useSelector(
    (state) => state.tmdbApi.queries[`getSearch("${query}")`]
  );

  const {
    data: searchData,
    error,
    isLoading,
  } = useGetSearchQuery(query, {
    skip: !!cachedData,
    page: currentPage,
  });

  const handleMovieClick = (id: number, mediaType: string) => {
    router.push(`/movie-discover/${mediaType}/${id}`);
  };

  return (
    <div className={styles.container}>
      {cachedData && cachedData.status === "fulfilled" ? (
        <div>
          {cachedData.data.results
            .filter((item: any) => item.media_type !== "person")
            .map((result: any) => (
              <div
                key={result.id}
                className={`${styles.itemBox} ${styles.fadeIn}`}
                onClick={() => handleMovieClick(result.id, result.media_type)}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${result?.poster_path}`}
                  alt={"Movie poster"}
                  width={250}
                  height={300}
                  quality={100}
                />
                {clicked.has(result.id) ? (
                  <FaStar
                    className={styles.starIcon}
                    onClick={(event) => handleStarClick(event, result.id)}
                  />
                ) : (
                  <FaRegStar
                    className={styles.starIcon}
                    onClick={(event) => handleStarClick(event, result.id)}
                  />
                )}
                <div className={styles.itemDetails}>
                  <div className={styles.titleYear}>
                    <p className={styles.title}>
                      {result.title ||
                        result.original_title ||
                        result.original_name}
                    </p>
                    <p className={styles.year}>
                      ({result.release_date || result.first_air_date})
                    </p>
                  </div>
                  <p className={styles.vote}>
                    Vote: {result.vote_average?.toFixed(1)}
                  </p>
                  <Button variant="secondary" style={{ width: 130 }}>
                    Add to favorite
                  </Button>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className={styles.loader}>Loading...</div>
      )}
    </div>
  );
};

export default Search;
