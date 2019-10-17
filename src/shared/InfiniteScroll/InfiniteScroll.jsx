import React from 'react';
import PropTypes from 'prop-types';
import BlockUI from 'react-block-ui';
import { Loader } from 'react-loaders';

import Items from './components/Items/Items';
import { noop } from '../../utils';
import LoadMoreItems from './components/LoadMoreItems';

const InfiniteScroll = ({
  children, noData,
  onPageNoChange, items,
  pageNo, pageSize, total,
  loading, hasError,
  blocker, loader, showBlocker, loadMoreContent,
}) => (
  <div className="infinite-scroll">
    <BlockUI
      tag="div"
      className="full-min-height"
      blocking={showBlocker && (items && items.length === 0) && loading}
      loader={
        (!blocker || typeof blocker === 'string')
          ? <Loader type={blocker || 'ball-clip-rotate'} active />
          : blocker
      }
      renderChildren={items.length > 0}
    >
      {
        items.length === 0 && !loading
          ? <div className="no-data">{noData}</div>
          : (
            <Items
              items={items}
              loadMore={(
                <LoadMoreItems
                  onPageNoChange={onPageNoChange}
                  pageNo={pageNo}
                  pageSize={pageSize}
                  total={total}
                  noOfItems={(items && items.length) || 0}
                  loading={loading}
                  hasError={hasError}
                  loader={loader}
                  loadMoreContent={loadMoreContent}
                />
              )}
            >
              {children}
            </Items>
          )
      }
    </BlockUI>
  </div>
);

InfiniteScroll.propTypes = {
  children: PropTypes.func.isRequired,
  onPageNoChange: PropTypes.func,
  items: PropTypes.instanceOf(Array),
  pageNo: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number,
  loading: PropTypes.bool,
  hasError: PropTypes.bool,
  noData: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  blocker: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  loader: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  showBlocker: PropTypes.bool,
  loadMoreContent: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

InfiniteScroll.defaultProps = {
  onPageNoChange: noop,
  items: [],
  pageNo: 1,
  pageSize: 10,
  total: 0,
  loading: false,
  hasError: false,
  noData: 'No Data',
  blocker: 'ball-clip-rotate',
  loader: 'ball-clip-rotate',
  showBlocker: true,
  loadMoreContent: 'Load More',
};

export default InfiniteScroll;
