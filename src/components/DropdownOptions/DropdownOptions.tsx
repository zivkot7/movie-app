import React from "react";
import { FaCheck } from "react-icons/fa";
import styles from "./DropdownOptions.module.css";
import { DropdownOptionsProps } from "movie-app/types/components";

const DropdownOptions = ({
  options,
  value,
  handleSelectOption,
  multiSelect,
}: DropdownOptionsProps) => {
  const isOptionSelected = (optionValue: number) =>
    multiSelect
      ? Array.isArray(value) && value.includes(optionValue)
      : value === optionValue;

  const columnWrapperClass =
    options.length > 5 ? styles.columnWrapper : styles.singleColumn;

  return (
    <div className={styles.dropdown}>
      <div className={columnWrapperClass}>
        {options.map((option) => (
          <div
            key={option.value}
            className={`${styles.option} ${
              isOptionSelected(option.value) ? styles.selected : ""
            }`}
            onClick={() => handleSelectOption(option.value)}
          >
            {isOptionSelected(option.value) && (
              <FaCheck className={styles.checkIcon} />
            )}
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownOptions;
