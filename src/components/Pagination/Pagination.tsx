import React from "react";
import { Button } from "../Button";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.paggination}>
      <Button
        onClick={handlePrevPage}
        variant="primary"
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span
        className={styles.pagesCount}
      >{`Page ${currentPage} of ${totalPages}`}</span>

      <Button
        onClick={handleNextPage}
        variant="primary"
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
