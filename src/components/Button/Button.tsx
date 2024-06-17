import React from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "movie-app/types/components";

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
