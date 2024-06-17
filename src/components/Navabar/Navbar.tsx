"use client";
import React, { useMemo, useState } from "react";
import styles from "./Navbar.module.css";
import Select from "../Inputs/Select/Select";
import { Option } from "movie-app/types/components";
import SearchSelector from "../SearchSelector";
import { useGetSearchQuery } from "movie-app/Service/Movies";
import { usePathname, useRouter } from "next/navigation";

const options: Option[] = [
  { value: 1, label: "Option 1" },
  { value: 2, label: "Option 2" },
  { value: 3, label: "Option 3" },
];

function Navbar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState<number | null>();
  const pathname = usePathname();

  const { data } = useGetSearchQuery(query);

  console.log(data);

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setQuery(event.target.value);
  // };

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter") {
  //     // handleSearch();
  //   }
  // };

  const handleSearch = (value: string) => {
    console.log("Search query:", value);
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

  return (
    <div className={containerStyle}>
      <h2 className={styles.title} onClick={handleHomeClick}>
        MovieApp
      </h2>
      <div className={styles.inputsBox}>
        <SearchSelector
          query={query}
          onSelect={(value: any) => console.log(value)}
          onChange={handleSearch}
          options={searchOptions}
        />
        <Select
          options={options}
          value={selectedValue}
          onChange={handleFavoritesChange}
          placeholder="Favorites"
        />
      </div>
    </div>
  );
}

export default Navbar;
