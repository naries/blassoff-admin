import React from "react";

export const PageNumbers = ({pageSize, currentPage, totalCounts}) => {
  if (currentPage === 1) {
    return (
      <div className="showing">
        Showing {pageSize * (currentPage - 1) + 1} to&nbsp;
        {totalCounts} of {totalCounts}&nbsp; entries.
      </div>
    );
  }
  return (
    <div className="showing">
      Showing {pageSize * (currentPage - 1) + 1} to&nbsp;
      {pageSize * (currentPage - 1) + 10} of {totalCounts}&nbsp; entries.
    </div>
  );
};
