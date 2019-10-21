import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ totalPages, pages }) => (
  <div className="pagination">
    {
      totalPages > 1
      && pages.map(({
        label, className, disabled, onClick,
      }, index) => (
        <button
          key={label === '...' ? `${index}a` : label}
          type="button"
          className={className}
          disabled={disabled}
          onClick={onClick}
        >
          {label}
        </button>
      ))
    }
  </div>
);

Pagination.propTypes = {
  totalPages: PropTypes.number,
  pages: PropTypes.instanceOf(Array),
};

Pagination.defaultProps = {
  totalPages: 0,
  pages: [],
};

export default Pagination;
