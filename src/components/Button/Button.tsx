import React from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "movie-app/types/components";

export const Button = ({ variant, onClick, children, style }: ButtonProps) => {
  const className = `${styles.button} ${styles[variant]}`;

  return (
    <button className={className} onClick={onClick} style={style}>
      {children}
    </button>
  );
};

export default Button;
