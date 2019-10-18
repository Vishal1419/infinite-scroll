import React from 'react';
import PropTypes from 'prop-types';

import './load-more-items.scss';
import InfiniteSensor from './InfiniteSensor';
import Loader from '../Loader/Loader';
import { noop } from '../../../../utils';

const LoadMoreItems = ({
  onPageNoChange, pageNo, pageSize, total,
  noOfItems, loading, hasError, loader, loadMoreContent,
  disableSensor,
}) => {
  const checkLoaderVisibility = () => pageNo === 0 // eslint-disable-line
    ? true
    : (total / (pageNo * pageSize)) > 1;

  return (
    <>
      {
        noOfItems > 0 && checkLoaderVisibility() && loading
        && (
          <div className="infinite-loader">
            { loader || <Loader size={20} /> }
          </div>
        )
      }
      {
        !hasError && checkLoaderVisibility() && !loading
        && (
          <InfiniteSensor
            active={!disableSensor}
            className="infinite-sensor"
            onReachedBottom={() => onPageNoChange(pageNo + 1)}
          />
        )
      }
      {
        !hasError && checkLoaderVisibility() && !loading
        && (
          <div className="load-more-wrapper">
            <button
              type="button"
              className="load-more"
              onClick={() => onPageNoChange(pageNo + 1)}
            >
              {loadMoreContent}
            </button>
          </div>
        )
      }
    </>
  );
};

LoadMoreItems.propTypes = {
  onPageNoChange: PropTypes.func,
  pageNo: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number,
  noOfItems: PropTypes.number,
  loading: PropTypes.bool,
  hasError: PropTypes.bool,
  loader: PropTypes.node,
  loadMoreContent: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  disableSensor: PropTypes.bool,
};

LoadMoreItems.defaultProps = {
  onPageNoChange: noop,
  pageNo: 1,
  pageSize: 10,
  total: 0,
  noOfItems: 0,
  loading: false,
  hasError: false,
  loader: null,
  loadMoreContent: 'Load More',
  disableSensor: false,
};

export default LoadMoreItems;
