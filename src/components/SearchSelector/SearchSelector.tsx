import React from "react";
import Search from "../Inputs/Search";
import styles from "./SearchSelector.module.css";

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
  const handleSelect = (value: any) => {
    onSelect(value);
  };

  return (
    <div className={styles.div}>
      <Search value={query} onChange={(value) => onChange(value)} />
      {options?.map((result: string, index: number) => (
        <div
          key={index}
          onClick={() => handleSelect(result)}
          className={styles.searchSelectorContainer}
        >
          <p className={styles.resultsText}>Searched results:</p>
          <div className={styles.item}>{result}</div>
        </div>
      ))}
    </div>
  );
};

export default SearchSelector;
