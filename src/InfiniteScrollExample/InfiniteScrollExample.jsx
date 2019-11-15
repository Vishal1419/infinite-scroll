import React from 'react';
import PropTypes from 'prop-types';

import InfiniteScroll from '../shared/InfiniteScroll/InfiniteScrollContainer';

const noop = () => {};

const InfiniteScrollExample = ({
  getItems, flushItems, items,
  pageNo, pageSize, total, loading, setPageSize, isPaginated,
}) => (
  <div style={{ width: '100%', height: '100%' }}>
    <InfiniteScroll
      getItems={getItems}
      flushItems={flushItems}
      items={items}
      pageNo={pageNo}
      pageSize={pageSize}
      total={total}
      loading={loading}
      noData="No Data to show"
      didMount={() => {
        console.log('inside settimeout');
      }}
      loaderProps={{
        showBlocker: true,
        loadMoreContent: 'Load More Data',
        // disableSensor: true,
        // floatingLoader: true,
      }}
      isVirtualized={false}
      header={(
        <div>
          <button type="button" onClick={() => setPageSize(2)}>2</button>
          <button type="button" onClick={() => setPageSize(5)}>5</button>
          <button type="button" onClick={() => setPageSize(10)}>10</button>
          <button type="button" onClick={() => setPageSize(20)}>20</button>
        </div>
      )}
      footer={`total ${total}`}
      isPaginated={isPaginated}
      orientation="horizontal"
      // viewType="grid"
      scrollProps={{
        showScrollButtons: true,
        scrollButtonsPosition: 'outside',
        previousButtonContent: '<',
        nextButtonContent: '>',
        itemsToScrollAtATime: 4,
        // showPartiallyVisibleItem: true,
        hideScrollbar: false,
      }}
      classes={{ test: 'test' }}
    >
      {
        (item) => (
          <div
            data-key={item}
            className="abc"
            style={{ padding: '20px 100px', border: '1px solid #ddd', margin: 0 }}
          >
            {item}
          </div>
        )
      }
    </InfiniteScroll>
  </div>
);

InfiniteScrollExample.propTypes = {
  getItems: PropTypes.func,
  flushItems: PropTypes.func,
  items: PropTypes.instanceOf(Array),
  pageNo: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number,
  loading: PropTypes.bool,
  setPageSize: PropTypes.func,
  isPaginated: PropTypes.bool,
};

InfiniteScrollExample.defaultProps = {
  getItems: noop,
  flushItems: noop,
  items: [],
  pageNo: 1,
  pageSize: 10,
  total: 0,
  loading: false,
  setPageSize: noop,
  isPaginated: false,
};

export default InfiniteScrollExample;
