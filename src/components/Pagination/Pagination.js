import React from 'react';
import './Pagination.css';

const Pagination = ({ resutsPerPage, totalResults, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalResults / resutsPerPage); i += 1) {
    if (totalResults > resutsPerPage) {
      pageNumbers.push(i);
    }
  }
  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
        <li onClick={() => paginate(number)} key={number} className="page-item">
            <span>{number}</span>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
