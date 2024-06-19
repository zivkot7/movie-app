import { CSSProperties } from "react";



export interface ButtonProps {
  variant: "primary" | "secondary" | "clear";
  onClick?: () => void;
  children: React.ReactNode;
  style?: CSSProperties;
  disabled?: boolean;
}

export type Option<T> = {
  value: T;
  label: string;
};

export interface SelectProps<T> {
  options: Option<T>[];
  onChange: (value: T | T[]) => void;
  value: T | T[];
  placeholder: string;
  withIcon?: boolean;
  multiSelect?: boolean;
}

export interface DropdownOptionsProps<T> {
  options: Option<T>[];
  value: T | T[];
  handleSelectOption: (selectedValue: T) => void;
  multiSelect: boolean;
}

export interface SearchSelectorProps {
  results: string[];
}
