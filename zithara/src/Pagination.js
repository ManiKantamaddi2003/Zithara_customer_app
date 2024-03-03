import React from 'react';

const Pagination = ({ totalRecords, recordsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const handleClick = (page) => {
    onPageChange(page);
  };

  return (
    <div>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button key={page} onClick={() => handleClick(page)} disabled={currentPage === page}>
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
