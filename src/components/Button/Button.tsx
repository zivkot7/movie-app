"use client";
import React, { CSSProperties } from "react";
import styles from "./Button.module.css";

export interface ButtonProps {
  variant: "primary" | "secondary" | "clear";
  onClick?: () => void;
  children: React.ReactNode;
  style?: CSSProperties;
  disabled?: boolean;
}

export const Button = ({
  variant,
  onClick,
  children,
  style,
  disabled,
}: ButtonProps) => {
  const className = `${styles.button} ${styles[variant]} ${
    disabled ? styles.disabled : ""
  }`;

  return (
    <button
      className={className}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
