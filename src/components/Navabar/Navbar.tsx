"use client";
import React, { useMemo, useState } from "react";
import styles from "./Navbar.module.css";
import Select from "../Inputs/Select/Select";
import { Option } from "movie-app/types/components";
import SearchSelector from "../SearchSelector";
import { useGetSearchQuery } from "movie-app/Service/Movies";
import { usePathname, useRouter } from "next/navigation";

const options: Option<number>[] = [
  { value: 1, label: "Option 1" },
  { value: 2, label: "Option 2" },
  { value: 3, label: "Option 3" },
];

function Navbar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const pathname = usePathname();

  const { data } = useGetSearchQuery({ query });

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  const handleFavoritesChange = (value: number) => {
    setSelectedValue(value);
  };

  const searchOptions = React.useMemo(() => {
    if (query && data) {
      return data.results
        .filter((item: any) => item.media_type !== "person")
        .map((item: any) => ({
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
    router.push(`/`);
  };

  const handleViewAllClick = (query: string) => {
    router.push(`/movie-discover/search?q=${query}`);
  };

  const handleMovieClick = (id: number, mediaType: string) => {
    router.push(`/movie-discover/${mediaType}/${id}`);
  };

  return (
    <div className={containerStyle}>
      <h2 className={styles.title} onClick={handleHomeClick}>
        MovieApp
      </h2>
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
          options={options}
          value={selectedValue}
          onChange={handleFavoritesChange}
          placeholder="Favorites"
          withIcon
        />
      </div>
    </div>
  );
}

export default Navbar;
