import React from 'react';
import PropTypes from 'prop-types';
import BlockUI from 'react-block-ui';

import Items from './components/Items/Items';
import Loader from './components/Loader/Loader';
import LoadMoreItems from './components/LoadMoreItems/LoadMoreItems';
import Pagination from './components/Pagination/PaginationContainer';
import { noop } from '../../utils';

const InfiniteScroll = ({
  children, noData,
  onPageNoChange, items,
  pageNo, pageSize, total,
  loading, hasError,
  blocker, loader, showBlocker, loadMoreContent,
  isVirtualized, header, footer, disableSensor,
  isPaginated, orientation,
}) => (
  <div className="infinite-scroll">
    <BlockUI
      tag="div"
      className="full-min-height"
      blocking={isPaginated ? loading : (showBlocker && (items && items.length === 0) && loading)}
      loader={blocker || <Loader />}
      renderChildren={isPaginated && items.length > 0}
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
                    showBlocker={showBlocker}
                    isPaginated={isPaginated}
                  />
                )}
                pagination={isPaginated && (
                  <Pagination
                    activePage={pageNo}
                    onChangeActivePage={onPageNoChange}
                    pageSize={pageSize}
                    totalRecords={total}
                    pageNeighbours={2}
                  />
                )}
                isVirtualized={isVirtualized}
                orientation={orientation}
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
  isPaginated: PropTypes.bool,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
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
  isPaginated: false,
  orientation: 'vertical',
};

export default InfiniteScroll;
