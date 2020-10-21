import React from "react";
import _ from "lodash";
import { PropTypes } from "prop-types";

const Paggination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const numberOfPages = Math.ceil(itemsCount / pageSize);
  if (numberOfPages === 1) return null;
  const pages = _.range(1, numberOfPages + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
            onClick={() => onPageChange(page)}
          >
            <a className="page-link"> {page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Paggination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Paggination;
