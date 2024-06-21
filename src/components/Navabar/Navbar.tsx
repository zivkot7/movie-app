"use client";
import React, { useMemo, useState } from "react";
import styles from "./Navbar.module.css";
import Select from "../Inputs/Select/Select";
import { Option } from "movie-app/types/components";
import SearchSelector from "../SearchSelector";
import { usePathname, useRouter } from "next/navigation";
import { useGetSearchQuery } from "movie-app/Service/Movies";
import { useDispatch, useSelector } from "react-redux";
import FavoriteOption from "../FavoriteOption";
import {
  selectFavoriteById,
  selectFavorites,
} from "movie-app/app/lib/selectors";
import { Button } from "../Button";
import { setMovieType } from "movie-app/app/lib/movieFilter";

function Navbar() {
  const [query, setQuery] = useState("");

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const favorites = useSelector(selectFavorites);

  const { data } = useGetSearchQuery({ query });

  const handleSearch = React.useCallback((value: string) => {
    setQuery(value);
  }, []);

  const searchOptions = React.useMemo(() => {
    if (query && data) {
      return data.results
        .filter((item: Movie) => item.media_type !== "person")
        .map((item: Movie) => ({
          ...item,
        }));
    }

    return [];
  }, [query, data]);

  const { containerStyle } = useMemo(() => {
    const isHomePage = pathname === "/";
    const containerStyle = isHomePage ? styles.initialPage : styles.otherPages;
    return { isHomePage, containerStyle };
  }, [pathname]);

  const handleHomeClick = () => {
    router.push("/movie-discover");
    dispatch(setMovieType({}));
  };

  const handleMovieAppClick = () => {
    router.push("/");
  };

  const handleViewAllClick = (query: string) => {
    router.push(`/movie-discover/search?q=${query}`);
  };

  const handleMovieClick = (id: number, mediaType: string) => {
    router.push(`/movie-discover/${mediaType}/${id}`);
  };

  const handleFavoritesChange = (selectedValue: number | number[]) => {
    const fav = favorites.find((fav: Favorite) => fav.id === selectedValue);
    if (fav) {
      const mediaType =
        fav.type === "movie" || fav.media_type === "movie" ? "movie" : "tv";
      router.push(`/movie-discover/${mediaType}/${fav.id}`);
    }
  };

  const options: Option<number>[] = favorites.map((fav: Favorite) => ({
    value: fav?.id,
    label: fav?.title || fav?.original_name || "",
  }));

  const selectedValue: number | number[] = [];

  return (
    <div className={containerStyle}>
      <div className={styles.titleAndBtn}>
        <h2 className={styles.title} onClick={handleMovieAppClick}>
          MovieApp
        </h2>
        <Button onClick={handleHomeClick} variant="clear">
          Home
        </Button>
      </div>
      <div className={styles.inputsBox}>
        <SearchSelector
          query={query}
          onSelect={(id: number, mediaType: string) =>
            handleMovieClick(id, mediaType)
          }
          onChange={handleSearch}
          options={searchOptions}
          onViewAllClick={() => handleViewAllClick(query)}
        />
        <Select<number>
          value={selectedValue}
          options={options}
          onChange={handleFavoritesChange}
          placeholder="Favorites"
          withIcon
          customRow={FavoriteOption}
        />
      </div>
    </div>
  );
}

export default Navbar;
