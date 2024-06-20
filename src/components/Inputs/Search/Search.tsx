import React, { CSSProperties, useState } from "react";
import styles from "./Search.module.css";
import { IoSearch } from "react-icons/io5";
import { useDebounce } from "movie-app/hooks/useDebounce";
export interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  style?: CSSProperties;
  debounce?: number;
}

export const Search = ({
  placeholder = "Search movies or series...",
  value,
  onChange,
  onFocus,
  debounce = 400,
}: SearchInputProps) => {
  const [query, setQuery] = useState(value);
  useDebounce(query, onChange, debounce);

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <IoSearch className={styles.searchIcon} />
      <input
        type="text"
        value={query}
        onChange={handleValue}
        placeholder={placeholder}
        className={styles.input}
        onFocus={onFocus}
      />
    </div>
  );
};

export default Search;
