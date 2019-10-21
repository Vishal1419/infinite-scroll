import React from 'react';
import PropTypes from 'prop-types';

import './pagination.scss';
import Pagination from './Pagination';
import { noop } from '../../../../utils';

const getPageRange = (activePage, pageNeighbours, totalPages) => {
  let startPage = (activePage < (pageNeighbours + 1)) ? 1 : (activePage - pageNeighbours);
  const endPage = totalPages < ((pageNeighbours * 2) + startPage)
    ? totalPages : ((pageNeighbours * 2) + startPage);
  const diff = (startPage - endPage) + (pageNeighbours * 2);
  startPage -= ((startPage - diff) > 0 ? diff : 0);
  const range = new Array((endPage - startPage) + 1).fill().map((_, i) => i + startPage);

  // Allow user to go to the first page, The second entry should be either 2 or ellipsis(...)
  if (range[0] !== 1) {
    if ((range[0] !== 2) && (range[1] !== 2)) range.unshift('...');
    range.unshift(1);
  }
  // Allow user to go the last page, second last entry should be second last page or ellipsis
  if (range[range.length - 1] !== totalPages) {
    if ((range[range.length - 1] !== totalPages - 1) && (range[range.length - 2] !== totalPages - 1)) range.push('...');
    range.push(totalPages);
  }
  return range;
};

const PaginationContainer = ({
  activePage, onChangeActivePage, pageSize, totalRecords, pageNeighbours,
}) => {
  const totalPages = Math.ceil(totalRecords / pageSize);
  const pageRange = getPageRange(activePage, pageNeighbours, totalPages);

  const pages = [
    {
      label: 'Previous',
      className: '',
      disabled: activePage === 1,
      onClick: () => onChangeActivePage(activePage - 1),
    },
    ...pageRange.map((page) => ({
      label: page,
      className: `pagination-button ${page === activePage ? 'active' : ''}`,
      disabled: page === '...',
      onClick: () => (page !== activePage && onChangeActivePage(page)) || noop,
    })),
    {
      label: 'Next',
      className: '',
      disabled: activePage === totalPages,
      onClick: () => onChangeActivePage(activePage + 1),
    },
  ];

  return (
    <Pagination
      totalPages={totalPages}
      pages={pages}
    />
  );
};

PaginationContainer.propTypes = {
  activePage: PropTypes.number,
  onChangeActivePage: PropTypes.func,
  pageSize: PropTypes.number,
  totalRecords: PropTypes.number,
  pageNeighbours: PropTypes.number,
};

PaginationContainer.defaultProps = {
  activePage: 1,
  onChangeActivePage: noop,
  pageSize: 10,
  totalRecords: 0,
  pageNeighbours: 1,
};

export default PaginationContainer;
