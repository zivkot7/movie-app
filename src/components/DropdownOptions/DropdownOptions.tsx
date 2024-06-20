import React from "react";
import { FaCheck } from "react-icons/fa";
import styles from "./DropdownOptions.module.css";
import { Option } from "movie-app/types/components";

interface DropdownOptionsProps<T> {
  options: Option<T>[];
  value: T | T[];
  handleSelectOption: (selectedOption: Option<T>) => void;
  multiSelect: boolean;
  customOption?: (option: Option<T>) => React.ReactNode;
}

const DropdownOptions = <T,>({
  options,
  value,
  handleSelectOption,
  multiSelect,
  customOption,
}: DropdownOptionsProps<T>) => {
  const isOptionSelected = (optionValue: T) =>
    multiSelect
      ? Array.isArray(value) && value.includes(optionValue)
      : value === optionValue;

  const columnWrapperClass =
    options.length > 5 && !customOption
      ? styles.columnWrapper
      : styles.singleColumn;

  return (
    <div className={styles.dropdown}>
      <div className={columnWrapperClass}>
        {options.map((option) => (
          <div
            key={String(option.value)}
            className={`${styles.option} ${
              isOptionSelected(option.value) ? styles.selected : ""
            }`}
            onClick={() => handleSelectOption(option)}
          >
            {isOptionSelected(option.value) && (
              <FaCheck className={styles.checkIcon} />
            )}
            {customOption ? customOption(option) : option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownOptions;
