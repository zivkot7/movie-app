"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import Select from "movie-app/components/Inputs/Select";
import useSortedData from "movie-app/hooks/useSortedData";
import { Option } from "movie-app/types/components";
import { Button } from "movie-app/components/Button";
import Pagination from "movie-app/components/Pagination";
import { useGetSearchQuery } from "movie-app/Service/Movies";
import { setFavorites } from "movie-app/app/lib/movieFilter";
import { selectFavorites } from "movie-app/app/lib/selectors";

export const Search = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<string>("");

  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const favorites = useSelector(selectFavorites);

  const cachedData = useSelector(
    (state: any) =>
      state.tmdbApi.queries[
        `getSearch({"page":${currentPage},"query":"${query}"})`
      ]
  );

  const { data: searchData } = useGetSearchQuery(
    { query, page: currentPage },
    { skip: !!cachedData }
  );

  const sortedData = useSortedData(cachedData, sortOption);

  const handleMovieClick = (id: number, mediaType: string) => {
    router.push(`/movie-discover/${mediaType}/${id}`);
  };

  const options: Option<string>[] = [
    { value: "movie", label: "Movie" },
    { value: "tv", label: "TV" },
    { value: "year-asc", label: "Year Asc" },
    { value: "year-desc", label: "Year Desc" },
  ];

  const handleSortChange = (option: Option<string>) => {
    setSortOption(option);
  };

  const handlePageChangeTv = (page: number) => {
    setCurrentPage(page);
  };

  const onFavoriteClick = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    result: SearchResult
  ) => {
    event?.stopPropagation();
    dispatch(setFavorites(result));
  };

  return (
    <div className={styles.container}>
      {cachedData && cachedData.status === "fulfilled" ? (
        <div>
          <div className={styles.sortBox}>
            <Select<string>
              options={options}
              onChange={handleSortChange}
              value={sortOption}
              placeholder="Sort by"
            />
            <Button variant="secondary" onClick={() => setSortOption("")}>
              X Reset
            </Button>
          </div>
          {sortedData
            .filter((item: SearchResult) => item.media_type !== "person")
            .map((result: SearchResult) => (
              <div
                key={result.id}
                className={`${styles.itemBox} ${styles.fadeIn}`}
                onClick={() => handleMovieClick(result.id, result.media_type)}
              >
                <div className={styles.imageAndIcon}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${result?.poster_path}`}
                    alt={"Movie poster"}
                    width={250}
                    height={300}
                    quality={100}
                  />
                  {favorites.some((fav: Favorite) => fav.id === result.id) ? (
                    <FaStar
                      className={styles.starIcon}
                      onClick={(
                        event: React.MouseEvent<SVGSVGElement, MouseEvent>
                      ) => onFavoriteClick(event, result)}
                    />
                  ) : (
                    <FaRegStar
                      className={styles.starIcon}
                      onClick={(
                        event: React.MouseEvent<SVGSVGElement, MouseEvent>
                      ) => onFavoriteClick(event, result)}
                    />
                  )}
                </div>
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
                  <p>{result.media_type}</p>
                  <p className={styles.vote}>
                    Vote: {result.vote_average?.toFixed(1)}
                  </p>
                </div>
              </div>
            ))}
          <Pagination
            currentPage={currentPage}
            totalPages={
              cachedData?.data?.total_pages || searchData?.total_pages || 1
            }
            onPageChange={handlePageChangeTv}
          />
        </div>
      ) : (
        <div className={styles.loader}>Loading...</div>
      )}
    </div>
  );
};

export default Search;
