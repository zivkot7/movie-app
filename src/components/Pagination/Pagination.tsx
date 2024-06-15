import React from "react";
import { Button } from "../Button";

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
    <div className="pagination">
      {/* disabled={currentPage === 1} */}
      <Button onClick={handlePrevPage} variant="primary">
        Previous
      </Button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      {/* disabled={currentPage === totalPages} */}
      <Button onClick={handleNextPage} variant="primary">
        Next
      </Button>
    </div>
  );
};

export default Pagination;
