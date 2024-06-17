import React, { useState, useRef, useEffect } from "react";
import styles from "./Select.module.css";
import { SelectProps } from "movie-app/types/components";
import { IoIosStar } from "react-icons/io";
import { Button } from "movie-app/components/Button";
import DropdownOptions from "../../DropdownOptions";

const Select = ({
  options,
  onChange,
  value,
  placeholder,
  multiSelect = false,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (selectedValue: number) => {
    if (!multiSelect) {
      onChange(selectedValue);
      setIsOpen(false);
    } else {
      const updatedValue = Array.isArray(value)
        ? value.includes(selectedValue)
          ? value.filter((v) => v !== selectedValue)
          : [...value, selectedValue]
        : [selectedValue];
      onChange(updatedValue);
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
        {!multiSelect ? (
          <Button variant="secondary" style={{ width: 130 }}>
            <div className={styles.buttonContentMultiSelect}>
              <IoIosStar color="white" />
              {placeholder}
              <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
            </div>
          </Button>
        ) : (
          <Button variant="secondary" style={{ width: 110 }}>
            <div>
              {placeholder}
              <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
            </div>
          </Button>
        )}
      </div>
      {isOpen && (
        <DropdownOptions
          options={options}
          value={value}
          handleSelectOption={handleSelectOption}
          multiSelect={multiSelect}
        />
      )}
    </div>
  );
};

export default Select;
