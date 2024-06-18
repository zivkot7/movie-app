import React, { useState } from "react";
import { SearchInputProps } from "movie-app/types/components";
import styles from "./Search.module.css";
import { IoSearch } from "react-icons/io5";
import { useDebounce } from "movie-app/hooks/useDebounce";

export const Search = ({
  placeholder = "Search movies or series...",
  value,
  onChange,
  onKeyDown,
  debounce = 400,
}: SearchInputProps) => {
  const [query, setQuery] = useState(value);
  useDebounce(query, onChange, debounce);

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onChange(query);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <IoSearch className={styles.searchIcon} />
      <input
        type="text"
        value={query}
        onChange={handleValue}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};

export default Search;
