import React from "react";
import Search from "../Inputs/Search";
import styles from "./SearchSelector.module.css";
import Image from "next/image";

export type SearchSelectorProps = {
  onSelect: any;
  options: any;
  query: string;
  onChange: any;
};

const SearchSelector = ({
  onSelect,
  query,
  onChange,
  options,
}: SearchSelectorProps) => {
  const handleSelect = (item: any) => {
    onSelect(item);
  };
  console.log("dsadas", options);

  return (
    <div className={styles.div}>
      <Search value={query} onChange={(value) => onChange(value)} />
      {query && (
        <div className={styles.searchSelectorContainer}>
          <p className={styles.resultsText}>Searched results:</p>
          {options.slice(0, 5).map((item: any) => (
            <div key={item.id} onClick={() => handleSelect(item.id)}>
              <div className={styles.item}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
                  alt="Movie poster"
                  width={80}
                  height={90}
                />
                <div className={styles.titleAndType}>
                  <p>
                    {item.title
                      ? item.title
                      : item.original_name || item.original_title}
                  </p>
                  <p>
                    {item.media_type},{" "}
                    {item.release_date || item.first_air_date}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <button>View all results</button>
        </div>
      )}
    </div>
  );
};

export default SearchSelector;
