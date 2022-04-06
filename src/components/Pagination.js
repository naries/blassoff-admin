/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import _ from "lodash";
import { Button } from "react-bootstrap";

const Pagination = props => {
    const { itemsCount, pageSize, onPageChange, currentPage } = props;

    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1)

    return (
        <nav>
            <ul className="pagination">
                {
                    pages.map((page, id) => (
                        <Button
                            variant={page === currentPage ? "warning" : "light"}
                            size="sm"
                            className="page-item mr-1"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </Button>
                    ))}
            </ul>
        </nav>
    )
};

export default Pagination;
