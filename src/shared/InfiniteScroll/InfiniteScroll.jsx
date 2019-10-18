import React from 'react';
import PropTypes from 'prop-types';
import BlockUI from 'react-block-ui';

import Items from './components/Items/Items';
import Loader from './components/Loader/Loader';
import { noop } from '../../utils';
import LoadMoreItems from './components/LoadMoreItems/LoadMoreItems';

const InfiniteScroll = ({
  children, noData,
  onPageNoChange, items,
  pageNo, pageSize, total,
  loading, hasError,
  blocker, loader, showBlocker, loadMoreContent,
  isVirtualized, header, footer, disableSensor,
}) => (
  <div className="infinite-scroll">
    <BlockUI
      tag="div"
      className="full-min-height"
      blocking={showBlocker && (items && items.length === 0) && loading}
      loader={blocker || <Loader />}
      renderChildren={items.length > 0}
    >
      {
        items.length === 0 && !loading
          ? <div className="no-data">{noData}</div>
          : (
            <>
              {header && <div className="header">{header}</div>}
              <Items
                items={items}
                footer={footer}
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
                    disableSensor={disableSensor}
                  />
                )}
                isVirtualized={isVirtualized}
              >
                {children}
              </Items>
            </>
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
  blocker: PropTypes.node,
  loader: PropTypes.node,
  showBlocker: PropTypes.bool,
  loadMoreContent: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  isVirtualized: PropTypes.bool,
  header: PropTypes.node,
  footer: PropTypes.node,
  disableSensor: PropTypes.bool,
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
  blocker: null,
  loader: null,
  showBlocker: true,
  loadMoreContent: 'Load More',
  isVirtualized: true,
  header: null,
  footer: null,
  disableSensor: false,
};

export default InfiniteScroll;
