import React, { useState, useRef, useEffect, useCallback } from "react";
import Search from "../Inputs/Search";
import styles from "./SearchSelector.module.css";
import Image from "next/image";

export type SearchSelectorProps = {
  results?: string[];
  onSelect: (id: number, mediaType: string) => void;
  options: SearchResult[];
  query: string;
  onChange: (value: string) => void;
  onViewAllClick: () => void;
};

const SearchSelector = ({
  onSelect,
  query,
  onChange,
  options,
  onViewAllClick,
}: SearchSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (item: SearchResult) => {
    onSelect(item.id, item.media_type);
    setIsOpen(false);
  };

  const handleViewAllClick = () => {
    onViewAllClick();
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleSearchChange = useCallback(
    (value: string) => {
      onChange(value);
    },
    [onChange]
  );
  const handleFocus = useCallback(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.div} ref={containerRef}>
      <Search
        value={query}
        onFocus={handleFocus}
        onChange={handleSearchChange}
      />
      {isOpen && (
        <div className={styles.searchSelectorContainer}>
          <p className={styles.resultsText}>Searched results:</p>
          {options.length > 0 ? null : (
            <p className={styles.noResults}>No results found</p>
          )}
          {options.slice(0, 5).map((item: SearchResult) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item)}
              className={`${styles.item} ${styles.fadeIn}`}
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
                alt="Movie poster"
                width={80}
                height={90}
              />
              <div className={styles.titleAndType}>
                <p className={styles.title}>
                  {item.title
                    ? item.title
                    : item.original_name || item.original_title}
                </p>
                <p className={styles.typeAndDate}>
                  {item.media_type}, {item.release_date || item.first_air_date}
                </p>
              </div>
            </div>
          ))}
          <button className={styles.viewAll} onClick={handleViewAllClick}>
            View all results
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchSelector;
