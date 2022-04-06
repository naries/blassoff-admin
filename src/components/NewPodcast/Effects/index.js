import React from "react";
import ReactPaginate from "react-paginate";
import { BasicTable } from "../../ReactTable";

export const Effects = () => {
  const pageCount = 2;
  const handlePageChange = () => {};
  return (
    <div className="bg-grey-100">
      <div className="bg-yellow p-1 d-flex align-items-center justify-content-center text-white">
        Browse through our collection of Effects
      </div>
      <div className="bg-white-smoke new-pod-container p-4">
        <BasicTable />

        <div className="d-flex justify-content-between mt-4">
          <div className="showing">Showing 1 to 7 of 7 entries.</div>

          <ReactPaginate
            pageCount={pageCount}
            pageRange={2}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName="paginate"
            previousLabel={"<<"}
            nextLabel={">>"}
            disabledClassName={"paginate__link--disabled"}
            activeClassName={"paginate__link--active"}
            nextLinkClassName="paginate__end-link"
            previousLinkClassName="paginate__end-link"
          />
        </div>
      </div>
    </div>
  );
};
