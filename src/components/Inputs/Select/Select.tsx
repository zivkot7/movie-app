import React, { useState, useRef, useEffect } from "react";
import styles from "./Select.module.css";
import { Option } from "movie-app/types/components";
import { IoIosStar } from "react-icons/io";
import { Button } from "movie-app/components/Button";
import DropdownOptions from "../../DropdownOptions";

interface SelectProps<T> {
  options: Option<T>[];
  onChange: (value: T | T[]) => void;
  value: T | T[];
  placeholder: string;
  withIcon?: boolean;
  multiSelect?: boolean;
  customRow?: (option: Option<T>) => React.ReactNode;
}

const Select = <T,>({
  options,
  onChange,
  value,
  placeholder,
  withIcon,
  multiSelect = false,
  customRow,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (selectedOption: Option<T>) => {
    const selectedValue = selectedOption.value;

    if (!multiSelect) {
      onChange(selectedValue);
      setIsOpen(false);
    } else {
      const updatedValue = Array.isArray(value)
        ? value.includes(selectedValue)
          ? value.filter((v) => v !== selectedValue)
          : [...value, selectedValue]
        : [selectedValue];
      onChange(updatedValue as T | T[]);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.selectContainer} ref={selectRef}>
      <div
        className={`${styles.select} ${multiSelect ? "" : styles.genres}`}
        onClick={handleToggle}
      >
        <Button variant="secondary" style={{ width: multiSelect ? 110 : 130 }}>
          <div className={styles.buttonContentMultiSelect}>
            {withIcon && <IoIosStar color="white" />}
            {placeholder}
            <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
          </div>
        </Button>
      </div>
      {isOpen && (
        <DropdownOptions<T>
          options={options}
          value={value}
          handleSelectOption={handleSelectOption}
          multiSelect={multiSelect}
          customOption={customRow}
        />
      )}
    </div>
  );
};

export default Select;
