import { CSSProperties } from "react";

export interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  style?: CSSProperties;
  debounce?: number;
}

export interface ButtonProps {
  variant: "primary" | "secondary" | "clear";
  onClick?: () => void;
  children: React.ReactNode;
  style?: CSSProperties;
}

export interface Option {
  value: number;
  label: string;
}

export interface SelectProps {
  options: Option[];
  onChange: (value: number | number[]) => void;
  value: number | number[];
  placeholder?: string;
  multiSelect?: boolean;
}

export interface DropdownOptionsProps {
  options: Option[];
  value: number | number[];
  handleSelectOption: (selectedValue: number) => void;
  multiSelect: boolean;
}

export interface SearchSelectorProps {
  results: string[];
}
