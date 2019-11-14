import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Pagination = ({
  containerClassName, containerStyle, totalPages, pages,
}) => (
  <div className={classNames('IS-pagination-container', containerClassName)} style={containerStyle}>
    {
      totalPages > 1
      && pages.map(({
        label, className, style, disabled, onClick,
      }, index) => (
        <button
          key={label === '...' ? `${index}a` : label}
          type="button"
          className={className}
          style={style}
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
  containerClassName: PropTypes.string,
  containerStyle: PropTypes.instanceOf(Object),
  totalPages: PropTypes.number,
  pages: PropTypes.instanceOf(Array),
};

Pagination.defaultProps = {
  containerClassName: '',
  containerStyle: {},
  totalPages: 0,
  pages: [],
};

export default Pagination;
